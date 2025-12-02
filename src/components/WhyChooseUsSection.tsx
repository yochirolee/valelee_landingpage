'use client'

import { UserCheck, CheckCircle, SlidersHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'

const featuresVariants = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 18 },
  },
}

type Feature = { name: string; description: string }
type WhyChooseUs = { title: string; headline: string; description: string; features: Feature[] }
type Dict = { whyChooseUs: WhyChooseUs }

export default function WhyChooseUsSection({ dict }: { dict: Dict }) {
  const features = dict?.whyChooseUs?.features ?? []
  const icons = [UserCheck, CheckCircle, SlidersHorizontal]

  return (
    <div className="overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">

          {/* TEXT SECTION */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            variants={featuresVariants}
            className="lg:pt-4 lg:pr-8"
          >
            <div className="lg:max-w-lg">
              <h2 className="text-lg font-semibold text-cyan-400 uppercase tracking-wide">{dict.whyChooseUs.title}</h2>
              <p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{dict.whyChooseUs.headline}</p>
              <p className="mt-6 text-lg text-cyan-100 leading-relaxed">{dict.whyChooseUs.description}</p>

              <dl className="mt-10 grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
                {features.map((feature: Feature, index: number) => {
                  const Icon = icons[index]
                  return (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="relative flex items-start rounded-xl bg-slate-700/50 p-6 shadow-lg ring-1 ring-white/10 hover:scale-105 transition-transform"
                    >
                      <div className="flex-shrink-0">
                        <Icon className="h-6 w-6 text-cyan-400 mt-1" />
                      </div>
                      <div className="ml-4">
                        <dt className="text-lg font-semibold text-white">{feature.name}</dt>
                        <dd className="mt-1 text-base text-cyan-100">{feature.description}</dd>
                      </div>
                    </motion.div>
                  )
                })}
              </dl>
            </div>
          </motion.div>

          {/* IMAGE SECTION */}
          <div className="relative sm:mx-auto lg:mx-0">
            <div
              className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 transform transition-transform hover:scale-105"
              style={{ width: '100%', maxWidth: '420px', aspectRatio: '4/5' }}
            >
              <img
                src="/googleanalitics.webp"
                alt="Resultados reales en Google Analytics: crecimiento del cliente"
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ objectPosition: 'center 20%' }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
