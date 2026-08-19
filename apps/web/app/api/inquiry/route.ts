import { NextResponse } from 'next/server'

import { contact as company } from '@/content/structure'
import { inquirySchema } from '@/features/inquiry/schema'

/**
 * Project inquiry endpoint.
 *
 * Delivery is via Resend's REST API called with `fetch` — the SDK adds a
 * dependency for one HTTP request. Telegram delivery runs alongside it when a
 * bot token is configured, because a single email channel fails silently: a
 * spam filter eats the message and nobody finds out until the lead is gone.
 *
 * When no channel is configured the route returns 503 with a machine-readable
 * code, and the form falls back to showing the direct Telegram and email
 * links. It does NOT report a fake success — a lead that quietly vanishes is
 * worse than one the visitor knows to send another way.
 *
 * Still to come in Phase 4 (architecture doc §6.3): Postgres persistence,
 * rate limiting, Turnstile, and an idempotency token. This route is the
 * bridge, not the finished thing.
 */

export const runtime = 'nodejs'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: 'bad_json', message: 'Malformed request.' } },
      { status: 400 },
    )
  }

  const parsed = inquirySchema.safeParse(payload)
  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === 'string' && !fields[key]) fields[key] = issue.message
    }
    return NextResponse.json(
      { ok: false, error: { code: 'invalid', message: 'Please check the form.', fields } },
      { status: 400 },
    )
  }

  const data = parsed.data

  // Honeypot: accept and discard. Returning an error would tell a bot author
  // exactly which field gave it away.
  if (data.website) {
    return NextResponse.json({ ok: true, ref: 'ok' }, { status: 201 })
  }

  const ref = `WL-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`

  const lines = [
    `Ref: ${ref}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    data.contact ? `Phone / Telegram: ${data.contact}` : null,
    `Project: ${data.projectType}`,
    `Budget: ${data.budget}`,
    `Timeline: ${data.timeline}`,
    '',
    data.message,
  ].filter(Boolean) as string[]

  const resendKey = process.env.RESEND_API_KEY
  const inboxTo = process.env.INQUIRY_TO ?? company.email
  const inboxFrom = process.env.INQUIRY_FROM
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN
  const telegramChat = process.env.TELEGRAM_CHAT_ID

  const delivered: string[] = []
  const failures: string[] = []

  if (resendKey && inboxFrom) {
    try {
      const response = await fetch(RESEND_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: inboxFrom,
          to: [inboxTo],
          reply_to: data.email,
          subject: `New project inquiry — ${data.name} (${data.projectType})`,
          html: `<pre style="font:14px/1.6 ui-monospace,monospace">${escapeHtml(lines.join('\n'))}</pre>`,
        }),
      })
      if (response.ok) delivered.push('email')
      else failures.push(`email:${response.status}`)
    } catch {
      failures.push('email:network')
    }
  }

  if (telegramToken && telegramChat) {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${telegramToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChat,
            text: `🔔 New project inquiry\n\n${lines.join('\n')}`,
            disable_web_page_preview: true,
          }),
        },
      )
      if (response.ok) delivered.push('telegram')
      else failures.push(`telegram:${response.status}`)
    } catch {
      failures.push('telegram:network')
    }
  }

  if (delivered.length === 0) {
    const configured = Boolean((resendKey && inboxFrom) || (telegramToken && telegramChat))
    console.error('[inquiry] no channel delivered', { ref, configured, failures })
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: configured ? 'delivery_failed' : 'not_configured',
          message: configured
            ? 'We could not send your message right now.'
            : 'Direct sending is not switched on yet.',
        },
      },
      { status: 503 },
    )
  }

  return NextResponse.json({ ok: true, ref, delivered }, { status: 201 })
}
