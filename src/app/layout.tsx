import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppWrapper } from '@/helpers/context';
import Script from 'next/script';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jobly',
  description: 'Job Application Page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppWrapper>
        <body className="inter.className" suppressHydrationWarning={true}>
          {children}
        </body>
      </AppWrapper>
    </html>
  );
}
