import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, Bot, Sun, GraduationCap, Cpu, Layers, 
  CheckCircle2, Sparkles, ChevronRight
} from 'lucide-react';

interface SolutionCardsGridProps {
  openQuoteModalWithSolution: (solutionTitle: string) => void;
}

interface SectorCardItem {
  id: string;
  number: string;
  title: string;
  category: string;
  accentColor: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  image: string;
  subItems: string[];
}

export const SolutionCardsGrid: React.FC<SolutionCardsGridProps> = ({ openQuoteModalWithSolution }) => {
  const navigate = useNavigate();
  const [activeSubModal, setActiveSubModal] = useState<SectorCardItem | null>(null);

  const SECTOR_CARDS: SectorCardItem[] = [
    {
      id: 'smart-living',
      number: '01',
      title: 'Smart Living Solutions',
      category: 'HOME & OFFICE AUTOMATION',
      accentColor: '#0066FF',
      icon: <Zap size={22} color="#0066FF" />,
      tagline: 'Intelligent Touch & Voice Space Automation',
      description: 'Custom smart switches, motorized curtain controllers, energy telemetry, CCTV security integration, and smartphone app triggers for luxurious modern spaces.',
      image: '/img/WhatsApp Image 2026-09-19 at 1.33.07 PM.jpeg',
      subItems: ['Smart Touch Switches', 'Smart Lights & Dimming', 'CCTV Streaming', 'Smart Door Locks']
    },
    {
      id: 'industrial-automation',
      number: '02',
      title: 'Industrial Automation',
      category: 'FACTORY SYSTEMS & PANELS',
      accentColor: '#FF9900',
      icon: <Bot size={22} color="#FF9900" />,
      tagline: 'Heavy-Duty Control Panels & Machine Integration',
      description: 'End-to-end industrial automation including custom electrical control panels, VFD motor controllers, PLC programming, automated gates, and sensor safety interlocks.',
      image: '/img/WhatsApp Image 2026-09-19 at 1.05.09 PM.jpeg',
      subItems: ['Gate Automation', 'Smart Irrigation System', 'Custom Control Panels', 'Industrial Training']
    },
    {
      id: 'solar-solution',
      number: '03',
      title: 'Solar Energy Solutions',
      category: 'RENEWABLE POWER & EPC',
      accentColor: '#E2B049',
      icon: <Sun size={22} color="#E2B049" />,
      tagline: 'Turnkey Solar Power & Pump Systems',
      description: 'Grid-tied and hybrid solar PV rooftop installations, high-efficiency BLDC solar agricultural pump sets, outdoor solar street lights, and commercial energy auditing.',
      image: '/img/WhatsApp Image 2026-09-19 at 1.19.32 PM.jpeg',
      subItems: ['1 - 10kW Residential Solar', 'BLDC Pump Motors', 'Solar Outdoor Lights', '10 - 100kW Commercial Solar']
    },
    {
      id: 'skill-development',
      number: '04',
      title: 'Skill Development',
      category: 'ENGINEERING LABS & TRAINING',
      accentColor: '#0284C7',
      icon: <GraduationCap size={22} color="#0284C7" />,
      tagline: 'Certified Hands-On Engineering Academy',
      description: 'Professional practical training programs in drone assembly & piloting, multi-layer PCB circuit design, CAD/CAM 3D mechanical modeling, and AI robotics.',
      image: '/img/WhatsApp Image 2026-09-19 at 1.19.32 PM (1).jpeg',
      subItems: ['DRONE Pilot Training', 'PCB Layout & Fab', 'CAD/CAM Modeling', 'AI & Robotics']
    },
    {
      id: 'robot-services',
      number: '05',
      title: 'Robot Services',
      category: 'AUTONOMOUS SERVICE ROBOTS',
      accentColor: '#8B5CF6',
      icon: <Cpu size={22} color="#8B5CF6" />,
      tagline: 'Next-Gen Autonomous Service & Greeting Robots',
      description: 'Custom special purpose serve robots and interactive greeting robots for corporate showrooms, hospitality venues, hospitals, and educational institutes.',
      image: '/img/WhatsApp Image 2026-09-19 at 1.05.14 PM.jpeg',
      subItems: ['SERVE ROBOT', 'GREETING ROBOT', 'Autonomous Navigation', 'Voice AI Interaction']
    },
    {
      id: 'fabrication',
      number: '06',
      title: 'Precision Fabrication',
      category: 'INDUSTRIAL MANUFACTURING',
      accentColor: '#10B981',
      icon: <Layers size={22} color="#10B981" />,
      tagline: '3D Printing, Laser Cutting & CNC Machining',
      description: 'Rapid prototyping, metal and acrylic laser cutting, DRO lathe machining, heavy machine sheet bending, powder coating, and custom enclosure painting.',
      image: '/img/WhatsApp Image 2026-09-19 at 1.29.34 PM.jpeg',
      subItems: ['3D Printing', 'Metal/Non-Metal Laser Cutting', 'DRO Lathe Machining', 'Powder Coating & Painting']
    }
  ];

  const renderCard = (card: SectorCardItem, uniqueKey: string) => (
    <div
      key={uniqueKey}
      onClick={() => navigate(`/solution/${card.id}`)}
      style={{
        position: 'relative',
        height: '420px',
        width: '410px',
        flexShrink: 0,
        borderRadius: '24px',
        overflow: 'hidden',
        background: '#0F172A',
        boxShadow: '0 12px 35px rgba(15, 23, 42, 0.12)',
        border: `2.5px solid ${card.accentColor}`,
        cursor: 'pointer'
      }}
      className="hover-card-item"
    >
      {/* 1. Full Size Card Background Image */}
      <img 
        src={card.image} 
        alt={card.title} 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.6s ease'
        }}
        className="hover-card-bg-img"
      />

      {/* Default Light Gradient Base Overlay for Clear Image View */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 40%, rgba(15, 23, 42, 0.6) 100%)',
          transition: 'opacity 0.4s ease'
        }}
        className="hover-default-overlay"
      />

      {/* 2. DEFAULT STATE: Bottom Centered Main Title Alone */}
      <div 
        style={{
          position: 'absolute',
          bottom: '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          textAlign: 'center',
          width: 'calc(100% - 32px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease'
        }}
        className="hover-card-centered-title"
      >
        <div 
          style={{
            display: 'inline-block',
            background: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(12px)',
            border: `1.5px solid ${card.accentColor}`,
            padding: '12px 24px',
            borderRadius: '20px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.45)',
            maxWidth: '100%'
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FFFFFF', margin: 0, lineHeight: 1.25 }}>
            {card.title}
          </h3>
        </div>
      </div>

      {/* 3. HOVER OVERLAY (Ultra Crystal Clear Low Opacity 0.45) */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          background: 'rgba(7, 13, 29, 0.55)',
          backdropFilter: 'blur(4px)',
          padding: '24px 26px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          opacity: 0,
          pointerEvents: 'none',
          transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          transform: 'scale(0.98)'
        }}
        className="hover-card-detail-overlay"
      >
        <div>
          {/* Top Category & Title */}
          <div style={{ fontSize: '0.72rem', fontWeight: 900, color: card.accentColor, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
            SECTOR {card.number} • {card.category}
          </div>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 6px', lineHeight: 1.2, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            {card.title}
          </h3>

          {/* Tagline */}
          <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#FF9900', marginBottom: '8px' }}>
            {card.tagline}
          </div>

          {/* Paragraph Description */}
          <p style={{ color: '#F1F5F9', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '12px', fontWeight: 500, textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
            {card.description}
          </p>

          {/* Sub-Item Feature Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
            {card.subItems.map((sub, idx) => (
              <span 
                key={idx}
                style={{
                  background: 'rgba(15, 23, 42, 0.75)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '4px 10px',
                  borderRadius: '14px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#FFFFFF'
                }}
              >
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Action: Read More Button Positioned on Bottom Right */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/solution/${card.id}`);
            }}
            style={{
              background: `linear-gradient(90deg, ${card.accentColor} 0%, #0066FF 100%)`,
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.86rem',
              padding: '9px 22px',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: `0 4px 18px ${card.accentColor}55`,
              transition: 'all 0.25s ease'
            }}
            className="btn-card-readmore"
          >
            <span>Read More</span>
            <ChevronRight size={16} color="#FFFFFF" />
          </button>
        </div>

      </div>

    </div>
  );

  return (
    <section 
      style={{ 
        padding: '90px 0 110px', 
        background: '#FFFFFF', 
        position: 'relative',
        color: '#0F172A',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden'
      }}
    >
      {/* Background Tech Grid Lines Pattern */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.07) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.85,
          pointerEvents: 'none'
        }} 
      />

      {/* Subtle Ambient Radial Glow Orbs */}
      <div style={{ position: 'absolute', top: '0%', left: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0, 102, 255, 0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '0%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255, 153, 0, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      
      {/* Header Container */}
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px' }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: '#EFF6FF', 
              border: '1px solid #BFDBFE', 
              padding: '6px 18px', 
              borderRadius: '30px', 
              fontSize: '0.82rem', 
              fontWeight: 800, 
              color: '#0066FF', 
              textTransform: 'uppercase', 
              letterSpacing: '1px', 
              marginBottom: '16px' 
            }}
          >
            <Sparkles size={15} color="#0066FF" />
            <span>OUR 6 CORE SOLUTION SECTORS</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', fontWeight: 900, color: '#0F172A', marginBottom: '16px', letterSpacing: '-0.8px' }}>
            Explore Solutions <span style={{ color: '#0066FF' }}>By Sector</span>
          </h2>

          <p style={{ color: '#475569', fontSize: '1.08rem', lineHeight: 1.65, margin: 0, fontWeight: 500 }}>
            Hover over any sector card to view detailed specifications, key sub-services, and request instant engineering quotes.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* INFINITE MARQUEE CAROUSEL FORMAT                      */}
      {/* ---------------------------------------------------- */}
      <div 
        className="sector-marquee-wrapper"
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          padding: '10px 0 20px',
          zIndex: 2
        }}
      >
        {/* Soft Edge Gradient Fade Overlays */}
        <div 
          className="marquee-fade-left"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '140px',
            background: 'linear-gradient(90deg, #FFFFFF 25%, rgba(255, 255, 255, 0) 100%)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
        <div 
          className="marquee-fade-right"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '140px',
            background: 'linear-gradient(270deg, #FFFFFF 25%, rgba(255, 255, 255, 0) 100%)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />

        {/* Continuous Marquee Track (4 sets for seamless infinite loop on any resolution) */}
        <div 
          className="sector-marquee-track"
          style={{
            display: 'flex',
            width: 'max-content',
            willChange: 'transform'
          }}
        >
          {[0, 1, 2, 3].map((setIndex) => (
            <div 
              key={`set-${setIndex}`}
              className="sector-marquee-set"
              aria-hidden={setIndex > 0 ? "true" : undefined}
              style={{
                display: 'flex',
                gap: '28px',
                paddingRight: '28px',
                flexShrink: 0
              }}
            >
              {SECTOR_CARDS.map((card) => renderCard(card, `${card.id}-set-${setIndex}`))}
            </div>
          ))}
        </div>
      </div>

      {/* SECTOR READ MORE POPUP MODAL */}
      {activeSubModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(5, 9, 17, 0.88)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setActiveSubModal(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '580px',
              width: '100%',
              background: '#0F172A',
              border: `2px solid ${activeSubModal.accentColor}`,
              borderRadius: '24px',
              padding: '32px',
              color: '#FFFFFF',
              boxShadow: `0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px ${activeSubModal.accentColor}33`,
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {activeSubModal.icon}
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: activeSubModal.accentColor, textTransform: 'uppercase' }}>
                  {activeSubModal.category}
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0, color: '#FFFFFF' }}>
                  {activeSubModal.title}
                </h3>
              </div>
            </div>

            <p style={{ color: '#CBD5E1', fontSize: '0.98rem', lineHeight: 1.65, marginBottom: '20px' }}>
              {activeSubModal.description}
            </p>

            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FF9900', textTransform: 'uppercase', marginBottom: '10px' }}>
              Included Features & Sub-Services:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
              {activeSubModal.subItems.map((sub, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.05)', padding: '10px 14px', borderRadius: '12px', fontSize: '0.88rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color={activeSubModal.accentColor} />
                  <span>{sub}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setActiveSubModal(null)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '30px',
                  background: '#1E293B',
                  border: '1px solid #334155',
                  color: '#94A3B8',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>

              <button
                onClick={() => {
                  const title = activeSubModal.title;
                  setActiveSubModal(null);
                  openQuoteModalWithSolution(title);
                }}
                style={{
                  padding: '10px 26px',
                  borderRadius: '30px',
                  background: `linear-gradient(90deg, ${activeSubModal.accentColor} 0%, #0066FF 100%)`,
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: `0 6px 20px ${activeSubModal.accentColor}44`
                }}
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STYLES FOR MARQUEE & HOVER REVEAL EFFECT */}
      <style>{`
        @keyframes sectorMarqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }

        .sector-marquee-track {
          animation: sectorMarqueeScroll 40s linear infinite;
        }

        .sector-marquee-wrapper:hover .sector-marquee-track {
          animation-play-state: paused;
        }

        .hover-card-item {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-card-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.22) !important;
        }

        .hover-card-item:hover .hover-card-bg-img {
          transform: scale(1.08);
        }

        .hover-card-item:hover .hover-card-centered-title {
          opacity: 0;
          transform: translate(-50%, 15px);
          pointer-events: none;
        }

        .hover-card-item:hover .hover-card-detail-overlay {
          opacity: 1 !important;
          pointer-events: auto !important;
          transform: scale(1) !important;
        }

        .btn-card-readmore:hover {
          filter: brightness(1.15);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .hover-card-item {
            width: 320px !important;
            height: 440px !important;
          }
          .sector-marquee-set {
            gap: 16px !important;
            padding-right: 16px !important;
          }
          .marquee-fade-left, .marquee-fade-right {
            width: 45px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sector-marquee-track {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
};
