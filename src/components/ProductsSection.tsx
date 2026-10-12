import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Droplets, 
  Zap, 
  Sun, 
  Wifi, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Activity,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface Hotspot {
  id: string;
  title: string;
  detail: string;
  x: number; // percentage from left
  y: number; // percentage from top
  icon: any;
}

interface ProductSlide {
  id: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  image: string;
  hotspots: Hotspot[];
}

const SLIDES: ProductSlide[] = [
  {
    id: "nuo-agri-flow",
    name: "NUO AgriFlow Smart Controller",
    category: "Smart Agriculture",
    badge: "Best Seller",
    description: "Automated pump & valve controller with soil moisture inputs, solar power compatibility, and GSM/Wi-Fi remote monitoring.",
    image: "/img/WhatsApp Image 2026-09-19 at 1.02.58 PM (1).jpeg",
    hotspots: [
      {
        id: "agri-moisture",
        title: "Soil Moisture & Water Level",
        detail: "Multi-depth capacitive moisture sensing probe terminal with live analog telemetries.",
        x: 28,
        y: 40,
        icon: Droplets
      },
      {
        id: "agri-pump",
        title: "Single/3-Phase Pump Control",
        detail: "Heavy-duty 10A-32A contactor relays with smart phase reversal & dry-run cutoff.",
        x: 52,
        y: 65,
        icon: Zap
      },
      {
        id: "agri-solar",
        title: "Solar DC Input (12-24V)",
        detail: "Wide-input MPPT DC solar terminal supporting standalone PV arrays without grid power.",
        x: 74,
        y: 35,
        icon: Sun
      },
      {
        id: "agri-gsm",
        title: "Mobile App & SMS Alerts",
        detail: "High-gain quad-band GSM antenna and dual Wi-Fi transceivers for real-time cloud dispatch.",
        x: 44,
        y: 20,
        icon: Wifi
      },
      {
        id: "agri-casing",
        title: "IP65 Weatherproof Chassis",
        detail: "UV-treated polycarbonate enclosure sealed against rain, farm dust, and chemical vapors.",
        x: 82,
        y: 74,
        icon: ShieldCheck
      }
    ]
  },
  {
    id: "nuo-iot-gateway",
    name: "NUO Industrial IoT Gateway",
    category: "IoT Hardware",
    badge: "New Release",
    description: "Rugged DIN-rail industrial ESP32/ARM gateway with RS485 Modbus, Wi-Fi, Ethernet, and cloud MQTT broker integration.",
    image: "/img/WhatsApp Image 2026-09-19 at 1.04.46 PM.jpeg",
    hotspots: [
      {
        id: "gw-cpu",
        title: "Dual Core 240MHz SoC",
        detail: "High-speed 32-bit MCU core running real-time edge processing and Modbus telemetry.",
        x: 48,
        y: 44,
        icon: Cpu
      },
      {
        id: "gw-rs485",
        title: "RS485 / Modbus RTU Port",
        detail: "Optically isolated differential transceiver communicating with up to 32 industrial sensors.",
        x: 24,
        y: 68,
        icon: Activity
      },
      {
        id: "gw-din",
        title: "Din-Rail Industrial Enclosure",
        detail: "Standard 35mm top-hat DIN-rail mountable flame-retardant industrial polymer housing.",
        x: 78,
        y: 54,
        icon: Layers
      },
      {
        id: "gw-web",
        title: "Web GUI & Cloud MQTT",
        detail: "Embedded low-latency web dashboard and encrypted TLS cloud MQTT telemetry sync.",
        x: 36,
        y: 24,
        icon: Wifi
      }
    ]
  },
  {
    id: "nuo-solar-pump",
    name: "NUO Solar DC Pump Automated Set",
    category: "Renewable Energy",
    badge: "Eco Hero",
    description: "Direct DC solar pump drive with built-in MPPT technology and dry-run safety auto-shutoff.",
    image: "/img/WhatsApp Image 2026-09-19 at 1.19.32 PM.jpeg",
    hotspots: [
      {
        id: "sp-mppt",
        title: "MPPT High Efficiency Controller",
        detail: "98.5% peak electrical conversion tracking sun position to maximize water delivery.",
        x: 52,
        y: 38,
        icon: Sun
      },
      {
        id: "sp-motor",
        title: "DC Submersible / Surface Pump",
        detail: "Brushless permanent magnet DC motor with cavitation-resistant stainless steel impeller.",
        x: 30,
        y: 66,
        icon: Droplets
      },
      {
        id: "sp-gridless",
        title: "Zero Grid Electricity Needed",
        detail: "100% off-grid clean energy drive eliminating generator fuel and recurring utility costs.",
        x: 72,
        y: 28,
        icon: Zap
      },
      {
        id: "sp-protection",
        title: "Overload & Surge Protection",
        detail: "Lightning surge arrestor, thermal overload sensing, and smart dry-well auto-shutoff.",
        x: 78,
        y: 72,
        icon: ShieldCheck
      }
    ]
  },
  {
    id: "nuo-custom-pcb",
    name: "NUO Custom Micro-Controller PCB",
    category: "Electronics",
    badge: "Custom Build",
    description: "Tailor-made industrial control PCB board with relay outputs, optocoupled inputs, and noise-isolated power supply.",
    image: "/img/WhatsApp Image 2026-09-19 at 1.29.34 PM.jpeg",
    hotspots: [
      {
        id: "pcb-fr4",
        title: "FR4 2-Layer / 4-Layer PCB",
        detail: "Military grade high-Tg FR4 material with electroless nickel immersion gold (ENIG) finish.",
        x: 50,
        y: 48,
        icon: Layers
      },
      {
        id: "pcb-opto",
        title: "Opto-isolated Digital I/O",
        detail: "3.75kV galvanic isolation isolating microcontroller silicon from inductive line noise.",
        x: 26,
        y: 38,
        icon: ShieldCheck
      },
      {
        id: "pcb-relays",
        title: "10A Heavy Duty Relays",
        detail: "Subminiature power relays rated for high current AC valve and motor switching loads.",
        x: 74,
        y: 62,
        icon: Zap
      },
      {
        id: "pcb-fw",
        title: "Custom Firmware Pre-loaded",
        detail: "Pre-programmed with hardware watchdog, fail-safe bootloader & customer automation curves.",
        x: 36,
        y: 74,
        icon: Cpu
      }
    ]
  }
];

