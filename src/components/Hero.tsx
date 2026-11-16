import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  openQuoteModal: () => void;
  scrollToSection: (sectionId: string) => void;
}

const slides = [
  {
    number: '01',
    tag: 'Smart Living Solutions',
    titlePrefix: 'Next-Gen',
    titleHighlight: 'Smart Living',
    titleSuffix: 'Solutions.',
    description:
      'Transform your living and working spaces with intelligent home automation, touch switch controls, automated lighting, climate regulation and remote connectivity.',
    points: ['Home automation', 'Touch switches', 'Remote control'],
    accent: '#5BC0DE',
    bgVideo: '/v/a.mp4',
    image: '/img/p2.png',
  },
  {
    number: '02',
    tag: 'Industrial Automation',
    titlePrefix: 'Advanced',
    titleHighlight: 'Industrial',
    titleSuffix: 'Automation.',
    description:
      'Empowering industries with customized electrical control panels, PLC and VFD motor integration, automated machine safety and precision manufacturing engineering.',
    points: ['PLC panels', 'Motor drives', 'Special purpose machines'],
    accent: '#6CCB8F',
    bgVideo: '/v/b.mp4',
    image: '/img/e5.png',
  },
  {
    number: '03',
    tag: 'Solar Solutions',
    titlePrefix: 'Sustainable',
    titleHighlight: 'Solar',
    titleSuffix: 'Solutions.',
    description:
      'High-efficiency solar water heating, turnkey rooftop solar installations, solar agricultural pumps and eco-friendly renewable energy systems.',
    points: ['Solar water heaters', 'Rooftop PV', 'Agriculture pumps'],
    accent: '#F2B94B',
    bgVideo: '/v/c.mp4',
    image: '/img/b3.png',
  },
];

const SLIDE_MS = 9000;

