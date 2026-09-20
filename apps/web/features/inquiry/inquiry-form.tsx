'use client'

import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { useId, useState } from 'react'

import type { FormStrings } from '@/content/types'
import type { Locale } from '@/i18n'
import { emptyInquiry, inquirySchema, type InquiryInput } from './schema'

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent'; ref: string }
  | { kind: 'error'; message: string; fallback: boolean }

/**
 * Project inquiry form.
 *
 * Validation runs client-side for speed and server-side for truth — the same
 * zod schema on both sides, so they cannot disagree. Client validation is a
 * convenience; the route handler never trusts it.
 *
 * When the server has no delivery channel configured, the failure is shown
 * honestly along with the direct Telegram and email links, rather than a fake
 * success. A lead the visitor thinks was sent, but was not, is the worst
 * possible outcome for this page.
 *
 * Three things the previous version left out, and each of them is the
 * difference between a form that works and a form that works for everyone:
 *
 * 1. **Every error is wired to its field** with `aria-describedby`, so a
 *    screen reader announces the message when focus lands on the input rather
 *    than leaving a red border to speak for itself.
 * 2. **Errors clear on blur, not on submit.** Fixing a field and being told it
 *    is still wrong until you press the button again is the classic way a form
 *    feels hostile.
 * 3. **Nine inputs are two named groups.** "About you" and "About the project"
 *    are different questions, and a single column of fields hides that.
 *
 * Option labels and contact details arrive as props: this is a client
 * component and cannot read the active locale from the route the way a server
 * component can.
 */
export interface InquiryOptions {
  projectTypes: string[]
  budgetRanges: string[]
  timelines: string[]
}

