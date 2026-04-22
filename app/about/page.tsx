'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import { t } from '@/lib/translations';
import { Lightbox, isVideo } from '@/components/Lightbox';

function encImg(folder: string, file: string) {
  return `/img/${folder}/${encodeURIComponent(file)}`;
}

const experienceImages = [
  '123123123123.jpeg', '123123dc2w1.jpeg', '12312dc321312.jpeg',
  'ASDASDAS.jpeg', 'ASDASDASD.jpeg',
  'WhatsApp Image 2026-04-22 at 12.20.30 PM.jpeg',
  'ascd12312312.jpeg', 'asdasd.jpeg', 'asdc123213.jpeg', 'izmir fuar.jpeg',
].map(f => encImg('musteri-memnuniyeti', f));

export default function AboutPage() {
  const { lang } = useLang();
  const T = t[lang] as typeof t['en'];
  const A = T.about_page;
  const O = T.operations_page;
  const [lb, setLb] = useState<number | null>(null);

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Header with image */}
      <section style={{ position: 'relative', height: '50vh', minHeight: '360px', display: 'flex', alignItems: 'flex-end' }}>
        <Image
          src="/img/quarryabout.jpg"
          alt="Marble quarry"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 80%' }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,9,8,1) 0%, rgba(10,9,8,0.4) 60%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
              Est. 2003
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--cream)' }}>
              {A.heading}
            </motion.h1>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/logo.png"
              alt="Martek Marble"
              style={{ height: '90px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '6rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }} className="story-grid">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem' }}>{A.story_heading}</p>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {A.story}
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--cream-dim)', lineHeight: 1.9, fontStyle: 'italic', borderLeft: '2px solid var(--gold)', paddingLeft: '1.2rem' }}>
              {A.mission}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', marginBottom: '3rem' }}>
              {[
                { v: '2003', l: lang === 'en' ? 'Founded' : lang === 'tr' ? 'Kuruluş' : lang === 'es' ? 'Fundación' : 'Fundação' },
                { v: '20+', l: lang === 'en' ? 'Years Active' : lang === 'tr' ? 'Yıllık Deneyim' : lang === 'es' ? 'Años Activos' : 'Anos Ativos' },
                { v: '5', l: lang === 'en' ? 'Export Ports' : lang === 'tr' ? 'İhracat Limanı' : lang === 'es' ? 'Puertos' : 'Portos' },
                { v: '30+', l: lang === 'en' ? 'Countries' : lang === 'tr' ? 'Ülke' : lang === 'es' ? 'Países' : 'Países' },
              ].map(s => (
                <motion.div
                  key={s.l}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  style={{ background: 'var(--bg-mid)', padding: '2rem', textAlign: 'center', transition: 'background 0.4s' }}
                >
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 300, color: 'var(--gold)' }}>{s.v}</p>
                  <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cream-dim)', marginTop: '0.5rem' }}>{s.l}</p>
                </motion.div>
              ))}
            </div>

            {/* Quality */}
            <motion.div
              whileHover={{ borderColor: 'rgba(240,30,30,0.5)' }}
              style={{ border: '1px solid var(--border)', padding: '2rem', transition: 'border-color 0.4s' }}
            >
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>{A.quality_heading}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--cream-dim)', lineHeight: 1.8 }}>{A.quality}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Export Ports */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Export</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--cream)' }}>{A.ports_heading}</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px' }} className="ports-grid">
            {A.ports.map((port, i) => (
              <motion.div
                key={port.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="port-card"
                style={{ background: 'var(--bg-mid)', padding: '3rem 2rem', textAlign: 'center' }}
              >
                <div style={{ width: '48px', height: '1px', background: 'var(--gold)', margin: '0 auto 1.5rem' }} />
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400, color: 'var(--cream)', marginBottom: '0.75rem' }}>{port.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--cream-dim)', letterSpacing: '0.05em' }}>{port.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Martek Experience */}
      <section style={{ padding: '7rem 2rem', background: 'var(--bg-mid)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            style={{ marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
              {lang === 'en' ? 'Beyond the Transaction' : lang === 'tr' ? 'İşin Ötesinde' : lang === 'es' ? 'Más Allá' : 'Além do Negócio'}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, color: 'var(--cream)' }}>
              {O.experience_heading}
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }} className="exp-grid">
            {/* Text */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontStyle: 'italic', color: 'var(--cream)', marginBottom: '2.5rem', lineHeight: 1.75, borderLeft: '2px solid var(--gold)', paddingLeft: '1.25rem' }}>
                &ldquo;{O.experience_sub}&rdquo;
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                {[O.experience_p1, O.experience_p2, O.experience_p3].map((para, i) => (
                  <p key={i} style={{ fontSize: '0.9rem', color: 'var(--cream-dim)', lineHeight: 1.95 }}>{para}</p>
                ))}
              </div>
            </motion.div>

            {/* Photo grid — horizontal, compact */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px' }}>
                {experienceImages.map((src, i) => (
                  <div
                    key={src}
                    onClick={() => setLb(i)}
                    style={{ position: 'relative', height: '160px', overflow: 'hidden', background: '#111', cursor: 'pointer' }}
                    className="exp-tile"
                  >
                    {isVideo(src) ? (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '1.8rem', opacity: 0.5 }}>▶</span>
                      </div>
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} className="exp-img" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {lb !== null && <Lightbox items={experienceImages} initialIndex={lb} onClose={() => setLb(null)} />}

      <style>{`
        @media (max-width: 768px) {
          .story-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .ports-grid { grid-template-columns: 1fr 1fr !important; }
          .exp-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        .exp-tile:hover .exp-img { transform: scale(1.06); }
      `}</style>
    </div>
  );
}
