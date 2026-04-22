'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '@/lib/LanguageContext';
import { t, langFlags, langLabels } from '@/lib/translations';
import type { Lang } from '@/lib/translations';

const langs: Lang[] = ['en', 'tr', 'es', 'pt'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang } = useLang();
  const T = t[lang];
  const pathname = usePathname();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const links = [
    { href: '/', label: T.nav.home },
    { href: '/products', label: T.nav.products },
    { href: '/operations', label: T.nav.operations },
    { href: '/about', label: T.nav.about },
    { href: '/contact', label: T.nav.contact },
  ];

  function handleMobileNav(href: string) {
    setOpen(false);
    // scroll to top when navigating from mobile menu
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  }

  function handleLangSelect(l: Lang) {
    setLang(l);
    setLangOpen(false);
  }

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
                fontFamily: "'Raleway', sans-serif",
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

          {/* Language dropdown */}
          <div ref={langRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="lang-btn"
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                color: 'var(--gold)',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                padding: '0.35rem 0.8rem',
                cursor: 'pointer',
                transition: 'border-color 0.25s, background 0.25s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://flagcdn.com/w40/${langFlags[lang]}.png`} alt="" style={{ width: '18px', height: '13px', objectFit: 'cover', borderRadius: '2px' }} />
              {langLabels[lang]}
              <span style={{ fontSize: '0.55rem', marginLeft: '0.15rem', opacity: 0.6, transition: 'transform 0.3s', transform: langOpen ? 'rotate(180deg)' : 'none' }}>&#9660;</span>
            </button>

            {/* Dropdown */}
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '0.5rem',
                background: 'rgba(13,13,13,0.97)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                flexDirection: 'column',
                minWidth: '120px',
                overflow: 'hidden',
                opacity: langOpen ? 1 : 0,
                visibility: langOpen ? 'visible' : 'hidden',
                transform: langOpen ? 'translateY(0)' : 'translateY(-8px)',
                transition: 'opacity 0.3s, transform 0.3s, visibility 0.3s',
              }}
            >
              {langs.filter(l => l !== lang).map(l => (
                <button
                  key={l}
                  onClick={() => handleLangSelect(l)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--cream-dim)',
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    padding: '0.6rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'background 0.2s, color 0.2s',
                    textAlign: 'left',
                  }}
                  className="lang-option"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://flagcdn.com/w40/${langFlags[l]}.png`} alt="" style={{ width: '18px', height: '13px', objectFit: 'cover', borderRadius: '2px' }} />
                  {langLabels[l]}
                </button>
              ))}
            </div>
          </div>
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
      <div
        style={{
          background: 'rgba(13,13,13,0.98)',
          borderTop: '1px solid var(--border)',
          padding: open ? '2rem' : '0 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: open ? '1.5rem' : '0',
          maxHeight: open ? '500px' : '0',
          overflow: 'hidden',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.4s ease, opacity 0.3s ease, padding 0.4s ease, gap 0.4s ease',
        }}
      >
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => handleMobileNav(l.href)}
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: pathname === l.href ? 'var(--gold)' : 'var(--cream)', textDecoration: 'none', transition: 'color 0.3s' }}
          >
            {l.label}
          </Link>
        ))}

        {/* Mobile language selector */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
          {langs.map(l => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              style={{
                background: lang === l ? 'rgba(240,30,30,0.12)' : 'none',
                border: '1px solid',
                borderColor: lang === l ? 'var(--gold)' : 'var(--border)',
                color: lang === l ? 'var(--gold)' : 'var(--cream-dim)',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                padding: '0.4rem 0.7rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.3s',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://flagcdn.com/w40/${langFlags[l]}.png`} alt="" style={{ width: '18px', height: '13px', objectFit: 'cover', borderRadius: '2px' }} />
              {langLabels[l]}
            </button>
          ))}
        </div>
      </div>

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
        .lang-option:hover { background: rgba(240,30,30,0.1) !important; color: var(--cream) !important; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
