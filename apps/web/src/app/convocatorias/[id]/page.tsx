import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  fetcher,
  formatearFecha,
  type ConvocatoriaDetalle,
} from '@/lib/api';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let convocatoria: ConvocatoriaDetalle | null = null;
  try {
    convocatoria = await fetcher<ConvocatoriaDetalle>(`/convocatorias/${params.id}`);
  } catch {
    return { title: 'Convocatoria | SIGEB' };
  }
  return {
    title: `${convocatoria.nombre} | SIGEB`,
    description: convocatoria.descripcion ?? undefined,
  };
}

export default async function ConvocatoriaDetallePage({ params }: Props) {
  let convocatoria: ConvocatoriaDetalle;
  try {
    convocatoria = await fetcher<ConvocatoriaDetalle>(
      `/convocatorias/${params.id}`,
    );
  } catch {
    return notFound();
  }

  const docs = convocatoria.documentosRequeridos ?? [];
  const criterios = convocatoria.beca?.criteriosEvaluacion ?? [];

  return (
    <main>
      <section className="bg-sigeb-blue py-12 text-white">
        <Container>
          <Link
            href="/convocatorias"
            className="mb-4 inline-block text-sm text-sigeb-light hover:text-white"
          >
            ← Volver a convocatorias
          </Link>
          <div className="flex items-center gap-3">
            <Badge estado={convocatoria.estado} />
            <span className="text-sm font-medium text-sigeb-light">
              {convocatoria.beca.nombre}
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            {convocatoria.nombre}
          </h1>
        </Container>
      </section>

      <section className="bg-sigeb-gray py-10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-bold text-sigeb-blue-dark">
                  Descripción
                </h2>
                <p className="whitespace-pre-line text-gray-700">
                  {convocatoria.descripcion ||
                    'No se ha proporcionado una descripción para esta convocatoria.'}
                </p>
              </div>

              {criterios.length > 0 && (
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-3 text-xl font-bold text-sigeb-blue-dark">
                    Criterios de evaluación
                  </h2>
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-500">
                        <th className="py-2 pr-4 font-medium">Criterio</th>
                        <th className="py-2 font-medium">Peso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {criterios.map((criterio) => (
                        <tr key={criterio.id} className="border-b border-gray-100">
                          <td className="py-2 pr-4 text-gray-800">{criterio.nombre}</td>
                          <td className="py-2 text-gray-600">
                            {(criterio.peso * 100).toFixed(0)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-lg font-bold text-sigeb-blue-dark">
                  Datos de la convocatoria
                </h2>
                <dl className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <dt>Apertura</dt>
                    <dd className="font-medium text-gray-900">
                      {formatearFecha(convocatoria.fechaApertura)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Cierre</dt>
                    <dd className="font-medium text-gray-900">
                      {formatearFecha(convocatoria.fechaCierre)}
                    </dd>
                  </div>
                </dl>
              </div>

              {docs.length > 0 && (
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-3 text-lg font-bold text-sigeb-blue-dark">
                    Documentos requeridos
                  </h2>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {docs.map((doc) => (
                      <li key={doc.id} className="flex items-start justify-between gap-2">
                        <span>{doc.documentoTipo.nombre}</span>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                            doc.obligatorio
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {doc.obligatorio ? 'Obligatorio' : 'Opcional'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button href="/registro" className="w-full text-center">
                Postularme
              </Button>
              <p className="text-center text-xs text-gray-500">
                Crear una cuenta para iniciar tu postulación.{' '}
                <Link href="/login" className="text-sigeb-blue underline">
                  Inicia sesión
                </Link>{' '}
                si ya tienes una.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
