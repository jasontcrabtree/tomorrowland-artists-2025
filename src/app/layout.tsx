import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Lato } from 'next/font/google';

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
});

import './globals.css';

export const metadata: Metadata = {
  title: 'Tomorrowland Artists 2025',
  description:
    'Try new artists and enjoy old favourites. 585 artists from the Tomorrowland lineup, ready to explore and enjoy.',
  openGraph: {
    type: 'website',
    url: 'https://tomorrowland-artists.vercel.app/',
    title: 'Tomorrowland Artists 2025',
    description:
      'Try new artists and enjoy old favourites. 585 artists from the Tomorrowland lineup, ready to explore and enjoy.',
    images: [
      {
        url: 'https://tomorrowland-artists.vercel.app/tml-artists-social-img.png',
        width: 1200,
        height: 630,
        alt: 'Tomorrowland Artists 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tomorrowland Artists 2025',
    description:
      'Try new artists and enjoy old favourites. 585 artists from the Tomorrowland lineup, ready to explore and enjoy.',
    images: [
      'https://tomorrowland-artists.vercel.app/tml-artists-social-img.png',
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lato.className}>
      <Analytics />
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
