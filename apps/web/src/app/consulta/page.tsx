import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ConsultaForm } from '@/components/consulta/ConsultaForm';

export const metadata: Metadata = {
  title: 'Consultar solicitud | SIGEB',
  description:
    'Consulta el estado de tu solicitud de beca sin necesidad de iniciar sesión.',
};

export default function ConsultaPage() {
  return (
    <main>
      <section className="bg-sigeb-blue py-12 text-white">
        <Container>
          <h1 className="text-3xl font-bold md:text-4xl">
            Consulta el estado de tu beca
          </h1>
          <p className="mt-2 max-w-2xl text-sigeb-light">
            Ingresa el número de solicitud que recibiste al postularte para
            conocer en qué etapa se encuentra tu proceso.
          </p>
        </Container>
      </section>

      <section className="bg-sigeb-gray py-12">
        <Container className="min-h-[40vh]">
          <ConsultaForm />
        </Container>
      </section>
    </main>
  );
}
