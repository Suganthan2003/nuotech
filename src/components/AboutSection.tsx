import React from 'react';
import { COMPANY_INFO } from '../data/nuoData';
import { Target, Compass, Award, MapPin, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 56px' }}>
          <div className="badge" style={{ marginBottom: '12px' }}>
            About NUO TECH
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '16px' }}>
            One Technology Partner. <span className="gradient-text">Multiple Solutions.</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Based in Karur, Tamil Nadu — NUO TECH is a forward-thinking engineering and product development firm serving residential, industrial, agricultural, and commercial sectors across India.
          </p>
        </div>

        {/* Vision, Mission & Objectives Cards */}
        <div className="grid-3" style={{ gap: '28px', marginBottom: '56px' }}>
          
          <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.7)' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: 'rgba(6, 182, 212, 0.15)',
              color: 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Compass size={26} />
            </div>
            <h3 style={{ fontSize: '1.35rem', color: '#FFF', marginBottom: '12px' }}>Our Vision</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {COMPANY_INFO.vision}
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.7)' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: 'rgba(245, 158, 11, 0.15)',
              color: 'var(--accent-amber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Target size={26} />
            </div>
            <h3 style={{ fontSize: '1.35rem', color: '#FFF', marginBottom: '12px' }}>Our Mission</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {COMPANY_INFO.mission}
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.7)' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--accent-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Award size={26} />
            </div>
            <h3 style={{ fontSize: '1.35rem', color: '#FFF', marginBottom: '12px' }}>Our Objective</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {COMPANY_INFO.objective}
            </p>
          </div>

        </div>

        {/* Why Choose Us & Drone Training Centers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="about-split">
          
          <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#FFF', marginBottom: '20px' }}>
              Why Choose NUO TECH?
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                "Customized engineering solutions",
                "Practical & cost-effective designs",
                "End-to-end product development",
                "Automation & IoT integration",
                "Renewable energy expertise",
                "Prototype-to-production support",
                "On-site installation & commissioning",
                "24/7 Service & technical support"
              ].map((reason, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  <CheckCircle size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', background: 'rgba(11, 19, 43, 0.8)', border: '1px solid var(--border-amber)' }}>
            <div className="badge badge-amber" style={{ marginBottom: '12px' }}>
              Special Drone Division
            </div>
            <h3 style={{ fontSize: '1.4rem', color: '#FFF', marginBottom: '12px' }}>
              Drone Services & Pilot Training Hubs
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '20px' }}>
              We offer certified pilot training support and agricultural / industrial drone survey services across key regions in Tamil Nadu:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {COMPANY_INFO.trainingLocations.map((loc, i) => (
                <div key={i} style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontWeight: 600,
                  color: '#FFF'
                }}>
                  <MapPin size={16} style={{ color: 'var(--accent-amber)' }} />
                  <span>{loc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-split { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
