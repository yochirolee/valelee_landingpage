'use client'

import Link from "next/link";
import React from "react";
import Image from "next/image";

const siteDetails = {
  siteName: "Valelee LLC",
  logoSrc: "/valelee2.png",
};

const footerDetails = {
  Address: "Fontainebleau Blvd, Miami, FL",
  email: "yleecruz@gmail.com",
  telephone: "+1 (786) 450-9223",
  socials: {
    //Facebook: "https://www.facebook.com/tu-pagina",
    //Instagram: "https://www.instagram.com/tu-cuenta",
    //LinkedIn: "https://www.linkedin.com/company/valelee",
  } as Record<string, string>,
};

const getPlatformIconByName = (name: string) => {
  const base = "w-6 h-6 fill-current text-slate-600 hover:text-amber-700 transition-colors";
  const icons: Record<string, React.ReactNode> = {
    Facebook: (
      <svg className={base} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987H7.898v-2.89h2.54v-2.2c0-2.507 1.492-3.89 3.778-3.89 1.094 0 2.238.196 2.238.196v2.46h-1.26c-1.243 0-1.63.77-1.63 1.562v1.872h2.773l-.443 2.89h-2.33v6.987C18.343 21.126 22 17 22 12" />
      </svg>
    ),
    Instagram: (
      <svg className={base} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 1a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
      </svg>
    ),
    LinkedIn: (
      <svg className={base} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8 8.5h3.82v1.98h.06c.53-1 1.82-2.06 3.75-2.06 4.01 0 4.75 2.64 4.75 6.06V23h-4v-6.5c0-1.55-.03-3.54-2.16-3.54-2.16 0-2.49 1.68-2.49 3.42V23h-4V8.5z" />
      </svg>
    ),
  };
  return icons[name] || null;
};

type NavLinks = { [key: string]: string };

type FooterDict = {
  subheading: string;
  quickLinksTitle: string;
  addressLabel: string;
  hoursLabel: string;
  emailLabel: string;
  phoneLabel: string;
  contactTitle: string;
  copyright: string;
  hours: string;
};

type Dict = {
  footer: FooterDict;
  nav: NavLinks;
};

const navUrls: Record<string, string> = {
  work: "#gallery",
  services: "#services",
  about: "#about",
  faq: "#faq",
  contact: "#contact",
};

const Footer: React.FC<{ dict: Dict }> = ({ dict }) => {
  const f = dict.footer;
  const nav = dict.nav;
  const telHref = `tel:${footerDetails.telephone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="bg-[#FDFBF7] text-slate-900 py-12 px-6" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Website footer</h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo y subtítulo */}
        <div>
          <Link href="/" className="flex items-center gap-4" aria-label={`${siteDetails.siteName} — Home`}>
            <Image
              src={siteDetails.logoSrc}
              alt={`${siteDetails.siteName} Logo`}
              width={64}
              height={64}
              className="object-contain"
              priority={false}
            />
            <span className="text-xl font-semibold text-slate-900">{siteDetails.siteName}</span>
          </Link>
          <p className="mt-3 text-base font-light max-w-sm text-slate-700">
            {f.subheading}
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Footer quick links">
          <h3 className="text-xl font-semibold mb-5 text-slate-900">{f.quickLinksTitle}</h3>
          <ul className="flex flex-col gap-3 font-light max-w-sm text-slate-700">
            {Object.keys(nav).map((key) => (
              <li key={key}>
                <Link
                  href={navUrls[key] || "#"}
                  className="hover:text-amber-700 transition-colors duration-200"
                >
                  {nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contacto y redes */}
        <div id="contact">
          <h3 className="text-xl font-semibold mb-5 text-slate-900">{f.contactTitle}</h3>

          <div className="flex flex-col gap-3 text-lg font-light max-w-sm text-slate-700">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(footerDetails.Address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-700 transition-colors text-base"
            >
              {f.addressLabel}: {footerDetails.Address}
            </a>

            <span className="text-base">
              {f.hoursLabel}: {f.hours}
            </span>

            <a href={`mailto:${footerDetails.email}`} className="hover:text-amber-700 transition-colors text-base">
              {f.emailLabel}: {footerDetails.email}
            </a>

            <a href={telHref} className="hover:text-amber-700 transition-colors text-base">
              {f.phoneLabel}: {footerDetails.telephone}
            </a>
          </div>

          {/* Redes */}
          {Object.keys(footerDetails.socials).length > 0 && (
            <div className="mt-6 flex items-center gap-6">
              {Object.entries(footerDetails.socials).map(([platformName, url]) => (
                <Link
                  key={platformName}
                  href={url}
                  aria-label={platformName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                >
                  {getPlatformIconByName(platformName)}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-slate-500 leading-relaxed">
        &copy; {new Date().getFullYear()} {siteDetails.siteName}. {f.copyright}
      </div>
    </footer>
  );
};

export default Footer;
