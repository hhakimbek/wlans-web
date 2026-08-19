import { techMark } from './tech-marks'

/**
 * A technology name with its own brand mark.
 *
 * The glyph is tinted with the brand's colour, not the text colour: a Flutter
 * blue and a Kotlin purple next to each other are what makes a stack list
 * scannable at a glance. Names with no official standalone mark render as a
 * plain label rather than borrowing someone else's logo.
 */
export function TechTag({ name, className = 'tag tag--lg' }: { name: string; className?: string }) {
  const mark = techMark(name)

  return (
    <span className={className} data-marked={Boolean(mark)}>
      {mark ? (
        <svg
          viewBox="0 0 24 24"
          width="15"
          height="15"
          fill={mark.hex}
          aria-hidden="true"
          focusable="false"
          className="tag__mark"
        >
          <path d={mark.path} />
        </svg>
      ) : null}
      {name}
    </span>
  )
}
