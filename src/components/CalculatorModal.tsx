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
        // Try to match preSelectedSolution to a sector title
        const sectorMatch = SOLUTION_SECTORS.find(
          s => s.title.toLowerCase().includes(preSelectedSolution.toLowerCase()) ||
               preSelectedSolution.toLowerCase().includes(s.title.toLowerCase())
        );
        if (sectorMatch) {
          setSelectedSector(sectorMatch.title);
          setSelectedSubItem(sectorMatch.subItems[0]);
          return;
        }

        // Try subItem match
        for (const sec of SOLUTION_SECTORS) {
          const subMatch = sec.subItems.find(
            sub => sub.toLowerCase().includes(preSelectedSolution.toLowerCase()) ||
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

  // Current active sector object
  const currentSectorObj = SOLUTION_SECTORS.find(s => s.title === selectedSector) || SOLUTION_SECTORS[0];

  // Handle Sector Change -> Update sub-items and auto-pick the first sub-item
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
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(5, 9, 17, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '620px',
          width: '100%',
          borderRadius: '24px',
          position: 'relative',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
          color: '#0F172A',
          overflow: 'hidden',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '20px',
            zIndex: 10,
            background: '#F1F5F9',
            border: '1px solid #CBD5E1',
            color: '#475569',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          className="modal-close-btn"
          title="Close Modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header Banner */}
        <div style={{
          padding: '24px 28px 16px',
          borderBottom: '1px solid #F1F5F9'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src="/img/log.png" alt="NUO TECH Logo" style={{ height: '32px', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '1rem', fontWeight: 900, color: '#0F172A', letterSpacing: '0.5px' }}>NUO</span>
                <span style={{ fontSize: '1rem', fontWeight: 900, color: '#FF9900', letterSpacing: '0.5px' }}>TECH</span>
              </div>
              <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#0066FF', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                Future Begins Now
              </span>
            </div>
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', margin: '8px 0 4px', letterSpacing: '-0.5px' }}>
            Contact Form
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.94rem', margin: 0, lineHeight: 1.5 }}>
            Fill in your project requirements below and our engineering team will get back to you promptly.
          </p>
        </div>

        {/* Content Body */}
        <div style={{ padding: '20px 28px 28px', overflowY: 'auto' }}>
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '28px 12px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#F0FDF4',
                border: '2px solid #22C55E',
                color: '#22C55E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.25)'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0F172A', marginBottom: '8px' }}>
                Message Sent Successfully!
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#475569', maxWidth: '440px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                Thank you, <strong style={{ color: '#0F172A' }}>{name || 'Valued Customer'}</strong>! Our engineering team has received your request for <strong style={{ color: '#0066FF' }}>{selectedSector} ({selectedSubItem})</strong> and will respond within 24 hours.
              </p>
              <button
                onClick={onClose}
                style={{
                  padding: '12px 34px',
                  borderRadius: '40px',
                  background: 'linear-gradient(90deg, #0066FF 0%, #FF9900 100%)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(0, 102, 255, 0.3)'
                }}
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleDirectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Row 1: Sector Dropdown & Dynamic Sub-Item Side-by-Side */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="form-grid-2">
                
                {/* WHAT YOU WOULD LIKE / Sector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#334155', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    What You Would Like *
                  </label>
                  <select
                    value={selectedSector}
                    onChange={(e) => handleSectorChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      background: '#F8FAFC',
                      border: '1.5px solid #CBD5E1',
                      color: '#0F172A',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                    className="modal-form-select"
                  >
                    {SOLUTION_SECTORS.map((sec) => (
                      <option key={sec.id} value={sec.title}>
                        {sec.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dynamic Sub Item / Option */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#334155', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Sub-Item / Option *
                  </label>
                  <select
                    value={selectedSubItem}
                    onChange={(e) => setSelectedSubItem(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      background: '#F8FAFC',
                      border: '1.5px solid #CBD5E1',
                      color: '#0F172A',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                    className="modal-form-select"
                  >
                    {currentSectorObj && currentSectorObj.subItems.map((sub, idx) => (
                      <option key={idx} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Row 2: Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#334155', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    background: '#F8FAFC',
                    border: '1.5px solid #CBD5E1',
                    color: '#0F172A',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                  className="modal-form-input"
                />
              </div>

              {/* Row 3: Email Address & Phone Number Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#334155', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      background: '#F8FAFC',
                      border: '1.5px solid #CBD5E1',
                      color: '#0F172A',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                    className="modal-form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#334155', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      background: '#F8FAFC',
                      border: '1.5px solid #CBD5E1',
                      color: '#0F172A',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                    className="modal-form-input"
                  />
                </div>
              </div>

              {/* Row 4: Your Message Textarea */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#334155', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Your Message *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about your project specifications, custom machinery needs, or automation goals..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    background: '#F8FAFC',
                    border: '1.5px solid #CBD5E1',
                    color: '#0F172A',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  className="modal-form-input"
                />
              </div>

              {/* Send Message Button in Brand Gradient */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '40px',
                  background: 'linear-gradient(90deg, #0066FF 0%, #FF9900 100%)',
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  fontWeight: 900,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 25px rgba(0, 102, 255, 0.3)',
                  marginTop: '4px',
                  transition: 'all 0.25s ease'
                }}
                className="modal-submit-btn"
              >
                <span>SEND MESSAGE</span>
                <Send size={18} color="#FFFFFF" />
              </button>

            </form>
          )}
        </div>
      </div>

      <style>{`
        .modal-close-btn:hover {
          background: #FEE2E2 !important;
          border-color: #FCA5A5 !important;
          color: #EF4444 !important;
          transform: rotate(90deg);
        }
        .modal-form-input:focus, .modal-form-select:focus {
          border-color: #0066FF !important;
          box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.15) !important;
          background: #FFFFFF !important;
        }
        .modal-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 102, 255, 0.45) !important;
        }
        .modal-submit-btn:active {
          transform: translateY(0);
        }
        @media (max-width: 640px) {
          .form-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
