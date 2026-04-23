import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Operations | Martek Marble — Block, Slab & Cut-Size',
  description: 'See Martek Marble\'s operations: marble block extraction, cut-size production, and worldwide shipping from Turkey\'s major ports.',
  openGraph: {
    title: 'Operations | Martek Marble',
    description: 'Marble blocks, slabs and cut-size products — from quarry to port.',
    url: 'https://martekmarble.com/operations',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
