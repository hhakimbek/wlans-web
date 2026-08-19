'use client'

import { Play, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * A play button that opens a video in a modal.
 *
 * Built on the native `<dialog>` element rather than a library: it brings
 * focus trapping, Escape-to-close, inert background and the top layer for
 * free, which is most of what a dialog component exists to provide.
 *
 * The iframe is only created once the dialog opens, and destroyed when it
 * closes. A YouTube embed is roughly half a megabyte of script — mounting it
 * on page load to save one click would cost more than the whole rest of the
 * site put together.
 */

export interface VideoModalProps {
  youtubeId: string
  title: string
  caption?: string
  /** Rendered inside the trigger, behind the play button. */
  poster?: React.ReactNode
  variant?: 'button' | 'thumbnail'
}

export function VideoModal({
  youtubeId,
  title,
  caption,
  poster,
  variant = 'button',
}: VideoModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)

  const close = useCallback(() => {
    setOpen(false)
    ref.current?.close()
  }, [])

  const openDialog = useCallback(() => {
    setOpen(true)
    ref.current?.showModal()
  }, [])

  // `close` also fires on Escape, which bypasses our handler — so the iframe
  // teardown has to hang off the dialog's own event, not just the button.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const onClose = () => setOpen(false)
    dialog.addEventListener('close', onClose)
    return () => dialog.removeEventListener('close', onClose)
  }, [])

  return (
    <>
      {variant === 'thumbnail' ? (
        <button type="button" className="video-thumb" onClick={openDialog}>
          <span className="video-thumb__poster">{poster}</span>
          <span className="video-thumb__play" aria-hidden="true">
            <Play size={22} fill="currentColor" strokeWidth={0} />
          </span>
          <span className="sr-only-text">Play video: {title}</span>
        </button>
      ) : (
        <span className="video-cta">
          <button type="button" className="video-cta__btn" onClick={openDialog}>
            <Play size={22} fill="currentColor" strokeWidth={0} aria-hidden="true" />
            <span className="sr-only-text">Play video: {title}</span>
          </button>
          {caption ? <span className="video-cta__caption">{caption}</span> : null}
        </span>
      )}

      <dialog
        ref={ref}
        className="video-dialog"
        aria-label={title}
        onClick={(event) => {
          // Clicking the backdrop closes. The dialog element itself is the
          // backdrop's hit area, so a click landing on it — rather than on
          // the inner panel — means the user clicked outside.
          if (event.target === ref.current) close()
        }}
      >
        <div className="video-dialog__panel">
          <button type="button" className="video-dialog__close" onClick={close} aria-label="Close video">
            <X size={20} strokeWidth={2.5} />
          </button>
          <div className="video-dialog__frame">
            {open ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : null}
          </div>
        </div>
      </dialog>
    </>
  )
}
