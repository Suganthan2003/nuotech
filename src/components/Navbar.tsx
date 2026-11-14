import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Home, Info, Cpu, Briefcase, Mail, ChevronRight, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/nuoData';

interface NavbarProps {
  openQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ openQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/about', label: 'About', icon: <Info size={20} /> },
    { path: '/product', label: 'Solution', icon: <Cpu size={20} /> },
    { path: '/career', label: 'Career', icon: <Briefcase size={20} /> },
    { path: '/contact', label: 'Contact', icon: <Mail size={20} /> },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* =========================================================
          MAIN TOP NAVIGATION HEADER
          ========================================================= */}
      <header className="smartoi-navbar">
        <div className="smartoi-nav-inner">
          
          {/* Brand Logo (Always on left on Desktop, Centered on Mobile) */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="smartoi-logo-link"
          >
            <div className="smartoi-logo-badge">
              <img
                src="/img/logos.jpeg"
                alt="SMARToi Logo"
                className="smartoi-logo-img"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links (Center Floating Pill Track) */}
          <nav className="smartoi-desktop-nav">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`smartoi-nav-link ${active ? 'active' : ''}`}
                >
                  <span className="smartoi-link-icon">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Get Quote Pill Button & Mobile Hamburger Toggle */}
          <div className="smartoi-right-actions">
            <button
              onClick={openQuoteModal}
              className="smartoi-quote-pill"
              type="button"
            >
              <Zap size={16} />
              <span>Get Quote</span>
            </button>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="smartoi-hamburger-btn"
              aria-label="Open navigation menu"
              type="button"
            >
              <Menu size={24} />
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================
          MOBILE SLIDE-IN MENU (FROM LEFT TO RIGHT)
          ========================================================= */}
      {/* Dimmed backdrop */}
      <div
        className={`smartoi-drawer-backdrop ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Slide Drawer Panel */}
      <aside
        className={`smartoi-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
      >
        {/* Drawer Top Header */}
        <div className="smartoi-drawer-top">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="smartoi-drawer-logo"
          >
            <div className="smartoi-logo-badge">
              <img
                src="/img/logos.jpeg"
                alt="SMARToi Logo"
                className="smartoi-logo-img"
              />
            </div>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="smartoi-drawer-close"
            aria-label="Close menu"
            type="button"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Menu Links */}
        <div className="smartoi-drawer-body">
          <span className="smartoi-drawer-tag">NAVIGATION MENU</span>
          <div className="smartoi-drawer-links">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`smartoi-menu-item ${active ? 'active' : ''}`}
                >
                  <div className="smartoi-item-left">
                    <span className="smartoi-item-icon">{link.icon}</span>
                    <span className="smartoi-item-title">{link.label}</span>
                  </div>
                  <ChevronRight size={18} className="smartoi-item-chevron" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer Actions: Request a Quote & Call */}
        <div className="smartoi-drawer-footer">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openQuoteModal();
            }}
            className="smartoi-drawer-quote-btn"
            type="button"
          >
            <Zap size={18} />
            <span>Request a Quote</span>
          </button>

          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="smartoi-drawer-call-btn"
          >
            <Phone size={16} />
            <span>Call: {COMPANY_INFO.phone}</span>
          </a>
        </div>
      </aside>

      {/* =========================================================
          STYLES (Scoped & Robust)
          ========================================================= */}
      <style>{`
        /* Header Base - Static / Non-sticky (scrolls with page) */
        .smartoi-navbar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 100;
          background: rgba(7, 11, 22, 0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 14px 28px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
        }

        .smartoi-nav-inner {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        /* Logo Badge */
        .smartoi-logo-link {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        .smartoi-logo-badge {
          background: #FFFFFF;
          padding: 5px 12px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(0, 82, 204, 0.35);
          border: 1px solid rgba(0, 102, 255, 0.25);
        }
        .smartoi-logo-img {
          height: 30px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        /* Desktop Nav Pill Track */
        .smartoi-desktop-nav {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(15, 25, 45, 0.75);
          padding: 5px 8px;
          border-radius: 9999px;
          border: 1px solid rgba(0, 102, 255, 0.3);
          box-shadow: 0 0 20px rgba(0, 82, 204, 0.2), inset 0 0 10px rgba(0, 82, 204, 0.08);
        }
        .smartoi-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 18px;
          border-radius: 9999px;
          font-size: 0.92rem;
          font-weight: 500;
          color: #B0C4DE;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .smartoi-link-icon {
          display: flex;
          align-items: center;
          color: #88A2C0;
          transition: color 0.2s ease;
        }
        .smartoi-nav-link:hover {
          color: #FFFFFF;
        }
        .smartoi-nav-link:hover .smartoi-link-icon {
          color: #38BDF8;
        }
        .smartoi-nav-link.active {
          color: #FFFFFF;
          font-weight: 600;
          background: rgba(0, 82, 204, 0.45);
          border: 1px solid rgba(0, 102, 255, 0.65);
          box-shadow: 0 0 16px rgba(0, 82, 204, 0.5);
        }
        .smartoi-nav-link.active .smartoi-link-icon {
          color: #38BDF8;
        }

        /* Right Actions */
        .smartoi-right-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .smartoi-quote-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 24px;
          border-radius: 9999px;
          font-size: 0.92rem;
          font-weight: 700;
          color: #FFFFFF;
          background: linear-gradient(135deg, #0052CC 0%, #0066FF 100%);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 20px rgba(0, 82, 204, 0.5);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .smartoi-quote-pill:hover {
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 0 25px rgba(0, 102, 255, 0.65);
        }
        .smartoi-hamburger-btn {
          display: none;
        }

        /* =========================================================
           MOBILE RESPONSIVE (Phone / Tablet < 960px)
           ========================================================= */
        @media (max-width: 960px) {
          .smartoi-navbar {
            padding: 10px 16px;
          }
          .smartoi-desktop-nav {
            display: none !important;
          }

          /* Show Hamburger Button on Right */
          .smartoi-hamburger-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 42px;
            height: 42px;
            border-radius: 10px;
            background: rgba(15, 25, 45, 0.85);
            border: 1px solid rgba(0, 102, 255, 0.45);
            color: #FFFFFF;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
            transition: all 0.2s ease;
          }
          .smartoi-hamburger-btn:active {
            transform: scale(0.95);
          }

          /* Hide quote button in header on small mobile screens to keep header clean */
          .smartoi-quote-pill {
            display: none;
          }

          /* CENTER LOGO IN MOBILE VIEW */
          .smartoi-logo-link {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .smartoi-logo-img {
            height: 26px;
          }
        }

        /* =========================================================
           LEFT-TO-RIGHT SLIDE DRAWER
           ========================================================= */
        .smartoi-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(3, 7, 18, 0.75);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 9998;
        }
        .smartoi-drawer-backdrop.active {
          opacity: 1;
          pointer-events: auto;
        }

        .smartoi-drawer {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          width: 85%;
          max-width: 320px;
          height: 100vh;
          background: #090F1E;
          border-right: 1px solid rgba(0, 102, 255, 0.3);
          box-shadow: 10px 0 40px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 82, 204, 0.2);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
        }
        .smartoi-drawer.open {
          transform: translateX(0);
        }

        /* Drawer Top Bar */
        .smartoi-drawer-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(15, 25, 45, 0.5);
        }
        .smartoi-drawer-logo {
          text-decoration: none;
        }
        .smartoi-drawer-close {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #CBD5E1;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .smartoi-drawer-close:hover {
          background: #DC2626;
          border-color: #DC2626;
          color: #FFFFFF;
        }

        /* Drawer Body */
        .smartoi-drawer-body {
          flex: 1;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .smartoi-drawer-tag {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #64748B;
          margin-bottom: 4px;
          padding-left: 6px;
        }
        .smartoi-drawer-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .smartoi-menu-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          text-decoration: none;
          color: #CBD5E1;
          font-size: 0.98rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .smartoi-item-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .smartoi-item-icon {
          display: flex;
          align-items: center;
          color: #88A2C0;
          transition: color 0.2s ease;
        }
        .smartoi-item-chevron {
          color: #475569;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        /* Active / Hover in drawer */
        .smartoi-menu-item:hover,
        .smartoi-menu-item.active {
          background: linear-gradient(135deg, rgba(0, 82, 204, 0.3) 0%, rgba(16, 185, 129, 0.15) 100%);
          border-color: rgba(0, 102, 255, 0.5);
          color: #FFFFFF;
          transform: translateX(4px);
        }
        .smartoi-menu-item:hover .smartoi-item-icon,
        .smartoi-menu-item.active .smartoi-item-icon {
          color: #38BDF8;
        }
        .smartoi-menu-item:hover .smartoi-item-chevron,
        .smartoi-menu-item.active .smartoi-item-chevron {
          color: #38BDF8;
          transform: translateX(3px);
        }

        /* Drawer Footer */
        .smartoi-drawer-footer {
          padding: 18px 16px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(10, 16, 29, 0.6);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .smartoi-drawer-quote-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 20px;
          border-radius: 12px;
          font-size: 0.98rem;
          font-weight: 700;
          color: #FFFFFF;
          background: linear-gradient(135deg, #0052CC 0%, #10B981 100%);
          border: 1px solid rgba(255, 255, 255, 0.35);
          box-shadow: 0 8px 24px rgba(0, 82, 204, 0.4);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .smartoi-drawer-quote-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(16, 185, 129, 0.5);
        }
        .smartoi-drawer-quote-btn:active {
          transform: translateY(0);
        }

        .smartoi-drawer-call-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 0.86rem;
          font-weight: 600;
          color: #94A3B8;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .smartoi-drawer-call-btn:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
};

export default Navbar;
