import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'Is Accessaurus WCAG compliant?',
      answer:
        'We target WCAG 2.1 AA by default. When inputs are incomplete or confidence is low, we return null instead of guessing.',
    },
    {
      question: 'Does it change my content?',
      answer:
        'We add structured metadata and JSON‑LD and suggest semantic improvements. Your visual content remains yours.',
    },
    {
      question: 'Can we use it in regulated environments?',
      answer:
        'Yes. It’s server‑first with idempotency and auditability. No customer secrets are exposed in the browser.',
    },
  ],
  [
    {
      question: 'How does this help screen reader users?',
      answer:
        'We generate clear titles and descriptions that make sense when read aloud and enforce a logical reading order.',
    },
    {
      question: 'How does it help AI assistants?',
      answer:
        'We add Schema.org JSON‑LD and semantic markers so assistants can better understand and explain your content.',
    },
    {
      question: 'Do you support nonprofits and education?',
      answer:
        'Yes. We offer a free tier for nonprofits and discounts for education. Contact us to get set up.',
    },
  ],
  [
    {
      question: 'What happens when confidence is low?',
      answer:
        'We return null. Guardrails prevent hallucinations and confusing outputs. You’re always in control.',
    },
    {
      question: 'How hard is integration?',
      answer:
        'Add a single component to your layout and provide basic page context on the server. That’s it.',
    },
    {
      question: 'Do you store personal data?',
      answer:
        'We redact PII in ingestion and never expose secrets in the browser. See our docs for details.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team
            and if you’re lucky someone will get back to you.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg/7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
