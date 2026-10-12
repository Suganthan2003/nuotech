import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/nuoData';
import { 
  Send, CheckCircle2, Cpu, Sun, Radio, Settings, Code, 
  MapPin, Clock, Award, ShieldCheck, X, Sparkles
} from 'lucide-react';

export const CareerSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantPhone, setApplicantPhone] = useState<string>('');
  const [applicantEmail, setApplicantEmail] = useState<string>('');
  const [applicantResumeNote, setApplicantResumeNote] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const categories = [
    'All',
    'CAD / CAM Design',
    'Automation & Robotics',
    'Solar & Energy',
    'Electronics & Hardware',
    'AgTech Drones',
    'Software & IoT'
  ];

  const referencePositions = [
    {
      id: 'cad-cam-eng',
      title: 'CAD/CAM Mechanical',
      fullTitle: 'CAD/CAM Mechanical Design Engineer',
      category: 'CAD / CAM Design',
      department: 'Mechanical & Production Design',
      type: 'Full Time',
      experience: '0 - 2 Years',
      location: 'Karur, Tamil Nadu',
      icon: <Settings size={28} color="#0066FF" />,
      accentColor: '#0066FF',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      skills: ['SolidWorks', 'Fusion 360', 'AutoCAD', 'CAM Toolpathing', 'CNC Machining'],
      summary: 'CAD/CAM design combines Computer-Aided Design (CAD) and Computer-Aided Manufacturing (CAM) to turn digital ideas into physical products for automated machinery.',
      responsibilities: [
        'Create 3D CAD models, assembly drawings, and enclosure designs for custom machines.',
        'Generate CAM CNC toolpaths and G-code for milling, turning, and sheet metal fabrication.',
        'Perform mechanical stress and load simulation for structural integrity.',
        'Coordinate with machine shop technicians to convert digital CAD designs into physical products.'
      ]
    },
    {
      id: 'solar-design-jr',
      title: 'Junior Solar',
      fullTitle: 'Junior Solar Systems Design Engineer',
      category: 'Solar & Energy',
      department: 'Solar Engineering',
      type: 'Full Time',
      experience: '0 - 2 Years',
      location: 'Karur, Tamil Nadu',
      icon: <Sun size={28} color="#E2B049" />,
      accentColor: '#E2B049',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      skills: ['AutoCAD Solar', 'PVsyst / Helioscope', 'Solar Water Heating', 'Electrical SLD'],
      summary: 'Design turnkey solar PV array layouts, solar water heating grids, and single-line electrical diagrams for residential, commercial, and industrial projects.',
      responsibilities: [
        'Create 2D/3D solar module layouts, shadow analysis, and string inverter sizing.',
        'Design solar water heater piping schematics and structural mounting layouts.',
        'Assist senior engineers with solar site energy audits and net-metering documentation.',
        'Calculate energy yield forecasts and bill of materials (BOM) for solar EPC projects.'
      ]
    },
    {
      id: 'bms-eng',
      title: 'Building Management',
      fullTitle: 'Building Management System (BMS) Engineer',
      category: 'Automation & Robotics',
      department: 'BMS & Smart Building Telemetry',
      type: 'Full Time',
      experience: '1 - 4 Years',
      location: 'Karur / Commercial Site Commissioning',
      icon: <ShieldCheck size={28} color="#0066FF" />,
      accentColor: '#0066FF',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      skills: ['BACnet / Modbus', 'HVAC Automation', 'BMS Controller Firmware', 'SCADA / HMI', 'Smart Sensors'],
      summary: 'Design, program, and integrate Building Management Systems (BMS) for HVAC control, energy metering, smart lighting, and commercial facility telemetry.',
      responsibilities: [
        'Design and program BMS controller firmware using BACnet, Modbus RTU/TCP, and KNX protocols.',
        'Integrate HVAC chiller plant controls, smart energy meters, fire safety inputs, and access control.',
        'Develop SCADA / web telemetry dashboards for central facility monitoring and automated alarm notifications.',
        'Perform site testing, sensor calibration, and energy efficiency optimization for commercial smart buildings.'
      ]
    },
    {
      id: 'cad-cam-intern',
      title: 'CAD/CAM Mechanical',
      fullTitle: 'CAD/CAM Mechanical Design Intern',
      category: 'CAD / CAM Design',
      department: 'Design & Prototyping',
      type: 'Internship / Entry Level',
      experience: '0 - 1 Year (Fresher / Intern)',
      location: 'Karur, Tamil Nadu',
      icon: <Sparkles size={28} color="#FF9900" />,
      accentColor: '#FF9900',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      skills: ['AutoCAD', 'SolidWorks Basics', 'Mechanical Drafting', '3D Printing', 'Prototyping'],
      summary: 'Hands-on internship for entry-level mechanical engineering graduates to master CAD modeling, CAM CNC toolpaths, 3D printing, and machine assembly.',
      responsibilities: [
        'Assist senior designers in preparing 2D manufacturing drawings and 3D part models.',
        'Learn CNC toolpath programming and operation of rapid 3D printers for prototype testing.',
        'Support machine assembly technicians in physical fitting and quality inspection.',
        'Maintain digital CAD component libraries and technical documentation.'
      ]
    },
    {
      id: 'emb-iot',
      title: 'Embedded Systems',
      fullTitle: 'Embedded Systems & IoT Hardware Engineer',
      category: 'Electronics & Hardware',
      department: 'R&D & Firmware',
      type: 'Full Time',
      experience: '2 - 4 Years',
      location: 'Karur, Tamil Nadu',
      icon: <Cpu size={28} color="#0066FF" />,
      accentColor: '#0066FF',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      skills: ['ESP32 / STM32', 'C / C++', 'FreeRTOS', 'MQTT / RS485', 'Circuit Design'],
      summary: 'Develop custom microcontroller firmware, industrial sensor interfaces, and IoT telemetry systems.',
      responsibilities: [
        'Write production C/C++ firmware for ESP32 and STM32 microcontroller hardware.',
        'Implement RS485 Modbus, CAN-bus, and MQTT protocols for telemetry gateways.',
        'Conduct hardware-in-the-loop debugging and thermal/voltage stress testing.',
        'Collaborate with PCB layout designers for prototype validation.'
      ]
    },
    {
      id: 'plc-auto',
      title: 'Industrial Automation',
      fullTitle: 'Industrial Automation & PLC Specialist',
      category: 'Automation & Robotics',
      department: 'Industrial Systems',
      type: 'Full Time',
      experience: '3 - 5 Years',
      location: 'Karur / Site Commissioning',
      icon: <Settings size={28} color="#FF9900" />,
      accentColor: '#FF9900',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      skills: ['Siemens / Delta PLC', 'VFD Drives', 'HMI Programming', 'Control Panel Wiring'],
      summary: 'Design, program, and commission custom machine automation panels and industrial control systems.',
      responsibilities: [
        'Develop Ladder Logic / Structured Text programs for Siemens and Delta PLCs.',
        'Design electrical schematic layouts for industrial motor control panels.',
        'Configure VFD drives, servo motors, and sensor feedback loops.',
        'Lead site commissioning and factory acceptance testing (FAT) for manufacturing plants.'
      ]
    },
    {
      id: 'solar-epc',
      title: 'Solar Power',
      fullTitle: 'Solar Power EPC & Thermal Systems Engineer',
      category: 'Solar & Energy',
      department: 'Renewable Energy',
      type: 'Full Time',
      experience: '2 - 5 Years',
      location: 'Karur / Tamil Nadu Field Sites',
      icon: <Sun size={28} color="#E2B049" />,
      accentColor: '#E2B049',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      skills: ['Solar PV & Thermal', 'Inverter Sizing', 'Site Audit', 'Grid Commissioning'],
      summary: 'Lead turnkey solar water heater installations, commercial PV grid designs, and site energy audits.',
      responsibilities: [
        'Perform site energy audits, shadow analysis, and load estimation for commercial solar installations.',
        'Design high-efficiency solar water heating piping grids and PV string configurations.',
        'Supervise civil mounting, cabling, net-metering synchronization, and safety compliance.',
        'Provide post-installation maintenance and performance monitoring support.'
      ]
    },
    {
      id: 'pcb-layout',
      title: 'PCB Layout',
      fullTitle: 'PCB Layout & Hardware Design Engineer',
      category: 'Electronics & Hardware',
      department: 'Hardware R&D',
      type: 'Full Time',
      experience: '1 - 3 Years',
      location: 'Karur, Tamil Nadu',
      icon: <Cpu size={28} color="#0284C7" />,
      accentColor: '#0284C7',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      skills: ['EasyEDA / Altium', 'Multi-Layer PCB', 'SMD Soldering', 'EMI/EMC Testing'],
      summary: 'Design multi-layer PCB schematics, board layouts, and oversee rapid prototyping assembly.',
      responsibilities: [
        'Create high-density 2-layer and 4-layer PCB layouts for industrial control boards.',
        'Generate Gerber files, BOM lists, and coordinate with fabricators for prototype runs.',
        'Perform SMD component hand-soldering, bench testing, and noise troubleshooting.',
        'Optimize board layouts for thermal dissipation and EMC compliance.'
      ]
    },
    {
      id: 'drone-pilot',
      title: 'Autonomous AgTech',
      fullTitle: 'Autonomous AgTech Drone Operator & Instructor',
      category: 'AgTech Drones',
      department: 'Aerial Flight Operations',
      type: 'Full Time',
      experience: '1 - 3 Years',
      location: 'Karur / Namakkal / Udumalaipettai',
      icon: <Radio size={28} color="#10B981" />,
      accentColor: '#10B981',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      skills: ['DGCA License', 'Spraying Drones', 'GPS Flight Planning', 'Telemetry'],
      summary: 'Conduct agricultural drone mapping, crop spraying operations, and train certified pilot trainees.',
      responsibilities: [
        'Operate agricultural spraying drones for precision crop protection across partner farmlands.',
        'Execute autonomous GPS flight path mapping and aerial crop health telemetry.',
        'Instruct student trainees at NUO TECH certified drone pilot training hubs.',
        'Perform routine drone battery management, motor maintenance, and firmware updates.'
      ]
    },
    {
      id: 'fullstack-iot',
      title: 'Full-Stack IoT',
      fullTitle: 'Full-Stack IoT & Web Telemetry Developer',
      category: 'Software & IoT',
      department: 'Software Engineering',
      type: 'Full Time / Hybrid',
      experience: '2 - 4 Years',
      location: 'Karur / Hybrid Remote',
      icon: <Code size={28} color="#8B5CF6" />,
      accentColor: '#8B5CF6',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      skills: ['React / TypeScript', 'Node.js / Python', 'TimescaleDB / MQTT', 'REST APIs'],
      summary: 'Build real-time web telemetry dashboards, IoT device management platforms, and cloud APIs.',
      responsibilities: [
        'Develop responsive web interfaces for monitoring machine status, solar yields, and drone data.',
        'Build scalable backend microservices to ingest live telemetry via MQTT and WebSockets.',
        'Implement authentication, role-based access control, and automated alert notifications.',
        'Integrate cloud databases with hardware sensors for predictive analytics.'
      ]
    }
  ];

  const filteredPositions = activeCategory === 'All'
    ? referencePositions
    : referencePositions.filter(pos => pos.category === activeCategory);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setApplicantName('');
      setApplicantPhone('');
      setApplicantEmail('');
      setApplicantResumeNote('');
      setSelectedJob(null);
    }, 4000);
  };

  return (
    <section id="career" style={{ padding: '80px 0 110px', background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Subtle Black Line Grid Overlay */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.06) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.8,
          pointerEvents: 'none'
        }} 
      />

      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        
        {/* Main Banner Header */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 36px' }}>
          
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0, 102, 255, 0.08)',
              border: '1px solid rgba(0, 102, 255, 0.25)',
              padding: '7px 22px',
              borderRadius: '30px',
              color: '#0066FF',
              fontSize: '0.86rem',
              fontWeight: 800,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}
          >
            <Sparkles size={15} />
            <span>JOIN NUO TECH CAREER CLUB</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', fontWeight: 900, color: '#0F172A', lineHeight: 1.12, marginBottom: '14px', letterSpacing: '-0.5px' }}>
            JOIN <span style={{ color: '#0066FF' }}>NUO TECH CAREER CLUB</span> &amp; GRAB YOUR JOB INFO CARD NOW
          </h2>

          <p style={{ color: '#64748B', fontSize: '1.08rem', lineHeight: 1.65, maxWidth: '800px', margin: '0 auto' }}>
            Click on any hexagon card below to view complete job details, key engineering responsibilities, and fill out your application form directly!
          </p>

        </div>

        {/* Category Filter Pills (Matching Top Filter Row of Reference Image) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#0066FF' : '#FFFFFF',
                color: activeCategory === cat ? '#FFFFFF' : '#334155',
                border: activeCategory === cat ? '1px solid #0066FF' : '1px solid #CBD5E1',
                padding: '9px 22px',
                borderRadius: '30px',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: activeCategory === cat ? '0 6px 18px rgba(0, 102, 255, 0.25)' : '0 2px 6px rgba(0, 0, 0, 0.04)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ========================================================
            HONEYCOMB HEXAGON CARDS GRID
           ======================================================== */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
            gap: '28px', 
            maxWidth: '1280px', 
            margin: '0 auto 60px',
            justifyItems: 'center'
          }}
        >
          {filteredPositions.map((pos) => (
            <div
              key={pos.id}
              onClick={() => setSelectedJob(pos)}
              style={{
                position: 'relative',
                width: '220px',
                height: '260px',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              className="hex-card-node"
            >
              {/* Pointed-Top SVG Hexagon Container with Double Stroke */}
              <svg 
                viewBox="0 0 200 240" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  filter: `drop-shadow(0 10px 22px rgba(15, 23, 42, 0.25))` 
                }}
              >
                <defs>
                  <linearGradient id={`hexCardGrad-${pos.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E293B" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </linearGradient>
                </defs>
                
                {/* Outer Hexagon Fill */}
                <polygon 
                  points="100,6 194,58 194,182 100,234 6,182 6,58" 
                  fill={`url(#hexCardGrad-${pos.id})`}
                  stroke={pos.accentColor}
                  strokeWidth="2.5"
                  className="hex-polygon-stroke"
                />

                {/* Inner Decorative Stroke */}
                <polygon 
                  points="100,12 188,61 188,179 100,228 12,179 12,61" 
                  fill="none"
                  stroke={`${pos.accentColor}35`}
                  strokeWidth="1"
                />
              </svg>

              {/* Inside Hexagon Content (Avatar Profile + Title + Experience Badge) */}
              <div 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '20px 16px',
                  textAlign: 'center',
                  zIndex: 2
                }}
              >
                {/* Profile Avatar Circle with Accent Outline Ring */}
                <div 
                  style={{ 
                    width: '68px', 
                    height: '68px', 
                    borderRadius: '50%', 
                    overflow: 'hidden',
                    border: `2.5px solid ${pos.accentColor}`,
                    marginBottom: '12px',
                    boxShadow: `0 0 18px ${pos.accentColor}60`,
                    background: '#0F172A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {pos.avatar ? (
                    <img src={pos.avatar} alt={pos.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    pos.icon
                  )}
                </div>

                {/* Role Title in Bold White Text */}
                <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, marginBottom: '8px', maxWidth: '170px' }}>
                  {pos.title}
                </h3>

                {/* Experience Pill Badge */}
                <div 
                  style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 800, 
                    color: '#38BDF8', 
                    background: 'rgba(2, 132, 199, 0.25)', 
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    padding: '3px 12px', 
                    borderRadius: '14px',
                    boxShadow: '0 0 10px rgba(56, 189, 248, 0.2)'
                  }}
                >
                  {pos.experience}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================
            COMPLETE JOB DETAILS & APPLICATION FORM MODAL (CLICK TO VIEW & FILL)
           ======================================================== */}
        {selectedJob && (
          <div 
            style={{ 
              position: 'fixed', 
              inset: 0, 
              background: 'rgba(15, 23, 42, 0.75)', 
              backdropFilter: 'blur(8px)', 
              zIndex: 1000, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '20px' 
            }}
          >
            <div 
              style={{ 
                background: '#0B132B', 
                borderRadius: '24px', 
                maxWidth: '720px', 
                width: '100%', 
                maxHeight: '92vh', 
                overflowY: 'auto', 
                padding: '36px', 
                position: 'relative',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 102, 255, 0.25)',
                color: '#FFFFFF',
                border: '1.5px solid rgba(0, 102, 255, 0.35)'
              }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedJob(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFFFFF' }}
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(0, 102, 255, 0.2)', border: '1px solid rgba(0, 102, 255, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedJob.icon}
                </div>
                <div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    {selectedJob.department}
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFFFFF', margin: 0, lineHeight: 1.2 }}>
                    {selectedJob.fullTitle || selectedJob.title}
                  </h3>
                </div>
              </div>

              {/* Professional Meta Badges in Logo Colors */}
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.88rem', color: '#CBD5E1', fontWeight: 600, marginBottom: '22px', background: '#0F172A', padding: '12px 18px', borderRadius: '14px', flexWrap: 'wrap', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={16} color="#0066FF" />
                  <span>Location: <strong style={{ color: '#FFF' }}>{selectedJob.location}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={16} color="#FF9900" />
                  <span>Type: <strong style={{ color: '#FFF' }}>{selectedJob.type}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={16} color="#10B981" />
                  <span>Experience: <strong style={{ color: '#FFF' }}>{selectedJob.experience}</strong></span>
                </div>
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0066FF', marginBottom: '10px' }}>Job Overview &amp; Summary:</h4>
              <p style={{ color: '#94A3B8', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '20px' }}>
                {selectedJob.summary}
              </p>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0066FF', marginBottom: '10px' }}>Key Engineering Responsibilities:</h4>
              <ul style={{ paddingLeft: '22px', color: '#94A3B8', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '28px' }}>
                {selectedJob.responsibilities.map((resp: string, idx: number) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{resp}</li>
                ))}
              </ul>

              {/* DIRECT APPLICATION FORM (FILL & SUBMIT IN LOGO COLORS) */}
              <div style={{ background: '#0F172A', border: '1.5px solid rgba(0, 102, 255, 0.35)', borderRadius: '20px', padding: '28px' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#FFFFFF', marginBottom: '6px' }}>
                  Fill Information &amp; Apply for {selectedJob.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Fill out your application details below or email your resume to <strong style={{ color: '#FF9900' }}>{COMPANY_INFO.email}</strong>
                </p>

                {submitted ? (
                  <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', borderRadius: '16px', padding: '24px', textAlign: 'center', color: '#34D399' }}>
                    <CheckCircle2 size={42} style={{ color: '#10B981', margin: '0 auto 10px' }} />
                    <h5 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0 }}>Application Successfully Submitted!</h5>
                    <p style={{ fontSize: '0.9rem', margin: '6px 0 0' }}>Thank you {applicantName}. Our HR team will review your application and contact you.</p>
                  </div>
                ) : (
                  <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Enter your full name" 
                        value={applicantName} 
                        onChange={(e) => setApplicantName(e.target.value)} 
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: '#0B132B', border: '1px solid rgba(0, 102, 255, 0.4)', color: '#FFFFFF', fontSize: '0.94rem', outline: 'none' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Phone Number *</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="+91 98765 43210" 
                          value={applicantPhone} 
                          onChange={(e) => setApplicantPhone(e.target.value)} 
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: '#0B132B', border: '1px solid rgba(0, 102, 255, 0.4)', color: '#FFFFFF', fontSize: '0.94rem', outline: 'none' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Email Address *</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="name@example.com" 
                          value={applicantEmail} 
                          onChange={(e) => setApplicantEmail(e.target.value)} 
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: '#0B132B', border: '1px solid rgba(0, 102, 255, 0.4)', color: '#FFFFFF', fontSize: '0.94rem', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Brief Note / Portfolio / LinkedIn Link (Optional)</label>
                      <textarea 
                        rows={3} 
                        placeholder="Tell us about your technical experience or paste portfolio link..." 
                        value={applicantResumeNote} 
                        onChange={(e) => setApplicantResumeNote(e.target.value)} 
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: '#0B132B', border: '1px solid rgba(0, 102, 255, 0.4)', color: '#FFFFFF', fontSize: '0.92rem', outline: 'none', resize: 'vertical' }}
                      />
                    </div>

                    <button 
                      type="submit" 
                      style={{ background: '#FF9900', color: '#000000', border: 'none', padding: '14px', borderRadius: '30px', fontSize: '0.96rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px', boxShadow: '0 8px 25px rgba(255, 153, 0, 0.4)' }}
                    >
                      <Send size={16} color="#000000" />
                      <span>Apply Now</span>
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

      <style>{`
        .hex-card-node:hover {
          transform: translateY(-8px) scale(1.06);
        }
        .hex-card-node:hover .hex-polygon-stroke {
          stroke-width: 3.5;
          filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.8));
        }
      `}</style>
    </section>
  );
};

export default CareerSection;
