import Image from 'next/image'

import type { ScreenStrings, ScreenVariant } from '@/content/types'

/**
 * The interface that runs inside a device frame.
 *
 * What this replaces, and why it mattered: the previous version drew grey
 * rounded rectangles in an SVG — a wireframe. A wireframe inside a phone on a
 * portfolio reads as "we have nothing to show", which is the opposite of the
 * message. These are laid out as real screens: a real hierarchy, real numbers
 * in tabular figures, real photography, a real tab bar with one tab selected.
 *
 * It is still not a claim about a client's product. There is no client name,
 * no logo and no borrowed screenshot anywhere in it — the design rule against
 * inventing credentials holds. What it claims is only what it is: this is the
 * shape of the software this team builds.
 *
 * Everything sizes in `cqw`, against the `.device` container, so one markup
 * tree is correct at 90px and at 300px. Nothing is randomised — a random
 * layout would differ between the server and client render and trip a
 * hydration mismatch.
 */

export type { ScreenVariant }

export interface AppScreenProps {
  variant: ScreenVariant
  /** OKLCH hue, 0–360. The screen's accent, so each product reads distinct. */
  hue?: number
  /** Localised UI words. Numbers and icons carry the rest. */
  s: ScreenStrings
  /** Photos used by `catalog` and `schedule`. The catalog cycles them. */
  photos?: readonly string[]
  className?: string
}

const STATUS_TIME = '9:41'

export function AppScreen({ variant, hue = 263, s, photos, className }: AppScreenProps) {
  return (
    <div
      className={'scr' + (className ? ' ' + className : '')}
      style={{ ['--scr-hue' as string]: String(hue) }}
      data-variant={variant}
    >
      <StatusBar />
      {variant === 'track' ? <Track s={s} /> : null}
      {variant === 'finance' ? <Finance s={s} /> : null}
      {variant === 'catalog' ? <Catalog s={s} photos={photos} /> : null}
      {variant === 'schedule' ? <Schedule s={s} photo={photos?.[0]} /> : null}
      <TabBar active={variant === 'finance' ? 1 : variant === 'catalog' ? 2 : 0} />
    </div>
  )
}

/* ── Chrome ─────────────────────────────────────────────────────────────── */

/* Apple's own marketing time. Using the real clock would mean a value that
   differs between the server render and the client one. */
function StatusBar() {
  return (
    <div className="scr__status">
      <span className="scr__clock">{STATUS_TIME}</span>
      <span className="scr__status-icons">
        <svg viewBox="0 0 18 12" className="scr__si" aria-hidden="true">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" opacity="0.35" />
        </svg>
        <svg viewBox="0 0 16 12" className="scr__si" aria-hidden="true">
          <path d="M8 11.2 5.4 8.3a3.9 3.9 0 0 1 5.2 0Z" />
          <path d="M8 6.2c1.5 0 2.9.5 4 1.5l1.7-1.9A9 9 0 0 0 8 3.4a9 9 0 0 0-5.7 2.4L4 7.7a6 6 0 0 1 4-1.5Z" opacity="0.75" />
          <path d="M8 1.1c2.6 0 5 .9 6.9 2.5L16 2.3A12.1 12.1 0 0 0 8 -.6 12.1 12.1 0 0 0 0 2.3l1.1 1.3A10.5 10.5 0 0 1 8 1.1Z" opacity="0.45" />
        </svg>
        <span className="scr__battery">
          <span className="scr__battery-fill" />
        </span>
      </span>
    </div>
  )
}

function TabBar({ active }: { active: number }) {
  return (
    <div className="scr__tabs">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="scr__tab" data-active={i === active}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            {i === 0 ? <path d="M3 9.2 10 3.4l7 5.8V17h-4.6v-4.6H7.6V17H3Z" /> : null}
            {i === 1 ? <path d="M3 6.4h14a1 1 0 0 1 1 1v7.2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.4a1 1 0 0 1 1-1Zm10.4 4.2a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" /> : null}
            {i === 2 ? <path d="M3 3.4h6v6H3Zm8 0h6v6h-6Zm-8 8h6v6H3Zm8 0h6v6h-6Z" /> : null}
            {i === 3 ? <path d="M10 10.4a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Zm0 1.4c-3.4 0-6.2 1.9-6.2 4.2h12.4c0-2.3-2.8-4.2-6.2-4.2Z" /> : null}
          </svg>
        </span>
      ))}
      <span className="scr__home" />
    </div>
  )
}

