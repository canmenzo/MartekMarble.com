'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import { t, products } from '@/lib/translations';

const filters = ['All', 'White Marble', 'Beige Marble', 'Travertine', 'Slabs'];
const filtersTr = ['Tümü', 'Beyaz Mermer', 'Bej Mermer', 'Traverten', 'Levhalar'];
const filtersEs = ['Todos', 'Mármol Blanco', 'Mármol Beige', 'Travertino', 'Losas'];
const filtersPt = ['Todos', 'Mármore Branco', 'Mármore Bege', 'Travertino', 'Lajes'];

const whiteIds = ['marmara-white', 'afyon-white', 'mugla-white', 'carrara-white', 'calacatta', 'kemalpasa-white'];
const beigeIds = ['burdur-beige', 'bilecik-beige', 'bursa-beige', 'antalya-beige', 'aydin-cream'];

const filterMap: Record<string, string[]> = { tr: filtersTr as string[], es: filtersEs as string[], pt: filtersPt as string[] };

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const { lang } = useLang();
  const T = t[lang];
  const filterLabels = filterMap[lang] || filters;
  const searchParams = useSearchParams();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const f = searchParams.get('f');
    if (f) setActive(Number(f));
  }, [searchParams]);

  const filtered = active === 0
    ? products
    : active === 1
    ? products.filter(p => whiteIds.includes(p.id))
    : active === 2
    ? products.filter(p => beigeIds.includes(p.id))
    : active === 3
    ? products.filter(p => p.filterType === 'travertine')
    : products.filter(p => p.filterType === 'slabs');

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Header */}
      <section style={{ padding: '5rem 2rem 3rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}
          >
            {lang === 'en' ? 'Natural Stone' : lang === 'tr' ? 'Doğal Taş' : lang === 'es' ? 'Piedra Natural' : 'Pedra Natural'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '1rem' }}
          >
            {T.products_page.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{ fontSize: '0.9rem', color: 'var(--cream-dim)', maxWidth: '520px', lineHeight: 1.8 }}
          >
            {T.products_page.sub}
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: '2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {filterLabels.map((f, i) => (
            <motion.button
              key={f}
              onClick={() => setActive(i)}
              whileTap={{ scale: 0.95 }}
              style={{
                background: active === i ? 'rgba(240,30,30,0.1)' : 'none',
                border: '1px solid',
                borderColor: active === i ? 'var(--gold)' : 'var(--border)',
                color: active === i ? 'var(--gold)' : 'var(--cream-dim)',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '0.5rem 1.2rem',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
              }}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Count */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 2rem 0' }}>
        <motion.p
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ fontSize: '0.72rem', color: 'var(--cream-dim)', letterSpacing: '0.1em' }}
        >
          {filtered.length} {lang === 'en' ? 'products' : lang === 'tr' ? 'ürün' : lang === 'es' ? 'productos' : 'produtos'}
        </motion.p>
      </div>

      {/* Grid */}
      <section style={{ padding: '1.5rem 2rem 7rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5px', background: 'var(--border)' }}>
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="product-card"
              style={{ background: 'var(--bg-dark)', overflow: 'hidden' }}
            >
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                <Image
                  src={p.image}
                  alt={p.name[lang]}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="product-img"
                />
              </div>
              <div style={{ padding: '1.75rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>{p.displayType[lang]}</span>
                  <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cream-dim)' }}>· {p.origin}</span>
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 400, color: 'var(--cream)', marginBottom: '0.75rem' }}>{p.name[lang]}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--cream-dim)', lineHeight: 1.75 }}>{p.desc[lang]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <style>{`
        .product-img { transition: transform 0.8s ease; }
        .product-card { transition: transform 0.5s ease; }
        .product-card:hover { transform: translateY(-4px); }
        .product-card:hover .product-img { transform: scale(1.05); }
      `}</style>
    </div>
  );
}
