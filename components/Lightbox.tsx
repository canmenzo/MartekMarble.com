'use client';

import { useEffect, useState, useCallback } from 'react';

export function isVideo(src: string) {
  return /\.(mp4|mov|webm|MP4|MOV|WEBM)$/i.test(src);
}

interface LightboxProps {
  items: string[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ items, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  const next = useCallback(() => { setCurrent(i => (i + 1) % items.length); setZoomed(false); }, [items.length]);
  const prev = useCallback(() => { setCurrent(i => (i - 1 + items.length) % items.length); setZoomed(false); }, [items.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, onClose]);

  // prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  function handleImgClick(e: React.MouseEvent<HTMLImageElement>) {
    if (zoomed) { setZoomed(false); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomOrigin({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
    setZoomed(true);
  }

  const src = items[current];
  const video = isVideo(src);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.96)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', pointerEvents: 'none' }}>
        <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
          {current + 1} / {items.length}
        </span>
        {!video && (
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            {zoomed ? 'click to zoom out' : 'click to zoom in'}
          </span>
        )}
        <button
          onClick={onClose}
          style={{ pointerEvents: 'all', background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', width: '2rem', height: '2rem', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s, color 0.2s' }}
          className="lb-close"
        >
          ✕
        </button>
      </div>

      {/* media */}
      <div style={{ position: 'relative', maxWidth: '88vw', maxHeight: '80vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {video ? (
          <video
            src={src}
            controls
            autoPlay
            style={{ maxWidth: '88vw', maxHeight: '80vh', outline: 'none' }}
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt=""
            onClick={handleImgClick}
            style={{
              maxWidth: '88vw',
              maxHeight: '80vh',
              objectFit: 'contain',
              display: 'block',
              cursor: zoomed ? 'zoom-out' : 'zoom-in',
              transition: 'transform 0.3s ease',
              transform: zoomed ? `scale(2.8)` : 'scale(1)',
              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
              userSelect: 'none',
            }}
          />
        )}
      </div>

      {/* prev / next */}
      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="lb-arrow"
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', width: '3rem', height: '3rem', cursor: 'pointer', fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ‹
          </button>
          <button
            onClick={next}
            className="lb-arrow"
            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', width: '3rem', height: '3rem', cursor: 'pointer', fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ›
          </button>
        </>
      )}

      <style>{`
        .lb-close:hover { border-color: rgba(255,255,255,0.6) !important; color: #fff !important; }
        .lb-arrow:hover { background: rgba(255,255,255,0.15) !important; border-color: rgba(255,255,255,0.4) !important; }
      `}</style>
    </div>
  );
}
