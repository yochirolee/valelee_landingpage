'use client'
import React from 'react'
import { ClipboardCheck, CalendarClock, Truck, Rocket } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const ENABLE_ANIMATIONS = true

type Step = {
  title: string
  description: string
}

type HowItWorksDict = {
  title: string
  title2: string
  steps: Step[]
}

type Dict = {
  howItWorks: HowItWorksDict
}

type Props = {
  dict: Dict
}


const softCardVariants: Variants = {
  offscreen: { opacity: 0, y: 12 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: [0.22, 1, 0.36, 1],
      duration: 0.45,
    },
  },
}

const softContainerVariants = {
  offscreen: {},
  onscreen: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

export default function HowItWorks({ dict }: Props) {
  const steps = dict.howItWorks.steps
  const shouldReduce = useReducedMotion()

  const neutral: Variants = { offscreen: { opacity: 1, y: 0 }, onscreen: { opacity: 1, y: 0 } }
  const cardVariants = !ENABLE_ANIMATIONS || shouldReduce ? neutral : softCardVariants
  const containerVariants = !ENABLE_ANIMATIONS || shouldReduce ? neutral : softContainerVariants

  const icons = [
    <ClipboardCheck key="clipboard" className="w-10 h-10 text-slate-900 mb-4" />,
    <CalendarClock key="calendar" className="w-10 h-10 text-slate-900 mb-4" />,
    <Truck key="truck" className="w-10 h-10 text-slate-900 mb-4" />,
    <Rocket key="rocket" className="w-10 h-10 text-slate-900 mb-4" />,
  ]

  return (
    <section className="py-20 px-4 bg-[#F6F3EE]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">
          {dict.howItWorks.title}{' '}
          <span className="text-slate-900">{dict.howItWorks.title2}</span>
        </h2>

        <motion.div
          className="grid md:grid-cols-3 gap-8 text-gray-800"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="bg-white p-6 rounded-xl shadow-md shadow-gray-300 ring-1 ring-gray-200 hover:shadow-lg hover:shadow-gray-400 text-left transition duration-300"
            >
              {icons[idx]}
              <h3 className="text-xl text-slate-900 font-semibold mb-2">{step.title}</h3>
              <p className="text-slate-900">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
