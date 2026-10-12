import React from 'react';
import { Settings, Sun, ShieldCheck, Zap, ArrowRight, MessageSquare, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AboutUsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section 
      id="about" 
      style={{ 
        padding: '90px 0 100px', 
        position: 'relative', 
        overflow: 'hidden', 
        background: '#FFFFFF',
        color: '#0F172A',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Top Left 3D Geometric Ribbon Background Accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '180px',
        height: '180px',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H180L0 180V0Z" fill="url(#gradient-ribbon-tl)" />
          <defs>
            <linearGradient id="gradient-ribbon-tl" x1="0" y1="0" x2="180" y2="180" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="0.5" stopColor="#0284C7" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom Right 3D Geometric Accent */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '200px',
        height: '200px',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <img 
          src="/img/log.png" 
          alt="3D Cube Ribbon" 
          style={{ 
            width: '180px', 
            height: 'auto', 
            opacity: 0.85,
            filter: 'drop-shadow(0 10px 20px rgba(2, 132, 199, 0.25))'
          }} 
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        
        {/* Top Centered Brand Logo & Headline Block */}
        <div style={{ textAlign: 'center', maxWidth: '920px', margin: '0 auto 64px' }}>
          
          {/* Logo Brand Header - Horizontal Layout matching Image 1 */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '16px', 
            marginBottom: '28px',
            textAlign: 'left'
          }}>
            <img 
              src="/img/log.png" 
              alt="NUO TECH Logo" 
              style={{ 
                height: '64px', 
                width: 'auto', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 12px rgba(2, 132, 199, 0.35))' 
              }} 
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '2.1rem', fontWeight: 800, lineHeight: 1, letterSpacing: '0.5px' }}>
                <span style={{ color: '#0F172A' }}>NUO</span>
                <span style={{ color: '#E2B049' }}>TECH</span>
              </div>
              <span style={{ 
                fontSize: '0.85rem', 
                fontWeight: 700, 
                color: '#0284C7', 
                letterSpacing: '2.5px', 
                textTransform: 'uppercase', 
                marginTop: '6px' 
              }}>
                FUTURE BEGINS NOW
              </span>
            </div>
          </div>

          {/* Main Section Headline */}
          <h2 style={{ fontSize: 'clamp(2.1rem, 4vw, 3.3rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.18, marginBottom: '20px', letterSpacing: '-0.5px' }}>
            Pioneering Industrial <span style={{ color: '#0284C7' }}>Automation,</span> <span style={{ color: '#E2B049' }}>Solar Energy</span> & Custom Tech.
          </h2>

          {/* Subtitle Description */}
          <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.65, maxWidth: '820px', margin: '0 auto' }}>
            NUO TECH is a forward-thinking engineering and technology company headquartered in Karur, Tamil Nadu, India. We specialize in building the right solutions for a smarter, more sustainable and automated tomorrow.
          </p>

        </div>

        {/* 2-Column Showcase Layout: Visual Card (Left) + Executive Copy & Features (Right) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="about-showcase-grid">
          
          {/* Left Column: Framed Image Box with Corner Ribbon Accents & Overlay Badges */}
          <div style={{ position: 'relative' }}>
            
            {/* Top Left Ribbon Frame Tag */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              background: '#0284C7',
              width: '50px',
              height: '35px',
              borderRadius: '8px 0 16px 0',
              zIndex: 3,
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.4)'
            }} />

            {/* Bottom Right Amber Frame Accent */}
            <div style={{
              position: 'absolute',
              bottom: '-12px',
              right: '-12px',
              width: '80%',
              height: '80%',
              borderRight: '5px solid #E2B049',
              borderBottom: '5px solid #E2B049',
              borderRadius: '0 0 24px 0',
              pointerEvents: 'none',
              zIndex: 1
            }} />

            {/* Main Showcase Image Container */}
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(15, 23, 42, 0.15)',
              border: '1px solid #E2E8F0',
              zIndex: 2,
              background: '#0B132B'
            }}>
              <img 
                src="/img/s1.jpg" 
                alt="Solar Energy & Industrial Automation" 
                style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute('src', '/img/banner.jpeg');
                }}
              />

              {/* Bottom Image Overlay Badges */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
                background: 'linear-gradient(to top, rgba(10, 16, 29, 0.95) 0%, rgba(10, 16, 29, 0.4) 60%, transparent 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                {/* Dark Left Badge */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#E2B049', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                    <Sun size={14} />
                    SOLAR ENERGY SOLUTIONS
                  </div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                    End-to-End Design, Project
                  </h4>
                </div>

                {/* White Right Pill Badge */}
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '10px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
                  border: '1px solid #E2E8F0'
                }}>
                  <div style={{ background: '#0284C7', color: '#FFFFFF', padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A' }}>100% In-House</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Design • Installation • Maintenance</div>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Right Column: Title, Description, 2x2 Feature Grid & Pill Action Buttons */}
          <div>
            
            <h3 style={{ fontSize: ' clamp(1.6rem, 2.5vw, 2.1rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.22, marginBottom: '18px' }}>
              Transforming Real-World Challenges Into <span style={{ color: '#0284C7' }}>Intelligent Machines</span>
            </h3>

            <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '28px' }}>
              At NUO TECH, we turn complex industrial and energy challenges into smart, reliable and efficient systems. From solar power solutions to industrial automation, we design, develop and deploy custom technology that helps businesses grow sustainably with precision, performance and innovation.
            </p>

            {/* 2x2 Features Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '18px',
              marginBottom: '34px'
            }} className="about-features-2x2">
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#EFF6FF', color: '#0284C7', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Settings size={20} />
                </div>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1E293B' }}>
                  Custom Machine Reengineering
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#FEF3C7', color: '#D97706', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sun size={20} />
                </div>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1E293B' }}>
                  Solar Water Heaters & EPC
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#FEF3C7', color: '#D97706', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={20} />
                </div>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1E293B' }}>
                  Custom BMS | Inputs & Frameworks
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#EFF6FF', color: '#0284C7', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={20} />
                </div>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1E293B' }}>
                  24/7 On-Process & IoT Telemetry
                </span>
              </div>

            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button 
                onClick={() => navigate('/about')} 
                style={{ 
                  background: '#0284C7', 
                  color: '#FFFFFF', 
                  padding: '13px 28px', 
                  borderRadius: '9999px', 
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px rgba(2, 132, 199, 0.35)',
                  transition: 'all 0.25s ease'
                }}
                className="about-btn-primary"
              >
                <span>Read Full Company Profile</span>
                <ArrowRight size={16} />
              </button>

              <button 
                onClick={() => navigate('/contact')} 
                style={{ 
                  background: '#FFFFFF', 
                  color: '#0284C7', 
                  padding: '12px 26px', 
                  borderRadius: '9999px', 
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  border: '1.5px solid #0284C7',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.25s ease'
                }}
                className="about-btn-secondary"
              >
                <MessageSquare size={16} />
                <span>Talk to Engineering Lead</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .about-btn-primary:hover {
          background: #0369A1 !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(2, 132, 199, 0.45) !important;
        }
        .about-btn-secondary:hover {
          background: #F0F9FF !important;
          transform: translateY(-2px);
        }
        @media (max-width: 960px) {
          .about-showcase-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-features-2x2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default AboutUsSection;
