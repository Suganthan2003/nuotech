import React, { useState } from 'react';
import { COMPANY_INFO, SOLUTION_SECTORS } from '../data/nuoData';
import { 
  Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, 
  ArrowRight, Navigation, Bot 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>(SOLUTION_SECTORS[0].title);
  const [selectedSubItem, setSelectedSubItem] = useState<string>(SOLUTION_SECTORS[0].subItems[0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const currentSectorObj = SOLUTION_SECTORS.find(s => s.title === selectedSector) || SOLUTION_SECTORS[0];

  const handleSectorChange = (title: string) => {
    setSelectedSector(title);
    const sec = SOLUTION_SECTORS.find(s => s.title === title);
    if (sec && sec.subItems.length > 0) {
      setSelectedSubItem(sec.subItems[0]);
    } else {
      setSelectedSubItem('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        message: '' 
      });
    }, 4000);
  };

  return (
    <div style={{ background: '#FFFFFF', color: '#0F172A', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* ---------------------------------------------------- */}
      {/* 1. TOP HERO SECTION: "Our doors are always open!"   */}
      {/* (Exact match to reference screenshot with light BG) */}
      {/* ---------------------------------------------------- */}
      <section 
        style={{ 
          padding: '130px 0 70px', 
          background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
          position: 'relative',
          borderBottom: '1px solid #E2E8F0',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Ambient Background Gradients */}
        <div style={{ position: 'absolute', top: '-120px', left: '-50px', width: '550px', height: '550px', background: 'radial-gradient(circle, rgba(0, 102, 255, 0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255, 153, 0, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1.15fr', gap: '40px', alignItems: 'center' }} className="contact-hero-grid">
            
            {/* Left Column: Text & Buttons */}
            <div>
              {/* Top Pill Badge matching reference image */}
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  background: '#EFF6FF', 
                  border: '1px solid #BFDBFE', 
                  padding: '8px 18px', 
                  borderRadius: '30px', 
                  fontSize: '0.82rem', 
                  fontWeight: 800, 
                  color: '#0066FF', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.8px', 
                  marginBottom: '24px',
                  boxShadow: '0 2px 10px rgba(0, 102, 255, 0.06)'
                }}
              >
                <Bot size={16} color="#0066FF" />
                <span>GET IN TOUCH WITH ENGINEERING EXPERTS</span>
              </div>

              {/* Main Headline */}
              <h1 
                style={{ 
                  fontSize: 'clamp(2.6rem, 4.8vw, 4.2rem)', 
                  fontWeight: 900, 
                  color: '#0F172A', 
                  lineHeight: 1.12, 
                  marginBottom: '20px', 
                  letterSpacing: '-1px' 
                }}
              >
                Our doors are <br />
                <span style={{ color: '#0066FF' }}>always </span>
                <span style={{ color: '#0F172A' }}>open!</span>
              </h1>

              {/* Subtitle */}
              <p style={{ fontSize: '1.12rem', color: '#475569', lineHeight: 1.7, maxWidth: '540px', marginBottom: '36px', fontWeight: 500 }}>
                We welcome industrial partners, agricultural engineers, solar clients, and innovators to consult directly with our technical team. Build your next automated solution with NUO TECH.
              </p>

              {/* Action Buttons Row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                
                {/* Call Button (Solid Blue Pill) */}
                <a 
                  href={`tel:${COMPANY_INFO.phone}`} 
                  style={{ 
                    background: '#0066FF', 
                    color: '#FFFFFF', 
                    fontWeight: 800, 
                    fontSize: '1rem', 
                    padding: '15px 30px', 
                    borderRadius: '40px', 
                    textDecoration: 'none', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    boxShadow: '0 8px 25px rgba(0, 102, 255, 0.35)',
                    transition: 'all 0.25s ease'
                  }}
                  className="btn-call-blue"
                >
                  <Phone size={18} color="#FFFFFF" />
                  <span>{COMPANY_INFO.phone}</span>
                  <ArrowRight size={18} color="#FFFFFF" />
                </a>

                {/* WhatsApp Button (Green Outline Pill) */}
                <a 
                  href={COMPANY_INFO.whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    background: '#FFFFFF', 
                    border: '1.8px solid #25D366', 
                    color: '#25D366', 
                    fontWeight: 800, 
                    fontSize: '1rem', 
                    padding: '15px 30px', 
                    borderRadius: '40px', 
                    textDecoration: 'none', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.12)',
                    transition: 'all 0.25s ease'
                  }}
                  className="btn-whatsapp-outline"
                >
                  <MessageSquare size={18} color="#25D366" />
                  <span>WhatsApp Inquiry</span>
                  <ArrowRight size={18} color="#25D366" />
                </a>

              </div>
            </div>

            {/* Right Column: High-Tech Robot Composition Image */}
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <img 
                src="/img/contact_hero_robots.jpg" 
                alt="NUO TECH Automation Robots & Solar Solutions" 
                style={{ 
                  width: '100%', 
                  maxHeight: '440px', 
                  objectFit: 'contain', 
                  filter: 'drop-shadow(0 15px 30px rgba(15, 23, 42, 0.08))' 
                }} 
              />
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. GOOGLE MAP SECTION (DIRECTLY AFTER HERO SECTION)  */}
      {/* (DARK COLOR THEME WITH BLUE BORDER & GRID OVERLAY)   */}
      {/* ---------------------------------------------------- */}
      <section 
        style={{ 
          padding: '80px 0 75px', 
          background: '#070D1D',
          position: 'relative',
          borderBottom: '1px solid rgba(0, 102, 255, 0.2)' 
        }}
        id="google-map-section"
      >
        {/* Subtle Tech Grid Pattern Background */}
        <div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            backgroundImage: 'linear-gradient(rgba(0, 102, 255, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 102, 255, 0.07) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            opacity: 0.85,
            pointerEvents: 'none'
          }} 
        />

        {/* Ambient Glow Orbs */}
        <div style={{ position: 'absolute', top: '0', left: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0, 102, 255, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0', right: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255, 153, 0, 0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 36px' }}>
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: 'rgba(255, 153, 0, 0.12)', 
                border: '1px solid rgba(255, 153, 0, 0.35)', 
                padding: '6px 16px', 
                borderRadius: '30px', 
                fontSize: '0.82rem', 
                fontWeight: 800, 
                color: '#FF9900', 
                textTransform: 'uppercase', 
                letterSpacing: '1px', 
                marginBottom: '14px' 
              }}
            >
              <Navigation size={14} color="#FF9900" />
              <span>Location & Navigation</span>
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: '14px' }}>
              Find Us on <span style={{ color: '#0066FF' }}>Google </span><span style={{ color: '#FF9900' }}>Maps</span>
            </h2>

            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '0px', fontWeight: 600 }}>
              <strong style={{ color: '#FFFFFF' }}>Address:</strong> {COMPANY_INFO.fullAddress}
            </p>
          </div>

          {/* Map Frame Dark Card Container */}
          <div 
            style={{ 
              borderRadius: '24px', 
              overflow: 'hidden', 
              border: '1.5px solid rgba(0, 102, 255, 0.35)', 
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(0, 102, 255, 0.2)',
              background: '#0B132B'
            }}
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3789.877281103638!2d78.14030707504413!3d10.93337638922508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDU2JzAwLjIiTiA3OMKwMDgnMzQuNCJF!5e1!3m2!1sen!2sin!4v1790999812422!5m2!1sen!2sin" 
              width="100%" 
              height="480" 
              style={{ border: 0, display: 'block' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin"
              title="NUO TECH Google Maps Location"
            />
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. MAIN CONTACT FORM & COMPANY DETAILS SECTION       */}
      {/* (Clean modern side-by-side card layout in logo colors) */}
      {/* ---------------------------------------------------- */}
      <section style={{ padding: '90px 0', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px' }} className="contact-main-grid">
            
            {/* Left Column: Contact Form */}
            <div 
              style={{ 
                background: '#FFFFFF', 
                borderRadius: '28px', 
                padding: '44px 40px', 
                border: '1px solid #E2E8F0', 
                boxShadow: '0 15px 40px rgba(15, 23, 42, 0.05)' 
              }}
            >
              <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#0F172A', marginBottom: '8px' }}>
                Contact Form
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.98rem', marginBottom: '32px' }}>
                Fill in your project requirements below and our engineering team will get back to you promptly.
              </p>

              {submitted ? (
                <div 
                  style={{ 
                    background: '#F0FDF4', 
                    border: '1.5px solid #22C55E', 
                    borderRadius: '20px', 
                    padding: '36px', 
                    textAlign: 'center' 
                  }}
                >
                  <CheckCircle2 size={54} color="#22C55E" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ color: '#0F172A', fontSize: '1.5rem', fontWeight: 900, marginBottom: '8px' }}>
                    Message Sent Successfully!
                  </h3>
                  <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6 }}>
                    Thank you! Your inquiry has been dispatched to NUO TECH engineering department. We will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  
                  {/* Sector & Dynamic Sub-Item Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="contact-form-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#334155', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        What You Would Like *
                      </label>
                      <select
                        value={selectedSector}
                        onChange={(e) => handleSectorChange(e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '14px 18px', 
                          borderRadius: '14px', 
                          background: '#F8FAFC', 
                          border: '1.5px solid #CBD5E1', 
                          color: '#0F172A', 
                          fontSize: '0.96rem', 
                          fontWeight: 600,
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {SOLUTION_SECTORS.map((sec) => (
                          <option key={sec.id} value={sec.title}>
                            {sec.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#334155', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Sub-Item / Option *
                      </label>
                      <select
                        value={selectedSubItem}
                        onChange={(e) => setSelectedSubItem(e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '14px 18px', 
                          borderRadius: '14px', 
                          background: '#F8FAFC', 
                          border: '1.5px solid #CBD5E1', 
                          color: '#0F172A', 
                          fontSize: '0.96rem', 
                          fontWeight: 600,
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {currentSectorObj && currentSectorObj.subItems.map((sub, idx) => (
                          <option key={idx} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#334155', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ 
                        width: '100%', 
                        padding: '14px 18px', 
                        borderRadius: '14px', 
                        background: '#F8FAFC', 
                        border: '1.5px solid #CBD5E1', 
                        color: '#0F172A', 
                        fontSize: '0.96rem', 
                        outline: 'none' 
                      }}
                    />
                  </div>

                  {/* Grid for Email & Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="contact-form-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#334155', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ 
                          width: '100%', 
                          padding: '14px 18px', 
                          borderRadius: '14px', 
                          background: '#F8FAFC', 
                          border: '1.5px solid #CBD5E1', 
                          color: '#0F172A', 
                          fontSize: '0.96rem', 
                          outline: 'none' 
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#334155', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ 
                          width: '100%', 
                          padding: '14px 18px', 
                          borderRadius: '14px', 
                          background: '#F8FAFC', 
                          border: '1.5px solid #CBD5E1', 
                          color: '#0F172A', 
                          fontSize: '0.96rem', 
                          outline: 'none' 
                        }}
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#334155', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your project specifications, custom machinery needs, or automation goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ 
                        width: '100%', 
                        padding: '14px 18px', 
                        borderRadius: '14px', 
                        background: '#F8FAFC', 
                        border: '1.5px solid #CBD5E1', 
                        color: '#0F172A', 
                        fontSize: '0.94rem', 
                        outline: 'none', 
                        resize: 'vertical' 
                      }}
                    />
                  </div>

                  {/* Send Message Button in Logo Colors */}
                  <button
                    type="submit"
                    style={{ 
                      background: 'linear-gradient(90deg, #0066FF 0%, #FF9900 100%)', 
                      color: '#FFFFFF', 
                      border: 'none', 
                      padding: '16px 32px', 
                      borderRadius: '30px', 
                      fontSize: '1rem', 
                      fontWeight: 900, 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '10px', 
                      marginTop: '10px', 
                      boxShadow: '0 8px 25px rgba(0, 102, 255, 0.35)', 
                      transition: 'all 0.25s ease' 
                    }}
                    className="btn-send-message"
                  >
                    <span>SEND MESSAGE</span>
                    <Send size={18} />
                  </button>

                </form>
              )}
            </div>

            {/* Right Column: Company Details (NUO TECH) */}
            <div 
              style={{ 
                background: '#0B132B', 
                borderRadius: '28px', 
                padding: '44px 38px', 
                color: '#FFFFFF',
                boxShadow: '0 20px 50px rgba(11, 19, 43, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                {/* Brand Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
                  <img 
                    src="/img/log.png" 
                    alt="NUO TECH Logo" 
                    style={{ height: '48px', width: 'auto', filter: 'drop-shadow(0 0 10px rgba(0, 102, 255, 0.5))' }} 
                  />
                  <div>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, margin: 0, lineHeight: 1 }}>
                      <span style={{ color: '#0066FF' }}>NUO </span>
                      <span style={{ color: '#FF9900' }}>TECH</span>
                    </h3>
                    <div style={{ fontSize: '0.68rem', fontWeight: 900, color: '#38BDF8', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }}>
                      FUTURE BEGINS NOW
                    </div>
                  </div>
                </div>

                <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, #0066FF, #FF9900)', marginBottom: '32px' }} />

                {/* Contact Info List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  
                  {/* Address */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(0, 102, 255, 0.2)', border: '1px solid rgba(0, 102, 255, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={22} color="#0066FF" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#FF9900', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                        Address
                      </div>
                      <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.5 }}>
                        {COMPANY_INFO.fullAddress}
                      </div>
                    </div>
                  </div>

                  {/* Direct Email */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(255, 153, 0, 0.2)', border: '1px solid rgba(255, 153, 0, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={22} color="#FF9900" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                        Direct Us / Email
                      </div>
                      <a 
                        href={`mailto:${COMPANY_INFO.email}`} 
                        style={{ fontSize: '1.02rem', fontWeight: 800, color: '#FFFFFF', textDecoration: 'none' }}
                      >
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>

                  {/* Call Us */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(0, 102, 255, 0.2)', border: '1px solid rgba(0, 102, 255, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={22} color="#0066FF" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#FF9900', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                        Call Us / TEL
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <a 
                          href={`tel:${COMPANY_INFO.phone}`} 
                          style={{ fontSize: '1.02rem', fontWeight: 800, color: '#FFFFFF', textDecoration: 'none' }}
                        >
                          TEL: +91 {COMPANY_INFO.phone}
                        </a>
                        <a 
                          href={`tel:${COMPANY_INFO.whatsapp}`} 
                          style={{ fontSize: '0.92rem', fontWeight: 700, color: '#CBD5E1', textDecoration: 'none' }}
                        >
                          ALT: +91 {COMPANY_INFO.whatsapp}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(37, 211, 102, 0.2)', border: '1px solid rgba(37, 211, 102, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MessageSquare size={22} color="#25D366" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#25D366', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                        WhatsApp Direct
                      </div>
                      <a 
                        href={COMPANY_INFO.whatsappUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ fontSize: '1.02rem', fontWeight: 800, color: '#25D366', textDecoration: 'none' }}
                      >
                        +91 {COMPANY_INFO.whatsapp}
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Social Media Footer inside Card */}
              <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                  Connect With Us
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <a 
                    href={COMPANY_INFO.socials.linkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#0A66C2', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>

                  <a 
                    href={COMPANY_INFO.socials.youtube} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#FF0000', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>

                  <a 
                    href={COMPANY_INFO.socials.facebook} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#1877F2', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Facebook"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  <a 
                    href={COMPANY_INFO.socials.instagram} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(45deg, #F09433 0%, #E6683C 25%, #DC2743 50%, #CC2366 75%, #BC1888 100%)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Hover & Responsive Styles */}
      <style>{`
        @media (max-width: 960px) {
          .contact-hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; text-align: center; }
          .contact-hero-grid p { margin-left: auto; margin-right: auto; }
          .contact-hero-grid div[style*="flex"] { justify-content: center; }
          .contact-main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .contact-form-row { grid-template-columns: 1fr !important; }
        }
        .btn-call-blue:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 102, 255, 0.45) !important;
        }
        .btn-whatsapp-outline:hover {
          background: #25D366 !important;
          color: #FFFFFF !important;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.35) !important;
        }
        .btn-whatsapp-outline:hover svg {
          color: #FFFFFF !important;
        }
        .btn-send-message:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0, 102, 255, 0.5) !important;
        }
      `}</style>
    </div>
  );
};
