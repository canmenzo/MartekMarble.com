'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { t } from '@/lib/translations';

const linkStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: 'var(--cream-dim)',
  textDecoration: 'none',
  transition: 'color 0.2s',
};

export default function Footer() {
  const { lang } = useLang();
  const T = t[lang];

  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-dark)', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
        {/* Brand */}
        <div>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--cream)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Martek<span style={{ color: 'var(--gold)' }}> Marble</span>
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--cream-dim)', lineHeight: 1.7 }}>{T.footer.tagline}</p>
        </div>

        {/* Products */}
        <div>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>{T.nav.products}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { label: lang === 'en' ? 'White Marble' : 'Beyaz Mermer', filter: 1 },
              { label: lang === 'en' ? 'Beige Marble' : 'Bej Mermer', filter: 2 },
              { label: lang === 'en' ? 'Travertine' : 'Traverten', filter: 3 },
              { label: lang === 'en' ? 'Slabs' : 'Levhalar', filter: 4 },
            ].map(item => (
              <Link
                key={item.filter}
                href={`/products?f=${item.filter}`}
                className="footer-link"
                style={linkStyle}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>{T.contact_page.info_heading}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <a href="mailto:info@martekmarble.com" className="footer-link" style={linkStyle}>
              {T.contact_page.email}
            </a>
            <a href="tel:+902327988166" className="footer-link" style={linkStyle}>
              {T.contact_page.phone}
            </a>
          </div>
        </div>

        {/* Locations */}
        <div>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
            {lang === 'en' ? 'Locations' : 'Lokasyonlar'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <a href="https://www.google.com/maps/search/Izmir+Port+Turkey" target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>
              İzmir
            </a>
            <a href="https://www.google.com/maps/search/Mersin+Port+Turkey" target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>
              Mersin
            </a>
            <a href="https://www.google.com/maps/search/Gemlik+Port+Bursa+Turkey" target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>
              Gemlik
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '2rem auto 0', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--cream-dim)' }}>{T.footer.rights}</p>
      </div>

      <style>{`
        .footer-link:hover { color: var(--cream) !important; }
      `}</style>
    </footer>
  );
}
