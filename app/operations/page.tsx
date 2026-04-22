'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { t } from '@/lib/translations';
import { Lightbox, isVideo } from '@/components/Lightbox';

function encImg(folder: string, file: string) {
  return `/img/${folder}/${encodeURIComponent(file)}`;
}

const blockImages = [
  '123.jpeg', '12313.jpeg', '2134124.jpeg', '21x312.jpeg', '2x13123.jpeg',
  'PHOTO-2026-04-20-14-54-24 (1).jpg', 'PHOTO-2026-04-20-14-54-24.jpg',
  'PHOTO-2026-04-20-14-55-23 (1).jpg', 'PHOTO-2026-04-20-14-55-23 (2).jpg',
  'PHOTO-2026-04-20-14-55-23 (3).jpg', 'PHOTO-2026-04-20-14-55-23 (4).jpg',
  'PHOTO-2026-04-20-14-55-23 (5).jpg', 'PHOTO-2026-04-20-14-55-23.jpg',
  'WhatsApp Image 2026-04-22 at 12.36.49 PM.jpeg',
  'asdasd.jpeg', 'asvdas.jpeg', 'azswed123.jpeg', 'x213123.jpeg', 'zxdcdzx.jpeg', 'zxfsadf.jpeg',
].map(f => encImg('blok-yukleme', f));

const cutsizeLoadImages = [
  'PHOTO-2026-01-13-11-37-48 (2).jpg', 'PHOTO-2026-01-13-11-37-48 (3).jpg',
  'PHOTO-2026-01-13-11-37-48 (4).jpg', 'PHOTO-2026-01-13-12-43-22 (1).jpg',
  'PHOTO-2026-01-13-12-43-22.jpg', 'PHOTO-2026-01-13-12-43-23 (2).jpg',
  'PHOTO-2026-01-13-12-43-23 (3).jpg', 'PHOTO-2026-01-13-12-43-23 (4).jpg',
  'PHOTO-2026-01-13-12-43-23 (5).jpg', 'PHOTO-2026-01-13-12-43-23 (6).jpg',
  'PHOTO-2026-01-13-12-43-23 (7).jpg', 'PHOTO-2026-01-13-12-43-23 (8).jpg',
  'PHOTO-2026-01-13-12-43-24.jpg', 'PHOTO-2026-01-13-12-44-04 (10).jpg',
  'PHOTO-2026-01-13-12-44-04 (11).jpg', 'PHOTO-2026-01-13-12-44-04 (9).jpg',
  'PHOTO-2026-01-13-12-44-04.jpg',
].map(f => encImg('ebatli-yukleme', f));

const cutsizeProdImages = [
  '1e12b0c6-3251-4f5e-a062-2d123ee46355.JPG',
  '1e7ce3bf-8db9-4e98-be49-f8dfa806d18e.JPG',
  '45df22f9-0ede-48c6-af89-6c7891bc40e2.JPG',
  '98d53917-59a0-44e4-b901-d899046a6f76.JPG',
  'ba5e779d-2c39-4bd2-80ac-a218a7084430.JPG',
  'ce290585-f7cc-4e32-9257-7e1d1026e8d4.JPG',
  'd73e1c3a-b0b5-46dd-b2b7-a8d14e4f1157.JPG',
].map(f => encImg('ebatli-mallar', f));

interface GalleryProps {
  images: string[];
  minWidth?: string;
}

function Gallery({ images, minWidth = '240px' }: GalleryProps) {
  const [lb, setLb] = useState<number | null>(null);

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`, gap: '3px' }}>
        {images.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
            onClick={() => setLb(i)}
            style={{ position: 'relative', height: '200px', overflow: 'hidden', background: '#111', cursor: 'pointer' }}
            className="gal-tile"
          >
            {isVideo(src) ? (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0d0d' }}>
                <span style={{ fontSize: '2rem', opacity: 0.5 }}>▶</span>
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} className="gal-img" />
            )}
            <div className="gal-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background 0.3s' }} />
          </motion.div>
        ))}
      </div>
      {lb !== null && <Lightbox items={images} initialIndex={lb} onClose={() => setLb(null)} />}
      <style>{`
        .gal-tile:hover .gal-img { transform: scale(1.05); }
        .gal-tile:hover .gal-overlay { background: rgba(0,0,0,0.15) !important; }
      `}</style>
    </>
  );
}

export default function OperationsPage() {
  const { lang } = useLang();
  const T = t[lang] as typeof t['en'];
  const O = T.operations_page;

  const sections = [
    { num: '01', heading: O.block_heading, sub: O.block_sub, images: blockImages },
    { num: '02', heading: O.cutsize_heading, sub: O.cutsize_sub, images: cutsizeLoadImages },
    { num: '03', heading: O.products_heading, sub: O.products_sub, images: cutsizeProdImages, minWidth: '280px' },
  ];

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Header */}
      <section style={{ padding: '5rem 2rem 3rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
            Martek Marble
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '1rem' }}>
            {O.heading}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }}
            style={{ fontSize: '0.9rem', color: 'var(--cream-dim)', maxWidth: '520px', lineHeight: 1.8 }}>
            {O.sub}
          </motion.p>
        </div>
      </section>

      {sections.map((s, idx) => (
        <section key={s.num} style={{ padding: '5rem 2rem', borderBottom: idx < sections.length - 1 ? '1px solid var(--border)' : 'none' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.6rem' }}>{s.num}</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '0.6rem' }}>
                {s.heading}
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--cream-dim)', maxWidth: '480px', lineHeight: 1.8 }}>{s.sub}</p>
            </motion.div>
            <Gallery images={s.images} minWidth={(s as { minWidth?: string }).minWidth} />
          </div>
        </section>
      ))}
    </div>
  );
}
