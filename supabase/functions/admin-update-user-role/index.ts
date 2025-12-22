import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Verificar autenticación
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({
          data: null,
          error: {
            message: "Missing authorization header",
            code: "UNAUTHORIZED",
          },
        }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // 2. Crear cliente de Supabase con SERVICE_ROLE_KEY (seguro en Edge Function)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    // 3. Crear cliente normal para verificar usuario que llama
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: authHeader },
        },
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    // 4. Obtener usuario que hace la llamada
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({
          data: null,
          error: { message: "Unauthorized", code: "UNAUTHORIZED" },
        }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // 5. Verificar que el usuario es admin
    const callerRole = user.app_metadata?.role;
    if (callerRole !== "admin") {
      // Registrar intento no autorizado
      await supabaseAdmin.from("security_audit").insert({
        user_id: user.id,
        event_type: "unauthorized_access_attempt",
        user_role: callerRole || "none",
        required_roles: ["admin"],
        resource: "admin-update-user-role",
        action: "UPDATE",
        timestamp: new Date().toISOString(),
      });

      return new Response(
        JSON.stringify({
          data: null,
          error: {
            message: "Forbidden: Only admins can update user roles",
            code: "FORBIDDEN",
          },
        }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // 6. Validar request body
    const body = await req.json();
    const { userId, role } = body;

    if (!userId || !role) {
      return new Response(
        JSON.stringify({
          data: null,
          error: {
            message: "Missing required fields: userId and role",
            code: "VALIDATION_ERROR",
          },
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // 7. Validar rol permitido
    const allowedRoles = ["admin", "coordinador", "usuario"];
    if (!allowedRoles.includes(role)) {
      return new Response(
        JSON.stringify({
          data: null,
          error: {
            message: `Invalid role. Allowed: ${allowedRoles.join(", ")}`,
            code: "VALIDATION_ERROR",
          },
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // 8. Obtener rol anterior del usuario para auditoría
    const { data: targetUser } =
      await supabaseAdmin.auth.admin.getUserById(userId);
    const oldRole = targetUser?.user?.app_metadata?.role || "none";

    // 9. Actualizar app_metadata del usuario con SERVICE_ROLE
    const { data: updatedUser, error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        app_metadata: { role },
      });

    if (updateError) {
      console.error("Error updating user:", updateError);
      return new Response(
        JSON.stringify({
          data: null,
          error: {
            message: updateError.message,
            code: "UPDATE_ERROR",
          },
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // 10. Registrar cambio en auditoría
    await supabaseAdmin.from("role_audit").insert({
      user_id: userId,
      old_role: oldRole,
      new_role: role,
      changed_by: user.id,
      timestamp: new Date().toISOString(),
      source: "edge_function",
    });

    // 11. Registrar evento de seguridad exitoso
    await supabaseAdmin.from("security_audit").insert({
      user_id: user.id,
      event_type: "role_change",
      user_role: callerRole,
      resource: `user/${userId}`,
      action: "UPDATE_ROLE",
      timestamp: new Date().toISOString(),
      metadata: {
        target_user_id: userId,
        old_role: oldRole,
        new_role: role,
      },
    });

    // 12. Retornar éxito
    return new Response(
      JSON.stringify({
        data: {
          userId,
          oldRole,
          newRole: role,
          changedBy: user.id,
          timestamp: new Date().toISOString(),
          message: "User role updated successfully",
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error in admin-update-user-role:", error);
    return new Response(
      JSON.stringify({
        data: null,
        error: {
          message: "Internal server error",
          code: "INTERNAL_ERROR",
        },
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
