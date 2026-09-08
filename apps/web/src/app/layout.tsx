import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SIGEB - Sistema Integral de Gestión de Becas',
  description:
    'Plataforma para que el Ministerio de Educación administre el ciclo completo de una beca: publicación de convocatorias, postulación de estudiantes, carga y revisión de documentos, evaluación, decisión de comités evaluadores, y consulta de estado.',
  keywords: ['becas', 'MINEDUC', 'Guatemala', 'educación', 'postulación'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
