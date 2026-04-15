import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

export type ToggleState = 'off' | 'on' | 'disabled'

export interface ToggleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label?: string
  stateLabel?: string
  state?: ToggleState
  onChange?: (on: boolean) => void
}

export const Toggle = forwardRef<HTMLDivElement, ToggleProps>(
  (
    {
      label        = 'Instant notifications',
      stateLabel   = 'Enabled',
      state        = 'off',
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    const isOn       = state === 'on'
    const isDisabled = state === 'disabled'

    const trackCls = cn(
      'relative flex items-center h-7 w-12 rounded-full px-1 transition-colors',
      isDisabled ? 'bg-[var(--color-control-disabled-background)]' :
      isOn       ? 'bg-[var(--color-bg-brand)]'                   :
                   'bg-[var(--tide-color-neutral-500)]',
    )

    const knobCls = cn(
      'w-5 h-5 rounded-full bg-[var(--color-bg-page)] shadow transition-transform duration-200',
      isOn ? 'translate-x-5' : 'translate-x-0',
    )

    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between gap-4', className)}
        {...props}
      >
        <div className="flex flex-col gap-1">
          <span
            className={cn(
              'font-body font-semibold text-title-m leading-6 tracking-[0.25px]',
              isDisabled ? 'text-[var(--color-control-disabled-foreground)]' : 'text-[var(--color-text-primary)]',
            )}
          >
            {label}
          </span>
          <span
            className={cn(
              'font-body font-normal text-body-s leading-5 tracking-[0.2px]',
              isDisabled ? 'text-[var(--color-control-disabled-foreground)]' : 'text-[var(--color-text-secondary)]',
            )}
          >
            {stateLabel}
          </span>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isOn}
          disabled={isDisabled}
          onClick={() => !isDisabled && onChange?.(!isOn)}
          className={cn(trackCls, 'cursor-pointer disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text-brand)]')}
        >
          <div className={knobCls} />
        </button>
      </div>
    )
  },
)

Toggle.displayName = 'Toggle'
