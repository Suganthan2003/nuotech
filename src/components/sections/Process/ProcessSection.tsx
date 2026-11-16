import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    tag: 'LEVEL 1',
    title: 'Understand',
    description:
      'We analyze your exact requirements, operational challenges, machinery constraints, and target business outcomes to establish a clear project blueprint.',
  },
  {
    step: '02',
    tag: 'LEVEL 2',
    title: 'Design',
    description:
      'Our expert engineering team develops comprehensive mechanical, electrical, electronic circuit diagrams & scalable software architecture.',
  },
  {
    step: '03',
    tag: 'LEVEL 3',
    title: 'Prototype',
    description:
      'We build and rigorously test functional working prototypes to validate engineering accuracy and hardware resilience before mass fabrication.',
  },
  {
    step: '04',
    tag: 'LEVEL 4',
    title: 'Automate',
    description:
      'Integration of high-precision smart sensors, microcontrollers, motors, actuators, PLC controls & real-time cloud IoT telemetry dashboards.',
  },
  {
    step: '05',
    tag: 'LEVEL 5',
    title: 'Manufacture',
    description:
      'Full-scale structural assembly, industrial wiring, CNC machining, and precision sheet metal fabrication under strict quality assurance standards.',
  },
  {
    step: '06',
    tag: 'LEVEL 6',
    title: 'Install & Commission',
    description:
      'On-site deployment, field sensor calibration, electrical safety audits, system integration & comprehensive hands-on operator training.',
  },
  {
    step: '07',
    tag: 'LEVEL 7',
    title: 'Support',
    description:
      'Ongoing annual maintenance contracts, proactive system health monitoring, 24/7 emergency troubleshooting & lifetime technical support.',
  },
];

