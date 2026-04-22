'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { t, products } from '@/lib/translations';

export default function ContactPage() {
  const { lang } = useLang();
  const T = t[lang] as typeof t['en'];
  const C = T.contact_page;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });

    setLoading(false);
    if (res.ok) {
      setSubmitted(true);
      form.reset();
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--border)',
    color: 'var(--cream)',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.88rem',
    padding: '0.85rem 0',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.68rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    marginBottom: '0.4rem',
  };

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Header */}
      <section style={{ padding: '5rem 2rem 3rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
            Martek Marble
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '1rem' }}>
            {C.heading}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }} style={{ fontSize: '0.9rem', color: 'var(--cream-dim)', maxWidth: '500px', lineHeight: 1.8 }}>
            {C.sub}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '5rem 2rem 7rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '6rem', alignItems: 'start' }} className="contact-grid">

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            {submitted ? (
              <div style={{ border: '1px solid var(--gold)', padding: '3rem', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: 'var(--cream)', marginBottom: '1rem' }}>
                  {lang === 'en' ? 'Thank You' : 'Teşekkürler'}
                </p>
                <p style={{ fontSize: '0.88rem', color: 'var(--cream-dim)' }}>{C.form.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <label style={labelStyle}>{C.form.name}</label>
                    <input name="name" required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{C.form.company}</label>
                    <input name="company" style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <label style={labelStyle}>{C.form.country}</label>
                    <input name="country" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{C.form.interest}</label>
                    <select name="interest" style={{ ...inputStyle, cursor: 'pointer', backgroundImage: 'none' }}>
                      <option value="" style={{ background: '#111' }}>—</option>
                      {products.map(p => (
                        <option key={p.id} value={p.name.en} style={{ background: '#111' }}>{p.name[lang]}</option>
                      ))}
                      <option value="General" style={{ background: '#111' }}>{lang === 'en' ? 'General Inquiry' : 'Genel Soru'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>{C.form.message}</label>
                  <textarea name="message" required rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: loading ? 'var(--border)' : 'var(--gold)',
                      color: '#ffffff',
                      border: 'none',
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: '0.78rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      padding: '0.85rem 2.5rem',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontWeight: 500,
                      transition: 'background 0.2s',
                    }}
                  >
                    {loading ? '...' : C.form.send}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '2rem' }}>{C.info_heading}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cream-dim)', marginBottom: '0.5rem' }}>{lang === 'en' ? 'Email' : 'E-posta'}</p>
                <a href={`mailto:${C.email}`} style={{ fontSize: '0.95rem', color: 'var(--cream)', textDecoration: 'none' }}>{C.email}</a>
              </div>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cream-dim)', marginBottom: '0.75rem' }}>{lang === 'en' ? 'Phone / Fax' : 'Telefon / Faks'}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <a href={`tel:${C.phone.replace(/\s/g, '')}`} style={{ fontSize: '0.95rem', color: 'var(--cream)', textDecoration: 'none' }}>{C.phone}</a>
                  <span style={{ fontSize: '0.95rem', color: 'var(--cream)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    +90 533 730 12 42
                    <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--gold)', padding: '0.1rem 0.4rem' }}>WhatsApp</span>
                  </span>
                </div>
              </div>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cream-dim)', marginBottom: '0.5rem' }}>{lang === 'en' ? 'Address' : 'Adres'}</p>
                <p style={{ fontSize: '0.88rem', color: 'var(--cream)', lineHeight: 1.7 }}>{C.address}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cream-dim)', marginBottom: '0.75rem' }}>{lang === 'en' ? 'Export Ports' : lang === 'tr' ? 'İhracat Limanları' : lang === 'es' ? 'Puertos de Exportación' : 'Portos de Exportação'}</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {['İzmir', 'İzmir Aliağa', 'Mersin', 'Gemlik', 'Tekirdağ'].map(p => (
                    <span key={p} style={{ border: '1px solid var(--border)', color: 'var(--cream-dim)', fontSize: '0.75rem', letterSpacing: '0.1em', padding: '0.35rem 0.8rem' }}>{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </div>
  );
}
