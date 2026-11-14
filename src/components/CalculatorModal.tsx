import React, { useState, useEffect } from 'react';
import { SOLUTION_SECTORS } from '../data/nuoData';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedSolution?: string;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({
  isOpen,
  onClose,
  preSelectedSolution
}) => {
  const [selectedSector, setSelectedSector] = useState<string>(SOLUTION_SECTORS[0].title);
  const [selectedSubItem, setSelectedSubItem] = useState<string>(SOLUTION_SECTORS[0].subItems[0]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Sync state whenever modal opens or preSelectedSolution changes
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      if (preSelectedSolution) {
        const sectorMatch = SOLUTION_SECTORS.find(
          s =>
            s.title.toLowerCase().includes(preSelectedSolution.toLowerCase()) ||
            preSelectedSolution.toLowerCase().includes(s.title.toLowerCase())
        );
        if (sectorMatch) {
          setSelectedSector(sectorMatch.title);
          setSelectedSubItem(sectorMatch.subItems[0]);
          return;
        }

        for (const sec of SOLUTION_SECTORS) {
          const subMatch = sec.subItems.find(
            sub =>
              sub.toLowerCase().includes(preSelectedSolution.toLowerCase()) ||
              preSelectedSolution.toLowerCase().includes(sub.toLowerCase())
          );
          if (subMatch) {
            setSelectedSector(sec.title);
            setSelectedSubItem(subMatch);
            return;
          }
        }
      }
    }
  }, [isOpen, preSelectedSolution]);

  // Close on Escape + lock background scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  const currentSectorObj =
    SOLUTION_SECTORS.find(s => s.title === selectedSector) || SOLUTION_SECTORS[0];

  const handleSectorChange = (sectorTitle: string) => {
    setSelectedSector(sectorTitle);
    const sec = SOLUTION_SECTORS.find(s => s.title === sectorTitle);
    if (sec && sec.subItems.length > 0) {
      setSelectedSubItem(sec.subItems[0]);
    } else {
      setSelectedSubItem('');
    }
  };

  if (!isOpen) return null;

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="smt-overlay" onClick={onClose}>
      <div
        className="smt-card"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Contact Form"
      >
        {/* Close Button */}
        <button onClick={onClose} className="smt-close" title="Close" aria-label="Close" type="button">
          <X size={18} />
        </button>

        {/* Header: logo centred on top */}
        <div className="smt-header">
          <img src="/img/logos.jpeg" alt="SMARToi Logo" className="smt-logo" />
          <h2 className="smt-title">Contact Form</h2>
          <p className="smt-subtitle">
            Fill in your project requirements below and our engineering team will get back to you
            promptly.
          </p>
        </div>

        {/* Body */}
        <div className="smt-body">
          {isSubmitted ? (
            <div className="smt-success">
              <div className="smt-success-icon">
                <CheckCircle2 size={36} />
              </div>
              <h3>Message Sent Successfully!</h3>
              <p>
                Thank you, <strong>{name || 'Valued Customer'}</strong>! Our engineering team has
                received your request for{' '}
                <strong className="smt-accent">
                  {selectedSector} ({selectedSubItem})
                </strong>{' '}
                and will respond within 24 hours.
              </p>
              <button onClick={onClose} className="smt-btn smt-btn-auto" type="button">
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleDirectSubmit} className="smt-form">
              <div className="smt-grid-2">
                <div className="smt-group">
                  <label className="smt-label" htmlFor="smt-sector">
                    What You Would Like *
                  </label>
                  <select
                    id="smt-sector"
                    value={selectedSector}
                    onChange={e => handleSectorChange(e.target.value)}
                    className="smt-field smt-select"
                  >
                    {SOLUTION_SECTORS.map(sec => (
                      <option key={sec.id} value={sec.title}>
                        {sec.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="smt-group">
                  <label className="smt-label" htmlFor="smt-sub">
                    Sub-Item / Option *
                  </label>
                  <select
                    id="smt-sub"
                    value={selectedSubItem}
                    onChange={e => setSelectedSubItem(e.target.value)}
                    className="smt-field smt-select"
                  >
                    {currentSectorObj &&
                      currentSectorObj.subItems.map((sub, idx) => (
                        <option key={idx} value={sub}>
                          {sub}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="smt-group">
                <label className="smt-label" htmlFor="smt-name">
                  Full Name *
                </label>
                <input
                  id="smt-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="smt-field"
                />
              </div>

              <div className="smt-grid-2">
                <div className="smt-group">
                  <label className="smt-label" htmlFor="smt-email">
                    Email Address *
                  </label>
                  <input
                    id="smt-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="smt-field"
                  />
                </div>
                <div className="smt-group">
                  <label className="smt-label" htmlFor="smt-phone">
                    Phone Number *
                  </label>
                  <input
                    id="smt-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="smt-field"
                  />
                </div>
              </div>

              <div className="smt-group">
                <label className="smt-label" htmlFor="smt-message">
                  Your Message *
                </label>
                <textarea
                  id="smt-message"
                  required
                  rows={3}
                  placeholder="Tell us about your project specifications, custom machinery needs, or automation goals..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="smt-field smt-textarea"
                />
              </div>

              <button type="submit" className="smt-btn">
                <span>SEND MESSAGE</span>
                <Send size={18} color="#FFFFFF" />
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        /* ---------- Brand tokens (SMARToi logo) ---------- */
        .smt-overlay {
          --smt-navy: #0B2F8F;
          --smt-blue: #1457C7;
          --smt-green: #2FA84F;
          --smt-text: #1E293B;
          --smt-muted: #64748B;

          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          padding: 16px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          box-sizing: border-box;
          /* Light frosted backdrop with soft brand-colour glows */
          background:
            radial-gradient(circle at 10% 8%, rgba(20, 87, 199, 0.22), transparent 42%),
            radial-gradient(circle at 92% 92%, rgba(47, 168, 79, 0.22), transparent 42%),
            rgba(241, 246, 255, 0.55);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          animation: smtFade 0.25s ease;
        }
        .smt-overlay *, .smt-overlay *::before, .smt-overlay *::after { box-sizing: border-box; }

        /* ---------- White glass card ---------- */
        .smt-card {
          position: relative;
          width: 100%;
          max-width: 620px;
          margin: auto;               /* centres vertically, scrolls safely on short screens */
          border-radius: 24px;
          color: var(--smt-text);
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow:
            0 24px 60px rgba(20, 87, 199, 0.18),
            0 4px 14px rgba(15, 23, 42, 0.06),
            inset 0 1px 0 #FFFFFF;
          backdrop-filter: blur(22px) saturate(150%);
          -webkit-backdrop-filter: blur(22px) saturate(150%);
          overflow: hidden;
          animation: smtPop 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.1);
        }
        /* Logo-colour accent bar */
        .smt-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 5px;
          background: linear-gradient(90deg, var(--smt-navy) 0%, var(--smt-blue) 50%, var(--smt-green) 100%);
        }

        /* ---------- Close ---------- */
        .smt-close {
          position: absolute;
          top: 16px; right: 16px;
          z-index: 5;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          color: var(--smt-muted);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #E2E8F0;
          transition: all 0.25s ease;
        }
        .smt-close:hover {
          color: #FFFFFF;
          background: var(--smt-blue);
          border-color: var(--smt-blue);
          transform: rotate(90deg);
        }

        /* ---------- Header (logo top-centre) ---------- */
        .smt-header {
          padding: 32px 28px 18px;
          text-align: center;
          border-bottom: 1px solid rgba(20, 87, 199, 0.1);
        }
        .smt-logo {
          display: block;
          margin: 0 auto 14px;
          height: 46px;
          max-width: 80%;
          object-fit: contain;
        }
        .smt-title {
          margin: 0 0 6px;
          font-size: 1.7rem;
          font-weight: 800;
          letter-spacing: -0.4px;
          color: var(--smt-navy);
        }
        .smt-subtitle {
          max-width: 460px;
          margin: 0 auto;
          font-size: 0.93rem;
          line-height: 1.55;
          color: var(--smt-muted);
        }

        /* ---------- Body / form ---------- */
        .smt-body { padding: 22px 28px 28px; }
        .smt-form { display: flex; flex-direction: column; gap: 16px; }
        .smt-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .smt-group { min-width: 0; }

        .smt-label {
          display: block;
          margin-bottom: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: var(--smt-navy);
        }

        .smt-field {
          width: 100%;
          padding: 12px 16px;
          font-family: inherit;
          font-size: 0.93rem;
          font-weight: 500;
          color: var(--smt-text);
          background: rgba(255, 255, 255, 0.9);
          border: 1.5px solid #D5DFEE;
          border-radius: 14px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .smt-field::placeholder { color: #94A3B8; font-weight: 400; }
        .smt-field:hover { border-color: #AFC3E6; }
        .smt-field:focus {
          background: #FFFFFF;
          border-color: var(--smt-blue);
          box-shadow: 0 0 0 4px rgba(20, 87, 199, 0.14);
        }

        .smt-select {
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          padding-right: 40px;
          text-overflow: ellipsis;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%231457C7' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
          background-repeat: no-repeat;
          background-position: right 14px center;
        }
        .smt-textarea { resize: vertical; min-height: 90px; }

        /* ---------- Buttons ---------- */
        .smt-btn {
          width: 100%;
          margin-top: 4px;
          padding: 15px 20px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          font-family: inherit;
          font-size: 0.98rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: #FFFFFF;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          background: linear-gradient(90deg, var(--smt-blue) 0%, var(--smt-green) 100%);
          box-shadow: 0 10px 24px rgba(20, 87, 199, 0.3);
          transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
        }
        .smt-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(47, 168, 79, 0.35);
          filter: brightness(1.05);
        }
        .smt-btn:active { transform: translateY(0); }
        .smt-btn-auto { width: auto; min-width: 180px; margin: 0 auto; }

        /* ---------- Success ---------- */
        .smt-success { text-align: center; padding: 20px 4px 8px; }
        .smt-success-icon {
          width: 68px; height: 68px;
          margin: 0 auto 16px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          color: var(--smt-green);
          background: #F0FDF4;
          border: 2px solid var(--smt-green);
          box-shadow: 0 0 0 6px rgba(47, 168, 79, 0.12);
        }
        .smt-success h3 { margin: 0 0 8px; font-size: 1.4rem; font-weight: 800; color: var(--smt-navy); }
        .smt-success p {
          max-width: 440px;
          margin: 0 auto 24px;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--smt-muted);
        }
        .smt-success strong { color: var(--smt-text); }
        .smt-success .smt-accent { color: var(--smt-blue); }

        /* ---------- Animations ---------- */
        @keyframes smtFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes smtPop {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .smt-overlay, .smt-card { animation: none; }
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 640px) {
          .smt-overlay { padding: 10px; }
          .smt-card { border-radius: 20px; }
          .smt-grid-2 { grid-template-columns: 1fr; }
          .smt-header { padding: 28px 18px 14px; }
          .smt-body { padding: 18px 18px 22px; }
          .smt-logo { height: 38px; }
          .smt-title { font-size: 1.45rem; }
          .smt-subtitle { font-size: 0.88rem; }
          /* 16px stops iOS Safari zooming into inputs */
          .smt-field { font-size: 16px; padding: 12px 14px; }
          .smt-btn-auto { width: 100%; }
        }
        @media (max-width: 360px) {
          .smt-logo { height: 32px; }
          .smt-title { font-size: 1.3rem; }
        }
        @media (max-height: 560px) and (orientation: landscape) {
          .smt-header { padding: 22px 20px 10px; }
          .smt-logo { height: 32px; margin-bottom: 8px; }
        }
      `}</style>
    </div>
  );
};