import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Tomorrowland Artists 2025',
  description: 'Website made by Jason Crabtree',
  icons: [{ rel: 'icon', url: '/favicon.svg' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
