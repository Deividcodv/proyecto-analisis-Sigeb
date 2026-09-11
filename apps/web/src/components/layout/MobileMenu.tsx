'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

const enlaces = [
  { href: '/', label: 'Inicio' },
  { href: '/convocatorias', label: 'Convocatorias' },
  { href: '/consulta', label: 'Consultar solicitud' },
  { href: '/nosotros', label: 'Nosotros' },
];

export function MobileMenu() {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={abierto}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-sigeb-blue-dark hover:bg-sigeb-gray"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          {abierto ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {abierto && (
        <div className="absolute inset-x-0 top-full border-t border-gray-200 bg-white shadow-lg">
          <nav className="flex flex-col px-4 py-4">
            {enlaces.map((enlace) => (
              <Link
                key={enlace.href}
                href={enlace.href}
                onClick={() => setAbierto(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-sigeb-blue-dark hover:bg-sigeb-gray"
              >
                {enlace.label}
              </Link>
            ))}
            <div className="mt-3 grid gap-3 border-t border-gray-200 pt-4">
              <Button href="/login" variant="ghost">
                Iniciar sesión
              </Button>
              <Button href="/registro" className="text-center">
                Registrarse
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
