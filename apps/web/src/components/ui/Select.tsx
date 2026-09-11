import type { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
}

export function Select({
  label,
  options,
  placeholder = 'Seleccionar...',
  className = '',
  id,
  ...rest
}: SelectProps) {
  const selectId = id ?? rest.name;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1 block text-sm font-medium text-sigeb-blue-dark"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-sigeb-blue focus:outline-none focus:ring-2 focus:ring-sigeb-blue/20 ${className}`}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((opcion) => (
          <option key={opcion.value} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </select>
    </div>
  );
}
