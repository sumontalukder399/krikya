import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../src/index.css';
import { TenantProvider } from '@/src/platform/tenant';
import { getTenant } from '@/src/platform/server-tenant';

export async function generateMetadata(): Promise<Metadata> {
  const tenant = await getTenant();
  const icon = tenant.faviconUrl || '/icon.svg';
  return {
    title: `${tenant.name} | Online Gaming & Sportsbook Bangladesh`,
    description: `Online gaming and sportsbook platform in Bangladesh. Play on ${tenant.name}.`,
    icons: { icon: [{ url: icon }], shortcut: icon },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const tenant = await getTenant();
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
        <TenantProvider tenant={tenant}>{children}</TenantProvider>
      </body>
    </html>
  );
}
