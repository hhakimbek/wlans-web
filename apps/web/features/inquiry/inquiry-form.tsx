'use client'

import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { useState } from 'react'

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
        <p className="form-result__body">
          <strong>{status.ref}</strong> — {ui.successBody}
        </p>
        <a className="btn btn--secondary" href={telegramUrl} target="_blank" rel="noreferrer">
          Telegram
        </a>
      </div>
    )
  }

  const sending = status.kind === 'sending'

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__row">
        <Field label={ui.name} name="name" error={errors.name} required>
          <input
            id="name"
            name="name"
            className="input"
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            autoComplete="name"
            placeholder={ui.namePlaceholder}
          />
        </Field>

        <Field label={ui.email} name="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            autoComplete="email"
            placeholder={ui.emailPlaceholder}
          />
        </Field>
      </div>

      <div className="form__row">
        <Field label={ui.company} name="company" hint={ui.optional}>
          <input
            id="company"
            name="company"
            className="input"
            value={values.company}
            onChange={(e) => set('company', e.target.value)}
            autoComplete="organization"
            placeholder={ui.companyPlaceholder}
          />
        </Field>

        <Field label={ui.contact} name="contact" hint={ui.contactHint}>
          <input
            id="contact"
            name="contact"
            className="input"
            value={values.contact}
            onChange={(e) => set('contact', e.target.value)}
            autoComplete="tel"
            placeholder={ui.contactPlaceholder}
          />
        </Field>
      </div>

      <div className="form__row form__row--3">
        <Field label={ui.projectType} name="projectType">
          <select
            id="projectType"
            name="projectType"
            className="input"
            value={values.projectType}
            onChange={(e) => set('projectType', e.target.value as InquiryInput['projectType'])}
          >
            {options.projectTypes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>

        <Field label={ui.budget} name="budget">
          <select
            id="budget"
            name="budget"
            className="input"
            value={values.budget}
            onChange={(e) => set('budget', e.target.value as InquiryInput['budget'])}
          >
            {options.budgetRanges.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>

        <Field label={ui.timeline} name="timeline">
          <select
            id="timeline"
            name="timeline"
            className="input"
            value={values.timeline}
            onChange={(e) => set('timeline', e.target.value as InquiryInput['timeline'])}
          >
            {options.timelines.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={ui.message} name="message" error={errors.message} required>
        <textarea
          id="message"
          name="message"
          className="input input--area"
          rows={6}
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder={ui.messagePlaceholder}
        />
      </Field>

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
              <Send size={18} strokeWidth={2.4} aria-hidden="true" />
              {ui.submit}
            </>
          )}
        </button>
        <p className="form__note">{ui.successBody}</p>
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  hint,
  error,
  required,
  children,
}: {
  label: string
  name: string
  hint?: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="field" data-invalid={Boolean(error)}>
      <label className="field__label" htmlFor={name}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {/* Errors sit next to the field, not in a summary at the top — the user
          is looking here, not there. */}
      {error ? (
        <p className="field__error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="field__hint">{hint}</p>
      ) : null}
    </div>
  )
}
