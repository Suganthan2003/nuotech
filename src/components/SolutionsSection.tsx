import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sprout, Cpu, Sun, ShieldCheck, CircuitBoard,
  Bot, Activity, Zap, ChevronLeft, ChevronRight,
  Wrench, GraduationCap, Headset, ArrowRight
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  SMARTOI BRAND PALETTE (taken from the logo)                        */
/*  navy  = SMART letters, blue = "T" + dot, green = triangle + power  */
/* ------------------------------------------------------------------ */
const BRAND = {
  navy: '#14398F',
  blue: '#0B5BD3',
  sky: '#2F80ED',
  green: '#3AA935',
  greenDark: '#1F8A3B',
  teal: '#0E8F8A',
  ink: '#0B1B3F',
  text: '#44546F',
  line: '#DCE6F5',
  bg: '#F5F9FF'
};

interface SolutionsSectionProps {
  openQuoteModalWithSolution?: (solutionTitle: string) => void;
}

type IconType = React.ComponentType<{ size?: number; style?: React.CSSProperties }>;

interface SectorItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
  gradient: string;
  features: { icon: IconType; label: string }[];
}

const SOLUTIONS_DATA: SectorItem[] = [
  {
    id: 'smart-living-solutions',
    title: 'Smart Living Solutions',
    category: 'Smart Living & Automation',
    tagline: 'Smart switches, touch lights, CCTV security & keyless door locks',
    description:
      'Transform your home and commercial spaces with integrated touch switches, app-controlled lighting, high-definition CCTV security cameras, and automated door locks.',
    image: '/img/p1.png',
    accentColor: BRAND.blue,
    gradient: `linear-gradient(135deg, ${BRAND.blue}, ${BRAND.navy})`,
    features: [
      { icon: Zap, label: 'Smart Switches' },
      { icon: Sun, label: 'Smart Lights' },
      { icon: ShieldCheck, label: 'CCTV' },
      { icon: Bot, label: 'Smart Door Locks' }
    ]
  },
  {
    id: 'industrial-automation',
    title: 'Industrial Automation',
    category: 'Industrial Automation',
    tagline: 'Gate automation, smart irrigation, custom products & industrial training',
    description:
      'Comprehensive industrial automation including heavy-duty motorized gate systems, automated agricultural irrigation, specialized custom electronics, and technical field training.',
    image: '/img/a1.png',
    accentColor: BRAND.navy,
    gradient: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.ink})`,
    features: [
      { icon: Zap, label: 'Gate Automation' },
      { icon: Sprout, label: 'Smart Irrigation System' },
      { icon: Cpu, label: 'Custom Products' },
      { icon: Activity, label: 'Industrial Training' }
    ]
  },
  {
    id: 'solar-solution',
    title: 'Solar Solution',
    category: 'Renewable Solar Energy',
    tagline: 'Residential rooftop solar, BLDC pumps, outdoor lights & commercial solar',
    description:
      'Clean renewable power solutions ranging from 1-10kW residential rooftop solar PV to high-efficiency BLDC agricultural pump motors, solar outdoor illumination, and 10-100kW commercial solar plants.',
    image: '/img/b1.png',
    accentColor: BRAND.greenDark,
    gradient: `linear-gradient(135deg, ${BRAND.green}, ${BRAND.greenDark})`,
    features: [
      { icon: Sun, label: '1 - 10 kW Residential Solar' },
      { icon: Zap, label: 'BLDC Pump Motors' },
      { icon: Sun, label: 'Solar Outdoor Lights' },
      { icon: Sun, label: '10 - 100 kW Commercial Solar' }
    ]
  },
  {
    id: 'skill-development',
    title: 'Skill Development',
    category: 'Skill Development & Tech',
    tagline: 'Drone assembly, PCB design, CAD/CAM modeling & AI robotics training',
    description:
      'Hands-on engineering skill development programs covering agricultural drone manufacturing, multi-layer PCB design, 3D CAD/CAM mechanics, and advanced AI & robotics development.',
    image: '/img/c1.png',
    accentColor: BRAND.teal,
    gradient: `linear-gradient(135deg, ${BRAND.teal}, ${BRAND.blue})`,
    features: [
      { icon: Bot, label: 'Drone' },
      { icon: CircuitBoard, label: 'PCB Design' },
      { icon: Cpu, label: 'CAD / CAM' },
      { icon: Bot, label: 'AI & Robotics' }
    ]
  },
  {
    id: 'robot-services',
    title: 'Robot Services',
    category: 'Robot Services',
    tagline: 'Autonomous service robots & interactive greeting robots',
    description:
      'Innovative service robotics engineered for hospitality, commercial venues, customer reception, automated serving, and interactive public engagement.',
    image: '/img/d1.png',
    accentColor: BRAND.sky,
    gradient: `linear-gradient(135deg, ${BRAND.sky}, ${BRAND.navy})`,
    features: [
      { icon: Bot, label: 'Serve Robot' },
      { icon: Bot, label: 'Greeting Robot' }
    ]
  },
  {
    id: 'fabrication',
    title: 'Fabrication',
    category: 'Manufacturing & Fabrication',
    tagline: '3D printing, laser cutting, CNC machining, bending & powder coating',
    description:
      'Precision metal and non-metal fabrication services including additive 3D printing, high-speed laser cutting, lathe & DRO machining, hydraulic bending, powder coating, and 3D parts finishing.',
    image: '/img/e1.png',
    accentColor: BRAND.green,
    gradient: `linear-gradient(135deg, ${BRAND.green}, ${BRAND.teal})`,
    features: [
      { icon: Cpu, label: '3D Print' },
      { icon: Zap, label: 'Metal / Non-Metal Laser Cutting' },
      { icon: Activity, label: 'DRO / Lathe / Machining' },
      { icon: ShieldCheck, label: 'Machine Bending' },
      { icon: Sun, label: 'Powder Coating' },
      { icon: Cpu, label: '3D Parts Painting' }
    ]
  }
];

const TILE_ICONS: IconType[] = [Zap, Cpu, Sun, CircuitBoard, Bot, Wrench];

const WHY_US = [
  {
    icon: Wrench,
    title: 'Custom engineered',
    text: 'Every system is designed around your site, your budget and your goals.'
  },
  {
    icon: Headset,
    title: 'Install & support',
    text: 'From site survey to commissioning and after-sales service, one team handles it.'
  },
  {
    icon: GraduationCap,
    title: 'Hands-on training',
    text: 'Learn drones, PCB design, CAD/CAM and robotics from working engineers.'
  }
];

const totalFeatures = SOLUTIONS_DATA.reduce((n, s) => n + s.features.length, 0);
const MARQUEE_ITEMS = SOLUTIONS_DATA.flatMap((s) => s.features.map((f) => f.label));

/** Encode file names that contain spaces / brackets so images always load */
const safeSrc = (src: string) => encodeURI(src);

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  openQuoteModalWithSolution
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [paused, setPaused] = useState(false);
  const [stageW, setStageW] = useState(900);
  const [failedImgs, setFailedImgs] = useState<Record<string, boolean>>({});

  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const total = SOLUTIONS_DATA.length;
  const active = SOLUTIONS_DATA[activeIndex];

  const next = useCallback(() => setActiveIndex((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setActiveIndex((p) => (p - 1 + total) % total), [total]);

  /* Auto-rotate: restarts after every change, pauses on hover / focus */
  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const t = setTimeout(next, 4000);
    return () => clearTimeout(t);
  }, [activeIndex, paused, next]);

  /* Measure the stage so the 3D card layout scales on every screen */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setStageW(el.getBoundingClientRect().width);
    update();
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(update);
      ro.observe(el);
      return () => ro.disconnect();
    }
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* Keyboard navigation only while the section has focus */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  /* 3D tilt (mouse only) */
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (stageW < 700 || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    setTilt({ rotateY: (x / r.width) * 14, rotateX: (-y / r.height) * 14 });
  };
  const onMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

  /* Swipe support for phones / tablets */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    }
    touchStartX.current = null;
    setPaused(false);
  };

  /* Responsive card geometry */
  const cardW = stageW < 420 ? 210 : stageW < 640 ? 235 : stageW < 900 ? 255 : 270;
  const cardH = Math.round(cardW * 1.39);
  const gap1 = Math.min(cardW * 1.0, stageW * 0.3);
  const gap2 = gap1 * 1.7;
  const showFar = stageW >= 640;
  const showNear = stageW >= 440;

  const getCardStyle = (index: number): React.CSSProperties => {
    let diff = (index - activeIndex + total) % total;
    if (diff > total / 2) diff -= total;

    if (diff === 0) {
      return {
        transform: `translate(-50%, -50%) scale(1.08) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        zIndex: 40,
        opacity: 1,
        boxShadow: `0 24px 48px rgba(11, 27, 63, 0.22), 0 0 30px ${BRAND.blue}33`
      };
    }
    if (Math.abs(diff) === 1) {
      return {
        transform: `translate(-50%, -50%) translateX(${diff * gap1}px) scale(0.86) rotateY(${-diff * 25}deg)`,
        zIndex: 25,
        opacity: showNear ? 0.65 : 0,
        filter: 'brightness(0.88)',
        pointerEvents: showNear ? 'auto' : 'none',
        boxShadow: '0 12px 30px rgba(11, 27, 63, 0.12)'
      };
    }
    if (Math.abs(diff) === 2) {
      return {
        transform: `translate(-50%, -50%) translateX(${Math.sign(diff) * gap2}px) scale(0.7) rotateY(${-Math.sign(diff) * 38}deg)`,
        zIndex: 10,
        opacity: showFar ? 0.25 : 0,
        filter: 'brightness(0.8) blur(1.5px)',
        pointerEvents: showFar ? 'auto' : 'none'
      };
    }
    return {
      transform: `translate(-50%, -50%) translateX(${Math.sign(diff) * gap2 * 1.3}px) scale(0.5)`,
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none'
    };
  };

  const openQuote = () => openQuoteModalWithSolution?.(active.title);

  return (
    <section
      id="solutions"
      className="sol"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Smartoi solution sectors"
    >
      <div className="sol__bg" aria-hidden="true" />
      <div className="sol__grid" aria-hidden="true" />

      <div className="sol__container">
        {/* ---------- Header ---------- */}
        <header className="sol__head">
          <span className="sol__badge">{total} core solution sectors</span>
          <h2 className="sol__title">
            Transforming Engineering into <span>Intelligent Solutions</span>
          </h2>
          <p className="sol__lead">
            From smart homes and solar plants to robots and fabrication, Smartoi designs,
            builds and supports technology that works the way you do.
          </p>
        </header>

        {/* ---------- Stats strip ---------- */}
        <ul className="sol__stats">
          <li><strong>{total}</strong><span>Solution sectors</span></li>
          <li><strong>{totalFeatures}</strong><span>Products & services</span></li>
          <li><strong>1</strong><span>Team, design to service</span></li>
          <li><strong>Custom</strong><span>Built for your site</span></li>
        </ul>

        {/* ---------- Sector tiles ---------- */}
        <div className="sol__tiles" role="tablist" aria-label="Choose a sector">
          {SOLUTIONS_DATA.map((s, idx) => {
            const Icon = TILE_ICONS[idx];
            const on = idx === activeIndex;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActiveIndex(idx)}
                className={`sol__tile${on ? ' is-active' : ''}`}
                style={{ ['--c' as string]: s.accentColor }}
              >
                <span className="sol__tile-top">
                  <span className="sol__tile-no">0{idx + 1}</span>
                  <Icon size={18} />
                </span>
                <span className="sol__tile-name">{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* ---------- Slider + info ---------- */}
        <div className="sol__main">
          <div
            ref={stageRef}
            className="sol__stage"
            style={{ height: cardH + 60 }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button className="sol__arrow sol__arrow--l" onClick={prev} aria-label="Previous sector">
              <ChevronLeft size={22} />
            </button>
            <button className="sol__arrow sol__arrow--r" onClick={next} aria-label="Next sector">
              <ChevronRight size={22} />
            </button>

            {SOLUTIONS_DATA.map((s, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={s.id}
                  className="sol__card"
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    width: cardW,
                    height: cardH,
                    border: isActive ? `2.5px solid ${s.accentColor}` : `1px solid ${BRAND.line}`,
                    background: s.gradient,
                    ...getCardStyle(idx)
                  }}
                >
                  {!failedImgs[s.id] && (
                    <img
                      src={safeSrc(s.image)}
                      alt={s.title}
                      loading="lazy"
                      draggable={false}
                      onError={() => setFailedImgs((f) => ({ ...f, [s.id]: true }))}
                    />
                  )}
                  <span className="sol__card-cat" style={{ color: s.accentColor, borderColor: `${s.accentColor}66` }}>
                    {s.category}
                  </span>
                  <div className="sol__card-foot">
                    <small>Sector 0{idx + 1}</small>
                    <b>{s.title}</b>
                  </div>
                </div>
              );
            })}
          </div>

          <article className="sol__panel" style={{ ['--c' as string]: active.accentColor }} aria-live="polite">
            <div className="sol__panel-top">
              <span className="sol__panel-cat">{active.category}</span>
              <span className="sol__panel-count">0{activeIndex + 1} / 0{total}</span>
            </div>
            <h3>{active.title}</h3>
            <p className="sol__panel-tag">{active.tagline}</p>
            <p className="sol__panel-desc">{active.description}</p>

            <ul className="sol__feats">
              {active.features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <li key={`${active.id}-${i}`}>
                    <Icon size={18} style={{ color: active.accentColor, flexShrink: 0 }} />
                    <span>{f.label}</span>
                  </li>
                );
              })}
            </ul>

            <button className="sol__cta" onClick={openQuote} style={{ background: active.gradient }}>
              Get a quote for {active.title}
              <ArrowRight size={18} />
            </button>
          </article>
        </div>

        {/* ---------- Dots ---------- */}
        <div className="sol__dots">
          {SOLUTIONS_DATA.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to ${s.title}`}
              className={idx === activeIndex ? 'is-active' : ''}
            />
          ))}
        </div>

        {/* ---------- Why Smartoi ---------- */}
        <div className="sol__why">
          {WHY_US.map((w) => {
            const Icon = w.icon;
            return (
              <div className="sol__why-item" key={w.title}>
                <span className="sol__why-icon"><Icon size={22} /></span>
                <div>
                  <h4>{w.title}</h4>
                  <p>{w.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------- Marquee (brand colours) ---------- */}
      <div className="sol__marquee" aria-hidden="true">
        <div className="sol__marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>
      </div>

      <style>{`
        .sol, .sol * { box-sizing: border-box; }
        .sol {
          --navy: ${BRAND.navy}; --blue: ${BRAND.blue}; --green: ${BRAND.green};
          --ink: ${BRAND.ink}; --text: ${BRAND.text}; --line: ${BRAND.line};
          position: relative; overflow: hidden; outline: none;
          padding: 90px 0 0; background: #fff; color: var(--ink);
          user-select: none; -webkit-user-select: none;
        }
        .sol__bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(circle at 12% 20%, ${BRAND.blue}12 0%, transparent 45%),
            radial-gradient(circle at 88% 80%, ${BRAND.green}14 0%, transparent 45%);
        }
        .sol__grid {
          position: absolute; inset: 0; pointer-events: none; opacity: .6;
          background-image:
            linear-gradient(to right, ${BRAND.navy}08 1px, transparent 1px),
            linear-gradient(to bottom, ${BRAND.navy}08 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .sol__container { position: relative; z-index: 2; max-width: 1400px; margin: 0 auto; padding: 0 24px; }

        /* header */
        .sol__head { text-align: center; max-width: 820px; margin: 0 auto 30px; }
        .sol__badge {
          display: inline-block; margin-bottom: 16px; padding: 8px 20px;
          font-size: .85rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
          color: var(--blue); background: ${BRAND.blue}10;
          border: 1.5px solid ${BRAND.blue}40; border-left: 4px solid var(--green); border-radius: 4px;
        }
        .sol__title {
          margin: 0 0 14px; font-size: clamp(1.8rem, 4vw, 3.2rem); font-weight: 800;
          line-height: 1.2; letter-spacing: -.5px; color: var(--navy);
        }
        .sol__title span {
          background: linear-gradient(90deg, var(--blue), var(--green));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .sol__lead { margin: 0 auto; max-width: 640px; color: var(--text); font-size: 1rem; line-height: 1.65; }

        /* stats */
        .sol__stats {
          list-style: none; margin: 0 auto 34px; padding: 0; max-width: 900px;
          display: grid; grid-template-columns: repeat(4, 1fr);
          border: 1px solid var(--line); border-radius: 14px; background: #fff;
          box-shadow: 0 10px 30px ${BRAND.navy}0F; overflow: hidden;
        }
        .sol__stats li { padding: 16px 12px; text-align: center; border-right: 1px solid var(--line); }
        .sol__stats li:last-child { border-right: 0; }
        .sol__stats strong { display: block; font-size: 1.5rem; font-weight: 800; color: var(--blue); line-height: 1.2; }
        .sol__stats li:nth-child(even) strong { color: var(--green); }
        .sol__stats span { font-size: .8rem; color: var(--text); font-weight: 600; }

        /* tiles */
        .sol__tiles { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; margin-bottom: 34px; }
        .sol__tile {
          --c: ${BRAND.blue};
          display: flex; flex-direction: column; justify-content: space-between; gap: 10px;
          min-height: 88px; padding: 14px 12px; text-align: left; cursor: pointer;
          background: linear-gradient(145deg, #fff 40%, color-mix(in srgb, var(--c) 10%, #fff) 100%);
          border: 1.5px solid color-mix(in srgb, var(--c) 28%, transparent);
          border-top: 3.5px solid var(--c); border-radius: 8px; color: var(--c);
          box-shadow: 0 2px 8px ${BRAND.navy}0F;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
          font-family: inherit;
        }
        .sol__tile:hover { transform: translateY(-2px); box-shadow: 0 8px 18px ${BRAND.navy}1F; }
        .sol__tile.is-active {
          transform: translateY(-4px); border-color: var(--c);
          box-shadow: 0 10px 24px color-mix(in srgb, var(--c) 35%, transparent);
        }
        .sol__tile:focus-visible, .sol__arrow:focus-visible, .sol__cta:focus-visible, .sol__dots button:focus-visible {
          outline: 3px solid var(--green); outline-offset: 2px;
        }
        .sol__tile-top { display: flex; align-items: center; justify-content: space-between; width: 100%; }
        .sol__tile-no {
          font-family: monospace; font-size: .75rem; font-weight: 800; letter-spacing: 1px;
          padding: 2px 7px; border-radius: 3px;
          background: color-mix(in srgb, var(--c) 12%, #fff); color: var(--c);
        }
        .sol__tile.is-active .sol__tile-no { background: var(--c); color: #fff; }
        .sol__tile-name { font-size: .88rem; font-weight: 700; line-height: 1.25; color: var(--ink); }

        /* main layout */
        .sol__main { display: grid; grid-template-columns: 1.2fr .8fr; gap: 36px; align-items: center; }
        .sol__stage {
          position: relative; width: 100%; min-width: 0; perspective: 1200px;
          touch-action: pan-y; /* allow vertical scroll, we handle horizontal swipe */
        }
        .sol__arrow {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 50;
          width: 44px; height: 44px; border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          background: #fff; color: var(--navy); border: 1.5px solid var(--line);
          box-shadow: 0 6px 20px ${BRAND.navy}1F; transition: all .25s ease;
        }
        .sol__arrow--l { left: 0; } .sol__arrow--r { right: 0; }
        .sol__arrow:hover { background: var(--blue); color: #fff; border-color: var(--blue); }

        .sol__card {
          position: absolute; top: 50%; left: 50%; border-radius: 22px; overflow: hidden; cursor: pointer;
          transform-style: preserve-3d; will-change: transform;
          transition: transform .6s cubic-bezier(.25,1,.5,1), opacity .6s ease, filter .6s ease, box-shadow .6s ease;
        }
        .sol__card img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .sol__card-cat {
          position: absolute; top: 14px; left: 14px; max-width: calc(100% - 28px);
          padding: 4px 10px; border: 1px solid; border-radius: 12px; background: #fff;
          font-size: .62rem; font-weight: 800; letter-spacing: .8px; text-transform: uppercase;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          box-shadow: 0 4px 12px rgba(0,0,0,.15); pointer-events: none;
        }
        .sol__card-foot {
          position: absolute; left: 0; right: 0; bottom: 0; padding: 18px 16px 14px; pointer-events: none;
          background: linear-gradient(to top, ${BRAND.ink}EB 0%, ${BRAND.ink}A6 70%, transparent 100%);
        }
        .sol__card-foot small { display: block; font-size: .7rem; font-weight: 600; color: #A9C3EC; margin-bottom: 2px; }
        .sol__card-foot b { display: block; font-size: 1.02rem; font-weight: 800; color: #fff; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* info panel */
        .sol__panel {
          --c: ${BRAND.blue}; min-width: 0;
          background: #fff; border: 1.5px solid var(--line); border-top: 5px solid var(--c);
          border-radius: 24px; padding: 32px; position: relative;
          box-shadow: 0 20px 50px ${BRAND.navy}14, 0 0 25px ${BRAND.blue}0F;
          transition: border-color .4s ease;
        }
        .sol__panel-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
        .sol__panel-cat { font-size: .76rem; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--c); }
        .sol__panel-count { flex-shrink: 0; font-size: .8rem; font-weight: 800; color: var(--text); background: ${BRAND.bg}; padding: 4px 12px; border-radius: 20px; }
        .sol__panel h3 { margin: 0 0 8px; font-size: clamp(1.4rem, 2.4vw, 1.8rem); font-weight: 800; line-height: 1.25; color: var(--navy); }
        .sol__panel-tag { margin: 0 0 12px; font-size: .94rem; font-weight: 600; color: var(--c); }
        .sol__panel-desc { margin: 0 0 20px; font-size: .94rem; line-height: 1.6; color: var(--text); }
        .sol__feats { list-style: none; margin: 0 0 22px; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .sol__feats li {
          display: flex; align-items: center; gap: 12px; padding: 11px 16px; border-radius: 12px;
          background: ${BRAND.bg}; border: 1px solid var(--line);
        }
        .sol__feats span { font-size: .92rem; font-weight: 600; color: var(--ink); }
        .sol__cta {
          width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 14px 20px; border: 0; border-radius: 12px; cursor: pointer;
          color: #fff; font: 700 .95rem/1.2 inherit; font-family: inherit; text-align: center;
          box-shadow: 0 10px 22px ${BRAND.navy}33; transition: transform .2s ease, filter .2s ease;
        }
        .sol__cta:hover { transform: translateY(-2px); filter: brightness(1.08); }

        /* dots */
        .sol__dots { display: flex; justify-content: center; gap: 8px; margin: 34px 0 44px; }
        .sol__dots button {
          width: 8px; height: 8px; padding: 0; border: 0; border-radius: 4px; cursor: pointer;
          background: #C3D3EE; transition: all .25s ease;
        }
        .sol__dots button.is-active { width: 28px; background: linear-gradient(90deg, var(--blue), var(--green)); }

        /* why us */
        .sol__why { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-bottom: 56px; }
        .sol__why-item {
          display: flex; gap: 14px; align-items: flex-start; padding: 20px;
          border: 1px solid var(--line); border-radius: 16px; background: #fff;
          box-shadow: 0 6px 18px ${BRAND.navy}0D;
        }
        .sol__why-icon {
          flex-shrink: 0; width: 46px; height: 46px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center; color: #fff;
          background: linear-gradient(135deg, var(--blue), var(--green));
        }
        .sol__why-item h4 { margin: 0 0 4px; font-size: 1rem; font-weight: 800; color: var(--navy); }
        .sol__why-item p { margin: 0; font-size: .88rem; line-height: 1.55; color: var(--text); }

        /* marquee */
        .sol__marquee {
          position: relative; z-index: 2; overflow: hidden; padding: 16px 0;
          background: linear-gradient(90deg, var(--navy), var(--blue) 55%, ${BRAND.greenDark});
        }
        .sol__marquee-track { display: flex; width: max-content; animation: sol-scroll 40s linear infinite; }
        .sol__marquee:hover .sol__marquee-track { animation-play-state: paused; }
        .sol__marquee span {
          display: inline-flex; align-items: center; white-space: nowrap; padding: 0 22px;
          color: #fff; font-size: .9rem; font-weight: 700; letter-spacing: .5px;
        }
        .sol__marquee span::after {
          content: ''; width: 8px; height: 8px; margin-left: 44px; background: var(--green);
          clip-path: polygon(50% 0, 100% 100%, 0 100%); /* little triangle from the logo */
        }
        @keyframes sol-scroll { to { transform: translateX(-50%); } }

        /* ---------- responsive ---------- */
        @media (max-width: 1100px) {
          .sol__tiles { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 992px) {
          .sol { padding-top: 60px; }
          .sol__main { grid-template-columns: 1fr; gap: 28px; }
          .sol__why { grid-template-columns: 1fr; gap: 14px; }
          .sol__panel { max-width: 680px; margin: 0 auto; width: 100%; }
        }
        @media (max-width: 768px) {
          .sol__stats { grid-template-columns: repeat(2, 1fr); }
          .sol__stats li:nth-child(2) { border-right: 0; }
          .sol__stats li:nth-child(-n+2) { border-bottom: 1px solid var(--line); }
          .sol__tiles { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .sol { padding-top: 44px; }
          .sol__container { padding: 0 16px; }
          .sol__badge { font-size: 0.72rem; letter-spacing: 1.2px; padding: 6px 14px; }
          .sol__title { font-size: 1.6rem; line-height: 1.25; }
          .sol__lead { font-size: 0.88rem; line-height: 1.5; margin-bottom: 20px; }
          .sol__stats { margin-bottom: 24px; }
          .sol__stats li { padding: 10px 8px; }
          .sol__stats strong { font-size: 1.35rem; }
          .sol__stats span { font-size: 0.75rem; }
          .sol__tiles { grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 20px; }
          .sol__tile { min-height: 72px; padding: 10px 8px; border-radius: 10px; }
          .sol__tile-name { font-size: 0.78rem; line-height: 1.2; }
          .sol__panel { padding: 20px 16px; border-radius: 18px; }
          .sol__panel h3 { font-size: 1.3rem; }
          .sol__panel-tag { font-size: 0.84rem; margin-bottom: 10px; }
          .sol__panel-desc { font-size: 0.86rem; line-height: 1.5; margin-bottom: 16px; }
          .sol__feats { gap: 8px; margin-bottom: 18px; }
          .sol__feats li { padding: 9px 12px; gap: 10px; }
          .sol__feats span { font-size: 0.84rem; }
          .sol__cta { padding: 12px 16px; font-size: 0.88rem; border-radius: 10px; }
          .sol__arrow { width: 36px; height: 36px; }
          .sol__dots { margin: 20px 0 28px; }
          .sol__why { margin-bottom: 36px; }
          .sol__why-item { padding: 14px; gap: 12px; border-radius: 14px; }
          .sol__why-icon { width: 40px; height: 40px; border-radius: 10px; }
          .sol__why-item h4 { font-size: 0.92rem; }
          .sol__why-item p { font-size: 0.82rem; }
          .sol__marquee span { font-size: .8rem; padding: 0 14px; }
          .sol__marquee span::after { margin-left: 24px; }
        }
        @media (max-width: 420px) {
          .sol__tiles { grid-template-columns: 1fr 1fr; gap: 6px; }
          .sol__tile { min-height: 68px; padding: 8px 6px; }
          .sol__tile-no { font-size: 0.68rem; padding: 1px 5px; }
          .sol__stats strong { font-size: 1.2rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sol__card, .sol__tile, .sol__cta { transition: none; }
          .sol__marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default SolutionsSection;