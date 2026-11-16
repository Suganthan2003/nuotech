import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '@/data/nuoData';
import { 
  Phone, Mail, MapPin, LayoutGrid, Settings, Headphones, Clock,
  Bot, Tractor, GraduationCap, Factory, ShieldCheck, Cloud
} from 'lucide-react';

export const Footer: React.FC = () => {

  return (
    <footer 
      style={{ 
        position: 'relative',
        background: 'linear-gradient(180deg, #010A1A 0%, #031433 45%, #010816 100%)', 
        borderTop: '1px solid rgba(0, 163, 255, 0.25)', 
        paddingTop: '64px', 
        paddingBottom: '24px',
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambient Cyber Glows (matching reference mockup) */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '240px',
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 163, 255, 0.15) 0%, transparent 100%)',
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: '-60px',
          left: '-80px',
          width: '380px',
          height: '260px',
          background: 'radial-gradient(circle, rgba(0, 82, 204, 0.28) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-60px',
          width: '360px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(0, 163, 255, 0.22) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0, 82, 204, 0.15) 0%, transparent 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Container */}
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 3 }}>
        
        {/* 4-Column Main Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.25fr 0.75fr 1fr 1.15fr', 
            gap: '36px', 
            marginBottom: '32px' 
          }} 
          className="footer-grid"
        >
          
          {/* Col 1: Logo Alone & Bio & Socials (Robot & duplicate text removed) */}
          <div className="footer-brand-col">
            {/* Logo image alone in clean screen size */}
            <div style={{ marginBottom: '14px' }}>
              <img 
                src="/img/logos-transparent.png" 
                alt="SMARToi Logo" 
                className="footer-logo-img"
              />
            </div>

            {/* Proven Execution Roadmap Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '8px 0 12px' }}>
              <div style={{ height: '1px', width: '18px', background: 'rgba(56, 189, 248, 0.5)' }} />
              <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '2px', color: '#94A3B8', textTransform: 'uppercase' }}>
                PROVEN EXECUTION ROADMAP
              </span>
              <div style={{ height: '1px', width: '18px', background: 'rgba(56, 189, 248, 0.5)' }} />
            </div>

            {/* Bio */}
            <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.65, marginBottom: '20px', maxWidth: '300px' }}>
              We build intelligent robotics and automation solutions for a smarter tomorrow.
            </p>

            {/* 4 Social Media Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <a 
                href={COMPANY_INFO.socials.linkedin} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  background: '#0A66C2', 
                  color: '#FFF', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 4px 12px rgba(10, 102, 194, 0.4)'
                }}
                className="social-badge-btn"
                title="LinkedIn"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>

              <a 
                href={COMPANY_INFO.socials.youtube} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  background: '#FF0000', 
                  color: '#FFF', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 4px 12px rgba(255, 0, 0, 0.4)'
                }}
                className="social-badge-btn"
                title="YouTube"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              <a 
                href={COMPANY_INFO.socials.facebook} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  background: '#1877F2', 
                  color: '#FFF', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 4px 12px rgba(24, 119, 242, 0.4)'
                }}
                className="social-badge-btn"
                title="Facebook"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a 
                href={COMPANY_INFO.socials.instagram} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(45deg, #F09433 0%, #E6683C 25%, #DC2743 50%, #CC2366 75%, #BC1888 100%)', 
                  color: '#FFF', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 4px 12px rgba(220, 39, 67, 0.4)'
                }}
                className="social-badge-btn"
                title="Instagram"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <LayoutGrid size={18} style={{ color: '#00D2FF' }} />
              <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Quick Links</h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Products', path: '/product' },
                { label: 'Rentals', path: '/product' },
                { label: 'Education', path: '/solution/skill-development' },
                { label: 'Career', path: '/career' },
                { label: 'Contact Us', path: '/contact' }
              ].map((linkItem, i) => (
                <Link 
                  key={i} 
                  to={linkItem.path} 
                  style={{ 
                    color: '#94A3B8', 
                    textDecoration: 'none', 
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'color 0.2s ease, transform 0.2s ease'
                  }}
                  className="footer-nav-link"
                >
                  <span style={{ color: '#00D2FF', fontWeight: 800 }}>&gt;</span>
                  <span>{linkItem.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Our Solutions */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Settings size={18} style={{ color: '#00D2FF' }} />
              <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Our Solutions</h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { title: 'Smart Robots', path: '/solution/robot-services', icon: <Bot size={16} /> },
                { title: 'Agri Robotics', path: '/solution/industrial-automation', icon: <Tractor size={16} /> },
                { title: 'Education', path: '/solution/skill-development', icon: <GraduationCap size={16} /> },
                { title: 'Industrial', path: '/solution/industrial-automation', icon: <Factory size={16} /> },
                { title: 'Surveillance', path: '/solution/smart-living', icon: <ShieldCheck size={16} /> },
                { title: 'Cloud Robotics', path: '/solution/robot-services', icon: <Cloud size={16} /> },
                { title: 'Support', path: '/contact', icon: <Headphones size={16} /> }
              ].map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#94A3B8',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    transition: 'color 0.2s ease, transform 0.2s ease'
                  }}
                  className="footer-nav-link"
                >
                  <div style={{ color: '#00D2FF', display: 'flex', alignItems: 'center' }}>
                    {item.icon}
                  </div>
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Get In Touch */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Mail size={18} style={{ color: '#00D2FF' }} />
              <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Get In Touch</h4>
            </div>

            {/* Contact details with perfect vertical alignment & balanced height */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} style={{ color: '#00D2FF', flexShrink: 0 }} />
                <a href={`tel:${COMPANY_INFO.phone}`} style={{ color: '#E2E8F0', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                  +91 {COMPANY_INFO.phone}
                </a>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} style={{ color: '#00D2FF', flexShrink: 0 }} />
                <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: '#E2E8F0', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                  {COMPANY_INFO.email}
                </a>
              </div>

              {/* Address with icon aligned to the top line */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} style={{ color: '#00D2FF', flexShrink: 0, marginTop: '3px' }} />
                <div style={{ color: '#E2E8F0', fontSize: '0.88rem', fontWeight: 500, lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 700, color: '#FFFFFF', display: 'block' }}>SMARToi, South 6,</span>
                  <span>Seerangai Thottam, Puliyur,</span><br />
                  <span>Karur, Tamil Nadu, 639114</span>
                </div>
              </div>

              {/* Working Hours */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Clock size={16} style={{ color: '#00D2FF', flexShrink: 0, marginTop: '3px' }} />
                <div style={{ color: '#E2E8F0', fontSize: '0.88rem', fontWeight: 500, lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 700, color: '#FFFFFF', display: 'block' }}>Working Hours</span>
                  <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div 
          style={{
            paddingTop: '20px',
            borderTop: '1px solid rgba(0, 163, 255, 0.2)',
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
          {/* Legal Links & Diagonal Logo Slash Bars (Comes FIRST on mobile) */}
          <div className="footer-legal-links" style={{ display: 'flex', alignItems: 'center', gap: '18px', fontWeight: 600 }}>
            <Link to="/about" style={{ color: '#94A3B8', textDecoration: 'none' }} className="footer-bottom-link">
              Privacy Policy
            </Link>
            <span style={{ opacity: 0.3, color: '#FFFFFF' }}>|</span>
            <Link to="/about" style={{ color: '#94A3B8', textDecoration: 'none' }} className="footer-bottom-link">
              Terms of Service
            </Link>
            <span style={{ opacity: 0.3, color: '#FFFFFF' }}>|</span>
            <Link to="/about" style={{ color: '#94A3B8', textDecoration: 'none' }} className="footer-bottom-link">
              Sitemap
            </Link>

            {/* 4 Slanted Tech Lines from Logo Style (Cyan & Green) */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginLeft: '8px' }}>
              <div style={{ width: '5px', height: '14px', background: '#00A3FF', transform: 'skewX(-25deg)', borderRadius: '1px' }} />
              <div style={{ width: '5px', height: '14px', background: '#0066FF', transform: 'skewX(-25deg)', borderRadius: '1px' }} />
              <div style={{ width: '5px', height: '14px', background: '#10B981', transform: 'skewX(-25deg)', borderRadius: '1px' }} />
              <div style={{ width: '5px', height: '14px', background: '#00D2FF', transform: 'skewX(-25deg)', borderRadius: '1px' }} />
            </div>
          </div>

          {/* Copyright (Displays at bottom on mobile via order: 2) */}
          <div className="footer-copyright-text">
            © 2026{' '}
            <span style={{ color: '#0066FF', fontWeight: 800 }}>SMART</span>
            <span style={{ color: '#10B981', fontWeight: 800 }}>oi</span>. All Rights Reserved. Designed with in India.
          </div>
        </div>

      </div>

      <style>{`
        .footer-logo-img {
          height: 82px;
          max-width: 210px;
          width: auto;
          display: block;
          object-fit: contain;
          filter: drop-shadow(0 2px 10px rgba(0, 102, 255, 0.25));
        }
        @media (max-width: 1080px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
        }
        @media (max-width: 640px) {
          .footer-logo-img {
            height: 82px !important;
            max-width: 180px !important;
          }
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-bottom {
            flex-direction: column !important;
            text-align: center !important;
            justify-content: center !important;
            gap: 16px !important;
          }
          .footer-legal-links {
            order: 1 !important;
            justify-content: center !important;
            flex-wrap: wrap !important;
          }
          .footer-copyright-text {
            order: 2 !important;
            font-size: 0.82rem !important;
            line-height: 1.5 !important;
            color: #94A3B8 !important;
            padding-top: 4px !important;
          }
        }
        .social-badge-btn:hover {
          transform: translateY(-3px) scale(1.06);
        }
        .footer-nav-link:hover {
          color: #00D2FF !important;
          transform: translateX(4px);
        }
        .footer-bottom-link:hover {
          color: #00D2FF !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
