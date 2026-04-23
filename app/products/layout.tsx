import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | Martek Marble — Turkish Natural Stone',
  description: 'Browse our collection of 16 premium natural stones: white marble, beige marble, travertine, and slabs. Marmara White, Carrara White, Pearl Travertine, Denizli Travertine and more.',
  openGraph: {
    title: 'Products | Martek Marble',
    description: 'Premium Turkish marble, travertine and limestone available for export worldwide.',
    url: 'https://martekmarble.com/products',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
