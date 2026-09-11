export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';

export interface Beca {
  id: string;
  nombre: string;
}

export interface Convocatoria {
  id: string;
  nombre: string;
  descripcion: string | null;
  estado: string;
  fechaApertura: string;
  fechaCierre: string;
  beca: Beca;
}

export interface DocumentoTipo {
  id: string;
  nombre: string;
}

export interface ConvocatoriaDocRequerido {
  id: string;
  documentoTipo: DocumentoTipo;
  obligatorio: boolean;
}

export interface CriterioEvaluacion {
  id: string;
  nombre: string;
  peso: number;
}

export interface ConvocatoriaDetalle extends Convocatoria {
  documentosRequeridos: ConvocatoriaDocRequerido[];
  beca: Beca & { criteriosEvaluacion: CriterioEvaluacion[] };
}

export interface HistorialEstado {
  estado: string;
  comentario: string | null;
  fecha: string;
}

export interface ConsultaSolicitud {
  codigo: string;
  estado: string;
  beca: string | null;
  convocatoria: string | null;
  fechaCreacion: string;
  fechaActualizacion: string;
  historial: HistorialEstado[];
}

export interface Genero {
  id: string;
  nombre: string;
}

export interface NivelAcademico {
  id: string;
  nombre: string;
}

export interface Municipio {
  id: string;
  nombre: string;
}

export interface Departamento {
  id: string;
  nombre: string;
  municipios?: Municipio[];
}

export interface ListaResponse<T> {
  data: T[];
  total?: number;
  page?: number;
  limit?: number;
}

export async function fetcher<T>(path: string): Promise<T> {
  return http<T>(path);
}

export async function http<T>(
  path: string,
  options: {
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    body?: unknown;
    isFormData?: boolean;
    token?: string | null;
  } = {},
): Promise<T> {
  const { method = 'GET', body, isFormData = false, token } = options;

  const headers: Record<string, string> = { accept: 'application/json' };
  if (!isFormData && body !== undefined) {
    headers['content-type'] = 'application/json';
  }
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body:
      body === undefined
        ? undefined
        : isFormData
          ? (body as FormData)
          : JSON.stringify(body),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    const mensaje =
      (data as { message?: string } | null)?.message ??
      `La API respondió con estado ${res.status}`;
    throw new Error(Array.isArray(mensaje) ? mensaje.join(', ') : mensaje);
  }

  return (await res.json()) as T;
}

export function formatearFecha(fecha: string) {
  const d = new Date(fecha);
  if (Number.isNaN(d.getTime())) return fecha;
  return d.toLocaleDateString('es-GT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
