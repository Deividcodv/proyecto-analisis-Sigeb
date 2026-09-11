interface SpinnerProps {
  className?: string;
}

export function Spinner({ className = '' }: SpinnerProps) {
  return (
    <div
      className={`inline-block h-8 w-8 animate-spin rounded-full border-4 border-sigeb-blue border-t-transparent ${className}`}
      role="status"
      aria-label="Cargando"
    />
  );
}
