import { cn } from '@/lib/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-block cursor-pointer px-6 py-3 font-bold text-base leading-none',
        'focus:outline-[3px] focus:outline-govuk-focus focus:outline-offset-0',
        'disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' && [
          'bg-govuk-green text-white',
          'shadow-[0_2px_0_#002d18]',
          'hover:bg-govuk-green-hover',
          'active:shadow-none active:translate-y-[2px]',
        ],
        variant === 'secondary' && [
          'bg-govuk-light-grey text-govuk-text',
          'shadow-[0_2px_0_#929191]',
          'hover:bg-[#dbdad9]',
          'active:shadow-none active:translate-y-[2px]',
        ],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
