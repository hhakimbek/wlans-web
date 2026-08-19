'use client'

import { useEffect, useRef, useState } from 'react'
import { createDisplay, textWidth, type FlushStats } from '@wlans/display-core'

/**
 * A simulated SSD1306 panel, rendered by the real engine.
 *
 * Runs on the main thread deliberately. A 128x64 frame is 8,192 pixels — about
 * 0.2ms of work — and this panel updates at hardware rate, not 60fps. The
 * worker + OffscreenCanvas architecture (docs/00-architecture.md §5.1) exists
 * for the interactive playground, where *user* code runs and can be arbitrarily
 * expensive. Paying for a worker here would be ceremony, not engineering.
 */

/** Mirrors `.display-panel` in packages/design-tokens/color.css. The panel is
 *  theme-independent: a real OLED module looks the same in any room. */
const PIXEL_ON: readonly [number, number, number, number] = [226, 244, 248, 255]
const PIXEL_OFF: readonly [number, number, number, number] = [12, 16, 19, 255]

export interface DisplayPanelProps {
  /** Draws one frame. `t` is seconds since mount. */
  scene: (d: ReturnType<typeof createDisplay>, t: number) => void
  bus?: 'i2c' | 'spi'
  clockHz?: number
  /** Simulated refresh rate. Capped by what the bus can physically deliver. */
  fps?: number
  label?: string
  onStats?: (stats: FlushStats) => void
  className?: string
}

export function DisplayPanel({
  scene,
  bus = 'i2c',
  clockHz = 400_000,
  fps = 20,
  label = 'SSD1306 · 128×64',
  onStats,
  className,
}: DisplayPanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stats, setStats] = useState<FlushStats | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const display = createDisplay({ driver: 'ssd1306', bus, clockHz })
    canvas.width = display.width
    canvas.height = display.height

    // Allocated once. Re-allocating per frame is what puts a render loop on
    // the garbage collector's critical path.
    const image = ctx.createImageData(display.width, display.height)
    const rgba = image.data

    const tier = document.documentElement.dataset.motion ?? 'reduced'
    const animated = tier !== 'static'

    let raf = 0
    let visible = true
    let start = 0
    let lastDraw = -Infinity
    let lastStatsPush = -Infinity
    const frameInterval = 1000 / fps

    const draw = (now: number) => {
      if (!start) start = now
      const t = (now - start) / 1000

      display.clear()
      scene(display, t)
      const flushed = display.flush()

      display.toRGBA(PIXEL_ON, PIXEL_OFF, rgba)
      ctx.putImageData(image, 0, 0)

      // The HUD is DOM. Updating React state every frame would cost far more
      // than the render itself, so it is throttled to something readable.
      if (now - lastStatsPush > 250) {
        lastStatsPush = now
        setStats(flushed)
        onStats?.(flushed)
      }
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      if (now - lastDraw < frameInterval) return
      lastDraw = now
      draw(now)
    }

    // Paused while offscreen: an animation nobody can see is pure battery cost.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { rootMargin: '64px' },
    )
    observer.observe(canvas)

    const onVisibilityChange = () => {
      visible = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    if (animated) {
      raf = requestAnimationFrame(loop)
    } else {
      // Reduced-motion still gets the real thing — one representative frame,
      // not an empty box.
      draw(performance.now())
    }

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [scene, bus, clockHz, fps, onStats])

  return (
    <figure className={className} style={{ margin: 0 }}>
      <div className="panel-frame">
        <canvas
          ref={canvasRef}
          className="panel-canvas"
          role="img"
          aria-label={`Simulated ${label} display running the wlans display framework`}
        />
      </div>
      <figcaption className="panel-hud">
        <span className="panel-hud__label t-micro">{label}</span>
        <span className="panel-hud__stats t-mono u-tabular">
          {stats ? (
            <>
              <Stat value={bus === 'i2c' ? '400 kHz' : '8 MHz'} unit={bus.toUpperCase()} />
              <Stat value={String(stats.bytesPushed)} unit="B" />
              <Stat value={stats.flushMs.toFixed(2)} unit="ms" />
              <Stat value={stats.maxFps.toFixed(0)} unit="fps max" />
            </>
          ) : (
            <span className="panel-hud__idle">initialising</span>
          )}
        </span>
      </figcaption>
    </figure>
  )
}

function Stat({ value, unit }: { value: string; unit: string }) {
  return (
    <span className="panel-stat">
      <span className="panel-stat__value">{value}</span>
      <span className="panel-stat__unit">{unit}</span>
    </span>
  )
}

/* ── Hero scene ────────────────────────────────────────────────────────────
   Kept next to the panel because it is content, not layout: this is the first
   thing a visitor sees the framework do. */

export function heroScene(d: ReturnType<typeof createDisplay>, t: number) {
  const W = d.width
  const H = d.height

  d.rect(0, 0, W, H)

  const word = 'wlans'
  const scale = 2
  d.text(Math.round((W - textWidth(word) * scale) / 2), 8, word, scale)

  // A signal trace: two summed sinusoids scrolling right to left. Integer
  // pixel placement, because a 1bpp panel has no subpixels to interpolate to.
  const baseline = 44
  const amp = 9
  let prevY = baseline
  for (let x = 1; x < W - 1; x++) {
    const phase = (x + t * 26) * 0.11
    const y = Math.round(
      baseline + Math.sin(phase) * amp * 0.7 + Math.sin(phase * 2.3) * amp * 0.3,
    )
    d.line(x - 1, prevY, x, y)
    prevY = y
  }

  // Scan marker riding the trace — the only element that reads as "live".
  const markerX = 2 + Math.floor(((t * 22) % (W - 6)))
  d.vLine(markerX, 30, 3)
  d.vLine(markerX, 56, 3)

  d.text(4, 22, '128x64')
  const right = 'I2C'
  d.text(W - 4 - textWidth(right), 22, right)
}