export const Hero: React.FC<HeroProps> = ({ openQuoteModal, scrollToSection }) => {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  const go = useCallback((i: number) => {
    setCurrent((i + slides.length) % slides.length);
  }, []);

  // Auto advance; timer restarts on every slide change (manual or automatic)
  useEffect(() => {
    const t = setTimeout(() => go(current + 1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [current, go]);

  return (
    <section id="home" className="hr" style={{ ['--accent' as string]: slide.accent }}>
      <style>{css}</style>

      {/* Background video with a flat dark overlay */}
      <video
        key={slide.bgVideo}
        className="hr-video"
        src={slide.bgVideo}
        poster={slide.image}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hr-overlay" />

      <div className="hr-container">
        <div className="hr-grid">
          {/* Left column */}
          <div key={`left-${current}`} className="hr-left hr-enter">
            <div className="hr-tagrow">
              <span className="hr-num">
                {slide.number}<span> / 0{slides.length}</span>
              </span>
              <span className="hr-rule" />
              <span className="hr-tag">{slide.tag}</span>
            </div>

            <h1 className="hr-title">
              {slide.titlePrefix} <span className="hr-title-accent">{slide.titleHighlight}</span>{' '}
              {slide.titleSuffix}
            </h1>

            <p className="hr-desc">{slide.description}</p>

            <ul className="hr-points">
              {slide.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            <div className="hr-actions">
              <button className="hr-btn hr-btn-primary" onClick={openQuoteModal}>
                Start Project <ArrowRight size={18} />
              </button>
              <button className="hr-btn hr-btn-secondary" onClick={() => scrollToSection('solutions')}>
                Explore Solutions
              </button>
            </div>
          </div>

          {/* Right column: image card */}
          <div className="hr-right">
            <div className="hr-card">
              <img
                key={`img-${current}`}
                className="hr-card-img hr-enter-img"
                src={slide.image}
                alt={slide.tag}
              />
              <div className="hr-card-shade" />

              <div className="hr-card-label">
                <span className="hr-card-dot" />
                {slide.tag}
              </div>

              <div className="hr-card-nav">
                <button aria-label="Previous slide" onClick={() => go(current - 1)}>
                  <ChevronLeft size={18} />
                </button>
                <button aria-label="Next slide" className="is-accent" onClick={() => go(current + 1)}>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Slide indicators */}
            <div className="hr-dots">
              {slides.map((s, i) => (
                <button
                  key={s.number}
                  aria-label={`Go to slide ${i + 1}`}
                  className={i === current ? 'is-on' : ''}
                  onClick={() => go(i)}
                >
                  {i === current && <span key={current} className="hr-dots-fill" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600;700&display=swap');

.hr {
  position: relative;
  min-height: 100vh;
  padding: 120px 0 64px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #0b1220;
  color: #eef2f6;
  font-family: 'Barlow', system-ui, sans-serif;
}
.hr-video {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
}
.hr-overlay {
  position: absolute; inset: 0;
  background:
    linear-gradient(90deg, rgba(11,18,32,.92) 0%, rgba(11,18,32,.78) 40%, rgba(11,18,32,.4) 100%);
}
.hr-container {
  position: relative;
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 48px;
}
.hr-grid {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 64px;
  align-items: center;
}

/* Left */
.hr-tagrow {
  display: flex; align-items: center; gap: 14px;
  margin-bottom: 22px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 600;
  letter-spacing: .14em; text-transform: uppercase;
}
.hr-num { color: var(--accent); transition: color .4s; }
.hr-num span { color: rgba(238,242,246,.5); }
.hr-rule { width: 40px; height: 1px; background: rgba(238,242,246,.4); }
.hr-tag { color: rgba(238,242,246,.85); }

.hr-title {
  margin: 0 0 22px;
  font-family: 'Barlow', sans-serif;
  font-weight: 700;
  font-size: clamp(2.6rem, 4.8vw, 4.3rem);
  line-height: 1.06;
  letter-spacing: -0.02em;
  color: #fff;
}
.hr-title-accent { color: var(--accent); transition: color .4s; }

.hr-desc {
  margin: 0 0 24px;
  max-width: 570px;
  font-size: 1.14rem; font-weight: 400;
  line-height: 1.65;
  color: rgba(238,242,246,.84);
}

.hr-points {
  list-style: none; margin: 0 0 34px; padding: 0;
  display: flex; flex-wrap: wrap; gap: 10px;
}
.hr-points li {
  padding: 7px 14px;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 999px;
  font-size: .88rem; font-weight: 500;
  color: rgba(238,242,246,.9);
  background: rgba(255,255,255,.04);
}

.hr-actions { display: flex; flex-wrap: wrap; gap: 14px; }
.hr-btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 28px;
  border-radius: 8px;
  font: 600 1rem 'Barlow', sans-serif;
  letter-spacing: .01em;
  cursor: pointer;
  transition: background .2s, color .2s, border-color .2s;
}
.hr-btn-primary {
  background: var(--accent); color: #0b1220;
  border: 1px solid var(--accent);
}
.hr-btn-primary:hover { background: #fff; border-color: #fff; }
.hr-btn-secondary {
  background: transparent; color: #fff;
  border: 1px solid rgba(255,255,255,.35);
}
.hr-btn-secondary:hover { border-color: #fff; background: rgba(255,255,255,.08); }

/* Right */
.hr-right { max-width: 430px; width: 100%; justify-self: end; }
.hr-card {
  position: relative;
  height: 540px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.18);
  background: #172033;
  box-shadow: 0 24px 60px rgba(0,0,0,.45);
}
.hr-card-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.hr-card-shade {
  position: absolute; inset: 0;
  background: linear-gradient(0deg, rgba(11,18,32,.75) 0%, rgba(11,18,32,0) 40%);
}
.hr-card-label {
  position: absolute; left: 20px; bottom: 24px;
  display: flex; align-items: center; gap: 10px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 600;
  letter-spacing: .12em; text-transform: uppercase;
  color: #fff;
}
.hr-card-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); transition: background .4s; }
.hr-card-nav { position: absolute; right: 16px; bottom: 16px; display: flex; gap: 8px; }
.hr-card-nav button {
  width: 40px; height: 40px;
  display: grid; place-items: center;
  border-radius: 8px;
  background: rgba(11,18,32,.8);
  border: 1px solid rgba(255,255,255,.28);
  color: #fff; cursor: pointer;
  transition: background .2s, color .2s;
}
.hr-card-nav button:hover { background: #fff; color: #0b1220; }
.hr-card-nav button.is-accent { background: var(--accent); border-color: var(--accent); color: #0b1220; }
.hr-card-nav button.is-accent:hover { background: #fff; border-color: #fff; }

.hr-dots { display: flex; gap: 8px; margin-top: 18px; }
.hr-dots button {
  position: relative; flex: 1; height: 3px; padding: 0;
  border: 0; cursor: pointer; overflow: hidden;
  background: rgba(255,255,255,.25);
}
.hr-dots-fill {
  position: absolute; inset: 0;
  background: var(--accent);
  transform-origin: left;
  animation: hrFill ${SLIDE_MS}ms linear forwards;
}

/* Motion */
.hr-enter { animation: hrIn .6s cubic-bezier(.2,.7,.2,1) both; }
.hr-enter-img { animation: hrImg .7s cubic-bezier(.2,.7,.2,1) both; }
@keyframes hrIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes hrImg { from { opacity: 0; transform: scale(1.04); } to { opacity: 1; transform: none; } }
@keyframes hrFill { from { transform: scaleX(0); } to { transform: scaleX(1); } }

@media (prefers-reduced-motion: reduce) {
  .hr-enter, .hr-enter-img, .hr-dots-fill { animation: none; }
  .hr-dots-fill { transform: none; }
}

@media (max-width: 960px) {
  .hr { padding: 90px 0 50px; min-height: auto; }
  .hr-container { padding: 0 20px; }
  .hr-grid { grid-template-columns: 1fr; gap: 36px; }
  .hr-overlay { background: rgba(11,18,32,.85); }
  .hr-right { justify-self: center; max-width: 100%; width: 100%; }
  .hr-card { height: 380px; max-width: 480px; margin: 0 auto; }
}

@media (max-width: 640px) {
  .hr { padding: 80px 0 40px; }
  .hr-container { padding: 0 16px; }
  .hr-tagrow { gap: 10px; font-size: 0.85rem; margin-bottom: 16px; }
  .hr-rule { width: 24px; }
  .hr-title { font-size: clamp(2rem, 8.5vw, 2.7rem); line-height: 1.1; margin-bottom: 16px; }
  .hr-desc { font-size: 0.98rem; line-height: 1.55; margin-bottom: 18px; }
  .hr-points { gap: 8px; margin-bottom: 24px; }
  .hr-points li { font-size: 0.8rem; padding: 5px 12px; }
  .hr-actions { flex-direction: column; width: 100%; gap: 10px; }
  .hr-btn { width: 100%; justify-content: center; padding: 13px 20px; font-size: 0.95rem; }
  .hr-right { max-width: 100%; }
  .hr-card { height: 320px; border-radius: 14px; }
  .hr-card-label { font-size: 0.86rem; left: 14px; bottom: 16px; }
  .hr-card-nav { right: 12px; bottom: 12px; }
  .hr-card-nav button { width: 34px; height: 34px; }
}
`;