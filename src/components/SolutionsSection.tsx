import React, { useState, useEffect, useRef } from 'react';
import { 
  Sprout, Cpu, Sun, ShieldCheck, CircuitBoard, 
  Bot, Activity, Zap, ChevronLeft, ChevronRight
} from 'lucide-react';

interface SolutionsSectionProps {
  openQuoteModalWithSolution?: (solutionTitle: string) => void;
}

export interface SectorItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
  features: {
    icon: React.ReactNode;
    label: string;
  }[];
}

export const SOLUTIONS_DATA: SectorItem[] = [
  {
    id: "smart-living-solutions",
    title: "Smart Living Solutions",
    category: "SMART LIVING & AUTOMATION",
    tagline: "Smart switches, touch lights, CCTV security & keyless door locks",
    description: "Transform your home and commercial spaces with integrated touch switches, app-controlled lighting, high-definition CCTV security cameras, and automated door locks.",
    image: "/img/WhatsApp Image 2026-09-19 at 1.33.07 PM.jpeg",
    accentColor: "#38BDF8",
    features: [
      { icon: <Zap size={18} style={{ color: '#38BDF8' }} />, label: "Smart Switches" },
      { icon: <Sun size={18} style={{ color: '#38BDF8' }} />, label: "Smart Lights" },
      { icon: <ShieldCheck size={18} style={{ color: '#38BDF8' }} />, label: "CCTV" },
      { icon: <Bot size={18} style={{ color: '#38BDF8' }} />, label: "Smart Door Locks" }
    ]
  },
  {
    id: "industrial-automation",
    title: "Industrial Automation",
    category: "INDUSTRIAL AUTOMATION",
    tagline: "Gate automation, smart irrigation, custom products & industrial training",
    description: "Comprehensive industrial automation including heavy-duty motorized gate systems, automated agricultural irrigation, specialized custom electronics, and technical field training.",
    image: "/img/WhatsApp Image 2026-09-19 at 1.05.09 PM.jpeg",
    accentColor: "#2563EB",
    features: [
      { icon: <Zap size={18} style={{ color: '#2563EB' }} />, label: "Gate Automation" },
      { icon: <Sprout size={18} style={{ color: '#2563EB' }} />, label: "Smart Irrigation System" },
      { icon: <Cpu size={18} style={{ color: '#2563EB' }} />, label: "Custom Products" },
      { icon: <Activity size={18} style={{ color: '#2563EB' }} />, label: "Industrial Training" }
    ]
  },
  {
    id: "solar-solution",
    title: "Solar Solution",
    category: "RENEWABLE SOLAR ENERGY",
    tagline: "Residential rooftop solar, BLDC pumps, outdoor lights & commercial solar",
    description: "Clean renewable power solutions ranging from 1-10kW residential rooftop solar PV to high-efficiency BLDC agricultural pump motors, solar outdoor illumination, and 10-100kW commercial solar plants.",
    image: "/img/s1.jpg",
    accentColor: "#D97706",
    features: [
      { icon: <Sun size={18} style={{ color: '#D97706' }} />, label: "1 - 10Kw Residential Solar" },
      { icon: <Zap size={18} style={{ color: '#D97706' }} />, label: "BLDC Pump Motors" },
      { icon: <Sun size={18} style={{ color: '#D97706' }} />, label: "Solar outdoor lights" },
      { icon: <Sun size={18} style={{ color: '#D97706' }} />, label: "10 - 100 kw commercial Solar" }
    ]
  },
  {
    id: "skill-development",
    title: "Skill Development",
    category: "SKILL DEVELOPMENT & TECH",
    tagline: "Drone assembly, PCB design, CAD/CAM modeling & AI robotics training",
    description: "Hands-on engineering skill development programs covering agricultural drone manufacturing, multi-layer PCB design, 3D CAD/CAM mechanics, and advanced AI & robotics development.",
    image: "/img/WhatsApp Image 2026-09-19 at 1.19.32 PM (1).jpeg",
    accentColor: "#10B981",
    features: [
      { icon: <Bot size={18} style={{ color: '#10B981' }} />, label: "DRONE" },
      { icon: <CircuitBoard size={18} style={{ color: '#10B981' }} />, label: "PCB DESIGN" },
      { icon: <Cpu size={18} style={{ color: '#10B981' }} />, label: "CAD/CAM" },
      { icon: <Bot size={18} style={{ color: '#10B981' }} />, label: "AI & ROBOTICS" }
    ]
  },
  {
    id: "robot-services",
    title: "Robot Services",
    category: "ROBOT SERVICES",
    tagline: "Autonomous service robots & interactive greeting robots",
    description: "Innovative service robotics engineered for hospitality, commercial venues, customer reception, automated serving, and interactive public engagement.",
    image: "/img/WhatsApp Image 2026-09-19 at 1.04.46 PM.jpeg",
    accentColor: "#7C3AED",
    features: [
      { icon: <Bot size={18} style={{ color: '#7C3AED' }} />, label: "SERVE ROBOT" },
      { icon: <Bot size={18} style={{ color: '#7C3AED' }} />, label: "GREETING ROBOT" }
    ]
  },
  {
    id: "fabrication",
    title: "Fabrication",
    category: "MANUFACTURING & FABRICATION",
    tagline: "3D printing, laser cutting, CNC machining, bending & powder coating",
    description: "Precision metal and non-metal fabrication services including additive 3D printing, high-speed laser cutting, lathe & DRO machining, hydraulic bending, powder coating, and 3D parts finishing.",
    image: "/img/WhatsApp Image 2026-09-19 at 1.05.14 PM.jpeg",
    accentColor: "#EA580C",
    features: [
      { icon: <Cpu size={18} style={{ color: '#EA580C' }} />, label: "3D PRINT" },
      { icon: <Zap size={18} style={{ color: '#EA580C' }} />, label: "METAL / NON METAL LASER CUTTING" },
      { icon: <Activity size={18} style={{ color: '#EA580C' }} />, label: "DRO / LATHE / MACHING" },
      { icon: <ShieldCheck size={18} style={{ color: '#EA580C' }} />, label: "MACHINE BENDING" },
      { icon: <Sun size={18} style={{ color: '#EA580C' }} />, label: "POWDER COATING" },
      { icon: <Cpu size={18} style={{ color: '#EA580C' }} />, label: "3D PARTS PAINTING" }
    ]
  }
];

