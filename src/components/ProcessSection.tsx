import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      step: "01",
      tag: "LEVEL 1",
      title: "Understand",
      description: "We analyze your exact requirements, operational challenges, machinery constraints, and target business outcomes to establish a clear project blueprint."
    },
    {
      step: "02",
      tag: "LEVEL 2",
      title: "Design",
      description: "Our expert engineering team develops comprehensive mechanical, electrical, electronic circuit diagrams & scalable software architecture."
    },
    {
      step: "03",
      tag: "LEVEL 3",
      title: "Prototype",
      description: "We build and rigorously test functional working prototypes to validate engineering accuracy and hardware resilience before mass fabrication."
    },
    {
      step: "04",
      tag: "LEVEL 4",
      title: "Automate",
      description: "Integration of high-precision smart sensors, microcontrollers, motors, actuators, PLC controls & real-time cloud IoT telemetry dashboards."
    },
    {
      step: "05",
      tag: "LEVEL 5",
      title: "Manufacture",
      description: "Full-scale structural assembly, industrial wiring, CNC machining, and precision sheet metal fabrication under strict quality assurance standards."
    },
    {
      step: "06",
      tag: "LEVEL 6",
      title: "Install & Commission",
      description: "On-site deployment, field sensor calibration, electrical safety audits, system integration & comprehensive hands-on operator training."
    },
    {
      step: "07",
      tag: "LEVEL 7",
      title: "Support",
      description: "Ongoing annual maintenance contracts, proactive system health monitoring, 24/7 emergency troubleshooting & lifetime technical support."
    }
  ];

  return (
    <section 
      id="process" 
      style={{ 
        padding: '75px 0 95px', 
        position: 'relative', 
        overflow: 'hidden', 
        background: '#070C16',
        backgroundImage: 'radial-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1440px', margin: '0 auto', padding: '0 32px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 44px' }}>
          
          {/* Logo Branding */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <img 
              src="/img/log.png" 
              alt="NUO TECH Logo" 
              style={{ height: '40px', width: 'auto', filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.4))' }} 
            />
            <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.5px' }}>
              NUO <span style={{ color: '#E2B049' }}>TECH</span>
            </span>
          </div>

          {/* Execution Roadmap Title */}
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.45rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              margin: 0
            }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#38BDF8', boxShadow: '0 0 10px #38BDF8' }} />
              PROVEN EXECUTION ROADMAP
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#38BDF8', boxShadow: '0 0 10px #38BDF8' }} />
            </h3>
          </div>

          {/* Main Title */}
          <h2 style={{ fontSize: 'clamp(2.2rem, 3.6vw, 3.1rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, marginBottom: '14px', letterSpacing: '-0.5px' }}>
            Our 07-Step Product <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #38BDF8 0%, #06B6D4 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>
              Development Process
            </span>
          </h2>

          <p style={{ color: '#94A3B8', fontSize: '1.08rem', lineHeight: 1.6, margin: 0 }}>
            From initial idea to field installation and lifelong support — we execute every step with engineering precision.
          </p>
        </div>

        {/* Roadmap Cards Grid Container */}
        <div style={{ position: 'relative', width: '100%' }}>
          
          {/* Connecting Trail Line behind cards */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '2%',
            right: '2%',
            height: '3px',
            background: 'rgba(56, 189, 248, 0.35)',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.4)',
            borderRadius: '4px',
            zIndex: 0,
            transform: 'translateY(-10px)'
          }} />

          {/* 7 Uniform Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '16px',
            alignItems: 'stretch',
            position: 'relative',
            zIndex: 1
          }} className="square-to-rect-grid">
            
            {steps.map((s, idx) => (
              <div
                key={s.step}
                className="square-to-rect-card"
                style={{
                  width: '100%',
                  minHeight: '235px',
                  background: 'linear-gradient(180deg, rgba(14, 25, 48, 0.92) 0%, rgba(8, 15, 28, 0.95) 100%)',
                  border: '1.5px solid rgba(6, 182, 212, 0.4)',
                  boxShadow: '0 10px 28px rgba(0, 0, 0, 0.65)',
                  borderRadius: '20px',
                  padding: '20px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backdropFilter: 'blur(16px)',
                  position: 'relative',
                  transition: 'all 0.35s cubic-bezier(0.34, 1.25, 0.64, 1)',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
              >
                {/* Connector Badge Icon */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  width: '32px',
                  height: '32px',
                  background: 'rgba(6, 182, 212, 0.15)',
                  borderBottomLeftRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderLeft: '1px solid rgba(6, 182, 212, 0.35)',
                  borderBottom: '1px solid rgba(6, 182, 212, 0.35)'
                }}>
                  {idx < steps.length - 1 ? (
                    <ArrowRight size={14} style={{ color: '#38BDF8' }} />
                  ) : (
                    <CheckCircle2 size={14} style={{ color: '#38BDF8' }} />
                  )}
                </div>

                {/* Card Header: Step Number & Tag */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{
                      fontSize: '1.9rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 900,
                      color: '#38BDF8',
                      lineHeight: 1,
                      textShadow: '0 0 12px rgba(56, 189, 248, 0.5)'
                    }}>
                      {s.step}
                    </span>

                    <span style={{
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      padding: '4px 9px',
                      borderRadius: '9999px',
                      background: 'rgba(6, 182, 212, 0.16)',
                      color: '#38BDF8',
                      border: '1px solid rgba(6, 182, 212, 0.45)',
                      letterSpacing: '0.5px'
                    }}>
                      {s.tag}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h4 style={{
                    fontSize: '1.12rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: '10px',
                    lineHeight: 1.25,
                    letterSpacing: '-0.3px'
                  }}>
                    {s.title}
                  </h4>

                  {/* Step Description */}
                  <p 
                    className="step-desc"
                    style={{
                      fontSize: '0.82rem',
                      color: '#94A3B8',
                      lineHeight: 1.5,
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {s.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div 
                  className="step-footer"
                  style={{
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '14px'
                  }}
                >
                  <span style={{ fontSize: '0.66rem', fontWeight: 800, color: '#64748B', letterSpacing: '1px' }}>
                    PHASE {s.step}
                  </span>

                  <CheckCircle2 size={16} style={{ color: '#38BDF8' }} />
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>

      <style>{`
        .square-to-rect-card:hover {
          min-height: 310px !important;
          transform: translateY(-6px) scale(1.04) !important;
          border-color: #38BDF8 !important;
          box-shadow: 0 20px 45px rgba(6, 182, 212, 0.4), 0 0 20px rgba(56, 189, 248, 0.25) !important;
          z-index: 30;
          background: linear-gradient(180deg, rgba(14, 32, 60, 0.98) 0%, rgba(6, 16, 33, 0.98) 100%) !important;
          padding-bottom: 20px !important;
        }
        .square-to-rect-card:hover .step-desc {
          display: block !important;
          -webkit-line-clamp: unset !important;
          overflow: visible !important;
          color: #E2E8F0 !important;
          font-weight: 450 !important;
        }
        .square-to-rect-card:hover .step-footer {
          margin-top: 18px !important;
          border-top-color: rgba(56, 189, 248, 0.35) !important;
        }
        @media (max-width: 1200px) {
          .square-to-rect-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 16px !important; min-height: auto !important; }
          .square-to-rect-card { min-height: 220px !important; }
        }
        @media (max-width: 640px) {
          .square-to-rect-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
