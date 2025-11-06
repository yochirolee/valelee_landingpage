import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = "https://valelee.com";
const ORG_NAME = "Valelee LLC";
const LOGO_URL = "/valelee2.png"; // en /public
const OG_IMAGE = "/og.jpg";       // en /public (1200x630 recomendado)

/* ==== Viewport (mueve themeColor aquí para evitar warning) ==== */
export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/* ==== Metadata por locale, fuerte en SEO ==== */
export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const isES = locale === "es";
  const langPath = isES ? "" : "/en";
  const url = `${SITE_URL}${langPath}`;

  const baseCommon: Partial<Metadata> = {
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon.ico" },
      ],
      apple: [{ url: "/favicon-180x180.png", sizes: "180x180", type: "image/png" }],
      other: [{ rel: "mask-icon", url: "/maskable-icon-512.png", color: "#0078A0" }],
    },
    manifest: "/site.webmanifest",
    // themeColor se maneja en `viewport`
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };

  if (isES) {
    return {
      title: "Tiendas Online, Shopify y Sitios Web en Miami | Valelee LLC",
      description:
        "Creamos tiendas online Shopify, páginas web y landing pages rápidas, optimizadas para SEO y conversiones. Next.js, Tailwind, Express y PostgreSQL. Soporte en Miami y alcance global.",
      keywords: [
        "tiendas online",
        "tiendas shopify",
        "páginas web",
        "sitios web",
        "landing page",
        "diseño web miami",
        "desarrollo web miami",
        "seo técnico",
        "next.js",
        "tailwind css",
        "express api",
        "ecommerce miami",
      ],
      alternates: {
        canonical: url,
        languages: { en: "/en" },
      },
      openGraph: {
        title: "Tiendas Online, Shopify y Sitios Web en Miami | Valelee LLC",
        description:
          "E-commerce en Shopify y sitios web con Next.js. Rendimiento, SEO y UX para vender más.",
        url,
        siteName: ORG_NAME,
        images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Valelee — Web & Ecommerce" }],
        locale: "es_ES",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Tiendas Online, Shopify y Sitios Web en Miami | Valelee LLC",
        description: "E-commerce en Shopify y sitios web optimizados para SEO y conversiones.",
        images: [OG_IMAGE],
      },
      ...baseCommon,
    };
  }

  return {
    title: "Shopify Stores, Landing Pages & Websites in Miami | Valelee LLC",
    description:
      "We build Shopify stores, high-converting landing pages, and SEO-ready websites with Next.js, Tailwind, Express, and PostgreSQL. Miami-based, serving clients worldwide.",
    keywords: [
      "shopify stores",
      "online stores",
      "websites",
      "landing pages",
      "web design miami",
      "web development miami",
      "technical seo",
      "next.js",
      "tailwind css",
      "express api",
      "ecommerce miami",
      "seo optimization",
    ],
    alternates: {
      canonical: url,
      languages: { es: "/" },
    },
    openGraph: {
      title: "Shopify Stores, Landing Pages & Websites in Miami | Valelee LLC",
      description:
        "Fast, secure, SEO-ready e-commerce and websites. Next.js, Tailwind, Express, Shopify.",
      url,
      siteName: ORG_NAME,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Valelee — Web & Ecommerce" }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Shopify Stores, Landing Pages & Websites in Miami | Valelee LLC",
      description: "Next.js, Shopify, SEO & performance for growth.",
      images: [OG_IMAGE],
    },
    ...baseCommon,
  };
}

/* ==== Layout con JSON-LD (Organization + WebSite) ==== */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isES = locale === "es";
  const langPath = isES ? "" : "/en";
  const url = `${SITE_URL}${langPath}`;

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url,
    logo: `${SITE_URL}${LOGO_URL}`,
    sameAs: [
      "https://www.instagram.com/tu-cuenta",
      "https://www.linkedin.com/company/valelee",
      "https://www.facebook.com/tu-pagina",
    ],
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORG_NAME,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang={locale}>
      <head>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        {/* Meta MS + compat */}
        <meta name="msapplication-TileColor" content="#ffffff" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
