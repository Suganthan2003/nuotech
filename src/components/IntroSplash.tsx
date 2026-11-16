import React, { useState, useEffect } from 'react';

interface IntroSplashProps {
  onComplete: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete }) => {
  const [fadingOut, setFadingOut] = useState(false);

  const triggerComplete = React.useCallback(() => {
    setFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  }, [onComplete]);

  useEffect(() => {
    // Automatic timeout
    const timer = setTimeout(() => {
      triggerComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [triggerComplete]);

  const brandLetters = [
    { char: 'S', animClass: 'bounce-from-top-left', delay: '0.1s', isSuffix: false },
    { char: 'M', animClass: 'bounce-from-bottom', delay: '0.2s', isSuffix: false },
    { char: 'A', animClass: 'bounce-from-top-right', delay: '0.3s', isSuffix: false },
    { char: 'R', animClass: 'bounce-from-left', delay: '0.4s', isSuffix: false },
    { char: 'T', animClass: 'bounce-from-center-zoom', delay: '0.5s', isSuffix: false },
    { char: 'o', animClass: 'bounce-from-right', delay: '0.65s', isSuffix: true },
    { char: 'i', animClass: 'bounce-from-bottom-right', delay: '0.8s', isSuffix: true },
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#FFFFFF',
      color: '#0F172A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      opacity: fadingOut ? 0 : 1,
      transform: fadingOut ? 'scale(1.05)' : 'scale(1)',
      transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      pointerEvents: fadingOut ? 'none' : 'auto'
    }}>

      {/* SIMPLE CLEAN WHITE BACKGROUND LIGHTING */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '950px',
        height: '700px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 82, 204, 0.16) 0%, rgba(16, 185, 129, 0.12) 50%, transparent 75%)',
        filter: 'blur(75px)',
        pointerEvents: 'none'
      }} />

      {/* LEFT & RIGHT SIDE SIMPLE ANIMATED CURVED LINES */}
      <svg
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Left Line Gradient */}
          <linearGradient id="leftCurveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0052CC" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#0052CC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
          </linearGradient>

          {/* Right Line Gradient */}
          <linearGradient id="rightCurveGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#0052CC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.1" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="sideGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* LEFT SIDE SIMPLE ANIMATED CURVED LINE */}
        <path
          d="M-80,100 Q280,300 80,850"
          fill="none"
          stroke="url(#leftCurveGrad)"
          strokeWidth="3.5"
          filter="url(#sideGlow)"
          className="left-curved-line-anim"
        />

        {/* RIGHT SIDE SIMPLE ANIMATED CURVED LINE */}
        <path
          d="M1520,100 Q1160,300 1360,850"
          fill="none"
          stroke="url(#rightCurveGrad)"
          strokeWidth="3.5"
          filter="url(#sideGlow)"
          className="right-curved-line-anim"
        />
      </svg>

      {/* MAIN CONTAINER */}
      <div 
        onClick={triggerComplete}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          position: 'relative',
          padding: '0 20px',
          textAlign: 'center',
          cursor: 'pointer',
          width: '100%',
          maxWidth: '1440px'
        }}
      >

        {/* LOGO CENTER ANIMATED CIRCLE BACKDROP LAYER */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '680px',
          height: '420px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: -1
        }}>
          {/* Inner Glowing Soft Aura */}
          <div style={{
            position: 'absolute',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 82, 204, 0.32) 0%, rgba(16, 185, 129, 0.22) 55%, transparent 75%)',
            filter: 'blur(36px)',
            animation: 'logoAuraPulse 3s ease-in-out infinite'
          }} />

          {/* Rotating Animated Circle 1 - Blue & Green Gradient Ring */}
          <div className="center-anim-circle-1" style={{
            position: 'absolute',
            width: '440px',
            height: '440px',
            borderRadius: '50%',
            border: '2px dashed rgba(0, 82, 204, 0.35)',
            boxShadow: '0 0 30px rgba(0, 82, 204, 0.2)'
          }} />

          {/* Counter-Rotating Animated Circle 2 - Smart Green Accent Ring */}
          <div className="center-anim-circle-2" style={{
            position: 'absolute',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            border: '1.5px solid rgba(16, 185, 129, 0.3)',
            boxShadow: '0 0 35px rgba(16, 185, 129, 0.16)'
          }} />

          {/* Expanding Radar Pulse Circle 3 */}
          <div className="center-pulse-circle-3" style={{
            position: 'absolute',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            border: '1.5px solid rgba(0, 82, 204, 0.4)'
          }} />
        </div>

        {/* LARGE BRAND TEXT WITH oi IN VIBRANT POWER GREEN/BLUE GRADIENT */}
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(5rem, 14vw, 11rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 0.95,
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1200px',
          userSelect: 'none'
        }}>
          {brandLetters.map((item, index) => (
            <span
              key={index}
              className={`letter-bounce-node ${item.animClass}`}
              style={{
                animationDelay: item.delay,
                display: 'inline-block',
                background: item.isSuffix
                  ? 'linear-gradient(135deg, #10B981 0%, #00C853 40%, #0052CC 100%)'
                  : 'linear-gradient(135deg, #0052CC 0%, #003A96 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: item.isSuffix 
                  ? 'drop-shadow(0 15px 35px rgba(16, 185, 129, 0.45))' 
                  : 'drop-shadow(0 15px 35px rgba(0, 82, 204, 0.3))'
              }}
            >
              {item.char}
            </span>
          ))}
        </div>

        {/* 3 TAGLINE WORDS: 1st FROM LEFT, 2nd (CENTER) FROM TOP, 3rd FROM RIGHT */}
        <div className="tagline-row" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 'clamp(8px, 2vw, 16px)',
          fontSize: 'clamp(0.82rem, 2.4vw, 1.65rem)',
          color: '#0052CC',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          letterSpacing: 'clamp(0.12em, 0.22em, 0.28em)',
          textTransform: 'uppercase',
          marginBottom: '20px',
          padding: '0 12px',
          maxWidth: '100vw',
          textShadow: '0 4px 18px rgba(0, 82, 204, 0.3)'
        }}>
          {/* 1st Word: INNOVATE (Comes from Left) */}
          <span className="tagline-word tag-from-left" style={{ animationDelay: '1.2s' }}>
            INNOVATE
          </span>

          <span className="tagline-dot" style={{ animationDelay: '1.4s', color: '#10B981' }}>•</span>

          {/* 2nd Word (CENTER): AUTOMATE (Comes from Top) */}
          <span className="tagline-word tag-from-top" style={{ animationDelay: '1.5s', color: '#10B981' }}>
            AUTOMATE
          </span>

          <span className="tagline-dot" style={{ animationDelay: '1.7s', color: '#10B981' }}>•</span>

          {/* 3rd Word: SUSTAIN (Comes from Right) */}
          <span className="tagline-word tag-from-right" style={{ animationDelay: '1.8s' }}>
            SUSTAIN
          </span>
        </div>

      </div>

      {/* DYNAMIC KEYFRAME ANIMATIONS */}
      <style>{`
        /* Logo Center Animated Background Circles */
        @keyframes logoAuraPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
        }

        @keyframes rotateCircle1 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .center-anim-circle-1 {
          animation: rotateCircle1 18s linear infinite;
        }

        @keyframes rotateCircle2 {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .center-anim-circle-2 {
          animation: rotateCircle2 24s linear infinite;
        }

        @keyframes pulseExpandCircle {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 0.2; }
          100% { transform: scale(0.8); opacity: 0.8; }
        }
        .center-pulse-circle-3 {
          animation: pulseExpandCircle 5s ease-in-out infinite;
        }

        /* Left & Right Side Curved Lines Flow Motion */
        @keyframes floatLeftLine {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(2deg); }
        }
        .left-curved-line-anim {
          animation: floatLeftLine 7s ease-in-out infinite;
          transform-origin: left center;
        }

        @keyframes floatRightLine {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(18px) rotate(-2deg); }
        }
        .right-curved-line-anim {
          animation: floatRightLine 8s ease-in-out infinite;
          transform-origin: right center;
        }

        /* TAGLINE 3-WORD ANIMATIONS */
        .tagline-word {
          display: inline-block;
          animation-duration: 1s;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
          opacity: 0;
        }

        .tagline-dot {
          display: inline-block;
          animation: tagDotFade 0.6s ease forwards;
          opacity: 0;
        }

        @keyframes tagDotFade {
          0% { opacity: 0; transform: scale(0); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* 1st Word: INNOVATE comes from LEFT */
        .tag-from-left {
          animation-name: anim-tag-left;
        }
        @keyframes anim-tag-left {
          0% { transform: translateX(-220px); opacity: 0; }
          75% { transform: translateX(12px); opacity: 1; }
          100% { transform: translateX(0); opacity: 1; }
        }

        /* 2nd Word (CENTER): AUTOMATE comes from TOP */
        .tag-from-top {
          animation-name: anim-tag-top;
        }
        @keyframes anim-tag-top {
          0% { transform: translateY(-160px); opacity: 0; }
          75% { transform: translateY(10px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }

        /* 3rd Word: SUSTAIN comes from RIGHT */
        .tag-from-right {
          animation-name: anim-tag-right;
        }
        @keyframes anim-tag-right {
          0% { transform: translateX(220px); opacity: 0; }
          75% { transform: translateX(-12px); opacity: 1; }
          100% { transform: translateX(0); opacity: 1; }
        }

        /* Letter Bouncing Animations from Different Directions */
        .letter-bounce-node {
          animation-duration: 1.1s;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
          opacity: 0;
        }

        /* 1. N: Bounces from Top-Left */
        .bounce-from-top-left {
          animation-name: anim-top-left;
        }
        @keyframes anim-top-left {
          0% { transform: translate(-220px, -220px) rotate(-35deg) scale(0.4); opacity: 0; }
          75% { transform: translate(15px, 15px) rotate(5deg) scale(1.1); opacity: 1; }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
        }

        /* 2. U: Bounces from Bottom */
        .bounce-from-bottom {
          animation-name: anim-bottom;
        }
        @keyframes anim-bottom {
          0% { transform: translate(0, 220px) scale(0.4); opacity: 0; }
          75% { transform: translate(0, -15px) scale(1.1); opacity: 1; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }

        /* 3. O: Bounces from Top-Right */
        .bounce-from-top-right {
          animation-name: anim-top-right;
        }
        @keyframes anim-top-right {
          0% { transform: translate(220px, -220px) rotate(35deg) scale(0.4); opacity: 0; }
          75% { transform: translate(-15px, 15px) rotate(-5deg) scale(1.1); opacity: 1; }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
        }

        /* 4. T: Bounces from Left */
        .bounce-from-left {
          animation-name: anim-left;
        }
        @keyframes anim-left {
          0% { transform: translate(-220px, 0) scale(0.4); opacity: 0; }
          75% { transform: translate(15px, 0) scale(1.1); opacity: 1; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }

        /* 5. E: 3D Flip & Zoom Bounce from Center */
        .bounce-from-center-zoom {
          animation-name: anim-center-zoom;
        }
        @keyframes anim-center-zoom {
          0% { transform: scale(0.1) rotateY(180deg); opacity: 0; filter: blur(8px); }
          75% { transform: scale(1.2) rotateY(-10deg); opacity: 1; filter: blur(0); }
          100% { transform: scale(1) rotateY(0deg); opacity: 1; filter: blur(0); }
        }

        /* 6. C: Bounces from Right */
        .bounce-from-right {
          animation-name: anim-right;
        }
        @keyframes anim-right {
          0% { transform: translate(220px, 0) scale(0.4); opacity: 0; }
          75% { transform: translate(-15px, 0) scale(1.1); opacity: 1; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }

        /* 7. H: Bounces from Bottom-Right */
        .bounce-from-bottom-right {
          animation-name: anim-bottom-right;
        }
        @keyframes anim-bottom-right {
          0% { transform: translate(220px, 220px) rotate(-30deg) scale(0.4); opacity: 0; }
          75% { transform: translate(-15px, -15px) rotate(5deg) scale(1.1); opacity: 1; }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
        }

        /* Logo Hero Enter Animation */
        @keyframes logo-hero-enter {
          0% { transform: scale(0.3) translateY(-40px); opacity: 0; }
          70% { transform: scale(1.08) translateY(8px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @media (max-width: 600px) {
          .tagline-row {
            letter-spacing: 0.12em !important;
            font-size: 0.88rem !important;
            gap: 8px !important;
          }
          .tagline-dot {
            margin: 0 2px;
          }
          .center-anim-circle-1,
          .center-anim-circle-2,
          .center-pulse-circle-3 {
            transform: scale(0.7);
          }
        }
      `}</style>
    </div>
  );
};
