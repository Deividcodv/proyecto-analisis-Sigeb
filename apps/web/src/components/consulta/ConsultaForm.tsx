'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { http, type ConsultaSolicitud } from '@/lib/api';

export function ConsultaForm() {
  const [codigo, setCodigo] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ConsultaSolicitud | null>(null);

  async function consultar(e: React.FormEvent) {
    e.preventDefault();
    const codigoTrim = codigo.trim();
    if (!codigoTrim) {
      setError('Ingresa el número de tu solicitud.');
      return;
    }
    setCargando(true);
    setError(null);
    setResultado(null);
    try {
      const data = await http<ConsultaSolicitud>(
        `/solicitudes/consulta/${encodeURIComponent(codigoTrim)}`,
      );
      setResultado(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo consultar la solicitud.',
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <form
        onSubmit={consultar}
        className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <Input
            label="Número de solicitud"
            name="codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ej. 8f7e2c... (código recibido al postular)"
            disabled={cargando}
          />
        </div>
        <Button type="submit" disabled={cargando}>
          {cargando ? 'Consultando...' : 'Consultar'}
        </Button>
      </form>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {cargando && (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      )}

      {resultado && <ResultadoConsulta resultado={resultado} />}
    </div>
  );
}

const coloresEstado: Record<string, string> = {
  BORRADOR: 'bg-gray-200 text-gray-700',
  ENVIADA: 'bg-blue-100 text-blue-800',
  EN_REVISION: 'bg-yellow-100 text-yellow-800',
  CORRECCION: 'bg-orange-100 text-orange-800',
  EVALUADA: 'bg-indigo-100 text-indigo-800',
  APROBADA: 'bg-green-100 text-green-800',
  RECHAZADA: 'bg-red-100 text-red-800',
};

function ResultadoConsulta({ resultado }: { resultado: ConsultaSolicitud }) {
  const etapa = resultado.historial ?? [];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-sigeb-gray px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-gray-500">Solicitud</p>
            <p className="font-mono text-sm font-semibold text-sigeb-blue-dark">
              {resultado.codigo}
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              coloresEstado[resultado.estado] ?? 'bg-gray-100 text-gray-700'
            }`}
          >
            {resultado.estado}
          </span>
        </div>
      </div>

      <div className="px-6 py-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-500">Beca</p>
            <p className="font-medium text-gray-900">{resultado.beca ?? '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Convocatoria</p>
            <p className="font-medium text-gray-900">
              {resultado.convocatoria ?? '—'}
            </p>
          </div>
        </div>

        {etapa.length > 0 ? (
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-sigeb-blue-dark">
              Historial del proceso
            </p>
            <ol className="relative space-y-4 border-l-2 border-sigeb-light pl-6">
              {etapa.map((hito, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-white bg-sigeb-blue" />
                  <p className="text-sm font-medium text-gray-900">{hito.estado}</p>
                  {hito.comentario && (
                    <p className="text-xs text-gray-500">{hito.comentario}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    {new Date(hito.fecha).toLocaleDateString('es-GT', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p className="mt-4 text-xs text-gray-500">
            Sin historial registrado aún.
          </p>
        )}
      </div>
    </div>
  );
}
