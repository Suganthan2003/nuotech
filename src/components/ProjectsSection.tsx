import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../data/nuoData';
import { MapPin, TrendingUp, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeProject = PROJECTS[activeIndex];

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 4000); // Automatically animate slide movement every 4 seconds
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
    resetTimer();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
    resetTimer();
  };

  return (
    <section id="projects" style={{ padding: '100px 0 130px', background: '#0F172A', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
      {/* Background radial glow with Orange tint */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(249, 115, 22, 0.12)', 
              border: '1px solid rgba(249, 115, 22, 0.35)', 
              padding: '6px 18px', 
              borderRadius: '30px', 
              marginBottom: '16px' 
            }}
          >
           
            <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#F97316' }}>
              PROVEN TRACK RECORD
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: '14px', lineHeight: 1.2 }}>
            Featured <span style={{ color: '#F97316' }}>Deployments & Projects</span>
          </h2>

          <p style={{ color: '#94A3B8', fontSize: '1.08rem', lineHeight: 1.6, margin: '0 auto' }}>
            Real-world impact across agricultural fields, manufacturing plants, commercial solar grids, and smart properties.
          </p>
        </div>

        {/* Top Control Bar: Navigation Arrows & Slide Indicators right above the big card div */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', padding: '0 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#F97316' }}>
              PROJECT {String(activeIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
            </span>
            {/* Orange Slide Dots */}
            <div style={{ display: 'flex', gap: '6px', marginLeft: '10px' }}>
              {PROJECTS.map((_, dotIdx) => (
                <div
                  key={dotIdx}
                  onClick={() => {
                    setActiveIndex(dotIdx);
                    resetTimer();
                  }}
                  style={{
                    width: dotIdx === activeIndex ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: dotIdx === activeIndex ? '#F97316' : '#334155',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Navigation Arrows in Orange theme above the big div */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={handlePrev}
              style={{ 
                width: '46px', 
                height: '46px', 
                borderRadius: '50%', 
                background: '#1E293B', 
                border: '1px solid #334155', 
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
              className="slider-nav-btn"
              title="Previous Project (6s auto-slide)"
            >
              <ChevronLeft size={22} />
            </button>

            <button 
              onClick={handleNext}
              style={{ 
                width: '46px', 
                height: '46px', 
                borderRadius: '50%', 
                background: '#F97316', 
                border: 'none', 
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(249, 115, 22, 0.45)',
                transition: 'all 0.2s ease'
              }}
              className="slider-nav-btn"
              title="Next Project (6s auto-slide)"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Main Big Featured Active Card (Horizontal Split Layout) */}
        <div 
          style={{ 
            background: '#FFFFFF', 
            borderRadius: '24px', 
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
            display: 'flex',
            overflow: 'hidden',
            minHeight: '450px',
            position: 'relative',
            transition: 'all 0.4s ease'
          }}
          className="featured-active-card"
        >
          {/* Floating Side Arrow Overlays on the Card */}
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              top: '50%',
              left: '16px',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
            className="floating-arrow-btn"
            title="Previous Project"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              top: '50%',
              right: '16px',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#F97316',
              backdropFilter: 'blur(6px)',
              border: 'none',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(249, 115, 22, 0.5)'
            }}
            className="floating-arrow-btn"
            title="Next Project"
          >
            <ChevronRight size={20} />
          </button>

          {/* Left Column: Image taking full section/card height */}
          <div 
            style={{ 
              width: '45%', 
              position: 'relative',
              background: '#0F172A',
              overflow: 'hidden'
            }}
            className="card-image-wrapper"
          >
            <img 
              key={activeProject.id}
              src={activeProject.image} 
              alt={activeProject.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'opacity 0.4s ease'
              }}
            />
            {/* Orange Category Tag overlay */}
            <div 
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(8px)',
                color: '#FFD12E',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                padding: '6px 14px',
                borderRadius: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                border: '1px solid rgba(249, 115, 22, 0.3)'
              }}
            >
              {activeProject.category}
            </div>
          </div>

          {/* Right Column: Clean White Content Area */}
          <div 
            style={{ 
              width: '55%', 
              padding: '44px 48px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between' 
            }}
            className="card-content-wrapper"
          >
            <div>
              {/* Orange Category / Subtitle with line */}
              <div style={{ marginBottom: '14px' }}>
                <span 
                  style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: 800, 
                    letterSpacing: '2px', 
                    textTransform: 'uppercase', 
                    color: '#F97316',
                    borderBottom: '2px solid #F97316',
                    paddingBottom: '4px',
                    display: 'inline-block'
                  }}
                >
                  {activeProject.category}
                </span>
              </div>

              {/* Bold Title */}
              <h3 
                style={{ 
                  fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)', 
                  fontWeight: 900, 
                  color: '#0F172A', 
                  lineHeight: 1.3, 
                  margin: '0 0 16px 0',
                  letterSpacing: '-0.3px'
                }}
              >
                {activeProject.title}
              </h3>

              {/* Description Paragraph */}
              <p 
                style={{ 
                  color: '#475569', 
                  fontSize: '1.02rem', 
                  lineHeight: 1.65, 
                  marginBottom: '24px' 
                }}
              >
                {activeProject.description}
              </p>

              {/* Orange Impact Box */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '12px', 
                  background: 'rgba(249, 115, 22, 0.06)', 
                  border: '1px solid rgba(249, 115, 22, 0.25)',
                  padding: '14px 18px', 
                  borderRadius: '12px', 
                  marginBottom: '24px' 
                }}
              >
                <TrendingUp size={20} style={{ color: '#F97316', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F97316', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    MEASURED FIELD IMPACT
                  </div>
                  <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#1E293B', lineHeight: 1.4, marginTop: '2px' }}>
                    {activeProject.impact}
                  </div>
                </div>
              </div>
            </div>

            {/* Separator Line */}
            <div style={{ borderBottom: '1px solid #E2E8F0', marginBottom: '20px' }} />

            {/* Bottom Footer Line (Location & Active Link) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.9rem', fontWeight: 700 }}>
                <MapPin size={16} style={{ color: '#F97316' }} />
                <span>@{activeProject.location}</span>
              </div>

              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  color: '#F97316', 
                  fontSize: '0.92rem', 
                  fontWeight: 800 
                }}
              >
                <span>Project Active #{activeProject.id.replace('proj-', '')}</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .featured-active-card {
            flex-direction: column !important;
          }
          .card-image-wrapper {
            width: 100% !important;
            height: 260px !important;
          }
          .card-content-wrapper {
            width: 100% !important;
            padding: 24px !important;
          }
        }
        .slider-nav-btn:hover, .floating-arrow-btn:hover {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;





