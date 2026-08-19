/* ─────────────────────────────────────────────────────────────────────────
 * wlans · design tokens · MOTION (runtime)
 *
 * Springs, gesture physics, and MotionTier resolution.
 * Direction-independent — unchanged by the visual direction decision.
 *
 * Why springs and not durations for anything touchable: a fixed-duration
 * animation cannot respond to new input. A spring can — new input only
 * changes the target, and the motion stays continuous. This is what makes a
 * sheet grabbable mid-flight instead of having to finish closing first.
 * ───────────────────────────────────────────────────────────────────────── */

export type MotionTier = 'full' | 'reduced' | 'static'

/* ── Springs ───────────────────────────────────────────────────────────────
 * Apple parameterises springs as (damping ratio, response) rather than
 * (mass, stiffness, damping). Motion's `bounce` + `duration` maps onto that:
 *   bounce 0    ≈ damping 1.0  — critically damped, no overshoot
 *   bounce 0.2  ≈ damping ~0.8 — slight overshoot
 *
 * House rule: `ui` is the default everywhere. Bounce is permitted ONLY when
 * the gesture itself carried momentum — a flick, a throw, a drag release.
 * Overshoot on a menu that merely faded in reads as decoration; overshoot on
 * a card you actually threw reads as physics.
 */
export const spring = {
  /** Default for all non-gesture UI. Graceful, non-distracting. */
  ui: { type: 'spring', bounce: 0, duration: 0.35 },
  /** Only after a velocity-carrying gesture ends. */
  momentum: { type: 'spring', bounce: 0.2, duration: 0.4 },
  /** Drawers, sheets, bottom sheets. */
  sheet: { type: 'spring', bounce: 0.2, duration: 0.3 },
  /** Reposition without user momentum (e.g. a panel snapping to a new slot). */
  move: { type: 'spring', bounce: 0, duration: 0.4 },
} as const

/* ── Momentum projection ───────────────────────────────────────────────────
 * Where a flick should land. Snapping to the nearest point from the RELEASE
 * position ignores how hard the user threw it; projecting first is what makes
 * a flick feel like a throw.
 *
 * This is the exponential-decay form Apple ships, not the textbook
 * v²/(2·decel) — they do not produce the same feel.
 */
export function project(velocity: number, decelerationRate = 0.998): number {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate)
}

/* ── Rubber-banding ────────────────────────────────────────────────────────
 * Progressive resistance past a boundary. A hard stop reads as "frozen";
 * resistance reads as "responsive, but there is nothing more here".
 */
export function rubberband(overshoot: number, dimension: number, constant = 0.55): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot))
}

/* ── Velocity handoff ──────────────────────────────────────────────────────
 * The seam between dragging and animating. Hand the pointer's release
 * velocity to the spring so there is no visible discontinuity at release.
 * Use only for spring APIs that want a NORMALISED velocity; Motion takes
 * absolute px/s directly.
 */
export function relativeVelocity(gestureVelocity: number, current: number, target: number): number {
  const remaining = target - current
  return remaining === 0 ? 0 : gestureVelocity / remaining
}

/* ── MotionTier resolution ─────────────────────────────────────────────────
 * Called once, pre-paint, from an inline script. Never called again — a
 * component that re-detects capability per render will disagree with its
 * siblings and produce a mixed experience on the same page.
 */
export function resolveMotionTier(): MotionTier {
  if (typeof window === 'undefined') return 'reduced' // SSR: assume mobile

  const m = window.matchMedia.bind(window)
  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean }
  }

  if (m('(prefers-reduced-motion: reduce)').matches) return 'static'
  if (nav.connection?.saveData) return 'static'

  const memory = nav.deviceMemory ?? 4
  const cores = nav.hardwareConcurrency ?? 4
  const coarse = m('(pointer: coarse)').matches

  if (coarse || memory < 8 || cores < 8) return 'reduced'
  return 'full'
}

/**
 * Inline this in <head> before first paint. Writing the attribute after
 * hydration would produce a visible flash of full-motion on a device that
 * asked for none.
 */
export const MOTION_TIER_SCRIPT = `(function(){try{
var m=matchMedia,n=navigator,t='full';
var mem=n.deviceMemory||4,c=n.hardwareConcurrency||4;
if(m('(prefers-reduced-motion: reduce)').matches||(n.connection&&n.connection.saveData))t='static';
else if(m('(pointer: coarse)').matches||mem<8||c<8)t='reduced';
document.documentElement.dataset.motion=t;
}catch(e){document.documentElement.dataset.motion='reduced'}})()`

/* ── Reveal presets ────────────────────────────────────────────────────────
 * Scroll reveals are deliberately small. Large entrance travel is both the
 * most templated-looking choice and the most expensive one on low-end
 * hardware. `enter` and `exit` are asymmetric on purpose.
 */
export const reveal = {
  enter: { opacity: 1, y: 0, transition: spring.ui },
  exit: { opacity: 0, y: 0, transition: { duration: 0.16, ease: [0.7, 0, 0.84, 0] } },
  initial: { opacity: 0, y: 12 },
} as const

/** Stagger delay for index `i`, capped so long lists never feel laggy. */
export function staggerDelay(i: number, step = 0.04, max = 6): number {
  return Math.min(i, max) * step
}
