/**
 * @wlans/display-core
 *
 * Pure TypeScript rendering core for small embedded displays. ZERO DOM: this
 * module must run unchanged in a Web Worker, in Node, and under the parity
 * test harness. If a DOM type ever appears here, the boundary has been broken.
 *
 * The API mirrors the C++ framework's surface so that the code shown next to a
 * simulated panel is recognisably the same program that runs on hardware.
 *
 * See docs/00-architecture.md §5.
 */

import { FONT_ADVANCE, FONT_HEIGHT, FONT_WIDTH, glyph, textWidth } from './font5x7.ts'

export { FONT_ADVANCE, FONT_HEIGHT, FONT_WIDTH, textWidth }

export type DriverId = 'ssd1306' | 'sh1106' | 'st7735'
export type Bus = 'i2c' | 'spi'

export interface DisplayConfig {
  driver?: DriverId
  width?: number
  height?: number
  bus?: Bus
  /** Bus clock in Hz. I²C is typically 100k or 400k; SPI 4M-40M. */
  clockHz?: number
}

export interface FlushStats {
  /** Bytes actually pushed over the bus for this flush. */
  bytesPushed: number
  /** Time that many bytes takes on the configured bus, in milliseconds. */
  flushMs: number
  /** Upper bound on frame rate if the sketch did nothing but flush. */
  maxFps: number
  /** Whether a partial (dirty-rect) update was possible. */
  partial: boolean
  dirty: Readonly<{ x: number; y: number; w: number; h: number }> | null
}

const DRIVER_DEFAULTS: Record<DriverId, { width: number; height: number; bus: Bus; clockHz: number }> = {
  ssd1306: { width: 128, height: 64, bus: 'i2c', clockHz: 400_000 },
  sh1106: { width: 132, height: 64, bus: 'i2c', clockHz: 400_000 },
  st7735: { width: 128, height: 160, bus: 'spi', clockHz: 8_000_000 },
}

export class Display {
  readonly driver: DriverId
  readonly width: number
  readonly height: number
  readonly bus: Bus
  readonly clockHz: number

  /** Page-packed 1bpp framebuffer: one byte = 8 vertically-stacked pixels. */
  readonly buffer: Uint8Array
  readonly pages: number

  private dirtyMinX = Infinity
  private dirtyMinY = Infinity
  private dirtyMaxX = -Infinity
  private dirtyMaxY = -Infinity

  constructor(config: DisplayConfig = {}) {
    const driver = config.driver ?? 'ssd1306'
    const defaults = DRIVER_DEFAULTS[driver]
    if (!defaults) throw new Error(`display-core: unknown driver "${driver}"`)

    this.driver = driver
    this.width = config.width ?? defaults.width
    this.height = config.height ?? defaults.height
    this.bus = config.bus ?? defaults.bus
    this.clockHz = config.clockHz ?? defaults.clockHz

    this.pages = Math.ceil(this.height / 8)
    this.buffer = new Uint8Array(this.width * this.pages)
  }

  // ── Drawing ──────────────────────────────────────────────────────────────

  clear(): this {
    this.buffer.fill(0)
    this.markDirty(0, 0, this.width - 1, this.height - 1)
    return this
  }

  /** `on` false clears the pixel; out-of-bounds writes are dropped, not wrapped. */
  pixel(x: number, y: number, on = true): this {
    x = x | 0
    y = y | 0
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return this
    const index = x + (y >> 3) * this.width
    const mask = 1 << (y & 7)
    if (on) this.buffer[index] |= mask
    else this.buffer[index] &= ~mask
    this.markDirty(x, y, x, y)
    return this
  }

  hLine(x: number, y: number, w: number, on = true): this {
    for (let i = 0; i < w; i++) this.pixel(x + i, y, on)
    return this
  }

  vLine(x: number, y: number, h: number, on = true): this {
    for (let i = 0; i < h; i++) this.pixel(x, y + i, on)
    return this
  }

  /** Outline. */
  rect(x: number, y: number, w: number, h: number, on = true): this {
    if (w <= 0 || h <= 0) return this
    this.hLine(x, y, w, on)
    this.hLine(x, y + h - 1, w, on)
    this.vLine(x, y + 1, h - 2, on)
    this.vLine(x + w - 1, y + 1, h - 2, on)
    return this
  }

  fillRect(x: number, y: number, w: number, h: number, on = true): this {
    for (let j = 0; j < h; j++) this.hLine(x, y + j, w, on)
    return this
  }

  line(x0: number, y0: number, x1: number, y1: number, on = true): this {
    // Integer Bresenham — the same algorithm the C++ core uses. A float-based
    // line would place pixels differently and break the parity gate.
    x0 |= 0; y0 |= 0; x1 |= 0; y1 |= 0
    const dx = Math.abs(x1 - x0)
    const dy = -Math.abs(y1 - y0)
    const sx = x0 < x1 ? 1 : -1
    const sy = y0 < y1 ? 1 : -1
    let err = dx + dy
    for (;;) {
      this.pixel(x0, y0, on)
      if (x0 === x1 && y0 === y1) break
      const e2 = 2 * err
      if (e2 >= dy) { err += dy; x0 += sx }
      if (e2 <= dx) { err += dx; y0 += sy }
    }
    return this
  }

