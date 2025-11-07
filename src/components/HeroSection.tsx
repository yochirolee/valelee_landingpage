'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import LanguageSwitcher from './LanguageSwitcher'
import Link from 'next/link'

type NavDict = { work: string; services: string; about: string; faq: string; contact: string }
type HeroDict = { headline: string; subtext: string; quote: string; view: string }
type Dict = { nav: NavDict; hero: HeroDict }

export default function HeroSection({ dict }: { dict: Dict }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const textControls = useAnimation()
  const linksControls = useAnimation()

  // Banner solo arriba
  const [isAtTop, setIsAtTop] = useState(true)

  // Refs para medir alturas reales
  const bannerRef = useRef<HTMLDivElement | null>(null)
  const navRef = useRef<HTMLElement | null>(null)
  const [bannerH, setBannerH] = useState(0)
  const [navH, setNavH] = useState(0)

  const navigation = [
    { name: dict.nav.work, href: '#gallery' },
    { name: dict.nav.services, href: '#services' },
    { name: dict.nav.about, href: '#about' },
    { name: dict.nav.faq, href: '#faq' },
    { name: dict.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    textControls.start({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } })
    linksControls.start({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } })
  }, [textControls, linksControls])

  // Mostrar banner solo cuando estás bien arriba
  useEffect(() => {
    const onScroll = () => setIsAtTop((window.scrollY || 0) < 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Medir alturas de banner y nav (para el spacer)
  useEffect(() => {
    const measure = () => {
      if (navRef.current) setNavH(navRef.current.offsetHeight)
      if (bannerRef.current) setBannerH(bannerRef.current.offsetHeight)
    }
    measure()
    const onResize = () => requestAnimationFrame(measure)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [isAtTop])

  // Offset total que empuja el contenido
  const headerOffset = navH + (isAtTop ? bannerH : 0)

  return (
    <div className="bg-[#F6F3EE]">
      {/* HEADER FIJO */}
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Banner: aparece solo arriba, colapsa altura al ocultar */}
        <AnimatePresence initial={false}>
          {isAtTop && (
            <motion.div
              key="top-banner"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div
                ref={bannerRef}
                className="w-full bg-[#E4DFB5] text-[#0F3557] text-center text-[13px] sm:text-sm font-medium py-2"
              >
                ¡Bienvenidos a Valelee!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav: siempre arriba, sube a ocupar el lugar del banner */}
        <nav
          ref={navRef}
          className="flex items-center justify-between px-6 py-3 lg:px-8
                     bg-[#F6F3EE] backdrop-blur-sm border-b border-slate-900/10"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" aria-label="Valelee LLC Home" className="-m-1.5 p-1.5">
              <motion.img
                src="/valelee2.png"
                alt="Valelee LLC — Web & Ecommerce"
                className="h-10 sm:h-12 lg:h-14 w-auto"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
            </Link>
          </div>

          {/* Botón móvil + switcher */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-900"
              aria-label="Open menu"
            >
              <Bars3Icon className="h-7 w-7" aria-hidden="true" />
            </button>
            <LanguageSwitcher />
          </div>

          {/* Links desktop */}
          <div className="hidden lg:flex lg:gap-x-10">
            {navigation.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-[15px] font-semibold text-slate-900 hover:text-slate-950 transition-colors"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
              >
                {item.name}
              </motion.a>
            ))}
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Menú móvil */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-[100] lg:hidden">
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          <DialogPanel className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-7 sm:p-8 shadow-2xl focus:outline-none overflow-y-auto">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                aria-label="Valelee LLC Home"
                className="-m-1.5 p-1.5 shrink-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img src="/valelee2.png" alt="Valelee LLC — Web & Ecommerce" className="h-12 sm:h-14 w-auto" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-slate-800"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-7 w-7" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-100"
                >
                  {item.name}
                </a>
              ))}
              <a href="tel:17864509223" className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-100">
                {dict.hero.quote}
              </a>
              <a href="mailto:yleecruz@gmail.com" className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-100">
                yleecruz@gmail.com
              </a>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Spacer dinámico para que el contenido no “salte” debajo del header */}
      <div
        style={{ height: `${headerOffset}px` }}
        aria-hidden="true"
        className="bg-[#F6F3EE]"
      />

      {/* === HERO === */}
      <main className="relative isolate overflow-hidden pt-0">
        <section className="bg-[#F6F3EE]">
          {/* Aire para el header fijo */}
          <div className="pt-1 sm:pt-1 lg:pt-1">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">

              {/* CARD COMBINADO */}
              <div className="overflow-hidden rounded-2xl ring-1 ring-slate-900/10 shadow-xl bg-[#E4DFB5]">
                {/* grid asimétrico: imagen más ancha que el texto */}
                <div className="grid gap-0 lg:grid-cols-[1fr_1.59fr]">

                  {/* LADO TEXTO (más compacto) */}
                  <div className="p-6 sm:p-8 lg:p-10 flex items-center">
                    <div className="w-full max-w-xl">
                      <h1 className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
                        {dict.hero.headline}
                      </h1>
                      <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl text-slate-700">
                        {dict.hero.subtext}
                      </p>
                      <div className="mt-6 sm:mt-8">
                        <a
                          href="tel:17864509223"
                          className="inline-flex items-center rounded-md bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
                        >
                          {dict.hero.quote}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* LADO IMAGEN (más grande que el texto) */}
                  <div className="relative">
                    {/* Alturas mayores en desktop para que “gane” presencia */}
                    <div className="h-[280px] sm:h-[340px] md:h-[420px] lg:h-[520px] xl:h-[580px]">
                      <img
                        src="/hero_marketing_digital.webp"
                        alt="Valelee — websites & ecommerce"
                        className="h-full w-full object-cover"
                        style={{ objectPosition: '40% 60%' }}
                        loading="eager"
                      />
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
