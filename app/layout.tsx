import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartProvider } from '@/providers/cart-provider';
import { Toaster } from '@/components/ui/sonner';
import { GsapProvider } from '@/providers/gsap-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Elegance | Women\'s Fashion Boutique',
  description: 'Discover our curated collection of women\'s clothing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <GsapProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster position="top-center" />
          </GsapProvider>
        </CartProvider>
      </body>
    </html>
  );
}