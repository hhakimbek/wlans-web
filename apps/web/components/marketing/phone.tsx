import { AppScreen } from './app-screen'

/** A device frame around a generated app screen. */
export function Phone({
  caption,
  hue = 263,
  variant = 'list',
}: {
  caption?: string
  hue?: number
  variant?: 'list' | 'dash' | 'map'
}) {
  return (
    <figure className="phone">
      <div className="phone__frame">
        <span className="phone__notch" aria-hidden="true" />
        <div className="phone__screen">
          <AppScreen hue={hue} variant={variant} />
        </div>
      </div>
      {caption ? <figcaption className="phone__caption">{caption}</figcaption> : null}
    </figure>
  )
}
