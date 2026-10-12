import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Cpu, ShieldCheck, ChevronLeft, ChevronRight, 
  Radio, Award 
} from 'lucide-react';

interface HeroProps {
  openQuoteModal: () => void;
  scrollToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ openQuoteModal, scrollToSection }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = [
    {
      id: 0,
      number: "01",
      tag: "NUO TECH • SMART LIVING SOLUTIONS",
      badge: "Smart Home Automation • Touch Switches • Remote Control",
      badgeColor: "#38BDF8",
      badgeBg: "transparent",
      badgeBorder: "transparent",
      titlePrefix: "Next-Gen",
      titleHighlight: "Smart Living",
      titleSuffix: "Solutions.",
      description: "Transform your living and working spaces with intelligent home automation, touch switch controls, automated lighting, climate regulation, and remote cloud connectivity.",
      accentColor: "#06B6D4",
      gradient: "linear-gradient(135deg, #06B6D4 0%, #38BDF8 100%)",
      bgVideo: "/v/s1.mp4",
      image: "/img/s1.jpg",
      fallbackImage: "/img/s1.jpg",
      stat1: { title: "Smart Home IoT", desc: "App & Voice Controlled", icon: <Cpu size={22} />, color: "#06B6D4" },
      stat2: { title: "24/7 Connectivity", desc: "Remote Access & Security", icon: <ShieldCheck size={22} />, color: "#38BDF8" },
      pillars: ["Smart Living Solutions", "Smart Home Automation", "Automated Touch Control"]
    },
    {
      id: 1,
      number: "02",
      tag: "NUO TECH • INDUSTRIAL AUTOMATION",
      badge: "PLC Panels • Motor Drives • Custom Machine Engineering",
      badgeColor: "#10B981",
      badgeBg: "rgba(16, 185, 129, 0.15)",
      badgeBorder: "rgba(16, 185, 129, 0.4)",
      titlePrefix: "Advanced",
      titleHighlight: "Industrial",
      titleSuffix: "Automation.",
      description: "Empowering industries with customized electrical control panels, PLC & VFD motor integration, automated machine safety, and precision manufacturing engineering.",
      accentColor: "#10B981",
      gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
      bgVideo: "/v/s2.mp4",
      image: "/img/s2.jpg",
      fallbackImage: "/img/s2.jpg",
      stat1: { title: "Industrial Panels", desc: "Custom Control Systems", icon: <Cpu size={22} />, color: "#10B981" },
      stat2: { title: "SPM Engineering", desc: "Special Purpose Machinery", icon: <Award size={22} />, color: "#E2B049" },
      pillars: ["Industrial Automation", "PLC & Control Panels", "Special Purpose Machines"]
    },
    {
      id: 2,
      number: "03",
      tag: "NUO TECH • SOLAR SOLUTIONS",
      badge: "Solar Water Heaters • Rooftop PV • Solar Agriculture Pumps",
      badgeColor: "#38BDF8",
      badgeBg: "rgba(56, 189, 248, 0.15)",
      badgeBorder: "rgba(56, 189, 248, 0.4)",
      titlePrefix: "Sustainable",
      titleHighlight: "Solar",
      titleSuffix: "Solutions.",
      description: "High-efficiency solar water heating systems, turnkey rooftop solar power installations, solar agricultural pumps, and eco-friendly renewable energy systems.",
      accentColor: "#38BDF8",
      gradient: "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)",
      bgVideo: "/v/s3.mp4",
      image: "/img/s3.jpg",
      fallbackImage: "/img/s3.jpg",
      stat1: { title: "Solar Heating & PV", desc: "High Efficiency Energy", icon: <Radio size={22} />, color: "#38BDF8" },
      stat2: { title: "Clean Energy", desc: "Eco-Friendly Power Systems", icon: <ShieldCheck size={22} />, color: "#0284C7" },
      pillars: ["Solar Solutions", "Solar Water Heating", "Rooftop Solar Power"]
    }
  ];

  // Canvas Interactive Background Particles Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const accent = slides[currentSlide].accentColor;
      ctx.fillStyle = accent;
      ctx.strokeStyle = accent;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.globalAlpha = (1 - dist / 110) * 0.15;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentSlide]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const activeSlide = slides[currentSlide];

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      style={{ 
        paddingTop: '155px', 
        paddingBottom: '90px', 
        position: 'relative', 
        overflow: 'hidden',
        minHeight: '96vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {/* Dynamic Animated Particle Canvas Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* Slide Animated Background Video */}
      {activeSlide.bgVideo && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <video 
            key={`bg-video-${currentSlide}`}
            src={activeSlide.bgVideo} 
            autoPlay 
            muted 
            loop 
            playsInline 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65, filter: 'brightness(0.75)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(7, 11, 18, 0.45) 0%, rgba(7, 11, 18, 0.85) 100%)' }} />
        </div>
      )}

      {/* Radial Ambient Glow Orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: '500px',
        height: '500px',
        background: `radial-gradient(circle, ${activeSlide.accentColor}25 0%, rgba(0,0,0,0) 70%)`,
        filter: 'blur(70px)',
        zIndex: 0,
        transition: 'background 0.8s ease',
        pointerEvents: 'none',
        transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1380px', margin: '0 auto', padding: '0 48px' }}>
        
        {/* Main 2-Column Split Hero Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }} className="hero-grid">
          
          {/* Left Column: Animated Text & Content */}
          <div key={`left-${currentSlide}`} className="hero-animated-left">
            
            {/* Main Headline */}
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', 
              lineHeight: 1.12, 
              marginBottom: '22px',
              letterSpacing: '-0.5px'
            }}>
              {activeSlide.titlePrefix}{' '}
              <span style={{ 
                background: activeSlide.gradient, 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                display: 'inline-block' 
              }}>
                {activeSlide.titleHighlight}
              </span>{' '}
              {activeSlide.titleSuffix}
            </h1>

            {/* Description */}
            <p style={{ 
              fontSize: '1.18rem', 
              color: '#94A3B8', 
              marginBottom: '32px', 
              maxWidth: '580px', 
              lineHeight: 1.65,
              fontWeight: 500
            }}>
              {activeSlide.description}
            </p>

            {/* CTA Action Buttons with Glowing Logo Accent Colors */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '36px' }}>
              <button 
                onClick={openQuoteModal} 
                className="btn btn-primary btn-glowing-accent" 
                style={{ 
                  padding: '14px 32px',
                  background: activeSlide.gradient,
                  border: 'none',
                  boxShadow: `0 0 30px ${activeSlide.accentColor}60`,
                  borderRadius: '9999px',
                  fontSize: '0.96rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease'
                }}
              >
                <span>Start Project</span>
                <ArrowRight size={18} />
              </button>

              <button 
                onClick={() => scrollToSection('solutions')} 
                className="btn btn-secondary" 
                style={{ 
                  padding: '14px 28px',
                  borderRadius: '9999px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  background: 'rgba(15, 23, 42, 0.7)',
                  backdropFilter: 'blur(10px)',
                  borderColor: `${activeSlide.accentColor}60`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <span>Explore Solutions</span>
              </button>
            </div>

          </div>

          {/* Right Column: 3D Stacked Card Carousel Showcase */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{
                perspective: '1200px',
                transformStyle: 'preserve-3d',
                transform: `rotateY(${mousePos.x * -8}deg) rotateX(${mousePos.y * 8}deg)`,
                transition: 'transform 0.2s ease-out'
              }}
            >
              <div 
                style={{ 
                  padding: '0px', 
                  borderRadius: '24px', 
                  position: 'relative', 
                  border: `2px solid ${activeSlide.accentColor}60`,
                  boxShadow: `0 20px 60px ${activeSlide.accentColor}35`,
                  maxWidth: '430px',
                  margin: '0 auto',
                  transition: 'all 0.6s ease'
                }}
              >
                
                {/* Main Visual Showcase Image Box */}
                <div style={{ width: '100%', height: '540px', borderRadius: '22px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    key={`right-img-${currentSlide}`}
                    src={activeSlide.image} 
                    alt="NUO TECH Solutions" 
                    className="hero-animated-img"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute('src', activeSlide.fallbackImage);
                    }}
                  />

                  {/* Gradient Image Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(7, 11, 18, 0.95) 0%, rgba(7, 11, 18, 0.25) 60%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '24px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <img src="/img/log.png" alt="Logo" style={{ height: '22px', width: 'auto' }} />
                      <span style={{ fontSize: '0.8rem', color: activeSlide.accentColor, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {activeSlide.tag}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.3rem', color: '#FFF', fontWeight: 800 }}>
                      {activeSlide.pillars[0]}
                    </h3>
                  </div>

                  {/* Arrow Navigation Controls */}
                  <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 12 }}>
                    <button
                      onClick={prevSlide}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'rgba(10, 16, 29, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        color: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.2s ease'
                      }}
                      className="ctrl-btn"
                      title="Previous Slide"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <button
                      onClick={nextSlide}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: activeSlide.gradient,
                        border: 'none',
                        color: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: `0 0 20px ${activeSlide.accentColor}70`,
                        transition: 'all 0.2s ease'
                      }}
                      className="ctrl-btn"
                      title="Next Slide"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .hero-animated-left {
          animation: heroFadeInLeft 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-animated-img {
          animation: heroScaleIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes heroFadeInLeft {
          from { opacity: 0; transform: translateX(-18px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroScaleIn {
          from { opacity: 0; transform: scale(1.06); }
          to { opacity: 1; transform: scale(1); }
        }
        .ctrl-btn:hover {
          transform: scale(1.1);
        }
        .ctrl-btn:active {
          transform: scale(0.95);
        }
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </section>
  );
};
