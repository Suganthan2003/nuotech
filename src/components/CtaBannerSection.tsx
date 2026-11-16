import React from 'react';
import { ArrowRight, Cog, Bot, Cpu, Lightbulb, Users } from 'lucide-react';

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
        padding: '64px 0 56px', 
        background: 'linear-gradient(135deg, #F8FAFC 0%, #F0F7FF 50%, #F3FAF6 100%)', 
        overflow: 'hidden',
        color: '#0F172A',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0'
      }}
    >
      {/* Background Tech Dot Matrix on Top Right (Direct Match to Mockup) */}
      <div 
        style={{
          position: 'absolute',
          top: '20px',
          right: '30px',
          width: '260px',
          height: '260px',
          backgroundImage: 'radial-gradient(rgba(0, 82, 204, 0.15) 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
          opacity: 0.85,
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          width: '220px',
          height: '220px',
          backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.15) 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
          opacity: 0.7,
          pointerEvents: 'none'
        }}
      />

      {/* Subtle Radial Atmosphere Glows */}
      <div 
        style={{
          position: 'absolute',
          top: '-60px',
          left: '25%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '-60px',
          right: '15%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Container */}
      <div className="container cta-banner-container" style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 3 }}>
        
        {/* Top Brand Logo Banner (Direct Match to Mockup) */}
        <div className="cta-banner-logo-wrap" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
          <img 
            src="/img/logos-transparent.png" 
            alt="SMARToi Logo" 
            className="cta-banner-logo-img"
            style={{ 
              height: '68px', 
              width: 'auto', 
              objectFit: 'contain'
            }} 
          />
        </div>

        {/* 2-Column Grid Layout */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.25fr 0.85fr', 
            gap: '48px', 
            alignItems: 'center' 
          }}
          className="cta-banner-grid"
        >
          {/* Left Column: Pill, Headline, Description, Buttons, Highlights */}
          <div className="cta-banner-left">
            

            {/* Main Heading (Direct Match to Mockup with Green Swoosh) */}
            <h2 
              className="cta-banner-title"
              style={{ 
                fontSize: 'clamp(2rem, 3.6vw, 3.1rem)', 
                fontWeight: 900, 
                color: '#0F172A', 
                lineHeight: 1.15, 
                marginBottom: '18px',
                letterSpacing: '-0.5px'
              }}
            >
              Transform Your Concept Into An<br className="cta-banner-br" />
              <span style={{ color: '#0066FF' }}>Automated</span>{' '}
              <span style={{ color: '#10B981', position: 'relative', display: 'inline-block' }}>
                Solution
                {/* Curved Green Arc Underline */}
                <svg 
                  style={{ 
                    position: 'absolute', 
                    bottom: '-8px', 
                    left: 0, 
                    width: '100%', 
                    height: '10px' 
                  }} 
                  viewBox="0 0 100 10" 
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M2,6 Q50,11 98,3" 
                    stroke="#10B981" 
                    strokeWidth="3.5" 
                    fill="none" 
                    strokeLinecap="round" 
                  />
                </svg>
              </span>
            </h2>

            {/* Description Subtitle */}
            <p 
              className="cta-banner-desc"
              style={{ 
                color: '#475569', 
                fontSize: '1.04rem', 
                lineHeight: 1.65, 
                marginBottom: '28px',
                maxWidth: '560px'
              }}
            >
              Work closely with SMARToi's engineering team to design, develop and deploy innovative robotics and automation solutions for a smarter tomorrow.
            </p>

            {/* CTA Buttons */}
            <div className="cta-banner-actions" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button 
                onClick={openQuoteModal}
                style={{ 
                  background: 'linear-gradient(90deg, #0052CC 0%, #10B981 100%)',
                  color: '#FFFFFF',
                  padding: '13px 28px',
                  borderRadius: '30px',
                  border: 'none',
                  fontSize: '0.94rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 22px rgba(0, 82, 204, 0.32)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                className="btn-primary-gradient"
              >
                <ArrowRight size={16} />
                <span>Get Free Technical Estimate</span>
              </button>

              <button 
                onClick={onContactClick}
                style={{ 
                  background: '#FFFFFF',
                  color: '#0052CC',
                  border: '1.5px solid #0052CC',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  fontSize: '0.94rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 82, 204, 0.08)',
                  transition: 'all 0.2s ease'
                }}
                className="btn-outline-blue"
              >
                <Users size={16} style={{ color: '#0052CC' }} />
                <span>Contact Engineering Team</span>
                <ArrowRight size={15} style={{ color: '#0052CC' }} />
              </button>
            </div>

            {/* 4 Bottom Highlight Features Strip (Direct Match to Mockup) */}
            <div 
              className="cta-banner-highlights"
              style={{ 
                display: 'flex', 
                gap: '24px', 
                alignItems: 'center', 
                marginTop: '36px', 
                paddingTop: '22px', 
                borderTop: '1px solid #E2E8F0', 
                flexWrap: 'wrap' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cog size={18} style={{ color: '#0052CC' }} />
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#334155' }}>Custom Automation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bot size={18} style={{ color: '#0052CC' }} />
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#334155' }}>Robotics Solutions</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={18} style={{ color: '#0052CC' }} />
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#334155' }}>IoT & Smart Systems</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lightbulb size={18} style={{ color: '#0052CC' }} />
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#334155' }}>Innovative Ideas</span>
              </div>
            </div>

          </div>

          {/* Right Column: Modern Tech Curved Frame with Orbiting Rings (Direct Match to Mockup) */}
          <div className="cta-banner-right" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '380px' }}>
            
            {/* Orbiting Tech Rings */}
            <div 
              style={{
                position: 'absolute',
                width: '115%',
                height: '115%',
                borderRadius: '50%',
                border: '1.5px solid rgba(0, 163, 255, 0.35)',
                pointerEvents: 'none',
                transform: 'rotate(-15deg)'
              }}
            />
            <div 
              style={{
                position: 'absolute',
                width: '105%',
                height: '105%',
                borderRadius: '50%',
                border: '1px dashed rgba(16, 185, 129, 0.3)',
                pointerEvents: 'none',
                transform: 'rotate(25deg)'
              }}
            />

            {/* Orbiting Glowing Nodes */}
            <div 
              style={{
                position: 'absolute',
                top: '10%',
                right: '-4%',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#00D2FF',
                boxShadow: '0 0 12px #00D2FF',
                zIndex: 5
              }}
            />
            <div 
              style={{
                position: 'absolute',
                bottom: '15%',
                left: '-3%',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#10B981',
                boxShadow: '0 0 10px #10B981',
                zIndex: 5
              }}
            />

            {/* Backing Royal Blue Rounded Squircle Frame */}
            <div 
              style={{
                position: 'absolute',
                width: '90%',
                maxWidth: '340px',
                aspectRatio: '1 / 1.05',
                background: 'linear-gradient(135deg, #0052CC 0%, #0066FF 100%)',
                borderRadius: '34px',
                transform: 'rotate(-4deg)',
                boxShadow: '0 20px 50px rgba(0, 82, 204, 0.28)',
                zIndex: 1
              }}
            />

            {/* Backing Emerald Green Rounded Squircle Frame */}
            <div 
              style={{
                position: 'absolute',
                width: '90%',
                maxWidth: '340px',
                aspectRatio: '1 / 1.05',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                borderRadius: '34px',
                transform: 'rotate(4deg)',
                opacity: 0.85,
                zIndex: 2
              }}
            />

            {/* Foreground Main Photo Showcase Card */}
            <div 
              style={{
                position: 'relative',
                width: '88%',
                maxWidth: '330px',
                aspectRatio: '1 / 1.02',
                borderRadius: '26px',
                overflow: 'hidden',
                background: '#FFFFFF',
                border: '4px solid #FFFFFF',
                boxShadow: '0 20px 40px rgba(15, 23, 42, 0.16)',
                zIndex: 4
              }}
            >
              <img 
                src="/img/b.png" 
                alt="Automated Robotics Solution"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .cta-banner-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .cta-banner-left {
            text-align: left;
          }
          .cta-banner-desc {
            max-width: 100% !important;
          }
          .cta-banner-right {
            min-height: 340px !important;
            margin-top: 10px;
          }
        }

        @media (max-width: 640px) {
          .cta-banner-container {
            padding: 0 16px !important;
          }
          .cta-banner-logo-img {
            height: 48px !important;
          }
          .cta-banner-title {
            font-size: 1.65rem !important;
            line-height: 1.25 !important;
            margin-bottom: 14px !important;
          }
          .cta-banner-br {
            display: none !important;
          }
          .cta-banner-desc {
            font-size: 0.88rem !important;
            line-height: 1.55 !important;
            margin-bottom: 22px !important;
          }
          .cta-banner-actions {
            flex-direction: column !important;
            width: 100% !important;
            gap: 12px !important;
          }
          .cta-banner-actions button {
            width: 100% !important;
            justify-content: center !important;
            padding: 12px 18px !important;
            font-size: 0.88rem !important;
          }
          .cta-banner-highlights {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 14px 12px !important;
            margin-top: 26px !important;
            padding-top: 18px !important;
          }
          .cta-banner-highlights span {
            font-size: 0.8rem !important;
          }
          .cta-banner-right {
            min-height: 290px !important;
          }
        }

        .btn-primary-gradient:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 82, 204, 0.42) !important;
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
