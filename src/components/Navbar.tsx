import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Home, Info, Cpu, Briefcase, Mail, ChevronRight } from 'lucide-react';

interface NavbarProps {
  openQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ openQuoteModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home size={15} /> },
    { path: '/about', label: 'About', icon: <Info size={15} /> },
    { path: '/product', label: 'Solution', icon: <Cpu size={15} /> },
    { path: '/career', label: 'Career', icon: <Briefcase size={15} /> },
    { path: '/contact', label: 'Contact', icon: <Mail size={15} /> },
  ];

  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; height: number; opacity: number }>({
    left: 0,
    width: 0,
    height: 0,
    opacity: 0
  });

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const updatePill = () => {
    const activeIndex = navLinks.findIndex(link => isActive(link.path));
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      const activeEl = itemRefs.current[activeIndex];
      if (activeEl) {
        setPillStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          height: activeEl.offsetHeight,
          opacity: 1
        });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    updatePill();
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [location.pathname]);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 50,
      background: scrolled 
        ? 'rgba(10, 16, 29, 0.96)' 
        : 'rgba(10, 16, 29, 0.90)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: 'none',
      boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(6, 182, 212, 0.15)' : 'none',
      transform: scrolled ? 'translateY(-120%)' : 'translateY(0)',
      opacity: scrolled ? 0 : 1,
      pointerEvents: scrolled ? 'none' : 'auto',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, background 0.3s ease',
      padding: '14px 32px'
    }} className="full-width-navbar">
      
      <div style={{
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        
        {/* Brand Logo Block */}
        <Link 
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            textDecoration: 'none'
          }}
        >
          <img 
            src="/img/log.png" 
            alt="NUO TECH Logo" 
            style={{ 
              height: '42px', 
              width: 'auto', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))'
            }} 
          />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              lineHeight: 1.1,
              fontFamily: 'Inter, system-ui, sans-serif'
            }}>
              <span style={{ 
                fontSize: '1.35rem', 
                fontWeight: 800, 
                color: '#8BA1B7',
                letterSpacing: '0.5px'
              }}>
                NUO
              </span>
              <span style={{ 
                fontSize: '1.35rem', 
                fontWeight: 800, 
                color: '#E2B049',
                letterSpacing: '0.5px'
              }}>
                TECH
              </span>
            </div>
            <span style={{ 
              fontSize: '0.62rem', 
              fontWeight: 700, 
              color: '#52789E', 
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              marginTop: '3px'
            }}>
              FUTURE BEGINS NOW
            </span>
          </div>
        </Link>

        {/* Center Floating Glass Track Navigation with Animated Sliding Pill */}
        <nav className="desktop-nav" style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(15, 25, 45, 0.65)',
          padding: '5px 8px',
          borderRadius: '9999px',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.12), inset 0 0 10px rgba(6, 182, 212, 0.05)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}>
          {/* Animated Gliding Active Pill Background */}
          <div
            className="sliding-nav-pill"
            style={{
              position: 'absolute',
              top: '5px',
              left: `${pillStyle.left}px`,
              width: `${pillStyle.width}px`,
              height: `${pillStyle.height}px`,
              borderRadius: '9999px',
              background: 'rgba(6, 182, 212, 0.22)',
              border: '1px solid rgba(6, 182, 212, 0.45)',
              boxShadow: '0 0 16px rgba(6, 182, 212, 0.35), inset 0 0 8px rgba(6, 182, 212, 0.18)',
              transition: 'all 0.35s cubic-bezier(0.34, 1.25, 0.64, 1)',
              pointerEvents: 'none',
              opacity: pillStyle.opacity,
              zIndex: 1
            }}
          />

          {navLinks.map((link, index) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                ref={(el) => { itemRefs.current[index] = el; }}
                to={link.path}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.92rem',
                  fontWeight: active ? 600 : 500,
                  textDecoration: 'none',
                  color: active ? '#FFFFFF' : '#B0C4DE',
                  transition: 'color 0.25s ease'
                }}
                className={`nav-item-link ${active ? 'active-link' : ''}`}
              >
                <span style={{ 
                  color: active ? '#38BDF8' : '#88A2C0',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.25s ease'
                }}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Get Quote Pill Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={openQuoteModal}
            className="quote-pill-btn"
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 24px',
              borderRadius: '9999px',
              fontSize: '0.92rem',
              fontWeight: 700,
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #0284C7 0%, #06B6D4 100%)',
              border: '1px solid rgba(165, 243, 252, 0.5)',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              outline: 'none'
            }}
          >
            <Zap size={16} style={{ filter: 'drop-shadow(0 0 4px #FFFFFF)' }} />
            <span>Get Quote</span>
          </button>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              background: 'rgba(15, 25, 45, 0.8)',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              color: '#FFF',
              padding: '8px 12px',
              borderRadius: '12px',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div className="glass-panel" style={{
          margin: '12px 16px 0',
          padding: '20px',
          borderRadius: '20px',
          background: 'rgba(10, 16, 29, 0.98)',
          backdropFilter: 'blur(25px)',
          border: '1px solid rgba(6, 182, 212, 0.4)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.85), 0 0 20px rgba(6, 182, 212, 0.2)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: active ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    color: active ? '#FFF' : '#B0C4DE',
                    border: active ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: active ? '#38BDF8' : '#88A2C0' }}>{link.icon}</span>
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight size={16} style={{ color: active ? '#38BDF8' : '#64748B' }} />
                </Link>
              );
            })}

            <div style={{ marginTop: '10px' }}>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  openQuoteModal();
                }}
                className="quote-pill-btn" 
                style={{ 
                  width: '100%', 
                  justifyContent: 'center',
                  padding: '12px',
                  fontSize: '0.95rem'
                }}
              >
                <Zap size={16} />
                <span>Get Quote</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .nav-item-link:hover {
          color: #FFFFFF !important;
        }
        .nav-item-link:hover span {
          color: #38BDF8 !important;
        }
        .quote-pill-btn:hover {
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 0 25px rgba(6, 182, 212, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.6) !important;
        }
        .quote-pill-btn:active {
          transform: translateY(0) scale(0.98);
        }
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .full-width-navbar { padding: 10px 16px !important; }
        }
        @media (min-width: 961px) {
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};
