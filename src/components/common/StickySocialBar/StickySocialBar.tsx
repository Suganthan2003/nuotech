import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { COMPANY_INFO } from '@/data/nuoData';

export const StickySocialBar: React.FC = () => {
  const [modalType, setModalType] = useState<'whatsapp' | 'call' | null>(null);

  const instagramHref = COMPANY_INFO.socials.instagram && COMPANY_INFO.socials.instagram !== '#'
    ? COMPANY_INFO.socials.instagram
    : 'https://www.instagram.com';
  const linkedinHref = COMPANY_INFO.socials.linkedin && COMPANY_INFO.socials.linkedin !== '#'
    ? COMPANY_INFO.socials.linkedin
    : 'https://www.linkedin.com';

  const numbers = [
    { label: '+91 95850 76764', raw: '9585076764', tel: 'tel:+919585076764', wa: 'https://wa.me/919585076764?text=Hello%20SMARToi%2C%20I%20am%20interested%20in%20your%20services' },
    { label: '+91 95850 76765', raw: '9585076765', tel: 'tel:+919585076765', wa: 'https://wa.me/919585076765?text=Hello%20SMARToi%2C%20I%20am%20interested%20in%20your%20services' }
  ];

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

        {/* 2nd: Instagram Icon */}
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

        {/* 3rd: WhatsApp Icon (Triggers Popup to select number) */}
        <button
          type="button"
          onClick={() => setModalType('whatsapp')}
          className="sticky-social-link whatsapp"
          title="Chat on WhatsApp"
          aria-label="WhatsApp"
        >
          <MessageCircle size={22} />
          <span className="sticky-tooltip">WhatsApp</span>
        </button>

        {/* 4th: Call Icon (Triggers Popup to select number) */}
        <button
          type="button"
          onClick={() => setModalType('call')}
          className="sticky-social-link phone"
          title="Call Us Now"
          aria-label="Call Us"
        >
          <Phone size={20} />
          <span className="sticky-tooltip">Call Us</span>
        </button>
      </aside>

      {/* Choice Modal for WhatsApp / Call */}
      {modalType && (
        <div className="contact-picker-overlay" onClick={() => setModalType(null)}>
          <div className="contact-picker-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="contact-picker-close"
              onClick={() => setModalType(null)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className={`contact-picker-header ${modalType}`}>
              <div className="contact-picker-icon">
                {modalType === 'whatsapp' ? <MessageCircle size={26} /> : <Phone size={26} />}
              </div>
              <h3 className="contact-picker-title">
                {modalType === 'whatsapp' ? 'Chat on WhatsApp' : 'Call SMARToi Support'}
              </h3>
              <p className="contact-picker-sub">
                Select a direct number to {modalType === 'whatsapp' ? 'start chat' : 'call now'}:
              </p>
            </div>

            <div className="contact-picker-options">
              {numbers.map((num, idx) => (
                <a
                  key={num.raw}
                  href={modalType === 'whatsapp' ? num.wa : num.tel}
                  target={modalType === 'whatsapp' ? '_blank' : undefined}
                  rel={modalType === 'whatsapp' ? 'noopener noreferrer' : undefined}
                  className={`contact-picker-btn ${modalType}`}
                  onClick={() => setModalType(null)}
                >
                  <div className="contact-picker-btn-icon">
                    {modalType === 'whatsapp' ? <MessageCircle size={18} /> : <Phone size={18} />}
                  </div>
                  <div className="contact-picker-btn-text">
                    <span className="contact-picker-btn-label">Line 0{idx + 1}</span>
                    <strong className="contact-picker-btn-num">{num.label}</strong>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

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
          border: none;
          cursor: pointer;
          font-family: inherit;
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

        /* Choice Popup Modal */
        .contact-picker-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: grid;
          place-items: center;
          padding: 20px;
          animation: cpFade 0.25s ease-out;
        }

        .contact-picker-card {
          position: relative;
          width: 100%;
          max-width: 400px;
          background: #FFFFFF;
          border-radius: 24px;
          padding: 30px 24px 24px;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(0, 0, 0, 0.05);
          text-align: center;
          animation: cpScale 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-picker-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: none;
          background: #F1F5F9;
          color: #64748B;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .contact-picker-close:hover {
          background: #E2E8F0;
          color: #0F172A;
          transform: scale(1.08);
        }

        .contact-picker-icon {
          width: 60px;
          height: 60px;
          border-radius: 18px;
          margin: 0 auto 14px;
          display: grid;
          place-items: center;
          color: #FFFFFF;
        }
        .contact-picker-header.whatsapp .contact-picker-icon {
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.35);
        }
        .contact-picker-header.call .contact-picker-icon {
          background: linear-gradient(135deg, #0052CC 0%, #0066FF 100%);
          box-shadow: 0 8px 20px rgba(0, 82, 204, 0.35);
        }

        .contact-picker-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 6px;
        }
        .contact-picker-sub {
          font-size: 0.92rem;
          color: #64748B;
          margin: 0 0 20px;
        }

        .contact-picker-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-picker-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 18px;
          border-radius: 16px;
          text-decoration: none;
          border: 1.5px solid #E2E8F0;
          background: #F8FAFC;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .contact-picker-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
        }
        .contact-picker-btn.whatsapp:hover {
          border-color: #25D366;
          background: #F0FDF4;
        }
        .contact-picker-btn.call:hover {
          border-color: #0052CC;
          background: #EFF6FF;
        }

        .contact-picker-btn-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          color: #FFFFFF;
          flex-shrink: 0;
        }
        .contact-picker-btn.whatsapp .contact-picker-btn-icon {
          background: #25D366;
        }
        .contact-picker-btn.call .contact-picker-btn-icon {
          background: #0052CC;
        }

        .contact-picker-btn-text {
          text-align: left;
          flex: 1;
        }
        .contact-picker-btn-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #64748B;
        }
        .contact-picker-btn-num {
          display: block;
          font-size: 1.05rem;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: 0.02em;
        }

        @keyframes cpFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cpScale {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
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