export const SolutionsSection: React.FC<SolutionsSectionProps> = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [tilt, setTilt] = useState<{ rotateX: number; rotateY: number }>({ rotateX: 0, rotateY: 0 });
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const cardStageRef = useRef<HTMLDivElement>(null);

  const activeSector = SOLUTIONS_DATA[activeIndex];
  const totalSectors = SOLUTIONS_DATA.length;

  // Auto-rotating slider timer (4 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % totalSectors);
    setTimeout(() => setIsAnimating(false), 450);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + totalSectors) % totalSectors);
    setTimeout(() => setIsAnimating(false), 450);
  };

  const goToSlide = (index: number) => {
    if (index === activeIndex || isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 450);
  };

  // 3D Card tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardStageRef.current) return;
    const rect = cardStageRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setTilt({
      rotateY: (x / rect.width) * 16,
      rotateX: (-y / rect.height) * 16
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // Calculate 3D card position styles relative to active index
  const getCardStyle = (index: number) => {
    let diff = (index - activeIndex + totalSectors) % totalSectors;
    if (diff > totalSectors / 2) diff -= totalSectors;

    const isActive = diff === 0;
    const isPrev = diff === -1;
    const isNext = diff === 1;
    const isFarPrev = diff === -2 || diff < -2;
    const isFarNext = diff === 2 || diff > 2;

    if (isActive) {
      return {
        transform: `translate(-50%, -50%) translateX(0px) scale(1.12) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        zIndex: 40,
        opacity: 1,
        filter: 'brightness(1.02)',
        cursor: 'pointer',
        boxShadow: `0 25px 50px rgba(15, 23, 42, 0.22), 0 0 30px rgba(37, 99, 235, 0.25)`
      };
    } else if (isNext) {
      return {
        transform: `translate(-50%, -50%) translateX(270px) scale(0.86) rotateY(-25deg)`,
        zIndex: 25,
        opacity: 0.65,
        filter: 'brightness(0.85) blur(0.5px)',
        cursor: 'pointer',
        boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)'
      };
    } else if (isPrev) {
      return {
        transform: `translate(-50%, -50%) translateX(-270px) scale(0.86) rotateY(25deg)`,
        zIndex: 25,
        opacity: 0.65,
        filter: 'brightness(0.85) blur(0.5px)',
        cursor: 'pointer',
        boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)'
      };
    } else if (isFarNext) {
      return {
        transform: `translate(-50%, -50%) translateX(460px) scale(0.7) rotateY(-38deg)`,
        zIndex: 10,
        opacity: 0.25,
        filter: 'brightness(0.75) blur(2px)',
        cursor: 'pointer'
      };
    } else if (isFarPrev) {
      return {
        transform: `translate(-50%, -50%) translateX(-460px) scale(0.7) rotateY(38deg)`,
        zIndex: 10,
        opacity: 0.25,
        filter: 'brightness(0.75) blur(2px)',
        cursor: 'pointer'
      };
    } else {
      return {
        transform: `translate(-50%, -50%) translateX(${diff > 0 ? 600 : -600}px) scale(0.5)`,
        zIndex: 1,
        opacity: 0,
        pointerEvents: 'none' as const
      };
    }
  };

  return (
    <section 
      id="solutions" 
      style={{ 
        position: 'relative', 
        padding: '100px 0 130px', 
        background: '#FFFFFF', 
        color: '#0F172A',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* Soft Light Radial Background Accents */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: `
            radial-gradient(circle at 15% 25%, rgba(37, 99, 235, 0.05) 0%, transparent 45%),
            radial-gradient(circle at 85% 75%, rgba(245, 158, 11, 0.05) 0%, transparent 45%)
          `
        }}
      />

      {/* Subtle Light Grid Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.6,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        
        {/* Header Branding */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 40px' }}>
          
          {/* Top Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.25)', padding: '6px 18px', borderRadius: '30px', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#2563EB' }}>
              6 CORE SOLUTION SECTORS
            </span>
          </div>

          {/* Main Title (Dark Slate Typography on White BG) */}
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 800, color: '#0F172A', marginBottom: '14px', lineHeight: 1.25, letterSpacing: '-0.5px' }}>
            Transforming Engineering into <span style={{ color: '#E2B049' }}>Intelligent Solutions</span>
          </h2>

          <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.6, margin: '0 auto', maxWidth: '720px' }}>
            Explore NUO TECH's 6 specialized technology sectors in our interactive 3D Voyage Slider. From smart living solutions to solar energy, robotics and custom fabrication.
          </p>
        </div>

        {/* 6 Sector Pill Filter Chips (Clean Light Theme) */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '8px', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            marginBottom: '38px',
            padding: '0 12px'
          }}
        >
          {SOLUTIONS_DATA.map((sector, idx) => {
            const isActive = idx === activeIndex;

            return (
              <button
                key={sector.id}
                onClick={() => goToSlide(idx)}
                style={{
                  background: isActive ? '#2563EB' : '#F1F5F9',
                  border: isActive ? '1.5px solid #2563EB' : '1px solid #E2E8F0',
                  color: isActive ? '#FFFFFF' : '#475569',
                  padding: '7px 18px',
                  borderRadius: '30px',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 700 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: isActive ? '0 4px 14px rgba(37, 99, 235, 0.35)' : 'none'
                }}
              >
                <span style={{ 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%', 
                  background: isActive ? '#FFFFFF' : '#94A3B8' 
                }} />
                <span>{sector.title}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Voyage Slider Stage & Right Info Panel (Desktop 2-Col Layout) */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '36px',
            alignItems: 'center',
            minHeight: '460px',
            position: 'relative'
          }}
          className="solutions-slider-grid"
        >

          {/* Left Side: 3D Card Perspective Stage */}
          <div 
            ref={cardStageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'relative',
              height: '430px',
              width: '100%',
              perspective: '1200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Left Chevron Button */}
            <button
              onClick={prevSlide}
              aria-label="Previous Sector"
              style={{
                position: 'absolute',
                left: '0px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 50,
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1.5px solid #CBD5E1',
                color: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(15, 23, 42, 0.12)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2563EB';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = '#2563EB';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#0F172A';
                e.currentTarget.style.borderColor = '#CBD5E1';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Right Chevron Button */}
            <button
              onClick={nextSlide}
              aria-label="Next Sector"
              style={{
                position: 'absolute',
                right: '0px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 50,
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1.5px solid #CBD5E1',
                color: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(15, 23, 42, 0.12)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2563EB';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = '#2563EB';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#0F172A';
                e.currentTarget.style.borderColor = '#CBD5E1';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronRight size={22} />
            </button>

            {/* 6 Cards in 3D Space */}
            {SOLUTIONS_DATA.map((sector, idx) => {
              const cardStyle = getCardStyle(idx);
              const isActive = idx === activeIndex;

              return (
                <div
                  key={sector.id}
                  onClick={() => goToSlide(idx)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '270px',
                    height: '375px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease, filter 0.6s ease, box-shadow 0.6s ease',
                    border: isActive 
                      ? `2.5px solid ${sector.accentColor}` 
                      : '1px solid #E2E8F0',
                    background: '#FFFFFF',
                    transformStyle: 'preserve-3d',
                    ...cardStyle
                  }}
                >
                  {/* Card Image */}
                  <img 
                    src={sector.image} 
                    alt={sector.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />

                  {/* Top Category Overlay Badge */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      right: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      pointerEvents: 'none'
                    }}
                  >
                    <span 
                      style={{ 
                        background: '#FFFFFF', 
                        border: `1px solid ${sector.accentColor}66`,
                        color: sector.accentColor,
                        fontSize: '0.66rem',
                        fontWeight: 800,
                        letterSpacing: '1px',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        textTransform: 'uppercase',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      {sector.category}
                    </span>
                  </div>

                  {/* Bottom Glass Title Tag */}
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.65) 70%, transparent 100%)',
                      padding: '16px 16px 14px',
                      pointerEvents: 'none'
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600, marginBottom: '2px' }}>
                      SECTOR 0{idx + 1}
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {sector.title}
                    </div>
                  </div>

                </div>
              );
            })}

          </div>

          {/* Right Side: Animated Sector Information & Features Card (White Card) */}
          <div 
            style={{
              background: '#FFFFFF',
              border: `1.5px solid #E2E8F0`,
              borderRadius: '28px',
              padding: '34px',
              boxShadow: `0 20px 50px rgba(15, 23, 42, 0.08), 0 0 25px rgba(37, 99, 235, 0.06)`,
              transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              position: 'relative'
            }}
          >
            
            {/* Top Category & Counter */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: activeSector.accentColor }}>
                {activeSector.category}
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#64748B', background: '#F1F5F9', padding: '4px 12px', borderRadius: '20px' }}>
                0{activeIndex + 1} / 0{totalSectors}
              </span>
            </div>

            {/* Title */}
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px', lineHeight: 1.25 }}>
              {activeSector.title}
            </h3>

            {/* Tagline */}
            <div style={{ fontSize: '0.94rem', fontWeight: 600, color: activeSector.accentColor, marginBottom: '14px' }}>
              {activeSector.tagline}
            </div>

            {/* Description */}
            <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '22px' }}>
              {activeSector.description}
            </p>

            {/* Sub-Items List displayed on the right side panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeSector.features.map((feat, i) => (
                <div 
                  key={i} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    background: '#F8FAFC', 
                    padding: '11px 16px', 
                    borderRadius: '14px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                  }}
                >
                  {feat.icon}
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#1E293B' }}>{feat.label}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Bottom Pagination Dots */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '8px', 
            marginTop: '38px' 
          }}
        >
          {SOLUTIONS_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to sector ${idx + 1}`}
              style={{
                width: idx === activeIndex ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: idx === activeIndex ? '#2563EB' : '#CBD5E1',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .solutions-slider-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default SolutionsSection;
