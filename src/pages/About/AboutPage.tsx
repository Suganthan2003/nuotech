import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Zap, Award, Settings, Sun, ArrowRight, Cpu, Users, Eye,
  CircuitBoard, ChevronRight, Leaf, ShieldCheck, Wrench, Handshake, Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COMPANY_INFO } from '@/data/nuoData';

// ----------------------------------------------------
// Helpers: in-view detection, scroll reveal, count-up
// ----------------------------------------------------
const useInView = <T extends HTMLElement>(threshold = 0.15) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
};

const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  dir?: 'up' | 'left' | 'right' | 'zoom';
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, dir = 'up', className = '', style }) => {
  const [ref, inView] = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      className={`rv rv-${dir} ${inView ? 'rv-in' : ''} ${className}`}
      style={{ ...style, ['--d' as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const CountUp: React.FC<{
  to: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}> = ({ to, suffix = '', decimals = 0, duration = 2000 }) => {
  const [ref, inView] = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf = 0;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      setVal((1 - Math.pow(1 - p, 4)) * to);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const text = decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toString();
  return (
    <span ref={ref}>
      {text}
      {suffix}
    </span>
  );
};

// ----------------------------------------------------
// Content
// ----------------------------------------------------
const headlineWords = [
  { t: "Let's" }, { t: 'Work' }, { t: 'Together' }, { t: 'to' },
  { t: 'Create', a: true }, { t: 'Wonders', a: true }, { t: 'with' }, { t: 'Us' }
];

const personLeaders = [
  {
    name: 'Saravanan Kumar',
    role: 'Founder & Lead Automation Engineer',
    image: '/img/o1.png',
    skills: [
      { label: 'Industrial Automation', icon: <Cpu size={18} />, color: '#0066FF', shift: -10 },
      { label: 'Solar Energy EPC', icon: <Sun size={18} />, color: '#10B981', shift: 26 },
      { label: 'Custom Machine Building', icon: <Settings size={18} />, color: '#F59E0B', shift: 4 }
    ]
  },
  {
    name: 'Kavitha Saravanan',
    role: 'Co-Founder & Chief Electronics Director',
    image: '/img/o2.png',
    skills: [
      { label: 'IoT & Embedded Robotics', icon: <Zap size={18} />, color: '#0066FF', shift: -10 },
      { label: 'PCB Layout & Hardware', icon: <CircuitBoard size={18} />, color: '#8B5CF6', shift: 30 },
      { label: 'Smart AgTech Systems', icon: <Leaf size={18} />, color: '#10B981', shift: 4 }
    ]
  }
];

const services = [
  { icon: <Cpu size={26} />, color: '#0066FF', title: 'Industrial Automation', text: 'PLC and VFD based control panels, motor drives and machine safety for factories and process lines.' },
  { icon: <Sun size={26} />, color: '#F59E0B', title: 'Solar Energy EPC', text: 'Rooftop PV, solar water heating and agricultural pumps, from design through commissioning.' },
  { icon: <Settings size={26} />, color: '#10B981', title: 'Custom Machine Building', text: 'Special purpose machines designed, fabricated and assembled around your production process.' },
  { icon: <Zap size={26} />, color: '#0284C7', title: 'IoT & Embedded Robotics', text: 'Connected devices, firmware and remote monitoring for homes, farms and plants.' },
  { icon: <CircuitBoard size={26} />, color: '#8B5CF6', title: 'PCB Layout & Hardware', text: 'Board design, prototyping and assembly for products that need dependable custom electronics.' },
  { icon: <Leaf size={26} />, color: '#16A34A', title: 'Smart AgTech Systems', text: 'Automation, sensing and telemetry that help farms save water, power and labour.' }
];

const steps = [
  { n: '01', title: 'Consult & Survey', text: 'We visit the site, study the process and agree scope, budget and timeline.' },
  { n: '02', title: 'Design & Engineer', text: 'Electrical, mechanical and firmware design, with clear drawings before any build starts.' },
  { n: '03', title: 'Build & Install', text: 'In-house assembly, testing and on-site commissioning by our own team.' },
  { n: '04', title: 'Support & Maintain', text: 'Training, handover and 24/7 field maintenance long after go-live.' }
];

const values = [
  { icon: <ShieldCheck size={24} />, title: 'Reliability first', text: 'Every system is tested for demanding field conditions before it leaves our workshop.' },
  { icon: <Wrench size={24} />, title: 'Engineering under one roof', text: 'Design, assembly, firmware and maintenance handled by a single team.' },
  { icon: <Handshake size={24} />, title: 'Honest scope & timelines', text: 'Clear quotes, clear schedules and no surprises on site.' },
  { icon: <Clock size={24} />, title: 'Long-term support', text: 'We stay after commissioning with maintenance, upgrades and spares.' }
];

// ----------------------------------------------------
// Page
// ----------------------------------------------------
export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  // Leader slider (10s auto swap, manual select, restarts timer)
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const changePerson = useCallback(
    (i: number) => {
      if (i === active || fading) return;
      setFading(true);
      swapTimer.current = setTimeout(() => {
        setActive(i);
        setFading(false);
      }, 400);
    },
    [active, fading]
  );

  useEffect(() => {
    const t = setTimeout(() => changePerson((active + 1) % personLeaders.length), 10000);
    return () => clearTimeout(t);
  }, [active, changePerson]);

  useEffect(() => () => {
    if (swapTimer.current) clearTimeout(swapTimer.current);
  }, []);

  const person = personLeaders[active];

  const [processRef, processVisible] = useInView<HTMLDivElement>(0.25);

  return (
    <div className="ab">
      <style>{css}</style>

      {/* ================= HERO ================= */}
      <section className="ab-hero">
        <div className="ab-container">
          <div className="ab-hero-grid">
            {/* Left */}
            <div className="ab-hero-left">
              <p className="ab-eyebrow ab-up" style={{ animationDelay: '0s' }}>
                <span className="ab-eyebrow-dot" />
                <span className="ab-eyebrow-line" />
                About SMARToi
              </p>

              <h1 className="ab-h1">
                {headlineWords.map((w, i) => (
                  <span className="ab-w" key={i}>
                    <span
                      className={w.a ? 'ab-acc' : ''}
                      style={{ animationDelay: `${0.15 + i * 0.08}s` }}
                    >
                      {w.t}
                    </span>
                  </span>
                ))}
              </h1>

              <div className="ab-lead ab-up" style={{ animationDelay: '0.85s' }}>
                <p>
                  <strong>A hands-on engineering team from Karur, Tamil Nadu.</strong> We turn ideas
                  into working systems through industrial automation, solar EPC energy and custom
                  machinery, from the first sketch to field maintenance.
                </p>
              </div>

              <div className="ab-btns ab-up" style={{ animationDelay: '1s' }}>
                <button className="ab-btn ab-btn-primary" onClick={() => navigate('/contact')}>
                  Let's Talk <ArrowRight size={18} />
                </button>
                <button className="ab-btn ab-btn-outline" onClick={() => navigate('/product')}>
                  Start Project <ChevronRight size={18} />
                </button>
              </div>

              <div className="ab-hstats ab-up" style={{ animationDelay: '1.15s' }}>
                <div className="ab-hstat-card ab-hstat-blue">
                  <div className="ab-hstat-top">
                    <span className="ab-hstat-icon"><Award size={18} /></span>
                    <span className="ab-hstat-badge">PROVEN</span>
                  </div>
                  <div className="ab-hstat-num">
                    <CountUp to={10} suffix="+" />
                  </div>
                  <span className="ab-hstat-label">Years experience</span>
                </div>

                <div className="ab-hstat-card ab-hstat-cyan">
                  <div className="ab-hstat-top">
                    <span className="ab-hstat-icon"><Zap size={18} /></span>
                    <span className="ab-hstat-badge">DEPLOYED</span>
                  </div>
                  <div className="ab-hstat-num">
                    <CountUp to={150} suffix="+" />
                  </div>
                  <span className="ab-hstat-label">Projects delivered</span>
                </div>

                <div className="ab-hstat-card ab-hstat-green">
                  <div className="ab-hstat-top">
                    <span className="ab-hstat-icon"><Users size={18} /></span>
                    <span className="ab-hstat-badge">TRUSTED</span>
                  </div>
                  <div className="ab-hstat-num">
                    <CountUp to={98} suffix="%" />
                  </div>
                  <span className="ab-hstat-label">Satisfied clients</span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="ab-hero-right ab-zoom">
              <div className="ab-disc" />
              <div className="ab-ring"><i /></div>

              <div className="ab-person">
                <img
                  src={person.image}
                  alt={person.name}
                  className={fading ? 'is-fading' : ''}
                />

                <div className={`ab-name ${fading ? 'is-fading' : ''}`}>
                  <small>{person.role}</small>
                  <strong>{person.name}</strong>
                </div>
              </div>

              <div className={`ab-chips ${fading ? 'is-fading' : ''}`}>
                {person.skills.map((s, i) => (
                  <div
                    key={`${active}-${i}`}
                    className="ab-chip-wrap"
                    style={{ animationDelay: `${0.3 + i * 0.15}s`, marginLeft: s.shift }}
                  >
                    <div
                      className="ab-chip"
                      style={{ ['--c' as string]: s.color, animationDuration: `${3.2 + i * 0.7}s` }}
                    >
                      <span className="ab-chip-icon">{s.icon}</span>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="ab-switch">
                {personLeaders.map((p, i) => (
                  <button
                    key={p.name}
                    aria-label={`Show ${p.name}`}
                    className={i === active ? 'is-on' : ''}
                    onClick={() => changePerson(i)}
                  >
                    {i === active && <span key={active} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* ================= STORY ================= */}
      <section className="ab-story">
        <div className="ab-container ab-story-grid">
          <div>
            <Reveal dir="left">
              <p className="ab-eyebrow ab-eyebrow-light">
                <span className="ab-eyebrow-line" />
                Our story & journey
              </p>
              <h2 className="ab-h2 ab-h2-light">
                Building smart technologies and automated systems{' '}
                <span style={{ color: '#34D399' }}>since day one.</span>
              </h2>
            </Reveal>

            <Reveal dir="left" delay={150}>
              <p className="ab-story-p1">
                SMARToi was founded with a single commitment: to solve complex industrial and energy
                challenges through custom machinery, solar power EPC, AgTech drone telemetry and
                embedded hardware engineering.
              </p>
              <p className="ab-story-p2">
                Headquartered in Karur, Tamil Nadu, our multi-disciplinary team manages design,
                assembly, firmware development and 24/7 field maintenance under one roof, so every
                system we deliver performs reliably in demanding conditions.
              </p>
            </Reveal>

            <Reveal dir="left" delay={300}>
              <blockquote className="ab-quote">
                <span className="ab-quote-mark">“</span>
                Innovation is not just what we build, but how reliably it serves our clients every
                single day, across homes, farms and solar plants.
                <cite>SMARToi Engineering Leadership</cite>
              </blockquote>
            </Reveal>
          </div>

          <div className="ab-stat-grid">
            {[
              { to: 150, suf: '+', label: 'Satisfied Clients', sub: 'Industrial, Solar & AgTech', icon: <Users size={22} />, c: '#38BDF8', dec: 0 },
              { to: 45, suf: '+', label: 'Products & Solutions', sub: 'Robotics, IoT & Custom PCB', icon: <Cpu size={22} />, c: '#FBBF24', dec: 0 },
              { to: 280, suf: '+', label: 'Turnkey Deployments', sub: 'On-time field quality', icon: <Award size={22} />, c: '#34D399', dec: 0 },
              { to: 8.5, suf: ' MW+', label: 'Solar Power Capacity', sub: 'Clean renewable energy', icon: <Zap size={22} />, c: '#A78BFA', dec: 1 }
            ].map((s, i) => (
              <Reveal key={s.label} dir="right" delay={i * 120} style={{ height: '100%' }}>
                <div className="ab-stat" style={{ ['--c' as string]: s.c }}>
                  <div className="ab-stat-icon">{s.icon}</div>
                  <div className="ab-stat-num">
                    <CountUp to={s.to} suffix={s.suf} decimals={s.dec} duration={2200} />
                  </div>
                  <div className="ab-stat-label">{s.label}</div>
                  <div className="ab-stat-sub">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section className="ab-section ab-soft">
        <div className="ab-container">
          <Reveal>
            <div className="ab-head">
              <p className="ab-eyebrow">
                <span className="ab-eyebrow-line" />
                What we do
              </p>
              <h2 className="ab-h2">Six disciplines, one engineering team.</h2>
              <p className="ab-sub">
                From factory floors to farm fields and rooftops, we design and build the systems
                ourselves instead of outsourcing the hard parts.
              </p>
            </div>
          </Reveal>

          <div className="ab-services">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 120} style={{ height: '100%' }}>
                <div className="ab-service" style={{ ['--c' as string]: s.color }}>
                  <span className="ab-service-n">{String(i + 1).padStart(2, '0')}</span>
                  <div className="ab-service-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="ab-section">
        <div className="ab-container">
          <Reveal>
            <div className="ab-head">
              <p className="ab-eyebrow">
                <span className="ab-eyebrow-line" />
                How we work
              </p>
              <h2 className="ab-h2">From first visit to long-term support.</h2>
            </div>
          </Reveal>

          <div ref={processRef} className={`ab-process ${processVisible ? 'is-in' : ''}`}>
            <div className="ab-process-line">
              <span />
            </div>
            {steps.map((s, i) => (
              <div className="ab-step" key={s.n} style={{ ['--i' as string]: i }}>
                <div className="ab-step-dot">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="ab-section ab-soft">
        <div className="ab-container ab-values-grid">
          <Reveal dir="left">
            <div className="ab-values-intro">
              <p className="ab-eyebrow">
                <span className="ab-eyebrow-line" />
                Why SMARToi
              </p>
              <h2 className="ab-h2">What you can expect when you work with us.</h2>
              <p className="ab-sub">
                Four principles guide every project, whether it is a home panel or a full plant
                installation.
              </p>
              <button className="ab-btn ab-btn-primary" onClick={() => navigate('/contact')}>
                Talk to our team <ArrowRight size={18} />
              </button>
            </div>
          </Reveal>

          <div className="ab-values">
            {values.map((v, i) => (
              <Reveal key={v.title} dir="right" delay={i * 110}>
                <div className="ab-value">
                  <div className="ab-value-icon">{v.icon}</div>
                  <div>
                    <h3>{v.title}</h3>
                    <p>{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VISION & MISSION ================= */}
      <section className="ab-section">
        <div className="ab-container" style={{ maxWidth: '1240px' }}>
          <Reveal dir="zoom">
            <div className="ab-vm">
              <svg viewBox="0 0 870 487" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="vmBlue" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0A2A6B" />
                    <stop offset="100%" stopColor="#0066FF" />
                  </linearGradient>
                  <linearGradient id="vmGrey" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DCE3EC" />
                    <stop offset="100%" stopColor="#F5F8FC" />
                  </linearGradient>
                </defs>
                <path d="M 695 20 Q 716 4 740 24 L 870 128 V 487 H 118 Z" fill="url(#vmGrey)" />
                <path d="M 0 0 H 655 L 192 398 Q 132 450 84 424 Q 36 396 0 322 Z" fill="url(#vmBlue)" />
              </svg>

              <div className="ab-vm-vision">
                <h2>Our<br />Vision</h2>
                <p>{COMPANY_INFO.vision}</p>
              </div>

              <div className="ab-vm-eye">
                <Eye style={{ width: '80%', height: 'auto' }} strokeWidth={2.2} color="#FFFFFF" />
              </div>

              <div className="ab-vm-mission">
                <h2>Our<br />Mission</h2>
                <p>{COMPANY_INFO.mission}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="ab-cta">
        <div className="ab-container">
          <Reveal>
            <div className="ab-cta-inner">
              <div>
                <h2>Have a project in mind?</h2>
                <p>Tell us what you want to automate, power or build. We will help you plan it.</p>
              </div>
              <div className="ab-cta-btns">
                <button className="ab-btn ab-btn-light" onClick={() => navigate('/contact')}>
                  Let's Talk <ArrowRight size={18} />
                </button>
                <button className="ab-btn ab-btn-ghost" onClick={() => navigate('/product')}>
                  See our products
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

// ----------------------------------------------------
// Styles
// ----------------------------------------------------
const css = `
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@500;600;700&display=swap');

.ab {
  font-family: 'Barlow', system-ui, sans-serif;
  background: #fff;
  color: #0F172A;
  overflow: hidden;
}
.ab * { box-sizing: border-box; }
.ab-container { width: 100%; max-width: 1260px; margin: 0 auto; padding: 0 24px; }
.ab button { font-family: inherit; }

/* Reveal on scroll */
.rv { opacity: 0; transition: opacity .9s cubic-bezier(.16,1,.3,1) var(--d,0ms), transform .9s cubic-bezier(.16,1,.3,1) var(--d,0ms); }
.rv-up { transform: translateY(36px); }
.rv-left { transform: translateX(-48px); }
.rv-right { transform: translateX(48px); }
.rv-zoom { transform: scale(.94); }
.rv-in { opacity: 1; transform: none; }

/* Shared type */
.ab-eyebrow {
  display: flex; align-items: center; gap: 12px;
  margin: 0 0 18px;
  font: 600 .95rem 'Barlow Condensed', sans-serif;
  letter-spacing: .18em; text-transform: uppercase;
  color: #0066FF;
}
.ab-eyebrow-line { width: 38px; height: 2px; background: currentColor; }
.ab-eyebrow-dot { width: 9px; height: 9px; background: #10B981; border-radius: 50%; }
.ab-eyebrow-light { color: #34D399; }
.ab-h2 {
  margin: 0 0 16px;
  font-size: clamp(2rem, 3.6vw, 3rem);
  font-weight: 700; line-height: 1.1; letter-spacing: -.02em;
}
.ab-h2-light { color: #fff; }
.ab-sub { margin: 0; max-width: 560px; font-size: 1.1rem; line-height: 1.7; color: #475569; }
.ab-section { padding: 100px 0; }
.ab-soft { background: #F5F8FC; }
.ab-head { margin-bottom: 54px; }

/* Buttons */
.ab-btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 15px 28px; border-radius: 8px;
  font-size: 1rem; font-weight: 600; cursor: pointer;
  transition: transform .25s ease, background .25s ease, color .25s ease, border-color .25s ease;
}
.ab-btn svg { transition: transform .25s ease; }
.ab-btn:hover svg { transform: translateX(4px); }
.ab-btn-primary { background: #0066FF; color: #fff; border: 1px solid #0066FF; }
.ab-btn-primary:hover { background: #0F172A; border-color: #0F172A; transform: translateY(-2px); }
.ab-btn-outline { background: #fff; color: #0F172A; border: 1.5px solid #0F172A; }
.ab-btn-outline:hover { background: #0F172A; color: #fff; transform: translateY(-2px); }
.ab-btn-light { background: #fff; color: #0F172A; border: 1px solid #fff; }
.ab-btn-light:hover { background: #0F172A; color: #fff; border-color: #0F172A; transform: translateY(-2px); }
.ab-btn-ghost { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,.55); }
.ab-btn-ghost:hover { background: rgba(255,255,255,.14); transform: translateY(-2px); }

/* ---------- Hero ---------- */
.ab-hero {
  position: relative;
  padding: 130px 0 120px;
  border-bottom: 1px solid #E2E8F0;
  background:
    linear-gradient(#EEF2F7 1px, transparent 1px) 0 0 / 64px 64px,
    linear-gradient(90deg, #EEF2F7 1px, transparent 1px) 0 0 / 64px 64px,
    #fff;
}
.ab-hero::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(90deg, #fff 0%, rgba(255,255,255,.88) 45%, rgba(255,255,255,.2) 100%);
}
.ab-hero .ab-container { position: relative; z-index: 2; }
.ab-hero-grid {
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 110px;
  align-items: center;
}
.ab-hero-left { padding-right: 16px; }

.ab-up { opacity: 0; animation: abUp .9s cubic-bezier(.16,1,.3,1) forwards; }
.ab-zoom { opacity: 0; animation: abZoom 1.1s cubic-bezier(.16,1,.3,1) .2s forwards; }

.ab-h1 {
  margin: 0 0 28px;
  font-size: clamp(2.5rem, 4.6vw, 4.1rem);
  font-weight: 800; line-height: 1.06; letter-spacing: -.03em;
  color: #0F172A;
}
.ab-w { display: inline-block; overflow: hidden; vertical-align: top; margin-right: .26em; padding-bottom: .08em; }
.ab-w > span { display: inline-block; transform: translateY(110%); animation: abWord .9s cubic-bezier(.16,1,.3,1) forwards; }
.ab-acc { color: #0066FF; position: relative; }

.ab-lead { margin-bottom: 34px; max-width: 560px; padding-left: 20px; border-left: 3px solid #0066FF; }
.ab-lead p { margin: 0; font-size: 1.14rem; line-height: 1.7; color: #475569; }
.ab-lead strong { color: #0F172A; font-weight: 600; }

.ab-btns { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 38px; }

.ab-hstats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 540px;
  padding-top: 24px;
  border-top: 1.5px dashed #CBD5E1;
}

.ab-hstat-card {
  position: relative;
  padding: 16px 14px 14px;
  border-radius: 14px;
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  overflow: hidden;
}
.ab-hstat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.1);
}

.ab-hstat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.ab-hstat-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ab-hstat-badge {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 3px 8px;
  border-radius: 999px;
  text-transform: uppercase;
}
.ab-hstat-num {
  font-size: 2.25rem;
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
}
.ab-hstat-label {
  display: block;
  margin-top: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1.3;
}

/* Card 1: Royal Blue */
.ab-hstat-blue {
  background: linear-gradient(175deg, #FFFFFF 0%, #EFF6FF 100%);
  border-color: rgba(0, 82, 204, 0.28);
  border-top: 3.5px solid #0052CC;
}
.ab-hstat-blue .ab-hstat-icon {
  background: rgba(0, 82, 204, 0.1);
  color: #0052CC;
}
.ab-hstat-blue .ab-hstat-badge {
  background: rgba(0, 82, 204, 0.12);
  color: #0052CC;
}
.ab-hstat-blue .ab-hstat-num {
  background: linear-gradient(135deg, #0052CC 0%, #2563EB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.ab-hstat-blue .ab-hstat-label {
  color: #1E3A8A;
}

/* Card 2: Sky Cyan */
.ab-hstat-cyan {
  background: linear-gradient(175deg, #FFFFFF 0%, #F0F9FF 100%);
  border-color: rgba(2, 132, 199, 0.28);
  border-top: 3.5px solid #0284C7;
}
.ab-hstat-cyan .ab-hstat-icon {
  background: rgba(2, 132, 199, 0.1);
  color: #0284C7;
}
.ab-hstat-cyan .ab-hstat-badge {
  background: rgba(2, 132, 199, 0.12);
  color: #0284C7;
}
.ab-hstat-cyan .ab-hstat-num {
  background: linear-gradient(135deg, #0284C7 0%, #00B4D8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.ab-hstat-cyan .ab-hstat-label {
  color: #0369A1;
}

/* Card 3: Emerald Green */
.ab-hstat-green {
  background: linear-gradient(175deg, #FFFFFF 0%, #ECFDF5 100%);
  border-color: rgba(16, 185, 129, 0.3);
  border-top: 3.5px solid #10B981;
}
.ab-hstat-green .ab-hstat-icon {
  background: rgba(16, 185, 129, 0.12);
  color: #10B981;
}
.ab-hstat-green .ab-hstat-badge {
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
}
.ab-hstat-green .ab-hstat-num {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.ab-hstat-green .ab-hstat-label {
  color: #047857;
}

/* Right side */
.ab-hero-right { position: relative; display: flex; justify-content: center; align-items: center; min-height: 560px; }
.ab-disc {
  position: absolute; top: 50%; left: 50%;
  width: 460px; height: 460px; margin: -230px 0 0 -230px;
  border-radius: 50%;
  background: linear-gradient(160deg, #E4EEFF 0%, #DDF5EA 100%);
  animation: abBreath 7s ease-in-out infinite alternate;
}
.ab-ring {
  position: absolute; top: 50%; left: 50%;
  width: 540px; height: 540px; margin: -270px 0 0 -270px;
  border: 1.5px dashed rgba(0,102,255,.35); border-radius: 50%;
  animation: abSpin 40s linear infinite;
}
.ab-ring i { position: absolute; top: -7px; left: 50%; margin-left: -7px; width: 14px; height: 14px; border-radius: 50%; background: #0066FF; }

.ab-person { position: relative; z-index: 5; width: 100%; max-width: 430px; text-align: center; }
.ab-person img {
  display: block; margin: 0 auto;
  width: 100%; max-height: 520px; object-fit: contain;
  filter: drop-shadow(0 18px 30px rgba(15,23,42,.18));
  transition: opacity .55s ease, transform .55s ease;
}
.ab-person img.is-fading { opacity: 0; transform: scale(.96) translateY(12px); }

.ab-name {
  position: absolute; left: 50%; bottom: -22px; transform: translateX(-50%);
  min-width: 270px; padding: 12px 24px;
  background: #0F172A; color: #fff; border-radius: 10px;
  border-bottom: 3px solid #10B981;
  box-shadow: 0 16px 34px rgba(15,23,42,.28);
  white-space: nowrap; text-align: center;
  transition: opacity .4s ease;
}
.ab-name.is-fading { opacity: 0; }
.ab-name small { display: block; font: 600 .76rem 'Barlow Condensed', sans-serif; letter-spacing: .14em; text-transform: uppercase; color: #34D399; }
.ab-name strong { display: block; margin-top: 2px; font-size: 1.15rem; font-weight: 700; }

.ab-chips {
  position: absolute; right: -36px; top: 12%; z-index: 8;
  display: flex; flex-direction: column; gap: 18px;
  transition: opacity .45s ease, transform .45s ease;
}
.ab-chips.is-fading { opacity: 0; transform: translateX(22px); }
.ab-chip-wrap { opacity: 0; animation: abChipIn 1s cubic-bezier(.16,1,.3,1) forwards; }
.ab-chip {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 20px 10px 10px;
  background: #fff; border: 1px solid #E2E8F0; border-left: 4px solid var(--c);
  border-radius: 10px;
  box-shadow: 0 12px 28px rgba(15,23,42,.1);
  font-size: .94rem; font-weight: 600; color: #0F172A; white-space: nowrap;
  animation: abFloat 3.4s ease-in-out infinite alternate;
}
.ab-chip-icon { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 8px; color: var(--c); background: color-mix(in srgb, var(--c) 12%, white); }

.ab-switch { position: absolute; left: 50%; bottom: -70px; transform: translateX(-50%); display: flex; gap: 8px; z-index: 6; }
.ab-switch button { position: relative; width: 54px; height: 4px; padding: 0; border: 0; border-radius: 2px; background: #CBD5E1; cursor: pointer; overflow: hidden; }
.ab-switch span { position: absolute; inset: 0; background: #0066FF; transform-origin: left; animation: abFill 10s linear forwards; }

/* ---------- Story ---------- */
.ab-story {
  padding: 100px 0;
  color: #fff;
  background:
    linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px) 0 0 / 56px 56px,
    linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px) 0 0 / 56px 56px,
    #0F172A;
  animation: abGrid 40s linear infinite;
}
.ab-story-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 72px; align-items: center; }
.ab-story-p1 { margin: 0 0 18px; font-size: 1.12rem; line-height: 1.75; color: #CBD5E1; }
.ab-story-p2 { margin: 0 0 32px; font-size: 1.03rem; line-height: 1.75; color: #94A3B8; }
.ab-quote {
  position: relative; margin: 0; padding: 26px 30px 26px 34px;
  border-left: 3px solid #34D399; background: rgba(255,255,255,.05);
  font-size: 1.04rem; font-weight: 500; line-height: 1.65; font-style: italic; color: #E2E8F0;
}
.ab-quote-mark { position: absolute; top: -4px; left: 10px; font: 700 3.4rem Georgia, serif; line-height: 1; color: #34D399; }
.ab-quote cite { display: block; margin-top: 12px; font: 600 .82rem 'Barlow Condensed', sans-serif; font-style: normal; letter-spacing: .14em; text-transform: uppercase; color: #34D399; }

.ab-stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
.ab-stat {
  position: relative; height: 100%; padding: 26px 24px;
  border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04);
  transition: transform .35s ease, border-color .35s ease, background .35s ease;
}
.ab-stat::before { content: ''; position: absolute; left: 0; top: 0; height: 3px; width: 40px; background: var(--c); transition: width .5s ease; }
.ab-stat:hover { transform: translateY(-6px); border-color: var(--c); background: rgba(255,255,255,.07); }
.ab-stat:hover::before { width: 100%; }
.ab-stat-icon { margin-bottom: 18px; color: var(--c); }
.ab-stat-num { font-size: clamp(2rem, 3.2vw, 2.7rem); font-weight: 800; line-height: 1; letter-spacing: -.02em; margin-bottom: 8px; }
.ab-stat-label { font-size: 1rem; font-weight: 600; color: #fff; margin-bottom: 4px; }
.ab-stat-sub { font-size: .86rem; color: #94A3B8; }

/* ---------- Services ---------- */
.ab-services { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.ab-service {
  position: relative; height: 100%; padding: 34px 28px 30px;
  background: #fff; border: 1px solid #E2E8F0; overflow: hidden;
  transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
}
.ab-service::before { content: ''; position: absolute; left: 0; top: 0; height: 3px; width: 100%; background: var(--c); transform: scaleX(0); transform-origin: left; transition: transform .5s cubic-bezier(.16,1,.3,1); }
.ab-service:hover { transform: translateY(-8px); box-shadow: 0 24px 44px rgba(15,23,42,.1); border-color: var(--c); }
.ab-service:hover::before { transform: scaleX(1); }
.ab-service-n { position: absolute; top: 18px; right: 22px; font: 700 2.6rem 'Barlow Condensed', sans-serif; color: #EEF2F7; transition: color .3s; }
.ab-service:hover .ab-service-n { color: color-mix(in srgb, var(--c) 22%, white); }
.ab-service-icon { width: 56px; height: 56px; display: grid; place-items: center; margin-bottom: 22px; border-radius: 12px; color: var(--c); background: color-mix(in srgb, var(--c) 11%, white); transition: transform .4s ease, background .3s, color .3s; }
.ab-service:hover .ab-service-icon { transform: rotate(-8deg) scale(1.08); background: var(--c); color: #fff; }
.ab-service h3 { margin: 0 0 10px; font-size: 1.28rem; font-weight: 700; }
.ab-service p { margin: 0; font-size: 1rem; line-height: 1.65; color: #64748B; }

/* ---------- Process ---------- */
.ab-process { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; }
.ab-process-line { position: absolute; top: 33px; left: 8%; right: 8%; height: 2px; background: #E2E8F0; }
.ab-process-line span { display: block; height: 100%; background: #0066FF; transform: scaleX(0); transform-origin: left; transition: transform 2s cubic-bezier(.65,0,.35,1) .2s; }
.ab-process.is-in .ab-process-line span { transform: scaleX(1); }
.ab-step { position: relative; text-align: center; padding: 0 8px; opacity: 0; transform: translateY(24px); transition: opacity .8s ease, transform .8s ease; transition-delay: calc(var(--i) * .45s + .2s); }
.ab-process.is-in .ab-step { opacity: 1; transform: none; }
.ab-step-dot {
  position: relative; z-index: 2;
  width: 68px; height: 68px; margin: 0 auto 22px;
  display: grid; place-items: center; border-radius: 50%;
  background: #fff; border: 2px solid #0066FF;
  font: 700 1.3rem 'Barlow Condensed', sans-serif; letter-spacing: .05em; color: #0066FF;
  transition: background .3s, color .3s, transform .3s;
}
.ab-step:hover .ab-step-dot { background: #0066FF; color: #fff; transform: scale(1.1); }
.ab-step h3 { margin: 0 0 8px; font-size: 1.2rem; font-weight: 700; }
.ab-step p { margin: 0 auto; max-width: 250px; font-size: .98rem; line-height: 1.6; color: #64748B; }

/* ---------- Values ---------- */
.ab-values-grid { display: grid; grid-template-columns: .85fr 1.15fr; gap: 80px; align-items: center; }
.ab-values-intro .ab-sub { margin-bottom: 30px; }
.ab-values { display: flex; flex-direction: column; gap: 14px; }
.ab-value {
  display: flex; gap: 20px; align-items: flex-start;
  padding: 24px 26px; background: #fff; border: 1px solid #E2E8F0; border-left: 4px solid #0066FF;
  transition: transform .3s ease, box-shadow .3s ease, border-left-color .3s ease;
}
.ab-value:hover { transform: translateX(10px); box-shadow: 0 16px 34px rgba(15,23,42,.08); border-left-color: #10B981; }
.ab-value-icon { flex: none; width: 48px; height: 48px; display: grid; place-items: center; border-radius: 10px; background: #EAF1FF; color: #0066FF; transition: background .3s, color .3s; }
.ab-value:hover .ab-value-icon { background: #10B981; color: #fff; }
.ab-value h3 { margin: 0 0 4px; font-size: 1.15rem; font-weight: 700; }
.ab-value p { margin: 0; font-size: .98rem; line-height: 1.6; color: #64748B; }

/* ---------- Vision & Mission ---------- */
.ab-vm {
  position: relative; width: 100%; aspect-ratio: 870 / 487; container-type: inline-size;
  overflow: hidden; border-radius: 16px; background: #fff;
  box-shadow: 0 25px 60px rgba(15,23,42,.12);
}
.ab-vm svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.ab-vm h2 { margin: 0; font-size: 5.4cqw; font-weight: 800; line-height: 1.02; text-transform: uppercase; }
.ab-vm p { margin: 1.6cqw 0 0; font-size: 1.9cqw; line-height: 1.45; font-weight: 500; }
.ab-vm-vision { position: absolute; left: 6%; top: 13%; width: 34%; color: #fff; }
.ab-vm-vision h2, .ab-vm-vision p { color: #fff; }
.ab-vm-eye { position: absolute; left: 10.5%; top: 66%; width: 13%; animation: abFloat 3.5s ease-in-out infinite alternate; }
.ab-vm-mission { position: absolute; right: 5%; top: 25%; width: 38%; text-align: right; color: #0F172A; }
.ab-vm-mission p { color: #334155; }

/* ---------- CTA ---------- */
.ab-cta { padding: 0 0 100px; }
.ab-cta-inner {
  display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap;
  padding: 56px 56px; border-radius: 16px; color: #fff;
  background: repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 2px, transparent 2px 18px), #0066FF;
  background-size: 36px 36px, auto;
  animation: abStripes 6s linear infinite;
}
.ab-cta h2 { margin: 0 0 8px; font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 800; letter-spacing: -.02em; }
.ab-cta p { margin: 0; max-width: 520px; font-size: 1.08rem; line-height: 1.6; color: rgba(255,255,255,.88); }
.ab-cta-btns { display: flex; flex-wrap: wrap; gap: 14px; }

/* ---------- Keyframes ---------- */
@keyframes abUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
@keyframes abZoom { from { opacity: 0; transform: translateX(50px) scale(.95); } to { opacity: 1; transform: none; } }
@keyframes abWord { to { transform: translateY(0); } }
@keyframes abChipIn { from { opacity: 0; transform: translateX(70px); } to { opacity: 1; transform: none; } }
@keyframes abFloat { from { transform: translateY(0); } to { transform: translateY(-8px); } }
@keyframes abBreath { from { transform: scale(.96); } to { transform: scale(1.04); } }
@keyframes abSpin { to { transform: rotate(360deg); } }
@keyframes abFill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes abGrid { to { background-position: 56px 56px, 56px 56px, 0 0; } }
@keyframes abStripes { to { background-position: 36px 0, 0 0; } }

@media (prefers-reduced-motion: reduce) {
  .ab *, .ab *::before, .ab *::after { animation: none !important; transition: none !important; }
  .rv, .ab-up, .ab-zoom, .ab-chip-wrap, .ab-step { opacity: 1 !important; transform: none !important; }
  .ab-w > span { transform: none !important; }
}

/* ---------- Responsive ---------- */
@media (max-width: 1100px) {
  .ab-hero-grid { gap: 64px; }
  .ab-services { grid-template-columns: repeat(2, 1fr); }
  .ab-values-grid { gap: 48px; }
}
@media (max-width: 960px) {
  .ab-hero { padding: 100px 0 110px; }
  .ab-hero-grid, .ab-story-grid, .ab-values-grid { grid-template-columns: 1fr; gap: 56px; }
  .ab-hero-left { padding-right: 0; }
  .ab-chips { display: none; }
  .ab-hero-right { min-height: 480px; }
  .ab-disc { width: 380px; height: 380px; margin: -190px 0 0 -190px; }
  .ab-ring { width: 440px; height: 440px; margin: -220px 0 0 -220px; }
  .ab-process { grid-template-columns: repeat(2, 1fr); row-gap: 44px; }
  .ab-process-line { display: none; }
  .ab-section, .ab-story { padding: 72px 0; }
}
@media (max-width: 640px) {
  .ab-services, .ab-stat-grid { grid-template-columns: 1fr; }
  .ab-hstats { grid-template-columns: 1fr; gap: 12px; }
  .ab-process { grid-template-columns: 1fr; }
  .ab-cta-inner { padding: 36px 26px; }
  .ab-name { min-width: 0; }
  .ab-vm p { font-size: 2.3cqw; }
}
`;