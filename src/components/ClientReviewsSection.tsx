import React, { useState, useEffect } from 'react';
import { Star, ChevronRight, ChevronLeft, CheckCircle2, MapPin } from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  location: string;
  date: string;
  rating: number;
  quote: string;
  avatarText: string;
  avatarColor: string;
  productUsed: string;
}

const TAMIL_CLIENT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'K. Murugesan',
    role: 'Managing Partner, Green Valley Coconut Groves',
    location: 'Udumalaipettai, Tamil Nadu',
    date: '12 Oct 2026',
    rating: 5,
    quote: "NUO Tech's AgriFlow Smart Controller has completely automated our 40-acre coconut grove drip irrigation. Power fluctuations in Udumalaipettai were always a challenge, but their solar DC backup and GSM mobile alerts solved it permanently. மிகச் சிறந்த தொழில்நுட்ப சேவை (Outstanding technology service)! Saved 45% water usage and cut labor expenses by 70%.",
    avatarText: 'KM',
    avatarColor: '#0284C7',
    productUsed: 'NUO AgriFlow Smart Controller'
  },
  {
    id: 'rev-2',
    name: 'S. Arumugam & Sons',
    role: 'Plant Director, Arumugam Weaving Mills',
    location: 'Tiruppur, Tamil Nadu',
    date: '28 Sep 2026',
    rating: 5,
    quote: "We integrated 24 industrial weaving loom clusters with NUO's DIN-Rail IoT Gateways across our Tiruppur factory. Live power factor monitoring and machine downtime telemetry stopped electrical wastage immediately. Their engineering team from Karur came down and deployed custom Modbus firmware within 48 hours.",
    avatarText: 'SA',
    avatarColor: '#059669',
    productUsed: 'NUO Industrial IoT Gateway'
  },
  {
    id: 'rev-3',
    name: 'Dr. V. Selvakumar',
    role: 'Agricultural Consultant & Farm Owner',
    location: 'Namakkal, Tamil Nadu',
    date: '14 Sep 2026',
    rating: 5,
    quote: "The precision aerial spraying service across our tapioca and sugarcane fields in Namakkal was remarkable. NUO's certified drone pilots completed 15 acres in under 3 hours with zero crop trampling and uniform micron droplet coverage. Highly dependable engineering support right here in Tamil Nadu.",
    avatarText: 'VS',
    avatarColor: '#D97706',
    productUsed: 'Agricultural Drone Operations'
  },
  {
    id: 'rev-4',
    name: 'P. Anandhan',
    role: 'Managing Director, Anandhan Hatcheries',
    location: 'Pollachi Road, Coimbatore, Tamil Nadu',
    date: '22 Aug 2026',
    rating: 5,
    quote: "Temperature and humidity regulation inside our commercial poultry sheds is critical. The custom microcontroller board designed by NUO Tech with opto-isolated relays handles our exhaust fans and foggers reliably. Zero downtime in over 8 months of continuous 24/7 operation.",
    avatarText: 'PA',
    avatarColor: '#7C3AED',
    productUsed: 'Custom Micro-Controller PCB'
  },
  {
    id: 'rev-5',
    name: 'R. Jayachandran',
    role: 'Cauvery River Basin Organic Cultivator',
    location: 'Puliyur, Karur, Tamil Nadu',
    date: '05 Aug 2026',
    rating: 5,
    quote: "Being based in Karur, it was a proud moment partnering with our local engineering innovators NUO TECH. Their solar DC pump drive has completely eliminated diesel generator fuel costs. The soil moisture sensor automatically triggers irrigation at 5 AM every morning.",
    avatarText: 'RJ',
    avatarColor: '#DB2777',
    productUsed: 'NUO Solar DC Pump Set'
  }
];

