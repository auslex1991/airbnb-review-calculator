import './globals.css'

export const metadata = {
  title: 'Airbnb Review Calculator – How Many 5-Star Reviews Do You Need?',
  description:
    'Free tool for Airbnb hosts. Calculate exactly how many 5-star reviews you need to raise your average rating — from 4.90 to 4.91, or any target score.',
  keywords: [
    'airbnb review calculator',
    'airbnb 5 star reviews needed',
    'airbnb rating calculator',
    'how to increase airbnb rating',
    'airbnb host tools',
    'airbnb average rating',
  ],
  authors: [{ name: 'Airbnb Review Calculator' }],
  metadataBase: new URL('https://airbnb-review-calculator.vercel.app'),
  openGraph: {
    title: 'Airbnb Review Calculator – How Many 5-Star Reviews Do You Need?',
    description:
      'Calculate exactly how many 5-star reviews you need to raise your Airbnb rating to your target score.',
    type: 'website',
    locale: 'en_US',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airbnb Review Calculator',
    description:
      'Calculate exactly how many 5-star reviews you need to raise your Airbnb rating.',
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
  alternates: {
    canonical: 'https://airbnb-review-calculator.vercel.app',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Airbnb Review Calculator',
  description:
    'Calculate how many 5-star reviews you need to raise your Airbnb average rating.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  )
}
