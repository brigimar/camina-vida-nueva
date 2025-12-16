export interface Circuito {
  id: string;
  nombre: string;
  descripcion: string | null;
  localidad: string | null;
  distancia_km: number | null;
  punto_encuentro: string | null;
  estado: string | null;
  activo: boolean;
  imagen_circuito: string | null;
  created_at: string;
  updated_at: string;
  lat: number | null;
  lng: number | null;
  coordinador_nombre: string | null;
  coordinador_foto: string | null;
  que_llevar: string[] | null;
  dificultad: string | null;
  tiempo_estimado: string | null;
  dias: string[] | null;
  horarios: string[] | null;
  cupo_maximo: number | null;
  duracion_minutos: number | null;
}
