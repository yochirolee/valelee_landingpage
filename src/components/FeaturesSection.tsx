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
    <div className="overflow-hidden bg-[#0078A0] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">

          {/* TEXT SECTION */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            variants={featuresVariants}
            className="lg:pt-4 lg:pr-8"
          >
            <div className="lg:max-w-lg">
              <h2 className="text-lg font-semibold text-white">{dict.whyChooseUs.title}</h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {dict.whyChooseUs.headline}
              </p>
              <p className="mt-6 text-lg text-[#BEE3F8] leading-relaxed">
                {dict.whyChooseUs.description}
              </p>

              <dl className="mt-10 max-w-xl space-y-8 text-base text-[#D7E9FB] lg:max-w-none">
                {features.map((feature: Feature, index: number) => {
                  const Icon = icons[index]
                  return (
                    <div key={feature.name} className="relative pl-10">
                      <Icon className="absolute top-1 left-1 h-6 w-6 text-[#1CA8E3]" aria-hidden="true" />
                      <dt className="inline font-semibold text-white">{feature.name}</dt>{' '}
                      <dd className="inline">— {feature.description}</dd>
                    </div>
                  )
                })}
              </dl>
            </div>
          </motion.div>

          {/* IMAGE SECTION (recorte por CSS) */}
          <div
            className="relative sm:mx-auto lg:mx-0 rounded-xl shadow-xl ring-1 ring-white/10"
            style={{
              width: '100%',
              maxWidth: '420px',          // límite de ancho
              aspectRatio: '4 / 5',       // relación para “cortar” (ajusta a 3/4, 5/7, etc.)
            }}
          >
            <img
              src="/googleanalitics.jpeg"
              alt="Resultados reales en Google Analytics: crecimiento del cliente"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover rounded-xl"
              style={{
                objectPosition: 'center 20%', // mueve el foco vertical si quieres (0% top, 50% center, 100% bottom)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
