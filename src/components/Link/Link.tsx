import { AnchorHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

export type LinkTheme = 'default' | 'inverse'

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  theme?: LinkTheme
  label?: string
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ theme = 'default', label, children, className, ...props }, ref) => {
    const isInverse = theme === 'inverse'
    return (
      <a
        ref={ref}
        className={cn(
          'inline-flex flex-col gap-[6px] font-body font-normal text-body-m leading-6 tracking-[0.25px] cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm',
          isInverse
            ? 'text-[var(--color-text-inverse)] underline underline-offset-4 decoration-white focus-visible:outline-white'
            : 'text-[var(--color-text-strong)] underline underline-offset-4 decoration-[var(--color-text-strong)] focus-visible:outline-[var(--color-text-strong)]',
          className,
        )}
        {...props}
      >
        {label ?? children}
      </a>
    )
  },
)

Link.displayName = 'Link'
