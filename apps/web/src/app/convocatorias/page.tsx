import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ConvocatoriaCard } from '@/components/convocatorias/ConvocatoriaCard';
import { FiltrosConvocatorias } from '@/components/convocatorias/FiltrosConvocatorias';
import { EmptyState } from '@/components/ui/EmptyState';
import { fetcher, type Convocatoria, type ListaResponse } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Convocatorias | SIGEB',
  description:
    'Explora las convocatorias abiertas de becas del Ministerio de Educación de Guatemala.',
};

interface Props {
  searchParams: { busqueda?: string; beca?: string };
}

export const dynamic = 'force-dynamic';

export default async function ConvocatoriasPage({ searchParams }: Props) {
  const { busqueda, beca } = searchParams;
  const params = new URLSearchParams();
  if (busqueda) params.set('busqueda', busqueda);
  const qs = params.toString();

  let convocatorias: Convocatoria[] = [];
  try {
    const res = await fetcher<ListaResponse<Convocatoria>>(
      `/convocatorias${qs ? `?${qs}` : ''}`,
    );
    convocatorias = res.data ?? [];
  } catch {
    // Se maneja abajo con estado vacío/error
  }

  const becasDisponibles = [...new Set(convocatorias.map((c) => c.beca.nombre))];

  if (beca) {
    convocatorias = convocatorias.filter((c) => c.beca.nombre === beca);
  }

  return (
    <main>
      <section className="bg-sigeb-blue py-12 text-white">
        <Container>
          <h1 className="text-3xl font-bold md:text-4xl">Convocatorias</h1>
          <p className="mt-2 max-w-2xl text-sigeb-light">
            Encuentra las becas abiertas del Ministerio de Educación. Filtra por
            nombre o tipo de beca para encontrar la oportunidad ideal.
          </p>
        </Container>
      </section>

      <section className="bg-sigeb-gray py-10">
        <Container>
          <div className="mb-8">
            <FiltrosConvocatorias becas={becasDisponibles} />
          </div>

          {convocatorias.length === 0 ? (
            <EmptyState
              title="No hay convocatorias que coincidan"
              description="Prueba ajustando los filtros o vuelve más tarde. Las convocatorias se publican cuando abren."
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {convocatorias.map((convocatoria) => (
                <ConvocatoriaCard key={convocatoria.id} convocatoria={convocatoria} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
