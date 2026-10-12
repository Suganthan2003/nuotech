import React from 'react';
import { Zap, ArrowRight, Cloud, Cog, Cpu, Wifi } from 'lucide-react';

interface CtaBannerSectionProps {
  openQuoteModal: () => void;
  onContactClick: () => void;
}

export const CtaBannerSection: React.FC<CtaBannerSectionProps> = ({
  openQuoteModal,
  onContactClick
}) => {
  return (
    <section 
      style={{ 
        position: 'relative', 
        padding: '40px 0 45px', 
        background: '#FFFFFF', 
        overflow: 'hidden',
        color: '#0F172A'
      }}
    >
      {/* Background Geometric Polygonal Glow Accents */}
      <div 
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '500px',
          height: '500px',
          background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.12), rgba(255, 153, 0, 0.12))',
          filter: 'blur(80px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '-100px',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.1) 0%, rgba(255, 153, 0, 0.05) 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />

      {/* Decorative Geometric Polygonal Shapes in Corners */}
      <div 
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '320px',
          height: '320px',
          background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.06) 0%, rgba(255, 153, 0, 0.12) 100%)',
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          width: '380px',
          height: '240px',
          background: 'linear-gradient(225deg, rgba(0, 102, 255, 0.15) 0%, rgba(0, 102, 255, 0.02) 100%)',
          clipPath: 'polygon(100% 100%, 0 100%, 100% 0)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Container */}
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 3 }}>
        
        {/* Top Brand Logo Banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
          <img 
            src="/img/log.png" 
            alt="NUO TECH Logo" 
            style={{ 
              height: '42px', 
              width: 'auto', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 8px rgba(0, 102, 255, 0.4))'
            }} 
          />
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 900, lineHeight: 1 }}>
              <span style={{ color: '#0066FF' }}>NUO </span>
              <span style={{ color: '#FF9900' }}>TECH</span>
            </div>
            <div style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '2.5px', color: '#0284C7', textTransform: 'uppercase', marginTop: '3px' }}>
              FUTURE BEGINS NOW
            </div>
          </div>
        </div>

        {/* 2-Column Grid Layout */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.2fr 0.8fr', 
            gap: '36px', 
            alignItems: 'center' 
          }}
          className="cta-grid-layout"
        >
          {/* Left Column: Headline & Action Buttons */}
          <div>
            {/* Pill Badge */}
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: '#E0F2FE', 
                border: '1.5px solid #7DD3FC', 
                padding: '5px 16px', 
                borderRadius: '30px', 
                marginBottom: '14px',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.12)'
              }}
            >
              <Zap size={14} style={{ color: '#0066FF', fill: '#0066FF' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 900, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0284C7' }}>
                READY TO INNOVATE & AUTOMATE?
              </span>
            </div>

            {/* Main Heading */}
            <h2 
              style={{ 
                fontSize: 'clamp(1.9rem, 3.2vw, 2.75rem)', 
                fontWeight: 900, 
                color: '#0F172A', 
                lineHeight: 1.15, 
                marginBottom: '14px',
                letterSpacing: '-0.5px'
              }}
            >
              Transform Your Concept Into An{' '}
              <span style={{ color: '#0066FF' }}>Automated</span>{' '}
              <span style={{ color: '#FF9900' }}>Solution</span>
            </h2>

            {/* Description Subtitle */}
            <p 
              style={{ 
                color: '#475569', 
                fontSize: '1.02rem', 
                lineHeight: 1.6, 
                marginBottom: '24px',
                maxWidth: '560px'
              }}
            >
              Work directly with NUO TECH's engineering team in Karur. From custom machines and solar power to IoT and PCB development.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button 
                onClick={openQuoteModal}
                style={{ 
                  background: 'linear-gradient(135deg, #0072FF 0%, #0052D4 100%)',
                  color: '#FFFFFF',
                  padding: '14px 28px',
                  borderRadius: '35px',
                  border: 'none',
                  fontSize: '0.96rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(0, 114, 255, 0.35)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
                className="btn-glow-blue"
              >
                <Zap size={16} fill="#FFF" />
                <span>Get Free Technical Estimate</span>
                <ArrowRight size={16} />
              </button>

              <button 
                onClick={onContactClick}
                style={{ 
                  background: '#FFFFFF',
                  color: '#004080',
                  border: '2px solid #0066FF',
                  padding: '13px 26px',
                  borderRadius: '35px',
                  fontSize: '0.96rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0, 102, 255, 0.08)',
                  transition: 'all 0.25s ease'
                }}
                className="btn-outline-blue"
              >
                <span>Contact Engineering Team</span>
                <ArrowRight size={16} style={{ color: '#0066FF' }} />
              </button>
            </div>
          </div>

          {/* Right Column: Compact Hexagon Frame */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            
            {/* Outer Geometric Hexagonal Backdrop */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '340px',
                aspectRatio: '1 / 1.05',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Backing Orange Polygon Accent */}
              <div 
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '-12px',
                  width: '100%',
                  height: '100%',
                  background: '#FF9900',
                  clipPath: 'polygon(30% 0%, 100% 0%, 100% 70%, 70% 100%, 0% 100%, 0% 30%)',
                  borderRadius: '24px',
                  zIndex: 1
                }}
              />

              {/* Backing Blue Polygon Accent */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '-12px',
                  left: '-12px',
                  width: '100%',
                  height: '100%',
                  background: '#0066FF',
                  clipPath: 'polygon(0% 0%, 70% 0%, 100% 30%, 100% 100%, 30% 100%, 0% 70%)',
                  borderRadius: '24px',
                  zIndex: 2
                }}
              />

              {/* Inner Hexagonal Image Container */}
              <div 
                style={{
                  position: 'relative',
                  width: '94%',
                  height: '94%',
                  background: '#0F172A',
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  overflow: 'hidden',
                  zIndex: 3,
                  boxShadow: '0 15px 40px rgba(0, 102, 255, 0.25)'
                }}
              >
                <img 
                  src="/img/WhatsApp Image 2026-09-19 at 1.05.09 PM.jpeg" 
                  alt="Automated Robotics Solution"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                {/* Tech Blue Overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.3) 0%, rgba(15, 23, 42, 0.5) 100%)',
                    pointerEvents: 'none'
                  }}
                />
              </div>

              {/* Floating Blue Hexagon Badges */}
              {/* Badge 1: Cloud */}
              <div 
                style={{
                  position: 'absolute',
                  top: '12%',
                  right: '4%',
                  zIndex: 5,
                  background: '#0066FF',
                  width: '38px',
                  height: '44px',
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 16px rgba(0, 102, 255, 0.5)'
                }}
              >
                <Cloud size={16} color="#FFFFFF" />
              </div>

              {/* Badge 2: Gear */}
              <div 
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '6%',
                  zIndex: 5,
                  background: '#0066FF',
                  width: '38px',
                  height: '44px',
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 16px rgba(0, 102, 255, 0.5)'
                }}
              >
                <Cog size={16} color="#FFFFFF" />
              </div>

              {/* Badge 3: Chip */}
              <div 
                style={{
                  position: 'absolute',
                  top: '48%',
                  right: '-2%',
                  zIndex: 5,
                  background: '#0066FF',
                  width: '38px',
                  height: '44px',
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 16px rgba(0, 102, 255, 0.5)'
                }}
              >
                <Cpu size={16} color="#FFFFFF" />
              </div>

              {/* Badge 4: Wifi */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '18%',
                  left: '2%',
                  zIndex: 5,
                  background: '#0066FF',
                  width: '38px',
                  height: '44px',
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 16px rgba(0, 102, 255, 0.5)'
                }}
              >
                <Wifi size={16} color="#FFFFFF" />
              </div>

            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 960px) {
          .cta-grid-layout {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .cta-grid-layout p {
            margin-left: auto;
            margin-right: auto;
          }
          .cta-grid-layout div {
            justify-content: center;
          }
        }
        .btn-glow-blue:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(0, 114, 255, 0.45) !important;
        }
        .btn-outline-blue:hover {
          background: #F0F7FF !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};

export default CtaBannerSection;
