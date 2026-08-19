import { ImageResponse } from 'next/og'

import { locales } from '@/i18n'

/**
 * Social card for every page under a locale.
 *
 * Most links to this site are pasted into Telegram, which renders og:image at
 * roughly card width. The content is deliberately language-neutral — a
 * wordmark and the domain, no sentence — so one image is correct in all three
 * locales and the card never needs a Cyrillic-capable font fetched at build
 * time. Text drawn with the runtime's built-in face would drop `oʻ` and
 * Cyrillic glyphs to tofu, which is worse than showing nothing.
 */
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'wlans'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 88,
          background: '#0B1120',
          // Two offset radial glows read as depth without a blur filter.
          backgroundImage:
            'radial-gradient(900px 520px at 12% 0%, #1E4FD8 0%, rgba(11,17,32,0) 62%),' +
            'radial-gradient(700px 480px at 96% 104%, #2663EB 0%, rgba(11,17,32,0) 58%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#2663EB',
              boxShadow: '0 18px 48px rgba(38,99,235,0.55)',
            }}
          >
            {/* The same bolt as the header mark, inlined so the card does not
                depend on an icon package at edge runtime. */}
            <svg width="34" height="34" viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M13 2 4.5 13.2H11l-1 8.8 8.5-11.2H12z" />
            </svg>
          </div>
          <span style={{ fontSize: 46, fontWeight: 800, letterSpacing: -1.5 }}>wlans</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div style={{ display: 'flex', gap: 18 }}>
            {['iOS', 'Android', 'Web', 'Backend'].map((label) => (
              <span
                key={label}
                style={{
                  fontSize: 27,
                  fontWeight: 600,
                  padding: '12px 26px',
                  borderRadius: 999,
                  color: '#DBE6FF',
                  border: '1px solid rgba(219,230,255,0.28)',
                  background: 'rgba(219,230,255,0.07)',
                }}
              >
                {label}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 30, fontWeight: 500, color: '#94A9C9' }}>wlans.uz</span>
        </div>
      </div>
    ),
    size,
  )
}
