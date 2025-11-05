'use client'

import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type FAQ = { q: string; a: string }
type FaqDict = { label: string; title1: string; title2: string; questions: FAQ[] }
type Dict = { faq: FaqDict }

export default function FAQSection({ dict }: { dict: Dict }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const faqs = dict.faq.questions

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  // FAQPage JSON-LD para rich results
  const faqJsonLd = useMemo(() => {
    const mainEntity = faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity
    })
  }, [faqs])

  return (
    <section id="faq" className="relative isolate overflow-hidden bg-[#FDFBF7] py-24 px-6 font-sans">
      {/* JSON-LD para SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
        <header className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-gray-700 mb-4">{dict.faq.label}</p>
          <h2 className="sm:text-4xl text-3xl font-extrabold text-slate-900">
            {dict.faq.title1}{' '}
            <span className="text-amber-700">{dict.faq.title2}</span>
          </h2>
        </header>

        <ul className="basis-1/2 divide-y divide-[#1CA8E3]/50" role="list">
          {faqs.map((faq: FAQ, index: number) => {
            const isOpen = activeIndex === index
            const contentId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <li key={index} className={index === 0 ? 'border-t border-[#1CA8E3]' : ''}>
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left text-gray-800 md:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 rounded"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                >
                  <span className="flex-1">{faq.q}</span>

                  {/* ícono + / × accesible */}
                  <span
                    className="ml-2 inline-flex h-6 w-6 items-center justify-center text-gray-700"
                    aria-hidden="true"
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="7" width="16" height="2" rx="1" fill="currentColor" />
                      <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        fill="currentColor"
                        className={`transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'} rotate-90`}
                      />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={buttonId}
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 leading-relaxed text-gray-700">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
