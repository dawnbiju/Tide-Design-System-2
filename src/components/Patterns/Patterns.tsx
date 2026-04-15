import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/Button/Button'
import { FeatureCard } from '@/components/FeatureCard/FeatureCard'

// ---------------------------------------------------------------------------
// PortalCTA — eyebrow + heading + body + up to 3 action buttons
// ---------------------------------------------------------------------------

export interface PortalCTAButton {
  label: string
  variant?: 'primary' | 'secondary'
  theme?: 'default' | 'inverse'
  onClick?: () => void
}

export interface PortalCTAProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  heading: string
  body?: string
  buttons?: PortalCTAButton[]
  /** 'light' = white surface, 'brand' = deep navy */
  theme?: 'light' | 'brand'
}

export const PortalCTA = forwardRef<HTMLDivElement, PortalCTAProps>(
  ({ eyebrow, heading, body, buttons = [], theme = 'light', className, ...props }, ref) => {
    const isBrand = theme === 'brand'

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-6 w-full rounded-[var(--radius-24)] p-8 md:p-12',
          isBrand ? 'bg-[var(--color-bg-brand-strong)]' : 'bg-[var(--color-bg-surface)]',
          className,
        )}
        {...props}
      >
        <div className="flex flex-col gap-4">
          {eyebrow && (
            <span
              className={cn(
                'font-body font-medium text-caption leading-4 tracking-[0.5px] uppercase',
                isBrand ? 'text-[var(--color-text-inverse)]' : 'text-[var(--color-text-brand)]',
              )}
            >
              {eyebrow}
            </span>
          )}
          <h2
            className={cn(
              'font-body font-semibold text-display-l leading-[52px] tracking-[-0.5px]',
              isBrand ? 'text-[var(--color-text-inverse)]' : 'text-[var(--color-text-primary)]',
            )}
          >
            {heading}
          </h2>
          {body && (
            <p
              className={cn(
                'font-body font-normal text-body-l leading-7 tracking-[0.25px]',
                isBrand ? 'text-[var(--color-text-inverse)]' : 'text-[var(--color-text-secondary)]',
              )}
            >
              {body}
            </p>
          )}
        </div>

        {buttons.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {buttons.map((btn, i) => (
              <Button
                key={i}
                variant={btn.variant ?? (i === 0 ? 'primary' : 'secondary')}
                theme={btn.theme ?? (isBrand ? 'inverse' : 'default')}
                size="medium"
                label={btn.label}
                onClick={btn.onClick}
              />
            ))}
          </div>
        )}
      </div>
    )
  },
)

PortalCTA.displayName = 'PortalCTA'

// ---------------------------------------------------------------------------
// BenefitGrid — heading + body + responsive FeatureCard grid
// ---------------------------------------------------------------------------

export interface BenefitItem {
  title: string
  body: string
  icon?: React.ReactNode
}

export interface BenefitGridProps extends HTMLAttributes<HTMLDivElement> {
  heading: string
  body?: string
  items: BenefitItem[]
  /** Number of columns on large screens (default: 3) */
  columns?: 2 | 3 | 4
  cardTheme?: 'light' | 'brand' | 'inverse'
}

const colsMap = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
}

export const BenefitGrid = forwardRef<HTMLDivElement, BenefitGridProps>(
  ({ heading, body, items, columns = 3, cardTheme = 'light', className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col gap-10 w-full', className)} {...props}>
        <div className="flex flex-col gap-4 max-w-2xl">
          <h2 className="font-body font-semibold text-heading-l leading-10 tracking-[-0.25px] text-[var(--color-text-primary)]">
            {heading}
          </h2>
          {body && (
            <p className="font-body font-normal text-body-l leading-7 tracking-[0.25px] text-[var(--color-text-secondary)]">
              {body}
            </p>
          )}
        </div>

        <div className={cn('grid grid-cols-1 gap-6', colsMap[columns])}>
          {items.map((item, i) => (
            <FeatureCard
              key={i}
              theme={cardTheme}
              title={item.title}
              body={item.body}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    )
  },
)

BenefitGrid.displayName = 'BenefitGrid'
