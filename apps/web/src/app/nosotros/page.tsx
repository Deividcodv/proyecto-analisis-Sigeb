import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Nosotros | SIGEB',
  description:
    'Conoce al Ministerio de Educación de Guatemala, su misión, visión y los programas de becas gestionados a través de SIGEB.',
};

export default function NosotrosPage() {
  return (
    <main>
      <section className="bg-sigeb-blue py-12 text-white">
        <Container>
          <h1 className="text-3xl font-bold md:text-4xl">Nosotros</h1>
          <p className="mt-2 max-w-2xl text-sigeb-light">
            Conoce al Ministerio de Educación y el sistema que hace posible la
            gestión de becas en Guatemala.
          </p>
        </Container>
      </section>

      <section className="bg-sigeb-gray py-12">
        <Container>
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-3 text-2xl font-bold text-sigeb-blue-dark">
                Misión
              </h2>
              <p className="text-gray-700">
                Garantizar el acceso a una educación de calidad para todas las
                personas, creando oportunidades que transforman vidas a través
                de programas de becas que apoyan la formación académica en
                Guatemala.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-3 text-2xl font-bold text-sigeb-blue-dark">
                Visión
              </h2>
              <p className="text-gray-700">
                Ser el sistema referente de gestión de becas en la región,
                reconocido por su transparencia, eficiencia e impacto en la
                reducción de la deserción escolar y el acceso equitativo a la
                educación superior.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-3 text-2xl font-bold text-sigeb-blue-dark">
                Objetivos
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-gray-700">
                <li>Ampliar el acceso a becas de excelencia académica.</li>
                <li>Garantizar un proceso de postulación transparente y justo.</li>
                <li>Facilitar el seguimiento de solicitudes en tiempo real.</li>
                <li>Fomentar la permanencia y culminación de estudios superiores.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-3 text-2xl font-bold text-sigeb-blue-dark">
                Programas de becas
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-gray-700">
                <li>Beca de Excelencia Académica</li>
                <li>Beca de Inspiración Cívica</li>
                <li>Programas de apoyo a la formación técnica y profesional</li>
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-3 text-2xl font-bold text-sigeb-blue-dark">
                Transparencia
              </h2>
              <p className="text-gray-700">
                SIGEB publica los resultados de cada convocatoria y mantiene un
                registro auditable de todas las acciones del proceso, asegurando
                que cada decisión sea documentada y verificable.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-3 text-2xl font-bold text-sigeb-blue-dark">
                Contacto
              </h2>
              <p className="text-gray-700">
                Ministerio de Educación de Guatemala
              </p>
              <p className="text-gray-700">
                Para consultas sobre becas, contáctanos a través de nuestro{' '}
                <a href="/consulta" className="text-sigeb-blue underline">
                  consulta de solicitudes
                </a>{' '}
                o el centro de ayuda.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
