'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Laptop,
  Store,
  Server,
  CreditCard,
  Globe,
  Rocket,
  SearchCheck
} from 'lucide-react'

type Service = {
  title: string
  description: string
}

type Dict = {
  socialProof: {
    title: string
    title2: string
    services: Service[]
  }
}

const cardVariants = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 18 },
  },
}

export default function OurServices({ dict }: { dict: Dict }) {
  const services = dict.socialProof.services

  // Íconos alineados a agencia web: Next.js sites, Shopify, Express APIs, Pagos, i18n/Markets, Lanzamiento, SEO
  const icons = [
    <Laptop key="laptop" className="h-6 w-6" aria-hidden="true" />,
    <Store key="store" className="h-6 w-6" aria-hidden="true" />,
    <Server key="server" className="h-6 w-6" aria-hidden="true" />,
    <CreditCard key="card" className="h-6 w-6" aria-hidden="true" />,
    <Globe key="globe" className="h-6 w-6" aria-hidden="true" />,
    <Rocket key="rocket" className="h-6 w-6" aria-hidden="true" />,
    <SearchCheck key="seo" className="h-6 w-6" aria-hidden="true" />,
  ]

  return (
    <section id="services" className="bg-[#FDFBF7]" aria-labelledby="services-heading">
      <div className="container mx-auto px-6 py-10">
        <h2
          id="services-heading"
          className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] capitalize"
        >
          {dict.socialProof.title}{' '}
          <span className="text-amber-700">{dict.socialProof.title2}</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-12">
          {services.map((service, index) => (
            <motion.article
              key={index}
              className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md hover:shadow-lg transition"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              aria-label={service.title}
            >
              <span className="inline-flex rounded-full bg-white/70 p-3 text-[#0078A0] ring-1 ring-white/60">
                {icons[index % icons.length]}
              </span>
              <h3 className="mt-3 text-lg md:text-xl font-semibold text-[#374151]">
                {service.title}
              </h3>
              <p className="mt-2 text-[#4B5563] leading-relaxed">{service.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
