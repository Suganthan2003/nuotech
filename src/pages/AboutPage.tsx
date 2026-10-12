import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Zap, Award, Settings, Sun, 
  ArrowRight, Cpu, Users, Eye,
  CircuitBoard, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COMPANY_INFO } from '../data/nuoData';

// ----------------------------------------------------
// Animated Count-Up Component for Hero Quick Stats
// ----------------------------------------------------
const AnimatedHeroStat: React.FC<{ 
  targetNum: number; 
  suffix: string; 
  label: string; 
  color?: string;
  decimals?: number;
  className?: string;
}> = ({ targetNum, suffix, label, color = '#0F172A', decimals = 0, className = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(easeOut * targetNum);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animFrame);
  }, [targetNum]);

  const formattedCount = decimals > 0 ? count.toFixed(decimals) : Math.floor(count);

  return (
    <div className={className}>
      <div style={{ fontSize: '2.1rem', fontWeight: 900, color: color, lineHeight: 1 }}>
        {formattedCount}{suffix}
      </div>
      <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600, marginTop: '4px' }}>
        {label}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// Animated Count-Up Stat Card Component (Section 2 - Scroll Triggered)
// ----------------------------------------------------
const AnimatedStatCard: React.FC<{
  targetNum: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  borderColor: string;
  iconBg: string;
  decimals?: number;
  className?: string;
  isVisible?: boolean;
}> = ({ targetNum, suffix, label, sublabel, icon, borderColor, iconBg, decimals = 0, className = '', isVisible = true }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const duration = 2200;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(easeOut * targetNum);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animFrame);
  }, [targetNum, isVisible]);

  const formattedCount = decimals > 0 ? count.toFixed(decimals) : Math.floor(count);

  return (
    <div 
      style={{ 
        background: '#FFFFFF', 
        border: '1px solid #E2E8F0', 
        borderTop: `4px solid ${borderColor}`,
        borderRadius: '20px', 
        padding: '24px 22px', 
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.18)',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
      className={`story-stat-card ${className}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: borderColor, background: `${borderColor}15`, padding: '4px 10px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Verified
        </span>
      </div>

      <div style={{ fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', fontWeight: 900, color: '#0F172A', lineHeight: 1, marginBottom: '6px', letterSpacing: '-0.5px' }}>
        {formattedCount}{suffix}
      </div>

      <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#1E293B', marginBottom: '4px' }}>
        {label}
      </div>

      <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}>
        {sublabel}
      </div>
    </div>
  );
};

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  // ----------------------------------------------------
  // Scroll-Trigger Observer Refs
  // ----------------------------------------------------
  const storySectionRef = useRef<HTMLDivElement | null>(null);
  const [isStoryVisible, setIsStoryVisible] = useState(false);

  const vmSectionRef = useRef<HTMLDivElement | null>(null);
  const [isVmVisible, setIsVmVisible] = useState(false);

  useEffect(() => {
    const observerOptions = { threshold: 0.15 };

    const storyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsStoryVisible(true);
        }
      });
    }, observerOptions);

    const vmObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVmVisible(true);
        }
      });
    }, observerOptions);

    if (storySectionRef.current) storyObserver.observe(storySectionRef.current);
    if (vmSectionRef.current) vmObserver.observe(vmSectionRef.current);

    return () => {
      if (storySectionRef.current) storyObserver.unobserve(storySectionRef.current);
      if (vmSectionRef.current) vmObserver.unobserve(vmSectionRef.current);
    };
  }, []);

  // ----------------------------------------------------
  // Person Cutout & Staggered Skill Badges (10-Sec Auto Swap)
  // ----------------------------------------------------
  const personLeaders = [
    {
      id: 0,
      name: "Saravanan Kumar",
      role: "Founder & Lead Automation Engineer",
      image: "/img/person1_cutout.png",
      skills: [
        { label: "Industrial Automation", icon: <Cpu size={18} color="#0066FF" />, bg: "rgba(0, 102, 255, 0.12)", border: "rgba(0, 102, 255, 0.3)", offset: "translateX(-15px)" },
        { label: "Solar Energy EPC", icon: <Sun size={18} color="#FF9900" />, bg: "rgba(255, 153, 0, 0.12)", border: "rgba(255, 153, 0, 0.3)", offset: "translateX(30px)" },
        { label: "Custom Machine Building", icon: <Settings size={18} color="#10B981" />, bg: "rgba(16, 185, 129, 0.12)", border: "rgba(16, 185, 129, 0.3)", offset: "translateX(5px)" }
      ]
    },
    {
      id: 1,
      name: "Kavitha Saravanan",
      role: "Co-Founder & Chief Electronics Director",
      image: "/img/person2_cutout.png",
      skills: [
        { label: "IoT & Embedded Robotics", icon: <Zap size={18} color="#0066FF" />, bg: "rgba(0, 102, 255, 0.12)", border: "rgba(0, 102, 255, 0.3)", offset: "translateX(-15px)" },
        { label: "PCB Layout & Hardware", icon: <CircuitBoard size={18} color="#8B5CF6" />, bg: "rgba(139, 92, 246, 0.12)", border: "rgba(139, 92, 246, 0.3)", offset: "translateX(35px)" },
        { label: "Smart AgTech Systems", icon: <Sparkles size={18} color="#10B981" />, bg: "rgba(16, 185, 129, 0.12)", border: "rgba(16, 185, 129, 0.3)", offset: "translateX(5px)" }
      ]
    }
  ];

  const [activePersonIndex, setActivePersonIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // 10-Second Background Auto-Rotation Timer
  useEffect(() => {
    const swapInterval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActivePersonIndex((prev) => (prev === 0 ? 1 : 0));
        setIsFading(false);
      }, 400);
    }, 10000);

    return () => {
      clearInterval(swapInterval);
    };
  }, []);

  const activePerson = personLeaders[activePersonIndex];

  return (
    <div style={{ paddingTop: '0px', fontFamily: 'Inter, system-ui, sans-serif', background: '#FFFFFF', overflow: 'hidden' }}>
      
      {/* ========================================================
          HERO SECTION (Pure White Background + Page Entrance Animations)
         ======================================================== */}
      <section 
        style={{ 
          position: 'relative', 
          padding: '120px 0 85px', 
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ maxWidth: '1260px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '48px', alignItems: 'center' }} className="about-hero-grid">
            
            {/* Left Column: Headline, Subtitle, CTA Buttons & Quick Stats */}
            <div>
              {/* Badge Tag & Main Headline */}
              <div className="hero-title-anim">
                <div 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    background: '#EFF6FF', 
                    border: '1px solid #BFDBFE', 
                    padding: '7px 18px', 
                    borderRadius: '30px', 
                    fontSize: '0.84rem', 
                    fontWeight: 800, 
                    color: '#0066FF', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.8px', 
                    marginBottom: '22px',
                    boxShadow: '0 4px 15px rgba(0, 102, 255, 0.06)'
                  }}
                >
                  <Sparkles size={16} color="#FF9900" />
                  <span>ABOUT NUO TECH ENGINEERING LEADERSHIP</span>
                </div>

                <h1 
                  style={{ 
                    fontSize: 'clamp(2.3rem, 4.2vw, 3.6rem)', 
                    fontWeight: 900, 
                    color: '#0F172A', 
                    lineHeight: 1.15, 
                    marginBottom: '20px', 
                    letterSpacing: '-0.8px' 
                  }}
                >
                  Let's Work Together to <br />
                  <span style={{ color: '#0066FF' }}>Create Wonders </span>
                  <span>with Us</span>
                </h1>
              </div>

              {/* Subtitle */}
              <p 
                style={{ fontSize: '1.14rem', color: '#475569', lineHeight: 1.7, maxWidth: '560px', marginBottom: '36px', fontWeight: 500 }}
                className="hero-sub-anim"
              >
                A visionary engineering team crafting captivating technological wonders through industrial automation, solar EPC energy, and custom machinery. Adept at turning imagination into extraordinary reality.
              </p>

              {/* CTA Action Buttons */}
              <div 
                style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '44px' }}
                className="hero-btn-anim"
              >
                <button 
                  onClick={() => navigate('/contact')}
                  style={{ 
                    background: '#0066FF', 
                    color: '#FFFFFF', 
                    fontWeight: 800, 
                    fontSize: '1rem', 
                    padding: '15px 34px', 
                    borderRadius: '40px', 
                    border: 'none', 
                    cursor: 'pointer', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    boxShadow: '0 8px 25px rgba(0, 102, 255, 0.35)',
                    transition: 'all 0.25s ease'
                  }}
                  className="btn-talk"
                >
                  <span>Let's Talk</span>
                  <ArrowRight size={18} />
                </button>

                <button 
                  onClick={() => navigate('/product')}
                  style={{ 
                    background: '#FFFFFF', 
                    border: '1.8px solid #0F172A', 
                    color: '#0F172A', 
                    fontWeight: 800, 
                    fontSize: '1rem', 
                    padding: '15px 32px', 
                    borderRadius: '40px', 
                    cursor: 'pointer', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    boxShadow: '0 4px 15px rgba(15, 23, 42, 0.06)',
                    transition: 'all 0.25s ease'
                  }}
                  className="btn-start-project"
                >
                  <span>Start Project</span>
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Animated Hero Stat Counters (10+ Years, 150+ Projects, 98% Satisfied) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '40px', borderTop: '1px solid #E2E8F0', paddingTop: '24px', flexWrap: 'wrap' }}>
                <AnimatedHeroStat targetNum={10} suffix="+" label="years experience" color="#0F172A" className="hero-stat-1" />

                <div style={{ width: '1px', height: '36px', background: '#CBD5E1' }} />

                <AnimatedHeroStat targetNum={150} suffix="+" label="projects success" color="#0066FF" className="hero-stat-2" />

                <div style={{ width: '1px', height: '36px', background: '#CBD5E1' }} />

                <AnimatedHeroStat targetNum={98} suffix="%" label="satisfied rate" color="#10B981" className="hero-stat-3" />
              </div>

            </div>

            {/* Right Column: Person Cutout Image & Animated Logo Color Circle Background */}
            <div className="hero-image-anim" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '520px' }}>
              
              {/* Outer Logo Color Glowing Circle Backdrop */}
              <div 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '560px',
                  height: '560px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0, 102, 255, 0.22) 0%, rgba(255, 153, 0, 0.16) 55%, transparent 75%)',
                  filter: 'blur(35px)',
                  pointerEvents: 'none',
                  animation: 'pulseCircle 6s ease-in-out infinite alternate'
                }}
              />

              {/* Central Solid Logo Color Circle Accent */}
              <div 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '480px',
                  height: '480px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.14) 0%, rgba(255, 153, 0, 0.14) 100%)',
                  border: '2.5px solid rgba(0, 102, 255, 0.28)',
                  boxShadow: '0 25px 60px rgba(0, 102, 255, 0.12)',
                  pointerEvents: 'none'
                }}
              />

              {/* Person Cutout Image */}
              <div 
                style={{ 
                  position: 'relative', 
                  zIndex: 5, 
                  textAlign: 'center', 
                  width: '100%', 
                  maxWidth: '440px' 
                }}
              >
                <img 
                  src={activePerson.image} 
                  alt={activePerson.name} 
                  style={{ 
                    width: '100%', 
                    maxHeight: '520px', 
                    objectFit: 'contain', 
                    display: 'block', 
                    margin: '0 auto', 
                    filter: 'drop-shadow(0 20px 40px rgba(15, 23, 42, 0.15))', 
                    opacity: isFading ? 0 : 1, 
                    transform: isFading ? 'scale(0.96) translateY(12px)' : 'scale(1) translateY(0)', 
                    transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' 
                  }} 
                />

                {/* Floating Person Name & Role Pill Badge below Cutout */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    bottom: '-18px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    background: '#0F172A', 
                    color: '#FFFFFF', 
                    padding: '12px 28px', 
                    borderRadius: '35px', 
                    boxShadow: '0 15px 35px rgba(15, 23, 42, 0.3)', 
                    border: '1.5px solid rgba(0, 102, 255, 0.45)', 
                    zIndex: 10, 
                    textAlign: 'center', 
                    whiteSpace: 'nowrap',
                    opacity: isFading ? 0 : 1,
                    transition: 'opacity 0.4s ease'
                  }}
                >
                  <div style={{ fontSize: '0.74rem', fontWeight: 900, color: '#FF9900', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                    ● {activePerson.role}
                  </div>
                  <div style={{ fontSize: '1.12rem', fontWeight: 900, color: '#FFFFFF' }}>
                    {activePerson.name}
                  </div>
                </div>
              </div>

              {/* Floating Skill Badges (Horizontal pills with dynamic angle entrances) */}
              <div 
                style={{ 
                  position: 'absolute', 
                  right: '-40px', 
                  top: '14%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '22px', 
                  zIndex: 8,
                  opacity: isFading ? 0 : 1,
                  transform: isFading ? 'translateX(25px)' : 'translateX(0)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease'
                }}
                className="floating-skill-pills"
              >
                {activePerson.skills.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className={`pill-entrance-${idx + 1}`}
                  >
                    <div 
                      style={{ 
                        transform: skill.offset, 
                        transition: 'transform 0.4s ease' 
                      }}
                    >
                      <div 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '12px', 
                          background: '#FFFFFF', 
                          border: `1.8px solid ${skill.border}`, 
                          padding: '11px 22px', 
                          borderRadius: '35px', 
                          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.1)', 
                          fontSize: '0.92rem', 
                          fontWeight: 800, 
                          color: '#0F172A',
                          animation: `floatClean ${3.2 + idx * 0.8}s ease-in-out infinite alternate`
                        }}
                      >
                        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: skill.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {skill.icon}
                        </div>
                        <span>{skill.label}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          COMPANY STORY & ANIMATED STATS SECTION (Scroll-Triggered Animations + Orange Highlight Text)
         ======================================================== */}
      <section 
        ref={storySectionRef}
        style={{ 
          padding: '90px 0 85px', 
          background: '#0F172A', 
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Background Mesh Glows */}
        <div 
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 153, 0, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 102, 255, 0.14) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }} className="story-grid">
            
            {/* Left Column: Company Story Narrative */}
            <div>
              {/* Badge Tag & Title (Vibrant Orange Accent) */}
              <div className={isStoryVisible ? 'story-title-anim' : 'story-hidden'}>
                <div 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 153, 0, 0.15)',
                    border: '1px solid rgba(255, 153, 0, 0.35)',
                    padding: '6px 18px',
                    borderRadius: '30px',
                    color: '#FF9900',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '16px'
                  }}
                >
                  <Sparkles size={14} color="#FF9900" />
                  <span>OUR STORY & JOURNEY</span>
                </div>

                <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-0.5px' }}>
                  Building Smart Technologies & Automated Systems <span style={{ color: '#FF9900' }}>Since Day One</span>
                </h2>
              </div>

              {/* Story Paragraphs */}
              <div className={isStoryVisible ? 'story-text-anim' : 'story-hidden'}>
                <p style={{ fontSize: '1.06rem', color: '#CBD5E1', lineHeight: 1.75, marginBottom: '20px', fontWeight: 500 }}>
                  NUO TECH was founded with a singular commitment: to solve complex industrial and energy challenges through custom machinery, solar power EPC grids, AgTech drone telemetry, and embedded hardware engineering.
                </p>

                <p style={{ fontSize: '1.02rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: '28px' }}>
                  Headquartered in Karur, Tamil Nadu, our multi-disciplinary engineering team manages design, assembly, firmware development, and 24/7 field maintenance under one roof — ensuring every system delivered performs reliably in demanding field conditions.
                </p>
              </div>

              {/* Pure White Background Quote Banner Box for Innovation */}
              <div 
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: '20px', 
                  padding: '24px 28px', 
                  color: '#0F172A',
                  borderLeft: '6px solid #FF9900',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.28)'
                }}
                className={isStoryVisible ? 'story-quote-anim' : 'story-hidden'}
              >
                <div style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.6, fontStyle: 'italic', marginBottom: '10px', color: '#0F172A' }}>
                  "Innovation is not just what we build, but how reliably it serves our clients every single day across every home, agricultural fields, and solar grids."
                </div>
                <div style={{ fontSize: '0.84rem', color: '#FF9900', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  — NUO TECH ENGINEERING LEADERSHIP
                </div>
              </div>
            </div>

            {/* Right Column: 4 Small Animated Stat Cards (Scroll Triggered) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px' }} className="stats-2x2-grid">
              
              <AnimatedStatCard 
                targetNum={150} 
                suffix="+" 
                label="Satisfied Clients" 
                sublabel="Industrial, Solar & AgTech" 
                icon={<Users size={24} color="#0066FF" />} 
                borderColor="#0066FF" 
                iconBg="rgba(0, 102, 255, 0.1)" 
                className={isStoryVisible ? 'story-card-1' : 'story-hidden'}
                isVisible={isStoryVisible}
              />

              <AnimatedStatCard 
                targetNum={45} 
                suffix="+" 
                label="Products & Solutions" 
                sublabel="Robotics, IoT & Custom PCB" 
                icon={<Cpu size={24} color="#FF9900" />} 
                borderColor="#FF9900" 
                iconBg="rgba(255, 153, 0, 0.1)" 
                className={isStoryVisible ? 'story-card-2' : 'story-hidden'}
                isVisible={isStoryVisible}
              />

              <AnimatedStatCard 
                targetNum={280} 
                suffix="+" 
                label="Turnkey Deployments" 
                sublabel="100% On-Time Field Quality" 
                icon={<Award size={24} color="#10B981" />} 
                borderColor="#10B981" 
                iconBg="rgba(16, 185, 129, 0.1)" 
                className={isStoryVisible ? 'story-card-3' : 'story-hidden'}
                isVisible={isStoryVisible}
              />

              <AnimatedStatCard 
                targetNum={8.5} 
                suffix=" MW+" 
                decimals={1}
                label="Solar Power Capacity" 
                sublabel="Clean Renewable Energy" 
                icon={<Zap size={24} color="#0284C7" />} 
                borderColor="#0284C7" 
                iconBg="rgba(2, 132, 199, 0.1)" 
                className={isStoryVisible ? 'story-card-4' : 'story-hidden'}
                isVisible={isStoryVisible}
              />

            </div>

          </div>

        </div>
      </section>

      {/* ============ OUR VISION & OUR MISSION – DIAGONAL SPLIT (Scroll-Triggered) ============ */}
      <section 
        ref={vmSectionRef}
        style={{ padding: '80px 0 80px', margin: 0, background: '#FFFFFF' }}
      >
        <div className="container" style={{ maxWidth: '90%', margin: '0 auto', padding: '0' }}>

          <div
            className={`vm-wrap ${isVmVisible ? 'vm-entrance-anim' : 'story-hidden'}`}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '870 / 487',
              containerType: 'inline-size',
              background: '#FFFFFF',
              overflow: 'hidden',
              borderRadius: '24px',
              boxShadow: '0 25px 60px rgba(15, 23, 42, 0.12)',
            }}
          >
            {/* Background shapes */}
            <svg
              viewBox="0 0 870 487"
              preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="vmOrange" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="55%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#FFB800" />
                </linearGradient>
                <linearGradient id="vmGrey" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#DCE3EC" />
                  <stop offset="100%" stopColor="#F5F8FC" />
                </linearGradient>
              </defs>

              {/* Mission: light panel */}
              <path
                d="M 695 20 Q 716 4 740 24 L 870 128 V 487 H 118 Z"
                fill="url(#vmGrey)"
              />

              {/* Vision: orange panel */}
              <path
                d="M 0 0 H 655 L 192 398 Q 132 450 84 424 Q 36 396 0 322 Z"
                fill="url(#vmOrange)"
              />
            </svg>

            {/* VISION text */}
            <div style={{ position: 'absolute', left: '6%', top: '13%', width: '34%', color: '#FFFFFF' }}>
              <h2 style={{ margin: 0, fontSize: '5.4cqw', fontWeight: 800, lineHeight: 1.02, textTransform: 'uppercase', color: '#FFFFFF' }}>
                Our<br />Vision
              </h2>
              <p style={{ margin: '1.6cqw 0 0', fontSize: '1.9cqw', lineHeight: 1.45, fontWeight: 500 }}>
                {COMPANY_INFO.vision}
              </p>
            </div>

            {/* Eye icon */}
            <div style={{ position: 'absolute', left: '10.5%', top: '66%', width: '13%' }}>
              <Eye style={{ width: '80%', height: 'auto' }} strokeWidth={2.2} color="#FFFFFF" />
            </div>

            {/* MISSION text */}
            <div style={{ position: 'absolute', right: '5%', top: '25%', width: '38%', color: '#0F172A', textAlign: 'right' }}>
              <h2 style={{ margin: 0, fontSize: '5.4cqw', fontWeight: 800, lineHeight: 1.02, textTransform: 'uppercase', color: '#0F172A' }}>
                Our<br />Mission
              </h2>
              <p style={{ margin: '1.6cqw 0 0', fontSize: '1.9cqw', lineHeight: 1.45, fontWeight: 500, color: '#334155' }}>
                {COMPANY_INFO.mission}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic Angle Entrance Keyframes & Scroll Animations */}
      <style>{`
        .story-hidden {
          opacity: 0 !important;
        }

        .hero-title-anim {
          animation: heroTitleAngle 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-sub-anim {
          animation: heroSubAngle 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
          opacity: 0;
        }
        .hero-btn-anim {
          animation: heroBtnAngle 1s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards;
          opacity: 0;
        }
        .hero-stat-1 {
          animation: heroStatAngle1 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards;
          opacity: 0;
        }
        .hero-stat-2 {
          animation: heroStatAngle2 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
          opacity: 0;
        }
        .hero-stat-3 {
          animation: heroStatAngle3 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards;
          opacity: 0;
        }
        .hero-image-anim {
          animation: heroImageAngle 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          opacity: 0;
        }
        .pill-entrance-1 {
          animation: pillAngle1 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          opacity: 0;
        }
        .pill-entrance-2 {
          animation: pillAngle2 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
          opacity: 0;
        }
        .pill-entrance-3 {
          animation: pillAngle3 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
          opacity: 0;
        }

        /* Scroll-Triggered Story Animations */
        .story-title-anim {
          animation: storyTitleAngle 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
        }
        .story-text-anim {
          animation: storyTextAngle 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }
        .story-quote-anim {
          animation: storyQuoteAngle 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }

        .story-card-1 {
          animation: storyCardAngle1 1s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards;
        }
        .story-card-2 {
          animation: storyCardAngle2 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards;
        }
        .story-card-3 {
          animation: storyCardAngle3 1s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
        }
        .story-card-4 {
          animation: storyCardAngle4 1s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards;
        }
        .vm-entrance-anim {
          animation: vmEntranceAngle 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes heroTitleAngle {
          0% { opacity: 0; transform: translate(-60px, -30px) rotate(-8deg); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes heroSubAngle {
          0% { opacity: 0; transform: translate(-45px, 20px) rotate(-4deg); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes heroBtnAngle {
          0% { opacity: 0; transform: translate(-30px, 25px) rotate(-3deg); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
        }

        @keyframes heroStatAngle1 {
          0% { opacity: 0; transform: translateY(35px) rotate(-6deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        @keyframes heroStatAngle2 {
          0% { opacity: 0; transform: translateY(40px) rotate(5deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        @keyframes heroStatAngle3 {
          0% { opacity: 0; transform: translateY(45px) rotate(-4deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg); }
        }

        @keyframes heroImageAngle {
          0% { opacity: 0; transform: translate(75px, 35px) rotate(10deg) scale(0.9); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
        }

        @keyframes pillAngle1 {
          0% { opacity: 0; transform: translate(90px, -45px) rotate(18deg); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes pillAngle2 {
          0% { opacity: 0; transform: translate(110px, 10px) rotate(-14deg); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes pillAngle3 {
          0% { opacity: 0; transform: translate(85px, 60px) rotate(16deg); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
        }

        @keyframes storyTitleAngle {
          0% { opacity: 0; transform: translate(-60px, -30px) rotate(-7deg); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes storyTextAngle {
          0% { opacity: 0; transform: translate(-45px, 25px) rotate(-4deg); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes storyQuoteAngle {
          0% { opacity: 0; transform: translate(-35px, 40px) rotate(5deg); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
        }

        @keyframes storyCardAngle1 {
          0% { opacity: 0; transform: translate(50px, -30px) rotate(8deg); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes storyCardAngle2 {
          0% { opacity: 0; transform: translate(65px, 30px) rotate(-7deg); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes storyCardAngle3 {
          0% { opacity: 0; transform: translate(45px, 50px) rotate(6deg); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes storyCardAngle4 {
          0% { opacity: 0; transform: translate(75px, 40px) rotate(-8deg); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
        }

        @keyframes vmEntranceAngle {
          0% { opacity: 0; transform: translateY(50px) scale(0.96) rotate(-2deg); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
        }

        @keyframes pulseCircle {
          0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.75; }
          100% { transform: translate(-50%, -50%) scale(1.08); opacity: 1; }
        }
        @keyframes floatClean {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }
        @media (max-width: 960px) {
          .about-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center; }
          .about-hero-grid p { margin-left: auto; margin-right: auto; }
          .about-hero-grid div[style*="flex"] { justify-content: center; }
          .floating-skill-pills { display: none !important; }
        }
        .btn-talk:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 102, 255, 0.45) !important;
        }
        .btn-start-project:hover {
          background: #0F172A !important;
          color: #FFFFFF !important;
        }
      `}</style>

    </div>
  );
};
