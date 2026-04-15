import {
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from 'react'
import { cn } from '@/utils/cn'

// ── Tokens used (only 5) ─────────────────────────────────────────────────────
// --color-bg-subtle      card background
// --color-text-primary   card title
// --color-text-secondary card body + inactive dots
// --color-bg-brand       arrow button + active dot
// --color-text-inverse   arrow icon

// ── CarouselCard ─────────────────────────────────────────────────────────────
export interface CarouselCardProps {
  title: string
  body: string
  /** Illustration slot — render any SVG / img / ReactNode */
  illustration?: ReactNode
  onClick?: () => void
  className?: string
}

export function CarouselCard({ title, body, illustration, onClick, className }: CarouselCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col justify-between gap-3 p-4 rounded-[var(--radius-24)] shrink-0 overflow-hidden',
        'bg-[var(--color-bg-subtle)] w-[220px] h-[200px]',
        className,
      )}
    >
      {/* Text */}
      <div className="flex flex-col gap-1.5 z-10">
        <p className="font-body font-semibold text-[14px] leading-[20px] tracking-[0.2px] text-[var(--color-text-primary)]">
          {title}
        </p>
        <p className="font-body font-normal text-[12px] leading-[18px] tracking-[0.2px] text-[var(--color-text-secondary)]">
          {body}
        </p>
      </div>

      {/* Illustration (bottom-right) */}
      {illustration && (
        <div className="absolute bottom-3 right-3 w-14 h-14 flex items-center justify-center pointer-events-none select-none">
          {illustration}
        </div>
      )}

      {/* Arrow button (bottom-left) */}
      <button
        type="button"
        aria-label={`Go to ${title}`}
        onClick={onClick}
        className={cn(
          'self-start mt-auto z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0',
          'bg-[var(--color-bg-brand)] text-[var(--color-text-inverse)]',
          'hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2',
          'focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bg-brand)]',
        )}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}

// ── Carousel ──────────────────────────────────────────────────────────────────
export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  /** Section heading above the carousel */
  heading?: string
  items: CarouselCardProps[]
  /** Cards visible at once on large screens (default: 4, last partially visible) */
  visibleCount?: number
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ heading, items, visibleCount = 4, className, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const trackRef = useRef<HTMLDivElement>(null)

    const maxIndex = items.length - 1

    const scrollTo = useCallback((index: number) => {
      const clamped = Math.max(0, Math.min(index, maxIndex))
      setActiveIndex(clamped)
      const card = trackRef.current?.children[clamped] as HTMLElement
      card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }, [maxIndex])

    // Sync dot on native scroll
    const onScroll = useCallback(() => {
      const track = trackRef.current
      if (!track) return
      const cardW = (track.children[0] as HTMLElement)?.offsetWidth + 16
      const idx = Math.round(track.scrollLeft / cardW)
      setActiveIndex(Math.max(0, Math.min(idx, maxIndex)))
    }, [maxIndex])

    return (
      <div ref={ref} className={cn('flex flex-col gap-6 w-full', className)} {...props}>

        {/* Heading */}
        {heading && (
          <h2 className="font-body font-semibold text-2xl sm:text-3xl leading-tight tracking-[-0.25px] text-[var(--color-text-primary)] text-center">
            {heading}
          </h2>
        )}

        {/* Track */}
        <div className="relative">
          {/* Fade hint on right edge */}
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[var(--color-bg-page)] to-transparent pointer-events-none z-10" />

          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 hide-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {items.map((item, i) => (
              <div key={i} className="snap-start">
                <CarouselCard {...item} />
              </div>
            ))}
            {/* Spacer so last card isn't hidden by fade */}
            <div className="shrink-0 w-4" aria-hidden />
          </div>
        </div>

        {/* Dot indicators + nav */}
        <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Carousel navigation">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-bg-brand)]',
                i === activeIndex
                  ? 'w-5 bg-[var(--color-bg-brand)]'
                  : 'w-2 bg-[var(--color-text-secondary)] opacity-30 hover:opacity-60',
              )}
            />
          ))}
        </div>
      </div>
    )
  },
)
Carousel.displayName = 'Carousel'
