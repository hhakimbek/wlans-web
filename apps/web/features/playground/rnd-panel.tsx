'use client'

import { DisplayPanel, heroScene } from './display-panel'

/** Client boundary: `scene` is a function and cannot cross the RSC boundary. */
export function RndPanel() {
  return <DisplayPanel scene={heroScene} bus="i2c" clockHz={400_000} fps={24} />
}
