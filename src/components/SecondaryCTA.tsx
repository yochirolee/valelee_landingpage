'use client'

import { motion } from 'framer-motion'

type SecondaryCTADict = {
  title1: string
  title2: string
  description: string
  button: string
}

type Dict = {
  secondaryCTA: SecondaryCTADict
}

export default function SecondaryCTA({ dict }: { dict: Dict }) {
  return (
    <section aria-labelledby="cta-heading" className="bg-[#F6F3EE]">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:items-center lg:gap-x-20 lg:px-24 lg:pt-0
                        bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100">

          {/* Decoración radial sutil en tonos cálidos */}
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[36rem] -translate-y-1/2 -translate-x-1/2 opacity-30"
          >
            <circle r={512} cx={512} cy={512} fill="#FDE68A" fillOpacity="0.18" />
          </svg>

          {/* Ruido/grano muy suave para textura (opcional) */}
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background:radial-gradient(circle_at_50%_50%,_#000_0,_transparent_60%)]" />

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left"
          >
            <h2 id="cta-heading" className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              {dict.secondaryCTA.title1}{' '}
              <span className="text-amber-700">{dict.secondaryCTA.title2}</span>
            </h2>
            <p className="mt-6 sm:mt-8 text-lg font-medium text-slate-700 leading-relaxed">
              {dict.secondaryCTA.description}
            </p>

            <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3 lg:justify-start">
              <a
                href="tel:17864509223"
                className="rounded-md bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-amber-700 active:bg-amber-800 transition"
              >
                {dict.secondaryCTA.button}
              </a>
              <a
                href="mailto:yleecruz@gmail.com"
                className="rounded-md border border-slate-900/15 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-900/5 transition"
              >
                Email Us
              </a>
            </div>
          </motion.div>

          {/* Imagen */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative mt-12 w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem]"
          >
            <img
              alt="Valelee LLC — Next.js, Express y Shopify"
              src="/call2.png"
              width={1824}
              height={1080}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover rounded-md shadow-lg ring-1 ring-slate-900/10"
            />
            {/* Vignette sutil para integración con el fondo */}
            <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-tr from-black/5 via-transparent to-black/0" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
