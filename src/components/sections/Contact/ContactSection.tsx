import React, { useState, useEffect, useRef } from 'react';
import { COMPANY_INFO, SOLUTION_SECTORS } from '@/data/nuoData';
import {
  Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, ArrowRight, ArrowUpRight,
  Navigation, Clock, Bot, ClipboardList, Users, Wrench, Rocket, Cpu, Sun, Plane,
  CircuitBoard, Zap, Layers, Compass
} from 'lucide-react';

// ----------------------------------------------------
// Helpers: in-view detection + scroll reveal
// ----------------------------------------------------
const useInView = <T extends HTMLElement>(threshold = 0.15) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      const timer = setTimeout(() => setInView(true), 0);
      return () => clearTimeout(timer);
    }
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
  const [ref, inView] = useInView<HTMLDivElement>(0.08);
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

// ----------------------------------------------------
// Content
// ----------------------------------------------------
const HOURS = 'Mon – Sat: 9:00 AM – 7:00 PM';
const sectorIcons = [
  <Cpu key="cpu" size={24} />,
  <Sun key="sun" size={24} />,
  <Plane key="plane" size={24} />,
  <CircuitBoard key="cb" size={24} />,
  <Zap key="zap" size={24} />,
  <Layers key="layers" size={24} />,
  <Compass key="comp" size={24} />,
  <Wrench key="wrench" size={24} />
];
const sectorColors = ['#0B63CE', '#3BAA35', '#14307F', '#2E9E5B'];

const steps = [
  { icon: <ClipboardList size={26} />, title: 'Send your inquiry', text: 'Tell us what you need using the form, a call or WhatsApp.' },
  { icon: <Users size={26} />, title: 'Engineer review', text: 'A technical team member studies your requirement and gets in touch.' },
  { icon: <Wrench size={26} />, title: 'Plan and quote', text: 'We discuss design, scope, timeline and give you a clear quote.' },
  { icon: <Rocket size={26} />, title: 'Build and deliver', text: 'We build, install and commission, then support you after.' }
];

