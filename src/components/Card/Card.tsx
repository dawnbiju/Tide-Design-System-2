import { HTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/utils/cn'
import { Button } from '../Button'

export type CardVariant = 'standard' | 'elevated' | 'outlined' | 'interactive' | 'expandable'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  title?: string
  subtitle?: string
  body?: string
  badge?: string
  /** For expandable cards: the hidden detail content */
  expandedContent?: string
  onView?: () => void
  onShare?: () => void
}

const wrapperVariant: Record<CardVariant, string> = {
  standard:    'bg-[var(--color-bg-page)] border border-[var(--color-border-subtle)]',
  elevated:    'bg-[var(--color-bg-page)] shadow-card',
  outlined:    'bg-[var(--color-bg-page)] border border-[var(--color-border-brand)]',
  interactive: 'bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] cursor-pointer hover:shadow-card transition-shadow',
  expandable:  'bg-[var(--color-bg-page)] border border-[var(--color-border-subtle)]',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'standard',
      title   = 'Quarterly review',
      subtitle,
      body,
      badge   = 'Live',
      expandedContent,
      onView,
      onShare,
      className,
      ...props
    },
    ref,
  ) => {
    const [expanded, setExpanded] = useState(false)
    const isExpandable = variant === 'expandable'

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-4 p-6 rounded-[var(--radius-24)]',
          wrapperVariant[variant],
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <p className="font-body font-bold text-heading-s leading-8 tracking-[0.25px] text-[var(--color-text-primary)]">
              {title}
            </p>
            {subtitle && (
              <p className="font-body font-normal text-body-s leading-5 tracking-[0.2px] text-[var(--color-text-secondary)]">
                {subtitle}
              </p>
            )}
          </div>
          {badge && (
            <span className="font-body font-normal text-body-s leading-5 tracking-[0.2px] text-[var(--color-text-brand)] whitespace-nowrap">
              {badge}
            </span>
          )}
        </div>

        {/* Body */}
        {body && (
          <p className="font-body font-normal text-body-m leading-6 tracking-[0.25px] text-[var(--color-text-secondary)]">
            {body}
          </p>
        )}

        {/* Expanded detail */}
        {isExpandable && expanded && expandedContent && (
          <p className="font-body font-normal text-body-s leading-5 tracking-[0.2px] text-[var(--color-text-secondary)]">
            {expandedContent}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isExpandable ? (
            <Button
              size="small"
              variant="primary"
              onClick={() => setExpanded(e => !e)}
            >
              {expanded ? 'Collapse' : 'Expand'}
            </Button>
          ) : (
            <>
              <Button size="small" variant="primary" onClick={onView}>View</Button>
              <Button size="small" variant="secondary" onClick={onShare}>Share</Button>
            </>
          )}
        </div>
      </div>
    )
  },
)

Card.displayName = 'Card'
