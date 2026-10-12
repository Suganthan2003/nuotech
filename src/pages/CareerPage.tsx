import React, { useState, useEffect } from 'react';
import { CareerSection } from '../components/CareerSection';
import { COMPANY_INFO } from '../data/nuoData';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export const CareerPage: React.FC = () => {
  const [quickName, setQuickName] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickNote, setQuickNote] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickSubmitted(true);
    setTimeout(() => {
      setQuickSubmitted(false);
      setQuickName('');
      setQuickEmail('');
      setQuickPhone('');
      setQuickNote('');
    }, 4000);
  };
  // NUO TECH Logo-Inspired Color Palettes (Auto-rotating every 5 seconds)
  const logoColorPalettes = [
    {
      id: 'blue-navy',
      name: 'NUO Electric Blue',
      gradient: 'linear-gradient(135deg, #0F172A 0%, #0066FF 50%, #0284C7 100%)',
      titleHighlight: '#FF9900',
      subtitleColor: '#E2E8F0',
      orb1: 'rgba(0, 102, 255, 0.45)',
      orb2: 'rgba(255, 153, 0, 0.35)'
    },
    {
      id: 'orange-amber',
      name: 'NUO Tech Orange',
      gradient: 'linear-gradient(135deg, #FF9900 0%, #F59E0B 50%, #D97706 100%)',
      titleHighlight: '#FFFFFF',
      subtitleColor: '#FFFBEB',
      orb1: 'rgba(255, 255, 255, 0.4)',
      orb2: 'rgba(0, 102, 255, 0.35)'
    },
    {
      id: 'midnight-cyan',
      name: 'NUO Midnight Cyan',
      gradient: 'linear-gradient(135deg, #0B132B 0%, #0F172A 50%, #38BDF8 100%)',
      titleHighlight: '#FF9900',
      subtitleColor: '#F0F9FF',
      orb1: 'rgba(56, 189, 248, 0.45)',
      orb2: 'rgba(255, 153, 0, 0.35)'
    }
  ];

  const [paletteIndex, setPaletteIndex] = useState(0);
  const activePalette = logoColorPalettes[paletteIndex];

  // 5-Second Auto Background Color Rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setPaletteIndex((prev) => (prev + 1) % logoColorPalettes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Animated Typewriter Text effect
  const typewriterPhrases = ["START YOUR CAREER", "JOIN NUO TECH", "BUILD THE FUTURE"];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = typewriterPhrases[phraseIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedText.length < currentPhrase.length) {
      timer = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length + 1));
      }, 85);
    } else if (!isDeleting && typedText.length === currentPhrase.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2400);
    } else if (isDeleting && typedText.length > 0) {
      timer = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length - 1));
      }, 45);
    } else if (isDeleting && typedText.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex]);

  const scrollToPositions = () => {
    const el = document.getElementById('career');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ paddingTop: '0px', fontFamily: 'Inter, system-ui, sans-serif', background: '#FFFFFF' }}>
      
      {/* ========================================================
          HERO SECTION WITH LOGO BG COLOR & ANIMATED TYPEWRITER TEXT
         ======================================================== */}
      <section 
        style={{ 
          position: 'relative', 
          background: activePalette.gradient, 
          transition: 'background 1.2s ease-in-out',
          color: '#FFFFFF',
          padding: '130px 24px 80px',
          overflow: 'hidden',
          minHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* ANIMATED BACKGROUND ORBS & FLOATING SHAPES */}
        <div className="animated-bg-orb orb-1" style={{ background: activePalette.orb1 }} />
        <div className="animated-bg-orb orb-2" style={{ background: activePalette.orb2 }} />
        <div className="animated-bg-orb orb-3" />

        <div className="floating-shape shape-1" />
        <div className="floating-shape shape-2" />
        <div className="floating-shape shape-3" />

        {/* MAIN HERO CENTER CONTENT */}
        <div 
          className="container" 
          style={{ 
            position: 'relative', 
            zIndex: 2, 
            maxWidth: '880px', 
            margin: '0 auto', 
            textAlign: 'center' 
          }}
        >
          
          {/* Animated Logo Brand Badge */}
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(255, 255, 255, 0.4)',
              padding: '7px 22px',
              borderRadius: '30px',
              marginBottom: '20px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.5s ease'
            }}
            className="logo-badge-animated"
          >
            <img 
              src="/img/log.png" 
              alt="NUO TECH Logo" 
              style={{ 
                height: '24px', 
                width: 'auto',
                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.9))'
              }} 
            />
            <span style={{ 
              fontWeight: 900, 
              fontSize: '0.88rem', 
              letterSpacing: '1.5px',
              color: '#FFFFFF'
            }}>
              NUO TECHNOLOGIES
            </span>
          </div>

          {/* Subtitle in Typewriter Style */}
          <div 
            style={{ 
              fontFamily: "'Courier New', Courier, monospace", 
              fontSize: 'clamp(0.85rem, 2vw, 1.05rem)', 
              fontWeight: 800, 
              color: activePalette.subtitleColor, 
              letterSpacing: '2.5px', 
              textTransform: 'uppercase', 
              marginBottom: '14px',
              transition: 'color 0.8s ease'
            }}
          >
            ARE YOU READY TO SHAPE THE FUTURE?
          </div>

          {/* Big Bold Animated Typewriter Headline Title */}
          <h1 
            style={{ 
              fontSize: 'clamp(2.6rem, 6.5vw, 5rem)', 
              fontWeight: 900, 
              color: '#FFFFFF', 
              lineHeight: 1.05, 
              letterSpacing: '-1.5px', 
              textTransform: 'uppercase',
              margin: '0 0 24px',
              minHeight: '1.2em',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span>{typedText}</span>
            <span className="typewriter-cursor">|</span>
          </h1>

          {/* Body Paragraph in Monospace Typewriter Font */}
          <p 
            style={{ 
              fontFamily: "'Courier New', Courier, monospace", 
              fontSize: 'clamp(0.94rem, 1.8vw, 1.08rem)', 
              color: 'rgba(255, 255, 255, 0.88)', 
              lineHeight: 1.65, 
              maxWidth: '680px', 
              margin: '0 auto 36px',
              fontWeight: 600
            }}
          >
            Innovate with us at NUO TECH. We are looking for passionate engineers, CAD/CAM designers, drone pilots, and IoT hardware creators to build real-world automated systems.
          </p>

          {/* Call to Action Box & Glowing Dashed Button */}
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{ 
                fontFamily: "'Courier New', Courier, monospace", 
                fontSize: '0.9rem', 
                color: 'rgba(255, 255, 255, 0.9)', 
                fontWeight: 700 
              }}
            >
              Send your CV & Portfolio here!
            </div>

            <button 
              onClick={scrollToPositions}
              style={{ 
                background: 'rgba(255, 255, 255, 0.15)', 
                backdropFilter: 'blur(10px)',
                color: '#FFFFFF', 
                border: '2px dashed rgba(255, 255, 255, 0.7)', 
                padding: '13px 38px', 
                fontSize: '0.96rem', 
                fontWeight: 900, 
                letterSpacing: '2px', 
                textTransform: 'uppercase', 
                cursor: 'pointer',
                fontFamily: "'Courier New', Courier, monospace",
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease'
              }}
              className="btn-artistic-touch"
            >
              GET IN TOUCH
            </button>
          </div>

          {/* Bottom Info Row (Logo Left + Socials Right) */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginTop: '56px', 
              paddingTop: '20px', 
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.82rem',
              color: 'rgba(255, 255, 255, 0.8)',
              flexWrap: 'wrap',
              gap: '14px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/img/log.png" alt="Logo" style={{ height: '30px', width: 'auto', filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }} />
              <span style={{ fontWeight: 900, color: '#FFFFFF', fontSize: '0.95rem' }}>NUO TECH</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontFamily: "'Courier New', Courier, monospace", fontWeight: 700 }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.88rem' }}>More info :</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <a 
                  href={COMPANY_INFO.socials.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  title="LinkedIn"
                  style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%', 
                    background: '#0A66C2', 
                    color: '#FFF', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(10, 102, 194, 0.4)',
                    transition: 'transform 0.2s ease'
                  }}
                  className="ctrl-btn"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>

                <a 
                  href={COMPANY_INFO.socials.youtube} 
                  target="_blank" 
                  rel="noreferrer" 
                  title="YouTube"
                  style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%', 
                    background: '#FF0000', 
                    color: '#FFF', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(255, 0, 0, 0.4)',
                    transition: 'transform 0.2s ease'
                  }}
                  className="ctrl-btn"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                <a 
                  href={COMPANY_INFO.socials.facebook} 
                  target="_blank" 
                  rel="noreferrer" 
                  title="Facebook"
                  style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%', 
                    background: '#1877F2', 
                    color: '#FFF', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(24, 119, 242, 0.4)',
                    transition: 'transform 0.2s ease'
                  }}
                  className="ctrl-btn"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                <a 
                  href={COMPANY_INFO.socials.instagram} 
                  target="_blank" 
                  rel="noreferrer" 
                  title="Instagram"
                  style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(45deg, #F09433 0%, #E6683C 25%, #DC2743 50%, #CC2366 75%, #BC1888 100%)', 
                    color: '#FFF', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(220, 39, 67, 0.4)',
                    transition: 'transform 0.2s ease'
                  }}
                  className="ctrl-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* OPEN POSITIONS & APPLICATION SECTION */}
      <CareerSection />

      {/* Direct CV Application Form Section matching Target Image with NUO TECH Logo Colors */}
      <section style={{ padding: '70px 0 90px', background: '#F8FAFC', position: 'relative' }}>
        
        {/* Subtle Background Black Line Grid Pattern matching reference */}
        <div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.05) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            opacity: 0.85,
            pointerEvents: 'none'
          }} 
        />

        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          
          <div 
            style={{ 
              padding: '48px 40px', 
              borderRadius: '24px', 
              background: '#0B132B', 
              color: '#FFFFFF',
              border: '1px solid rgba(0, 102, 255, 0.25)',
              boxShadow: '0 20px 50px rgba(11, 19, 43, 0.4), 0 0 30px rgba(0, 102, 255, 0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}
            className="cv-form-card"
          >
            {/* Ambient Background Glow Orbs inside Card matching Logo Colors */}
            <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 102, 255, 0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 153, 0, 0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* NUO TECH Official Brand Logo Header matching reference image */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <img src="/img/log.png" alt="NUO TECH Logo" style={{ height: '42px', width: 'auto', filter: 'drop-shadow(0 0 10px rgba(0, 102, 255, 0.7))' }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '1.45rem', fontWeight: 900, letterSpacing: '1px', lineHeight: 1.1 }}>
                    <span style={{ color: '#0066FF' }}>NUO </span>
                    <span style={{ color: '#FF9900' }}>TECH</span>
                  </div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 900, color: '#0066FF', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px' }}>
                    FUTURE BEGINS NOW
                  </div>
                </div>
              </div>
            </div>

            {/* Title matching reference screenshot */}
            <h3 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.3rem)', fontWeight: 900, marginBottom: '14px', color: '#FFFFFF', letterSpacing: '-0.3px' }}>
              Don't See a Matching Position?
            </h3>

            {/* Subtext matching reference screenshot */}
            <p style={{ color: '#94A3B8', fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '32px', maxWidth: '640px', margin: '0 auto 32px' }}>
              We are always eager to meet talented engineers, embedded hardware creators, and field innovators. Send your CV and portfolio directly to our engineering team!
            </p>

            {/* Primary Orange/Amber Pill CTA Button matching reference image */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <a 
                href={`mailto:${COMPANY_INFO.email}?subject=CV Application - NUO TECH`} 
                style={{
                  background: '#FF9900',
                  color: '#000000',
                  padding: '14px 38px',
                  borderRadius: '9999px',
                  fontSize: '0.98rem',
                  fontWeight: 900,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 25px rgba(255, 153, 0, 0.4)',
                  transition: 'all 0.25s ease'
                }}
                className="btn-pill-orange"
              >
                <Mail size={19} color="#000000" strokeWidth={2.5} />
                <span>{COMPANY_INFO.email}</span>
              </a>

              {/* Direct Interactive Form in NUO TECH Logo Colors */}
              <div style={{ width: '100%', maxWidth: '620px', marginTop: '10px', paddingTop: '28px', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
                  Or Submit Quick CV Form Below
                </div>

                {quickSubmitted ? (
                  <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', borderRadius: '16px', padding: '24px', maxWidth: '540px', margin: '0 auto', color: '#34D399' }}>
                    <CheckCircle2 size={40} style={{ color: '#10B981', margin: '0 auto 8px' }} />
                    <h5 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0 }}>Resume Received!</h5>
                    <p style={{ fontSize: '0.9rem', margin: '6px 0 0' }}>Thank you {quickName}. Our HR team will evaluate your CV and reach out.</p>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <input 
                        type="text" 
                        required 
                        placeholder="Your Full Name *" 
                        value={quickName} 
                        onChange={(e) => setQuickName(e.target.value)} 
                        style={{ padding: '13px 16px', borderRadius: '12px', background: '#0F172A', border: '1.5px solid rgba(0, 102, 255, 0.35)', color: '#FFF', fontSize: '0.94rem', outline: 'none' }}
                      />
                      <input 
                        type="tel" 
                        required 
                        placeholder="Phone Number *" 
                        value={quickPhone} 
                        onChange={(e) => setQuickPhone(e.target.value)} 
                        style={{ padding: '13px 16px', borderRadius: '12px', background: '#0F172A', border: '1.5px solid rgba(0, 102, 255, 0.35)', color: '#FFF', fontSize: '0.94rem', outline: 'none' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <input 
                        type="email" 
                        required 
                        placeholder="Email Address *" 
                        value={quickEmail} 
                        onChange={(e) => setQuickEmail(e.target.value)} 
                        style={{ padding: '13px 16px', borderRadius: '12px', background: '#0F172A', border: '1.5px solid rgba(0, 102, 255, 0.35)', color: '#FFF', fontSize: '0.94rem', outline: 'none' }}
                      />
                      <input 
                        type="text" 
                        placeholder="Portfolio / LinkedIn Link (Optional)" 
                        value={quickNote} 
                        onChange={(e) => setQuickNote(e.target.value)} 
                        style={{ padding: '13px 16px', borderRadius: '12px', background: '#0F172A', border: '1.5px solid rgba(0, 102, 255, 0.35)', color: '#FFF', fontSize: '0.94rem', outline: 'none' }}
                      />
                    </div>

                    <button 
                      type="submit" 
                      style={{ 
                        background: '#0066FF', 
                        color: '#FFFFFF', 
                        border: 'none', 
                        padding: '13px 32px', 
                        borderRadius: '30px', 
                        fontSize: '0.94rem', 
                        fontWeight: 900, 
                        cursor: 'pointer', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        gap: '8px', 
                        boxShadow: '0 8px 20px rgba(0, 102, 255, 0.35)',
                        marginTop: '6px',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <Send size={17} />
                      <span>Submit</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ANIMATED BACKGROUND ORBS & TYPEWRITER CURSOR KEYFRAMES */}
      <style>{`
        .animated-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(55px);
          opacity: 0.65;
          animation: floatOrb 9s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .orb-1 { width: 320px; height: 320px; top: -60px; left: 8%; animation-duration: 9s; }
        .orb-2 { width: 280px; height: 280px; bottom: 10px; right: 12%; animation-duration: 7s; animation-delay: -3s; }
        .orb-3 { width: 220px; height: 220px; background: rgba(255, 255, 255, 0.35); top: 25%; left: 50%; transform: translateX(-50%); animation-duration: 11s; animation-delay: -5s; }
        .floating-shape { position: absolute; background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(4px); border-radius: 12px; animation: floatShape 12s ease-in-out infinite alternate; pointer-events: none; }
        .shape-1 { width: 44px; height: 44px; top: 15%; left: 5%; transform: rotate(15deg); }
        .shape-2 { width: 55px; height: 55px; top: 35%; right: 6%; border-radius: 50%; animation-delay: -4s; }
        .shape-3 { width: 32px; height: 32px; bottom: 25%; left: 20%; animation-delay: -7s; }
        @keyframes floatOrb {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(1.1); }
          100% { transform: translateY(15px) scale(0.95); }
        }
        @keyframes floatShape {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-35px) rotate(45deg); }
        }
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typewriter-cursor {
          display: inline-block;
          font-weight: 300;
          color: #FF9900;
          animation: blinkCursor 0.7s infinite;
          margin-left: 4px;
        }
        .btn-artistic-touch:hover {
          background: #FFFFFF !important;
          color: #0F172A !important;
          border-style: solid !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(255, 153, 0, 0.4) !important;
        }
      `}</style>
    </div>
  );
};

export default CareerPage;
