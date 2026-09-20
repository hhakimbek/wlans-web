import type { CSSProperties, ReactNode } from 'react'

/**
 * The one device frame on the site.
 *
 * Before this there were five: `.phone__frame`, `.showcase-card__phone`,
 * `.service-hero__phone`, `.case__phone` and `.work-card__phone`. Four of them
 * were a coloured border with a corner radius, drawn at a different thickness
 * each time, and that inconsistency is most of why the hardware read as a
 * placeholder rather than as a product shot.
 *
 * Everything here is proportional to the frame's own width — the CSS uses
 * container query units, so a 96px device in a card and a 280px device in a
 * hero have the same rail thickness, the same corner radius and the same
 * island size *relative to the body*. A fixed 5px bezel reads as a phone at
 * 200px and as a picture frame at 90px, which is exactly what was happening.
 *
 * The proportions come from the hardware: rail ≈ 3% of body width, corner
 * radius ≈ 14.5%, island ≈ 31% wide. The screen's radius is the outer radius
 * minus the rail, which is what keeps the two curves concentric — mismatched
 * radii are the detail that makes a CSS phone look drawn rather than
 * photographed.
 */
export function Device({
  children,
  tone = 'graphite',
  label,
  className,
  style,
  glare = true,
}: {
  children: ReactNode
  /** `graphite` is the default hardware; `silver` is used on dark grounds. */
  tone?: 'graphite' | 'silver'
  /** Accessible name. Omit for decorative art, which is aria-hidden anyway. */
  label?: string
  className?: string
  style?: CSSProperties
  glare?: boolean
}) {
  return (
    <div
      className={'device' + (className ? ' ' + className : '')}
      data-tone={tone}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <div className="device__body">
        <div className="device__screen">
          {children}
          <span className="device__island" />
          {glare ? <span className="device__glare" /> : null}
        </div>
      </div>
    </div>
  )
}
