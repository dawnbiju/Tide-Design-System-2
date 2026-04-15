/**
 * Tide Design System — public API
 * Import components from here in consuming apps:
 *   import { Button, Card } from 'tide-design-system'
 *   import 'tide-design-system/styles'
 */

// ── Tokens ───────────────────────────────────────────────────────────────────
export { tokens, colors, spacing, radius, shadow, typography } from './tokens/tokens'
export type { Tokens } from './tokens/tokens'

// ── Components ───────────────────────────────────────────────────────────────
export { Button }       from './components/Button'
export type { ButtonProps, ButtonStyle, ButtonTheme, ButtonSize } from './components/Button'

export { Link }         from './components/Link'
export type { LinkProps, LinkTheme } from './components/Link'

export { FeatureCard }  from './components/FeatureCard'
export type { FeatureCardProps, FeatureCardTheme } from './components/FeatureCard'

export { TextInput }    from './components/TextInput'
export type { TextInputProps, InputState, InputAffix } from './components/TextInput'

export { Checkbox }     from './components/Checkbox'
export type { CheckboxProps } from './components/Checkbox'

export { Radio }        from './components/Radio'
export type { RadioProps } from './components/Radio'

export { Toggle }       from './components/Toggle'
export type { ToggleProps, ToggleState } from './components/Toggle'

export { Select }       from './components/Select'
export type { SelectProps, SelectOption, SelectMode, SelectState } from './components/Select'

export { Card }         from './components/Card'
export type { CardProps, CardVariant } from './components/Card'

export { Modal }        from './components/Modal'
export type { ModalProps, ModalType } from './components/Modal'

export { Alert, Toast, Banner } from './components/Alert'
export type { AlertProps, AlertVariant, BannerProps } from './components/Alert'

export { TabBar, Sidebar, Breadcrumbs } from './components/Navigation'
export type { TabBarProps, TabItem, SidebarProps, SidebarItem, BreadcrumbsProps, BreadcrumbItem } from './components/Navigation'

export { DataTable }    from './components/DataTable'
export type { DataTableProps, Column } from './components/DataTable'

// ── Utilities ────────────────────────────────────────────────────────────────
export { cn } from './utils/cn'
