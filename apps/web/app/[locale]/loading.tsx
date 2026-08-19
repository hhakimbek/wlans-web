/**
 * Route-level fallback. It mirrors the shape every page opens with — eyebrow,
 * two heading lines, a lede — so the swap to real content is a fill, not a
 * layout change. A centred spinner would move everything twice.
 *
 * No dictionary lookup here: a loading state must not wait on anything, and
 * the only text is for screen readers, which the `lang` on <html> covers.
 */
export default function Loading() {
  return (
    <section className="section section--hero hero-wrap hero-wrap--compact">
      <div className="container">
        <div className="skeleton-head" aria-hidden="true">
          <span className="skeleton skeleton--eyebrow" />
          <span className="skeleton skeleton--title" />
          <span className="skeleton skeleton--title skeleton--title-short" />
          <span className="skeleton skeleton--lede" />
          <span className="skeleton skeleton--lede skeleton--lede-short" />
        </div>
        <p className="sr-only" role="status">
          …
        </p>
      </div>
    </section>
  )
}
