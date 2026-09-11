import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
      <p className="text-lg font-semibold text-sigeb-blue-dark">{title}</p>
      {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
