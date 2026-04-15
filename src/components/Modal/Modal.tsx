import { HTMLAttributes, forwardRef, useEffect, useRef } from 'react'
import { cn } from '@/utils/cn'
import { Button } from '../Button'

export type ModalType = 'confirmation' | 'form' | 'information'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  type?: ModalType
  open?: boolean
  title?: string
  description?: string
  primaryLabel?: string
  secondaryLabel?: string
  onPrimary?: () => void
  onSecondary?: () => void
  onClose?: () => void
  /** For Form modal — custom form content */
  formContent?: React.ReactNode
  /** For Information modal — info block content */
  infoContent?: React.ReactNode
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      type          = 'confirmation',
      open          = false,
      title         = 'Delete saved draft?',
      description,
      primaryLabel,
      secondaryLabel = 'Cancel',
      onPrimary,
      onSecondary,
      onClose,
      formContent,
      infoContent,
      className,
      ...props
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose?.()
      }
      if (open) document.addEventListener('keydown', handler)
      return () => document.removeEventListener('keydown', handler)
    }, [open, onClose])

    if (!open) return null

    const defaultPrimary =
      type === 'confirmation'  ? 'Delete draft' :
      type === 'form'          ? 'Send invite'  :
      'Got it'

    return (
      /* Backdrop */
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--tide-color-ink-950)]/40"
        onClick={e => { if (e.target === e.currentTarget) onClose?.() }}
      >
        <div
          ref={ref ?? innerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className={cn(
            'bg-[var(--color-bg-page)] flex flex-col gap-6 p-8 rounded-[var(--radius-24)] shadow-modal w-[560px] max-w-[calc(100vw-2rem)]',
            className,
          )}
          {...props}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <p id="modal-title" className="font-display font-semibold text-heading-m leading-8 tracking-[0.4px] text-[var(--color-text-primary)]">
              {title}
            </p>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="font-body text-body-m leading-6 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          {type === 'confirmation' && description && (
            <p className="font-body font-normal text-body-m leading-6 tracking-[0.25px] text-[var(--color-text-secondary)]">
              {description}
            </p>
          )}

          {type === 'form' && (
            <div className="bg-[var(--color-bg-page)] border border-[var(--color-border-subtle)] rounded-[var(--radius-24)] px-6 py-4 flex flex-col gap-2">
              {formContent ?? (
                <>
                  <p className="font-body font-semibold text-body-m leading-6 tracking-[0.25px] text-[var(--color-text-primary)]">Email address</p>
                  <p className="font-body font-normal text-body-m leading-6 tracking-[0.25px] text-[var(--color-text-secondary)]">name@company.com</p>
                </>
              )}
            </div>
          )}

          {type === 'information' && (
            <div className="bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] rounded-[var(--radius-24)] px-6 py-4">
              {infoContent ?? (
                <p className="font-body font-normal text-body-m leading-6 tracking-[0.25px] text-[var(--color-text-secondary)]">
                  {description ?? 'Dialogs should trap focus, dismiss on Escape, and return focus to the triggering action when closed.'}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="primary" size="small" onClick={onPrimary}>
              {primaryLabel ?? defaultPrimary}
            </Button>
            <Button variant="secondary" size="small" onClick={onSecondary ?? onClose}>
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </div>
    )
  },
)

Modal.displayName = 'Modal'
