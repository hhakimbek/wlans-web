import { createDisplay, textWidth } from './index.ts'

const d = createDisplay({ driver: 'ssd1306', bus: 'i2c', clockHz: 400_000 })
d.clear(); d.text(4, 4, 'wlans', 2); d.rect(0, 0, 128, 64); d.line(0, 40, 127, 60)
const full = d.flush()
console.log('SSD1306 / I2C 400kHz full frame:')
console.log('  bytes', full.bytesPushed, '| ms', full.flushMs.toFixed(2), '| maxFps', full.maxFps.toFixed(1))

d.pixel(10, 10)
const partial = d.flush()
console.log('  after 1 pixel  ->', partial.bytesPushed, 'bytes |', partial.flushMs.toFixed(3), 'ms | partial =', partial.partial)

const spi = createDisplay({ driver: 'ssd1306', bus: 'spi', clockHz: 8_000_000 })
spi.clear()
const s = spi.flush()
console.log('SSD1306 / SPI 8MHz   full frame:')
console.log('  bytes', s.bytesPushed, '| ms', s.flushMs.toFixed(2), '| maxFps', s.maxFps.toFixed(1))

const t = createDisplay({})
t.clear(); t.text(0, 0, 'N')
const cols: string[] = []
for (let x = 0; x < 5; x++) { let c = ''; for (let y = 0; y < 7; y++) c += t.get(x, y) ? '#' : '.'; cols.push(c) }
console.log('glyph N columns:', cols.join(' '))
console.log('textWidth("wlans") =', textWidth('wlans'))
