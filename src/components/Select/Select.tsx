import { HTMLAttributes, forwardRef, useState, useRef, useEffect, useId } from 'react'
import { cn } from '@/utils/cn'

export interface SelectOption {
  value: string
  label: string
  group?: string
  disabled?: boolean
}

export type SelectMode  = 'single' | 'multi'
export type SelectState = 'default' | 'error' | 'disabled'

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label?: string
  helper?: string
  options?: SelectOption[]
  value?: string | string[]
  mode?: SelectMode
  state?: SelectState
  placeholder?: string
  onChange?: (value: string | string[]) => void
  searchable?: boolean
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      helper,
      options = [],
      value,
      mode = 'single',
      state = 'default',
      placeholder = 'Select...',
      onChange,
      searchable = false,
      className,
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const autoId     = useId()
    const id         = idProp ?? autoId
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)
    const isDisabled = state === 'disabled'
    const isError    = state === 'error'
    const isMulti    = mode === 'multi'

    const selectedValues = isMulti
      ? (value as string[] | undefined) ?? []
      : value != null ? [value as string] : []

    const filtered = options.filter(o =>
      !query || o.label.toLowerCase().includes(query.toLowerCase()),
    )

    // Group options
    const groups = filtered.reduce<Record<string, SelectOption[]>>((acc, o) => {
      const g = o.group ?? '__default__'
      if (!acc[g]) acc[g] = []
      acc[g].push(o)
      return acc
    }, {})

    const toggle = (v: string) => {
      if (isDisabled) return
      if (isMulti) {
        const next = selectedValues.includes(v)
          ? selectedValues.filter(x => x !== v)
          : [...selectedValues, v]
        onChange?.(next)
      } else {
        onChange?.(v)
        setOpen(false)
      }
    }

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
      }
      document.addEventListener('mousedown', handler)
      return () => document.removeEventListener('mousedown', handler)
    }, [])

    const fieldBorderCls = isDisabled ? 'border-[var(--color-control-disabled-foreground)] bg-[var(--color-control-disabled-background)]'
      : isError  ? 'border-[var(--color-status-error-foreground)] bg-[var(--color-bg-surface)]'
      : open     ? 'border-[var(--color-text-brand)] bg-[var(--color-bg-surface)]'
      :             'border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]'

    const displayLabel = isMulti ? null : options.find(o => o.value === value)?.label ?? null

    return (
      <div ref={ref} className={cn('flex flex-col gap-2 w-full relative', className)} {...props}>
        {label && (
          <label
            id={`${id}-label`}
            htmlFor={id}
            className="font-body font-semibold text-title-m leading-6 tracking-[0.25px] text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}

        <div ref={containerRef} className="relative">
          {/* Trigger */}
          <button
            id={id}
            type="button"
            disabled={isDisabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-labelledby={label ? `${id}-label` : undefined}
            onClick={() => !isDisabled && setOpen(o => !o)}
            className={cn(
              'w-full flex items-center justify-between px-4 rounded-[var(--radius-16)] border min-h-12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-text-brand)] focus-visible:outline-offset-[-1px] transition-colors',
              fieldBorderCls,
              isMulti ? 'py-3' : '',
            )}
          >
            <div className="flex items-center gap-2 flex-wrap">
              {isMulti ? (
                selectedValues.length > 0 ? (
                  <>
                    {selectedValues.slice(0, 2).map(v => (
                      <span
                        key={v}
                        className="bg-[var(--color-bg-subtle)] text-[var(--color-text-brand)] text-body-s leading-5 tracking-[0.2px] px-2 py-1 rounded-full"
                      >
                        {options.find(o => o.value === v)?.label ?? v}
                      </span>
                    ))}
                    {selectedValues.length > 2 && (
                      <span className="bg-[var(--color-bg-subtle)] text-[var(--color-text-brand)] text-body-s leading-5 px-2 py-1 rounded-full">
                        +{selectedValues.length - 2}
                      </span>
                    )}
                  </>
                ) : (
                  <span className={isDisabled ? 'text-[var(--color-control-disabled-foreground)]' : 'text-[var(--color-text-secondary)]'}>{placeholder}</span>
                )
              ) : (
                <span className={cn('font-body text-body-m leading-6 tracking-[0.25px]', isDisabled ? 'text-[var(--color-control-disabled-foreground)]' : displayLabel ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]')}>
                  {displayLabel ?? placeholder}
                </span>
              )}
            </div>
            <span className={cn('ml-2 text-[var(--color-text-secondary)] text-[10px]', isDisabled && 'text-[var(--color-control-disabled-foreground)]')}>
              {open ? '▲' : '▼'}
            </span>
          </button>

          {/* Dropdown */}
          {open && (
            <div
              role="listbox"
              aria-multiselectable={isMulti}
              className="absolute top-full left-0 right-0 mt-1 z-50 bg-[var(--color-bg-page)] border border-[var(--color-border-subtle)] rounded-[var(--radius-24)] p-2 shadow-modal max-h-64 overflow-y-auto"
            >
              {searchable && (
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-4 py-2 mb-1 font-body text-body-s text-[var(--color-text-secondary)] rounded-[var(--radius-16)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] outline-none focus:border-[var(--color-text-brand)]"
                />
              )}
              {Object.entries(groups).map(([group, opts]) => (
                <div key={group}>
                  {group !== '__default__' && (
                    <p className="font-body font-medium text-caption leading-4 tracking-[0.25px] text-[var(--color-text-brand)] px-3 py-2 uppercase">
                      {group}
                    </p>
                  )}
                  {opts.map(opt => {
                    const isSel = selectedValues.includes(opt.value)
                    return (
                      <div
                        key={opt.value}
                        role="option"
                        aria-selected={isSel}
                        aria-disabled={opt.disabled}
                        onClick={() => !opt.disabled && toggle(opt.value)}
                        className={cn(
                          'px-3 py-2.5 rounded-[var(--radius-16)] font-body text-body-m leading-6 tracking-[0.25px] cursor-pointer transition-colors',
                          opt.disabled ? 'text-[var(--color-control-disabled-foreground)] cursor-not-allowed' :
                          isSel        ? 'text-[var(--color-text-brand)] bg-[var(--color-bg-subtle)]' :
                                         'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]',
                        )}
                      >
                        {opt.label}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {helper && (
          <p className={cn('font-body text-body-s leading-5 tracking-[0.2px]',
            isDisabled ? 'text-[var(--color-control-disabled-foreground)]' :
            isError    ? 'text-[var(--color-status-error-foreground)]'     :
                         'text-[var(--color-text-secondary)]',
          )}>
            {helper}
          </p>
        )}
      </div>
    )
  },
)

Select.displayName = 'Select'
