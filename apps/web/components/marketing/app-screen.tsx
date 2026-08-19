/**
 * A generated, abstract app screen.
 *
 * Real client screenshots do not exist yet, and inventing a fake product UI
 * on a portfolio would be a fabricated credential. This draws a recognisably
 * app-shaped layout — status bar, header, hero card, list rows, tab bar —
 * parameterised by hue, so every project card reads as a distinct product
 * without claiming to be one.
 *
 * Pure SVG: no image requests, no layout shift, scales to any size, and it
 * costs about 1KB. Swap `<AppScreen>` for `<Image>` when real screenshots
 * arrive; the surrounding frames do not change.
 *
 * Deterministic by design — a random layout would differ between the server
 * and client render and trip a hydration mismatch.
 */

export interface AppScreenProps {
  /** OKLCH hue, 0-360. Drives the whole screen's colour. */
  hue?: number
  /** `list` = feed-style, `dash` = stats-style, `map` = map-style. */
  variant?: 'list' | 'dash' | 'map'
  className?: string
}

export function AppScreen({ hue = 263, variant = 'list', className }: AppScreenProps) {
  const accent = `oklch(0.58 0.19 ${hue})`
  const accentSoft = `oklch(0.93 0.05 ${hue})`
  const accentMid = `oklch(0.80 0.12 ${hue})`
  const ink = `oklch(0.30 0.03 ${hue})`
  const muted = `oklch(0.88 0.012 ${hue})`
  const paper = `oklch(0.985 0.004 ${hue})`
  const gid = `g-${hue}-${variant}`

  return (
    <svg
      viewBox="0 0 180 390"
      className={className}
      role="img"
      aria-label="Illustrative app interface"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={accent} />
          <stop offset="1" stopColor={accentMid} />
        </linearGradient>
      </defs>

      <rect width="180" height="390" fill={paper} />

      {/* status bar */}
      <rect x="14" y="14" width="20" height="4" rx="2" fill={muted} />
      <rect x="150" y="14" width="16" height="4" rx="2" fill={muted} />

      {/* header */}
      <rect x="14" y="30" width="58" height="9" rx="4.5" fill={ink} />
      <circle cx="158" cy="35" r="9" fill={accentSoft} />
      <circle cx="158" cy="35" r="3.5" fill={accent} />

      {variant === 'dash' && (
        <>
          <rect x="14" y="52" width="152" height="76" rx="14" fill={`url(#${gid})`} />
          <rect x="26" y="66" width="44" height="6" rx="3" fill="#fff" opacity="0.65" />
          <rect x="26" y="80" width="72" height="14" rx="7" fill="#fff" opacity="0.95" />
          <path
            d="M26 118 L46 106 L66 112 L86 94 L106 100 L126 84 L154 90"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={14 + i * 52} y={140} width="48" height="52" rx="12" fill="#fff" stroke={muted} />
              <rect x={22 + i * 52} y={152} width="14" height="14" rx="5" fill={accentSoft} />
              <rect x={22 + i * 52} y={172} width="30" height="5" rx="2.5" fill={ink} opacity="0.75" />
              <rect x={22 + i * 52} y={181} width="20" height="4" rx="2" fill={muted} />
            </g>
          ))}
        </>
      )}

      {variant === 'map' && (
        <>
          <rect x="14" y="52" width="152" height="150" rx="14" fill={accentSoft} />
          <path d="M14 130 Q60 108 96 138 T166 126" fill="none" stroke="#fff" strokeWidth="5" />
          <path d="M60 52 Q76 110 52 202" fill="none" stroke="#fff" strokeWidth="4" opacity="0.8" />
          <path d="M120 52 Q112 128 140 202" fill="none" stroke="#fff" strokeWidth="4" opacity="0.8" />
          <circle cx="96" cy="138" r="12" fill={accent} opacity="0.2" />
          <circle cx="96" cy="138" r="6" fill={accent} />
          <circle cx="96" cy="138" r="2" fill="#fff" />
          <rect x="24" y="166" width="132" height="26" rx="13" fill="#fff" />
          <circle cx="40" cy="179" r="7" fill={accentSoft} />
          <rect x="54" y="174" width="52" height="5" rx="2.5" fill={ink} opacity="0.8" />
          <rect x="54" y="183" width="32" height="4" rx="2" fill={muted} />
        </>
      )}

      {variant === 'list' && (
        <>
          <rect x="14" y="52" width="152" height="82" rx="14" fill={`url(#${gid})`} />
          <rect x="26" y="68" width="40" height="6" rx="3" fill="#fff" opacity="0.6" />
          <rect x="26" y="82" width="88" height="13" rx="6.5" fill="#fff" opacity="0.95" />
          <rect x="26" y="104" width="56" height="18" rx="9" fill="#fff" />
          <rect x="38" y="111" width="32" height="4" rx="2" fill={accent} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="14" y={146 + i * 50} width="152" height="42" rx="12" fill="#fff" stroke={muted} />
              <rect x="24" y={156 + i * 50} width="22" height="22" rx="8" fill={accentSoft} />
              <rect x="56" y={159 + i * 50} width={72 - i * 12} height="5" rx="2.5" fill={ink} opacity="0.8" />
              <rect x="56" y={170 + i * 50} width={46 + i * 8} height="4" rx="2" fill={muted} />
              <circle cx="152" cy={177 + i * 50} r="3" fill={accentMid} />
            </g>
          ))}
        </>
      )}

      {/* filler rows so short variants still fill the frame */}
      {variant !== 'list' &&
        [0, 1].map((i) => (
          <g key={i}>
            <rect x="14" y={206 + i * 50} width="152" height="42" rx="12" fill="#fff" stroke={muted} />
            <rect x="24" y={216 + i * 50} width="22" height="22" rx="8" fill={accentSoft} />
            <rect x="56" y={219 + i * 50} width={78 - i * 16} height="5" rx="2.5" fill={ink} opacity="0.8" />
            <rect x="56" y={230 + i * 50} width={44 + i * 10} height="4" rx="2" fill={muted} />
          </g>
        ))}

      {/* primary action */}
      <rect x="14" y="312" width="152" height="34" rx="17" fill={accent} />
      <rect x="66" y="326" width="48" height="6" rx="3" fill="#fff" opacity="0.9" />

      {/* tab bar */}
      <rect x="0" y="358" width="180" height="32" fill="#fff" />
      <rect x="0" y="358" width="180" height="1" fill={muted} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x={22 + i * 38}
            y={368}
            width="14"
            height="12"
            rx="4"
            fill={i === 0 ? accent : muted}
          />
        </g>
      ))}
    </svg>
  )
}
