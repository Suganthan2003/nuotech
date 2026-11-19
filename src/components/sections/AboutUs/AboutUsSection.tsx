import React, { useEffect, useState } from 'react';
import { Settings, Sun, Cpu, Activity, ArrowRight, MessageSquare, BatteryCharging } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FALLBACK_IMG = '/img/banner.jpeg';
const FLIP_INTERVAL_MS = 5000;

// One framed image that flips through these every 5 seconds
const SLIDES = [
  { img: '/img/h.png', alt: 'SMARToi building' },
  { img: '/img/a1.png', alt: 'Industrial automation' },
  { img: '/img/b1.png', alt: 'Machine reengineering' },
  { img: '/img/c4.png', alt: 'Custom BMS' },
  { img: '/img/d3.png', alt: 'IoT telemetry' },
  { img: '/img/e5.png', alt: 'Solar water heaters' },
];

const FEATURES = [
  {
    icon: Settings,
    title: 'Machine Reengineering',
    text: 'Retrofitting machines for higher output.',
    color: '#0052CC',
    bg: '#EFF6FF',
  },
  {
    icon: Sun,
    title: 'Solar Heaters & EPC',
    text: 'Design, supply and installation.',
    color: '#D97706',
    bg: '#FEF3C7',
  },
  {
    icon: BatteryCharging,
    title: 'Custom BMS',
    text: 'Tailored battery management systems.',
    color: '#059669',
    bg: '#D1FAE5',
  },
  {
    icon: Activity,
    title: '24/7 IoT Telemetry',
    text: 'Real-time monitoring with alerts.',
    color: '#7C3AED',
    bg: '#EDE9FE',
  },
];

const N = SLIDES.length; // keep even so front/back parity stays consistent

