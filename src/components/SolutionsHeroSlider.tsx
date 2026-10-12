import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Send, Sparkles } from 'lucide-react';

interface SolutionsHeroSliderProps {
  openQuoteModalWithSolution: (solutionTitle: string) => void;
}

const INITIAL_SLIDES = [
  {
    id: 'smart-living',
    number: '01',
    title: 'Smart Living Solutions',
    category: 'Home & Office Automation',
    tagline: 'Transform everyday spaces with touch & voice automation',
    description: 'Custom smart switches, motorized curtain controllers, energy metering, CCTV security, and smartphone app triggers. Experience seamless, automated luxury.',
    image: '/img/WhatsApp Image 2026-09-19 at 1.33.07 PM.jpeg',
    badgeColor: '#38BDF8',
    subItems: ['Smart Switches', 'Smart Lights', 'CCTV', 'Smart Door Locks']
  },
  {
    id: 'industrial-automation',
    number: '02',
    title: 'Industrial Automation',
    category: 'Factory Systems & Panels',
    tagline: 'Precision control panels & automated machine integration',
    description: 'Engineering custom electrical control panels, PLC automation, VFD motor controllers, automated gate systems, and sensor telemetry built for 24/7 reliability.',
    image: '/img/WhatsApp Image 2026-09-19 at 1.05.09 PM.jpeg',
    badgeColor: '#FF9900',
    subItems: ['Gate Automation', 'Smart Irrigation', 'Custom Products', 'Industrial Training']
  },
  {
    id: 'solar-solution',
    number: '03',
    title: 'Solar Energy Solutions',
    category: 'Renewable Power & EPC',
    tagline: 'Clean, sustainable power for homes, farms & factories',
    description: 'Turnkey solar rooftop PV systems, high-efficiency BLDC solar pump controllers, outdoor solar lighting, and commercial grid-tied energy installations.',
    image: '/img/WhatsApp Image 2026-09-19 at 1.19.32 PM.jpeg',
    badgeColor: '#E2B049',
    subItems: ['1-10kW Residential', 'BLDC Pump Motors', 'Outdoor Solar', '10-100kW Commercial']
  },
  {
    id: 'skill-development',
    number: '04',
    title: 'Skill Development',
    category: 'Engineering Training & Labs',
    tagline: 'Empowering future engineers with hands-on technology',
    description: 'Certified hands-on training programs in drone piloting, multi-layer PCB circuit design, CAD/CAM mechanical modeling, and AI robotics across Tamil Nadu.',
    image: '/img/WhatsApp Image 2026-09-19 at 1.19.32 PM (1).jpeg',
    badgeColor: '#38BDF8',
    subItems: ['DRONE Pilot Training', 'PCB Layout & Fab', 'CAD/CAM Modeling', 'AI & Robotics']
  },
  {
    id: 'robot-services',
    number: '05',
    title: 'Robot Services',
    category: 'Autonomous Service Robots',
    tagline: 'Next-gen greeting & service robots for hospitality & corporate',
    description: 'Special purpose autonomous serve robots and interactive greeting robots for corporate showrooms, restaurants, hospitals, and educational events.',
    image: '/img/WhatsApp Image 2026-09-19 at 1.05.14 PM.jpeg',
    badgeColor: '#FF9900',
    subItems: ['SERVE ROBOT', 'GREETING ROBOT', 'Custom Navigation', 'Voice AI Interaction']
  },
  {
    id: 'fabrication',
    number: '06',
    title: 'Precision Fabrication',
    category: 'Industrial Manufacturing',
    tagline: 'Rapid prototyping, 3D printing & CNC metal fabrication',
    description: 'Industrial 3D printing, metal and non-metal laser cutting, DRO lathe machining, machine sheet bending, powder coating, and custom enclosure painting.',
    image: '/img/WhatsApp Image 2026-09-19 at 1.29.34 PM.jpeg',
    badgeColor: '#38BDF8',
    subItems: ['3D Printing', 'Laser Cutting', 'DRO Lathe Machining', 'Powder Coating']
  }
];

