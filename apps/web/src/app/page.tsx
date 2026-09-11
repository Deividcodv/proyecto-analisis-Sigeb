import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Convocatorias } from '@/components/home/Convocatorias';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-sigeb-blue to-sigeb-blue-dark py-20 text-white">
        <Container className="text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            Oportunidades que transforman vidas
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-sigeb-light md:text-2xl">
            Encuentra programas de becas del Ministerio de Educación de Guatemala
            y realiza tu proceso de postulación de forma sencilla, segura y
            transparente.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/convocatorias">Explorar becas</Button>
            <Button href="/consulta" variant="secondary">
              Consultar mi solicitud
            </Button>
          </div>
        </Container>
      </section>

      {/* Convocatorias abiertas (datos reales desde el API) */}
      <section className="bg-sigeb-gray py-16">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold text-sigeb-blue-dark">
            Convocatorias abiertas
          </h2>
          <Convocatorias />
        </Container>
      </section>

      {/* Sobre SIGEB */}
      <section className="bg-white py-16">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold text-sigeb-blue-dark">
            Sobre SIGEB
          </h2>
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-8 text-lg text-gray-600">
              SIGEB es la plataforma para la gestión integral de programas de
              becas del Ministerio de Educación de Guatemala.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="p-6">
                <div className="mb-4 text-4xl text-sigeb-gold">ℹ</div>
                <h3 className="mb-2 font-semibold text-sigeb-blue-dark">
                  Información clara
                </h3>
                <p className="text-gray-600">
                  Acceso sencillo a todos los programas de becas disponibles.
                </p>
              </div>
              <div className="p-6">
                <div className="mb-4 text-4xl text-sigeb-gold">✓</div>
                <h3 className="mb-2 font-semibold text-sigeb-blue-dark">
                  Seguimiento de solicitudes
                </h3>
                <p className="text-gray-600">
                  Consulta el estado de tu postulación en tiempo real.
                </p>
              </div>
              <div className="p-6">
                <div className="mb-4 text-4xl text-sigeb-gold">★</div>
                <h3 className="mb-2 font-semibold text-sigeb-blue-dark">
                  Proceso transparente
                </h3>
                <p className="text-gray-600">
                  Evaluación justa y decisiones documentadas.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Cómo solicitar */}
      <section className="bg-sigeb-gray py-16">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold text-sigeb-blue-dark">
            ¿Cómo solicitar una beca?
          </h2>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {[
              { numero: '01', titulo: 'REGISTRATE', texto: 'Crea tu cuenta con tu CUI' },
              { numero: '02', titulo: 'POSTULATE', texto: 'Selecciona una convocatoria' },
              { numero: '03', titulo: 'DOCUMENTA', texto: 'Carga los requisitos' },
              { numero: '04', titulo: 'EVALUACION', texto: 'Tu solicitud es evaluada' },
              { numero: '05', titulo: 'COMITÉ', texto: 'Se revisa tu expediente' },
              { numero: '06', titulo: 'RESULTADO', texto: 'Consulta tu resolución' },
            ].map((paso) => (
              <div key={paso.numero} className="p-6 text-center">
                <div className="mb-4 text-5xl font-bold text-sigeb-blue">
                  {paso.numero}
                </div>
                <h3 className="mb-2 font-semibold text-sigeb-blue-dark">
                  {paso.titulo}
                </h3>
                <p className="text-gray-600">{paso.texto}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}