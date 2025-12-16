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

export type InscripcionEstado = "pendiente" | "confirmada" | "cancelada";

export interface Inscripcion {
  id: string;
  circuito_id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string | null;
  fecha: string;
  estado: InscripcionEstado;
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
}

// ----------------------
// COORDINADORES
// ----------------------

export interface Coordinador {
  id: string;
  nombre: string;
  foto: string | null;
  bio: string | null;
}
