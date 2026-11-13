import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <>
      <button
        onClick={scrollToTop}
        className="back-to-top-btn"
        aria-label="Scroll back to top"
        type="button"
      >
        <ArrowUp size={22} />
      </button>

      <style>{`
        .back-to-top-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0052CC 0%, #10B981 100%);
          border: 1.5px solid rgba(255, 255, 255, 0.45);
          color: #FFFFFF;
          display: grid;
          place-items: center;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0, 82, 204, 0.45), 0 2px 6px rgba(0, 0, 0, 0.3);
          z-index: 999;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, background 0.25s ease;
          animation: bttFadeIn 0.3s ease both;
        }
        .back-to-top-btn:hover {
          transform: translateY(-4px) scale(1.08);
          box-shadow: 0 12px 30px rgba(16, 185, 129, 0.55), 0 0 18px rgba(0, 82, 204, 0.6);
        }
        .back-to-top-btn:active {
          transform: translateY(-1px) scale(0.96);
        }
        @keyframes bttFadeIn {
          from { opacity: 0; transform: translateY(12px) scale(0.85); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 640px) {
          .back-to-top-btn {
            bottom: 20px;
            right: 20px;
            width: 44px;
            height: 44px;
          }
        }
      `}</style>
    </>
  );
};

export default BackToTopButton;

