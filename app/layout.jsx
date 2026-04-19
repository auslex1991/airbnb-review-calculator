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
  metadataBase: new URL('https://your-domain.vercel.app'), // ← Update this with your actual Vercel URL
  openGraph: {
    title: 'Airbnb Review Calculator – How Many 5-Star Reviews Do You Need?',
    description:
      'Calculate exactly how many 5-star reviews you need to raise your Airbnb rating to your target score.',
    type: 'website',
    locale: 'en_US',
    // images: ['/og-image.png'], // Optional: add an OG image for social sharing
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
    canonical: 'https://your-domain.vercel.app', // ← Update this with your actual Vercel URL
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Structured data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
