import { cn } from '@/lib/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  hint?: string
  error?: string
}

export function Input({ id, label, hint, error, className, required, ...props }: InputProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

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

      <input
        id={id}
        aria-required={required}
        aria-describedby={describedBy}
        aria-invalid={!!error}
        className={cn(
          'block w-full border-2 px-3 py-2 text-base text-govuk-text',
          'focus:outline-[3px] focus:outline-govuk-focus focus:outline-offset-0 focus:shadow-[inset_0_0_0_2px_#0b0c0c]',
          error ? 'border-govuk-error' : 'border-govuk-border-dark',
          className
        )}
        {...props}
      />
    </div>
  )
}
