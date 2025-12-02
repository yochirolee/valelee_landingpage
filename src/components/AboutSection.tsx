'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

type Stat = { name: string; value: string }
type About = {
  title: string
  description: string
  description2: string
  description3: string
  stats: Stat[]
}
type Dict = { about: About }

export default function AboutSection({ dict }: { dict: Dict }) {
  const { about } = dict

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#F6F3EE] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* GRID: izquierda (foto redonda grande) / derecha (texto y stats) */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* IZQUIERDA: Imagen redonda grande que ocupa toda la columna */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <div className="relative">
              {/* Tamaños responsivos para que la imagen “llene” la izquierda */}
              <div className="relative w-56 h-56 sm:w-78 sm:h-78 md:w-80 md:h-80 lg:w-[26rem] lg:h-[26rem] xl:w-[28rem] xl:h-[28rem]">
                <Image
                  src="/SEO_webpage.webp"
                  alt="Valelee — websites & ecommerce"
                  fill
                  sizes="(max-width: 640px) 14rem, (max-width: 768px) 18rem, (max-width: 1024px) 20rem, 28rem"
                  className="rounded-full object-cover object-[78%_center] ring-8 ring-white shadow-2xl"
                  priority={false}
                />
              </div>
            </div>
          </motion.div>

          {/* DERECHA: Título → Descripción → Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.05 }}
            className="lg:col-span-7"
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              {about.title}
            </h2>

            <p className="mt-6 sm:mt-8 text-slate-700 sm:text-xl leading-relaxed">
              {about.description}
              <span className="font-semibold text-slate-900"> {about.description2}</span>
              {` ${about.description3}`}
            </p>

            {/* Stats debajo del texto */}
            <dl
              className="mt-10 grid grid-cols-2 gap-6 sm:gap-6 md:grid-cols-4"
              aria-label="Key results and experience"
            >
              {about.stats.map((stat) => (
                <div
                  key={stat.name}
                  className="rounded-2xl bg-white px-5 py-6 shadow-md ring-1 ring-slate-900/10"
                >
                  <dd className="text-1xl sm:text-1xl font-extrabold tracking-tight text-slate-900">
                    {stat.value}
                  </dd>
                  <dt className="mt-2 text-sm sm:text-base font-medium text-slate-600">
                    {stat.name}
                  </dt>
                </div>
              ))}
            </dl>

            {/* CTA opcional, manteniendo tu acento ámbar */}
            <div className="mt-10 sm:mt-12">
              <a
                href="tel:17864509223"
                className="inline-flex items-center rounded-xl px-5 py-3 text-sm font-semibold bg-[#E4DFB5] backdrop-blur-md 
                      shadow-md border border-white/50 
                      hover:bg-amber-700/40 transition-all
                      text-slate-900"
              >
                Let&apos;s talk now +1 (786) 450-9223
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
