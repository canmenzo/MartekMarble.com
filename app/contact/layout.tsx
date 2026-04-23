import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Martek Marble — Request a Quote',
  description: 'Get in touch with Martek Marble for quotes, samples, and shipping information. Email: info@martekmarble.com | Phone: +90 (232) 798-8166',
  openGraph: {
    title: 'Contact Martek Marble',
    description: 'Request a quote for premium Turkish natural stone. We export worldwide.',
    url: 'https://martekmarble.com/contact',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
