import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Martek Marble — 20+ Years of Turkish Stone Export',
  description: 'Since 2003, Martek Marble Ltd. Co. has been exporting premium Turkish natural stone worldwide through İzmir, Mersin, Gemlik and Tekirdağ ports. Learn our story.',
  openGraph: {
    title: 'About Martek Marble',
    description: 'Over two decades exporting Turkey\'s finest marble and travertine to the world.',
    url: 'https://martekmarble.com/about',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