  circle(cx: number, cy: number, r: number, on = true): this {
    let x = r
    let y = 0
    let err = 1 - r
    while (x >= y) {
      for (const [px, py] of [
        [x, y], [y, x], [-y, x], [-x, y], [-x, -y], [-y, -x], [y, -x], [x, -y],
      ] as const) {
        this.pixel(cx + px, cy + py, on)
      }
      y++
      err += err < 0 ? 2 * y + 1 : 2 * (y - x--) + 1
    }
    return this
  }

  /**
   * 5x7 bitmap text. `scale` replicates pixels rather than resampling, exactly
   * as the C++ core does — a resampled glyph would not survive the parity gate.
   */
  text(x: number, y: number, value: string, scale = 1, on = true): this {
    let cursor = x
    for (const char of value) {
      const columns = glyph(char)
      for (let col = 0; col < FONT_WIDTH; col++) {
        const bits = columns[col]
        for (let row = 0; row < FONT_HEIGHT; row++) {
          if (!(bits & (1 << row))) continue
          if (scale === 1) {
            this.pixel(cursor + col, y + row, on)
          } else {
            this.fillRect(cursor + col * scale, y + row * scale, scale, scale, on)
          }
        }
      }
      cursor += FONT_ADVANCE * scale
    }
    return this
  }

  invert(): this {
    for (let i = 0; i < this.buffer.length; i++) this.buffer[i] = ~this.buffer[i] & 0xff
    this.markDirty(0, 0, this.width - 1, this.height - 1)
    return this
  }

  // ── Bus model ────────────────────────────────────────────────────────────

  /**
   * Push the framebuffer and report what it actually cost.
   *
   * This is the number that makes the playground an engineering tool rather
   * than a toy: an SSD1306 over I²C at 400kHz needs ~23ms for a full frame,
   * which caps the sketch at ~43fps no matter how fast the MCU is. The same
   * panel on SPI is ~20x faster. Most people discover this on hardware, late.
   */
  flush(): FlushStats {
    const hasDirty = this.dirtyMaxX >= this.dirtyMinX

    let columns = this.width
    let pages = this.pages
    let partial = false
    let dirty: FlushStats['dirty'] = null

    if (hasDirty) {
      const firstPage = this.dirtyMinY >> 3
      const lastPage = this.dirtyMaxY >> 3
      columns = this.dirtyMaxX - this.dirtyMinX + 1
      pages = lastPage - firstPage + 1
      partial = columns < this.width || pages < this.pages
      dirty = {
        x: this.dirtyMinX,
        y: firstPage * 8,
        w: columns,
        h: pages * 8,
      }
    }

    const dataBytes = columns * pages
    // Per-page addressing commands. Column/page window setup is 6 bytes per
    // page on SSD1306-class controllers; ST7735 sets one window for the frame.
    const commandBytes = this.driver === 'st7735' ? 11 : pages * 6
    const bytesPushed = dataBytes + commandBytes

    const flushMs = (bytesPushed * this.bitsPerByte()) / this.clockHz * 1000

    this.resetDirty()

    return {
      bytesPushed,
      flushMs,
      maxFps: flushMs > 0 ? 1000 / flushMs : Infinity,
      partial,
      dirty,
    }
  }

  /** I²C spends a 9th bit per byte on the ACK slot; SPI does not. */
  private bitsPerByte(): number {
    return this.bus === 'i2c' ? 9 : 8
  }

  // ── Output ───────────────────────────────────────────────────────────────

  /** Read a single pixel back out of the packed buffer. */
  get(x: number, y: number): boolean {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return false
    return (this.buffer[x + (y >> 3) * this.width] & (1 << (y & 7))) !== 0
  }

  /**
   * Expand the 1bpp buffer into RGBA at native resolution. The caller upscales
   * with nearest-neighbour — a 128x64 framebuffer must never be interpolated.
   *
   * `target` may be reused across frames to avoid per-frame allocation, which
   * is what keeps the worker off the garbage collector at 60fps.
   */
  toRGBA(on: RGBA, off: RGBA, target?: Uint8ClampedArray): Uint8ClampedArray {
    const out = target ?? new Uint8ClampedArray(this.width * this.height * 4)
    for (let y = 0; y < this.height; y++) {
      const pageOffset = (y >> 3) * this.width
      const mask = 1 << (y & 7)
      for (let x = 0; x < this.width; x++) {
        const color = this.buffer[pageOffset + x] & mask ? on : off
        const i = (y * this.width + x) * 4
        out[i] = color[0]
        out[i + 1] = color[1]
        out[i + 2] = color[2]
        out[i + 3] = color[3]
      }
    }
    return out
  }

  // ── Dirty tracking ───────────────────────────────────────────────────────

  private markDirty(x0: number, y0: number, x1: number, y1: number): void {
    if (x0 < this.dirtyMinX) this.dirtyMinX = x0
    if (y0 < this.dirtyMinY) this.dirtyMinY = y0
    if (x1 > this.dirtyMaxX) this.dirtyMaxX = x1
    if (y1 > this.dirtyMaxY) this.dirtyMaxY = y1
  }

  private resetDirty(): void {
    this.dirtyMinX = Infinity
    this.dirtyMinY = Infinity
    this.dirtyMaxX = -Infinity
    this.dirtyMaxY = -Infinity
  }
}

export type RGBA = readonly [number, number, number, number]

export function createDisplay(config: DisplayConfig = {}): Display {
  return new Display(config)
}
