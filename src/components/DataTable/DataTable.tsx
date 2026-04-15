import { HTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/utils/cn'

export interface Column<T = Record<string, unknown>> {
  key: keyof T
  label: string
  sortable?: boolean
  filterable?: boolean
  width?: string
}

export interface DataTableProps<T = Record<string, unknown>> extends HTMLAttributes<HTMLDivElement> {
  columns: Column<T>[]
  rows: T[]
  selectable?: boolean
  /** Allow inline editing — clicking a row switches it to edit mode */
  editable?: boolean
  loading?: boolean
  emptyMessage?: string
  pageSize?: number
  onRowClick?: (row: T) => void
}

type SortDir = 'asc' | 'desc' | null

export const DataTable = forwardRef<HTMLDivElement, DataTableProps>(
  (
    {
      columns,
      rows,
      selectable   = false,
      editable     = false,
      loading      = false,
      emptyMessage = 'No data to display.',
      pageSize     = 10,
      onRowClick,
      className,
      ...props
    },
    ref,
  ) => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
    const [editingRow,   setEditingRow]   = useState<number | null>(null)
    const [filterKey,    setFilterKey]    = useState<string | null>(null)
    const [filterQuery,  setFilterQuery]  = useState('')
    const [sortKey,  setSortKey]  = useState<string | null>(null)
    const [sortDir,  setSortDir]  = useState<SortDir>(null)
    const [page,     setPage]     = useState(0)

    const handleSort = (key: string) => {
      if (sortKey === key) {
        setSortDir(d => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc')
        if (sortDir === 'desc') setSortKey(null)
      } else {
        setSortKey(key)
        setSortDir('asc')
      }
    }

    const filtered = filterKey && filterQuery
      ? rows.filter(r => String(r[filterKey] ?? '').toLowerCase().includes(filterQuery.toLowerCase()))
      : rows

    const sorted = [...filtered].sort((a, b) => {
      if (!sortKey || !sortDir) return 0
      const aVal = String(a[sortKey] ?? '')
      const bVal = String(b[sortKey] ?? '')
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    })

    const totalPages = Math.ceil(sorted.length / pageSize)
    const paged = sorted.slice(page * pageSize, (page + 1) * pageSize)

    const toggleRow = (idx: number) => {
      setSelectedRows(prev => {
        const next = new Set(prev)
        next.has(idx) ? next.delete(idx) : next.add(idx)
        return next
      })
    }

    const headerCell = (col: Column) => {
      const colKey = String(col.key)
      const isSorted   = sortKey === colKey
      const isFiltered = filterKey === colKey && filterQuery !== ''
      const isActive   = isSorted || isFiltered

      return (
        <th
          key={colKey}
          scope="col"
          style={{ width: col.width }}
          className={cn(
            'px-4 h-11 text-left font-body font-semibold text-body-s leading-5 tracking-[0.2px] bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-subtle)] select-none',
            isActive ? 'text-[var(--color-text-brand)]' : 'text-[var(--color-text-primary)]',
            (col.sortable || col.filterable) && 'cursor-pointer',
          )}
        >
          <span className="flex items-center gap-1">
            <span
              className="flex-1"
              onClick={() => col.sortable && handleSort(colKey)}
            >
              {col.label}
            </span>
            {col.sortable && (
              <span
                className="text-[10px] opacity-50 hover:opacity-100"
                onClick={() => handleSort(colKey)}
              >
                {isSorted && sortDir === 'asc' ? '▲' : isSorted && sortDir === 'desc' ? '▼' : '⇅'}
              </span>
            )}
            {col.filterable && (
              <span
                className={cn('text-[10px] hover:opacity-100', isFiltered ? 'opacity-100' : 'opacity-40')}
                title="Filter"
                onClick={() => {
                  if (filterKey === colKey) {
                    setFilterKey(null); setFilterQuery('')
                  } else {
                    setFilterKey(colKey); setFilterQuery('')
                  }
                }}
              >
                ⊟
              </span>
            )}
          </span>
          {col.filterable && filterKey === colKey && (
            <input
              autoFocus
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              onClick={e => e.stopPropagation()}
              placeholder={`Filter ${col.label}…`}
              className="mt-1 w-full h-6 px-2 text-[11px] border border-[var(--color-border-subtle)] rounded bg-[var(--color-bg-page)] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-text-brand)]"
            />
          )}
        </th>
      )
    }

    return (
      <div ref={ref} className={cn('flex flex-col gap-0 rounded-[var(--radius-24)] border border-[var(--color-border-subtle)] overflow-hidden', className)} {...props}>
        {loading ? (
          <div className="flex items-center justify-center py-16 text-[var(--color-text-secondary)] font-body text-body-m">
            Loading…
          </div>
        ) : rows.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-[var(--color-text-secondary)] font-body text-body-m">
            {emptyMessage}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {selectable && (
                    <th className="w-12 px-4 h-11 bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-subtle)]">
                      <input
                        type="checkbox"
                        aria-label="Select all"
                        checked={selectedRows.size === paged.length}
                        onChange={e => setSelectedRows(e.target.checked ? new Set(paged.map((_, i) => i)) : new Set())}
                        className="accent-[var(--color-bg-brand)]"
                      />
                    </th>
                  )}
                  {columns.map(headerCell)}
                </tr>
              </thead>
              <tbody>
                {paged.map((row, ridx) => {
                  const isSelected = selectedRows.has(ridx)
                  const isEditing  = editable && editingRow === ridx
                  return (
                    <tr
                      key={ridx}
                      onClick={() => {
                        onRowClick?.(row)
                        if (editable) setEditingRow(isEditing ? null : ridx)
                      }}
                      className={cn(
                        'border-b border-[var(--color-border-subtle)] last:border-0 h-14 transition-colors',
                        isEditing  ? 'bg-[var(--color-bg-subtle)] ring-1 ring-inset ring-[var(--color-text-brand)]' :
                        isSelected ? 'bg-[var(--color-bg-subtle)]' :
                                     'bg-[var(--color-bg-page)] hover:bg-[var(--color-bg-subtle)]/50',
                        (onRowClick || editable) && 'cursor-pointer',
                      )}
                    >
                      {selectable && (
                        <td className="w-12 px-4">
                          <input
                            type="checkbox"
                            aria-label="Select row"
                            checked={isSelected}
                            onChange={() => toggleRow(ridx)}
                            onClick={e => e.stopPropagation()}
                            className="accent-[var(--color-bg-brand)]"
                          />
                        </td>
                      )}
                      {columns.map(col => (
                        <td
                          key={String(col.key)}
                          className={cn(
                            'px-4 font-body text-body-m leading-6 tracking-[0.25px]',
                            isSelected || isEditing ? 'text-[var(--color-text-brand)]' : 'text-[var(--color-text-primary)]',
                          )}
                        >
                          {isEditing ? (
                            <input
                              autoFocus={col.key === columns[0].key}
                              defaultValue={String(row[col.key] ?? '')}
                              onClick={e => e.stopPropagation()}
                              className="w-full h-8 px-2 rounded border border-[var(--color-text-brand)] bg-[var(--color-bg-page)] text-[var(--color-text-primary)] text-body-m outline-none"
                            />
                          ) : (
                            String(row[col.key] ?? '')
                          )}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-page)]">
            <p className="font-body text-body-s leading-5 text-[var(--color-text-secondary)]">
              {page * pageSize + 1}–{Math.min((page + 1) * pageSize, rows.length)} of {rows.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 0}
                onClick={() => setPage(p => p - 1)}
                className="font-body text-body-s text-[var(--color-text-brand)] disabled:opacity-40 disabled:cursor-not-allowed hover:underline"
              >
                ← Prev
              </button>
              <span className="font-body text-body-s text-[var(--color-text-secondary)]">{page + 1} / {totalPages}</span>
              <button
                disabled={page === totalPages - 1}
                onClick={() => setPage(p => p + 1)}
                className="font-body text-body-s text-[var(--color-text-brand)] disabled:opacity-40 disabled:cursor-not-allowed hover:underline"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    )
  },
) as <T = Record<string, unknown>>(
  props: DataTableProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => JSX.Element

// @ts-expect-error displayName on generic component
DataTable.displayName = 'DataTable'
