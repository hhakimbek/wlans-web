/**
 * Brand marks, drawn from the official artwork.
 *
 * lucide's `Apple` and `Play` are generic glyphs — an apple with a leaf and a
 * media play triangle. Next to the words "App Store" and "Google Play" they
 * read as the wrong logo, which is worse than no logo. These are the real
 * marks: Apple's silhouette and the four-colour Play arrow, kept at their
 * source viewBoxes so the proportions are not redrawn by hand.
 *
 * Both are trademarks of their owners and are used here only to identify the
 * store a listing lives on.
 */

interface MarkProps {
  size?: number
  className?: string
}

export function AppleMark({ size = 16, className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 814 1000"
      width={(size * 814) / 1000}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  )
}

export function GooglePlayMark({ size = 16, className }: MarkProps) {
  return (
    <svg
      viewBox="30 336.7 120.9 129.2"
      width={(size * 120.9) / 129.2}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#FFD400"
        d="M119.2 421.2c15.3-8.4 27-14.8 28-15.3 3.2-1.7 6.5-6.2 0-9.7-2.1-1.1-13.4-7.3-28-15.3l-20.1 20.2 20.1 20.1z"
      />
      <path
        fill="#FF3333"
        d="M99.1 401.1l-64.2 64.7c1.5.2 3.2-.2 5.2-1.3 4.2-2.3 48.8-26.7 79.1-43.3l-20.1-20.1z"
      />
      <path
        fill="#48FF48"
        d="M99.1 401.1l20.1-20.2s-74.6-40.7-79.1-43.1c-1.7-1-3.6-1.3-5.3-1l64.3 64.3z"
      />
      <path
        fill="#3BCCFF"
        d="M99.1 401.1L34.8 336.8c-2.6.6-4.8 2.9-4.8 7.6 0 7.5 0 107.5 0 113.8 0 4.3 1.7 7.4 4.9 7.7l64.2-64.8z"
      />
    </svg>
  )
}

/**
 * The Android robot head. The full-body robot is a `<use>`/`<defs>` document
 * that does not survive being inlined at 22px, and the head alone is what the
 * platform itself uses at icon sizes.
 */
export function AndroidMark({ size = 16, className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6.4 6.6 4.9 4a.6.6 0 0 1 1-.6l1.6 2.7a8.2 8.2 0 0 1 9 0L18.1 3.4a.6.6 0 1 1 1 .6l-1.5 2.6A7.3 7.3 0 0 1 21.3 13H2.7a7.3 7.3 0 0 1 3.7-6.4zm2.1 3.7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    </svg>
  )
}
