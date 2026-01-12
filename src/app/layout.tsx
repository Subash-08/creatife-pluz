// app/layout.tsx (Root layout)
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Script from 'next/script';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
      <body className={`${inter.variable} bg-brand-dark text-white selection:bg-brand-primary selection:text-black`}>
        {/* Next.js Script handles injection correctly without manual <head> tags */}
        <Script
          src="https://upload-widget.cloudinary.com/global/all.js"
          strategy="afterInteractive"
        />
        <Providers>
          <SmoothScroll>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow relative z-10">
                {children}
              </main>
              <div className="relative z-10">
                <Footer />
              </div>
            </div>
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}