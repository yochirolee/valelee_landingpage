'use client'

import React from 'react'

type OfferItem = {
  src: string
  alt: string
  title?: string
  href?: string
  objectPosition?: string
  aspect?: string            // ejemplo: '10 / 16', '3 / 4'
  labelTone?: 'light' | 'dark'
}

type OfferSectionDict = { headline: string; headline2: string }
type Dict = { offerSection: OfferSectionDict }

// Asegúrate de tener estos archivos en /public (p.ej. /public/rapidvia.webp)
const images: OfferItem[] = [
  {
    src: '/Henna.webp',
    alt: 'Henna Miami by Marlen Martin — Shopify Store',
    title: 'Henna Miami by Marlen Martin Online Store',
    href: 'https://henna-miami-by-marlen-martin.myshopify.com/',
    objectPosition: '35% center',
    aspect: '10 / 16',
    labelTone: 'dark'
  },
  {
    src: '/Shopctenvios.webp',
    alt: 'CTEnvios Shop — Online Store',
    title: 'CTEnvios Online Store',
    href: 'https://shop.ctenvios.com/es',
    objectPosition: 'center top',
    aspect: '10 / 16',
    labelTone: 'light'
  },
  {
    src: '/Rapidviaservices6.webp',
    alt: 'RapidVia Services — Website',
    title: 'RapidVia Services Landing Page',
    href: 'https://rapidviaservicesllc.com/',
    objectPosition: 'center top',
    aspect: '10 / 16',
    labelTone: 'dark'
  },
  {
    src: '/CTEnvios.webp',
    alt: 'CTEnvios — Corporate Site',
    title: 'CTEnvios Landing Page',
    href: 'https://ctenvios.com/',
    objectPosition: 'center top',
    aspect: '10 / 16',
    labelTone: 'light'
  },
  {
    src: '/Nika.webp',
    alt: 'Nika LLC — Website',
    title: 'Nika LLC Landing Page',
    href: 'https://www.nika-llc.com/en',
    objectPosition: 'center center',
    aspect: '10 / 16',
    labelTone: 'dark'
  },
  {
    src: '/Caribetravelexpress.webp',
    alt: 'Caribe Travel Express — Services Website',
    title: 'Caribe Travel Express Landing Page',
    href: 'https://caribetravelexpressandservices.com/',
    objectPosition: 'center top',
    aspect: '10 / 16',
    labelTone: 'light'
  }
]

export default function OfferSection({ dict }: { dict: Dict }) {
  return (
    <section id="gallery" className="bg-[#F6F3EE] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
          {dict.offerSection.headline}{' '}
          <span className="text-slate-900">{dict.offerSection.headline2}</span>
        </h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {images.map((item, idx) => {
            const tone = 'bg-white text-slate-900'

            return (
              <a
                key={idx}
                href={item.href ?? '#'}
                target={item.href ? '_blank' : undefined}
                rel={item.href ? 'noopener noreferrer' : undefined}
                className="group block overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 hover:shadow-lg transition-shadow duration-300 bg-[#F7FBFF]"
                aria-label={item.title ?? item.alt}
              >
                {/* Contenedor con aspect-ratio por CSS (no Tailwind) */}
                <div
                  className="relative w-full"
                  style={{
                    aspectRatio: item.aspect ?? '10 / 16'
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: item.objectPosition ?? 'center center' }}
                  />
                  {/* Sombra superior suave */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/10 to-transparent" />
                </div>

                {item.title && (
                  <div className={`px-4 py-3 text-sm font-semibold ${tone}`}>
                    {item.title}
                  </div>
                )}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