/* ── Track — a live job on a map ────────────────────────────────────────── */

/* Streets are drawn, not photographed: a photo of a map at 40px tall is an
   unreadable smear, while three weights of line reads as a map instantly. */
function Track({ s }: { s: ScreenStrings }) {
  return (
    <>
      <div className="scr__map">
        <svg viewBox="0 0 180 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="180" height="150" className="scr-map__ground" />
          <g className="scr-map__block">
            <rect x="8" y="10" width="46" height="34" rx="3" />
            <rect x="70" y="4" width="58" height="30" rx="3" />
            <rect x="140" y="14" width="46" height="40" rx="3" />
            <rect x="4" y="62" width="40" height="44" rx="3" />
            <rect x="86" y="56" width="54" height="38" rx="3" />
            <rect x="16" y="118" width="60" height="34" rx="3" />
            <rect x="104" y="112" width="64" height="40" rx="3" />
          </g>
          <g className="scr-map__road">
            <path d="M-4 52h188" />
            <path d="M-4 108h188" />
            <path d="M60 -4v158" />
            <path d="M148 -4v158" />
          </g>
          <path className="scr-map__route" d="M28 132 L60 132 L60 108 L104 108 L104 52 L148 52 L148 30" />
          <circle className="scr-map__from" cx="28" cy="132" r="4" />
          <g className="scr-map__pin" transform="translate(148 30)">
            <circle className="scr-map__halo" r="13" />
            <circle className="scr-map__dot" r="6.5" />
            <path d="M-2.4 0.2 -0.6 2 2.6 -1.6" className="scr-map__tick" />
          </g>
        </svg>
        <span className="scr__eta">
          <b>18</b>
          <em>{s.minutes}</em>
        </span>
      </div>

      <div className="scr__sheet">
        <span className="scr__grabber" />
        <div className="scr__row">
          <span className="scr__live">
            <i />
            {s.enRoute}
          </span>
          <span className="scr__meta">{s.orderNo} 4821</span>
        </div>
        <div className="scr__person">
          <span className="scr__avatar" />
          <span className="scr__person-text">
            <b>{s.courier}</b>
            <em>01 · 90 A 421 BA</em>
          </span>
          <span className="scr__call">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M6.6 3.4 8.4 7 6.9 8.6a9.4 9.4 0 0 0 4.5 4.5L13 11.6l3.6 1.8v3.2a1 1 0 0 1-1.1 1C8.7 17.2 3.4 11.9 2.8 5.1a1 1 0 0 1 1-1.1Z" />
            </svg>
          </span>
        </div>
        <div className="scr__progress">
          <span data-done="true" />
          <span data-done="true" />
          <span data-done="true" />
          <span />
        </div>

        <div className="scr__stops">
          <span className="scr__stop" data-done="true">
            <i />
            <b />
          </span>
          <span className="scr__stop">
            <i />
            <b />
          </span>
        </div>

        <span className="scr__cta">{s.trackOrder}</span>
      </div>
    </>
  )
}

/* ── Finance — balance and movement ─────────────────────────────────────── */

const MOVES = [
  { id: 'a', sign: '−', amount: '84 000', delta: 'out' },
  { id: 'b', sign: '+', amount: '1 200 000', delta: 'in' },
  { id: 'c', sign: '−', amount: '26 500', delta: 'out' },
  { id: 'd', sign: '−', amount: '312 000', delta: 'out' },
  { id: 'e', sign: '+', amount: '75 000', delta: 'in' },
]

