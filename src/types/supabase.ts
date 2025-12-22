export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      circuito_config: {
        Row: {
          circuito_id: string;
          created_at: string | null;
          horas_previas_alerta: number;
          minimo_confirmados: number;
          ocupacion_minima: number;
          ocupacion_optima: number;
          updated_at: string | null;
        };
        Insert: {
          circuito_id: string;
          created_at?: string | null;
          horas_previas_alerta?: number;
          minimo_confirmados?: number;
          ocupacion_minima?: number;
          ocupacion_optima?: number;
          updated_at?: string | null;
        };
        Update: {
          circuito_id?: string;
          created_at?: string | null;
          horas_previas_alerta?: number;
          minimo_confirmados?: number;
          ocupacion_minima?: number;
          ocupacion_optima?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "circuito_config_circuito_id_fkey";
            columns: ["circuito_id"];
            isOneToOne: true;
            referencedRelation: "circuitos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "circuito_config_circuito_id_fkey";
            columns: ["circuito_id"];
            isOneToOne: true;
            referencedRelation: "vm_ingresos_por_circuito_mes";
            referencedColumns: ["circuito_id"];
          },
        ];
      };
      circuito_politica_economica: {
        Row: {
          circuito_id: string;
          created_at: string | null;
          created_by: string;
          id: string;
          motivo: string;
          porcentaje_retencion: number;
          vigente_desde: string;
          vigente_hasta: string | null;
        };
        Insert: {
          circuito_id: string;
          created_at?: string | null;
          created_by: string;
          id?: string;
          motivo: string;
          porcentaje_retencion: number;
          vigente_desde?: string;
          vigente_hasta?: string | null;
        };
        Update: {
          circuito_id?: string;
          created_at?: string | null;
          created_by?: string;
          id?: string;
          motivo?: string;
          porcentaje_retencion?: number;
          vigente_desde?: string;
          vigente_hasta?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "circuito_politica_economica_circuito_id_fkey";
            columns: ["circuito_id"];
            isOneToOne: false;
            referencedRelation: "circuitos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "circuito_politica_economica_circuito_id_fkey";
            columns: ["circuito_id"];
            isOneToOne: false;
            referencedRelation: "vm_ingresos_por_circuito_mes";
            referencedColumns: ["circuito_id"];
          },
        ];
      };
      circuitos: {
        Row: {
          activo: boolean;
          categoria: string | null;
          coordinador_foto: string | null;
          coordinador_nombre: string | null;
          created_at: string | null;
          cupo_maximo: number | null;
          descripcion: string | null;
          dias: string[] | null;
          dificultad: string | null;
          distancia_km: number;
          duracion_minutos: number | null;
          estado: Database["public"]["Enums"]["circuito_estado"] | null;
          horarios: string[] | null;
          id: string;
          lat: number | null;
          lng: number | null;
          localidad: string;
          nivel: string | null;
          nombre: string;
          punto_encuentro: string;
          que_llevar: string[] | null;
          tiempo_estimado: string | null;
          updated_at: string | null;
        };
        Insert: {
          activo?: boolean;
          categoria?: string | null;
          coordinador_foto?: string | null;
          coordinador_nombre?: string | null;
          created_at?: string | null;
          cupo_maximo?: number | null;
          descripcion?: string | null;
          dias?: string[] | null;
          dificultad?: string | null;
          distancia_km: number;
          duracion_minutos?: number | null;
          estado?: Database["public"]["Enums"]["circuito_estado"] | null;
          horarios?: string[] | null;
          id?: string;
          lat?: number | null;
          lng?: number | null;
          localidad: string;
          nivel?: string | null;
          nombre: string;
          punto_encuentro: string;
          que_llevar?: string[] | null;
          tiempo_estimado?: string | null;
          updated_at?: string | null;
        };
        Update: {
          activo?: boolean;
          categoria?: string | null;
          coordinador_foto?: string | null;
          coordinador_nombre?: string | null;
          created_at?: string | null;
          cupo_maximo?: number | null;
          descripcion?: string | null;
          dias?: string[] | null;
          dificultad?: string | null;
          distancia_km?: number;
          duracion_minutos?: number | null;
          estado?: Database["public"]["Enums"]["circuito_estado"] | null;
          horarios?: string[] | null;
          id?: string;
          lat?: number | null;
          lng?: number | null;
          localidad?: string;
          nivel?: string | null;
          nombre?: string;
          punto_encuentro?: string;
          que_llevar?: string[] | null;
          tiempo_estimado?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      coordinadores: {
        Row: {
          activo: boolean | null;
          created_at: string | null;
          email: string;
          id: string;
          nombre: string;
          updated_at: string | null;
          user_id: string;
          whatsapp: string;
        };
        Insert: {
          activo?: boolean | null;
          created_at?: string | null;
          email: string;
          id?: string;
          nombre: string;
          updated_at?: string | null;
          user_id: string;
          whatsapp: string;
        };
        Update: {
          activo?: boolean | null;
          created_at?: string | null;
          email?: string;
          id?: string;
          nombre?: string;
          updated_at?: string | null;
          user_id?: string;
          whatsapp?: string;
        };
        Relationships: [];
      };
      inscripciones: {
        Row: {
          created_at: string | null;
          edad: number;
          email: string;
          estado: Database["public"]["Enums"]["inscripcion_estado"] | null;
          id: string;
          nombre: string;
          notas: string | null;
          sesion_id: string;
          updated_at: string | null;
          whatsapp: string;
        };
        Insert: {
          created_at?: string | null;
          edad: number;
          email: string;
          estado?: Database["public"]["Enums"]["inscripcion_estado"] | null;
          id?: string;
          nombre: string;
          notas?: string | null;
          sesion_id: string;
          updated_at?: string | null;
          whatsapp: string;
        };
        Update: {
          created_at?: string | null;
          edad?: number;
          email?: string;
          estado?: Database["public"]["Enums"]["inscripcion_estado"] | null;
          id?: string;
          nombre?: string;
          notas?: string | null;
          sesion_id?: string;
          updated_at?: string | null;
          whatsapp?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inscripciones_sesion_id_fkey";
            columns: ["sesion_id"];
            isOneToOne: false;
            referencedRelation: "sesiones";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inscripciones_sesion_id_fkey";
            columns: ["sesion_id"];
            isOneToOne: false;
            referencedRelation: "v_sesiones_detalle";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inscripciones_sesion_id_fkey";
            columns: ["sesion_id"];
            isOneToOne: false;
            referencedRelation: "vm_alertas_operativas";
            referencedColumns: ["sesion_id"];
          },
          {
            foreignKeyName: "inscripciones_sesion_id_fkey";
            columns: ["sesion_id"];
            isOneToOne: false;
            referencedRelation: "vm_caminatas_hoy";
            referencedColumns: ["sesion_id"];
          },
        ];
      };
      pagos: {
        Row: {
          created_at: string | null;
          estado: string;
          fecha_pago: string | null;
          id: string;
          inscripcion_id: string;
          monto_bruto: number;
          monto_neto: number;
          monto_retencion: number;
          origen: string;
          porcentaje_retencion: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          estado: string;
          fecha_pago?: string | null;
          id?: string;
          inscripcion_id: string;
          monto_bruto: number;
          monto_neto: number;
          monto_retencion: number;
          origen: string;
          porcentaje_retencion: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          estado?: string;
          fecha_pago?: string | null;
          id?: string;
          inscripcion_id?: string;
          monto_bruto?: number;
          monto_neto?: number;
          monto_retencion?: number;
          origen?: string;
          porcentaje_retencion?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "pagos_inscripcion_id_fkey";
            columns: ["inscripcion_id"];
            isOneToOne: false;
            referencedRelation: "inscripciones";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pagos_inscripcion_id_fkey";
            columns: ["inscripcion_id"];
            isOneToOne: false;
            referencedRelation: "v_inscripciones_detalle";
            referencedColumns: ["id"];
          },
        ];
      };
      role_audit: {
        Row: {
          changed_by: string;
          created_at: string | null;
          id: string;
          new_role: string | null;
          old_role: string | null;
          user_id: string;
        };
        Insert: {
          changed_by: string;
          created_at?: string | null;
          id?: string;
          new_role?: string | null;
          old_role?: string | null;
          user_id: string;
        };
        Update: {
          changed_by?: string;
          created_at?: string | null;
          id?: string;
          new_role?: string | null;
          old_role?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      sesiones: {
        Row: {
          circuito_id: string;
          coordinador_id: string | null;
          created_at: string | null;
          cupo_actual: number | null;
          cupo_maximo: number;
          estado: Database["public"]["Enums"]["sesion_estado"] | null;
          fecha: string;
          horario: string;
          id: string;
          notas: string | null;
          updated_at: string | null;
        };
        Insert: {
          circuito_id: string;
          coordinador_id?: string | null;
          created_at?: string | null;
          cupo_actual?: number | null;
          cupo_maximo: number;
          estado?: Database["public"]["Enums"]["sesion_estado"] | null;
          fecha: string;
          horario: string;
          id?: string;
          notas?: string | null;
          updated_at?: string | null;
        };
        Update: {
          circuito_id?: string;
          coordinador_id?: string | null;
          created_at?: string | null;
          cupo_actual?: number | null;
          cupo_maximo?: number;
          estado?: Database["public"]["Enums"]["sesion_estado"] | null;
          fecha?: string;
          horario?: string;
          id?: string;
          notas?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sesiones_circuito_id_fkey";
            columns: ["circuito_id"];
            isOneToOne: false;
            referencedRelation: "circuitos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sesiones_circuito_id_fkey";
            columns: ["circuito_id"];
            isOneToOne: false;
            referencedRelation: "vm_ingresos_por_circuito_mes";
            referencedColumns: ["circuito_id"];
          },
          {
            foreignKeyName: "sesiones_coordinador_id_fkey";
            columns: ["coordinador_id"];
            isOneToOne: false;
            referencedRelation: "coordinadores";
            referencedColumns: ["id"];
          },
        ];
      };
      user_roles: {
        Row: {
          created_at: string | null;
          id: string;
          role: Database["public"]["Enums"]["user_role"];
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          role: Database["public"]["Enums"]["user_role"];
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      v_inscripciones_detalle: {
        Row: {
          circuito_nombre: string | null;
          created_at: string | null;
          edad: number | null;
          email: string | null;
          estado: Database["public"]["Enums"]["inscripcion_estado"] | null;
          fecha: string | null;
          horario: string | null;
          id: string | null;
          nombre: string | null;
          notas: string | null;
          sesion_id: string | null;
          updated_at: string | null;
          whatsapp: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "inscripciones_sesion_id_fkey";
            columns: ["sesion_id"];
            isOneToOne: false;
            referencedRelation: "sesiones";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inscripciones_sesion_id_fkey";
            columns: ["sesion_id"];
            isOneToOne: false;
            referencedRelation: "v_sesiones_detalle";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inscripciones_sesion_id_fkey";
            columns: ["sesion_id"];
            isOneToOne: false;
            referencedRelation: "vm_alertas_operativas";
            referencedColumns: ["sesion_id"];
          },
          {
            foreignKeyName: "inscripciones_sesion_id_fkey";
            columns: ["sesion_id"];
            isOneToOne: false;
            referencedRelation: "vm_caminatas_hoy";
            referencedColumns: ["sesion_id"];
          },
        ];
      };
      v_sesiones_detalle: {
        Row: {
          circuito_id: string | null;
          circuito_nombre: string | null;
          coordinador_id: string | null;
          coordinador_nombre: string | null;
          coordinador_whatsapp: string | null;
          created_at: string | null;
          cupo_actual: number | null;
          cupo_maximo: number | null;
          estado: Database["public"]["Enums"]["sesion_estado"] | null;
          fecha: string | null;
          horario: string | null;
          id: string | null;
          localidad: string | null;
          notas: string | null;
          sesion_ts: string | null;
          updated_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sesiones_circuito_id_fkey";
            columns: ["circuito_id"];
            isOneToOne: false;
            referencedRelation: "circuitos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sesiones_circuito_id_fkey";
            columns: ["circuito_id"];
            isOneToOne: false;
            referencedRelation: "vm_ingresos_por_circuito_mes";
            referencedColumns: ["circuito_id"];
          },
          {
            foreignKeyName: "sesiones_coordinador_id_fkey";
            columns: ["coordinador_id"];
            isOneToOne: false;
            referencedRelation: "coordinadores";
            referencedColumns: ["id"];
          },
        ];
      };
      vm_alertas_operativas: {
        Row: {
          accion_recomendada: string | null;
          circuito_id: string | null;
          circuito_nombre: string | null;
          confirmadas: number | null;
          coordinador_id: string | null;
          coordinador_nombre: string | null;
          cupo_maximo: number | null;
          fecha: string | null;
          horario: string | null;
          sesion_id: string | null;
          sesion_ts: string | null;
          severidad: string | null;
          tipo_alerta: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sesiones_circuito_id_fkey";
            columns: ["circuito_id"];
            isOneToOne: false;
            referencedRelation: "circuitos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sesiones_circuito_id_fkey";
            columns: ["circuito_id"];
            isOneToOne: false;
            referencedRelation: "vm_ingresos_por_circuito_mes";
            referencedColumns: ["circuito_id"];
          },
          {
            foreignKeyName: "sesiones_coordinador_id_fkey";
            columns: ["coordinador_id"];
            isOneToOne: false;
            referencedRelation: "coordinadores";
            referencedColumns: ["id"];
          },
        ];
      };
      vm_caminatas_hoy: {
        Row: {
          accion_recomendada: string | null;
          circuito_id: string | null;
          circuito_nombre: string | null;
          coordinador_id: string | null;
          coordinador_nombre: string | null;
          cupo_maximo: number | null;
          fecha: string | null;
          horario: string | null;
          inscriptos_confirmados: number | null;
          ocupacion: number | null;
          riesgo: string | null;
          sesion_id: string | null;
          sesion_ts: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sesiones_circuito_id_fkey";
            columns: ["circuito_id"];
            isOneToOne: false;
            referencedRelation: "circuitos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sesiones_circuito_id_fkey";
            columns: ["circuito_id"];
            isOneToOne: false;
            referencedRelation: "vm_ingresos_por_circuito_mes";
            referencedColumns: ["circuito_id"];
          },
          {
            foreignKeyName: "sesiones_coordinador_id_fkey";
            columns: ["coordinador_id"];
            isOneToOne: false;
            referencedRelation: "coordinadores";
            referencedColumns: ["id"];
          },
        ];
      };
      vm_ingresos_por_circuito_mes: {
        Row: {
          cantidad_pagos: number | null;
          circuito_id: string | null;
          circuito_nombre: string | null;
          ingresos_brutos: number | null;
          ingresos_netos: number | null;
          ingresos_retencion: number | null;
          inscripciones_pagadas: number | null;
          mes: string | null;
          ticket_promedio: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      resolver_alerta: {
        Args: { p_alerta_id: string; p_user_id: string };
        Returns: undefined;
      };
      sync_alertas_operativas: { Args: never; Returns: undefined };
    };
    Enums: {
      circuito_estado: "activo" | "inactivo";
      inscripcion_estado: "pendiente" | "confirmada" | "cancelada";
      sesion_estado: "abierta" | "completa" | "cancelada";
      user_role: "admin" | "coordinador" | "inscripto";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      circuito_estado: ["activo", "inactivo"],
      inscripcion_estado: ["pendiente", "confirmada", "cancelada"],
      sesion_estado: ["abierta", "completa", "cancelada"],
      user_role: ["admin", "coordinador", "inscripto"],
    },
  },
} as const;
