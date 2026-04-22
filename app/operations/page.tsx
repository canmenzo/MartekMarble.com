'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { t } from '@/lib/translations';

function img(folder: string, file: string) {
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
].map(f => img('blok-yukleme', f));

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
].map(f => img('ebatli-yukleme', f));

const cutsizeProdImages = [
  '1e12b0c6-3251-4f5e-a062-2d123ee46355.JPG',
  '1e7ce3bf-8db9-4e98-be49-f8dfa806d18e.JPG',
  '45df22f9-0ede-48c6-af89-6c7891bc40e2.JPG',
  '98d53917-59a0-44e4-b901-d899046a6f76.JPG',
  'ba5e779d-2c39-4bd2-80ac-a218a7084430.JPG',
  'ce290585-f7cc-4e32-9257-7e1d1026e8d4.JPG',
  'd73e1c3a-b0b5-46dd-b2b7-a8d14e4f1157.JPG',
].map(f => img('ebatli-mallar', f));

const experienceImages = [
  '123123123123.jpeg', '123123dc2w1.jpeg', '12312dc321312.jpeg',
  'ASDASDAS.jpeg', 'ASDASDASD.jpeg',
  'WhatsApp Image 2026-04-22 at 12.20.30 PM.jpeg',
  'ascd12312312.jpeg', 'asdasd.jpeg', 'asdc123213.jpeg', 'izmir fuar.jpeg',
].map(f => img('musteri-memnuniyeti', f));

function PhotoGrid({ images, minWidth = '260px' }: { images: string[]; minWidth?: string }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
      gap: '3px',
    }}>
      {images.map((src, i) => (
        <motion.div
          key={src}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
          style={{ position: 'relative', height: '220px', overflow: 'hidden', background: 'var(--border)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
            className="gallery-img"
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function OperationsPage() {
  const { lang } = useLang();
  const T = t[lang] as typeof t['en'];
  const O = T.operations_page;

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

      {/* Block Export */}
      <section style={{ padding: '5rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>01</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '0.75rem' }}>
              {O.block_heading}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--cream-dim)', maxWidth: '480px', lineHeight: 1.8 }}>{O.block_sub}</p>
          </motion.div>
          <PhotoGrid images={blockImages} />
        </div>
      </section>

      {/* Cut-to-Size Export */}
      <section style={{ padding: '5rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>02</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '0.75rem' }}>
              {O.cutsize_heading}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--cream-dim)', maxWidth: '480px', lineHeight: 1.8 }}>{O.cutsize_sub}</p>
          </motion.div>
          <PhotoGrid images={cutsizeLoadImages} />
        </div>
      </section>

      {/* Cut-to-Size Production */}
      <section style={{ padding: '5rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>03</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '0.75rem' }}>
              {O.products_heading}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--cream-dim)', maxWidth: '480px', lineHeight: 1.8 }}>{O.products_sub}</p>
          </motion.div>
          <PhotoGrid images={cutsizeProdImages} minWidth="300px" />
        </div>
      </section>

      {/* White Glove Experience */}
      <section style={{ padding: '6rem 2rem 7rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ marginBottom: '4rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div style={{ width: '2px', background: 'var(--gold)', flexShrink: 0, marginTop: '0.5rem', height: '2.5rem' }} />
            <div>
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>04</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '0.5rem' }}>
                {O.experience_heading}
              </h2>
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }} className="experience-grid">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontStyle: 'italic', color: 'var(--cream)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                &ldquo;{O.experience_sub}&rdquo;
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                {[O.experience_p1, O.experience_p2, O.experience_p3].map((para, i) => (
                  <p key={i} style={{ fontSize: '0.9rem', color: 'var(--cream-dim)', lineHeight: 1.9 }}>{para}</p>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}>
              <PhotoGrid images={experienceImages} minWidth="200px" />
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        .gallery-img:hover { transform: scale(1.04); }
        @media (max-width: 768px) {
          .experience-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </div>
  );
}