// ----------------------------------------------------
// Social icons
// ----------------------------------------------------
const Socials: React.FC = () => {
  const items = [
    { title: 'LinkedIn', href: COMPANY_INFO.socials.linkedin, c: '#0A66C2', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg> },
    { title: 'YouTube', href: COMPANY_INFO.socials.youtube, c: '#FF0000', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg> },
    { title: 'Facebook', href: COMPANY_INFO.socials.facebook, c: '#1877F2', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
    { title: 'Instagram', href: COMPANY_INFO.socials.instagram, c: '#DC2743', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> }
  ];
  return (
    <div className="ct-socials">
      {items.map((s) => (
        <a key={s.title} href={s.href} target="_blank" rel="noreferrer" title={s.title} aria-label={s.title} style={{ ['--c' as string]: s.c }}>
          {s.icon}
        </a>
      ))}
    </div>
  );
};

// ----------------------------------------------------
// Page
// ----------------------------------------------------
export const ContactSection: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>(SOLUTION_SECTORS[0].title);
  const [selectedSubItem, setSelectedSubItem] = useState<string>(SOLUTION_SECTORS[0].subItems[0]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [processRef, processVisible] = useInView<HTMLDivElement>(0.2);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (resetTimer.current) clearTimeout(resetTimer.current); }, []);

  const currentSectorObj = SOLUTION_SECTORS.find((s) => s.title === selectedSector) || SOLUTION_SECTORS[0];

  const handleSectorChange = (title: string) => {
    setSelectedSector(title);
    const sec = SOLUTION_SECTORS.find((s) => s.title === title);
    setSelectedSubItem(sec && sec.subItems.length > 0 ? sec.subItems[0] : '');
  };

  const pickSectorAndScroll = (title: string, sub?: string) => {
    handleSectorChange(title);
    if (sub) setSelectedSubItem(sub);
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: send to your backend / email service, for example:
    // await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ...formData, sector: selectedSector, option: selectedSubItem })
    // });

    setSubmitted(true);
    resetTimer.current = setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.fullAddress)}`;

  const quick = [
    { c: '#0B63CE', icon: <Phone size={24} />, label: 'Call us', value: `+91 ${COMPANY_INFO.phone}`, href: `tel:${COMPANY_INFO.phone}` },
    { c: '#25D366', icon: <MessageSquare size={24} />, label: 'WhatsApp', value: `+91 ${COMPANY_INFO.whatsapp}`, href: COMPANY_INFO.whatsappUrl, ext: true },
    { c: '#14307F', icon: <Mail size={24} />, label: 'Email', value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
    { c: '#3BAA35', icon: <Clock size={24} />, label: 'Working hours', value: HOURS }
  ];

  return (
    <div className="ct">
      <style>{css}</style>

      {/* ================= HERO ================= */}
      <section className="ct-hero">
        <div className="ct-container ct-hero-inner">
          <div className="ct-hero-grid">
            <div className="ct-hero-left">
              <div className="ct-pill ct-up" style={{ animationDelay: '0.1s' }}>
                <Bot size={16} />
                <span>Get in touch with engineering experts</span>
              </div>

              <h1 className="ct-h1 ct-up" style={{ animationDelay: '0.2s' }}>
                Our doors are
                <span className="ct-h1-grad">always open!</span>
              </h1>

              <p className="ct-lead ct-up" style={{ animationDelay: '0.35s' }}>
                We welcome industrial partners, agricultural engineers, solar clients and innovators to
                consult directly with our technical team. Build your next automated solution with SMARToi.
              </p>

              <div className="ct-btns ct-up" style={{ animationDelay: '0.5s' }}>
                <a href={`tel:${COMPANY_INFO.phone}`} className="ct-btn ct-btn-blue">
                  <Phone size={18} />
                  <span>{COMPANY_INFO.phone}</span>
                  <ArrowRight size={18} />
                </a>
                <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="ct-btn ct-btn-wa">
                  <MessageSquare size={18} />
                  <span>WhatsApp inquiry</span>
                  <ArrowRight size={18} />
                </a>
              </div>

              <div className="ct-trust ct-up" style={{ animationDelay: '0.65s' }}>
                <span><i />Reply within 24 hours</span>
                <span><i />Free consultation</span>
                <span><i />Site visits across Tamil Nadu</span>
              </div>
            </div>

            <div className="ct-hero-right ct-zoom" style={{ animationDelay: '0.3s' }}>
              <div className="ct-art ct-video-art">
                <span className="ct-art-ring ct-art-ring-1" />
                <span className="ct-art-ring ct-art-ring-2" />
                
                {/* Looping clean video container without burned-in text */}
                <div className="ct-video-frame">
                  <video
                    src="/v/them.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="ct-hero-video"
                  />
                  <div className="ct-video-overlay" />
                </div>              
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK CONTACT CARDS ================= */}
      <section className="ct-quick-wrap">
        <div className="ct-container">
          <div className="ct-quick">
            {quick.map((q, i) => {
              const inner = (
                <>
                  <span className="ct-qicon">{q.icon}</span>
                  <span className="ct-qtext">
                    <small>{q.label}</small>
                    <b>{q.value}</b>
                  </span>
                  {q.href && <ArrowUpRight size={20} className="ct-qarrow" />}
                </>
              );
              return (
                <Reveal key={q.label} delay={i * 90} style={{ height: '100%' }}>
                  {q.href ? (
                    <a
                      className="ct-qcard"
                      href={q.href}
                      style={{ ['--c' as string]: q.c }}
                      {...(q.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="ct-qcard ct-qcard-static" style={{ ['--c' as string]: q.c }}>
                      {inner}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SECTORS ================= */}
      <section className="ct-section ct-soft">
        <div className="ct-container">
          <Reveal>
            <div className="ct-head">
              <p className="ct-eyebrow"><span />What can we help with?</p>
              <h2 className="ct-h2">Pick a solution and ask us directly.</h2>
              <p className="ct-sub">Choose a sector below and we will pre-fill the contact form for you.</p>
            </div>
          </Reveal>

          <div className="ct-sectors">
            {SOLUTION_SECTORS.map((sec, i) => (
              <Reveal key={sec.id} delay={(i % 3) * 90} style={{ height: '100%' }}>
                <button
                  type="button"
                  className="ct-sector"
                  style={{ ['--c' as string]: sectorColors[i % sectorColors.length] }}
                  onClick={() => pickSectorAndScroll(sec.title)}
                >
                  <span className="ct-sector-icon">{sectorIcons[i % sectorIcons.length]}</span>
                  <h3>{sec.title}</h3>
                  <span className="ct-tags">
                    {sec.subItems.slice(0, 3).map((t) => (
                      <em key={t}>{t}</em>
                    ))}
                    {sec.subItems.length > 3 && <em>+{sec.subItems.length - 3} more</em>}
                  </span>
                  <span className="ct-sector-go">Ask about this <ArrowRight size={16} /></span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="ct-section">
        <div className="ct-container">
          <Reveal>
            <div className="ct-head ct-head-c">
              <p className="ct-eyebrow ct-eyebrow-c"><span />What happens next</p>
              <h2 className="ct-h2">From your message to a working system.</h2>
            </div>
          </Reveal>

          <div ref={processRef} className={`ct-process ${processVisible ? 'is-in' : ''}`}>
            <div className="ct-process-line"><span /></div>
            {steps.map((s, i) => (
              <div className="ct-step" key={s.title} style={{ ['--i' as string]: i, ['--c' as string]: i % 2 === 0 ? '#0B63CE' : '#3BAA35' }}>
                <div className="ct-step-dot">{s.icon}<b>{i + 1}</b></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA BAND ================= */}
      <section className="ct-cta-wrap">
        <div className="ct-container">
          <Reveal dir="zoom">
            <div className="ct-cta">
              <div>
                <h2>Have a project in mind?</h2>
                <p>Talk to an engineer today. We will help you plan, build and commission it.</p>
              </div>
              <div className="ct-cta-btns">
                <a href={`tel:${COMPANY_INFO.phone}`} className="ct-btn ct-btn-white"><Phone size={18} /> Call now</a>
                <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="ct-btn ct-btn-wa-solid"><MessageSquare size={18} /> WhatsApp</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="ct-map" id="google-map-section">
        <div className="ct-container ct-map-inner">
          <Reveal>
            <div className="ct-map-head">
              <div className="ct-pill ct-pill-light"><Navigation size={14} /><span>Location and navigation</span></div>
              <h2>Find us on Google Maps</h2>
              <p><b>Address:</b> {COMPANY_INFO.fullAddress}</p>
              <a className="ct-btn ct-btn-white" href={mapsLink} target="_blank" rel="noopener noreferrer">
                <Navigation size={18} /> Get directions
              </a>
            </div>
          </Reveal>

          <Reveal dir="zoom" delay={100}>
            <div className="ct-map-frame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3789.877281103638!2d78.14030707504413!3d10.93337638922508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDU2JzAwLjIiTiA3OMKwMDgnMzQuNCJF!5e1!3m2!1sen!2sin!4v1790999812422!5m2!1sen!2sin"
                width="100%"
                height="460"
                style={{ border: 0, display: 'block' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="SMARToi Google Maps Location"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FORM + DETAILS (last section, sits right above the footer) ================= */}
      <section className="ct-section ct-form-section" id="contact-form">
        <div className="ct-container">
          <Reveal>
            <div className="ct-head">
              <p className="ct-eyebrow"><span />Contact form</p>
              <h2 className="ct-h2">Tell us about your project.</h2>
              <p className="ct-sub">Share your requirement and our engineering team will reply promptly.</p>
            </div>
          </Reveal>

          <div className="ct-main-grid">
            {/* Form */}
            <Reveal dir="up">
              <div className="ct-form-card">
                <h3>Send us a message</h3>
                <p>Fill in your project requirements below.</p>

                {submitted ? (
                  <div className="ct-success" role="status">
                    <CheckCircle2 size={54} />
                    <h4>Message sent successfully!</h4>
                    <p>Thank you {formData.name}. Your inquiry has reached the SMARToi engineering team. We will respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="ct-row">
                      <label className="ct-field">
                        <span>What you would like *</span>
                        <select value={selectedSector} onChange={(e) => handleSectorChange(e.target.value)}>
                          {SOLUTION_SECTORS.map((sec) => (
                            <option key={sec.id} value={sec.title}>{sec.title}</option>
                          ))}
                        </select>
                      </label>
                      <label className="ct-field">
                        <span>Option *</span>
                        <select value={selectedSubItem} onChange={(e) => setSelectedSubItem(e.target.value)}>
                          {currentSectorObj && currentSectorObj.subItems.map((sub, idx) => (
                            <option key={idx} value={sub}>{sub}</option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="ct-row ct-row-1">
                      <label className="ct-field">
                        <span>Full name *</span>
                        <input type="text" required autoComplete="name" placeholder="Enter your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                      </label>
                    </div>

                    <div className="ct-row">
                      <label className="ct-field">
                        <span>Email address *</span>
                        <input type="email" required autoComplete="email" placeholder="name@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                      </label>
                      <label className="ct-field">
                        <span>Phone number *</span>
                        <input type="tel" required autoComplete="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                      </label>
                    </div>

                    <div className="ct-row ct-row-1">
                      <label className="ct-field">
                        <span>Your message *</span>
                        <textarea required rows={4} placeholder="Tell us about your project, machine needs or automation goals..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                      </label>
                    </div>

                    <button type="submit" className="ct-btn ct-btn-send">
                      <Send size={18} /> <span>Send message</span>
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Details */}
            <Reveal dir="up" delay={100}>
              <div className="ct-details">
                <div className="ct-det-in">
                  <div className="ct-det-brand">
                    <span className="ct-det-logo"><img src="/img/logos.jpeg" alt="SMARToi logo" /></span>
                    <small>Future begins now</small>
                  </div>

                  <div className="ct-info">
                    <div className="ct-info-row ct-info-row-blue">
                      <span className="ct-info-icon"><MapPin size={20} /></span>
                      <span><small>Address</small><b>{COMPANY_INFO.fullAddress}</b></span>
                    </div>
                    <div className="ct-info-row ct-info-row-green">
                      <span className="ct-info-icon"><Mail size={20} /></span>
                      <span><small>Email</small><b><a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a></b></span>
                    </div>
                    <div className="ct-info-row ct-info-row-blue">
                      <span className="ct-info-icon"><Phone size={20} /></span>
                      <span>
                        <small>Call us</small>
                        <b>
                          <a href={`tel:${COMPANY_INFO.phone}`}>+91 {COMPANY_INFO.phone}</a>
                          <br />
                          <a href={`tel:${COMPANY_INFO.whatsapp}`}>+91 {COMPANY_INFO.whatsapp}</a>
                        </b>
                      </span>
                    </div>
                    <div className="ct-info-row ct-info-row-green">
                      <span className="ct-info-icon"><MessageSquare size={20} /></span>
                      <span>
                        <small>WhatsApp</small>
                        <b><a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer">Chat with us</a></b>
                      </span>
                    </div>
                    <div className="ct-info-row ct-info-row-blue">
                      <span className="ct-info-icon"><Clock size={20} /></span>
                      <span><small>Working hours</small><b>{HOURS}</b></span>
                    </div>
                  </div>

                  <div className="ct-follow">
                    <span>Connect with us</span>
                    <Socials />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
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

.ct { --navy:#14307F; --blue:#0B63CE; --green:#3BAA35; --ink:#0F1F4D;
  font-family:'Barlow',system-ui,sans-serif; background:#fff; color:#0F172A;
  width:100%; overflow-x:hidden; overflow-x:clip; -webkit-text-size-adjust:100%; }
.ct *, .ct *::before, .ct *::after { box-sizing:border-box; }
.ct img { max-width:100%; }
.ct-container { width:100%; max-width:1400px; margin:0 auto; padding:0 32px; }
.ct button, .ct input, .ct select, .ct textarea { font-family:inherit; }
.ct :focus-visible { outline:3px solid rgba(11,99,206,.45); outline-offset:2px; }

/* reveal (one-time, on scroll) */
.rv { opacity:0; transition:opacity .7s cubic-bezier(.16,1,.3,1) var(--d,0ms), transform .7s cubic-bezier(.16,1,.3,1) var(--d,0ms); will-change:opacity, transform; }
.rv-up { transform:translateY(36px); } .rv-left { transform:translateX(-36px); }
.rv-right { transform:translateX(36px); } .rv-zoom { transform:scale(.92); }
.rv-in { opacity:1; transform:none; }

/* entrance keyframes for hero */
.ct-up { opacity:0; animation:ctUp .9s cubic-bezier(.16,1,.3,1) forwards; }
.ct-zoom { opacity:0; animation:ctZoom 1s cubic-bezier(.16,1,.3,1) forwards; }

@keyframes ctUp {
  from { opacity:0; transform:translateY(32px); }
  to { opacity:1; transform:none; }
}
@keyframes ctZoom {
  from { opacity:0; transform:scale(.92) translateY(20px); }
  to { opacity:1; transform:none; }
}
@keyframes ctFloat {
  0%, 100% { transform:translateY(0); }
  50% { transform:translateY(-8px); }
}
@keyframes ctPulse {
  0%, 100% { transform:scale(1); opacity:.28; }
  50% { transform:scale(1.06); opacity:.45; }
}

/* shared type */
.ct-eyebrow { display:flex; align-items:center; gap:12px; margin:0 0 16px; font:600 .95rem 'Barlow Condensed',sans-serif; letter-spacing:.18em; text-transform:uppercase; color:var(--blue); }
.ct-eyebrow span { width:32px; height:2px; background:currentColor; flex:none; }
.ct-eyebrow-c { justify-content:center; }
.ct-h2 { margin:0 0 14px; font-size:clamp(1.8rem,3.6vw,3rem); font-weight:700; line-height:1.12; letter-spacing:-.02em; color:var(--ink); }
.ct-sub { margin:0; max-width:560px; font-size:1.05rem; line-height:1.7; color:#475569; }
.ct-section { position:relative; padding:96px 0; }
.ct-soft { background:linear-gradient(180deg,#F5F8FC,#EAF3FF); }
.ct-head { margin-bottom:48px; }
.ct-head-c { text-align:center; } .ct-head-c .ct-sub { margin:0 auto; }

/* buttons */
.ct-btn { display:inline-flex; align-items:center; justify-content:center; gap:10px; padding:15px 28px; border-radius:40px; font-size:1rem; font-weight:700; cursor:pointer; text-decoration:none; border:1.5px solid transparent; transition:transform .25s ease, box-shadow .25s ease, background .25s ease, color .25s ease, border-color .25s ease; }
.ct-btn:hover { transform:translateY(-3px); }
.ct-btn-blue { background:var(--blue); color:#fff; box-shadow:0 10px 26px rgba(11,99,206,.35); }
.ct-btn-blue:hover { background:var(--navy); box-shadow:0 14px 32px rgba(20,48,127,.4); }
.ct-btn-wa { background:#fff; color:#1DA851; border-color:#25D366; box-shadow:0 4px 15px rgba(37,211,102,.15); }
.ct-btn-wa:hover { background:#25D366; color:#fff; box-shadow:0 10px 26px rgba(37,211,102,.4); }
.ct-btn-send { width:100%; margin-top:8px; color:#fff; background:linear-gradient(100deg,#14307F,#0B63CE 60%,#3BAA35); box-shadow:0 10px 26px rgba(11,99,206,.35); }
.ct-btn-white { background:#fff; color:var(--navy); box-shadow:0 10px 26px rgba(0,0,0,.2); }
.ct-btn-white:hover { background:#EAF3FF; }
.ct-btn-wa-solid { background:#25D366; color:#fff; box-shadow:0 10px 26px rgba(0,0,0,.2); }
.ct-btn-wa-solid:hover { background:#1DA851; }

/* ---------- hero: white base + soft static gradient colour ---------- */
.ct-hero {
  position:relative; padding:130px 0 120px; color:var(--ink);
  background:
    radial-gradient(60% 70% at 0% 0%, rgba(11,99,206,.16) 0%, rgba(11,99,206,0) 70%),
    radial-gradient(55% 65% at 100% 100%, rgba(59,170,53,.18) 0%, rgba(59,170,53,0) 70%),
    radial-gradient(40% 50% at 100% 0%, rgba(11,99,206,.07) 0%, rgba(11,99,206,0) 70%),
    #fff;
}
.ct-hero::before { content:''; position:absolute; top:0; left:0; right:0; height:4px; z-index:3; background:linear-gradient(90deg,#1A3A8F,#0B63CE 55%,#3BAA35); }
.ct-hero-inner { position:relative; z-index:2; }

.ct-hero-grid { display:grid; grid-template-columns:minmax(0,1.05fr) minmax(0,1fr); gap:56px; align-items:center; }

.ct-pill { display:inline-flex; align-items:center; gap:8px; margin-bottom:24px; padding:8px 18px; border-radius:30px; font:600 .9rem 'Barlow Condensed',sans-serif; letter-spacing:.12em; text-transform:uppercase; color:var(--blue); background:#EFF6FF; border:1px solid #BFDBFE; box-shadow:0 2px 10px rgba(11,99,206,.08); max-width:100%; }
.ct-h1 { margin:0 0 20px; font-size:clamp(2.2rem,5vw,4.5rem); font-weight:800; line-height:1.07; letter-spacing:-.03em; color:var(--ink); }
.ct-h1-grad { display:block; max-width:100%; padding-bottom:.08em; background:linear-gradient(90deg,#0B63CE,#3BAA35); -webkit-background-clip:text; background-clip:text; color:transparent; -webkit-text-fill-color:transparent; }
.ct-lead { margin:0 0 32px; max-width:540px; padding-left:20px; border-left:3px solid var(--green); font-size:1.1rem; line-height:1.7; color:#475569; }
.ct-btns { display:flex; flex-wrap:wrap; gap:14px; margin-bottom:28px; }
.ct-trust { display:flex; flex-wrap:wrap; gap:10px 22px; font-size:.95rem; font-weight:600; color:var(--navy); }
.ct-trust span { display:inline-flex; align-items:center; gap:8px; }
.ct-trust i { width:9px; height:9px; border-radius:50%; background:var(--green); flex:none; }

.ct-art { position:relative; display:grid; place-items:center; padding:30px; width:100%; max-width:620px; margin:0 auto; }
.ct-video-frame {
  position: relative;
  z-index: 2;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 26px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(11, 99, 206, 0.22), 0 10px 24px rgba(0, 0, 0, 0.12);
  border: 4px solid #FFFFFF;
  background: #000;
  animation: ctFloat 6s ease-in-out infinite;
}
.ct-hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.ct-video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(14, 42, 110, 0.08) 0%, rgba(14, 42, 110, 0.32) 100%);
  pointer-events: none;
}
.ct-art img { position:relative; z-index:2; width:100%; height:auto; max-height:440px; object-fit:contain; filter:drop-shadow(0 18px 34px rgba(20,48,127,.18)); animation:ctFloat 6s ease-in-out infinite; }
.ct-art-ring { position:absolute; border-radius:50%; border:2px dashed; }
.ct-art-ring-1 { width:86%; aspect-ratio:1; border-color:rgba(11,99,206,.28); animation:ctPulse 5s ease-in-out infinite; }
.ct-art-ring-2 { width:64%; aspect-ratio:1; border-color:rgba(59,170,53,.38); animation:ctPulse 5s ease-in-out infinite 1.5s; }
.ct-chip { position:absolute; z-index:3; display:inline-flex; align-items:center; gap:8px; padding:10px 16px; border-radius:40px; font-size:.92rem; font-weight:700; color:var(--navy); background:#fff; border:1px solid #DCE6F5; box-shadow:0 12px 28px rgba(20,48,127,.16); white-space:nowrap; animation:ctFloat 4s ease-in-out infinite alternate; }
.ct-chip svg { color:var(--blue); flex:none; }
.ct-chip-1 { top:8%; left:0; animation-delay:0s; }
.ct-chip-2 { bottom:12%; left:4%; animation-delay:1.2s; }
.ct-chip-2 svg { color:var(--green); }
.ct-chip-3 { top:20%; right:0; animation-delay:2.4s; }
.ct-chip-3 svg { color:#F59E0B; }

/* ---------- quick cards ---------- */
.ct-quick-wrap { position:relative; z-index:5; margin-top:-70px; padding-bottom:20px; }
.ct-quick { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:20px; }
.ct-qcard { position:relative; height:100%; display:flex; align-items:center; gap:14px; padding:22px 20px; overflow:hidden; text-decoration:none; color:var(--ink); background:#fff; border-radius:16px; border:1px solid #E2E8F0; box-shadow:0 18px 40px rgba(20,48,127,.12); transition:transform .35s ease, box-shadow .35s ease, border-color .35s ease; }
.ct-qcard::before { content:''; position:absolute; left:0; top:0; height:4px; width:100%; background:var(--c); }
a.ct-qcard:hover { transform:translateY(-8px); border-color:var(--c); box-shadow:0 24px 48px color-mix(in srgb,var(--c) 30%,transparent); }
.ct-qicon { flex:none; width:54px; height:54px; display:grid; place-items:center; border-radius:14px; color:#fff; background:var(--c); transition:transform .4s ease; }
a.ct-qcard:hover .ct-qicon { transform:rotate(-10deg) scale(1.1); }
.ct-qtext { flex:1; min-width:0; }
.ct-qtext small { display:block; font:600 .82rem 'Barlow Condensed',sans-serif; letter-spacing:.14em; text-transform:uppercase; color:#64748B; }
.ct-qtext b { display:block; margin-top:2px; font-size:1rem; font-weight:700; line-height:1.3; overflow-wrap:anywhere; }
.ct-qarrow { flex:none; color:var(--c); transition:transform .3s ease; }
a.ct-qcard:hover .ct-qarrow { transform:translate(4px,-4px); }

/* ---------- sectors ---------- */
.ct-sectors { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:22px; }
.ct-sector { position:relative; width:100%; height:100%; display:flex; flex-direction:column; align-items:flex-start; gap:14px; padding:30px 26px 26px; overflow:hidden; text-align:left; cursor:pointer; color:var(--ink); background:#fff; border:1px solid #E2E8F0; border-radius:18px; transition:transform .35s ease, box-shadow .35s ease, border-color .35s ease; }
.ct-sector::before { content:''; position:absolute; inset:auto 0 0 0; height:4px; background:var(--c); transform:scaleX(0); transform-origin:left; transition:transform .5s cubic-bezier(.16,1,.3,1); }
.ct-sector:hover { transform:translateY(-8px); border-color:var(--c); box-shadow:0 24px 46px color-mix(in srgb,var(--c) 24%,transparent); }
.ct-sector:hover::before { transform:scaleX(1); }
.ct-sector-icon { width:56px; height:56px; display:grid; place-items:center; border-radius:14px; color:var(--c); background:color-mix(in srgb,var(--c) 12%,white); transition:transform .4s ease, background .3s, color .3s; }
.ct-sector:hover .ct-sector-icon { transform:rotate(-8deg) scale(1.08); background:var(--c); color:#fff; }
.ct-sector h3 { margin:0; font-size:1.3rem; font-weight:700; }
.ct-tags { display:flex; flex-wrap:wrap; gap:8px; }
.ct-tags em { font-style:normal; padding:5px 11px; border-radius:20px; font-size:.85rem; font-weight:600; color:var(--c); background:color-mix(in srgb,var(--c) 10%,white); }
.ct-sector-go { margin-top:auto; display:inline-flex; align-items:center; gap:8px; font-weight:700; color:var(--c); }
.ct-sector-go svg { transition:transform .3s ease; }
.ct-sector:hover .ct-sector-go svg { transform:translateX(6px); }

/* ---------- process ---------- */
.ct-process { position:relative; display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:28px; }
.ct-process-line { position:absolute; top:41px; left:12%; right:12%; height:2px; background:#E2E8F0; }
.ct-process-line span { display:block; height:100%; background:linear-gradient(90deg,#0B63CE,#3BAA35); transform:scaleX(0); transform-origin:left; transition:transform 1.6s cubic-bezier(.65,0,.35,1) .2s; }
.ct-process.is-in .ct-process-line span { transform:scaleX(1); }
.ct-step { text-align:center; padding:0 8px; opacity:0; transform:translateY(20px); transition:opacity .7s ease, transform .7s ease; transition-delay:calc(var(--i) * .3s + .2s); }
.ct-process.is-in .ct-step { opacity:1; transform:none; }
.ct-step-dot { position:relative; z-index:2; width:84px; height:84px; margin:0 auto 22px; display:grid; place-items:center; border-radius:50%; color:var(--c); background:#fff; border:2px solid var(--c); box-shadow:0 12px 28px color-mix(in srgb,var(--c) 22%,transparent); transition:background .3s, color .3s, transform .3s; }
.ct-step-dot b { position:absolute; top:-6px; right:-6px; width:28px; height:28px; display:grid; place-items:center; border-radius:50%; font:700 .95rem 'Barlow Condensed',sans-serif; color:#fff; background:var(--c); }
.ct-step:hover .ct-step-dot { background:var(--c); color:#fff; transform:scale(1.08); }
.ct-step:hover .ct-step-dot b { background:#fff; color:var(--c); }
.ct-step h3 { margin:0 0 8px; font-size:1.2rem; font-weight:700; }
.ct-step p { margin:0 auto; max-width:250px; font-size:.98rem; line-height:1.6; color:#64748B; }

/* ---------- CTA ---------- */
.ct-cta-wrap { padding:16px 0 90px; }
.ct-cta { display:flex; align-items:center; justify-content:space-between; gap:32px; padding:46px 48px; color:#fff; border-radius:26px; background:linear-gradient(100deg,#14307F,#0B63CE 60%,#3BAA35); box-shadow:0 30px 60px rgba(11,99,206,.3); }
.ct-cta h2 { margin:0 0 8px; font-size:clamp(1.6rem,3vw,2.5rem); font-weight:800; letter-spacing:-.02em; line-height:1.15; }
.ct-cta p { margin:0; max-width:520px; font-size:1.08rem; line-height:1.6; color:#E2ECFF; }
.ct-cta-btns { display:flex; flex-wrap:wrap; gap:14px; flex:none; }

/* ---------- map ---------- */
.ct-map { position:relative; padding:90px 0; color:#fff; background:linear-gradient(125deg,#0E2A6E 0%,#0B63CE 52%,#1F8F4A 100%); }
.ct-map-inner { position:relative; z-index:1; }
.ct-map-head { text-align:center; max-width:760px; margin:0 auto 36px; }
.ct-pill-light { color:#fff; background:rgba(255,255,255,.14); border-color:rgba(255,255,255,.35); margin-bottom:16px; }
.ct-map-head h2 { margin:0 0 12px; font-size:clamp(1.8rem,3.6vw,2.9rem); font-weight:800; letter-spacing:-.02em; line-height:1.15; }
.ct-map-head p { margin:0 0 22px; font-size:1.05rem; line-height:1.6; color:#E2ECFF; overflow-wrap:anywhere; }
.ct-map-frame { overflow:hidden; border-radius:24px; border:4px solid #fff; background:#fff; box-shadow:0 30px 70px rgba(0,0,0,.35); }
.ct-map-frame iframe { width:100%; height:460px; }

/* ---------- form + details (above footer) ---------- */
.ct-form-section { background:linear-gradient(180deg,#fff 0%,#F3F8FF 100%); padding-bottom:110px; }
.ct-main-grid { display:grid; grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr); gap:36px; align-items:stretch; }
.ct-main-grid > .rv { height:100%; min-width:0; }

.ct-form-card { height:100%; padding:42px 38px; background:#fff; border-radius:24px; border:1px solid #E2E8F0; border-top:4px solid var(--blue); box-shadow:0 24px 54px rgba(20,48,127,.1); }
.ct-form-card h3 { margin:0 0 6px; font-size:1.8rem; font-weight:700; color:var(--ink); }
.ct-form-card > p { margin:0 0 26px; color:#64748B; }
.ct-row { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:16px; margin-bottom:16px; }
.ct-row-1 { grid-template-columns:minmax(0,1fr); }
.ct-field { display:block; min-width:0; }
.ct-field span { display:block; margin-bottom:7px; font:600 .82rem 'Barlow Condensed',sans-serif; letter-spacing:.12em; text-transform:uppercase; color:#475569; }
.ct-field input, .ct-field select, .ct-field textarea { width:100%; max-width:100%; padding:13px 16px; font-size:1rem; color:#0F172A; background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:12px; outline:none; transition:border-color .2s, box-shadow .2s, background .2s; }
.ct-field select { cursor:pointer; font-weight:600; text-overflow:ellipsis; }
.ct-field textarea { resize:vertical; min-height:110px; }
.ct-field input::placeholder, .ct-field textarea::placeholder { color:#94A3B8; }
.ct-field input:focus, .ct-field select:focus, .ct-field textarea:focus { background:#fff; border-color:var(--blue); box-shadow:0 0 0 4px rgba(11,99,206,.14); }
.ct-success { padding:34px 22px; text-align:center; color:#047857; background:#ECFDF5; border:1.5px solid #10B981; border-radius:16px; }
.ct-success svg { display:block; margin:0 auto 12px; color:#10B981; }
.ct-success h4 { margin:0 0 8px; font-size:1.5rem; font-weight:700; }
.ct-success p { margin:0; line-height:1.6; overflow-wrap:anywhere; }

.ct-details { position:relative; height:100%; overflow:hidden; border-radius:24px; color:#fff; background:linear-gradient(135deg,#0E2A6E,#0B63CE 55%,#1F8F4A); box-shadow:0 24px 54px rgba(11,99,206,.28); }
.ct-det-in { position:relative; z-index:1; height:100%; display:flex; flex-direction:column; padding:38px 34px; }
.ct-det-brand { display:flex; align-items:center; gap:14px; flex-wrap:wrap; margin-bottom:26px; }
.ct-det-logo { display:inline-flex; padding:8px 14px; background:#fff; border-radius:12px; box-shadow:0 10px 24px rgba(0,0,0,.2); }
.ct-det-logo img { display:block; height:34px; width:auto; }
.ct-det-brand small { font:600 .85rem 'Barlow Condensed',sans-serif; letter-spacing:.2em; text-transform:uppercase; color:#CFE0FF; }
.ct-info { display:flex; flex-direction:column; gap:12px; flex:1; }
.ct-info-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 14px 18px;
  background: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 14px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}
.ct-info-row::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background: var(--card-accent, #0052CC);
  border-radius: 4px 0 0 4px;
}
.ct-info-row:hover {
  transform: translateX(6px);
  background: #FFFFFF;
  box-shadow: 0 16px 30px -10px rgba(0, 0, 0, 0.18);
}
.ct-info-row > span:last-child { min-width: 0; flex: 1; }

.ct-info-icon {
  flex: none;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  transition: transform 0.35s ease;
}
.ct-info-row:hover .ct-info-icon {
  transform: scale(1.08) rotate(4deg);
}

.ct-info-row small {
  display: block;
  font: 700 0.74rem 'Barlow Condensed', sans-serif;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--card-accent, #0052CC);
  margin-bottom: 2px;
}
.ct-info-row b {
  display: block;
  margin-top: 2px;
  font-size: 0.98rem;
  font-weight: 700;
  line-height: 1.45;
  overflow-wrap: anywhere;
  color: #0F172A;
}
.ct-info-row a {
  color: #0F172A;
  text-decoration: none;
  transition: color 0.2s ease;
}
.ct-info-row a:hover {
  color: #0052CC;
  text-decoration: underline;
}

/* Card Themes matching SMARToi brand */
.ct-info-row-blue {
  --card-accent: #0052CC;
}
.ct-info-row-blue .ct-info-icon {
  background: rgba(0, 82, 204, 0.08);
  border: 1px solid rgba(0, 82, 204, 0.2);
  color: #0052CC;
}

.ct-info-row-green {
  --card-accent: #10B981;
}
.ct-info-row-green .ct-info-icon {
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.22);
  color: #10B981;
}
.ct-follow { display:flex; align-items:center; flex-wrap:wrap; gap:16px; margin-top:26px; padding-top:22px; border-top:1px solid rgba(255,255,255,.22); }
.ct-follow > span { font:600 .85rem 'Barlow Condensed',sans-serif; letter-spacing:.18em; text-transform:uppercase; color:#CFE0FF; }
.ct-socials { display:flex; gap:10px; }
.ct-socials a { width:42px; height:42px; display:grid; place-items:center; border-radius:50%; color:#fff; background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.4); transition:background .25s, border-color .25s, transform .25s; }
.ct-socials a:hover { background:var(--c); border-color:var(--c); transform:translateY(-4px); }

@media (prefers-reduced-motion: reduce) {
  .ct *, .ct *::before, .ct *::after { animation:none !important; transition:none !important; }
  .rv, .ct-step { opacity:1 !important; transform:none !important; }
  .ct-process-line span { transform:scaleX(1) !important; }
}

/* ---------- responsive ---------- */
@media (max-width:1100px) {
  .ct-quick { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .ct-sectors { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .ct-hero-grid { gap:36px; }
}
@media (max-width:960px) {
  .ct-hero { padding:100px 0 110px; }
  .ct-hero-grid, .ct-main-grid { grid-template-columns:minmax(0,1fr); gap:40px; }
  .ct-hero-left { text-align:left; }
  .ct-art { max-width:520px; margin:0 auto; }
  .ct-section { padding:72px 0; }
  .ct-form-section { padding-bottom:80px; }
  .ct-process { grid-template-columns:repeat(2,minmax(0,1fr)); row-gap:44px; }
  .ct-process-line { display:none; }
  .ct-cta { flex-direction:column; align-items:flex-start; padding:36px 28px; }
  .ct-cta-wrap { padding-bottom:72px; }
  .ct-map { padding:70px 0; }
  .ct-map-frame iframe { height:380px; }
}
@media (max-width:640px) {
  .ct-container { padding:0 16px; }
  .ct-hero { padding:84px 0 96px; }
  .ct-lead { padding-left:14px; font-size:1.02rem; }
  .ct-quick, .ct-sectors, .ct-process { grid-template-columns:minmax(0,1fr); }
  .ct-quick-wrap { margin-top:-46px; }
  .ct-btns .ct-btn { flex:1 1 100%; padding:14px 20px; }
  .ct-row { grid-template-columns:minmax(0,1fr); gap:14px; }
  .ct-form-card { padding:28px 18px; border-radius:20px; }
  .ct-form-card h3 { font-size:1.5rem; }
  .ct-det-in { padding:26px 18px; }
  .ct-details { border-radius:20px; }
  .ct-head { margin-bottom:32px; }
  .ct-section { padding:56px 0; }
  .ct-art { padding:16px; }
  .ct-chip { font-size:.78rem; padding:7px 11px; }
  .ct-chip-1 { left:0; top:2%; }
  .ct-chip-2 { left:0; bottom:4%; }
  .ct-chip-3 { display:none; }
  .ct-cta { padding:28px 20px; border-radius:20px; }
  .ct-cta-btns { width:100%; }
  .ct-cta-btns .ct-btn { flex:1 1 100%; }
  .ct-map { padding:56px 0; }
  .ct-map-frame { border-radius:16px; border-width:3px; }
  .ct-map-frame iframe { height:300px; }
  .ct-map-head .ct-btn { width:100%; }
  .ct-info-row { padding:12px; gap:12px; }
  .ct-info-row:hover { transform:none; }
  .ct-step p { max-width:320px; }
}
@media (max-width:380px) {
  .ct-pill { font-size:.78rem; letter-spacing:.06em; padding:7px 12px; }
  .ct-eyebrow { letter-spacing:.12em; }
  .ct-qcard { padding:18px 14px; }
  .ct-qicon { width:46px; height:46px; }
}
`;

export default ContactSection;