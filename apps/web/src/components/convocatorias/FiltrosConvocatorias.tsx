'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Select } from '@/components/ui/Select';

interface FiltrosConvocatoriasProps {
  becas: string[];
}

export function FiltrosConvocatorias({ becas }: FiltrosConvocatoriasProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [busqueda, setBusqueda] = useState(searchParams.get('busqueda') ?? '');
  const [beca, setBeca] = useState(searchParams.get('beca') ?? '');

  function aplicarFiltros() {
    const params = new URLSearchParams();
    if (busqueda.trim()) params.set('busqueda', busqueda.trim());
    if (beca) params.set('beca', beca);
    const qs = params.toString();
    router.push(qs ? `/convocatorias?${qs}` : '/convocatorias');
  }

  function limpiar() {
    setBusqueda('');
    setBeca('');
    router.push('/convocatorias');
  }

  return (
    <form
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        aplicarFiltros();
      }}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex-1">
          <label
            htmlFor="busqueda"
            className="mb-1 block text-sm font-medium text-sigeb-blue-dark"
          >
            Buscar
          </label>
          <input
            id="busqueda"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Nombre de convocatoria o beca..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sigeb-blue focus:outline-none focus:ring-2 focus:ring-sigeb-blue/20"
          />
        </div>

        {becas.length > 0 && (
          <div className="w-full md:w-56">
            <Select
              label="Tipo de beca"
              name="beca"
              value={beca}
              onChange={(e) => setBeca(e.target.value)}
              options={[...new Set(becas)].map((b) => ({ value: b, label: b }))}
              placeholder="Todas las becas"
            />
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-lg bg-sigeb-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sigeb-blue-dark"
          >
            Filtrar
          </button>
          <button
            type="button"
            onClick={limpiar}
            className="rounded-lg border-2 border-sigeb-blue px-4 py-2 text-sm font-semibold text-sigeb-blue transition-colors hover:bg-sigeb-blue hover:text-white"
          >
            Limpiar
          </button>
        </div>
      </div>
    </form>
  );
}
