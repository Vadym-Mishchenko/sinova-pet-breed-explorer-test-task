import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { default as NavigationLoader } from '@/components/NavigationLoader';
import { LoaderProvider } from '@/components/LoaderContext';
import { Suspense } from 'react';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pet Breed Explorer',
  description: 'Explore random breeds of cats and dogs with photos and detailed information',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body
      className={`min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <LoaderProvider>
        <NavigationLoader />
        <Suspense fallback={<NavigationLoader />}>{children}</Suspense>
      </LoaderProvider>
    </body>
  </html>
);

export default RootLayout;