function Finance({ s }: { s: ScreenStrings }) {
  return (
    <div className="scr__body">
      <div className="scr__card">
        <span className="scr__card-label">{s.balance}</span>
        <span className="scr__card-amount">
          12 480 <i>000</i>
        </span>
        <span className="scr__card-foot">
          <em>•••• 4821</em>
          <span className="scr__card-chip" />
        </span>
      </div>

      <div className="scr__actions">
        {[s.topUp, s.send, s.pay, s.more].map((label, i) => (
          <span className="scr__action" key={label}>
            <span className="scr__action-icon">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                {i === 0 ? <path d="M10 4v12M4 10h12" /> : null}
                {i === 1 ? <path d="M4 10h12M11 5l5 5-5 5" /> : null}
                {i === 2 ? <path d="M3 7h14v8H3zM3 10h14" /> : null}
                {i === 3 ? <path d="M5 10h.01M10 10h.01M15 10h.01" /> : null}
              </svg>
            </span>
            <em>{label}</em>
          </span>
        ))}
      </div>

      <div className="scr__list-head">
        <b>{s.recent}</b>
        <em>{s.all}</em>
      </div>

      <div className="scr__list">
        {MOVES.map((move) => (
          <span className="scr__move" key={move.id}>
            <span className="scr__move-icon" data-delta={move.delta} />
            <span className="scr__move-text">
              <b />
              <em />
            </span>
            <span className="scr__move-amount" data-delta={move.delta}>
              {move.sign}
              {move.amount}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Catalog — a browsable grid ─────────────────────────────────────────── */

const PRICES = ['48 000', '129 000', '86 500', '64 000', '215 000', '39 000']

function Catalog({ s, photos }: { s: ScreenStrings; photos?: readonly string[] }) {
  const pool = photos?.length ? photos : ['/img/shot-retail.jpg', '/img/shot-retail-b.jpg']
  return (
    <div className="scr__body">
      <div className="scr__search">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="9" cy="9" r="5.4" />
          <path d="M13.2 13.2 17 17" />
        </svg>
        <em>{s.search}</em>
      </div>

      <div className="scr__chips">
        <span data-active="true">{s.popular}</span>
        <span />
        <span />
      </div>

      {/* Two photographs, three crops each. Printing one image six times
          reads as a rendering mistake; alternating the source and varying the
          crop per cell is what makes the grid read as a catalogue. */}
      <div className="scr__grid">
        {PRICES.map((price, i) => (
          <span className="scr__tile" key={price} data-crop={i % 3}>
            <span className="scr__tile-media">
              <Image
                src={pool[i % pool.length]}
                alt=""
                width={130}
                height={130}
                sizes="130px"
              />
            </span>
            <span className="scr__tile-text">
              <b />
              <em>{price}</em>
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Schedule — pick a slot ─────────────────────────────────────────────── */

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const SLOTS = ['09:00', '09:30', '10:00', '11:30', '12:00', '14:30', '15:00', '16:30', '17:00']

function Schedule({ s, photo }: { s: ScreenStrings; photo?: string }) {
  return (
    <div className="scr__body">
      <div className="scr__hero">
        <span className="scr__hero-media">
          <Image src={photo ?? '/img/shot-doctor.jpg'} alt="" width={160} height={160} sizes="160px" />
        </span>
        <span className="scr__hero-text">
          <b />
          <em />
          <span className="scr__rating">
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M6 .8 7.5 4l3.5.4-2.6 2.4.7 3.4L6 8.5 2.9 10.2l.7-3.4L1 4.4 4.5 4Z" />
            </svg>
            4.9
          </span>
        </span>
      </div>

      <div className="scr__days">
        {DAYS.map((day, i) => (
          <span key={i} data-active={i === 2}>
            <em>{day}</em>
            <b>{12 + i}</b>
          </span>
        ))}
      </div>

      <span className="scr__section-label">{s.slots}</span>

      <div className="scr__slots">
        {SLOTS.map((slot, i) => (
          <span key={slot} data-active={i === 3} data-off={i === 1 || i === 4 || i === 7}>
            {slot}
          </span>
        ))}
      </div>

      <div className="scr__confirm">
        <span className="scr__confirm-text">
          <b />
          <em>14 · 11:30</em>
        </span>
        <span className="scr__cta scr__cta--inline">{s.book}</span>
      </div>
    </div>
  )
}
