import Link from 'next/link';
import { Container } from '@/components/ui/Container';

const columnas = [
  {
    titulo: 'Institucional',
    enlaces: [
      { href: '/', label: 'Inicio' },
      { href: '/nosotros', label: 'Sobre SIGEB' },
      { href: '/transparencia', label: 'Transparencia' },
      { href: '/contacto', label: 'Contacto' },
    ],
  },
  {
    titulo: 'Becas',
    enlaces: [
      { href: '/convocatorias', label: 'Convocatorias' },
      { href: '/requisitos', label: 'Requisitos' },
      { href: '/faq', label: 'Preguntas frecuentes' },
    ],
  },
  {
    titulo: 'Ayuda',
    enlaces: [
      { href: '/ayuda', label: 'Centro de ayuda' },
      { href: '/consulta', label: 'Consultar solicitud' },
      { href: '/soporte', label: 'Soporte' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-sigeb-blue-dark py-12 text-white">
      <Container>
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">SIGEB</h3>
            <p className="text-sm text-sigeb-light">
              Sistema Integral de Gestión de Becas
            </p>
            <p className="mt-2 text-sm text-sigeb-light">
              Ministerio de Educación
            </p>
            <p className="text-sm text-sigeb-light">República de Guatemala</p>
          </div>

          {columnas.map((columna) => (
            <div key={columna.titulo}>
              <h4 className="mb-4 font-semibold">{columna.titulo.toUpperCase()}</h4>
              <ul className="space-y-2 text-sm text-sigeb-light">
                {columna.enlaces.map((enlace) => (
                  <li key={enlace.href}>
                    <Link href={enlace.href} className="hover:text-white">
                      {enlace.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-sigeb-light pt-8 text-center text-sm text-sigeb-light">
          <p>
            © 2026 Ministerio de Educación de Guatemala. Todos los derechos
            reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}