export function InquiryForm({
  locale,
  options,
  contact,
  ui,
}: {
  locale: Locale
  options: InquiryOptions
  contact: { telegram: string; email: string }
  ui: FormStrings
}) {
  const [values, setValues] = useState<InquiryInput>(() => emptyInquiry(options))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const telegramUrl = 'https://t.me/' + contact.telegram

  const set = <K extends keyof InquiryInput>(key: K, value: InquiryInput[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }))
    if (errors[key]) setErrors(({ [key as string]: _removed, ...rest }) => rest)
  }

  /* Re-check one field when the user leaves it, but only to CLEAR an error
     that is already showing. Validating a field the first time someone tabs
     through it — before they have typed anything — turns an empty form into a
     wall of red. */
  const revalidate = (key: keyof InquiryInput) => {
    if (!errors[key as string]) return
    const parsed = inquirySchema.safeParse(values)
    if (parsed.success || !parsed.error.issues.some((issue) => issue.path[0] === key)) {
      setErrors(({ [key as string]: _removed, ...rest }) => rest)
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()

    const parsed = inquirySchema.safeParse(values)
    if (!parsed.success) {
      const next: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (typeof key === 'string' && !next[key]) next[key] = issue.message
      }
      setErrors(next)
      // Move focus to the first problem rather than leaving the user to hunt.
      document.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus()
      return
    }

    setStatus({ kind: 'sending' })
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept-Language': locale },
        body: JSON.stringify(parsed.data),
      })
      const body = await response.json()

      if (response.ok) {
        setStatus({ kind: 'sent', ref: body.ref })
        setValues(emptyInquiry(options))
        return
      }

      if (body?.error?.fields) setErrors(body.error.fields)
      setStatus({
        kind: 'error',
        message: body?.error?.message ?? ui.errorTitle,
        fallback: response.status === 503,
      })
    } catch {
      setStatus({
        kind: 'error',
        message: ui.errorTitle,
        fallback: true,
      })
    }
  }

  if (status.kind === 'sent') {
    return (
      <div className="form-result">
        <span className="form-result__icon form-result__icon--ok" aria-hidden="true">
          <CheckCircle2 size={28} strokeWidth={2.2} />
        </span>
        <h3 className="form-result__title">{ui.successTitle}</h3>
        <p className="form-result__ref">
          {ui.successRefLabel} {status.ref}
        </p>
        <p className="form-result__body">{ui.successBody}</p>
        <a className="btn btn--secondary" href={telegramUrl} target="_blank" rel="noreferrer">
          Telegram
          <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
        </a>
      </div>
    )
  }

  const sending = status.kind === 'sending'

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <fieldset className="form__group">
        <legend className="form__legend">{ui.groupYou}</legend>

        <div className="form__row">
          <Field label={ui.name} name="name" error={errors.name} required>
            {(props) => (
              <input
                {...props}
                value={values.name}
                onChange={(e) => set('name', e.target.value)}
                onBlur={() => revalidate('name')}
                autoComplete="name"
                placeholder={ui.namePlaceholder}
              />
            )}
          </Field>

          <Field label={ui.email} name="email" error={errors.email} required>
            {(props) => (
              <input
                {...props}
                type="email"
                value={values.email}
                onChange={(e) => set('email', e.target.value)}
                onBlur={() => revalidate('email')}
                autoComplete="email"
                placeholder={ui.emailPlaceholder}
              />
            )}
          </Field>
        </div>

        <div className="form__row">
          <Field label={ui.company} name="company" hint={ui.optional}>
            {(props) => (
              <input
                {...props}
                value={values.company}
                onChange={(e) => set('company', e.target.value)}
                autoComplete="organization"
                placeholder={ui.companyPlaceholder}
              />
            )}
          </Field>

          <Field label={ui.contact} name="contact" hint={ui.contactHint}>
            {(props) => (
              <input
                {...props}
                value={values.contact}
                onChange={(e) => set('contact', e.target.value)}
                autoComplete="tel"
                placeholder={ui.contactPlaceholder}
              />
            )}
          </Field>
        </div>
      </fieldset>

      <fieldset className="form__group">
        <legend className="form__legend">{ui.groupProject}</legend>

        <div className="form__row form__row--3">
          <Field label={ui.projectType} name="projectType">
            {(props) => (
              <select
                {...props}
                value={values.projectType}
                onChange={(e) => set('projectType', e.target.value as InquiryInput['projectType'])}
              >
                {options.projectTypes.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            )}
          </Field>

          <Field label={ui.budget} name="budget">
            {(props) => (
              <select
                {...props}
                value={values.budget}
                onChange={(e) => set('budget', e.target.value as InquiryInput['budget'])}
              >
                {options.budgetRanges.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            )}
          </Field>

          <Field label={ui.timeline} name="timeline">
            {(props) => (
              <select
                {...props}
                value={values.timeline}
                onChange={(e) => set('timeline', e.target.value as InquiryInput['timeline'])}
              >
                {options.timelines.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            )}
          </Field>
        </div>

        <Field label={ui.message} name="message" error={errors.message} required area>
          {(props) => (
            <textarea
              {...props}
              rows={6}
              value={values.message}
              onChange={(e) => set('message', e.target.value)}
              onBlur={() => revalidate('message')}
              placeholder={ui.messagePlaceholder}
            />
          )}
        </Field>
      </fieldset>

      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">{ui.website}</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </div>

      {status.kind === 'error' ? (
        <div className="form-alert" role="alert">
          <AlertCircle size={18} strokeWidth={2.4} aria-hidden="true" />
          <div>
            <strong>{status.message}</strong>
            {status.fallback ? (
              <p>
                <a href={telegramUrl} target="_blank" rel="noreferrer">
                  Telegram
                </a>{' '}
                · <a href={'mailto:' + contact.email}>{contact.email}</a>
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="form__actions">
        <button type="submit" className="btn btn--primary btn--lg" disabled={sending}>
          {sending ? (
            <>
              <Loader2 size={18} className="spin" aria-hidden="true" />
              {ui.submitting}
            </>
          ) : (
            <>
              {ui.submit}
              <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
            </>
          )}
        </button>
        <p className="form__note">{ui.successBody}</p>
      </div>
    </form>
  )
}

/** The props a `Field` hands to whichever control it wraps. */
type ControlProps = {
  id: string
  name: string
  className: string
  'aria-invalid'?: true
  'aria-describedby'?: string
  'aria-required'?: true
}

function Field({
  label,
  name,
  hint,
  error,
  required,
  area,
  children,
}: {
  label: string
  name: string
  hint?: string
  error?: string
  required?: boolean
  /** Textarea rather than a single-line input. */
  area?: boolean
  children: (props: ControlProps) => React.ReactNode
}) {
  /* A generated id, not the field name: two forms on one page would otherwise
     produce duplicate ids and `aria-describedby` would resolve to whichever
     one the browser found first. */
  const uid = useId()
  const describedBy = error ? uid + '-error' : hint ? uid + '-hint' : undefined

  return (
    <div className="field" data-invalid={Boolean(error)}>
      <label className="field__label" htmlFor={uid}>
        {label}
        {required ? <span aria-hidden="true">*</span> : null}
      </label>

      {children({
        id: uid,
        name,
        className: area ? 'input input--area' : 'input',
        ...(error ? { 'aria-invalid': true as const } : {}),
        ...(describedBy ? { 'aria-describedby': describedBy } : {}),
        ...(required ? { 'aria-required': true as const } : {}),
      })}

      {/* The message sits next to the field, not in a summary at the top — the
          user is looking here, not there — and it is announced because the
          control points at it. */}
      {error ? (
        <p className="field__error" id={uid + '-error'}>
          <AlertCircle size={13} strokeWidth={2.6} aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p className="field__hint" id={uid + '-hint'}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}