interface ProductsSectionProps {
  openQuoteModalWithSolution: (productName: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ openQuoteModalWithSolution }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlide = SLIDES[currentSlideIndex];

  // Auto-advance slides every 6 seconds unless user is hovering/interacting
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % SLIDES.length);
      setActiveHotspotId(null);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentSlideIndex((currentSlideIndex + 1) % SLIDES.length);
    setActiveHotspotId(null);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((currentSlideIndex - 1 + SLIDES.length) % SLIDES.length);
    setActiveHotspotId(null);
  };

  // Subtle 3D mouse parallax movement over the square slide
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -4;
    const tiltY = ((x - centerX) / centerX) * 4;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsPaused(false);
  };

  return (
    <section 
      id="products" 
      style={{ 
        padding: '70px 0 100px', 
        background: 'transparent',
        position: 'relative',
        width: '100%'
      }}
    >
      <div 
        className="container" 
        style={{ 
          maxWidth: '1440px',
          width: '100%',
          padding: '0 32px'
        }}
      >
        
        {/* ========================================================
            1. DYNAMIC SUBCATEGORY TITLE & PARAGRAPH
               (Replaces "Featured Products & Controller Kits")
            ======================================================== */}
        <div style={{ marginBottom: '28px', maxWidth: '1100px', minHeight: '85px' }}>
          <h2 
            key={`title-${currentSlide.id}`}
            style={{ 
              fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', 
              fontWeight: 800,
              lineHeight: 1.2,
              color: '#FFFFFF',
              marginBottom: '10px'
            }}
          >
            {currentSlide.name}
          </h2>
          <p 
            key={`desc-${currentSlide.id}`}
            style={{ 
              fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)', 
              color: 'var(--text-secondary)', 
              lineHeight: 1.6,
              margin: 0
            }}
          >
            {currentSlide.description}
          </p>
        </div>

        {/* ========================================================
            2. EXPANDED FULL-WIDTH SQUARE/WIDE IMAGE ANIMATED SLIDE
               WITH MOVEMENT & OAKYWOOD-STYLE HOTSPOTS ALONE
            ======================================================== */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'relative',
            width: '100%',
            borderRadius: '28px',
            overflow: 'hidden',
            aspectRatio: '16 / 9',
            minHeight: '540px',
            maxHeight: '840px',
            background: '#040711',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 30px 90px -20px rgba(0, 0, 0, 0.85), 0 0 50px rgba(6, 182, 212, 0.08)',
            perspective: '1200px',
            userSelect: 'none'
          }}
        >
          {/* Animated 3D Parallax Tilt Canvas */}
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.015)`,
              transition: 'transform 0.18s ease-out',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* The Main Showcase Image with Ken Burns Movement */}
            <img
              key={currentSlide.image}
              src={currentSlide.image}
              alt={currentSlide.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                animation: 'ken-burns 16s ease-in-out infinite alternate',
                filter: 'contrast(1.03) brightness(0.97)'
              }}
            />

            {/* Subtle cinematic gradient vignette */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(7, 11, 18, 0.04) 0%, rgba(7, 11, 18, 0.4) 100%)',
                pointerEvents: 'none'
              }}
            />

            {/* ========================================================
                INTERACTIVE HOTSPOT PINS (Oakywood Desk Concept)
                ======================================================== */}
            {currentSlide.hotspots.map((hotspot) => {
              const isActive = activeHotspotId === hotspot.id;
              const IconComponent = hotspot.icon;

              return (
                <div
                  key={hotspot.id}
                  style={{
                    position: 'absolute',
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isActive ? 60 : 35
                  }}
                >
                  {/* Oakywood-style Pulsing Hotspot Pin */}
                  <button
                    type="button"
                    className={`hotspot-dot ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspotId(isActive ? null : hotspot.id);
                    }}
                    onMouseEnter={() => setActiveHotspotId(hotspot.id)}
                    aria-label={hotspot.title}
                  />

                  {/* Hotspot Floating Tooltip Card */}
                  {isActive && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: 'absolute',
                        left: hotspot.x > 60 ? 'auto' : '36px',
                        right: hotspot.x > 60 ? '36px' : 'auto',
                        top: hotspot.y > 65 ? 'auto' : '-16px',
                        bottom: hotspot.y > 65 ? '-16px' : 'auto',
                        width: '270px',
                        background: 'rgba(8, 14, 28, 0.94)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--accent-cyan)',
                        borderRadius: '16px',
                        padding: '16px 18px',
                        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.85), 0 0 25px rgba(6, 182, 212, 0.25)',
                        zIndex: 70,
                        animation: 'fadeInScale 0.2s ease-out'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <div
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '8px',
                            background: 'rgba(6, 182, 212, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--accent-cyan)',
                            flexShrink: 0
                          }}
                        >
                          <IconComponent size={14} />
                        </div>
                        <span 
                          style={{ 
                            fontSize: '0.88rem', 
                            fontWeight: 700, 
                            color: '#FFFFFF',
                            lineHeight: 1.2
                          }}
                        >
                          {hotspot.title}
                        </span>
                      </div>

                      <p 
                        style={{ 
                          fontSize: '0.8rem', 
                          color: 'var(--text-secondary)', 
                          margin: 0,
                          lineHeight: 1.45 
                        }}
                      >
                        {hotspot.detail}
                      </p>

                      <div 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          marginTop: '12px',
                          paddingTop: '10px',
                          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                          fontSize: '0.74rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-cyan)' }}>
                          <CheckCircle size={13} color="var(--accent-green)" />
                          <span>Verified Feature</span>
                        </div>

                        <button
                          onClick={() => openQuoteModalWithSolution(currentSlide.name)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--accent-amber)',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: 0
                          }}
                        >
                          <span>Inquire</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Slide Navigation Arrow: PREV */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous Slide"
              style={{
                position: 'absolute',
                left: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(10, 16, 30, 0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 35,
                transition: 'all 0.2s ease',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(6, 182, 212, 0.35)';
                e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(10, 16, 30, 0.7)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Slide Navigation Arrow: NEXT */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next Slide"
              style={{
                position: 'absolute',
                right: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(10, 16, 30, 0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 35,
                transition: 'all 0.2s ease',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(6, 182, 212, 0.35)';
                e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(10, 16, 30, 0.7)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <ChevronRight size={24} />
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};
