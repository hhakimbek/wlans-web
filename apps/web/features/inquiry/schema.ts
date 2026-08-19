import { z } from 'zod'

import { en } from '@/content/locales/en'
import { ru } from '@/content/locales/ru'
import { uz } from '@/content/locales/uz'

/**
 * The single source of truth for the project inquiry.
 *
 * Imported by both the form and the route handler, so the client cannot
 * validate against a different shape than the server enforces.
 *
 * The three option lists are translated, so the enum is the union across every
 * locale: the visitor submits the label they were shown, and the server has to
 * accept it whichever language that was. Validating against one locale would
 * reject every Russian and Uzbek submission.
 */
const union = (pick: (d: typeof en) => readonly string[]) =>
  [...new Set([...pick(uz), ...pick(ru), ...pick(en)])] as [string, ...string[]]

const projectTypeValues = union((d) => d.projectTypes)
const budgetValues = union((d) => d.budgetRanges)
const timelineValues = union((d) => d.timelines)

export const inquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.string().trim().toLowerCase().email('Please enter a valid email address.').max(200),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  // Deliberately loose: phone formats vary and a strict pattern rejects real
  // numbers far more often than it catches typos.
  contact: z.string().trim().max(120).optional().or(z.literal('')),
  projectType: z.enum(projectTypeValues),
  budget: z.enum(budgetValues),
  timeline: z.enum(timelineValues),
  message: z
    .string()
    .trim()
    .min(20, 'Please describe the project in at least 20 characters.')
    .max(4000),
  // Honeypot. Deliberately NOT constrained here: a `max(0)` rule would make
  // the schema reject the request and name the offending field, which tells a
  // bot author exactly which input is the trap. The route accepts it and
  // silently discards instead.
  website: z.string().max(200).optional(),
})

export type InquiryInput = z.infer<typeof inquirySchema>

/** Empty state for a given locale's option labels. */
export function emptyInquiry(options: {
  projectTypes: string[]
  budgetRanges: string[]
  timelines: string[]
}): InquiryInput {
  return {
    name: '',
    email: '',
    company: '',
    contact: '',
    projectType: options.projectTypes[0],
    budget: options.budgetRanges[options.budgetRanges.length - 1],
    timeline: options.timelines[1],
    message: '',
    website: '',
  }
}