export const SolutionsHeroSlider: React.FC<SolutionsHeroSliderProps> = ({ openQuoteModalWithSolution }) => {
  const [slides, setSlides] = useState(INITIAL_SLIDES);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = slides[0];

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlides(prev => {
      const copy = [...prev];
      const first = copy.shift();
      if (first) copy.push(first);
      return copy;
    });
    setTimeout(() => setIsAnimating(false), 450);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlides(prev => {
      const copy = [...prev];
      const last = copy.pop();
      if (last) copy.unshift(last);
      return copy;
    });
    setTimeout(() => setIsAnimating(false), 450);
  };

  const handleSelectCard = (targetId: string) => {
    if (isAnimating) return;
    const targetIdx = slides.findIndex(s => s.id === targetId);
    if (targetIdx <= 0) return;
    setIsAnimating(true);
    setSlides(prev => {
      const copy = [...prev];
      const moved = copy.splice(0, targetIdx);
      return [...copy, ...moved];
    });
    setTimeout(() => setIsAnimating(false), 450);
  };

  // Auto-play timer (6 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [slides, isPaused]);

  const scrollToCatalog = () => {
    const el = document.getElementById('products-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '860px',
        height: '94vh',
        maxHeight: '1100px',
        overflow: 'hidden',
        background: '#050911',
        color: '#FFFFFF',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="dilum-slider-root"
    >
      {/* ----------------------------------------------------------- */}
      {/* BACKGROUND IMAGE OF ACTIVE SLIDE WITH DARK GRADIENT OVERLAY */}
      {/* ----------------------------------------------------------- */}
      <div 
        key={activeSlide.id}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("${activeSlide.image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
          transform: 'scale(1.03)',
          filter: 'brightness(0.85)'
        }}
      />

      {/* Dark Ambient Gradient Overlays for Text Legibility */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #050911 0%, rgba(5, 9, 17, 0.92) 42%, rgba(5, 9, 17, 0.45) 75%, rgba(5, 9, 17, 0.25) 100%)',
          zIndex: 1
        }}
      />
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(5, 9, 17, 0.5) 0%, transparent 40%, rgba(5, 9, 17, 0.85) 100%)',
          zIndex: 1
        }}
      />

      {/* Tech Grid Pattern Lines Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.7,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* ----------------------------------------------------------- */}
      {/* LEFT CONTENT (EXPANDED ACTIVE SLIDE DETAILS)                */}
      {/* ----------------------------------------------------------- */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: 'clamp(24px, 6vw, 90px)',
          transform: 'translateY(-50%)',
          zIndex: 10,
          maxWidth: '560px',
          width: 'calc(100% - 48px)'
        }}
      >
        <div key={activeSlide.id + '-content'} className="dilum-slide-anim">
          
          {/* Sector Badge Pill */}
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(12px)',
              border: `1.5px solid ${activeSlide.badgeColor}`,
              padding: '6px 18px',
              borderRadius: '30px',
              fontSize: '0.82rem',
              fontWeight: 800,
              color: activeSlide.badgeColor,
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              marginBottom: '18px',
              boxShadow: `0 0 20px ${activeSlide.badgeColor}33`
            }}
          >
            <Sparkles size={14} color={activeSlide.badgeColor} />
            <span>NUO SECTOR {activeSlide.number} • {activeSlide.category}</span>
          </div>

          {/* Main Title */}
          <h1 
            style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.08,
              letterSpacing: '-1px',
              marginBottom: '12px',
              textShadow: '0 10px 30px rgba(0,0,0,0.8)'
            }}
          >
            {activeSlide.title}
          </h1>

          {/* Tagline */}
          <div 
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
              fontWeight: 800,
              color: '#FF9900',
              marginBottom: '16px',
              letterSpacing: '0.5px'
            }}
          >
            {activeSlide.tagline}
          </div>

          {/* Description */}
          <p 
            style={{
              color: '#CBD5E1',
              fontSize: '1.02rem',
              lineHeight: 1.65,
              marginBottom: '26px',
              fontWeight: 500,
              maxWidth: '510px'
            }}
          >
            {activeSlide.description}
          </p>

          {/* Sub-Items Tags Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {activeSlide.subItems.map((item, idx) => (
              <span 
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  padding: '5px 13px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#E2E8F0'
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            <button
              onClick={() => openQuoteModalWithSolution(activeSlide.title)}
              style={{
                background: 'linear-gradient(90deg, #0066FF 0%, #FF9900 100%)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.98rem',
                padding: '15px 32px',
                borderRadius: '40px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 8px 25px rgba(0, 102, 255, 0.4)',
                transition: 'all 0.25s ease'
              }}
              className="btn-dilum-primary"
            >
              <span>GET INSTANT QUOTE</span>
              <Send size={17} color="#FFFFFF" />
            </button>

            <button
              onClick={scrollToCatalog}
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(10px)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.95rem',
                padding: '14px 28px',
                borderRadius: '40px',
                border: '1.5px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.25s ease'
              }}
              className="btn-dilum-secondary"
            >
              <span>Explore Products</span>
              <ArrowRight size={17} />
            </button>
          </div>

        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* RIGHT FLOATING TRAILING SLIDE CARDS (DILUM SANJAYA SIGNATURE) */}
      {/* ----------------------------------------------------------- */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          right: 'clamp(20px, 4vw, 60px)',
          transform: 'translateY(-50%)',
          zIndex: 15,
          display: 'flex',
          gap: '18px',
          alignItems: 'center'
        }}
        className="dilum-cards-container"
      >
        {slides.slice(1, 4).map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => handleSelectCard(slide.id)}
            style={{
              width: index === 0 ? '240px' : '215px',
              height: index === 0 ? '380px' : '345px',
              borderRadius: '24px',
              position: 'relative',
              backgroundImage: `url("${slide.image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
              border: index === 0 ? '2px solid rgba(56, 189, 248, 0.75)' : '1.5px solid rgba(255, 255, 255, 0.25)',
              boxShadow: index === 0 
                ? '0 25px 50px rgba(0, 0, 0, 0.85), 0 0 30px rgba(56, 189, 248, 0.35)' 
                : '0 18px 40px rgba(0, 0, 0, 0.65)',
              overflow: 'hidden',
              flexShrink: 0,
              transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
              opacity: index === 0 ? 1 : 0.85
            }}
            className="dilum-card-item"
            title={`Switch to ${slide.title}`}
          >
            {/* Dark Gradient Overlay inside Card */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(7, 13, 29, 0.1) 0%, rgba(7, 13, 29, 0.4) 50%, rgba(7, 13, 29, 0.95) 100%)'
              }}
            />

            {/* Top Sector Number Tag */}
            <div 
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                zIndex: 2,
                background: 'rgba(7, 13, 29, 0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.72rem',
                fontWeight: 900,
                color: '#38BDF8'
              }}
            >
              SECTOR {slide.number}
            </div>

            {/* Bottom Card Label Content */}
            <div 
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                zIndex: 2,
                color: '#FFFFFF'
              }}
            >
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#FF9900', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '3px' }}>
                {slide.category}
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#FFFFFF', margin: 0, lineHeight: 1.2 }}>
                {slide.title}
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700 }}>
                <span>{slide.subItems.length} Solutions</span>
                <ArrowRight size={12} color="#38BDF8" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ----------------------------------------------------------- */}
      {/* BOTTOM NAVIGATION ARROWS & PROGRESS INDICATOR              */}
      {/* ----------------------------------------------------------- */}
      <div 
        style={{
          position: 'absolute',
          bottom: '30px',
          left: 'clamp(24px, 6vw, 90px)',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        {/* Navigation Arrow Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handlePrev}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1.5px solid rgba(56, 189, 248, 0.4)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
              transition: 'all 0.25s ease'
            }}
            className="dilum-nav-btn"
            title="Previous Slide"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={handleNext}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1.5px solid rgba(56, 189, 248, 0.4)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
              transition: 'all 0.25s ease'
            }}
            className="dilum-nav-btn"
            title="Next Slide"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Slide Counter Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 900 }}>
          <span style={{ color: '#38BDF8', fontSize: '1.1rem' }}>{activeSlide.number}</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>/</span>
          <span style={{ color: '#94A3B8' }}>06</span>
          
          {/* Progress Bar */}
          <div style={{ width: '80px', height: '3px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '2px', overflow: 'hidden', marginLeft: '6px' }}>
            <div 
              style={{ 
                height: '100%', 
                width: `${(parseInt(activeSlide.number, 10) / 6) * 100}%`, 
                background: 'linear-gradient(90deg, #0066FF, #FF9900)', 
                borderRadius: '2px',
                transition: 'width 0.4s ease'
              }} 
            />
          </div>
        </div>
      </div>

      {/* STYLES & ANIMATIONS */}
      <style>{`
        @keyframes dilumFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .dilum-slide-anim {
          animation: dilumFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .dilum-card-item:hover {
          transform: translateY(-8px) scale(1.04) !important;
          border-color: #0066FF !important;
          box-shadow: 0 20px 40px rgba(0, 102, 255, 0.4) !important;
          opacity: 1 !important;
        }
        .dilum-nav-btn:hover {
          background: #0066FF !important;
          border-color: #38BDF8 !important;
          transform: scale(1.08);
          boxShadow: 0 0 20px rgba(0, 102, 255, 0.6) !important;
        }
        .btn-dilum-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 102, 255, 0.5) !important;
        }
        .btn-dilum-secondary:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          border-color: #FFFFFF !important;
        }
        @media (max-width: 1024px) {
          .dilum-cards-container {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