export const ProcessSection: React.FC = () => {
  // Touch devices: tap toggles the flip (one card open at a time).
  // Mouse devices: flipping is handled by CSS :hover, so the click is ignored.
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    const canHover = window.matchMedia?.('(hover: hover)').matches;
    if (canHover) return;
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="process" className="pcs-section">
      <div className="pcs-container">
        {/* Section Header */}
        <div className="pcs-header">
          <h3 className="pcs-kicker">
            <span className="pcs-dot" />
            PROVEN EXECUTION ROADMAP
            <span className="pcs-dot" />
          </h3>

          <h2 className="pcs-title">
            Our 07-Step Product <br />
            <span className="pcs-title-grad">Development Process</span>
          </h2>

          <p className="pcs-sub">
            From initial idea to field installation and lifelong support — we execute every step
            with engineering precision.
          </p>
        </div>

        {/* Roadmap */}
        <div className="pcs-roadmap">
          <div className="pcs-trail" aria-hidden="true" />

          <div className="pcs-grid">
            {STEPS.map((s, idx) => (
              <div
                key={s.step}
                className={`pcs-card ${openIdx === idx ? 'is-flipped' : ''}`}
                role="button"
                tabIndex={0}
                aria-pressed={openIdx === idx}
                aria-label={`${s.title}: ${s.description}`}
                onClick={() => handleToggle(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setOpenIdx((prev) => (prev === idx ? null : idx));
                  }
                }}
              >
                <div className="pcs-inner">
                  {/* FRONT */}
                  <div className="pcs-face pcs-front">
                    <div className="pcs-badge">
                      {idx < STEPS.length - 1 ? <ArrowRight size={14} /> : <CheckCircle2 size={14} />}
                    </div>

                    <div>
                      <div className="pcs-row">
                        <span className="pcs-num">{s.step}</span>
                        <span className="pcs-tag">{s.tag}</span>
                      </div>
                      <h4 className="pcs-card-title">{s.title}</h4>
                      <p className="pcs-desc">{s.description}</p>
                    </div>

                    <div className="pcs-footer">
                      <span className="pcs-phase">PHASE {s.step}</span>
                      <span className="pcs-hint">
                        <span className="pcs-hint-hover">Hover</span>
                        <span className="pcs-hint-touch">Tap</span>
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>

                  {/* BACK: green hologram */}
                  <div className="pcs-face pcs-back">
                    <span className="pcs-scan" aria-hidden="true" />
                    <span className="pcs-sweep" aria-hidden="true" />
                    <div className="pcs-back-content">
                      <div className="pcs-row">
                        <span className="pcs-num pcs-num-g">{s.step}</span>
                        <span className="pcs-tag pcs-tag-g">{s.tag}</span>
                      </div>
                      <h4 className="pcs-card-title pcs-title-g">{s.title}</h4>
                      <p className="pcs-desc-full">{s.description}</p>
                      <div className="pcs-footer pcs-footer-g">
                        <span className="pcs-phase pcs-phase-g">PHASE {s.step}</span>
                        <CheckCircle2 size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .pcs-section {
          position: relative; overflow: hidden; color: #fff;
          padding: clamp(48px, 7vw, 80px) 0 clamp(56px, 8vw, 96px);
          background: #070C16;
          background-image: radial-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px);
          background-size: 24px 24px;
          font-family: Inter, system-ui, -apple-system, 'Segoe UI', sans-serif;
        }
        .pcs-section *, .pcs-section *::before, .pcs-section *::after { box-sizing: border-box; }
        .pcs-container { position: relative; z-index: 1; max-width: 1440px; margin: 0 auto; padding: 0 clamp(16px, 3vw, 32px); }

        /* Header */
        .pcs-header { text-align: center; max-width: 900px; margin: 0 auto clamp(28px, 4vw, 48px); }
        .pcs-kicker {
          display: inline-flex; align-items: center; gap: 12px; margin: 0 0 14px;
          font-size: clamp(.78rem, 1.6vw, 1.1rem); font-weight: 900; letter-spacing: .2em; text-transform: uppercase; color: #fff;
        }
        .pcs-dot { width: 9px; height: 9px; border-radius: 50%; background: #38BDF8; box-shadow: 0 0 10px #38BDF8; flex: 0 0 9px; }
        .pcs-title { font-size: clamp(1.9rem, 4.2vw, 3.1rem); font-weight: 800; line-height: 1.15; letter-spacing: -.5px; margin: 0 0 14px; color: #fff; }
        .pcs-title-grad { background: linear-gradient(135deg, #38BDF8 0%, #06B6D4 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .pcs-sub { color: #94A3B8; font-size: clamp(.95rem, 1.5vw, 1.08rem); line-height: 1.6; margin: 0; }

        /* Roadmap */
        .pcs-roadmap { position: relative; width: 100%; }
        .pcs-trail {
          position: absolute; top: 50%; left: 2%; right: 2%; height: 3px; transform: translateY(-10px); z-index: 0;
          background: rgba(56, 189, 248, .35); box-shadow: 0 0 10px rgba(6, 182, 212, .4); border-radius: 4px;
        }
        .pcs-grid { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(7, 1fr); gap: 14px; }

        /* Flip card */
        .pcs-card { perspective: 1200px; display: grid; min-height: 300px; cursor: pointer; outline: none; -webkit-tap-highlight-color: transparent; }
        .pcs-card:focus-visible { outline: 2px solid #34D399; outline-offset: 4px; border-radius: 20px; }
        .pcs-inner {
          position: relative; width: 100%; display: grid;
          transform-style: preserve-3d; transition: transform .75s cubic-bezier(.4, .2, .2, 1);
        }
        .pcs-card.is-flipped .pcs-inner,
        .pcs-card:focus-visible .pcs-inner { transform: rotateY(180deg); }
        @media (hover: hover) {
          .pcs-card:hover .pcs-inner { transform: rotateY(180deg); }
          .pcs-card:hover .pcs-front { border-color: #34D399; }
        }

        .pcs-face {
          position: relative; grid-area: 1 / 1; min-height: 0; border-radius: 20px; overflow: hidden;
          backface-visibility: hidden; -webkit-backface-visibility: hidden;
          padding: 20px 16px; display: flex; flex-direction: column; justify-content: space-between;
        }

        /* Front (blue) */
        .pcs-front {
          background: linear-gradient(180deg, rgba(14, 25, 48, .96) 0%, rgba(8, 15, 28, .98) 100%);
          border: 1.5px solid rgba(6, 182, 212, .4); box-shadow: 0 10px 28px rgba(0, 0, 0, .65);
          transition: border-color .3s ease;
        }
        .pcs-badge {
          position: absolute; top: 0; right: 0; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
          background: rgba(6, 182, 212, .15); color: #38BDF8; border-bottom-left-radius: 14px;
          border-left: 1px solid rgba(6, 182, 212, .35); border-bottom: 1px solid rgba(6, 182, 212, .35);
        }
        .pcs-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding-right: 26px; }
        .pcs-num { font-family: var(--font-heading, inherit); font-size: 1.9rem; font-weight: 900; line-height: 1; color: #38BDF8; text-shadow: 0 0 12px rgba(56, 189, 248, .5); }
        .pcs-tag {
          font-size: .6rem; font-weight: 800; letter-spacing: .5px; padding: 4px 9px; border-radius: 999px;
          background: rgba(6, 182, 212, .16); color: #38BDF8; border: 1px solid rgba(6, 182, 212, .45);
        }
        .pcs-card-title { margin: 0 0 10px; font-size: 1.12rem; font-weight: 800; color: #fff; line-height: 1.25; letter-spacing: -.3px; }
        .pcs-desc {
          margin: 0; font-size: .82rem; line-height: 1.5; color: #94A3B8;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        .pcs-footer {
          display: flex; align-items: center; justify-content: space-between; padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, .1); color: #38BDF8;
        }
        .pcs-phase { font-size: .66rem; font-weight: 800; letter-spacing: 1px; color: #64748B; }
        .pcs-hint { display: inline-flex; align-items: center; gap: 4px; font-size: .64rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #38BDF8; }
        .pcs-hint-touch { display: none; }
        @media (hover: none) {
          .pcs-hint-hover { display: none; }
          .pcs-hint-touch { display: inline; }
        }

        /* Back: GREEN HOLOGRAM */
        .pcs-back {
          transform: rotateY(180deg); color: #D1FAE5;
          background:
            radial-gradient(circle at 25% 0%, rgba(34, 255, 136, .28), transparent 55%),
            linear-gradient(rgba(52, 211, 153, .08) 1px, transparent 1px) 0 0 / 18px 18px,
            linear-gradient(90deg, rgba(52, 211, 153, .08) 1px, transparent 1px) 0 0 / 18px 18px,
            linear-gradient(180deg, #03180F 0%, #05301E 100%);
          border: 1.5px solid rgba(52, 211, 153, .85);
          box-shadow: 0 0 26px rgba(34, 255, 136, .38), inset 0 0 34px rgba(34, 255, 136, .14);
        }
        .pcs-scan {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: repeating-linear-gradient(0deg, rgba(110, 255, 180, .08) 0 1px, transparent 1px 3px);
        }
        .pcs-sweep {
          position: absolute; left: 0; right: 0; top: -45%; height: 45%; pointer-events: none; z-index: 1;
          background: linear-gradient(180deg, transparent, rgba(110, 255, 180, .28), transparent);
          animation: pcs-sweep 3.2s linear infinite;
        }
        .pcs-back-content {
          position: relative; z-index: 2; flex: 1; display: flex; flex-direction: column; justify-content: space-between;
          animation: pcs-flicker 4s infinite;
        }
        .pcs-num-g { color: #6EE7B7; text-shadow: 0 0 14px rgba(52, 255, 160, .85); }
        .pcs-tag-g { background: rgba(52, 211, 153, .16); color: #6EE7B7; border-color: rgba(52, 211, 153, .55); }
        .pcs-title-g { color: #ECFDF5; text-shadow: 0 0 10px rgba(52, 255, 160, .6); }
        .pcs-desc-full { margin: 0 0 14px; font-size: .8rem; line-height: 1.5; color: #D1FAE5; flex: 1 0 auto; overflow: visible; }
        .pcs-footer-g { color: #6EE7B7; border-top-color: rgba(52, 211, 153, .4); }
        .pcs-phase-g { color: #6EE7B7; text-shadow: 0 0 8px rgba(52, 255, 160, .6); }

        @keyframes pcs-sweep { from { transform: translateY(0); } to { transform: translateY(330%); } }
        @keyframes pcs-flicker { 0%, 100% { opacity: 1; } 92% { opacity: 1; } 94% { opacity: .82; } 96% { opacity: 1; } 98% { opacity: .9; } }

        /* Large tablet / small laptop */
        @media (max-width: 1199px) {
          .pcs-trail { display: none; }
          .pcs-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; }
          .pcs-card { min-height: 280px; }
        }
        /* Tablet portrait */
        @media (max-width: 900px) {
          .pcs-grid { grid-template-columns: repeat(2, 1fr); }
          .pcs-card:last-child:nth-child(odd) { grid-column: 1 / -1; width: calc(50% - 8px); justify-self: center; }
          .pcs-card { min-height: 260px; }
          .pcs-card-title { font-size: 1.2rem; }
          .pcs-desc, .pcs-desc-full { font-size: .88rem; }
        }
        /* Phone */
        @media (max-width: 560px) {
          .pcs-grid { grid-template-columns: 1fr; gap: 14px; }
          .pcs-card:last-child:nth-child(odd) { width: 100%; }
          .pcs-card { min-height: 230px; }
          .pcs-kicker { letter-spacing: .12em; gap: 8px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pcs-inner { transition-duration: .01s; }
          .pcs-sweep, .pcs-back-content { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default ProcessSection;