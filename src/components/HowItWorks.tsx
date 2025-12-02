'use client'
import React from 'react'
import { ClipboardCheck, CalendarClock, Truck, Rocket } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const ENABLE_ANIMATIONS = true

type Step = { title: string; description: string }
type HowItWorksDict = { title: string; title2: string; title3: string; steps: Step[] }
type Dict = { howItWorks: HowItWorksDict }
type Props = { dict: Dict }

const softCardVariants: Variants = {
  offscreen: { opacity: 0, y: 30 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 20 },
  },
}

const softContainerVariants = {
  offscreen: {},
  onscreen: { transition: { staggerChildren: 0.15 } },
}

export default function HowItWorks({ dict }: Props) {
  const steps = dict.howItWorks.steps
  const shouldReduce = useReducedMotion()
  const cardVariants = !ENABLE_ANIMATIONS || shouldReduce ? { offscreen: {}, onscreen: {} } : softCardVariants
  const containerVariants = !ENABLE_ANIMATIONS || shouldReduce ? { offscreen: {}, onscreen: {} } : softContainerVariants

  const icons = [
    ClipboardCheck,
    CalendarClock,
    Truck,
    Rocket,
  ]

  const iconColors = ['bg-[#E4DFB5]', 'bg-amber-700', 'bg-cyan-400', 'bg-[#0F3557]']

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          {dict.howItWorks.title}{' '}
          <span className="text-slate-900">{dict.howItWorks.title2}</span>
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
          {dict.howItWorks.title3}
        </p>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 md:grid-cols-4"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {steps.map((step, idx) => {
            const Icon = icons[idx]
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
              >
                <div className={`flex items-center justify-center w-16 h-16 mb-4 rounded-full ${iconColors[idx]} text-white shadow-lg`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
