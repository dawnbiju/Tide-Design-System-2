import { HTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/utils/cn'

/* ── Tab Bar ─────────────────────────────────────────────────────────────────*/
export interface TabItem {
  id: string
  label: string
  badge?: string | number
}

export interface TabBarProps extends HTMLAttributes<HTMLDivElement> {
  items: TabItem[]
  activeId?: string
  onTabChange?: (id: string) => void
}

export const TabBar = forwardRef<HTMLDivElement, TabBarProps>(
  ({ items, activeId, onTabChange, className, ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      className={cn('flex items-end gap-1 border-b border-[var(--color-border-subtle)]', className)}
      {...props}
    >
      {items.map(item => {
        const isActive = item.id === activeId
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange?.(item.id)}
            className={cn(
              'relative flex flex-col items-center gap-1 px-4 pb-3 pt-2 font-body font-normal text-body-m leading-6 tracking-[0.25px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-text-brand)]',
              isActive
                ? 'text-[var(--color-text-brand)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-bg-brand)] after:rounded-t'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
            )}
          >
            {item.label}
            {item.badge != null && (
              <span className="bg-[var(--color-bg-brand)] text-[var(--color-text-inverse)] text-caption font-medium leading-4 tracking-[0.25px] px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  ),
)
TabBar.displayName = 'TabBar'

/* ── Sidebar ─────────────────────────────────────────────────────────────────*/
export interface SidebarItem {
  id: string
  label: string
  /** Child items — renders this item as expandable with nested children */
  children?: SidebarItem[]
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  items: SidebarItem[]
  activeId?: string
  onItemClick?: (id: string) => void
}

function SidebarRow({
  item,
  activeId,
  onItemClick,
  depth = 0,
}: {
  item: SidebarItem
  activeId?: string
  onItemClick?: (id: string) => void
  depth?: number
}) {
  const isActive = item.id === activeId
  const isExpandable = (item.children?.length ?? 0) > 0
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => {
          if (isExpandable) setOpen(o => !o)
          onItemClick?.(item.id)
        }}
        className={cn(
          'flex items-center justify-between h-12 rounded-[var(--radius-16)] font-body font-normal text-body-m leading-6 tracking-[0.25px] text-left transition-colors w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-text-brand)]',
          depth > 0 ? 'pl-6 pr-4' : 'px-4',
          isActive
            ? 'bg-[var(--color-bg-subtle)] text-[var(--color-text-brand)]'
            : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]',
        )}
      >
        <span>{item.label}</span>
        {isExpandable && (
          <span className="text-[var(--color-text-secondary)] text-sm transition-transform duration-150" style={{ transform: open ? 'rotate(90deg)' : 'none' }}>
            ›
          </span>
        )}
      </button>

      {isExpandable && open && (
        <div className="flex flex-col gap-1">
          {item.children!.map(child => (
            <SidebarRow key={child.id} item={child} activeId={activeId} onItemClick={onItemClick} depth={depth + 1} />
          ))}
        </div>
      )}
    </>
  )
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ items, activeId, onItemClick, className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Sidebar navigation"
      className={cn('flex flex-col gap-1', className)}
      {...props}
    >
      {items.map(item => (
        <SidebarRow key={item.id} item={item} activeId={activeId} onItemClick={onItemClick} />
      ))}
    </nav>
  ),
)
Sidebar.displayName = 'Sidebar'

/* ── Breadcrumbs ─────────────────────────────────────────────────────────────*/
export interface BreadcrumbItem {
  id: string
  label: string
  href?: string
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
}

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, className, ...props }, ref) => (
    <nav ref={ref} aria-label="Breadcrumb" className={cn('flex items-center gap-1', className)} {...props}>
      <ol className="flex items-center gap-1 list-none m-0 p-0">
        {items.map((item, idx) => {
          const isCurrent = idx === items.length - 1
          return (
            <li key={item.id} className="flex items-center gap-1">
              {idx > 0 && (
                <span className="font-body text-body-s text-[var(--color-text-secondary)] select-none">/</span>
              )}
              {isCurrent ? (
                <span
                  aria-current="page"
                  className="font-body font-normal text-body-s leading-5 tracking-[0.2px] text-[var(--color-text-primary)]"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href ?? '#'}
                  className="font-body font-normal text-body-s leading-5 tracking-[0.2px] text-[var(--color-text-brand)] underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  ),
)
Breadcrumbs.displayName = 'Breadcrumbs'
