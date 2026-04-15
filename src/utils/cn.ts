/**
 * Minimal className merger — avoids pulling in clsx/tailwind-merge as deps.
 * Join truthy strings, filter falsy ones.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
