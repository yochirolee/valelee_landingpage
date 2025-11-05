'use client'

import { usePathname, useRouter } from 'next/navigation'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const currentLocale = pathname.split('/')[1] || 'en'
  const otherLocale = currentLocale === 'en' ? 'es' : 'en'

  const handleChange = () => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${otherLocale}`)
    router.push(newPath)
  }

  return (
    <button
      onClick={handleChange}
      className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-900 hover:text-slate-900 lg:px-0 lg:py-0 lg:rounded-none lg:bg-transparent lg:text-slate-900 lg:hover:bg-transparent lg:hover:text-slate-900"
    >
      {otherLocale.toUpperCase()}
    </button>
  )
}
