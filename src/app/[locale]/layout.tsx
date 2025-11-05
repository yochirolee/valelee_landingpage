import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  const baseCommon = {
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
    themeColor: "#ffffff",
  } satisfies Partial<Metadata>;

  const metadataByLocale: Record<"es" | "en", Metadata> = {
    es: {
      title: "Sitios y Tiendas Online en Miami | Valelee LLC",
      description:
        "Desarrollamos sitios web y tiendas Shopify rápidos y listos para SEO con Next.js, Tailwind, Express y PostgreSQL. Consultoría y soporte en Miami, alcance global.",
      keywords: [
        "sitios web Miami",
        "tiendas online Shopify Miami",
        "Next.js Tailwind",
        "Express APIs",
        "desarrollo web Miami",
        "SEO técnico",
      ],
      alternates: { languages: { en: "/en" } },
      openGraph: {
        title: "Sitios y Tiendas Online en Miami | Valelee LLC",
        description:
          "Webs y e-commerce con Next.js, Tailwind, Express y Shopify. Rendimiento, SEO y mantenibilidad.",
        url: "https://valeleyoursite.com/",
        siteName: "Valelee LLC",
        images: [{ url: "/og.jpg", width: 1200, height: 630 }],
        locale: "es_ES",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Sitios y Tiendas Online en Miami | Valelee LLC",
        description: "Webs y e-commerce con Next.js, Tailwind, Express y Shopify.",
        images: ["/og.jpg"],
      },
      ...baseCommon,
    },
    en: {
      title: "Next.js & Shopify Websites in Miami | Valelee LLC",
      description:
        "We build fast, SEO-ready websites and Shopify stores with Next.js, Tailwind, Express, and PostgreSQL. Based in Miami, serving clients worldwide.",
      keywords: [
        "next.js websites miami",
        "shopify stores miami",
        "tailwind css",
        "express api",
        "web development miami",
        "technical seo",
      ],
      alternates: { languages: { es: "/" } },
      openGraph: {
        title: "Next.js & Shopify Websites in Miami | Valelee LLC",
        description:
          "Fast, secure, SEO-ready websites and online stores. Next.js, Tailwind, Express, Shopify.",
        url: "https://valeleyoursite.com/en",
        siteName: "Valelee LLC",
        images: [{ url: "/og.jpg", width: 1200, height: 630 }],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Next.js & Shopify Websites in Miami | Valelee LLC",
        description: "Next.js, Tailwind, Express, Shopify — performance and clarity.",
        images: ["/og.jpg"],
      },
      ...baseCommon,
    },
  };

  return metadataByLocale[locale as "es" | "en"];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <head>
        {/* Next inyecta los íconos y el manifest desde generateMetadata */}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
