// ----------------------
// CIRCUITOS
// ----------------------

export type CircuitoEstado = "activo" | "inactivo";

export interface Circuito {
  id: string;
  nombre: string;
  descripcion: string | null;
  localidad: string;
  distancia_km: number;
  punto_encuentro: string;
  estado: CircuitoEstado;
  created_at: string | null;
  updated_at: string | null;
  lat: number | null;
  lng: number | null;
  coordinador_nombre: string | null;
  coordinador_foto: string | null;
  que_llevar: string[] | null;
  dificultad: string | null;
  tiempo_estimado: string | null;
  dias: string[] | null;
  horarios: string[] | null;
}

// ----------------------
// INSCRIPCIONES
// ----------------------

export type InscripcionEstado = "activo" | "inactivo" | "cancelado";

export interface Inscripcion {
  id: string;
  sesion_id: string;
  nombre: string;
  apellido?: string;
  dni?: string;
  email?: string;
  whatsapp?: string;
  edad?: number;
  estado: InscripcionEstado;
  origen?: "web" | "dashboard";
  created_at?: string;
  updated_at?: string;
}

// ----------------------
// SESIONES
// ----------------------

export type SesionEstado = "programada" | "completada" | "cancelada";

export interface Sesion {
  id: string;
  circuito_id: string;
  fecha: string;
  horario: string;
  cupo: number;
  estado: SesionEstado;
  coordinador_id?: string;
  created_at?: string;
  updated_at?: string;
}

// ----------------------
// COORDINADORES
// ----------------------

export interface Coordinador {
  id: string;
  nombre: string;
  apellido?: string;
  dni?: string;
  telefono?: string;
  email?: string;
  foto: string | null;
  bio: string | null;
  estado?: "activo" | "inactivo";
  created_at?: string;
  updated_at?: string;
}
