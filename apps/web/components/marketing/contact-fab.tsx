import { Send } from 'lucide-react'

/**
 * Floating contact action.
 *
 * Telegram rather than the form: on a phone the form is four screens of
 * typing, and the fastest route to a reply is the app the visitor already has
 * open. The form still exists for people who want to write a brief.
 *
 * It is a link, not a button — long-press to copy, open in a new tab, and
 * "Open in Telegram" all work for free.
 */
export function ContactFab({ telegram, label }: { telegram: string; label: string }) {
  return (
    <a
      className="fab"
      href={'https://t.me/' + telegram}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
    >
      <span className="fab__icon" aria-hidden="true">
        <Send size={21} strokeWidth={2.3} />
      </span>
      {/* Visible on a pointer device, where there is room beside the icon and
          an unlabelled circle is a guessing game. */}
      <span className="fab__label">{label}</span>
    </a>
  )
}
