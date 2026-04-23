'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import { t, products } from '@/lib/translations';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function Home() {
  const { lang } = useLang();
  const T = t[lang];

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', height: '100vh', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Image
          src="/img/quarybg.jpg"
          alt="Marble quarry"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(13,13,13,0.88) 0%, rgba(13,13,13,0.6) 100%)' }} />
        {/* grain overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")', backgroundSize: '256px', opacity: 0.6, zIndex: 2 }} />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1.5rem', maxWidth: '900px' }}>
          <motion.p {...fade(0.1)} style={{ fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem' }}>
            Est. 2003 · Martek Marble
          </motion.p>
          <motion.h1 {...fade(0.25)} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--cream)', marginBottom: '1.5rem' }}>
            {T.hero.tagline}
          </motion.h1>
          <motion.p {...fade(0.4)} style={{ fontSize: '1rem', fontWeight: 300, color: 'var(--cream-dim)', maxWidth: '540px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            {T.hero.sub}
          </motion.p>
          <motion.div {...fade(0.55)} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn-primary">
              {T.hero.cta_products}
            </Link>
            <Link href="/contact" className="btn-ghost">
              {T.hero.cta_contact}
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator — chevron with pulse */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '-12px', opacity: 0.5 }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-mid)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(240,30,30,0.03), transparent)' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', position: 'relative' }}>
          {T.stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', borderRight: i < 2 ? '1px solid var(--border)' : 'none', padding: '1rem' }}
            >
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cream-dim)', marginTop: '0.5rem' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '7rem 2rem', background: 'var(--bg-dark)', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ marginBottom: '4rem' }}
          >
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Collection</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '1rem' }}>{T.featured.heading}</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--cream-dim)', maxWidth: '480px', lineHeight: 1.8 }}>{T.featured.sub}</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5px', background: 'var(--border)' }}>
            {products.slice(0, 8).map((p, i) => (
              <Link key={p.id} href={`/products?open=${p.id}`} style={{ display: 'block', textDecoration: 'none' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="product-card"
                  style={{ position: 'relative', height: '360px', overflow: 'hidden', background: 'var(--bg-dark)' }}
                >
                  <Image
                    src={p.image}
                    alt={p.name[lang]}
                    fill
                    className="product-img"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="card-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.1) 55%)', transition: 'background 0.5s' }} />
                  <div className="card-shine" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(240,30,30,0.06) 0%, transparent 60%)', opacity: 0, transition: 'opacity 0.5s' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
                    <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.4rem' }}>{p.displayType[lang]}</p>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 400, color: 'var(--cream)' }}>{p.name[lang]}</h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            style={{ marginTop: '2.5rem', textAlign: 'center' }}
          >
            <Link href="/products" className="btn-outline">
              {T.featured.view_all}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About teaser */}
      <section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="about-grid">
          <motion.div
            style={{ position: 'relative', minHeight: '500px', overflow: 'hidden', cursor: 'pointer' }}
            whileHover="hover"
            initial="rest"
            animate="rest"
          >
            <motion.div
              variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', inset: '-12%' }}
            >
              <Image
                src={`/img/bloklar/marmara-white/${encodeURIComponent('WhatsApp Image 2026213123-04-22 at 12.07.39 PM.jpeg')}`}
                alt="Marmara White marble"
                fill
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
            {/* red shimmer sweep */}
            <motion.div
              variants={{
                rest: { x: '-100%' },
                hover: { x: '250%' },
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute', inset: 0, zIndex: 2,
                background: 'linear-gradient(105deg, transparent 35%, rgba(240,30,30,0.18) 50%, transparent 65%)',
                pointerEvents: 'none',
              }}
            />
            {/* vignette darkens slightly on hover */}
            <motion.div
              variants={{ rest: { opacity: 1 }, hover: { opacity: 0.6 } }}
              transition={{ duration: 0.6 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(13,13,13,0.3)', zIndex: 1 }}
            />
          </motion.div>
          <div style={{ background: 'var(--bg-mid)', display: 'flex', alignItems: 'center', padding: '5rem 4rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '1px', height: '100%', background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)', opacity: 0.4 }} />
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem' }}>About</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '1.5rem', lineHeight: 1.2 }}>{T.about_teaser.heading}</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--cream-dim)', lineHeight: 1.9, marginBottom: '2rem', maxWidth: '420px' }}>{T.about_teaser.body}</p>
              <Link href="/about" className="btn-red-outline">
                {T.about_teaser.cta}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '7rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-dark)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(240,30,30,0.07) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem' }}>
            Contact
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }} viewport={{ once: true }} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '1.2rem' }}>
            {T.cta_banner.heading}
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }} viewport={{ once: true }} style={{ fontSize: '0.9rem', color: 'var(--cream-dim)', marginBottom: '2.5rem' }}>
            {T.cta_banner.sub}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }} viewport={{ once: true }}>
            <Link href="/contact" className="btn-primary">
              {T.cta_banner.btn}
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        .btn-primary {
          display: inline-block;
          background: var(--gold);
          color: #fff;
          font-family: 'Raleway', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.9rem 2.4rem;
          text-decoration: none;
          font-weight: 500;
          position: relative;
          overflow: hidden;
          transition: background 0.4s, box-shadow 0.4s, transform 0.3s;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.6s;
        }
        .btn-primary:hover::before { left: 100%; }
        .btn-primary:hover { background: #d01818; box-shadow: 0 4px 24px rgba(240,30,30,0.35); transform: translateY(-2px); }

        .btn-ghost {
          display: inline-block;
          background: transparent;
          color: var(--cream);
          border: 1px solid rgba(245,245,245,0.35);
          font-family: 'Raleway', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.9rem 2.4rem;
          text-decoration: none;
          transition: border-color 0.4s, color 0.4s, background 0.4s, transform 0.3s;
        }
        .btn-ghost:hover { border-color: var(--cream); background: rgba(245,245,245,0.06); transform: translateY(-2px); }

        .btn-outline {
          display: inline-block;
          border: 1px solid var(--border);
          color: var(--cream-dim);
          font-family: 'Raleway', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.9rem 2.4rem;
          text-decoration: none;
          transition: border-color 0.4s, color 0.4s, transform 0.3s;
        }
        .btn-outline:hover { border-color: var(--gold); color: var(--cream); transform: translateY(-2px); }

        .btn-red-outline {
          display: inline-block;
          border: 1px solid var(--gold);
          color: var(--gold);
          font-family: 'Raleway', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.9rem 2.2rem;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: color 0.45s, transform 0.3s;
        }
        .btn-red-outline::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s ease;
          z-index: -1;
        }
        .btn-red-outline:hover { color: #fff; transform: translateY(-2px); }
        .btn-red-outline:hover::before { transform: scaleX(1); }

        .product-card { transition: transform 0.5s ease; }
        .product-card:hover { transform: translateY(-4px); }
        .product-card:hover .product-img { transform: scale(1.06); }
        .product-card:hover .card-shine { opacity: 1; }
        .product-card:hover .card-overlay { background: linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.2) 55%) !important; }
        .product-img { transition: transform 0.8s ease; }

        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
