import { HTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/utils/cn'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  title?: string
  description?: string
  dismissible?: boolean
  onDismiss?: () => void
}

const variantStyles: Record<AlertVariant, { wrapper: string; icon: string }> = {
  info:    { wrapper: 'bg-[var(--color-status-info-background)] text-[var(--color-status-info-foreground)]',       icon: 'ℹ' },
  success: { wrapper: 'bg-[var(--color-status-success-background)] text-[var(--color-status-success-foreground)]', icon: '✓' },
  warning: { wrapper: 'bg-[var(--color-status-warning-background)] text-[var(--color-status-warning-foreground)]', icon: '⚠' },
  error:   { wrapper: 'bg-[var(--color-status-error-background)] text-[var(--color-status-error-foreground)]',     icon: '✕' },
}

const defaultTitles: Record<AlertVariant, string> = {
  info:    'Info Alert',
  success: 'Success Alert',
  warning: 'Warning Alert',
  error:   'Error Alert',
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant     = 'info',
      title,
      description = 'Inline feedback for the surrounding content.',
      dismissible = false,
      onDismiss,
      className,
      ...props
    },
    ref,
  ) => {
    const [dismissed, setDismissed] = useState(false)
    if (dismissed) return null

    const { wrapper, icon } = variantStyles[variant]

    const handleDismiss = () => {
      setDismissed(true)
      onDismiss?.()
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'flex flex-col gap-3 p-4 rounded-[var(--radius-24)]',
          wrapper,
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[16px] leading-none" aria-hidden="true">{icon}</span>
            <p className="font-body font-semibold text-title-m leading-6 tracking-[0.25px]">
              {title ?? defaultTitles[variant]}
            </p>
          </div>
          {dismissible && (
            <button
              type="button"
              aria-label="Dismiss"
              onClick={handleDismiss}
              className="font-body text-body-s leading-5 opacity-70 hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          )}
        </div>
        {description && (
          <p className="font-body font-normal text-body-s leading-5 tracking-[0.2px]">
            {description}
          </p>
        )}
      </div>
    )
  },
)

Alert.displayName = 'Alert'

/* ── Toast ──────────────────────────────────────────────────────────────────── */
export const Toast = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, ...props }, ref) => (
    <Alert
      ref={ref}
      className={cn('w-[360px] shadow-modal', className)}
      {...props}
    />
  ),
)
Toast.displayName = 'Toast'

/* ── Banner ─────────────────────────────────────────────────────────────────── */
export interface BannerProps extends AlertProps {
  /** Banner stretches full-width and sits at top of page */
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({ className, ...props }, ref) => (
    <Alert
      ref={ref}
      className={cn('w-full rounded-none px-6 py-3 flex-row items-center', className)}
      {...props}
    />
  ),
)
Banner.displayName = 'Banner'