export const AboutUsSection: React.FC = () => {
  const navigate = useNavigate();
  // step grows by 1 every 5s. Even step = front face visible, odd step = back face visible.
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), FLIP_INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [step, paused]);

  const flipped = step % 2 === 1;
  // The face that is hidden always gets the NEXT image, so the swap is never seen.
  const frontIdx = (step - (step % 2)) % N;
  const backIdx = (flipped ? step : step + 1) % N;
  const activeIdx = step % N;

  const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    if (!el.src.endsWith(FALLBACK_IMG)) el.src = FALLBACK_IMG;
  };

  return (
    <section id="about" className="aus-section">
      <div className="aus-accent" aria-hidden="true" />

      <div className="aus-container">
        {/* Header */}
        <header className="aus-header">
          <div className="aus-brand">
            <img
              src="/img/logos-transparent.png"
              alt="SMARToi Logo"
              className="aus-brand-logo"
            />
            <span className="aus-brand-tag">Intelligent Automation</span>
          </div>

          <h2 className="aus-title">
            Pioneering Industrial <span style={{ color: '#0052CC' }}>Automation,</span>{' '}
            <span style={{ color: '#10B981' }}>Solar Energy</span> &amp; Custom Tech
          </h2>

          <p className="aus-lead">
            A forward-thinking engineering and technology company headquartered in Karur, Tamil
            Nadu, India, building the right solutions for a smarter, more sustainable and automated
            tomorrow.
          </p>
        </header>

        {/* Showcase */}
        <div className="aus-grid">
          {/* Left: single framed image that flips */}
          <div className="aus-visual">
            <div
              className="aus-frame"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Static decorative frame (does not flip) */}
              <span className="aus-tab" aria-hidden="true" />
              <span className="aus-corner" aria-hidden="true" />

              <div className="aus-stage">
                <div className={`aus-flip-inner ${flipped ? 'is-flipped' : ''}`}>
                  <div className="aus-face aus-front">
                    <img src={SLIDES[frontIdx].img} alt={SLIDES[frontIdx].alt} onError={onImgError} />
                  </div>
                  <div className="aus-face aus-back">
                    <img src={SLIDES[backIdx].img} alt={SLIDES[backIdx].alt} onError={onImgError} />
                  </div>
                </div>
              </div>
            </div>

            <div className="aus-dots" role="tablist" aria-label="Gallery position">
              {SLIDES.map((s, i) => (
                <span key={s.alt} className={`aus-dot ${activeIdx === i ? 'on' : ''}`} />
              ))}
            </div>
          </div>

          {/* Right: content */}
          <div className="aus-content">
            <span className="aus-eyebrow">
              <Cpu size={14} /> Who we are
            </span>
            <h3 className="aus-subtitle">
              Transforming Real-World Challenges Into{' '}
              <span style={{ color: '#0284C7' }}>Intelligent Machines</span>
            </h3>
            <p className="aus-text">
              We turn complex industrial and energy challenges into smart, reliable and efficient
              systems, designing, developing and deploying custom technology that helps businesses
              grow sustainably.
            </p>

            <div className="aus-features">
              {FEATURES.map(({ icon: Icon, title, text, color, bg }) => (
                <div className="aus-feature" key={title}>
                  <div className="aus-feature-icon" style={{ background: bg, color }}>
                    <Icon size={22} />
                  </div>
                  <div className="aus-feature-body">
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="aus-actions">
              <button className="aus-btn aus-btn-primary" onClick={() => navigate('/about')}>
                <span className="aus-btn-label">Company Profile</span>
                <span className="aus-btn-chip">
                  <ArrowRight size={16} />
                </span>
              </button>
              <button className="aus-btn aus-btn-secondary" onClick={() => navigate('/contact')}>
                <span className="aus-btn-chip aus-btn-chip-light">
                  <MessageSquare size={16} />
                </span>
                <span className="aus-btn-label">Talk to Engineering Lead</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .aus-section {
          position: relative; overflow: hidden; background: #fff; color: #0F172A;
          min-height: 100vh; min-height: 100svh;
          display: flex; align-items: center;
          padding: clamp(24px, 4vh, 48px) 0;
          font-family: Inter, system-ui, -apple-system, 'Segoe UI', sans-serif;
          box-sizing: border-box;
        }
        .aus-section *, .aus-section *::before, .aus-section *::after { box-sizing: border-box; }
        .aus-accent {
          position: absolute; top: 0; left: 0; width: 180px; height: 180px; pointer-events: none;
          background: linear-gradient(135deg, rgba(0,82,204,.22), rgba(0,102,255,.08) 50%, transparent 70%);
          clip-path: polygon(0 0, 100% 0, 0 100%);
        }
        .aus-container { position: relative; z-index: 1; width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 32px); }

        /* Header */
        .aus-header { text-align: center; max-width: 820px; margin: 0 auto clamp(18px, 3.5vh, 36px); }
        .aus-brand { display: inline-flex; flex-direction: column; align-items: center; margin-bottom: clamp(8px, 1.6vh, 16px); }
        .aus-brand-logo { height: clamp(48px, 6vh, 72px); width: auto; object-fit: contain; display: block; }
        .aus-brand-tag { margin-top: 6px; font-size: clamp(.65rem, 1.4vw, .85rem); font-weight: 800; color: #0052CC; letter-spacing: .28em; text-transform: uppercase; }
        .aus-title { font-size: clamp(1.45rem, 3.4vw, 2.5rem); font-weight: 800; line-height: 1.18; letter-spacing: -.5px; margin: 0 0 clamp(8px, 1.4vh, 14px); }
        .aus-lead { font-size: clamp(.9rem, 1.4vw, 1.02rem); color: #475569; line-height: 1.6; margin: 0 auto; max-width: 720px; }

        /* Layout */
        .aus-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(28px, 5vw, 64px); align-items: center; }

        /* Framed flipping image */
        .aus-visual { display: flex; flex-direction: column; align-items: center; gap: 22px; width: 100%; }
        .aus-frame { position: relative; width: 100%; padding: 0 16px 16px 0; }
        .aus-tab {
          position: absolute; top: -12px; left: -12px; width: 52px; height: 36px; z-index: 10;
          background: #0052CC; border-radius: 12px 6px 18px 6px; box-shadow: 0 6px 14px rgba(0,82,204,.35);
        }
        .aus-corner {
          position: absolute; right: 0; bottom: 0; width: 82%; height: 82%; z-index: 0; pointer-events: none;
          border-right: 4px solid #0052CC; border-bottom: 4px solid #0052CC; border-radius: 0 0 26px 0;
        }
        .aus-stage {
          position: relative; z-index: 1; perspective: 1400px; aspect-ratio: 16 / 11; width: 100%;
          border-radius: 26px;
        }
        .aus-flip-inner {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d; transition: transform 1s cubic-bezier(.4, .2, .2, 1);
        }
        .aus-flip-inner.is-flipped { transform: rotateY(180deg); }
        .aus-face {
          position: absolute; inset: 0; border-radius: 26px; overflow: hidden; background: #E2E8F0;
          backface-visibility: hidden; -webkit-backface-visibility: hidden;
          box-shadow: 0 18px 40px rgba(15, 23, 42, .18);
        }
        .aus-face img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .aus-back { transform: rotateY(180deg); }

        .aus-dots { display: flex; gap: 8px; }
        .aus-dot { width: 8px; height: 8px; border-radius: 999px; background: #CBD5E1; transition: all .4s ease; }
        .aus-dot.on { width: 26px; background: #0052CC; }

        /* Content */
        .aus-eyebrow {
          display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 999px;
          background: #EFF6FF; color: #0052CC; font-size: .75rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
        }
        .aus-subtitle { font-size: clamp(1.35rem, 2.3vw, 1.9rem); font-weight: 800; line-height: 1.22; margin: 12px 0; }
        .aus-text { color: #475569; font-size: clamp(.9rem, 1.3vw, .98rem); line-height: 1.65; margin: 0 0 20px; }

        .aus-features { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
        .aus-feature {
          display: flex; align-items: center; gap: 12px; padding: 14px; background: #fff;
          border: 1px solid #E2E8F0; border-radius: 14px; min-width: 0;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .aus-feature:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(15,23,42,.1); border-color: #BFDBFE; }
        .aus-feature-icon { flex: 0 0 44px; width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .aus-feature-body { min-width: 0; }
        .aus-feature-body h4 { margin: 0 0 2px; font-size: .92rem; font-weight: 700; color: #0F172A; line-height: 1.3; }
        .aus-feature-body p { margin: 0; font-size: .8rem; color: #64748B; line-height: 1.45; }

        /* Buttons */
        .aus-actions { display: flex; flex-wrap: wrap; gap: 12px; }
        .aus-btn {
          display: inline-flex; align-items: center; justify-content: space-between; gap: 14px;
          padding: 8px 8px 8px 22px; min-height: 52px; border-radius: 14px;
          font: inherit; font-size: .92rem; font-weight: 700; cursor: pointer; transition: all .3s ease;
        }
        .aus-btn-label { white-space: nowrap; }
        .aus-btn-chip {
          width: 36px; height: 36px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,.18); transition: transform .3s ease, background .3s ease;
        }
        .aus-btn-primary {
          background: linear-gradient(135deg, #0B2A6F 0%, #0052CC 55%, #0284C7 100%);
          color: #fff; border: none; box-shadow: 0 10px 24px rgba(0,82,204,.32);
        }
        .aus-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(0,82,204,.42); }
        .aus-btn-primary:hover .aus-btn-chip { transform: translateX(4px); background: rgba(255,255,255,.28); }
        .aus-btn-secondary { background: #fff; color: #0F172A; border: 1.5px solid #CBD5E1; padding: 8px 22px 8px 8px; }
        .aus-btn-chip-light { background: #EFF6FF; color: #0052CC; }
        .aus-btn-secondary:hover { border-color: #0284C7; background: #F8FBFF; transform: translateY(-2px); box-shadow: 0 10px 22px rgba(15,23,42,.08); }
        .aus-btn-secondary:hover .aus-btn-chip { background: #0284C7; color: #fff; }
        .aus-btn:focus-visible { outline: 3px solid #0284C7; outline-offset: 3px; }

        /* Desktop: keep everything on one screen */
        @media (min-width: 1025px) {
          .aus-frame { max-width: min(100%, calc(58svh * 1.45 + 16px)); }
        }

        /* Tablet: stack, natural height */
        @media (max-width: 1024px) {
          .aus-section { min-height: auto; display: block; padding: 48px 0; }
          .aus-grid { grid-template-columns: 1fr; gap: 36px; }
          .aus-frame { max-width: 580px; margin: 0 auto; }
          .aus-content { max-width: 680px; margin: 0 auto; }
        }
        /* Mobile */
        @media (max-width: 640px) {
          .aus-section { padding: 36px 0; }
          .aus-container { padding: 0 16px; }
          .aus-header { margin-bottom: 24px; }
          .aus-brand-name { font-size: 2.2rem; }
          .aus-title { font-size: 1.55rem; line-height: 1.22; }
          .aus-lead { font-size: 0.88rem; line-height: 1.55; }
          .aus-grid { gap: 28px; }
          .aus-subtitle { font-size: 1.35rem; }
          .aus-text { font-size: 0.88rem; line-height: 1.55; margin-bottom: 16px; }
          .aus-features { grid-template-columns: 1fr; gap: 10px; margin-bottom: 20px; }
          .aus-feature { padding: 12px; }
          .aus-stage, .aus-face { border-radius: 18px; }
          .aus-corner { border-radius: 0 0 18px 0; border-right-width: 3px; border-bottom-width: 3px; }
          .aus-actions { flex-direction: column; width: 100%; gap: 10px; }
          .aus-btn { width: 100%; min-height: 48px; padding: 8px 12px 8px 16px; font-size: 0.88rem; }
          .aus-btn-secondary { justify-content: space-between; padding: 8px 12px 8px 16px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aus-flip-inner, .aus-feature, .aus-btn, .aus-btn-chip, .aus-dot { transition: none; }
        }
      `}</style>
    </section>
  );
};

export default AboutUsSection;