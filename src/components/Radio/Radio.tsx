import { InputHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/utils/cn'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, disabled, checked, className, id: idProp, ...props }, ref) => {
    const autoId = useId()
    const id = idProp ?? autoId

    const isDisabled = disabled
    const ringColor  = isDisabled
      ? 'border-[var(--color-control-disabled-foreground)]'
      : checked
        ? 'border-[var(--color-bg-brand)]'
        : 'border-[var(--color-border-subtle)]'

    return (
      <div className={cn('flex items-start gap-3', className)}>
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            ref={ref}
            type="radio"
            id={id}
            disabled={isDisabled}
            checked={checked}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
              ringColor,
              isDisabled ? 'bg-[var(--color-control-disabled-background)]' : 'bg-[var(--color-bg-page)]',
            )}
          >
            {checked && !isDisabled && (
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-bg-brand)]" />
            )}
          </div>
        </div>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'font-body font-normal text-body-m leading-6 tracking-[0.25px] cursor-pointer',
              isDisabled
                ? 'text-[var(--color-control-disabled-foreground)] cursor-not-allowed'
                : 'text-[var(--color-text-primary)]',
            )}
          >
            {label}
          </label>
        )}
      </div>
    )
  },
)

Radio.displayName = 'Radio'
