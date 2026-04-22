'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '@/lib/LanguageContext';
import { t } from '@/lib/translations';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, toggle } = useLang();
  const T = t[lang];
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '/', label: lang === 'en' ? 'Home' : 'Ana Sayfa' },
    { href: '/products', label: T.nav.products },
    { href: '/about', label: T.nav.about },
    { href: '/contact', label: T.nav.contact },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
        background: scrolled ? 'rgba(13,13,13,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo.png"
            alt="Martek Marble"
            style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden-mobile">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.78rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: pathname === l.href ? 'var(--gold)' : 'var(--cream-dim)',
                textDecoration: 'none',
                transition: 'color 0.25s',
                position: 'relative',
              }}
              className="nav-link"
            >
              {l.label}
            </Link>
          ))}

          <button
            onClick={toggle}
            className="lang-btn"
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              color: 'var(--gold)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              padding: '0.35rem 0.8rem',
              cursor: 'pointer',
              transition: 'border-color 0.25s, background 0.25s',
            }}
          >
            {lang === 'en' ? 'TR' : 'EN'}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', flexDirection: 'column', gap: '5px', padding: '4px' }}
          className="show-mobile"
          aria-label="Menu"
        >
          <span style={{ display: 'block', width: '24px', height: '1px', background: open ? 'var(--gold)' : 'var(--cream)', transition: 'transform 0.3s, opacity 0.3s', transform: open ? 'rotate(45deg) translateY(6px)' : 'none' }} />
          <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--cream)', opacity: open ? 0 : 1, transition: 'opacity 0.3s' }} />
          <span style={{ display: 'block', width: '24px', height: '1px', background: open ? 'var(--gold)' : 'var(--cream)', transition: 'transform 0.3s, opacity 0.3s', transform: open ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background: 'rgba(13,13,13,0.98)', borderTop: '1px solid var(--border)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: pathname === l.href ? 'var(--gold)' : 'var(--cream)', textDecoration: 'none' }}
            >
              {l.label}
            </Link>
          ))}
          <button onClick={toggle} style={{ alignSelf: 'flex-start', background: 'none', border: '1px solid var(--border)', color: 'var(--gold)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', padding: '0.35rem 0.75rem', cursor: 'pointer' }}>
            {lang === 'en' ? 'TR' : 'EN'}
          </button>
        </div>
      )}

      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .nav-link:hover { color: var(--cream) !important; }
        .lang-btn:hover { border-color: var(--gold) !important; background: rgba(240,30,30,0.08) !important; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
