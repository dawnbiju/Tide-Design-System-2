import { TextareaHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/utils/cn'

export type TextareaState = 'default' | 'error' | 'disabled'

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'disabled'> {
  label?: string
  helper?: string
  counter?: string
  state?: TextareaState
}

const stateStyles: Record<TextareaState, string> = {
  default:  'border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]',
  error:    'border-[var(--color-status-error-foreground)] bg-[var(--color-bg-surface)]',
  disabled: 'border-[var(--color-control-disabled-foreground)] bg-[var(--color-control-disabled-background)] cursor-not-allowed',
}

const helperColor: Record<TextareaState, string> = {
  default:  'text-[var(--color-text-secondary)]',
  error:    'text-[var(--color-status-error-foreground)]',
  disabled: 'text-[var(--color-control-disabled-foreground)]',
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helper, counter, state = 'default', className, id: idProp, ...props }, ref) => {
    const autoId = useId()
    const id = idProp ?? autoId
    const isDisabled = state === 'disabled'

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

        <div
          className={cn(
            'rounded-[var(--radius-16)] border px-4 py-3',
            stateStyles[state],
            !isDisabled && 'focus-within:outline focus-within:outline-2 focus-within:outline-[var(--color-text-brand)] focus-within:outline-offset-[-1px]',
          )}
        >
          <textarea
            ref={ref}
            id={id}
            disabled={isDisabled}
            rows={4}
            className={cn(
              'w-full min-h-[128px] resize-none font-body text-body-m leading-6 tracking-[0.25px] bg-transparent outline-none placeholder:text-[var(--color-text-secondary)]',
              isDisabled
                ? 'text-[var(--color-control-disabled-foreground)] cursor-not-allowed'
                : 'text-[var(--color-text-primary)]',
            )}
            {...props}
          />
        </div>

        {(helper || counter) && (
          <div className={cn('flex justify-between font-body text-body-s leading-5 tracking-[0.2px]', helperColor[state])}>
            {helper && <span>{helper}</span>}
            {counter && <span className="ml-auto">{counter}</span>}
          </div>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