export const ClientReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-play review carousel every 7 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % TAMIL_CLIENT_REVIEWS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % TAMIL_CLIENT_REVIEWS.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + TAMIL_CLIENT_REVIEWS.length) % TAMIL_CLIENT_REVIEWS.length);
  };

  const currentReview = TAMIL_CLIENT_REVIEWS[currentIndex];

  return (
    <section 
      id="client-reviews" 
      style={{ 
        padding: '90px 0 110px', 
        background: '#FFFFFF',
        backgroundImage: `
          linear-gradient(to right, rgba(15, 23, 42, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '36px 36px',
        color: '#0F172A',
        position: 'relative',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0'
      }}
    >
      <div 
        className="container" 
        style={{ 
          maxWidth: '1280px',
          padding: '0 28px'
        }}
      >
        {/* Main 2-Column Layout matching the reference image */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 0.9fr) minmax(420px, 1.25fr)',
            gap: '52px',
            alignItems: 'center'
          }}
          className="reviews-grid-layout"
        >

          {/* ========================================================
              LEFT COLUMN: RATING & REVIEWS OVERVIEW BARS
              ======================================================== */}
          <div>
            <h2 
              style={{ 
                fontSize: 'clamp(1.7rem, 2.5vw, 2.2rem)', 
                fontWeight: 800, 
                color: '#0F172A',
                marginBottom: '26px',
                letterSpacing: '-0.02em'
              }}
            >
              Rating & Reviews
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '36px', flexWrap: 'wrap' }}>
              
              {/* Giant Score Display */}
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span 
                    style={{ 
                      fontSize: 'clamp(4.2rem, 6.5vw, 5.4rem)', 
                      fontWeight: 800, 
                      color: '#0F172A',
                      lineHeight: 1,
                      letterSpacing: '-0.03em'
                    }}
                  >
                    4,9
                  </span>
                  <span 
                    style={{ 
                      fontSize: '1.4rem', 
                      color: '#64748B',
                      fontWeight: 600
                    }}
                  >
                    / 5
                  </span>
                </div>
                <div 
                  style={{ 
                    fontSize: '0.9rem', 
                    color: '#64748B', 
                    marginTop: '10px',
                    fontWeight: 500
                  }}
                >
                  (68 Verified Tamil Nadu Reviews)
                </div>
              </div>

              {/* Star Rating Breakdown Bars (Matching black bars from screenshot) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '180px', flex: 1 }}>
                
                {/* 5 Stars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '38px', color: '#F59E0B' }}>
                    <Star size={13} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ color: '#0F172A', fontWeight: 700 }}>5</span>
                  </div>
                  <div style={{ flex: 1, height: '6px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '92%', height: '100%', background: '#0F172A', borderRadius: '4px' }} />
                  </div>
                </div>

                {/* 4 Stars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '38px', color: '#F59E0B' }}>
                    <Star size={13} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ color: '#0F172A', fontWeight: 700 }}>4</span>
                  </div>
                  <div style={{ flex: 1, height: '6px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '18%', height: '100%', background: '#0F172A', borderRadius: '4px' }} />
                  </div>
                </div>

                {/* 3 Stars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '38px', color: '#F59E0B' }}>
                    <Star size={13} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ color: '#0F172A', fontWeight: 700 }}>3</span>
                  </div>
                  <div style={{ flex: 1, height: '6px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '6%', height: '100%', background: '#0F172A', borderRadius: '4px' }} />
                  </div>
                </div>

                {/* 2 Stars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '38px', color: '#F59E0B' }}>
                    <Star size={13} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ color: '#0F172A', fontWeight: 700 }}>2</span>
                  </div>
                  <div style={{ flex: 1, height: '6px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '2%', height: '100%', background: '#0F172A', borderRadius: '4px' }} />
                  </div>
                </div>

                {/* 1 Star */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '38px', color: '#F59E0B' }}>
                    <Star size={13} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ color: '#0F172A', fontWeight: 700 }}>1</span>
                  </div>
                  <div style={{ flex: 1, height: '6px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '1%', height: '100%', background: '#0F172A', borderRadius: '4px' }} />
                  </div>
                </div>

              </div>

            </div>

            {/* Region Credibility Badge */}
            <div 
              style={{
                marginTop: '28px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '24px',
                fontSize: '0.82rem',
                color: '#0F172A',
                fontWeight: 600,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
              }}
            >
              <CheckCircle2 size={14} color="#10B981" />
              <span>Tested & Trusted by Farmers & Industries Across Tamil Nadu</span>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: CLIENT REVIEW CARD SLIDER
              (Exact replica of the elevated white card in reference image)
              ======================================================== */}
          <div 
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ position: 'relative' }}
          >
            {/* The Elevated Testimonial Card */}
            <div 
              style={{
                background: '#FFFFFF',
                color: '#0F172A',
                borderRadius: '24px',
                padding: '32px 36px 28px',
                boxShadow: '0 20px 50px -10px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.04)',
                border: '1px solid #E2E8F0',
                position: 'relative',
                minHeight: '270px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}
            >
              <div>
                {/* Header: Name and Date */}
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}
                >
                  <div>
                    <h4 
                      style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 800, 
                        color: '#0F172A',
                        lineHeight: 1.2,
                        margin: 0
                      }}
                    >
                      {currentReview.name}
                    </h4>
                    <div 
                      style={{ 
                        fontSize: '0.8rem', 
                        color: '#64748B', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '4px',
                        marginTop: '4px'
                      }}
                    >
                      <MapPin size={13} color="#0284C7" />
                      <span>{currentReview.location}</span>
                    </div>
                  </div>

                  <span 
                    style={{ 
                      fontSize: '0.82rem', 
                      color: '#94A3B8',
                      fontWeight: 600
                    }}
                  >
                    {currentReview.date}
                  </span>
                </div>

                {/* Star Rating */}
                <div style={{ display: 'flex', gap: '3px', margin: '12px 0 16px' }}>
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>

                {/* Review Quote Text */}
                <p 
                  style={{ 
                    fontSize: '0.96rem', 
                    lineHeight: 1.65, 
                    color: '#334155',
                    margin: 0,
                    fontWeight: 400
                  }}
                >
                  "{currentReview.quote}"
                </p>
              </div>

              {/* Bottom Row: Avatar, Progress Pill, and Arrow Navigation */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginTop: '24px',
                  paddingTop: '18px',
                  borderTop: '1px solid #F1F5F9',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                {/* User Avatar with Initials & Verified badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div 
                    style={{ 
                      width: '42px', 
                      height: '42px', 
                      borderRadius: '50%', 
                      background: currentReview.avatarColor,
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      flexShrink: 0,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.12)'
                    }}
                  >
                    {currentReview.avatarText}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
                      {currentReview.role}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#0284C7', fontWeight: 600 }}>
                      Verified Client &bull; {currentReview.productUsed}
                    </div>
                  </div>
                </div>

                {/* Centered Progress Indicator & Arrows */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  
                  {/* Progress Line Indicator (matching mockup) */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      gap: '4px', 
                      alignItems: 'center',
                      background: '#F1F5F9',
                      padding: '4px 8px',
                      borderRadius: '12px'
                    }}
                  >
                    {TAMIL_CLIENT_REVIEWS.map((_, dotIdx) => (
                      <div 
                        key={dotIdx}
                        onClick={() => setCurrentIndex(dotIdx)}
                        style={{
                          width: dotIdx === currentIndex ? '22px' : '6px',
                          height: '5px',
                          borderRadius: '3px',
                          background: dotIdx === currentIndex ? '#0F172A' : '#CBD5E1',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease'
                        }}
                      />
                    ))}
                  </div>

                  {/* Circular Prev/Next Controls */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={handlePrev}
                      aria-label="Previous Review"
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        border: '1px solid #CBD5E1',
                        background: '#FFFFFF',
                        color: '#0F172A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#0F172A';
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.borderColor = '#0F172A';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#FFFFFF';
                        e.currentTarget.style.color = '#0F172A';
                        e.currentTarget.style.borderColor = '#CBD5E1';
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next Review"
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        border: '1px solid #0F172A',
                        background: '#0F172A',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#0284C7';
                        e.currentTarget.style.borderColor = '#0284C7';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#0F172A';
                        e.currentTarget.style.borderColor = '#0F172A';
                      }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .reviews-grid-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};
