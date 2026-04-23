'use client';

import { useState, useEffect, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import { t, products } from '@/lib/translations';
import type { Lang } from '@/lib/translations';
import { Lightbox, isVideo } from '@/components/Lightbox';
import { productGallery } from '@/lib/product-galleries';

const filters = ['All', 'White Marble', 'Beige Marble', 'Travertine', 'Slabs'];
const filtersTr = ['Tümü', 'Beyaz Mermer', 'Bej Mermer', 'Traverten', 'Levhalar'];
const filtersEs = ['Todos', 'Mármol Blanco', 'Mármol Beige', 'Travertino', 'Losas'];
const filtersPt = ['Todos', 'Mármore Branco', 'Mármore Bege', 'Travertino', 'Lajes'];

const whiteIds = ['marmara-white', 'afyon-white', 'mugla-white', 'carrara-white', 'calacatta', 'kemalpasa-white'];
const beigeIds = ['burdur-beige', 'bilecik-beige', 'bursa-beige', 'antalya-beige', 'aydin-cream'];

const filterMap: Record<string, string[]> = { tr: filtersTr as string[], es: filtersEs as string[], pt: filtersPt as string[] };

type Product = typeof products[number];

function ProductModal({ product, lang, onClose }: { product: Product; lang: Lang; onClose: () => void }) {
  const gallery = productGallery[product.id] ?? [];
  const [lb, setLb] = useState<number | null>(null);

  // prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const content = (
    <>
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 500,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          overflowY: 'auto',
        }}
      >
        <div
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          style={{
            minHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: 'var(--bg-dark)',
              border: '1px solid var(--border)',
              width: '100%',
              maxWidth: '1100px',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* close btn */}
            <button
              onClick={onClose}
              className="modal-close"
              style={{
                position: 'absolute', top: '1.25rem', right: '1.25rem',
                zIndex: 10,
                background: 'rgba(13,13,13,0.8)',
                border: '1px solid var(--border)',
                color: 'var(--cream-dim)',
                width: '2.2rem', height: '2.2rem',
                cursor: 'pointer', fontSize: '0.9rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              ✕
            </button>

            {/* Hero thumbnail */}
            <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
              <Image
                src={product.image}
                alt={product.name[lang]}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-dark) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2.5rem', right: '4rem' }}>
                <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                  {product.displayType[lang]} · {product.origin}
                </span>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, color: 'var(--cream)', marginTop: '0.4rem' }}>
                  {product.name[lang]}
                </h2>
              </div>
            </div>

            {/* Description */}
            <div style={{ padding: '2rem 2.5rem', borderBottom: gallery.length > 0 ? '1px solid var(--border)' : 'none' }}>
              <p style={{ fontSize: '0.92rem', color: 'var(--cream-dim)', lineHeight: 1.9, maxWidth: '680px' }}>{product.desc[lang]}</p>
            </div>

            {/* Gallery */}
            {gallery.length > 0 && (
              <div style={{ padding: '2rem 2.5rem 2.5rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.25rem' }}>
                  {lang === 'en' ? 'Gallery' : lang === 'tr' ? 'Galeri' : lang === 'es' ? 'Galería' : 'Galeria'} · {gallery.length} {lang === 'en' ? 'items' : lang === 'tr' ? 'öğe' : lang === 'es' ? 'items' : 'itens'}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '3px' }}>
                  {gallery.map((src, i) => (
                    <div
                      key={src}
                      onClick={() => setLb(i)}
                      className="gal-thumb"
                      style={{ position: 'relative', height: '150px', overflow: 'hidden', background: '#111', cursor: 'pointer' }}
                    >
                      {isVideo(src) ? (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.4rem' }}>
                          <span style={{ fontSize: '1.8rem', opacity: 0.5 }}>▶</span>
                          <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>video</span>
                        </div>
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={src}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                          className="gal-img"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {lb !== null && <Lightbox items={gallery} initialIndex={lb} onClose={() => setLb(null)} />}

      <style>{`
        .modal-close:hover { border-color: var(--cream) !important; color: var(--cream) !important; }
        .gal-thumb:hover .gal-img { transform: scale(1.06); }
      `}</style>
    </>
  );

  return createPortal(content, document.body);
}

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
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
    const f = searchParams.get('f');
    if (f) setActive(Number(f));
    const openId = searchParams.get('open');
    if (openId) {
      const product = products.find(p => p.id === openId);
      if (product) setSelected(product);
    }
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
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
            {lang === 'en' ? 'Natural Stone' : lang === 'tr' ? 'Doğal Taş' : lang === 'es' ? 'Piedra Natural' : 'Pedra Natural'}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '1rem' }}>
            {T.products_page.heading}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }}
            style={{ fontSize: '0.9rem', color: 'var(--cream-dim)', maxWidth: '520px', lineHeight: 1.8 }}>
            {T.products_page.sub}
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: '2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {filterLabels.map((f, i) => (
            <button key={f} onClick={() => setActive(i)}
              className={`filter-btn${active === i ? ' filter-btn-active' : ''}`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Count */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 2rem 0' }}>
        <motion.p key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          style={{ fontSize: '0.72rem', color: 'var(--cream-dim)', letterSpacing: '0.1em' }}>
          {filtered.length} {lang === 'en' ? 'products' : lang === 'tr' ? 'ürün' : lang === 'es' ? 'productos' : 'produtos'}
        </motion.p>
      </div>

      {/* Grid */}
      <section style={{ padding: '1.5rem 2rem 7rem' }}>
        <div key={active} style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5px' }}>
          {filtered.map((p, i) => {
            const hasGallery = (productGallery[p.id]?.length ?? 0) > 0;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="product-card"
                onClick={() => setSelected(p)}
                style={{ background: 'var(--bg-dark)', overflow: 'hidden', border: '0.75px solid var(--border)', cursor: 'pointer' }}
              >
                <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                  <Image src={p.image} alt={p.name[lang]} fill style={{ objectFit: 'cover' }} className="product-img" />
                  {hasGallery && (
                    <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', background: 'rgba(13,13,13,0.75)', border: '1px solid var(--border)', padding: '0.25rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ fontSize: '0.6rem', opacity: 0.6 }}>⊞</span>
                      <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--cream-dim)' }}>
                        {productGallery[p.id].length}
                      </span>
                    </div>
                  )}
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
            );
          })}
        </div>
      </section>

      {selected && <ProductModal product={selected} lang={lang} onClose={() => setSelected(null)} />}

      <style>{`
        .filter-btn {
          background: none;
          border: 1px solid var(--border);
          color: var(--cream-dim);
          font-family: 'Josefin Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.5rem 1.2rem;
          cursor: pointer;
          transition: border-color 0.25s, color 0.25s, background 0.25s;
        }
        .filter-btn:hover { border-color: var(--cream-dim); }
        .filter-btn-active {
          background: rgba(200,40,40,0.12) !important;
          border-color: #c82828 !important;
          color: #e04040 !important;
        }
        .product-img { transition: transform 0.8s ease; }
        .product-card { transition: transform 0.5s ease; }
        .product-card:hover { transform: translateY(-4px); }
        .product-card:hover .product-img { transform: scale(1.05); }
        .gal-thumb:hover .gal-img { transform: scale(1.06); }
      `}</style>
    </div>
  );
}
