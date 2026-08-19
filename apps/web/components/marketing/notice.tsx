/** Marks structure that is waiting on real content. Visible on purpose. */
export function Notice({ children }: { children: React.ReactNode }) {
  return <p className="notice">{children}</p>
}
