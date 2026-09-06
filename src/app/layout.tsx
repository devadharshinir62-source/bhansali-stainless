import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { GTM_CONTAINER_ID } from '@/lib/analytics';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0a0e17',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Stainless Steel Flanges Supplier & Exporter | Bhansali Stainless',
  description:
    'Stainless steel flanges in grades 304, 316 and 316L for industrial applications. B2B supply and export support for Saudi Arabia, UAE and the Middle East.',
  keywords: [
    'Stainless Steel Flanges',
    'SS 304 Flanges',
    'SS 316 Flanges',
    'SS 316L Flanges',
    'ASME B16.5 Flanges',
    'Weld Neck Flange',
    'Slip On Flange',
    'Blind Flange',
    'Stainless Steel Flanges Exporter Saudi Arabia',
    'Flanges Supplier UAE Dubai',
    'Middle East Industrial Piping',
    'ASTM A182 Forged Flanges',
  ],
  authors: [{ name: 'Bhansali Stainless' }],
  creator: 'Bhansali Stainless',
  publisher: 'Bhansali Stainless',
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  metadataBase: new URL('https://www.bhansalistainless.com'),
  alternates: {
    canonical: 'https://www.bhansalistainless.com/products/stainless-steel-flanges',
  },
  openGraph: {
    title: 'Stainless Steel Flanges Supplier & Exporter | Bhansali Stainless',
    description:
      'Stainless steel flanges in grades 304, 316 and 316L for industrial applications. B2B supply and export support for Saudi Arabia, UAE and the Middle East.',
    url: 'https://www.bhansalistainless.com/products/stainless-steel-flanges',
    siteName: 'Bhansali Stainless',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stainless Steel Flanges Supplier & Exporter | Bhansali Stainless',
    description:
      'Stainless steel flanges in grades 304, 316 and 316L for industrial applications. B2B supply and export support for Saudi Arabia, UAE and the Middle East.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD Structured Data for B2B Product and Organization
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.bhansalistainless.com/#organization',
        name: 'Bhansali Stainless',
        url: 'https://www.bhansalistainless.com',
        logo: 'https://www.bhansalistainless.com/images/logo.png',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+91-22-6743-7890',
            contactType: 'sales',
            areaServed: ['SA', 'AE', 'OM', 'QA', 'KW', 'BH'],
            availableLanguage: ['English', 'Arabic', 'Hindi'],
          },
        ],
      },
      {
        '@type': 'Product',
        '@id': 'https://www.bhansalistainless.com/products/stainless-steel-flanges#product',
        name: 'Stainless Steel Flanges (ASTM A182 / ASME B16.5)',
        description:
          'Precision engineered stainless steel flanges in grades 304, 316, and 316L for industrial piping systems across Saudi Arabia, UAE, and the Middle East.',
        brand: {
          '@type': 'Brand',
          name: 'Bhansali Stainless',
        },
        material: 'Stainless Steel 304, 316, 316L',
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <head>
        {/* Google Tag Manager Container (loaded only when NEXT_PUBLIC_GTM_ID is configured) */}
        {GTM_CONTAINER_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`,
            }}
          />
        )}
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-sky-600 selection:text-white">
        {/* Google Tag Manager (noscript) */}
        {GTM_CONTAINER_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="gtm"
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
