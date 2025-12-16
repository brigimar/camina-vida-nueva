import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
)

Deno.serve(async () => {
  const { error } = await supabase.rpc("sync_alertas_operativas")

  if (error) {
    console.error("Error syncing alertas:", error)
    return new Response("Error", { status: 500 })
  }

  return new Response("OK")
})
