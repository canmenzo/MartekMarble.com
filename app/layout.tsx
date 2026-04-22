import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Martek Marble | Premium Turkish Natural Stone',
  description: 'Martek Marble Ltd. Co. exports premium marble, travertine, and limestone from Turkey\'s finest quarries through İzmir, Mersin, and Gemlik ports since 2003.',
  keywords: 'marble, travertine, Turkish marble, natural stone, export, Bursa Beige, Crema Soho, Pearl Travertine, Rosalia Marble',
  openGraph: {
    title: 'Martek Marble | Premium Turkish Natural Stone',
    description: 'Exporting Turkey\'s finest natural stone since 2003.',
    url: 'https://martekmarble.com',
    siteName: 'Martek Marble',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
