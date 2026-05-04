import { cn } from '@/lib/utils/cn'

interface CheckboxGroupProps {
  id: string
  label: string
  options: readonly string[]
  value: string[]
  onChange: (value: string[]) => void
  hint?: string
  error?: string
  required?: boolean
}

export function CheckboxGroup({
  id,
  label,
  options,
  value,
  onChange,
  hint,
  error,
  required,
}: CheckboxGroupProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  function handleChange(option: string, checked: boolean) {
    if (checked) {
      onChange([...value, option])
    } else {
      onChange(value.filter((v) => v !== option))
    }
  }

  return (
    <fieldset
      className={cn('mb-6 border-0 p-0 m-0', error && 'border-l-[4px] border-govuk-error pl-3')}
      aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
    >
      <legend className="mb-1 text-base font-bold text-govuk-text">
        {label}
        {required && <span className="sr-only"> (required)</span>}
      </legend>

      {hint && (
        <div id={hintId} className="mb-1 text-sm text-govuk-secondary-text">
          {hint}
        </div>
      )}

      {error && (
        <p id={errorId} aria-live="polite" aria-atomic="true" className="mb-2 text-sm font-bold text-govuk-error">
          <span className="sr-only">Error:</span> {error}
        </p>
      )}

      <div className="mt-2 space-y-2">
        {options.map((option) => {
          const checkboxId = `${id}-${option.toLowerCase().replace(/\s+/g, '-')}`
          const isChecked = value.includes(option)

          return (
            <div key={option} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={checkboxId}
                value={option}
                checked={isChecked}
                onChange={(e) => handleChange(option, e.target.checked)}
                className={cn(
                  'h-8 w-8 cursor-pointer border-2 border-govuk-border-dark',
                  'focus:outline-[3px] focus:outline-govuk-focus focus:outline-offset-0 focus:shadow-[inset_0_0_0_2px_#0b0c0c]'
                )}
              />
              <label
                htmlFor={checkboxId}
                className="cursor-pointer text-base text-govuk-text"
              >
                {option}
              </label>
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}
