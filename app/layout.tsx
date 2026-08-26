import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../src/index.css';
import { VisitorTracker } from '@/src/components/VisitorTracker';

export const metadata: Metadata = {
  title: 'Krikya Official Site | Trusted Online Gaming & Sportsbook Bangladesh',
  description:
    'Premier Online Gaming and Sportsbook Platform in Bangladesh. Deshi Krikya, Beshi Joy!',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Teko:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#f2f4f7] text-[#333333] font-sans antialiased selection:bg-[#ff5a00] selection:text-white">
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
