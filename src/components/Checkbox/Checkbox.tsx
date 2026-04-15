import { InputHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/utils/cn'

export type CheckboxState = 'unchecked' | 'checked' | 'indeterminate' | 'disabled'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  indeterminate?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, indeterminate = false, disabled, checked, className, id: idProp, ...props }, ref) => {
    const autoId = useId()
    const id = idProp ?? autoId

    const isChecked      = checked || indeterminate
    const isDisabled     = disabled
    const controlBg      = isDisabled
      ? 'bg-[var(--color-control-disabled-background)] border-[var(--color-control-disabled-foreground)]'
      : isChecked
        ? 'bg-[var(--color-bg-brand)] border-[var(--color-bg-brand)]'
        : 'bg-[var(--color-bg-page)] border-[var(--color-border-subtle)]'

    return (
      <div className={cn('flex items-start gap-3', className)}>
        <div className="relative flex-shrink-0">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            disabled={isDisabled}
            checked={checked}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              'w-5 h-5 rounded-[var(--radius-8)] border flex items-center justify-center transition-colors',
              controlBg,
            )}
          >
            {indeterminate && (
              <span className="text-[var(--color-text-inverse)] text-[14px] leading-none select-none">−</span>
            )}
            {!indeterminate && isChecked && (
              <span className="text-[var(--color-text-inverse)] text-[12px] leading-none select-none">✓</span>
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

Checkbox.displayName = 'Checkbox'
