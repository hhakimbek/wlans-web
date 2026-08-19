import Link from 'next/link'
import type { ComponentProps } from 'react'

type Variant = 'primary' | 'secondary' | 'quiet'

/**
 * One component, two elements. A button that navigates must render an anchor —
 * otherwise middle-click, cmd-click and "copy link address" all silently fail,
 * and screen readers announce the wrong role.
 */
export function Button({
  variant = 'primary',
  className = '',
  ...props
}: { variant?: Variant } & ComponentProps<'button'>) {
  return <button className={`btn btn--${variant} ${className}`} {...props} />
}

export function ButtonLink({
  variant = 'primary',
  className = '',
  ...props
}: { variant?: Variant } & ComponentProps<typeof Link>) {
  return <Link className={`btn btn--${variant} ${className}`} {...props} />
}
