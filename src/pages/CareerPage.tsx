import React, { useState, useEffect, useRef } from 'react';
import { CareerSection } from '../components/CareerSection';
import { COMPANY_INFO } from '../data/nuoData';
import {
  Mail, Send, CheckCircle2, ArrowRight, ArrowUpRight, Cpu, PenTool, Plane, CircuitBoard,
  Wrench, Layers, Users, TrendingUp, Compass, Sun, ChevronDown, MapPin, Phone, Clock, UploadCloud, FileText, X
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

// ----------------------------------------------------
// Content
// ----------------------------------------------------
const phrases = ['with SMARToi', 'in automation', 'in solar energy', 'in smart hardware'];

const roles = [
  { icon: <Cpu size={24} />, color: '#0B63CE', title: 'Automation & PLC engineers', text: 'Control panels, drives and machine logic' },
  { icon: <PenTool size={24} />, color: '#3BAA35', title: 'CAD / CAM designers', text: 'Mechanical design for special purpose machines' },
  { icon: <Plane size={24} />, color: '#1A3A8F', title: 'Drone pilots', text: 'AgTech field operations and telemetry' },
  { icon: <CircuitBoard size={24} />, color: '#2E9E5B', title: 'IoT & hardware creators', text: 'Embedded firmware, PCB and connected devices' }
];

const perks = [
  { icon: <Wrench size={26} />, color: '#0066FF', title: 'Work on real systems', text: 'Your work ends up running in homes, farms, factories and solar plants, not sitting in a slide deck.' },
  { icon: <Layers size={26} />, color: '#10B981', title: 'Learn across disciplines', text: 'Automation, solar, embedded and design teams sit together, so you pick up skills beyond your own role.' },
  { icon: <Users size={26} />, color: '#0284C7', title: 'Learn from the founders', text: 'Direct access to senior engineers who built the company and still work on projects.' },
  { icon: <Compass size={26} />, color: '#F59E0B', title: 'Ownership early', text: 'You are trusted with real tasks from the start, with support when you need it.' },
  { icon: <Sun size={26} />, color: '#16A34A', title: 'Field and workshop exposure', text: 'See a system through from drawing to assembly to site commissioning.' },
  { icon: <TrendingUp size={26} />, color: '#8B5CF6', title: 'Room to grow', text: 'As the company takes on bigger projects, there is room to lead them.' }
];

const steps = [
  { n: '01', title: 'Apply', text: 'Send your CV and portfolio by email or through the quick form below.' },
  { n: '02', title: 'Screening call', text: 'A short conversation about your background and what you want to work on.' },
  { n: '03', title: 'Practical round', text: 'A hands-on discussion or task related to the role, with an engineer from the team.' },
  { n: '04', title: 'Offer & onboarding', text: 'If it is a match, we agree terms and plan your first projects.' }
];

const faqs = [
  { q: 'Can freshers apply?', a: 'Yes. We look at your skills, projects and attitude as much as years of experience. Include any college or personal projects in your portfolio.' },
  { q: 'What should I include in my application?', a: 'Your CV (PDF or Word), and if you have one, a link to your portfolio or LinkedIn in the email.' },
  { q: 'I do not see a role that matches me. Should I still apply?', a: 'Yes. Send your CV anyway and tell us what you are good at. We keep strong profiles in mind as new projects start.' },
  { q: 'Where is the team based?', a: 'Our head office is in Karur, Tamil Nadu. Some roles involve site visits for installation and commissioning.' },
  { q: 'What happens after I apply?', a: 'Our team reviews every application. If your profile fits an opening, we will contact you to set up a call.' }
];

const CONTACT = {
  email: 'info@smartoi.in',
  phones: [
    { label: '+91 9585076764', tel: '+919585076764' },
    { label: '9585076765', tel: '+919585076765' }
  ],
  address: 'SMARToi, South 6, Seerangai Thottam, Puliyur, Karur, Tamil Nadu, 639114',
  hours: 'Mon – Sat: 9:00 AM – 7:00 PM'
};

const MAX_FILE_MB = 5;
const ALLOWED_EXT = ['pdf', 'doc', 'docx'];

// ----------------------------------------------------
// Social icon links
// ----------------------------------------------------
const Socials: React.FC = () => {
  const items = [
    {
      title: 'LinkedIn', href: COMPANY_INFO.socials.linkedin, c: '#0A66C2',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
    },
    {
      title: 'YouTube', href: COMPANY_INFO.socials.youtube, c: '#FF0000',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
    },
    {
      title: 'Facebook', href: COMPANY_INFO.socials.facebook, c: '#1877F2',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
    },
    {
      title: 'Instagram', href: COMPANY_INFO.socials.instagram, c: '#DC2743',
      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
    }
  ];

  return (
    <div className="cr-socials">
      {items.map((s) => (
        <a
          key={s.title}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          title={s.title}
          aria-label={s.title}
          style={{ ['--c' as string]: s.c }}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
};

// ----------------------------------------------------
// Animated hero background: white base + curved crossing
// ribbons in the SMARToi logo colours
// ----------------------------------------------------
const HeroBackground: React.FC = () => (
  <div className="cr-bg" aria-hidden="true">
    <span className="cr-orb cr-orb-a" />
    <span className="cr-orb cr-orb-b" />
    <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="crGradBlue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1A3A8F" />
          <stop offset="55%" stopColor="#0B63CE" />
          <stop offset="100%" stopColor="#3BAA35" />
        </linearGradient>
        <linearGradient id="crGradGreen" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#3BAA35" />
          <stop offset="60%" stopColor="#2E9E5B" />
          <stop offset="100%" stopColor="#0B63CE" />
        </linearGradient>
        <linearGradient id="crGradLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B63CE" />
          <stop offset="100%" stopColor="#3BAA35" />
        </linearGradient>
      </defs>

      {/* ribbon 1: sweeps up from bottom-left to top-right */}
      <g className="cr-rib cr-rib-1">
        <path
          fill="url(#crGradBlue)"
          opacity=".2"
          d="M-120 700 C 250 760, 520 380, 860 420 S 1300 220, 1580 60 L1580 190 C 1330 330, 1100 560, 820 540 S 330 900, -120 820 Z"
        />
      </g>

      {/* ribbon 2: crosses ribbon 1 going the other way */}
      <g className="cr-rib cr-rib-2">
        <path
          fill="url(#crGradGreen)"
          opacity=".18"
          d="M-120 150 C 220 60, 520 420, 880 380 S 1250 640, 1580 720 L1580 830 C 1260 780, 1080 520, 860 520 S 260 240, -120 270 Z"
        />
      </g>

      {/* thin crossing outlines */}
      <path className="cr-line cr-line-1" fill="none" stroke="url(#crGradLine)" strokeWidth="2" d="M-100 560 C 300 640, 560 240, 920 300 S 1360 180, 1560 120" />
      <path className="cr-line cr-line-2" fill="none" stroke="url(#crGradLine)" strokeWidth="2" d="M-100 240 C 260 160, 520 560, 900 520 S 1320 700, 1560 660" />
    </svg>
  </div>
);

// ----------------------------------------------------
// Page
// ----------------------------------------------------
export const CareerPage: React.FC = () => {
  const [quickName, setQuickName] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const pickFile = (file: File | null | undefined) => {
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXT.includes(ext)) {
      setFileError('Please upload a PDF, DOC or DOCX file.');
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(`File is too large. Maximum size is ${MAX_FILE_MB} MB.`);
      return;
    }
    setFileError('');
    setResumeFile(file);
  };

  const clearFile = () => {
    setResumeFile(null);
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatSize = (b: number) =>
    b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`;

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setFileError('Please upload your resume to continue.');
      return;
    }

    // TODO: send to your backend / email service, for example:
    // const data = new FormData();
    // data.append('name', quickName);
    // data.append('email', quickEmail);
    // data.append('phone', quickPhone);
    // data.append('resume', resumeFile);
    // await fetch('/api/careers/apply', { method: 'POST', body: data });

    setQuickSubmitted(true);
    setTimeout(() => {
      setQuickSubmitted(false);
      setQuickName('');
      setQuickEmail('');
      setQuickPhone('');
      clearFile();
    }, 4000);
  };

  // Rotating headline phrase
  const [phraseIndex, setPhraseIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhraseIndex((p) => (p + 1) % phrases.length), 2800);
    return () => clearInterval(t);
  }, []);

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [processRef, processVisible] = useInView<HTMLDivElement>(0.25);

  const scrollToPositions = () => {
    const el = document.getElementById('career');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="cr">
      <style>{css}</style>

      {/* ================= HERO ================= */}
      <section className="cr-hero">
        <HeroBackground />
        <div className="cr-container cr-hero-inner">
          <div className="cr-hero-grid">
            <div className="cr-hero-left">
              <div className="cr-brand cr-up" style={{ animationDelay: '0s' }}>
                <img src="/img/logos.jpeg" alt="SMARToi logo" />
                <span className="cr-brand-tag">Careers</span>
              </div>

              <p className="cr-eyebrow cr-up" style={{ animationDelay: '.1s' }}>
                <span className="cr-eyebrow-line" />
                Are you ready to shape the future?
              </p>

              <h1 className="cr-h1 cr-up" style={{ animationDelay: '.2s' }}>
                <span className="cr-h1-line">Start your career</span>
                <span className="cr-rot">
                  <em key={phraseIndex}>{phrases[phraseIndex]}</em>
                </span>
              </h1>

              <p className="cr-lead cr-up" style={{ animationDelay: '.35s' }}>
                Innovate with us. We are looking for passionate engineers, CAD/CAM designers, drone
                pilots and IoT hardware creators to build real-world automated systems.
              </p>

              <div className="cr-btns cr-up" style={{ animationDelay: '.5s' }}>
                <button className="cr-btn cr-btn-primary" onClick={scrollToPositions}>
                  View open positions <ArrowRight size={18} />
                </button>
                <a
                  className="cr-btn cr-btn-outline"
                  href={`mailto:${CONTACT.email}?subject=CV Application - SMARToi`}
                >
                  <Mail size={18} /> Send your CV
                </a>
              </div>
            </div>

            <div className="cr-hero-right cr-zoom">
              <div className="cr-panel">
                <div className="cr-panel-head">
                  <div>
                    <small>Open for applications</small>
                    <h2>We are looking for</h2>
                  </div>
                  <span className="cr-live">
                    <i /> Now hiring
                  </span>
                </div>
                {roles.map((r, i) => (
                  <button
                    key={r.title}
                    className="cr-role"
                    style={{ ['--c' as string]: r.color, animationDelay: `${0.5 + i * 0.12}s` }}
                    onClick={scrollToPositions}
                  >
                    <span className="cr-role-icon">{r.icon}</span>
                    <span className="cr-role-text">
                      <h3>{r.title}</h3>
                      <p>{r.text}</p>
                    </span>
                    <span className="cr-role-go">
                      <ArrowUpRight size={18} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY JOIN ================= */}
      <section className="cr-section cr-soft">
        <div className="cr-container">
          <Reveal>
            <div className="cr-head">
              <p className="cr-eyebrow">
                <span className="cr-eyebrow-line" />
                Why SMARToi
              </p>
              <h2 className="cr-h2">A place to build skills that matter.</h2>
              <p className="cr-sub">
                We are an engineering company, so the work is hands-on. Here is what you can expect
                when you join the team.
              </p>
            </div>
          </Reveal>

          <div className="cr-perks">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 120} style={{ height: '100%' }}>
                <div className="cr-perk" style={{ ['--c' as string]: p.color }}>
                  <span className="cr-perk-n">{String(i + 1).padStart(2, '0')}</span>
                  <div className="cr-perk-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OPEN POSITIONS ================= */}
      <CareerSection />

      {/* ================= PROCESS ================= */}
      <section className="cr-section">
        <div className="cr-container">
          <Reveal>
            <div className="cr-head">
              <p className="cr-eyebrow">
                <span className="cr-eyebrow-line" />
                Hiring process
              </p>
              <h2 className="cr-h2">From application to your first project.</h2>
            </div>
          </Reveal>

          <div ref={processRef} className={`cr-process ${processVisible ? 'is-in' : ''}`}>
            <div className="cr-process-line">
              <span />
            </div>
            {steps.map((s, i) => (
              <div className="cr-step" key={s.n} style={{ ['--i' as string]: i }}>
                <div className="cr-step-dot">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="cr-section cr-faqsec">
        <span className="cr-fo cr-fo-1" />
        <span className="cr-fo cr-fo-2" />
        <div className="cr-container cr-faq-grid">
          <Reveal dir="left">
            <div className="cr-faq-intro">
              <p className="cr-eyebrow">
                <span className="cr-eyebrow-line" />
                FAQ
              </p>
              <h2 className="cr-h2">Questions before you apply?</h2>
              <p className="cr-sub">
                Cannot find your answer here? Write to us at{' '}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
              </p>

              <div className="cr-faq-logo">
                <div className="cr-faq-logo-in">
                  <img src="/img/logos.jpeg" alt="SMARToi logo" />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="cr-faq">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} dir="right" delay={i * 110}>
                  <div className={`cr-faq-item ${i % 2 === 0 ? 'is-odd' : 'is-even'} ${open ? 'is-open' : ''}`}>
                    <button aria-expanded={open} onClick={() => setOpenFaq(open ? null : i)}>
                      <span className="cr-faq-q">Q{i + 1}</span>
                      <span className="cr-faq-text">{f.q}</span>
                      <span className="cr-faq-chev">
                        <ChevronDown size={20} />
                      </span>
                    </button>
                    <div className="cr-faq-body">
                      <div>
                        <p>{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CV FORM ================= */}
      <section className="cr-contact">
        <span className="cr-co cr-co-1" />
        <span className="cr-co cr-co-2" />
        <div className="cr-container cr-contact-grid">
          <Reveal dir="left">
            <div className="cr-contact-info">
              <div className="cr-badge-pill">
                <span className="cr-badge-dot" />
                Do not see a matching position?
              </div>
              <h2 className="cr-h2 cr-h2-light">Send us your CV anyway.</h2>
              <p className="cr-contact-p">
                We are always eager to meet talented engineers, embedded hardware creators and field
                innovators. Share your CV and portfolio with our engineering team.
              </p>

              <div className="cr-touch-wrap">
                <h3 className="cr-touch">Get In Touch</h3>
                <div className="cr-touch-line" />
              </div>

              <div className="cr-contact-row cr-contact-row-phone">
                <div className="cr-contact-icon">
                  <Phone size={22} />
                </div>
                <div className="cr-contact-text">
                  <small>Call us</small>
                  <b className="cr-phones">
                    {CONTACT.phones.map((p, i) => (
                      <React.Fragment key={p.tel}>
                        {i > 0 && <span className="cr-phone-sep">or</span>}
                        <a href={`tel:${p.tel}`}>{p.label}</a>
                      </React.Fragment>
                    ))}
                  </b>
                </div>
              </div>

              <div className="cr-contact-row cr-contact-row-mail">
                <div className="cr-contact-icon">
                  <Mail size={22} />
                </div>
                <div className="cr-contact-text">
                  <small>Email your CV</small>
                  <b><a href={`mailto:${CONTACT.email}?subject=CV Application - SMARToi`}>{CONTACT.email}</a></b>
                </div>
              </div>

              <div className="cr-contact-row cr-contact-row-address">
                <div className="cr-contact-icon">
                  <MapPin size={22} />
                </div>
                <div className="cr-contact-text">
                  <small>Address</small>
                  <b>{CONTACT.address}</b>
                </div>
              </div>

              <div className="cr-contact-row cr-contact-row-hours">
                <div className="cr-contact-icon">
                  <Clock size={22} />
                </div>
                <div className="cr-contact-text">
                  <small>Working hours</small>
                  <b>{CONTACT.hours}</b>
                </div>
              </div>

              <div className="cr-follow">
                <span>Follow us</span>
                <Socials />
              </div>
            </div>
          </Reveal>

          <Reveal dir="right" delay={150}>
            <div className="cr-form-card">
              <h3>Quick CV form</h3>
              <p>Fill in your details and upload your resume. Our HR team will get back to you.</p>

              {quickSubmitted ? (
                <div className="cr-success">
                  <CheckCircle2 size={44} />
                  <h4>Resume received!</h4>
                  <p>Thank you {quickName}. Our HR team will review your CV and reach out.</p>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} noValidate={false}>
                  <div className="cr-form-row">
                    <label className="cr-field">
                      <span>Full name *</span>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={quickName}
                        onChange={(e) => setQuickName(e.target.value)}
                      />
                    </label>
                    <label className="cr-field">
                      <span>Phone number *</span>
                      <input
                        type="tel"
                        required
                        placeholder="+91 00000 00000"
                        value={quickPhone}
                        onChange={(e) => setQuickPhone(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="cr-form-row cr-form-row-1">
                    <label className="cr-field">
                      <span>Email address *</span>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={quickEmail}
                        onChange={(e) => setQuickEmail(e.target.value)}
                      />
                    </label>
                  </div>

                  {/* Resume upload */}
                  <div className="cr-upload-wrap">
                    <span className="cr-upload-label">Upload resume *</span>

                    {!resumeFile ? (
                      <label
                        className={`cr-drop ${dragOver ? 'is-over' : ''} ${fileError ? 'has-error' : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOver(false);
                          pickFile(e.dataTransfer.files?.[0]);
                        }}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={(e) => pickFile(e.target.files?.[0])}
                        />
                        <UploadCloud size={30} />
                        <b>Click to choose a file or drag it here</b>
                        <small>PDF, DOC or DOCX, up to {MAX_FILE_MB} MB</small>
                      </label>
                    ) : (
                      <div className="cr-file">
                        <span className="cr-file-icon"><FileText size={22} /></span>
                        <span className="cr-file-meta">
                          <b>{resumeFile.name}</b>
                          <small>{formatSize(resumeFile.size)}</small>
                        </span>
                        <button type="button" className="cr-file-x" onClick={clearFile} aria-label="Remove file">
                          <X size={18} />
                        </button>
                      </div>
                    )}

                    {fileError && <p className="cr-file-error" role="alert">{fileError}</p>}
                  </div>

                  <button type="submit" className="cr-btn cr-btn-primary cr-submit">
                    <Send size={17} /> Submit application
                  </button>
                </form>
              )}
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

.cr {
  --navy: #14307F;
  --blue: #0B63CE;
  --green: #3BAA35;
  --ink: #0F1F4D;
  font-family: 'Barlow', system-ui, sans-serif;
  background: #fff;
  color: #0F172A;
  overflow: hidden;
}
.cr * { box-sizing: border-box; }
.cr-container { width: 100%; max-width: 1260px; margin: 0 auto; padding: 0 24px; }
.cr button, .cr input { font-family: inherit; }
.cr :focus-visible { outline: 3px solid rgba(11,99,206,.45); outline-offset: 2px; }

/* Reveal on scroll */
.rv { opacity: 0; transition: opacity .9s cubic-bezier(.16,1,.3,1) var(--d,0ms), transform .9s cubic-bezier(.16,1,.3,1) var(--d,0ms); }
.rv-up { transform: translateY(36px); }
.rv-left { transform: translateX(-48px); }
.rv-right { transform: translateX(48px); }
.rv-zoom { transform: scale(.94); }
.rv-in { opacity: 1; transform: none; }

/* Shared type */
.cr-eyebrow {
  display: flex; align-items: center; gap: 12px;
  margin: 0 0 18px;
  font: 600 .95rem 'Barlow Condensed', sans-serif;
  letter-spacing: .18em; text-transform: uppercase;
  color: var(--blue);
}
.cr-eyebrow-line { width: 32px; height: 2px; background: currentColor; flex: none; }
.cr-eyebrow-light { color: #A7F3B0; }
.cr-h2 { margin: 0 0 16px; font-size: clamp(2rem, 3.6vw, 3rem); font-weight: 700; line-height: 1.1; letter-spacing: -.02em; }
.cr-h2-light { color: #fff; }
.cr-sub { margin: 0; max-width: 560px; font-size: 1.1rem; line-height: 1.7; color: #475569; }
.cr-sub a { color: #0066FF; font-weight: 600; text-decoration: none; border-bottom: 1px solid currentColor; }
.cr-section { padding: 100px 0; }
.cr-soft { background: #F5F8FC; }
.cr-head { margin-bottom: 54px; }

/* Buttons */
.cr-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  padding: 15px 28px; border-radius: 8px;
  font-size: 1rem; font-weight: 600; cursor: pointer; text-decoration: none;
  transition: transform .25s ease, background .25s ease, color .25s ease, border-color .25s ease, box-shadow .25s ease;
}
.cr-btn svg { transition: transform .25s ease; }
.cr-btn:hover svg { transform: translateX(4px); }
.cr-btn-primary { background: var(--blue); color: #fff; border: 1px solid var(--blue); box-shadow: 0 10px 24px rgba(11,99,206,.28); }
.cr-btn-primary:hover { background: var(--green); border-color: var(--green); transform: translateY(-2px); box-shadow: 0 10px 24px rgba(59,170,53,.3); }
.cr-btn-outline { background: #fff; color: var(--navy); border: 1.5px solid var(--navy); }
.cr-btn-outline:hover { background: var(--navy); color: #fff; transform: translateY(-2px); }

/* ---------- Hero (white + animated logo-colour ribbons) ---------- */
.cr-hero {
  position: relative;
  padding: 130px 0 100px;
  color: var(--ink);
  background: #fff;
  isolation: isolate;
}
.cr-hero::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; z-index: 3;
  background: linear-gradient(90deg, #1A3A8F, #0B63CE 55%, #3BAA35);
}
.cr-hero-inner { position: relative; z-index: 2; }

.cr-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
.cr-bg svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.cr-orb { position: absolute; border-radius: 50%; filter: blur(70px); }
.cr-orb-a { width: 520px; height: 520px; left: -140px; top: -120px; background: radial-gradient(circle, rgba(11,99,206,.22), transparent 70%); animation: crOrbA 16s ease-in-out infinite alternate; }
.cr-orb-b { width: 560px; height: 560px; right: -160px; bottom: -180px; background: radial-gradient(circle, rgba(59,170,53,.24), transparent 70%); animation: crOrbB 18s ease-in-out infinite alternate; }
.cr-rib { transform-box: fill-box; transform-origin: center; }
.cr-rib-1 { animation: crRib1 14s ease-in-out infinite alternate; }
.cr-rib-2 { animation: crRib2 17s ease-in-out infinite alternate; }
.cr-line { stroke-dasharray: 14 12; opacity: .5; }
.cr-line-1 { animation: crDash 26s linear infinite; }
.cr-line-2 { animation: crDash 32s linear infinite reverse; }

.cr-hero-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 72px; align-items: center; }
.cr-hero-left { min-width: 0; }

.cr-up { opacity: 0; animation: crUp .9s cubic-bezier(.16,1,.3,1) forwards; }
.cr-zoom { opacity: 0; animation: crZoom 1.1s cubic-bezier(.16,1,.3,1) .25s forwards; }

.cr-brand { display: inline-flex; align-items: center; gap: 16px; margin-bottom: 30px; }
.cr-brand img { display: block; height: 42px; width: auto; }
.cr-brand-tag {
  padding: 5px 14px; border-radius: 999px;
  font: 600 .95rem 'Barlow Condensed', sans-serif; letter-spacing: .16em; text-transform: uppercase;
  color: var(--navy); background: rgba(11,99,206,.1); border: 1px solid rgba(11,99,206,.25);
}

.cr-h1 { margin: 0 0 26px; font-size: clamp(2.6rem, 5.2vw, 4.7rem); font-weight: 800; line-height: 1.04; letter-spacing: -.03em; }
.cr-h1-line { display: block; color: var(--ink); }
.cr-rot { display: block; height: 1.14em; overflow: hidden; padding-bottom: .1em; }
.cr-rot em {
  display: block; font-style: normal; width: max-content; max-width: 100%;
  background: linear-gradient(90deg, #0B63CE, #3BAA35);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
  animation: crRise .7s cubic-bezier(.16,1,.3,1) both;
}

.cr-lead { margin: 0 0 36px; max-width: 540px; padding-left: 20px; border-left: 3px solid var(--green); font-size: 1.14rem; line-height: 1.7; color: #475569; }
.cr-btns { display: flex; flex-wrap: wrap; gap: 14px; }

/* Hero panel */
.cr-panel {
  background: rgba(255,255,255,.92); backdrop-filter: blur(10px);
  border: 1px solid #DCE6F5; border-radius: 16px; overflow: hidden;
  box-shadow: 0 30px 60px rgba(20,48,127,.14);
}
.cr-panel-head {
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
  padding: 22px 26px;
  background: linear-gradient(135deg, #14307F, #0B63CE);
  color: #fff;
}
.cr-panel-head small { display: block; margin-bottom: 2px; font-size: .85rem; font-weight: 500; color: rgba(255,255,255,.75); }
.cr-panel-head h2 { margin: 0; font-size: 1.45rem; font-weight: 700; letter-spacing: -.01em; }
.cr-live {
  flex: none; display: inline-flex; align-items: center; gap: 9px;
  padding: 8px 16px; border-radius: 999px;
  font-size: .95rem; font-weight: 700; color: #fff;
  background: var(--green); box-shadow: 0 6px 16px rgba(59,170,53,.45);
}
.cr-live i { position: relative; width: 10px; height: 10px; border-radius: 50%; background: #fff; animation: crPing 1.8s ease-out infinite; }

.cr-role {
  position: relative; width: 100%;
  display: flex; align-items: center; gap: 18px;
  padding: 18px 26px; text-align: left; cursor: pointer;
  background: transparent; border: 0; border-top: 1px solid #E6EDF7; color: var(--ink);
  opacity: 0; animation: crSlide .8s cubic-bezier(.16,1,.3,1) forwards;
  transition: background .3s ease;
}
.cr-panel-head + .cr-role { border-top: 0; }
.cr-role::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--c); }
.cr-role:hover { background: color-mix(in srgb, var(--c) 7%, white); }
.cr-role-icon { flex: none; width: 54px; height: 54px; display: grid; place-items: center; border-radius: 12px; color: #fff; background: var(--c); transition: transform .35s ease; }
.cr-role:hover .cr-role-icon { transform: rotate(-8deg) scale(1.08); }
.cr-role-text { flex: 1; min-width: 0; }
.cr-role h3 { margin: 0 0 3px; font-size: 1.15rem; font-weight: 700; color: var(--ink); }
.cr-role p { margin: 0; font-size: .95rem; color: #64748B; }
.cr-role-go { flex: none; width: 36px; height: 36px; display: grid; place-items: center; border-radius: 50%; color: var(--c); border: 1.5px solid var(--c); transition: background .3s, color .3s, transform .3s; }
.cr-role:hover .cr-role-go { background: var(--c); color: #fff; transform: translate(3px, -3px); }

/* ---------- Perks ---------- */
.cr-perks { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.cr-perk {
  position: relative; height: 100%; padding: 34px 28px 30px; overflow: hidden;
  background: #fff; border: 1px solid #E2E8F0;
  transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
}
.cr-perk::before { content: ''; position: absolute; left: 0; top: 0; height: 3px; width: 100%; background: var(--c); transform: scaleX(0); transform-origin: left; transition: transform .5s cubic-bezier(.16,1,.3,1); }
.cr-perk:hover { transform: translateY(-8px); box-shadow: 0 24px 44px rgba(15,23,42,.1); border-color: var(--c); }
.cr-perk:hover::before { transform: scaleX(1); }
.cr-perk-n { position: absolute; top: 18px; right: 22px; font: 700 2.6rem 'Barlow Condensed', sans-serif; color: #EEF2F7; transition: color .3s; }
.cr-perk:hover .cr-perk-n { color: color-mix(in srgb, var(--c) 22%, white); }
.cr-perk-icon { width: 56px; height: 56px; display: grid; place-items: center; margin-bottom: 22px; border-radius: 12px; color: var(--c); background: color-mix(in srgb, var(--c) 11%, white); transition: transform .4s ease, background .3s, color .3s; }
.cr-perk:hover .cr-perk-icon { transform: rotate(-8deg) scale(1.08); background: var(--c); color: #fff; }
.cr-perk h3 { margin: 0 0 10px; font-size: 1.28rem; font-weight: 700; }
.cr-perk p { margin: 0; font-size: 1rem; line-height: 1.65; color: #64748B; }

/* ---------- Process ---------- */
.cr-process { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; }
.cr-process-line { position: absolute; top: 33px; left: 8%; right: 8%; height: 2px; background: #E2E8F0; }
.cr-process-line span { display: block; height: 100%; background: linear-gradient(90deg, #0066FF, #10B981); transform: scaleX(0); transform-origin: left; transition: transform 2s cubic-bezier(.65,0,.35,1) .2s; }
.cr-process.is-in .cr-process-line span { transform: scaleX(1); }
.cr-step { position: relative; text-align: center; padding: 0 8px; opacity: 0; transform: translateY(24px); transition: opacity .8s ease, transform .8s ease; transition-delay: calc(var(--i) * .45s + .2s); }
.cr-process.is-in .cr-step { opacity: 1; transform: none; }
.cr-step-dot {
  position: relative; z-index: 2; width: 68px; height: 68px; margin: 0 auto 22px;
  display: grid; place-items: center; border-radius: 50%;
  background: #fff; border: 2px solid #0066FF;
  font: 700 1.3rem 'Barlow Condensed', sans-serif; letter-spacing: .05em; color: #0066FF;
  transition: background .3s, color .3s, transform .3s, border-color .3s;
}
.cr-step:hover .cr-step-dot { background: #10B981; border-color: #10B981; color: #fff; transform: scale(1.1); }
.cr-step h3 { margin: 0 0 8px; font-size: 1.2rem; font-weight: 700; }
.cr-step p { margin: 0 auto; max-width: 250px; font-size: .98rem; line-height: 1.6; color: #64748B; }

/* ---------- FAQ ---------- */
.cr-faqsec { position: relative; isolation: isolate; background: linear-gradient(180deg, #F5F8FC, #EAF3FF); }
.cr-fo { position: absolute; z-index: 0; border-radius: 50%; filter: blur(70px); pointer-events: none; }
.cr-fo-1 { width: 440px; height: 440px; left: -140px; top: 8%; background: radial-gradient(circle, rgba(11,99,206,.18), transparent 70%); animation: crOrbA 15s ease-in-out infinite alternate; }
.cr-fo-2 { width: 460px; height: 460px; right: -140px; bottom: 4%; background: radial-gradient(circle, rgba(59,170,53,.2), transparent 70%); animation: crOrbB 18s ease-in-out infinite alternate; }
.cr-faq-grid { position: relative; z-index: 1; display: grid; grid-template-columns: .85fr 1.15fr; gap: 72px; align-items: start; }
.cr-faq-intro { position: sticky; top: 110px; }

.cr-faq-logo {
  margin-top: 38px; padding: 3px; border-radius: 22px;
  background: linear-gradient(120deg, #1A3A8F, #0B63CE, #3BAA35, #0B63CE, #1A3A8F); background-size: 300% 300%;
  box-shadow: 0 24px 50px rgba(20,48,127,.18);
  animation: crShift 6s ease infinite, crFloat 6s ease-in-out infinite;
}
.cr-faq-logo-in { display: grid; place-items: center; padding: 38px 30px; background: #fff; border-radius: 20px; }
.cr-faq-logo img { display: block; width: 100%; max-width: 440px; height: auto; }

.cr-faq { display: flex; flex-direction: column; gap: 16px; }
.cr-faq-item {
  --a: #0B63CE; --b: #14307F; --t: #EEF5FF;
  overflow: hidden; background: #fff; border-radius: 16px;
  border: 1.5px solid color-mix(in srgb, var(--a) 30%, white);
  box-shadow: 0 8px 22px rgba(20,48,127,.07);
  transition: transform .35s ease, box-shadow .35s ease;
}
.cr-faq-item.is-even { --a: #3BAA35; --b: #1F7F45; --t: #EFF9EE; }
.cr-faq-item:hover { transform: translateX(-6px); box-shadow: 0 16px 34px color-mix(in srgb, var(--a) 30%, transparent); }
.cr-faq-item.is-open { box-shadow: 0 18px 38px color-mix(in srgb, var(--a) 32%, transparent); }
.cr-faq-item button {
  position: relative; overflow: hidden; width: 100%;
  display: flex; align-items: center; gap: 16px; padding: 18px 20px;
  background: linear-gradient(100deg, var(--b), var(--a)); color: #fff; border: 0; cursor: pointer; text-align: left;
  font-size: 1.12rem; font-weight: 600;
}
.cr-faq-item button::after {
  content: ''; position: absolute; top: 0; bottom: 0; left: -60%; width: 40%;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,.3), transparent); transform: skewX(-20deg);
  transition: left .8s ease;
}
.cr-faq-item button:hover::after { left: 130%; }
.cr-faq-q { flex: none; width: 40px; height: 40px; display: grid; place-items: center; border-radius: 10px; background: rgba(255,255,255,.2); font: 700 1.05rem 'Barlow Condensed', sans-serif; letter-spacing: .04em; transition: transform .35s ease; }
.cr-faq-item:hover .cr-faq-q { transform: rotate(-8deg) scale(1.08); }
.cr-faq-text { flex: 1; min-width: 0; }
.cr-faq-chev { flex: none; width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%; background: #fff; color: var(--a); transition: transform .45s cubic-bezier(.16,1,.3,1); }
.cr-faq-item.is-open .cr-faq-chev { transform: rotate(180deg); }
.cr-faq-body { display: grid; grid-template-rows: 0fr; background: var(--t); transition: grid-template-rows .5s cubic-bezier(.16,1,.3,1); }
.cr-faq-item.is-open .cr-faq-body { grid-template-rows: 1fr; }
.cr-faq-body > div { overflow: hidden; }
.cr-faq-body p { margin: 0; padding: 20px 24px 22px 76px; font-size: 1.04rem; line-height: 1.7; color: #334155; }

/* ---------- Contact / CV form ---------- */
.cr-contact {
  position: relative; isolation: isolate; overflow: hidden;
  padding: 100px 0; color: #fff;
  background: linear-gradient(135deg, #071638 0%, #0052CC 48%, #059669 100%); background-size: 200% 200%;
  animation: crShift 16s ease infinite;
}
.cr-co { position: absolute; z-index: 0; border-radius: 50%; filter: blur(70px); pointer-events: none; }
.cr-co-1 { width: 500px; height: 500px; left: -100px; top: -120px; background: radial-gradient(circle, rgba(0, 163, 255, 0.3), transparent 70%); animation: crOrbA 14s ease-in-out infinite alternate; }
.cr-co-2 { width: 540px; height: 540px; right: -120px; bottom: -140px; background: radial-gradient(circle, rgba(52, 211, 153, 0.35), transparent 70%); animation: crOrbB 17s ease-in-out infinite alternate; }
.cr-contact-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }

/* Eyebrow Pill Badge */
.cr-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  font: 700 0.8rem 'Barlow Condensed', sans-serif;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #6EE7B7;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  margin-bottom: 18px;
}
.cr-badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34D399;
  box-shadow: 0 0 10px #34D399;
}

.cr-contact-p {
  margin: 0 0 28px;
  max-width: 490px;
  font-size: 1.08rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
}

.cr-touch-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}
.cr-touch {
  margin: 0;
  font-size: 1.45rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.01em;
}
.cr-touch-line {
  flex: 1;
  max-width: 140px;
  height: 2px;
  background: linear-gradient(90deg, rgba(110, 231, 183, 0.8), transparent);
  border-radius: 2px;
}

/* 4 Contact Rows / Cards */
.cr-contact-row {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 14px;
  max-width: 520px;
  padding: 16px 20px;
  color: #0F172A;
  background: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}
.cr-contact-row::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background: var(--card-accent, #0052CC);
  border-radius: 4px 0 0 4px;
}
.cr-contact-row:hover {
  transform: translateX(8px);
  background: #FFFFFF;
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.18);
}

.cr-contact-icon {
  flex: none;
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
}
.cr-contact-row:hover .cr-contact-icon {
  transform: scale(1.08) rotate(4deg);
  box-shadow: 0 0 20px var(--icon-glow, rgba(0, 82, 204, 0.3));
}

.cr-contact-text {
  flex: 1;
  min-width: 0;
}
.cr-contact-row small {
  display: block;
  font: 700 0.74rem 'Barlow Condensed', sans-serif;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--card-accent, #0052CC);
  margin-bottom: 3px;
}
.cr-contact-row b {
  display: block;
  font-size: 1.04rem;
  font-weight: 700;
  line-height: 1.45;
  word-break: break-word;
  color: #0F172A;
}
.cr-contact-row a {
  color: #0F172A;
  text-decoration: none;
  transition: color 0.2s ease;
}
.cr-contact-row a:hover {
  color: #0052CC;
  text-decoration: underline;
}

/* Card Themes (Logo Royal Blue #0052CC & Green #10B981) */
.cr-contact-row-phone {
  --card-accent: #0052CC;
  --icon-glow: rgba(0, 82, 204, 0.3);
}
.cr-contact-row-phone .cr-contact-icon {
  background: rgba(0, 82, 204, 0.08);
  border: 1px solid rgba(0, 82, 204, 0.2);
  color: #0052CC;
}

.cr-contact-row-mail {
  --card-accent: #10B981;
  --icon-glow: rgba(16, 185, 129, 0.3);
}
.cr-contact-row-mail .cr-contact-icon {
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.22);
  color: #10B981;
}

.cr-contact-row-address {
  --card-accent: #0052CC;
  --icon-glow: rgba(0, 82, 204, 0.3);
}
.cr-contact-row-address .cr-contact-icon {
  background: rgba(0, 82, 204, 0.08);
  border: 1px solid rgba(0, 82, 204, 0.2);
  color: #0052CC;
}

.cr-contact-row-hours {
  --card-accent: #10B981;
  --icon-glow: rgba(16, 185, 129, 0.3);
}
.cr-contact-row-hours .cr-contact-icon {
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.22);
  color: #10B981;
}

.cr-phones {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}
.cr-phone-sep {
  font-style: normal;
  font-weight: 500;
  color: #64748B;
  margin: 0 4px;
}

.cr-follow { display: flex; align-items: center; gap: 18px; margin-top: 26px; }
.cr-follow > span { font: 600 .85rem 'Barlow Condensed', sans-serif; letter-spacing: .18em; text-transform: uppercase; color: #CFE0FF; }
.cr-socials { display: flex; gap: 10px; }
.cr-socials a {
  width: 42px; height: 42px; display: grid; place-items: center; border-radius: 50%;
  color: #fff; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.28);
  transition: background .25s ease, border-color .25s ease, transform .25s ease;
}
.cr-socials a:hover { background: var(--c); border-color: var(--c); transform: translateY(-4px); }

.cr-form-card { padding: 42px 40px; background: #fff; color: #0F172A; border-radius: 20px; box-shadow: 0 30px 60px rgba(0,0,0,.35); border-top: 5px solid #0052CC; }
.cr-form-card h3 { margin: 0 0 6px; font-size: 1.7rem; font-weight: 700; letter-spacing: -.01em; }
.cr-form-card > p { margin: 0 0 26px; color: #64748B; font-size: 1rem; }
.cr-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.cr-form-row-1 { grid-template-columns: 1fr; }
.cr-field { display: block; min-width: 0; }
.cr-field span, .cr-upload-label { display: block; margin-bottom: 7px; font: 600 .8rem 'Barlow Condensed', sans-serif; letter-spacing: .12em; text-transform: uppercase; color: #475569; }
.cr-field input {
  width: 100%; padding: 13px 15px; font-size: 1rem; color: #0F172A;
  background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: 8px; outline: none;
  transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
}
.cr-field input::placeholder { color: #94A3B8; }
.cr-field input:focus { background: #fff; border-color: #0066FF; box-shadow: 0 0 0 4px rgba(0,102,255,.14); }

/* Upload */
.cr-upload-wrap { margin-bottom: 8px; }
.cr-drop {
  position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  padding: 26px 18px; text-align: center; cursor: pointer;
  color: var(--blue); background: #F5F9FF; border: 2px dashed #9DBDF0; border-radius: 12px;
  transition: background .25s ease, border-color .25s ease, transform .25s ease;
}
.cr-drop input { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
.cr-drop b { font-size: 1rem; font-weight: 600; color: #0F172A; }
.cr-drop small { font-size: .88rem; color: #64748B; }
.cr-drop:hover, .cr-drop.is-over { background: #EAF2FF; border-color: var(--blue); }
.cr-drop.is-over { transform: scale(1.01); }
.cr-drop:focus-within { border-color: var(--blue); box-shadow: 0 0 0 4px rgba(0,102,255,.14); }
.cr-drop.has-error { border-color: #DC2626; background: #FEF2F2; }
.cr-file { display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 12px; animation: crUp .4s ease both; }
.cr-file-icon { flex: none; width: 44px; height: 44px; display: grid; place-items: center; border-radius: 10px; background: #10B981; color: #fff; }
.cr-file-meta { flex: 1; min-width: 0; }
.cr-file-meta b { display: block; font-size: 1rem; font-weight: 600; color: #065F46; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cr-file-meta small { font-size: .85rem; color: #047857; }
.cr-file-x { flex: none; width: 34px; height: 34px; display: grid; place-items: center; cursor: pointer; background: #fff; border: 1px solid #A7F3D0; border-radius: 50%; color: #047857; transition: background .2s, color .2s; }
.cr-file-x:hover { background: #DC2626; border-color: #DC2626; color: #fff; }
.cr-file-error { margin: 8px 0 0; font-size: .92rem; font-weight: 500; color: #DC2626; }

.cr-submit { width: 100%; margin-top: 16px; }

.cr-success { padding: 30px 20px; text-align: center; border: 1px solid #10B981; background: #ECFDF5; border-radius: 12px; color: #047857; animation: crUp .6s ease both; }
.cr-success svg { color: #10B981; margin: 0 auto 8px; display: block; }
.cr-success h4 { margin: 0; font-size: 1.3rem; font-weight: 700; }
.cr-success p { margin: 8px 0 0; font-size: 1rem; }

/* ---------- Keyframes ---------- */
@keyframes crUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
@keyframes crZoom { from { opacity: 0; transform: translateX(50px) scale(.96); } to { opacity: 1; transform: none; } }
@keyframes crSlide { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: none; } }
@keyframes crRise { from { transform: translateY(100%); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes crGrid { to { background-position: 56px 56px, 56px 56px, 0 0; } }
@keyframes crPing { 0% { box-shadow: 0 0 0 0 rgba(255,255,255,.8); } 100% { box-shadow: 0 0 0 10px rgba(255,255,255,0); } }
@keyframes crRib1 { 0% { transform: translate(-40px, 20px) rotate(-2deg) scale(1); } 100% { transform: translate(50px, -30px) rotate(2deg) scale(1.06); } }
@keyframes crRib2 { 0% { transform: translate(40px, -20px) rotate(2deg) scale(1.04); } 100% { transform: translate(-50px, 30px) rotate(-2deg) scale(1); } }
@keyframes crShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
@keyframes crFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes crDash { to { stroke-dashoffset: -520; } }
@keyframes crOrbA { to { transform: translate(120px, 90px) scale(1.15); } }
@keyframes crOrbB { to { transform: translate(-130px, -70px) scale(1.12); } }

@media (prefers-reduced-motion: reduce) {
  .cr *, .cr *::before, .cr *::after { animation: none !important; transition: none !important; }
  .rv, .cr-up, .cr-zoom, .cr-role, .cr-step { opacity: 1 !important; transform: none !important; }
}

/* ---------- Responsive ---------- */
@media (max-width: 1100px) {
  .cr-hero-grid { grid-template-columns: 1fr; gap: 56px; }
  .cr-hero-right { max-width: 680px; }
  .cr-perks { grid-template-columns: repeat(2, 1fr); }
  .cr-faq-grid, .cr-contact-grid { gap: 48px; }
}
@media (max-width: 960px) {
  .cr-hero { padding: 110px 0 76px; }
  .cr-section, .cr-contact { padding: 72px 0; }
  .cr-faq-grid, .cr-contact-grid { grid-template-columns: 1fr; }
  .cr-faq-intro { position: static; }
  .cr-process { grid-template-columns: repeat(2, 1fr); row-gap: 44px; }
  .cr-process-line { display: none; }
}
@media (max-width: 640px) {
  .cr-container { padding: 0 18px; }
  .cr-perks { grid-template-columns: 1fr; }
  .cr-process { grid-template-columns: 1fr; }
  .cr-btns .cr-btn { flex: 1 1 100%; }
  .cr-brand img { height: 34px; }
  .cr-panel-head, .cr-role { padding-left: 18px; padding-right: 18px; }
  .cr-panel-head h2 { font-size: 1.2rem; }
  .cr-role { gap: 14px; }
  .cr-role-icon { width: 46px; height: 46px; }
  .cr-form-card { padding: 28px 20px; }
  .cr-form-row { grid-template-columns: 1fr; gap: 14px; }
  .cr-section, .cr-contact { padding: 60px 0; }
  .cr-faq-item button { font-size: 1rem; padding: 14px 14px; gap: 12px; }
  .cr-faq-q { width: 34px; height: 34px; font-size: .95rem; }
  .cr-faq-body p { padding: 16px 18px 18px; }
  .cr-faq-logo-in { padding: 26px 20px; }
  .cr-faq-item:hover { transform: none; }
  .cr-follow { flex-wrap: wrap; }
}
`;

export default CareerPage;