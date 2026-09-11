import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatearFecha, type Convocatoria } from '@/lib/api';

export function ConvocatoriaCard({
  convocatoria,
}: {
  convocatoria: Convocatoria;
}) {
  return (
    <Card className="flex flex-col">
      <div className="mb-3 flex items-center justify-between gap-2">
        <Badge estado={convocatoria.estado} />
        <span className="text-xs font-medium text-gray-500">
          {convocatoria.beca.nombre}
        </span>
      </div>
      <h3 className="mb-2 text-lg font-bold text-sigeb-blue-dark">
        {convocatoria.nombre}
      </h3>
      {convocatoria.descripcion && (
        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
          {convocatoria.descripcion}
        </p>
      )}
      <dl className="mb-4 space-y-1 text-xs text-gray-500">
        <div className="flex justify-between">
          <dt>Apertura</dt>
          <dd>{formatearFecha(convocatoria.fechaApertura)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Cierre</dt>
          <dd>{formatearFecha(convocatoria.fechaCierre)}</dd>
        </div>
      </dl>
      <Link
        href={`/convocatorias/${convocatoria.id}`}
        className="mt-auto inline-block rounded-lg bg-sigeb-blue px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-sigeb-blue-dark"
      >
        Ver detalles
      </Link>
    </Card>
  );
}
