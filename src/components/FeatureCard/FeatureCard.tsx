import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

export type FeatureCardTheme = 'light' | 'brand' | 'inverse'

export interface FeatureCardProps extends HTMLAttributes<HTMLDivElement> {
  theme?: FeatureCardTheme
  title: string
  body: string
  /** Optional icon — defaults to coloured dot badge */
  icon?: React.ReactNode
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ theme = 'light', title, body, icon, className, ...props }, ref) => {
    const isDark = theme === 'brand' || theme === 'inverse'

    const wrapperCls = cn(
      'flex flex-col gap-4 p-6 rounded-[var(--radius-24)] w-full',
      theme === 'inverse' && 'bg-[var(--color-bg-brand-strong)]',
      theme === 'brand'   && 'bg-[var(--color-bg-brand)]',
      theme === 'light'   && 'bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] shadow-card',
      className,
    )

    const badgeCls = cn(
      'flex items-center justify-center rounded-full w-12 h-12 shrink-0',
      isDark ? 'bg-[var(--color-bg-page)]' : 'bg-[var(--tide-color-yellow-400)]',
    )

    const dotCls = cn(
      'w-4 h-4 rounded-full',
      isDark ? 'bg-[var(--color-text-brand)]' : 'bg-[var(--color-text-primary)]',
    )

    return (
      <div ref={ref} className={wrapperCls} {...props}>
        <div className={badgeCls}>
          {icon ?? <span className={dotCls} />}
        </div>
        <p
          className={cn(
            'font-body font-bold text-heading-s leading-8 tracking-[0.25px]',
            isDark ? 'text-[var(--color-text-inverse)]' : 'text-[var(--color-text-primary)]',
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            'font-body font-normal text-body-m leading-6 tracking-[0.25px]',
            isDark ? 'text-[var(--color-text-inverse)]' : 'text-[var(--color-text-secondary)]',
          )}
        >
          {body}
        </p>
      </div>
    )
  },
)

FeatureCard.displayName = 'FeatureCard'
