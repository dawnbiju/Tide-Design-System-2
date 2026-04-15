import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

export type ButtonStyle = 'primary' | 'secondary'
export type ButtonTheme = 'default' | 'inverse'
export type ButtonSize  = 'medium' | 'small'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style — filled vs outlined */
  variant?: ButtonStyle
  /** Surface context the button sits on */
  theme?: ButtonTheme
  /** Height of the button */
  size?: ButtonSize
  /** Button label */
  label?: string
}

const base =
  'inline-flex items-center justify-center rounded-full font-body font-medium tracking-[0.25px] leading-6 text-label-btn transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap'

const variants: Record<ButtonStyle, Record<ButtonTheme, string>> = {
  primary: {
    default: 'bg-[var(--color-bg-brand)] text-[var(--color-text-inverse)] focus-visible:outline-[var(--color-bg-brand)] hover:opacity-90',
    inverse: 'bg-[var(--color-bg-page)]  text-[var(--color-text-brand)]  focus-visible:outline-white hover:opacity-90',
  },
  secondary: {
    default: 'bg-transparent border border-[var(--color-border-brand)] text-[var(--color-text-brand)] focus-visible:outline-[var(--color-border-brand)] hover:bg-[var(--color-bg-subtle)]',
    inverse: 'bg-transparent border border-[var(--color-border-inverse)] text-[var(--color-text-inverse)] focus-visible:outline-white hover:bg-white/10',
  },
}

const sizes: Record<ButtonSize, string> = {
  medium: 'h-12 px-6 text-[16px]',
  small:  'h-10 px-4 text-[16px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      theme   = 'default',
      size    = 'medium',
      label,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant][theme], sizes[size], className)}
        {...props}
      >
        {label ?? children}
      </button>
    )
  },
)

Button.displayName = 'Button'
