import { HTMLAttributes, ReactNode, forwardRef } from 'react'
import { cn } from '@/utils/cn'

// ── Tokens used ──────────────────────────────────────────────────────────────
// --color-bg-brand       step circle background + connector line
// --color-text-inverse   step number
// --color-text-primary   step title + heading bold part
// --color-text-secondary step body text
// --color-bg-page        page background (connector line gap effect)

export interface StepItem {
  title: string
  body?: string
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  /** Bold prefix of the heading (e.g. "Your Tide card is shipped,") */
  headingBold?: string
  /** Regular suffix of the heading */
  headingLight?: string
  steps: StepItem[]
  /** Label for the CTA button at the bottom */
  ctaLabel?: string
  onCta?: () => void
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ headingBold, headingLight, steps, ctaLabel = 'Get started', onCta, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-8 max-w-sm', className)}
        {...props}
      >
        {/* Heading */}
        {(headingBold || headingLight) && (
          <h2 className="font-body text-[22px] leading-[30px] tracking-[-0.25px] text-[var(--color-text-primary)]">
            {headingBold && <strong className="font-semibold">{headingBold}</strong>}
            {headingLight && <span className="font-normal"> {headingLight}</span>}
          </h2>
        )}

        {/* Steps */}
        <ol className="flex flex-col">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1
            return (
              <li key={i} className="flex gap-4">
                {/* Left column: circle + connector */}
                <div className="flex flex-col items-center">
                  {/* Circle */}
                  <div className="w-9 h-9 rounded-full bg-[var(--color-bg-brand)] flex items-center justify-center shrink-0 z-10">
                    <span className="font-body font-semibold text-[14px] leading-none text-[var(--color-text-inverse)]">
                      {i + 1}
                    </span>
                  </div>
                  {/* Connector line */}
                  {!isLast && (
                    <div className="w-0.5 flex-1 bg-[var(--color-bg-brand)] my-1 min-h-[24px]" />
                  )}
                </div>

                {/* Right column: text */}
                <div className={cn('flex flex-col gap-0.5', isLast ? 'pb-0' : 'pb-6')}>
                  <p className="font-body font-semibold text-[14px] leading-[20px] tracking-[0.2px] text-[var(--color-text-primary)]">
                    {step.title}
                  </p>
                  {step.body && (
                    <p className="font-body font-normal text-[12px] leading-[18px] tracking-[0.2px] text-[var(--color-text-secondary)]">
                      {step.body}
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ol>

        {/* CTA */}
        {ctaLabel && (
          <button
            type="button"
            onClick={onCta}
            className={cn(
              'self-start px-6 py-3 rounded-full font-body font-medium text-[16px] leading-[24px] tracking-[0.25px]',
              'bg-[var(--color-bg-brand)] text-[var(--color-text-inverse)]',
              'hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2',
              'focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bg-brand)]',
            )}
          >
            {ctaLabel}
          </button>
        )}
      </div>
    )
  },
)
Stepper.displayName = 'Stepper'
