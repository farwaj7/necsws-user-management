import { cn } from '@/lib/utils/cn'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  options: SelectOption[] | readonly string[]
  hint?: string
  error?: string
  placeholder?: string
}

export function Select({
  id,
  label,
  options,
  hint,
  error,
  placeholder = 'Select an option',
  className,
  required,
  ...props
}: SelectProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  const normalised: SelectOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  )

  return (
    <div className={cn('mb-6', error && 'border-l-[4px] border-govuk-error pl-3')}>
      <label htmlFor={id} className="mb-1 block text-base font-bold text-govuk-text">
        {label}
        {required && <span className="sr-only"> (required)</span>}
      </label>

      {hint && (
        <div id={hintId} className="mb-1 text-sm text-govuk-secondary-text">
          {hint}
        </div>
      )}

      {error && (
        <p id={errorId} aria-live="polite" aria-atomic="true" className="mb-1 text-sm font-bold text-govuk-error">
          <span className="sr-only">Error:</span> {error}
        </p>
      )}

      <div className="relative">
        <select
          id={id}
          aria-required={required}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          className={cn(
            'block w-full appearance-none border-2 px-3 py-2 pr-10 text-base text-govuk-text bg-white',
            'focus:outline-[3px] focus:outline-govuk-focus focus:outline-offset-0 focus:shadow-[inset_0_0_0_2px_#0b0c0c]',
            error ? 'border-govuk-error' : 'border-govuk-border-dark',
            className
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {normalised.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Custom chevron — replaces the native arrow removed by appearance-none */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center" aria-hidden="true">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 7L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
