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
    <section id="about" className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* Background image con next/image */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/Leidy3.jpg"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E4DFB5]/30 to-[#E4DFB5]/50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {about.title}
          </h2>

          <p className="mt-8 text-left text-white sm:text-xl leading-relaxed">
            {about.description}
            <span className="font-semibold text-white"> {about.description2}</span>
            {` ${about.description3}`}
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-12 sm:mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
          <dl className="grid grid-cols-2 gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4" aria-label="Key results and experience">
            {about.stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse gap-1">
                <dt className="text-base font-medium text-slate-100">{stat.name}</dt>
                <dd className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Contact band */}
        <div className="mt-10 sm:mt-14">
          <a
            href="tel:17864509223"
            className="ml-3 inline-flex items-center rounded-xl border border-white/70 bg-white/70 px-5 py-3 text-slate-600 font-semibold hover:bg-slate-100"
          >
            Let&apos;s talk now +1 (786) 450-9223
          </a>
        </div>
      </motion.div>
    </section>
  )
}
