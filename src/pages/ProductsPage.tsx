import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, ArrowRight, Send, Users, Star, MapPin,
  CheckCircle2, Sun, Cpu, Layers, Home, Bot, GraduationCap,
  ShieldCheck, Wrench, Headphones, Plus
} from 'lucide-react';

/* =====================================================================
   SMARToi  |  Products page (single file)
   Palette taken from the SMARToi logo: navy / blue / green
   ===================================================================== */

export interface ProductsPageProps {
  openQuoteModalWithSolution: (solutionTitle: string) => void;
}

const NAVY = '#14307F';
const BLUE = '#0B63CE';
const GREEN = '#3BAA35';
const BLUE_LIGHT = '#6FA8FF';
const GREEN_LIGHT = '#6FD068';
const INK = '#071533';

interface Solution {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  audience: string;
  image: string;
  accent: string;
  subItems: string[];
}

const SOLUTIONS: Solution[] = [
  {
    id: 'smart-living', number: '01', title: 'Smart Living Solutions', category: 'Home & Office Automation',
    tagline: 'Touch, voice and app control for every room',
    description: 'Custom smart switches, motorized curtain controllers, energy metering, CCTV security and smartphone triggers, installed neatly and tuned to the way you live and work.',
    audience: 'Homes, apartments, offices and showrooms',
    image: '/img/WhatsApp Image 2026-09-19 at 1.33.07 PM.jpeg', accent: BLUE_LIGHT,
    subItems: ['Smart Switches', 'Smart Lights', 'CCTV', 'Smart Door Locks']
  },
  {
    id: 'industrial-automation', number: '02', title: 'Industrial Automation', category: 'Factory Systems & Panels',
    tagline: 'Control panels built for 24/7 reliability',
    description: 'Custom electrical control panels, PLC automation, VFD motor controllers, automated gate systems and sensor telemetry, engineered for continuous operation.',
    audience: 'Factories, workshops, farms and gated premises',
    image: '/img/WhatsApp Image 2026-09-19 at 1.05.09 PM.jpeg', accent: GREEN_LIGHT,
    subItems: ['Gate Automation', 'Smart Irrigation', 'Custom Products', 'Industrial Training']
  },
  {
    id: 'solar-solution', number: '03', title: 'Solar Energy Solutions', category: 'Renewable Power & EPC',
    tagline: 'Clean power for homes, farms and factories',
    description: 'Turnkey rooftop solar PV, high-efficiency BLDC solar pump controllers, outdoor solar lighting and commercial grid-tied installations, from survey to commissioning.',
    audience: 'Homeowners, farmers and commercial buildings',
    image: '/img/WhatsApp Image 2026-09-19 at 1.19.32 PM.jpeg', accent: GREEN_LIGHT,
    subItems: ['1-10kW Residential', 'BLDC Pump Motors', 'Outdoor Solar', '10-100kW Commercial']
  },
  {
    id: 'skill-development', number: '04', title: 'Skill Development', category: 'Engineering Training & Labs',
    tagline: 'Hands-on technology training for future engineers',
    description: 'Certified practical programs in drone piloting, multi-layer PCB design, CAD/CAM modeling and AI robotics, taught in labs across Tamil Nadu.',
    audience: 'Students, graduates and working technicians',
    image: '/img/WhatsApp Image 2026-09-19 at 1.19.32 PM (1).jpeg', accent: BLUE_LIGHT,
    subItems: ['Drone Pilot Training', 'PCB Layout & Fab', 'CAD/CAM Modeling', 'AI & Robotics']
  },
  {
    id: 'robot-services', number: '05', title: 'Robot Services', category: 'Autonomous Service Robots',
    tagline: 'Greeting and serving robots that draw a crowd',
    description: 'Autonomous serve robots and interactive greeting robots for showrooms, restaurants, hospitals and events, with custom navigation and voice interaction.',
    audience: 'Hotels, restaurants, hospitals and corporate events',
    image: '/img/WhatsApp Image 2026-09-19 at 1.05.14 PM.jpeg', accent: GREEN_LIGHT,
    subItems: ['Serve Robot', 'Greeting Robot', 'Custom Navigation', 'Voice AI Interaction']
  },
  {
    id: 'fabrication', number: '06', title: 'Precision Fabrication', category: 'Industrial Manufacturing',
    tagline: 'From prototype to finished metalwork',
    description: 'Industrial 3D printing, metal and non-metal laser cutting, DRO lathe machining, sheet bending, powder coating and custom enclosure painting under one roof.',
    audience: 'Product makers, startups and machine builders',
    image: '/img/WhatsApp Image 2026-09-19 at 1.29.34 PM.jpeg', accent: BLUE_LIGHT,
    subItems: ['3D Printing', 'Laser Cutting', 'DRO Lathe Machining', 'Powder Coating']
  }
];

interface Review {
  id: string; name: string; role: string; location: string; date: string; rating: number;
  quote: string; initials: string; color: string; product: string;
}

const REVIEWS: Review[] = [
  { id: 'r1', name: 'K. Murugesan', role: 'Managing Partner, Green Valley Coconut Groves', location: 'Udumalaipettai, Tamil Nadu', date: '12 Oct 2026', rating: 5, initials: 'KM', color: NAVY, product: 'AgriFlow Smart Controller',
    quote: "SMARToi's AgriFlow Smart Controller has completely automated our 40-acre coconut grove drip irrigation. Power fluctuations in Udumalaipettai were always a challenge, but their solar DC backup and GSM mobile alerts solved it permanently. மிகச் சிறந்த தொழில்நுட்ப சேவை (Outstanding technology service)! Saved 45% water usage and cut labor expenses by 70%." },
  { id: 'r2', name: 'S. Arumugam & Sons', role: 'Plant Director, Arumugam Weaving Mills', location: 'Tiruppur, Tamil Nadu', date: '28 Sep 2026', rating: 5, initials: 'SA', color: BLUE, product: 'Industrial IoT Gateway',
    quote: "We integrated 24 industrial weaving loom clusters with SMARToi's DIN-Rail IoT Gateways across our Tiruppur factory. Live power factor monitoring and machine downtime telemetry stopped electrical wastage immediately. Their engineering team from Karur came down and deployed custom Modbus firmware within 48 hours." },
  { id: 'r3', name: 'Dr. V. Selvakumar', role: 'Agricultural Consultant & Farm Owner', location: 'Namakkal, Tamil Nadu', date: '14 Sep 2026', rating: 5, initials: 'VS', color: GREEN, product: 'Agricultural Drone Operations',
    quote: "The precision aerial spraying service across our tapioca and sugarcane fields in Namakkal was remarkable. SMARToi's certified drone pilots completed 15 acres in under 3 hours with zero crop trampling and uniform micron droplet coverage. Highly dependable engineering support right here in Tamil Nadu." },
  { id: 'r4', name: 'P. Anandhan', role: 'Managing Director, Anandhan Hatcheries', location: 'Pollachi Road, Coimbatore, Tamil Nadu', date: '22 Aug 2026', rating: 5, initials: 'PA', color: NAVY, product: 'Custom Micro-Controller PCB',
    quote: 'Temperature and humidity regulation inside our commercial poultry sheds is critical. The custom microcontroller board designed by SMARToi with opto-isolated relays handles our exhaust fans and foggers reliably. Zero downtime in over 8 months of continuous 24/7 operation.' },
  { id: 'r5', name: 'R. Jayachandran', role: 'Cauvery River Basin Organic Cultivator', location: 'Puliyur, Karur, Tamil Nadu', date: '05 Aug 2026', rating: 5, initials: 'RJ', color: BLUE, product: 'Solar DC Pump Set',
    quote: 'Being based in Karur, it was a proud moment partnering with our local engineering innovators SMARToi. Their solar DC pump drive has completely eliminated diesel generator fuel costs. The soil moisture sensor automatically triggers irrigation at 5 AM every morning.' }
];

