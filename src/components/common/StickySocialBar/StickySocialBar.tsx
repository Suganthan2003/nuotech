import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '@/data/nuoData';

export const StickySocialBar: React.FC = () => {
  const whatsappUrl = COMPANY_INFO.whatsappUrl || 'https://wa.me/919965608260';
  const phoneHref = `tel:${COMPANY_INFO.phone.split(' ')[0] || '9585076764'}`;
  const instagramHref = COMPANY_INFO.socials.instagram && COMPANY_INFO.socials.instagram !== '#'
    ? COMPANY_INFO.socials.instagram
    : 'https://www.instagram.com';
  const linkedinHref = COMPANY_INFO.socials.linkedin && COMPANY_INFO.socials.linkedin !== '#'
    ? COMPANY_INFO.socials.linkedin
    : 'https://www.linkedin.com';

  return (
    <>
      <aside
        className="sticky-social-bar"
        aria-label="Quick contact channels"
      >
        {/* 1st: LinkedIn Icon */}
        <a
          href={linkedinHref}
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-social-link linkedin"
          title="Connect on LinkedIn"
          aria-label="LinkedIn"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          <span className="sticky-tooltip">LinkedIn</span>
        </a>

        {/* 2nd: Instagram Icon (Inline SVG for pixel-perfect brand rendering) */}
        <a
          href={instagramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-social-link instagram"
          title="Follow on Instagram"
          aria-label="Instagram"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          <span className="sticky-tooltip">Instagram</span>
        </a>

        {/* 3rd: WhatsApp Icon */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-social-link whatsapp"
          title="Chat on WhatsApp"
          aria-label="WhatsApp"
        >
          <MessageCircle size={22} />
          <span className="sticky-tooltip">WhatsApp</span>
        </a>

        {/* Call Icon */}
        <a
          href={phoneHref}
          className="sticky-social-link phone"
          title="Call Us Now"
          aria-label="Call Us"
        >
          <Phone size={20} />
          <span className="sticky-tooltip">Call Us</span>
        </a>
      </aside>

      <style>{`
        .sticky-social-bar {
          position: fixed;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 998;
          display: flex;
          flex-direction: column;
          background: rgba(10, 18, 38, 0.94);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(0, 102, 255, 0.35);
          border-right: none;
          border-radius: 16px 0 0 16px;
          padding: 10px 7px;
          gap: 12px;
          box-shadow: -4px 8px 24px rgba(0, 0, 0, 0.45), 0 0 16px rgba(0, 82, 204, 0.25);
          transition: transform 0.3s ease;
        }

        .sticky-social-link {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          color: #FFFFFF;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Channel Themes */
        .sticky-social-link.whatsapp {
          background: #25D366;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.35);
        }
        .sticky-social-link.instagram {
          background: linear-gradient(45deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%);
          box-shadow: 0 4px 12px rgba(221, 42, 123, 0.35);
        }
        .sticky-social-link.linkedin {
          background: #0A66C2;
          box-shadow: 0 4px 12px rgba(10, 102, 194, 0.4);
        }
        .sticky-social-link.phone {
          background: linear-gradient(135deg, #0052CC 0%, #0066FF 100%);
          box-shadow: 0 4px 12px rgba(0, 82, 204, 0.4);
        }

        .sticky-social-link:hover {
          transform: translateX(-4px) scale(1.08);
        }
        .sticky-social-link:active {
          transform: scale(0.95);
        }

        /* Tooltip on hover (desktop only) */
        .sticky-tooltip {
          position: absolute;
          right: 52px;
          top: 50%;
          transform: translateY(-50%) translateX(8px);
          background: #0A1120;
          color: #FFFFFF;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 5px 11px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: all 0.2s ease;
        }
        .sticky-tooltip::after {
          content: '';
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent transparent #0A1120;
        }

        @media (min-width: 961px) {
          .sticky-social-link:hover .sticky-tooltip {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }

        /* Phone & Tablet Adjustment */
        @media (max-width: 640px) {
          .sticky-social-bar {
            padding: 8px 4px;
            gap: 10px;
            border-radius: 14px 0 0 14px;
          }
          .sticky-social-link {
            width: 38px;
            height: 38px;
            border-radius: 10px;
          }
          .sticky-social-link svg {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </>
  );
};

export default StickySocialBar;
