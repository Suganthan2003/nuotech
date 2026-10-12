import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/nuoData';
import { 
  Phone, Mail, MapPin, Send, LayoutGrid, Cog, Headphones, 
  ChevronRight, Bot, Sun, CircuitBoard, Zap
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer 
      style={{ 
        position: 'relative',
        background: 'linear-gradient(180deg, #050A15 0%, #070D1D 100%)', 
        borderTop: '1px solid rgba(0, 102, 255, 0.25)', 
        paddingTop: '70px', 
        paddingBottom: '24px',
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      {/* Background Subtle Radial Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '0',
          left: '20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.08) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '0',
          right: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 153, 0, 0.06) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Geometric Diagonal Corner Accents */}
      {/* Bottom Left Corner Orange Polygon Cut */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '180px',
          height: '110px',
          background: 'linear-gradient(135deg, #FF9900 0%, #FF6600 100%)',
          clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
          pointerEvents: 'none',
          opacity: 0.95
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '260px',
          height: '140px',
          background: '#050A15',
          clipPath: 'polygon(0 100%, 0 20%, 100% 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Bottom Right Corner Blue & Orange Polygon Cut */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '220px',
          height: '100px',
          background: 'linear-gradient(225deg, #0066FF 0%, #FF9900 100%)',
          clipPath: 'polygon(100% 100%, 100% 0, 0 100%)',
          pointerEvents: 'none',
          opacity: 0.95
        }}
      />

      {/* Main Container */}
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 3 }}>
        
        {/* 4-Column Main Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.25fr 0.75fr 1fr 1fr', 
            gap: '36px', 
            marginBottom: '56px' 
          }} 
          className="footer-grid"
        >
          
          {/* Col 1: Brand & Logo & Bio & Socials */}
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <img 
                src="/img/log.png" 
                alt="NUO TECH Logo" 
                style={{ 
                  height: '44px', 
                  width: 'auto', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 10px rgba(0, 102, 255, 0.4))'
                }} 
              />
              <div>
                <div style={{ fontSize: '1.45rem', fontWeight: 900, lineHeight: 1 }}>
                  <span style={{ color: '#FFFFFF' }}>NUO </span>
                  <span style={{ color: '#FF9900' }}>TECH</span>
                </div>
                <div style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '2.5px', color: '#38BDF8', textTransform: 'uppercase', marginTop: '3px' }}>
                  FUTURE BEGINS NOW
                </div>
              </div>
            </div>

            {/* Paragraph Bio */}
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.65, marginBottom: '24px', maxWidth: '300px' }}>
              We build intelligent robots and smart solutions for a better tomorrow. From custom machines to solar power and IoT, we turn innovation into reality.
            </p>

            {/* Social Media Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <a 
                href={COMPANY_INFO.socials.linkedin} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '50%', 
                  background: '#0A66C2', 
                  color: '#FFF', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease',
                  boxShadow: '0 4px 12px rgba(10, 102, 194, 0.4)'
                }}
                className="social-badge-btn"
                title="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>

              <a 
                href={COMPANY_INFO.socials.youtube} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '50%', 
                  background: '#FF0000', 
                  color: '#FFF', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease',
                  boxShadow: '0 4px 12px rgba(255, 0, 0, 0.4)'
                }}
                className="social-badge-btn"
                title="YouTube"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              <a 
                href={COMPANY_INFO.socials.facebook} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '50%', 
                  background: '#1877F2', 
                  color: '#FFF', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease',
                  boxShadow: '0 4px 12px rgba(24, 119, 242, 0.4)'
                }}
                className="social-badge-btn"
                title="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a 
                href={COMPANY_INFO.socials.instagram} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(45deg, #F09433 0%, #E6683C 25%, #DC2743 50%, #CC2366 75%, #BC1888 100%)', 
                  color: '#FFF', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease',
                  boxShadow: '0 4px 12px rgba(220, 39, 67, 0.4)'
                }}
                className="social-badge-btn"
                title="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Pages Navigation */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <LayoutGrid size={18} style={{ color: '#38BDF8' }} />
              <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Pages</h4>
            </div>
            {/* Blue Underline Accent */}
            <div style={{ width: '48px', height: '3px', background: 'linear-gradient(90deg, #0066FF, #FF9900)', borderRadius: '2px', marginBottom: '20px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Solutions', path: '/product' },
                { label: 'Careers', path: '/career' },
                { label: 'Contact Us', path: '/contact' }
              ].map((linkItem, i) => (
                <Link 
                  key={i} 
                  to={linkItem.path} 
                  style={{ 
                    color: '#94A3B8', 
                    textDecoration: 'none', 
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'color 0.2s ease, transform 0.2s ease'
                  }}
                  className="footer-nav-link"
                >
                  <ChevronRight size={14} style={{ color: '#0066FF' }} />
                  <span>{linkItem.label}</span>
                </Link>
              ))}
            </div>
          </div>
          

          {/* Col 3: Core Sectors */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Cog size={18} style={{ color: '#38BDF8' }} />
              <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Core Sectors</h4>
            </div>
            {/* Blue Underline Accent */}
            <div style={{ width: '48px', height: '3px', background: 'linear-gradient(90deg, #0066FF, #FF9900)', borderRadius: '2px', marginBottom: '20px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', fontWeight: 600 }}>
              {[
                { title: 'Smart Living Solutions', path: '/solution/smart-living', icon: <Zap size={15} style={{ color: '#38BDF8' }} /> },
                { title: 'Industrial Automation', path: '/solution/industrial-automation', icon: <Bot size={15} style={{ color: '#38BDF8' }} /> },
                { title: 'Solar Solution', path: '/solution/solar-solution', icon: <Sun size={15} style={{ color: '#FF9900' }} /> },
                { title: 'Skill Development', path: '/solution/skill-development', icon: <CircuitBoard size={15} style={{ color: '#38BDF8' }} /> },
                { title: 'Robot Services', path: '/solution/robot-services', icon: <Bot size={15} style={{ color: '#FF9900' }} /> },
                { title: 'Fabrication', path: '/solution/fabrication', icon: <Cog size={15} style={{ color: '#38BDF8' }} /> }
              ].map((sectorItem, idx) => (
                <Link
                  key={idx}
                  to={sectorItem.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#94A3B8',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease, transform 0.2s ease'
                  }}
                  className="footer-nav-link"
                >
                  {sectorItem.icon}
                  <span>{sectorItem.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Direct Connect */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Headphones size={18} style={{ color: '#38BDF8' }} />
              <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Direct Connect</h4>
            </div>
            {/* Blue Underline Accent */}
            <div style={{ width: '48px', height: '3px', background: 'linear-gradient(90deg, #0066FF, #FF9900)', borderRadius: '2px', marginBottom: '20px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Phone Pill */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  background: 'rgba(15, 23, 42, 0.75)', 
                  border: '1px solid rgba(0, 102, 255, 0.25)', 
                  padding: '8px 16px', 
                  borderRadius: '25px' 
                }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0066FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={14} color="#FFF" />
                </div>
                <a href={`tel:${COMPANY_INFO.phone}`} style={{ color: '#E2E8F0', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 700 }}>
                  +91 {COMPANY_INFO.phone}
                </a>
              </div>

              {/* Email Pill */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  background: 'rgba(15, 23, 42, 0.75)', 
                  border: '1px solid rgba(0, 102, 255, 0.25)', 
                  padding: '8px 16px', 
                  borderRadius: '25px' 
                }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0066FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={14} color="#FFF" />
                </div>
                <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: '#E2E8F0', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 700 }}>
                  {COMPANY_INFO.email}
                </a>
              </div>

              {/* Location Pill */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  background: 'rgba(15, 23, 42, 0.75)', 
                  border: '1px solid rgba(0, 102, 255, 0.25)', 
                  padding: '8px 16px', 
                  borderRadius: '25px' 
                }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0066FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={14} color="#FFF" />
                </div>
                <span style={{ color: '#E2E8F0', fontSize: '0.88rem', fontWeight: 700 }}>
                  Puliyur, Karur, TN
                </span>
              </div>

              {/* Contact Us Gradient Pill Button */}
              <Link 
                to="/contact"
                style={{
                  marginTop: '6px',
                  background: 'linear-gradient(135deg, #0066FF 0%, #FF9900 100%)',
                  color: '#FFFFFF',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 20px rgba(0, 102, 255, 0.35)',
                  transition: 'transform 0.25s ease, boxShadow 0.25s ease'
                }}
                className="btn-footer-contact"
              >
                <Send size={15} />
                <span>Contact Us</span>
                <ChevronRight size={16} />
              </Link>

            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div 
          style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.82rem',
            color: '#94A3B8',
            flexWrap: 'wrap',
            gap: '14px',
            position: 'relative',
            zIndex: 4
          }} 
          className="footer-bottom"
        >
          <div>
            © {new Date().getFullYear()}{' '}
            <span style={{ color: '#0066FF', fontWeight: 800 }}>NUO </span>
            <span style={{ color: '#FF9900', fontWeight: 800 }}>TECH</span>. All Rights Reserved. Designed & Developed by{' '}
            <span style={{ color: '#FF9900', fontWeight: 800 }}>NUO TECH</span>.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontWeight: 700, color: '#94A3B8' }}>
            <span style={{ opacity: 0.3, color: '#FFFFFF', fontWeight: 300 }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Innovate</span>
              <span>•</span>
              <span>Automate</span>
              <span>•</span>
              <span>Sustain</span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 960px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
        }
        @media (max-width: 550px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-bottom { flex-direction: column; text-align: center; justify-content: center; }
        }
        .social-badge-btn:hover {
          transform: translateY(-3px) scale(1.05);
        }
        .footer-nav-link:hover {
          color: #38BDF8 !important;
          transform: translateX(4px);
        }
        .btn-footer-contact:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(255, 153, 0, 0.4) !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;

