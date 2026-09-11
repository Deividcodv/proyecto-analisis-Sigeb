import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

const styles: Record<Variant, string> = {
  primary: 'bg-sigeb-gold text-sigeb-blue-dark hover:bg-yellow-500',
  secondary: 'border-2 border-white text-white hover:bg-white hover:text-sigeb-blue',
  ghost: 'border-2 border-sigeb-blue text-sigeb-blue hover:bg-sigeb-blue hover:text-white',
};

export function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  onClick,
  disabled = false,
}: ButtonProps) {
  const classes = `inline-block px-6 py-3 rounded-lg font-semibold transition-colors ${styles[variant]} ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}