'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

/**
 * Single-open accordion.
 *
 * Height is animated with CSS `grid-template-rows: 0fr -> 1fr`, which is the
 * only way to transition to intrinsic content height without measuring in
 * JavaScript. The panel stays in the DOM so its content remains findable by
 * in-page search; `visibility` hides it from the accessibility tree when shut.
 */
export interface AccordionItem {
  title: string
  body: React.ReactNode
}

export function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen)

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.title} className="accordion__item" data-open={isOpen}>
            <h3>
              <button
                type="button"
                className="accordion__trigger"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.title}</span>
                <ChevronDown className="accordion__chevron" size={20} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </h3>
            <div className="accordion__panel" hidden={!isOpen && false}>
              <div className="accordion__inner">{item.body}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
