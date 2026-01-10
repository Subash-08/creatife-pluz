// app/layout.tsx (Root layout)
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Creative Pluz - Digital Experience Agency',
  description: 'Premium creative agency specializing in branding, design, and digital experiences',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light"> {/* Changed from 'dark' to 'light' */}
      <body className={`${inter.className} bg-gray-50 text-gray-900`}> {/* Light theme colors */}
        {/* Next.js Script handles injection correctly without manual <head> tags */}
        <Script
          src="https://upload-widget.cloudinary.com/global/all.js"
          strategy="afterInteractive"
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}