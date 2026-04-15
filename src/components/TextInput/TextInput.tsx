import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/utils/cn'

export type InputState  = 'default' | 'success' | 'error' | 'warning' | 'disabled'
export type InputAffix  = 'none' | 'prefix' | 'suffix'

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string
  helper?: string
  counter?: string
  state?: InputState
  affix?: InputAffix
  prefixSymbol?: string
  suffixSymbol?: string
  /** Render a <textarea> instead of an <input> */
  multiline?: boolean
}

const stateStyles: Record<InputState, string> = {
  default:  'border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]',
  success:  'border-[var(--color-status-success-foreground)] bg-[var(--color-bg-surface)]',
  error:    'border-[var(--color-status-error-foreground)] bg-[var(--color-bg-surface)]',
  warning:  'border-[var(--color-status-warning-foreground)] bg-[var(--color-bg-surface)]',
  disabled: 'border-[var(--color-control-disabled-foreground)] bg-[var(--color-control-disabled-background)] cursor-not-allowed',
}

const helperColor: Record<InputState, string> = {
  default:  'text-[var(--color-text-secondary)]',
  success:  'text-[var(--color-status-success-foreground)]',
  error:    'text-[var(--color-status-error-foreground)]',
  warning:  'text-[var(--color-status-warning-foreground)]',
  disabled: 'text-[var(--color-control-disabled-foreground)]',
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      helper,
      counter,
      state = 'default',
      affix = 'none',
      prefixSymbol = '₹',
      suffixSymbol = '#',
      multiline = false,
      className,
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const autoId = useId()
    const id = idProp ?? autoId
    const isDisabled = state === 'disabled'

    const fieldCls = cn(
      'flex items-center justify-between h-12 px-4 rounded-[var(--radius-16)] border',
      stateStyles[state],
      'focus-within:outline focus-within:outline-2 focus-within:outline-[var(--color-text-brand)] focus-within:outline-offset-[-1px]',
      multiline && 'h-auto py-3 items-start',
    )

    const inputCls =
      'flex-1 font-body text-body-m leading-6 tracking-[0.25px] bg-transparent outline-none placeholder:text-[var(--color-text-secondary)] disabled:cursor-not-allowed'

    const textColor = isDisabled
      ? 'text-[var(--color-control-disabled-foreground)]'
      : 'text-[var(--color-text-primary)]'

    return (
      <div className={cn('flex flex-col gap-2 w-full', className)}>
        {label && (
          <label
            htmlFor={id}
            className="font-body font-semibold text-title-m leading-6 tracking-[0.25px] text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}

        <div className={fieldCls}>
          {affix === 'prefix' && (
            <span className={cn('font-body text-body-m leading-6 tracking-[0.25px] mr-3', isDisabled ? 'text-[var(--color-control-disabled-foreground)]' : 'text-[var(--color-text-secondary)]')}>
              {prefixSymbol}
            </span>
          )}

          {multiline ? (
            <textarea
              id={id}
              disabled={isDisabled}
              rows={4}
              className={cn(inputCls, textColor, 'resize-none')}
              {...(props as unknown as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref}
              id={id}
              disabled={isDisabled}
              className={cn(inputCls, textColor)}
              {...props}
            />
          )}

          {affix === 'suffix' && (
            <span className={cn('font-body text-body-s leading-5 tracking-[0.2px] ml-3', isDisabled ? 'text-[var(--color-control-disabled-foreground)]' : 'text-[var(--color-text-secondary)]')}>
              {suffixSymbol}
            </span>
          )}
        </div>

        {(helper || counter) && (
          <div className={cn('flex justify-between font-body text-body-s leading-5 tracking-[0.2px]', helperColor[state])}>
            {helper && <span>{helper}</span>}
            {counter && <span>{counter}</span>}
          </div>
        )}
      </div>
    )
  },
)

TextInput.displayName = 'TextInput'