const SECTOR_ICONS: Record<string, React.ElementType> = {
  'smart-living': Home, 'industrial-automation': Bot, 'solar-solution': Sun,
  'skill-development': GraduationCap, 'robot-services': Cpu, 'fabrication': Layers
};

const cssUrl = (path: string) => `url("${encodeURI(path)}")`;

/* Scroll reveal + count-up (respects reduced motion, safe without IntersectionObserver) */
const noMotion = () =>
  typeof window === 'undefined' || !('IntersectionObserver' in window) ||
  !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function useInView<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(noMotion());
  useEffect(() => {
    if (seen || !ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen];
}

const Reveal: React.FC<{ className?: string; delay?: number; role?: string; children: React.ReactNode }> =
  ({ className = '', delay = 0, role, children }) => {
    const [ref, seen] = useInView<HTMLDivElement>();
    return (
      <div ref={ref} role={role} className={`rv ${seen ? 'in' : ''} ${className}`}
        style={{ ['--d' as string]: `${delay}ms` } as React.CSSProperties}>
        {children}
      </div>
    );
  };

const CountUp: React.FC<{ to: number; decimals?: number; suffix?: string }> = ({ to, decimals = 0, suffix = '' }) => {
  const [ref, seen] = useInView<HTMLSpanElement>();
  const [val, setVal] = useState(noMotion() ? to : 0);
  useEffect(() => {
    if (!seen || noMotion()) { if (seen) setVal(to); return; }
    let raf = 0; const t0 = performance.now(); const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      setVal(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
};

/* ---------------------------------------------------------------------
   1. HERO SLIDER
   --------------------------------------------------------------------- */
const Hero: React.FC<ProductsPageProps> = ({ openQuoteModalWithSolution }) => {
  const [slides, setSlides] = useState(SOLUTIONS);
  const [paused, setPaused] = useState(false);
  const lock = useRef(false);
  const active = slides[0];

  const runLocked = useCallback((fn: () => void) => {
    if (lock.current) return;
    lock.current = true;
    fn();
    setTimeout(() => { lock.current = false; }, 450);
  }, []);

  const next = useCallback(() => runLocked(() => setSlides(p => [...p.slice(1), p[0]])), [runLocked]);
  const prev = useCallback(() => runLocked(() => setSlides(p => [p[p.length - 1], ...p.slice(0, -1)])), [runLocked]);
  const select = (id: string) => runLocked(() => setSlides(p => {
    const i = p.findIndex(s => s.id === id);
    return i <= 0 ? p : [...p.slice(i), ...p.slice(0, i)];
  }));

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section
      className="sp-hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="SMARToi solutions"
    >
      <div key={active.id} className="sp-hero-bg" style={{ backgroundImage: cssUrl(active.image) }} aria-hidden="true" />
      <div className="sp-hero-shade" aria-hidden="true" />
      <div className="sp-topline" aria-hidden="true" />

      <div className="sp-wrap sp-hero-inner">
        <div className="sp-hero-grid">
          <div key={active.id + '-c'} className="sp-hero-content sp-anim">
            <div className="sp-badge" style={{ ['--a' as string]: active.accent } as React.CSSProperties}>
              <b>{active.number}</b><span>{active.category}</span>
            </div>
            <h1 className="sp-hero-title">{active.title}</h1>
            <p className="sp-hero-tagline" style={{ color: active.accent }}>{active.tagline}</p>
            <p className="sp-hero-desc">{active.description}</p>
            <div className="sp-for"><Users size={16} /><span><em>Ideal for</em>{active.audience}</span></div>
            <ul className="sp-tags" aria-label="What we offer">
              {active.subItems.map(i => <li key={i}>{i}</li>)}
            </ul>
            <div className="sp-ctas">
              <button type="button" className="sp-btn sp-btn-primary" onClick={() => openQuoteModalWithSolution(active.title)}>
                <span>Get instant quote</span><Send size={17} />
              </button>
              <button type="button" className="sp-btn sp-btn-ghost"
                onClick={() => document.getElementById('sectors')?.scrollIntoView({ behavior: 'smooth' })}>
                <span>Explore sectors</span><ArrowRight size={17} />
              </button>
            </div>
          </div>

          <div className="sp-hero-cards" role="group" aria-label="Other solutions">
            {slides.slice(1, 4).map((s, i) => (
              <button type="button" key={s.id} onClick={() => select(s.id)}
                className={`sp-hcard ${i === 0 ? 'sp-hcard-next' : ''}`}
                style={{ backgroundImage: cssUrl(s.image) }} aria-label={`Show ${s.title}`}>
                <span className="sp-hcard-shade" />
                <span className="sp-hcard-num">{s.number}</span>
                <span className="sp-hcard-info">
                  <small>{s.category}</small>
                  <strong>{s.title}</strong>
                  <span className="sp-hcard-meta">{s.subItems.length} solutions <ArrowRight size={12} /></span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="sp-controls">
          <div className="sp-arrows">
            <button type="button" className="sp-nav" onClick={prev} aria-label="Previous slide"><ChevronLeft size={22} /></button>
            <button type="button" className="sp-nav" onClick={next} aria-label="Next slide"><ChevronRight size={22} /></button>
          </div>
          <div className="sp-count" aria-live="polite"><b>{active.number}</b><span>/ {String(SOLUTIONS.length).padStart(2, '0')}</span></div>
          <div className="sp-dots" aria-hidden="true">
            {SOLUTIONS.map(s => <i key={s.id} className={s.id === active.id ? 'on' : ''} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------------
   CLIENT REVIEWS
   --------------------------------------------------------------------- */
const RATING_BARS = [
  { star: 5, pct: 92 }, { star: 4, pct: 18 }, { star: 3, pct: 6 }, { star: 2, pct: 2 }, { star: 1, pct: 1 }
];

const Reviews: React.FC = () => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const r = REVIEWS[i];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI(p => (p + 1) % REVIEWS.length), 8000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="sp-reviews" id="client-reviews">
      <div className="sp-grid-bg" aria-hidden="true" />
      <div className="sp-wrap sp-rev-grid">
        <div>
          <h2 className="sp-h2">Ratings <span className="sp-grad">&amp; reviews</span></h2>
          <div className="sp-score-row">
            <div>
              <div className="sp-score"><b>4.9</b><span>/ 5</span></div>
              <div className="sp-score-note">68 verified Tamil Nadu reviews</div>
            </div>
            <div className="sp-bars" aria-label="Rating breakdown">
              {RATING_BARS.map(b => (
                <div className="sp-bar" key={b.star}>
                  <span><Star size={13} fill="#F59E0B" color="#F59E0B" />{b.star}</span>
                  <div><i style={{ width: `${b.pct}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="sp-trust"><CheckCircle2 size={15} /><span>Tested &amp; trusted by farmers and industries across Tamil Nadu</span></div>
        </div>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <article className="sp-rcard" key={r.id}>
            <div className="sp-rcard-top">
              <div>
                <h3>{r.name}</h3>
                <div className="sp-loc"><MapPin size={13} /><span>{r.location}</span></div>
              </div>
              <time>{r.date}</time>
            </div>
            <div className="sp-stars" aria-label={`${r.rating} out of 5`}>
              {Array.from({ length: r.rating }).map((_, k) => <Star key={k} size={16} fill="#F59E0B" color="#F59E0B" />)}
            </div>
            <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>

            <div className="sp-rcard-foot">
              <div className="sp-person">
                <span className="sp-avatar" style={{ background: r.color }}>{r.initials}</span>
                <div>
                  <b>{r.role}</b>
                  <small>Verified client &bull; {r.product}</small>
                </div>
              </div>
              <div className="sp-rctl">
                <div className="sp-rdots">
                  {REVIEWS.map((_, d) => (
                    <button key={d} type="button" aria-label={`Show review ${d + 1}`} className={d === i ? 'on' : ''} onClick={() => setI(d)} />
                  ))}
                </div>
                <button type="button" className="sp-rbtn" aria-label="Previous review" onClick={() => setI((i - 1 + REVIEWS.length) % REVIEWS.length)}><ChevronLeft size={16} /></button>
                <button type="button" className="sp-rbtn sp-rbtn-dark" aria-label="Next review" onClick={() => setI((i + 1) % REVIEWS.length)}><ChevronRight size={16} /></button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------------
   2. SECTORS - expanding panels (replaces the marquee)
   Desktop: one wide panel opens, others collapse to slim tabs.
   Mobile: panels stack and the active one grows taller.
   --------------------------------------------------------------------- */
const SectorPanels: React.FC<ProductsPageProps> = ({ openQuoteModalWithSolution }) => {
  const navigate = useNavigate();
  const [act, setAct] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const hover = (i: number) => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setAct(i), 120); };
  const cancel = () => window.clearTimeout(timer.current);
  useEffect(() => cancel, []);

  return (
    <section className="sx-sectors" id="sectors">
      <div className="sp-wrap">
        <header className="sx-head">
          <h2 className="sx-h2">Six sectors, one engineering team</h2>
          <p className="sx-lead">
            From a single smart switch to a factory control panel, every solution is designed,
            built and supported by SMARToi. Select a sector to see what is included.
          </p>
        </header>

        <Reveal className="sx-panels" role="list">
          {SOLUTIONS.map((s, i) => {
            const Icon = SECTOR_ICONS[s.id];
            const on = i === act;
            return (
              <article
                key={s.id} role="listitem"
                className={`sx-panel ${on ? 'on' : ''}`}
                style={{ backgroundImage: cssUrl(s.image), ['--a' as string]: s.accent } as React.CSSProperties}
                onMouseEnter={() => hover(i)}
                onMouseLeave={cancel}
              >
                <div className="sx-shade" aria-hidden="true" />
                <button type="button" className="sx-tab" aria-expanded={on} onClick={() => setAct(i)}>
                  <span className="sx-ic"><Icon size={20} /></span>
                  <span className="sx-tab-title">{s.title}</span>
                </button>

                <div className="sx-body" aria-hidden={!on}>
                  <p className="sx-cat">{s.category}</p>
                  <h3>{s.title}</h3>
                  <p className="sx-tag">{s.tagline}</p>
                  <p className="sx-desc">{s.description}</p>
                  <ul className="sx-list">
                    {s.subItems.map(t => <li key={t}><CheckCircle2 size={15} />{t}</li>)}
                  </ul>
                  <p className="sx-aud"><Users size={14} /> {s.audience}</p>
                  <div className="sx-actions">
                    <button type="button" tabIndex={on ? 0 : -1} className="sp-btn sp-btn-primary sp-btn-sm"
                      onClick={() => openQuoteModalWithSolution(s.title)}>
                      <span>Get a quote</span><Send size={15} />
                    </button>
                    <button type="button" tabIndex={on ? 0 : -1} className="sx-link"
                      onClick={() => navigate(`/solution/${s.id}`)}>
                      View details <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------------
   3. NEW CONTENT SECTIONS (replace the 4-product slider)
   --------------------------------------------------------------------- */
const STATS: { to?: number; dec?: number; suf?: string; text?: string; l: string }[] = [
  { to: 6, suf: '+', l: 'Solution sectors under one roof' },
  { to: 4.9, dec: 1, suf: '/5', l: 'Average rating from clients' },
  { to: 68, suf: '+', l: 'Verified Tamil Nadu reviews' },
  { text: '24/7', l: 'Continuous operation design' }
];

const Stats: React.FC = () => (
  <section className="sx-stats" aria-label="SMARToi in numbers">
    <div className="sp-wrap sx-stats-grid">
      {STATS.map((s, i) => (
        <Reveal key={s.l} className="sx-stat" delay={i * 90}>
          <b>{s.text ?? <CountUp to={s.to!} decimals={s.dec} suffix={s.suf} />}</b>
          <span>{s.l}</span>
        </Reveal>
      ))}
    </div>
  </section>
);

const WHY = [
  { icon: Wrench, t: 'Designed and built in-house', d: 'Hardware, firmware and panels come from one team, so fixes and upgrades do not wait on outside vendors.' },
  { icon: ShieldCheck, t: 'Made for field conditions', d: 'Weatherproof enclosures, surge protection and fail-safe firmware for farms, mills and outdoor sites.' },
  { icon: Cpu, t: 'Custom to your site', d: 'Control logic, inputs and outputs are configured around your process instead of a fixed catalogue part.' },
  { icon: Headphones, t: 'Local support in Tamil Nadu', d: 'Engineers within reach for installation, commissioning, training and service visits.' }
];

const WhyUs: React.FC = () => (
  <section className="sx-why" id="why-smartoi">
    <div className="sp-wrap">
      <header className="sx-head sx-head-left">
        <h2 className="sx-h2">Why customers choose SMARToi</h2>
        <p className="sx-lead">Reliable systems start with engineering that stays close to the people using them.</p>
      </header>
      <div className="sx-why-grid">
        {WHY.map((w, i) => {
          const Icon = w.icon;
          return (
            <Reveal className="sx-why-item" key={w.t} delay={i * 100}>
              <span className="sx-why-ic"><Icon size={22} /></span>
              <h3>{w.t}</h3>
              <p>{w.d}</p>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

const STEPS = [
  { n: '01', t: 'Consult & Survey', d: 'We visit the site, study the process and agree scope, budget and timeline.' },
  { n: '02', t: 'Design & Engineer', d: 'Electrical, mechanical and firmware design, with clear drawings before any build starts.' },
  { n: '03', t: 'Build & Install', d: 'In-house assembly, testing and on-site commissioning by our own team.' },
  { n: '04', t: 'Install & Train', d: 'Our team installs, commissions and shows your staff how to operate it.' },
  { n: '05', t: 'Support & Maintain', d: 'Training, handover and 24/7 field maintenance long after go-live.' }
];

const Process: React.FC = () => (
  <section className="sx-process" id="how-we-work">
    <div className="sp-wrap">
      <header className="sx-head sx-head-center">
        <h2 className="sx-h2 sx-process-title">How a project runs</h2>
        <p className="sx-lead sx-process-lead">Five steps from first visit to long-term support.</p>
      </header>

      <div className="sx-process-track">
        <div className="sx-process-line">
          <span />
        </div>
        <ol className="sx-steps">
          {STEPS.map((s, i) => (
            <li key={s.n} className="sx-step-item">
              <Reveal className="sx-step" delay={i * 120}>
                <div className="sx-step-dot">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

const FAQS = [
  { q: 'Do you work with existing wiring and equipment?', a: 'Yes. During the site survey we check what can be reused and what should be replaced, then quote accordingly.' },
  { q: 'Can the controllers work without grid power?', a: 'Solar-compatible controllers and DC pump drives are available for farms and remote sites with unreliable supply.' },
  { q: 'Can I monitor my system from my phone?', a: 'Most systems support app or SMS alerts over Wi-Fi or GSM. Tell us what you need to monitor and we will confirm the options.' },
  { q: 'Do you offer training?', a: 'Yes. Our skill development programs cover drones, PCB design, CAD/CAM and AI robotics, and we train your staff on every installation.' },
  { q: 'How do I get a price?', a: 'Use the Get a quote button on any sector. Share your requirement and our team will contact you.' }
];

const Faq: React.FC = () => (
  <section className="sx-faq" id="faq">
    <div className="sp-wrap sx-faq-grid">
      <header className="sx-head sx-head-left">
        <h2 className="sx-h2">Common questions</h2>
        <p className="sx-lead">Can&apos;t find your answer? Send us your requirement and we will reply.</p>
      </header>
      <Reveal className="sx-acc">
        {FAQS.map(f => (
          <details key={f.q}>
            <summary><span>{f.q}</span><Plus size={18} /></summary>
            <p>{f.a}</p>
          </details>
        ))}
      </Reveal>
    </div>
  </section>
);

const Cta: React.FC<ProductsPageProps> = ({ openQuoteModalWithSolution }) => (
  <section className="sx-cta">
    <Reveal className="sp-wrap sx-cta-in">
      <div>
        <h2>Tell us what you want to automate</h2>
        <p>Share your site and requirement. We will come back with a clear scope and quotation.</p>
      </div>
      <button type="button" className="sx-cta-btn" onClick={() => openQuoteModalWithSolution('General enquiry')}>
        <span>Request a quote</span><Send size={17} />
      </button>
    </Reveal>
  </section>
);

/* ---------------------------------------------------------------------
   PAGE (replaces the old ProductsPage)
   --------------------------------------------------------------------- */
export const ProductsPage: React.FC<ProductsPageProps> = ({ openQuoteModalWithSolution }) => (
  <div className="sp-page">
    <style>{CSS_EXTRA + CSS}</style>
    <Hero openQuoteModalWithSolution={openQuoteModalWithSolution} />
    <SectorPanels openQuoteModalWithSolution={openQuoteModalWithSolution} />
    <Stats />
    <WhyUs />
    <Process />
    <Reviews />
    <Faq />
    <Cta openQuoteModalWithSolution={openQuoteModalWithSolution} />
  </div>
);

export default ProductsPage;

/* ---------------------------------------------------------------------
   CSS_EXTRA  (define this after the existing `const CSS`)
   --------------------------------------------------------------------- */
const CSS_EXTRA = `
.sx-sectors,.sx-why,.sx-process,.sx-faq,.sx-stats,.sx-cta { position:relative; }
.sx-sectors,.sx-why,.sx-process,.sx-faq { padding:clamp(56px,8vw,104px) 0; }
.sx-head { max-width:720px; margin:0 0 clamp(28px,4vw,48px); }
.sx-head-left { margin-left:0; }
.sx-head-center { margin-left:auto !important; margin-right:auto !important; text-align:center !important; }
.sx-h2 { margin:0 0 12px; font-size:clamp(1.7rem,3.4vw,2.7rem); font-weight:800; line-height:1.15; letter-spacing:-.02em; color:${INK}; text-wrap:balance; }
.sx-lead { margin:0; font-size:clamp(1rem,1.3vw,1.08rem); line-height:1.65; color:#475569; max-width:62ch; }
.sx-light { color:#fff; } .sx-lead-light { color:#C3D1EE; }

/* sector panels */
.sx-sectors { background:#fff; color:${INK}; }
.sx-panels { display:flex; gap:12px; height:clamp(480px,64vh,600px); }
.sx-panel { position:relative; flex:1 1 0; min-width:0; border-radius:20px; overflow:hidden; background-size:cover; background-position:center; color:#fff; transition:flex-grow .6s cubic-bezier(.22,1,.36,1); border:1px solid rgba(7,21,51,.12); }
.sx-panel.on { flex-grow:6; }
.sx-shade { position:absolute; inset:0; background:linear-gradient(180deg,rgba(7,21,51,.25),rgba(7,21,51,.85)); transition:background .5s; }
.sx-panel.on .sx-shade { background:linear-gradient(90deg,rgba(7,21,51,.94) 0%,rgba(7,21,51,.78) 45%,rgba(7,21,51,.25) 100%); }
.sx-tab { position:absolute; inset:0; z-index:2; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; gap:16px; padding:22px 8px; background:none; border:none; color:#fff; cursor:pointer; transition:opacity .3s; }
.sx-panel.on .sx-tab { opacity:0; pointer-events:none; }
.sx-ic { width:40px; height:40px; display:grid; place-items:center; border-radius:12px; background:var(--a); color:${INK}; }
.sx-tab-title { writing-mode:vertical-rl; transform:rotate(180deg); font-weight:700; font-size:1rem; letter-spacing:.01em; white-space:nowrap; }
.sx-body { position:absolute; left:0; top:0; bottom:0; z-index:3; width:min(560px,100%); display:flex; flex-direction:column; justify-content:flex-end; padding:clamp(22px,3vw,40px); opacity:0; visibility:hidden; transform:translateX(-12px); transition:opacity .35s,transform .45s,visibility 0s .35s; }
.sx-panel.on .sx-body { opacity:1; visibility:visible; transform:none; transition:opacity .45s .2s,transform .5s .2s,visibility 0s; }
.sx-cat { margin:0 0 8px; font-size:.88rem; font-weight:600; color:var(--a); }
.sx-body h3 { margin:0 0 6px; font-size:clamp(1.5rem,2.4vw,2.2rem); font-weight:800; line-height:1.12; }
.sx-tag { margin:0 0 12px; font-weight:600; color:#E8F0FF; }
.sx-desc { margin:0 0 16px; font-size:.96rem; line-height:1.65; color:#D3DEF5; }
.sx-list { list-style:none; display:grid; grid-template-columns:1fr 1fr; gap:8px 16px; margin:0 0 16px; padding:0; font-size:.9rem; font-weight:600; }
.sx-list li { display:flex; align-items:center; gap:8px; } .sx-list svg { flex:none; color:var(--a); }
.sx-aud { display:flex; align-items:center; gap:8px; margin:0 0 20px; font-size:.86rem; color:#B8C8E8; }
.sx-actions { display:flex; flex-wrap:wrap; align-items:center; gap:18px; }
.sx-link { display:inline-flex; align-items:center; gap:4px; padding:0; background:none; border:none; cursor:pointer; color:#fff; font-weight:700; font-size:.95rem; border-bottom:2px solid var(--a); }

/* stats */
.sx-stats {
  background: linear-gradient(135deg, ${NAVY} 0%, #0d276b 50%, #081a44 100%);
  color: #fff;
  padding: clamp(52px, 7vw, 84px) 0;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.sx-stats::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.12), transparent 70%);
  pointer-events: none;
}
.sx-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(24px, 3.5vw, 48px);
}
.sx-stat {
  position: relative;
  padding: 16px 20px 16px 24px;
  border-left: 4px solid ${GREEN_LIGHT};
  background: rgba(255, 255, 255, 0.03);
  border-radius: 0 16px 16px 0;
  backdrop-filter: blur(6px);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s, border-color 0.3s, box-shadow 0.3s;
}
.sx-stat:hover {
  transform: translateY(-6px) scale(1.02);
  background: rgba(255, 255, 255, 0.08);
  border-left-color: #38BDF8;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25);
}
.sx-stat b {
  display: flex;
  align-items: baseline;
  font-family: 'Barlow', system-ui, sans-serif;
  font-size: clamp(2.8rem, 4.8vw, 4.4rem);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -0.03em;
  color: #FFFFFF;
  text-shadow: 0 2px 14px rgba(0, 82, 204, 0.35);
  animation: sxStatPop 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.sx-stat b span {
  color: #FFFFFF;
}
.sx-stat > span {
  display: block;
  margin-top: 10px;
  font-size: clamp(1rem, 1.3vw, 1.15rem);
  font-weight: 600;
  line-height: 1.45;
  color: #E2E8F0;
  letter-spacing: 0.01em;
}

@keyframes sxStatPop {
  0% { opacity: 0; transform: scale(0.85) translateY(12px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

/* why */
.sx-why { background:#F5F8FF; color:${INK}; }
.sx-why-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(20px,2.4vw,32px); }
.sx-why-item { padding-top:20px; border-top:3px solid ${BLUE}; }
.sx-why-item:nth-child(even) { border-top-color:${GREEN}; }
.sx-why-ic { display:inline-grid; place-items:center; width:44px; height:44px; margin-bottom:14px; border-radius:12px; background:#fff; color:${NAVY}; border:1px solid #D4E3FB; }
.sx-why-item h3 { margin:0 0 8px; font-size:1.12rem; font-weight:800; }
.sx-why-item p { margin:0; font-size:.95rem; line-height:1.6; color:#475569; }

/* process - Clean White Section Matching Reference with Logo Brand Aura */
.sx-process {
  background: #FFFFFF;
  color: #0F172A;
  padding: clamp(64px, 8vw, 110px) 0;
  border-top: 1px solid #E2E8F0;
  border-bottom: 1px solid #E2E8F0;
  position: relative;
  overflow: hidden;
}
.sx-process::before {
  content: '';
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 780px;
  height: 520px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 82, 204, 0.07) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 75%);
  pointer-events: none;
  z-index: 0;
}
.sx-process-title {
  color: #0F172A !important;
  font-size: clamp(2.2rem, 4vw, 3.2rem) !important;
  font-weight: 800 !important;
  text-align: center !important;
  margin: 0 auto 10px !important;
  letter-spacing: -0.02em !important;
}
.sx-process-lead {
  color: #64748B !important;
  font-size: 1.12rem !important;
  text-align: center !important;
  margin: 0 auto clamp(40px, 5.5vw, 68px) !important;
  max-width: 620px !important;
}
.sx-process-track {
  position: relative;
  width: 100%;
}
.sx-process-line {
  position: absolute;
  top: 36px;
  left: 6%;
  right: 6%;
  height: 2px;
  background: #E2E8F0;
  z-index: 1;
}
.sx-process-line span {
  display: block;
  height: 100%;
  background: #0052CC;
  transform: scaleX(1);
}

.sx-steps {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 2;
}
.sx-step-item {
  position: relative;
}
.sx-step {
  text-align: center;
  padding: 0 8px;
}
.sx-step-dot {
  position: relative;
  z-index: 2;
  width: 72px;
  height: 72px;
  margin: 0 auto 22px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #FFFFFF;
  border: 2px solid #0052CC;
  box-shadow: 0 4px 14px rgba(0, 82, 204, 0.12);
  font: 800 1.35rem 'Barlow', system-ui, sans-serif;
  letter-spacing: 0.04em;
  color: #0052CC;
  transition: all 0.35s ease;
}
.sx-step:hover .sx-step-dot {
  background: #0052CC;
  color: #FFFFFF;
  transform: scale(1.1);
  box-shadow: 0 10px 24px rgba(0, 82, 204, 0.35);
}
.sx-steps h3 {
  margin: 0 0 10px;
  font-size: 1.22rem;
  font-weight: 800;
  line-height: 1.25;
  color: #0F172A;
}
.sx-steps p {
  margin: 0 auto;
  max-width: 240px;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #64748B;
}

/* ============ RESPONSIVE (Tablets & Mobile) ============ */
@media (max-width: 1024px) {
  .sx-steps {
    grid-template-columns: repeat(3, 1fr);
    gap: 36px 20px;
  }
  .sx-process-line {
    display: none;
  }
}

@media (max-width: 768px) {
  .sx-process {
    padding: 50px 0;
  }
  .sx-process-line {
    display: none;
  }
  .sx-steps {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 48px !important;
  }
  .sx-step-item {
    width: 100%;
    max-width: 380px;
  }
  .sx-step {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    padding: 0 16px !important;
  }
  .sx-step-dot {
    width: 76px !important;
    height: 76px !important;
    margin: 0 auto 16px !important;
    font-size: 1.4rem !important;
    border-width: 2.5px !important;
  }
  .sx-steps h3 {
    font-size: 1.35rem !important;
    font-weight: 800 !important;
    color: #0F172A !important;
    margin-bottom: 8px !important;
  }
  .sx-steps p {
    font-size: 1rem !important;
    line-height: 1.65 !important;
    color: #64748B !important;
    max-width: 320px !important;
  }
}

/* faq */
.sx-faq { background:#F5F8FF; color:${INK}; border-top:1px solid #E2E8F0; }
.sx-faq-grid { display:grid; grid-template-columns:minmax(0,.8fr) minmax(0,1.4fr); gap:clamp(24px,5vw,64px); align-items:start; }
.sx-faq .sx-head { margin-bottom:0; }
.sx-acc details { border-bottom:1px solid #D4DEEE; }
.sx-acc summary { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:20px 0; cursor:pointer; list-style:none; font-weight:700; font-size:1.05rem; }
.sx-acc summary::-webkit-details-marker { display:none; }
.sx-acc summary svg { flex:none; color:${BLUE}; transition:transform .25s; }
.sx-acc details[open] summary svg { transform:rotate(45deg); }
.sx-acc details p { margin:0 0 20px; max-width:62ch; line-height:1.7; color:#475569; }

/* cta */
.sx-cta { padding:clamp(40px,6vw,72px) 0; background:linear-gradient(100deg,${NAVY},${BLUE} 60%,${GREEN}); color:#fff; }
.sx-cta-in { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:24px; }
.sx-cta h2 { margin:0 0 8px; font-size:clamp(1.5rem,3vw,2.3rem); font-weight:800; line-height:1.15; }
.sx-cta p { margin:0; max-width:56ch; color:#E1E9FA; line-height:1.6; }
.sx-cta-btn { display:inline-flex; align-items:center; gap:10px; padding:15px 30px; border-radius:40px; border:none; cursor:pointer; font-weight:800; font-size:1rem; color:${NAVY}; background:#fff; transition:transform .25s; }
.sx-cta-btn:hover { transform:translateY(-2px); }

/* responsive */
@media (max-width:1100px) {
  .sx-why-grid, .sx-stats-grid { grid-template-columns:repeat(2,1fr); }
  .sx-steps { grid-template-columns:repeat(3,1fr); row-gap:32px; }
  .sx-steps li:nth-child(3)::before { display:none; }
  .sx-faq-grid { grid-template-columns:1fr; }
}
@media (max-width:860px) {
  .sx-panels { flex-direction:column; height:auto; }
  .sx-panel { flex:none; height:76px; transition:height .55s cubic-bezier(.22,1,.36,1); }
  .sx-panel.on { height:560px; }
  .sx-tab { flex-direction:row; justify-content:flex-start; align-items:center; padding:0 18px; }
  .sx-tab-title { writing-mode:horizontal-tb; transform:none; }
  .sx-body { width:100%; padding:20px; }
  .sx-panel.on .sx-shade { background:linear-gradient(180deg,rgba(7,21,51,.55),rgba(7,21,51,.95)); }
}
@media (max-width:640px) {
  .sx-panel.on { height:620px; }
  .sx-list { grid-template-columns:1fr; }
  .sx-why-grid { grid-template-columns:1fr; }
  .sx-stats-grid { gap:20px 12px; }
  .sx-cta-btn { width:100%; justify-content:center; }
}
/* motion */
.rv { opacity:0; }
.rv.in { animation:sxIn .7s cubic-bezier(.22,1,.36,1) var(--d,0ms) both; }
@keyframes sxIn { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:none} }
@keyframes sxLineX { from{transform:scaleX(0)} to{transform:scaleX(1)} }
@keyframes sxLineY { from{transform:scaleY(0)} to{transform:scaleY(1)} }
.sx-steps li::before { transform-origin:left center; }
.sx-steps li:has(.rv.in)::before { animation:sxLineX .9s ease .35s both; }
.sx-panels.rv .sx-panel { will-change:flex-grow; }
.sx-body > * { transition:opacity .4s,transform .5s; }
.sx-panel:not(.on) .sx-body > * { opacity:0; transform:translateY(10px); }
.sx-panel.on .sx-body > * { opacity:1; transform:none; }
.sx-panel.on .sx-body > *:nth-child(2) { transition-delay:.28s; }
.sx-panel.on .sx-body > *:nth-child(3) { transition-delay:.34s; }
.sx-panel.on .sx-body > *:nth-child(4) { transition-delay:.40s; }
.sx-panel.on .sx-body > *:nth-child(5) { transition-delay:.46s; }
.sx-panel.on .sx-body > *:nth-child(6) { transition-delay:.52s; }
.sx-panel.on .sx-body > *:nth-child(7) { transition-delay:.58s; }
.sx-panel { background-size:cover; transform:translateZ(0); }
.sx-panel.on { box-shadow:0 24px 50px -18px rgba(7,21,51,.55); }
.sx-ic { transition:transform .3s; } .sx-tab:hover .sx-ic { transform:scale(1.12); }
@media (max-width:640px) {
  .sx-steps li:has(.rv.in)::before { animation-name:sxLineY; transform-origin:top center; }
}
@media (prefers-reduced-motion: reduce) {
  .rv { opacity:1 !important; animation:none !important; }
  .sx-steps li::before { animation:none !important; }
  .sx-body > * { transition:none !important; }
}
@media (prefers-reduced-motion: reduce) {
  .sx-panel,.sx-body,.sx-tab,.sx-shade { transition:none !important; }
}
`;

/* ---------------------------------------------------------------------
   BASE STYLES (hero, shared, reviews) - all scoped under .sp-page
   --------------------------------------------------------------------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@500;600;700&display=swap');

.sp-page { --navy:${NAVY}; --blue:${BLUE}; --green:${GREEN}; --ink:${INK};
  background:${INK}; color:#fff; font-family:'Barlow',system-ui,sans-serif; overflow-x:hidden; }
.sp-page *, .sp-page *::before, .sp-page *::after { box-sizing:border-box; }
.sp-page button { font-family:inherit; }
.sp-page :focus-visible { outline:3px solid ${GREEN_LIGHT}; outline-offset:3px; }
.sp-wrap { width:100%; max-width:1320px; margin:0 auto; padding:0 clamp(16px,5vw,64px); position:relative; z-index:2; }
.sp-anim { animation:spUp .55s cubic-bezier(.16,1,.3,1) both; }
@keyframes spUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
@keyframes spBg { from{opacity:0;transform:scale(1.04)} to{opacity:1;transform:scale(1)} }

.sp-grad { background:linear-gradient(100deg,${BLUE},${GREEN}); -webkit-background-clip:text; background-clip:text; color:transparent; }
.sp-grid-bg { position:absolute; inset:0; pointer-events:none;
  background-image:linear-gradient(rgba(20,48,127,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(20,48,127,.07) 1px,transparent 1px); background-size:36px 36px; }
.sp-h2 { margin:0 0 12px; font-size:clamp(1.8rem,3.8vw,3rem); font-weight:800; line-height:1.12; letter-spacing:-.02em; color:${INK}; text-wrap:balance; }

.sp-btn { display:inline-flex; align-items:center; justify-content:center; gap:10px; padding:15px 30px; border-radius:40px; font-weight:700; font-size:1rem; cursor:pointer; transition:transform .25s,box-shadow .25s,background .25s,border-color .25s; }
.sp-btn:hover { transform:translateY(-2px); }
.sp-btn-sm { padding:11px 20px; font-size:.92rem; }
.sp-btn-primary { color:#fff; border:none; background:linear-gradient(100deg,${BLUE},${GREEN}); box-shadow:0 10px 26px rgba(11,99,206,.4); }
.sp-btn-primary:hover { box-shadow:0 14px 32px rgba(59,170,53,.4); }
.sp-btn-ghost { color:#fff; background:rgba(255,255,255,.08); border:1.5px solid rgba(255,255,255,.4); backdrop-filter:blur(8px); }
.sp-btn-ghost:hover { background:rgba(255,255,255,.18); border-color:#fff; }

/* ============ HERO ============ */
.sp-hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  overflow: hidden;
  isolation: isolate;
  background: ${INK};
  box-sizing: border-box;
}
.sp-hero-bg { position:absolute; inset:0; z-index:0; background-size:cover; background-position:center; animation:spBg .8s ease both; }
.sp-hero-shade { position:absolute; inset:0; z-index:1;
  background:linear-gradient(90deg,rgba(7,21,51,.97) 0%,rgba(10,28,70,.9) 38%,rgba(11,40,100,.5) 72%,rgba(11,60,90,.3) 100%),linear-gradient(180deg,rgba(7,21,51,.45) 0%,transparent 35%,rgba(7,21,51,.8) 100%); }
.sp-topline { position:absolute; top:0; left:0; right:0; height:4px; z-index:3; background:linear-gradient(90deg,${NAVY},${BLUE} 55%,${GREEN}); }
.sp-hero-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  padding-top: clamp(86px, 12vh, 110px);
  padding-bottom: clamp(20px, 3.5vh, 36px);
  min-height: 100vh;
  min-height: 100dvh;
  box-sizing: border-box;
}
.sp-hero-grid { flex:1; display:grid; grid-template-columns:minmax(0,1fr) auto; align-items:center; gap:48px; }
.sp-hero-content { max-width:620px; min-width:0; }
.sp-badge { --a:${BLUE_LIGHT}; display:inline-flex; align-items:center; max-width:100%; margin-bottom:20px; border-radius:30px; overflow:hidden; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.2); backdrop-filter:blur(10px); font-size:.85rem; font-weight:600; letter-spacing:.04em; }
.sp-badge b { padding:7px 12px; font:700 .95rem 'Barlow Condensed',sans-serif; letter-spacing:.08em; color:${INK}; background:var(--a); }
.sp-badge span { padding:7px 16px 7px 12px; color:#E8F0FF; }
.sp-hero-title { margin:0 0 12px; font-size:clamp(2.1rem,4.6vw,4rem); font-weight:800; line-height:1.06; letter-spacing:-.025em; text-wrap:balance; }
.sp-hero-tagline { margin:0 0 16px; font-size:clamp(1.05rem,1.7vw,1.3rem); font-weight:600; line-height:1.4; }
.sp-hero-desc { margin:0 0 18px; max-width:540px; font-size:1.05rem; line-height:1.7; color:#D3DEF5; }
.sp-for { display:flex; align-items:flex-start; gap:10px; margin-bottom:20px; font-size:.98rem; line-height:1.5; }
.sp-for svg { flex:none; margin-top:3px; color:${GREEN_LIGHT}; }
.sp-for em { font-style:normal; font-weight:700; color:${GREEN_LIGHT}; margin-right:6px; }
.sp-tags { list-style:none; display:flex; flex-wrap:wrap; gap:8px; margin:0 0 28px; padding:0; }
.sp-tags li { padding:6px 14px; border-radius:20px; font-size:.85rem; font-weight:600; color:#EAF1FF; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.22); }
.sp-ctas { display:flex; flex-wrap:wrap; gap:14px; }

.sp-hero-cards { display:flex; align-items:center; gap:16px; }
.sp-hcard { position:relative; flex:none; width:196px; height:310px; padding:0; border:1.5px solid rgba(255,255,255,.3); border-radius:22px; overflow:hidden; cursor:pointer; text-align:left; color:#fff; background-size:cover; background-position:center; box-shadow:0 18px 40px rgba(0,0,0,.5); transition:transform .35s cubic-bezier(.25,1,.5,1),border-color .3s; }
.sp-hcard-next { width:224px; height:350px; border:2px solid ${GREEN_LIGHT}; box-shadow:0 22px 46px rgba(0,0,0,.55),0 0 0 4px rgba(59,170,53,.18); }
.sp-hcard:hover { transform:translateY(-8px); border-color:#fff; }
.sp-hcard-shade { position:absolute; inset:0; background:linear-gradient(180deg,rgba(7,21,51,.05) 0%,rgba(7,21,51,.35) 50%,rgba(7,21,51,.95) 100%); }
.sp-hcard-num { position:absolute; top:12px; left:12px; padding:4px 10px; border-radius:10px; font:700 .9rem 'Barlow Condensed',sans-serif; letter-spacing:.08em; color:${INK}; background:${BLUE_LIGHT}; }
.sp-hcard-next .sp-hcard-num { background:${GREEN_LIGHT}; }
.sp-hcard-info { position:absolute; left:14px; right:14px; bottom:14px; display:block; }
.sp-hcard-info small { display:block; margin-bottom:3px; font:600 .78rem 'Barlow Condensed',sans-serif; letter-spacing:.1em; text-transform:uppercase; color:${GREEN_LIGHT}; }
.sp-hcard-info strong { display:block; font-size:1.05rem; font-weight:700; line-height:1.2; }
.sp-hcard-meta { display:flex; align-items:center; gap:6px; margin-top:8px; font-size:.8rem; font-weight:600; color:#B8C8E8; }
.sp-hcard-meta svg { color:${GREEN_LIGHT}; }

.sp-controls { display:flex; align-items:center; gap:22px; padding-top:20px; border-top:1px solid rgba(255,255,255,.16); }
.sp-arrows { display:flex; gap:10px; }
.sp-nav { width:46px; height:46px; display:grid; place-items:center; border-radius:50%; cursor:pointer; color:#fff; background:rgba(255,255,255,.08); border:1.5px solid rgba(255,255,255,.35); transition:background .25s,border-color .25s,transform .25s; }
.sp-nav:hover { background:${BLUE}; border-color:${BLUE}; transform:scale(1.06); }
.sp-count { display:flex; align-items:baseline; gap:8px; font-weight:600; color:#B8C8E8; }
.sp-count b { font-size:1.5rem; font-weight:800; color:#fff; }
.sp-dots { display:flex; gap:8px; margin-left:auto; }
.sp-dots i { width:22px; height:4px; border-radius:2px; background:rgba(255,255,255,.22); transition:background .3s,width .3s; }
.sp-dots i.on { width:44px; background:linear-gradient(90deg,${BLUE_LIGHT},${GREEN_LIGHT}); }

/* ============ REVIEWS ============ */
.sp-reviews { position:relative; padding:clamp(56px,8vw,96px) 0 clamp(64px,8vw,110px); background:#fff; color:${INK}; border-top:1px solid #E2E8F0; overflow:hidden; }
.sp-rev-grid { display:grid; grid-template-columns:minmax(300px,.9fr) minmax(0,1.25fr); gap:clamp(28px,5vw,56px); align-items:center; }
.sp-reviews .sp-h2 { margin-bottom:24px; }
.sp-score-row { display:flex; align-items:center; flex-wrap:wrap; gap:clamp(20px,3vw,36px); }
.sp-score { display:flex; align-items:baseline; gap:8px; }
.sp-score b { font-size:clamp(3.6rem,6.5vw,5.2rem); font-weight:800; line-height:1; letter-spacing:-.03em; color:${NAVY}; }
.sp-score span { font-size:1.3rem; font-weight:600; color:#64748B; }
.sp-score-note { margin-top:10px; font-size:.9rem; font-weight:500; color:#64748B; }
.sp-bars { flex:1; min-width:180px; display:flex; flex-direction:column; gap:8px; }
.sp-bar { display:flex; align-items:center; gap:8px; font-size:.84rem; font-weight:700; }
.sp-bar > span { display:flex; align-items:center; gap:4px; width:38px; }
.sp-bar > div { flex:1; height:6px; border-radius:4px; background:#E2E8F0; overflow:hidden; }
.sp-bar i { display:block; height:100%; border-radius:4px; background:linear-gradient(90deg,${NAVY},${BLUE}); }
.sp-trust { display:inline-flex; align-items:center; gap:8px; margin-top:26px; padding:8px 16px; border-radius:24px; background:#F1F7FF; border:1px solid #D4E3FB; font-size:.82rem; font-weight:600; }
.sp-trust svg { flex:none; color:${GREEN}; }

.sp-rcard { display:flex; flex-direction:column; justify-content:space-between; min-height:300px; padding:clamp(22px,3vw,34px); border-radius:24px; background:#fff; border:1px solid #E2E8F0; box-shadow:0 20px 50px -10px rgba(20,48,127,.12),0 4px 12px rgba(20,48,127,.05); animation:spUp .45s ease both; }
.sp-rcard-top { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }
.sp-rcard-top h3 { margin:0; font-size:1.25rem; font-weight:800; line-height:1.2; }
.sp-loc { display:flex; align-items:center; gap:4px; margin-top:4px; font-size:.8rem; color:#64748B; }
.sp-loc svg { color:${BLUE}; flex:none; }
.sp-rcard-top time { font-size:.82rem; font-weight:600; color:#94A3B8; white-space:nowrap; }
.sp-stars { display:flex; gap:3px; margin:14px 0; }
.sp-rcard blockquote { margin:0; font-size:.98rem; line-height:1.7; color:#334155; }
.sp-rcard-foot { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; margin-top:22px; padding-top:18px; border-top:1px solid #F1F5F9; }
.sp-person { display:flex; align-items:center; gap:12px; min-width:0; }
.sp-avatar { width:42px; height:42px; flex:none; display:grid; place-items:center; border-radius:50%; color:#fff; font-weight:700; font-size:.9rem; }
.sp-person b { display:block; font-size:.85rem; line-height:1.3; }
.sp-person small { display:block; margin-top:2px; font-size:.75rem; font-weight:600; color:${BLUE}; }
.sp-rctl { display:flex; align-items:center; gap:10px; }
.sp-rdots { display:flex; gap:4px; align-items:center; padding:7px 10px; border-radius:12px; background:#F1F5F9; }
.sp-rdots button { width:7px; height:6px; padding:0; border:none; border-radius:3px; cursor:pointer; background:#CBD5E1; transition:all .25s; }
.sp-rdots button.on { width:22px; background:${NAVY}; }
.sp-rbtn { width:36px; height:36px; display:grid; place-items:center; border-radius:50%; cursor:pointer; color:${INK}; background:#fff; border:1px solid #CBD5E1; transition:all .2s; }
.sp-rbtn:hover { background:${INK}; color:#fff; border-color:${INK}; }
.sp-rbtn-dark { color:#fff; background:${NAVY}; border-color:${NAVY}; }
.sp-rbtn-dark:hover { background:${BLUE}; border-color:${BLUE}; }

/* ============ RESPONSIVE ============ */
@media (max-width:1100px) {
  .sp-hero-grid { grid-template-columns:minmax(0,1fr); gap:28px; align-content:center; }
  .sp-hero-content { max-width:680px; }
  .sp-hero-cards { gap:12px; overflow-x:auto; padding:4px 2px 10px; scrollbar-width:none; }
  .sp-hero-cards::-webkit-scrollbar { display:none; }
  .sp-hcard, .sp-hcard-next { width:170px; height:220px; border-radius:18px; }
  .sp-hcard-info strong { font-size:.95rem; }
}
@media (max-width:900px) {
  .sp-rev-grid { grid-template-columns:1fr; }
}
@media (max-width:640px) {
  .sp-hero { min-height:0; }
  .sp-hero-inner {
    padding-top: 76px;
    padding-bottom: 24px;
    gap: 22px;
    min-height: 0;
  }
  .sp-hero-shade { background:linear-gradient(180deg,rgba(7,21,51,.9) 0%,rgba(10,28,70,.93) 55%,rgba(7,21,51,.97) 100%); }
  .sp-hero-desc { font-size:1rem; }
  .sp-btn { flex:1 1 100%; padding:14px 20px; }
  .sp-hcard, .sp-hcard-next { width:148px; height:192px; border-radius:16px; }
  .sp-hcard-info { left:10px; right:10px; bottom:10px; }
  .sp-hcard-info small { display:none; }
  .sp-controls { gap:14px; }
  .sp-nav { width:42px; height:42px; }
  .sp-dots { display:none; }
  .sp-count { margin-left:auto; }
  .sp-rcard-foot { flex-direction:column; align-items:flex-start; }
  .sp-rctl { width:100%; justify-content:space-between; }
}

@media (prefers-reduced-motion: reduce) {
  .sp-page *, .sp-page *::before, .sp-page *::after { animation:none !important; transition:none !important; }
}
`;