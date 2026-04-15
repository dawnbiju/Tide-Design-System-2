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

    // Figma: filled circle with ✓ when checked; border-only ring when unchecked
    const controlCls = cn(
      'rounded-full shrink-0 w-5 h-5 flex items-center justify-center border transition-colors',
      isDisabled
        ? 'bg-[var(--color-control-disabled-background)] border-[var(--color-control-disabled-foreground)]'
        : checked
          ? 'bg-[var(--color-bg-brand)] border-[var(--color-bg-brand)]'
          : 'bg-[var(--color-bg-page)] border-[var(--color-border-subtle)]',
    )

    return (
      <div className={cn('flex items-start gap-3', className)}>
        <div className="relative flex-shrink-0">
          <input
            ref={ref}
            type="radio"
            id={id}
            disabled={isDisabled}
            checked={checked}
            className="sr-only"
            {...props}
          />
          <div className={controlCls}>
            {checked && !isDisabled && (
              <span className="font-body font-normal text-[14px] leading-5 tracking-[0.2px] text-[var(--color-text-inverse)] select-none">
                ✓
              </span>
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
