import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { COMPANY_INFO } from '@/data/nuoData';
import { submitToGoogleScript, fileToBase64 } from '@/services/formService';
import {
  Send, Cpu, Sun, Radio, Settings, Code,
  MapPin, Clock, Award, ShieldCheck, X,
  User, Phone, Mail, UploadCloud, FileText, ArrowRight, Wrench, Loader2
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  fullTitle: string;
  category: string;
  department: string;
  type: string;
  experience: string;
  location: string;
  icon: React.ReactNode;
  accentColor: string;
  avatar: string;
  skills: string[];
  summary: string;
  responsibilities: string[];
}

export const CareerSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantPhone, setApplicantPhone] = useState<string>('');
  const [applicantEmail, setApplicantEmail] = useState<string>('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');
  const [dragOver, setDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
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

  const referencePositions: Job[] = [
    {
      id: 'cad-cam-eng',
      title: 'CAD/CAM Mechanical',
      fullTitle: 'CAD/CAM Mechanical Design Engineer',
      category: 'CAD / CAM Design',
      department: 'Mechanical & Production Design',
      type: 'Full Time',
      experience: '0 - 2 Years',
      location: 'Karur, Tamil Nadu',
      icon: <Settings size={28} />,
      accentColor: '#0B63CE',
      avatar: '/img/1.png',
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
      icon: <Sun size={28} />,
      accentColor: '#E2A21F',
      avatar: '/img/2.png',
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
      icon: <ShieldCheck size={28} />,
      accentColor: '#14307F',
      avatar: '/img/3.png',
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
      icon: <Award size={28} />,
      accentColor: '#F28C0F',
      avatar: '/img/4.png',
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
      icon: <Cpu size={28} />,
      accentColor: '#0B63CE',
      avatar: '/img/5.png',
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
      icon: <Settings size={28} />,
      accentColor: '#F28C0F',
      avatar: '/img/6.png',
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
      icon: <Sun size={28} />,
      accentColor: '#E2A21F',
      avatar: '/img/7.png',
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
      icon: <Cpu size={28} />,
      accentColor: '#0284C7',
      avatar: '/img/8.png',
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
      icon: <Radio size={28} />,
      accentColor: '#3BAA35',
      avatar: '/img/9.png',
      skills: ['DGCA License', 'Spraying Drones', 'GPS Flight Planning', 'Telemetry'],
      summary: 'Conduct agricultural drone mapping, crop spraying operations, and train certified pilot trainees.',
      responsibilities: [
        'Operate agricultural spraying drones for precision crop protection across partner farmlands.',
        'Execute autonomous GPS flight path mapping and aerial crop health telemetry.',
        'Instruct student trainees at SMARToi certified drone pilot training hubs.',
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
      icon: <Code size={28} />,
      accentColor: '#7C5CE0',
      avatar: '/img/10.png',
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

  const filteredPositions =
    activeCategory === 'All'
      ? referencePositions
      : referencePositions.filter((pos) => pos.category === activeCategory);

  const MAX_FILE_MB = 5;
  const ALLOWED_EXT = ['pdf', 'doc', 'docx'];

  const pickFile = (file: File | null | undefined) => {
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXT.includes(ext)) {
      setFileError('Please upload a PDF, DOC or DOCX file.');
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(`File is too large. Maximum size is ${MAX_FILE_MB} MB.`);
      return;
    }
    setFileError('');
    setResumeFile(file);
  };

  const clearFile = () => {
    setResumeFile(null);
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatSize = (b: number) =>
    b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`;

  const resetForm = () => {
    setSubmitted(false);
    setApplicantName('');
    setApplicantPhone('');
    setApplicantEmail('');
    setResumeFile(null);
    setFileError('');
    setDragOver(false);
  };

  const openJob = (job: Job) => {
    resetForm();
    setSelectedJob(job);
  };

  const closeJob = () => {
    setSelectedJob(null);
    resetForm();
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setFileError('Please upload your resume to continue.');
      return;
    }
    if (submitting) return;

    setSubmitting(true);
    setFileError('');

    try {
      // Convert resume file to base64
      const base64Data = await fileToBase64(resumeFile);

      // Submit to Google Apps Script backend
      await submitToGoogleScript({
        formType: 'career',
        role: selectedJob?.fullTitle || selectedJob?.title || 'General Engineering Role',
        name: applicantName,
        email: applicantEmail,
        phone: applicantPhone,
        resumeName: resumeFile.name,
        resumeType: resumeFile.type || 'application/pdf',
        resumeData: base64Data
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting application from job card popup:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Escape to close + lock page scroll while the popup is open
  useEffect(() => {
    if (!selectedJob) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeJob();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJob]);

  return (
    <section id="career" className="cs">
      <style>{css}</style>

      {/* Background: soft grid + brand glows */}
      <span className="cs-orb cs-orb-a" />
      <span className="cs-orb cs-orb-b" />
      <div className="cs-grid-bg" />

      <div className="cs-container">
        {/* ============ Header ============ */}
        <div className="cs-head">
          <div className="cs-badge">
            <span>Join SMARToi Career Club</span>
          </div>

          <h2 className="cs-h2">
            Join <span className="cs-blue">SMARToi</span> <span className="cs-green">Career Club</span>
            <br />
            &amp; grab your job info card now
          </h2>

          <p className="cs-sub">
            Click on any hexagon card below to view complete job details, key engineering
            responsibilities, and fill out your application form directly!
          </p>
        </div>

        {/* ============ Filters ============ */}
        <div className="cs-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cs-pill ${activeCategory === cat ? 'is-active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ============ Hexagon cards ============ */}
        <div className="cs-hex-grid" key={activeCategory}>
          {filteredPositions.map((pos, i) => (
            <div
              key={pos.id}
              className="cs-hex-wrap"
              style={{ ['--i' as string]: i, ['--c' as string]: pos.accentColor }}
            >
              <button className="cs-hex" onClick={() => openJob(pos)} aria-label={`View ${pos.fullTitle}`}>
                <svg viewBox="0 0 200 240" className="cs-hex-svg" aria-hidden="true">
                  <defs>
                    <linearGradient id={`csHex-${pos.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#EFF5FF" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="100,6 194,58 194,182 100,234 6,182 6,58"
                    fill={`url(#csHex-${pos.id})`}
                    stroke={pos.accentColor}
                    strokeWidth="2.5"
                    className="cs-hex-outer"
                  />
                  <polygon
                    points="100,13 187,62 187,178 100,227 13,178 13,62"
                    fill="none"
                    stroke={pos.accentColor}
                    strokeOpacity="0.25"
                    strokeWidth="1"
                  />
                </svg>

                <span className="cs-hex-content">
                  <span className="cs-avatar">
                    <img src={pos.avatar} alt={pos.title} loading="lazy" />
                  </span>
                  <span className="cs-hex-title">{pos.title}</span>
                  <span className="cs-hex-exp">{pos.experience}</span>
                  <span className="cs-hex-cta">
                    View &amp; apply <ArrowRight size={13} />
                  </span>
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          FULL-PAGE POPUP: job details (left) + apply form (right)
         ======================================================== */}
      {selectedJob && createPortal(
        <div className="cs-m-overlay" onClick={closeJob}>
          <span className="cs-m-blob cs-m-blob-a" />
          <span className="cs-m-blob cs-m-blob-b" />

          <div
            className="cs-m-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Apply for ${selectedJob.fullTitle}`}
            style={{ ['--c' as string]: selectedJob.accentColor }}
          >
            <button className="cs-m-close" onClick={closeJob} aria-label="Close" type="button">
              <X size={20} />
            </button>

            {/* Logo top-centre */}
            <div className="cs-m-top">
              <img src="/img/logos.jpeg" alt="SMARToi logo" className="cs-m-logo" />
            </div>

            <div className="cs-m-grid">
              {/* ===== LEFT: all job details ===== */}
              <div className="cs-m-left">
                <div className="cs-m-titlebox">
                  <span className="cs-m-icon">{selectedJob.icon}</span>
                  <div>
                    <span className="cs-m-dept">{selectedJob.department}</span>
                    <h3 className="cs-m-title">{selectedJob.fullTitle}</h3>
                  </div>
                </div>

                <div className="cs-m-meta">
                  <div className="cs-m-meta-item cs-mi-blue">
                    <MapPin size={18} />
                    <span><small>Location</small><b>{selectedJob.location}</b></span>
                  </div>
                  <div className="cs-m-meta-item cs-mi-orange">
                    <Clock size={18} />
                    <span><small>Type</small><b>{selectedJob.type}</b></span>
                  </div>
                  <div className="cs-m-meta-item cs-mi-green">
                    <Award size={18} />
                    <span><small>Experience</small><b>{selectedJob.experience}</b></span>
                  </div>
                </div>

                <div className="cs-m-block">
                  <h4 className="cs-m-h4">Job Overview &amp; Summary</h4>
                  <p className="cs-m-summary">{selectedJob.summary}</p>
                </div>

                <div className="cs-m-block">
                  <h4 className="cs-m-h4">Key Skills</h4>
                  <div className="cs-m-skills">
                    {selectedJob.skills.map((s) => (
                      <span key={s} className="cs-m-skill">
                        <Wrench size={13} /> {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="cs-m-block">
                  <h4 className="cs-m-h4">Key Engineering Responsibilities</h4>
                  <ul className="cs-m-list">
                    {selectedJob.responsibilities.map((resp, idx) => (
                      <li key={idx} style={{ ['--i' as string]: idx }}>
                        <span className="cs-m-num">{String(idx + 1).padStart(2, '0')}</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ===== RIGHT: application form ===== */}
              <div className="cs-m-right">
                <div className="cs-m-formcard">
                  {submitted ? (
                    <div className="cs-success">
                      <svg className="cs-tick" viewBox="0 0 52 52" aria-hidden="true">
                        <circle cx="26" cy="26" r="24" />
                        <path d="M14 27l8 8 16-17" />
                      </svg>
                      <h4>Application submitted!</h4>
                      <p>
                        Thank you <b>{applicantName}</b>. Our HR team will review your application for{' '}
                        <b className="cs-blue">{selectedJob.title}</b> and contact you soon.
                      </p>
                      <button type="button" className="cs-btn cs-btn-auto" onClick={closeJob}>
                        Close window
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="cs-m-formhead">
                        <h4>Fill information &amp; apply</h4>
                        <span className="cs-m-for">{selectedJob.title}</span>
                        <p>
                          Fill out your application details below or email your resume to{' '}
                          <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
                        </p>
                      </div>

                      <form onSubmit={handleApply} className="cs-form">
                        <label className="cs-f" style={{ ['--i' as string]: 0 }}>
                          <span className="cs-label">Full Name *</span>
                          <div className="cs-box">
                            <User size={18} />
                            <input
                              type="text"
                              required
                              autoComplete="name"
                              placeholder="Enter your full name"
                              value={applicantName}
                              onChange={(e) => setApplicantName(e.target.value)}
                            />
                          </div>
                        </label>

                        <label className="cs-f" style={{ ['--i' as string]: 1 }}>
                          <span className="cs-label">Phone Number *</span>
                          <div className="cs-box">
                            <Phone size={18} />
                            <input
                              type="tel"
                              required
                              inputMode="numeric"
                              pattern="[0-9]{10}"
                              maxLength={10}
                              autoComplete="tel"
                              placeholder="10-digit mobile number"
                              value={applicantPhone}
                              onChange={(e) => setApplicantPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            />
                          </div>
                        </label>

                        <label className="cs-f" style={{ ['--i' as string]: 2 }}>
                          <span className="cs-label">Email Address *</span>
                          <div className="cs-box">
                            <Mail size={18} />
                            <input
                              type="email"
                              required
                              autoComplete="email"
                              placeholder="name@example.com"
                              value={applicantEmail}
                              onChange={(e) => setApplicantEmail(e.target.value)}
                            />
                          </div>
                        </label>

                        <div className="cs-f cs-upload" style={{ ['--i' as string]: 3 }}>
                          <span className="cs-label">Upload Resume *</span>

                          {!resumeFile ? (
                            <label
                              className={`cs-drop ${dragOver ? 'is-over' : ''} ${fileError ? 'has-error' : ''}`}
                              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                              onDragLeave={() => setDragOver(false)}
                              onDrop={(e) => {
                                e.preventDefault();
                                setDragOver(false);
                                pickFile(e.dataTransfer.files?.[0]);
                              }}
                            >
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={(e) => pickFile(e.target.files?.[0])}
                              />
                              <span className="cs-drop-icon"><UploadCloud size={28} /></span>
                              <b>Click to choose a file or drag it here</b>
                              <small>PDF, DOC or DOCX, up to {MAX_FILE_MB} MB</small>
                            </label>
                          ) : (
                            <div className="cs-file">
                              <span className="cs-file-icon"><FileText size={22} /></span>
                              <span className="cs-file-meta">
                                <b>{resumeFile.name}</b>
                                <small>{formatSize(resumeFile.size)}</small>
                              </span>
                              <button type="button" className="cs-file-x" onClick={clearFile} aria-label="Remove file">
                                <X size={18} />
                              </button>
                            </div>
                          )}

                          {fileError && <p className="cs-file-error" role="alert">{fileError}</p>}
                        </div>

                        <button type="submit" disabled={submitting} className="cs-btn cs-submit" style={{ ['--i' as string]: 4, ...(submitting ? { opacity: 0.75, cursor: 'not-allowed' } : {}) }}>
                          {submitting ? (
                            <>
                              <Loader2 size={17} className="cs-spin" />
                              <span>Submitting Application...</span>
                            </>
                          ) : (
                            <>
                              <Send size={17} />
                              <span>Apply Now</span>
                            </>
                          )}
                        </button>

                        <p className="cs-secure" style={{ ['--i' as string]: 5 }}>
                          <ShieldCheck size={15} /> Your details are kept confidential and used only for hiring.
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

// ----------------------------------------------------
// Styles
// ----------------------------------------------------
const css = `
.cs, .cs-m-overlay {
  --navy: #14307F;
  --blue: #0B63CE;
  --green: #3BAA35;
  --ink: #0F1F4D;
  font-family: 'Barlow', system-ui, -apple-system, 'Segoe UI', sans-serif;
}
.cs-m-overlay, .cs-m-overlay *, .cs-m-overlay *::before, .cs-m-overlay *::after { box-sizing: border-box; }
.cs-m-overlay button, .cs-m-overlay input, .cs-m-overlay textarea { font-family: inherit; }
.cs-m-overlay :focus-visible { outline: 3px solid rgba(11, 99, 206, 0.45); outline-offset: 2px; }
.cs-spin { animation: csSpin 1s linear infinite; }
@keyframes csSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.cs-m-overlay .cs-blue { color: var(--blue); }
.cs {
  position: relative;
  padding: 90px 0 110px;
  overflow: hidden;
  isolation: isolate;
  font-family: 'Barlow', system-ui, -apple-system, 'Segoe UI', sans-serif;
  background: linear-gradient(180deg, #FFFFFF 0%, #F3F8FF 60%, #F2FAF4 100%);
}
.cs *, .cs *::before, .cs *::after { box-sizing: border-box; }
.cs button, .cs input, .cs textarea { font-family: inherit; }
.cs :focus-visible { outline: 3px solid rgba(11, 99, 206, 0.45); outline-offset: 2px; }

.cs-orb { position: absolute; z-index: 0; border-radius: 50%; filter: blur(80px); pointer-events: none; }
.cs-orb-a { width: 520px; height: 520px; left: -150px; top: -120px; background: radial-gradient(circle, rgba(11, 99, 206, 0.2), transparent 70%); animation: csOrbA 15s ease-in-out infinite alternate; }
.cs-orb-b { width: 540px; height: 540px; right: -150px; bottom: -150px; background: radial-gradient(circle, rgba(59, 170, 53, 0.22), transparent 70%); animation: csOrbB 18s ease-in-out infinite alternate; }
.cs-grid-bg {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image: linear-gradient(rgba(11, 99, 206, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(11, 99, 206, 0.06) 1px, transparent 1px);
  background-size: 40px 40px;
  -webkit-mask-image: radial-gradient(ellipse at center, #000 35%, transparent 80%);
  mask-image: radial-gradient(ellipse at center, #000 35%, transparent 80%);
  animation: csGrid 12s linear infinite;
}
.cs-container { position: relative; z-index: 2; width: 100%; max-width: 1360px; margin: 0 auto; padding: 0 24px; }
.cs-blue { color: var(--blue); }
.cs-green { color: var(--green); }

/* ---------- Header ---------- */
.cs-head { max-width: 880px; margin: 0 auto 34px; text-align: center; }
.cs-badge {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 8px 22px; margin-bottom: 18px;
  font-size: 0.84rem; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--blue); background: rgba(11, 99, 206, 0.08);
  border: 1px solid rgba(11, 99, 206, 0.25); border-radius: 999px;
}
.cs-badge svg { animation: csSpin 8s linear infinite; }
.cs-h2 { margin: 0 0 16px; font-size: clamp(2rem, 4.2vw, 3.3rem); font-weight: 900; line-height: 1.12; letter-spacing: -0.02em; text-transform: uppercase; color: var(--ink); }
.cs-sub { margin: 0 auto; max-width: 760px; font-size: 1.08rem; line-height: 1.7; color: #64748B; }

/* ---------- Filters ---------- */
.cs-filters { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: 52px; }
.cs-pill {
  padding: 10px 22px; font-size: 0.9rem; font-weight: 700; cursor: pointer;
  color: #334155; background: #fff; border: 1.5px solid #D5E0F0; border-radius: 999px;
  box-shadow: 0 4px 10px rgba(20, 48, 127, 0.05);
  transition: all 0.25s ease;
}
.cs-pill:hover { color: var(--blue); border-color: var(--blue); transform: translateY(-2px); }
.cs-pill.is-active {
  color: #fff; border-color: transparent;
  background: linear-gradient(90deg, var(--blue), var(--green));
  box-shadow: 0 10px 22px rgba(11, 99, 206, 0.3);
}

/* ---------- Hex grid ---------- */
.cs-hex-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 30px; max-width: 1280px; margin: 0 auto; justify-items: center;
}
.cs-hex-wrap { opacity: 0; animation: csHexIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: calc(var(--i) * 0.08s); }
.cs-hex {
  position: relative; display: block; width: 220px; height: 260px; padding: 0;
  background: none; border: 0; cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.cs-hex-svg { width: 100%; height: 100%; display: block; filter: drop-shadow(0 12px 22px rgba(20, 48, 127, 0.16)); transition: filter 0.35s ease; }
.cs-hex-outer { transition: stroke-width 0.3s ease; }
.cs-hex:hover { transform: translateY(-10px) scale(1.06); }
.cs-hex:hover .cs-hex-svg { filter: drop-shadow(0 20px 30px color-mix(in srgb, var(--c) 40%, transparent)); }
.cs-hex:hover .cs-hex-outer { stroke-width: 4; }

.cs-hex-content { position: absolute; inset: 0; z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px 18px; text-align: center; }
.cs-avatar {
  display: block; width: 70px; height: 70px; margin-bottom: 11px; overflow: hidden;
  border-radius: 50%; border: 3px solid var(--c); background: #fff;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--c) 15%, white), 0 8px 18px color-mix(in srgb, var(--c) 30%, transparent);
  transition: transform 0.4s ease;
}
.cs-avatar img { display: block; width: 100%; height: 100%; object-fit: cover; }
.cs-hex:hover .cs-avatar { transform: scale(1.1) rotate(-4deg); }
.cs-hex-title { max-width: 160px; margin-bottom: 8px; font-size: 0.95rem; font-weight: 800; line-height: 1.25; color: var(--navy); }
.cs-hex-exp {
  padding: 3px 12px; font-size: 0.72rem; font-weight: 800; color: var(--c);
  background: color-mix(in srgb, var(--c) 10%, white); border: 1px solid color-mix(in srgb, var(--c) 35%, white); border-radius: 999px;
}
.cs-hex-cta {
  display: inline-flex; align-items: center; gap: 4px; margin-top: 9px;
  font-size: 0.74rem; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: var(--c);
  opacity: 0; transform: translateY(6px); transition: opacity 0.3s ease, transform 0.3s ease;
}
.cs-hex:hover .cs-hex-cta { opacity: 1; transform: none; }

/* ---------- Popup (full page, 2 columns) ---------- */
.cs-m-overlay {
  position: fixed; inset: 0; z-index: 9999; display: flex; padding: 14px;
  background:
    radial-gradient(circle at 10% 8%, rgba(11, 99, 206, 0.26), transparent 42%),
    radial-gradient(circle at 92% 92%, rgba(59, 170, 53, 0.26), transparent 42%),
    rgba(238, 245, 255, 0.7);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  animation: csFade 0.25s ease;
}
.cs-m-blob { position: fixed; border-radius: 50%; filter: blur(70px); opacity: 0.45; pointer-events: none; }
.cs-m-blob-a { width: 340px; height: 340px; top: 6%; left: 5%; background: var(--blue); animation: csOrbA 10s ease-in-out infinite alternate; }
.cs-m-blob-b { width: 320px; height: 320px; bottom: 4%; right: 5%; background: var(--green); animation: csOrbB 12s ease-in-out infinite alternate; }

.cs-m-card {
  position: relative; display: flex; flex-direction: column;
  width: 100%; max-width: 1360px; height: min(calc(100vh - 28px), 920px); height: min(calc(100dvh - 28px), 920px);
  margin: auto; overflow: hidden; border-radius: 28px;
  background: rgba(255, 255, 255, 0.92); border: 1px solid rgba(255, 255, 255, 0.95);
  box-shadow: 0 34px 80px rgba(20, 48, 127, 0.26), inset 0 1px 0 #fff;
  backdrop-filter: blur(24px) saturate(150%); -webkit-backdrop-filter: blur(24px) saturate(150%);
  animation: csPop 0.4s cubic-bezier(0.2, 0.9, 0.3, 1.1);
}
.cs-m-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 5px; z-index: 4;
  background: linear-gradient(90deg, #14307F, #0B63CE, #3BAA35, #0B63CE, #14307F); background-size: 250% 100%;
  animation: csShift 6s ease infinite;
}
.cs-m-close {
  position: absolute; top: 18px; right: 18px; z-index: 6; width: 42px; height: 42px;
  display: grid; place-items: center; cursor: pointer; color: #64748B;
  background: #fff; border: 1px solid #E2E8F0; border-radius: 50%; transition: all 0.25s ease;
}
.cs-m-close:hover { color: #fff; background: var(--blue); border-color: var(--blue); transform: rotate(90deg); }

.cs-m-top { flex: none; padding: 20px 24px 12px; text-align: center; border-bottom: 1px solid rgba(11, 99, 206, 0.1); }
.cs-m-logo { display: block; height: 44px; max-width: 70%; margin: 0 auto; object-fit: contain; }

.cs-m-grid { flex: 1; min-height: 0; display: grid; grid-template-columns: 1.15fr 0.85fr; }

/* LEFT */
.cs-m-left {
  min-height: 0; overflow-y: auto; padding: 30px 40px 36px;
  background: radial-gradient(circle at 0% 0%, rgba(11, 99, 206, 0.07), transparent 55%), radial-gradient(circle at 100% 100%, rgba(59, 170, 53, 0.09), transparent 55%), #F8FBFF;
  border-right: 1px solid rgba(11, 99, 206, 0.1);
}
.cs-m-titlebox { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
.cs-m-icon {
  flex: none; width: 56px; height: 56px; display: grid; place-items: center; color: #fff;
  background: linear-gradient(135deg, var(--c), color-mix(in srgb, var(--c) 60%, #14307F));
  border-radius: 18px; box-shadow: 0 12px 24px color-mix(in srgb, var(--c) 35%, transparent);
  animation: csFloat 4s ease-in-out infinite;
}
.cs-m-dept { display: block; margin-bottom: 4px; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c); }
.cs-m-title { margin: 0; font-size: clamp(1.3rem, 2.2vw, 1.8rem); font-weight: 900; line-height: 1.15; letter-spacing: -0.02em; color: var(--navy); }

.cs-m-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
.cs-m-meta-item {
  --m: var(--blue);
  display: flex; align-items: center; gap: 10px; padding: 10px 12px; min-width: 0;
  color: var(--m); background: #fff; border: 1px solid color-mix(in srgb, var(--m) 28%, white); border-radius: 14px;
  box-shadow: 0 8px 18px rgba(20, 48, 127, 0.06); transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.cs-m-meta-item:hover { transform: translateY(-3px); box-shadow: 0 14px 24px color-mix(in srgb, var(--m) 20%, transparent); }
.cs-m-meta-item svg { flex: none; }
.cs-m-meta-item span { display: block; min-width: 0; }
.cs-m-meta-item small { display: block; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #94A3B8; }
.cs-m-meta-item b { display: block; font-size: 0.95rem; font-weight: 700; line-height: 1.3; color: #0F172A; word-break: break-word; }
.cs-mi-blue { --m: #0B63CE; }
.cs-mi-orange { --m: #E8890C; }
.cs-mi-green { --m: #2E9E5B; }

.cs-m-block { margin-bottom: 20px; }
.cs-m-h4 { display: flex; align-items: center; gap: 12px; margin: 0 0 10px; font-size: 0.86rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue); }
.cs-m-h4::after { content: ''; flex: 1; max-width: 90px; height: 2px; background: linear-gradient(90deg, var(--blue), var(--green), transparent); border-radius: 2px; }
.cs-m-summary { margin: 0; padding-left: 16px; border-left: 3px solid var(--green); font-size: 1rem; line-height: 1.6; color: #475569; }

.cs-m-skills { display: flex; flex-wrap: wrap; gap: 8px; }
.cs-m-skill {
  display: inline-flex; align-items: center; gap: 7px; padding: 6px 13px;
  font-size: 0.86rem; font-weight: 700; color: var(--navy);
  background: #fff; border: 1px solid #D5E0F0; border-radius: 999px;
  transition: all 0.25s ease;
}
.cs-m-skill svg { color: var(--green); }
.cs-m-skill:hover { color: #fff; background: linear-gradient(90deg, var(--blue), var(--green)); border-color: transparent; transform: translateY(-3px); }
.cs-m-skill:hover svg { color: #fff; }

.cs-m-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
.cs-m-list li {
  display: flex; align-items: flex-start; gap: 13px; padding: 10px 14px;
  font-size: 0.95rem; line-height: 1.5; color: #334155;
  background: #fff; border: 1px solid #E3EBF7; border-radius: 14px; box-shadow: 0 6px 16px rgba(20, 48, 127, 0.05);
  opacity: 0; animation: csSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: calc(var(--i, 0) * 0.1s + 0.25s);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.cs-m-list li:hover { transform: translateX(6px); border-color: rgba(11, 99, 206, 0.4); box-shadow: 0 14px 26px rgba(11, 99, 206, 0.14); }
.cs-m-num {
  flex: none; width: 30px; height: 30px; display: grid; place-items: center;
  font-size: 0.8rem; font-weight: 800; letter-spacing: 0.04em; color: #fff;
  background: linear-gradient(135deg, var(--blue), var(--green)); border-radius: 10px; transition: transform 0.3s ease;
}
.cs-m-list li:hover .cs-m-num { transform: rotate(-8deg) scale(1.1); }

/* RIGHT */
.cs-m-right { min-height: 0; overflow-y: auto; padding: 30px 40px 36px; background: rgba(255, 255, 255, 0.6); }
.cs-m-formcard { position: relative; padding: 28px 30px 24px; background: #fff; border: 1px solid #E3EBF7; border-radius: 22px; box-shadow: 0 20px 44px rgba(20, 48, 127, 0.1); }
.cs-m-formcard::before { content: ''; position: absolute; top: 0; left: 22px; right: 22px; height: 4px; background: linear-gradient(90deg, var(--blue), var(--green)); border-radius: 0 0 6px 6px; }
.cs-m-formhead { margin-bottom: 14px; }
.cs-m-formhead h4 { margin: 4px 0 8px; font-size: 1.3rem; font-weight: 900; letter-spacing: -0.02em; color: var(--ink); }
.cs-m-for { display: inline-block; max-width: 100%; margin-bottom: 8px; padding: 5px 14px; font-size: 0.9rem; font-weight: 800; color: #fff; background: linear-gradient(90deg, var(--blue), var(--green)); border-radius: 999px; box-shadow: 0 8px 18px rgba(11, 99, 206, 0.25); }
.cs-m-formhead p { margin: 0; font-size: 0.95rem; line-height: 1.6; color: #64748B; }
.cs-m-formhead a { color: var(--blue); font-weight: 700; text-decoration: none; border-bottom: 1.5px solid currentColor; word-break: break-all; transition: color 0.2s; }
.cs-m-formhead a:hover { color: var(--green); }

.cs-form { display: flex; flex-direction: column; gap: 15px; }
.cs-f { display: block; min-width: 0; opacity: 0; animation: csUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: calc(var(--i, 0) * 0.08s + 0.15s); }
.cs-label { display: block; margin-bottom: 7px; font-size: 0.78rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: var(--navy); }
.cs-label em { font-style: normal; font-weight: 600; text-transform: none; letter-spacing: 0; color: #94A3B8; }
.cs-box {
  display: flex; align-items: center; gap: 11px; padding: 0 14px; color: #7B8CAB;
  background: #F6F9FE; border: 1.5px solid #D5E0F0; border-radius: 14px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease, transform 0.25s ease;
}
.cs-box:hover { border-color: #A9C0E6; }
.cs-box:focus-within { color: var(--blue); background: #fff; border-color: var(--blue); box-shadow: 0 0 0 4px rgba(11, 99, 206, 0.13); transform: translateY(-1px); }
.cs-box svg { flex: none; }
.cs-box input { flex: 1; min-width: 0; width: 100%; padding: 13px 0; font-size: 1rem; font-weight: 500; color: #0F172A; background: transparent; border: 0; outline: none; }
.cs-box input::placeholder { color: #94A3B8; font-weight: 400; }

/* Resume upload */
.cs-drop {
  position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  padding: 24px 18px; text-align: center; cursor: pointer;
  background: linear-gradient(135deg, #F4F8FF, #F2FAF3); border: 2px dashed #9DBDF0; border-radius: 16px;
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}
.cs-drop input { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
.cs-drop-icon {
  display: grid; place-items: center; width: 54px; height: 54px; border-radius: 50%; color: #fff;
  background: linear-gradient(135deg, var(--blue), var(--green)); box-shadow: 0 10px 22px rgba(11, 99, 206, 0.3);
  animation: csFloat 3.2s ease-in-out infinite;
}
.cs-drop b { font-size: 1rem; font-weight: 700; color: #0F172A; }
.cs-drop small { font-size: 0.86rem; color: #64748B; }
.cs-drop:hover, .cs-drop.is-over { background: #EAF2FF; border-color: var(--blue); }
.cs-drop.is-over { transform: scale(1.015); }
.cs-drop:focus-within { border-color: var(--blue); box-shadow: 0 0 0 4px rgba(11, 99, 206, 0.13); }
.cs-drop.has-error { border-color: #DC2626; background: #FEF2F2; }
.cs-file { display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: #ECFDF5; border: 1.5px solid #10B981; border-radius: 16px; animation: csUp 0.4s ease both; }
.cs-file-icon { flex: none; width: 44px; height: 44px; display: grid; place-items: center; border-radius: 12px; background: #10B981; color: #fff; }
.cs-file-meta { flex: 1; min-width: 0; }
.cs-file-meta b { display: block; font-size: 0.98rem; font-weight: 700; color: #065F46; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cs-file-meta small { font-size: 0.84rem; color: #047857; }
.cs-file-x { flex: none; width: 34px; height: 34px; display: grid; place-items: center; cursor: pointer; background: #fff; border: 1px solid #A7F3D0; border-radius: 50%; color: #047857; transition: background 0.2s, color 0.2s, transform 0.2s; }
.cs-file-x:hover { background: #DC2626; border-color: #DC2626; color: #fff; transform: rotate(90deg); }
.cs-file-error { margin: 8px 0 0; font-size: 0.9rem; font-weight: 500; color: #DC2626; }

.cs-btn {
  position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; gap: 10px;
  width: 100%; padding: 14px 24px; font-size: 1rem; font-weight: 800; letter-spacing: 0.03em; color: #fff;
  background: linear-gradient(90deg, var(--blue), var(--green)); border: 0; border-radius: 40px; cursor: pointer;
  box-shadow: 0 12px 28px rgba(11, 99, 206, 0.32);
  transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
}
.cs-btn:hover { transform: translateY(-2px); filter: brightness(1.06); box-shadow: 0 16px 34px rgba(59, 170, 53, 0.35); }
.cs-btn:active { transform: translateY(0); }
.cs-btn::after { content: ''; position: absolute; top: 0; bottom: 0; left: -70%; width: 40%; background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.45), transparent); transform: skewX(-20deg); animation: csShine 3.2s ease-in-out 1.2s infinite; }
.cs-submit { margin-top: 4px; opacity: 0; animation: csUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: calc(var(--i, 0) * 0.08s + 0.15s); }
.cs-btn-auto { width: auto; min-width: 190px; margin: 0 auto; }
.cs-secure { display: flex; align-items: center; justify-content: center; gap: 7px; margin: 0; font-size: 0.85rem; color: #64748B; opacity: 0; animation: csUp 0.6s ease forwards; animation-delay: calc(var(--i, 0) * 0.08s + 0.15s); }
.cs-secure svg { flex: none; color: var(--green); }

/* Success */
.cs-success { padding: 40px 6px; text-align: center; animation: csUp 0.6s ease both; }
.cs-tick { display: block; width: 84px; height: 84px; margin: 0 auto 14px; fill: none; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.cs-tick circle { stroke: var(--green); stroke-dasharray: 151; stroke-dashoffset: 151; animation: csDraw 0.7s ease forwards; }
.cs-tick path { stroke: var(--blue); stroke-dasharray: 40; stroke-dashoffset: 40; animation: csDraw 0.5s ease 0.6s forwards; }
.cs-success h4 { margin: 0 0 10px; font-size: 1.55rem; font-weight: 900; color: var(--ink); }
.cs-success p { margin: 0 auto 22px; max-width: 360px; font-size: 1rem; line-height: 1.65; color: #475569; }
.cs-success b { color: var(--ink); }
.cs-success .cs-blue { color: var(--blue); }

/* ---------- Keyframes ---------- */
@keyframes csFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes csPop { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: none; } }
@keyframes csUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
@keyframes csSlide { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: none; } }
@keyframes csHexIn { from { opacity: 0; transform: translateY(40px) scale(0.9); } to { opacity: 1; transform: none; } }
@keyframes csShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
@keyframes csShine { 0% { left: -70%; } 55%, 100% { left: 140%; } }
@keyframes csDraw { to { stroke-dashoffset: 0; } }
@keyframes csSpin { to { transform: rotate(360deg); } }
@keyframes csFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes csGrid { to { background-position: 40px 40px, 40px 40px; } }
@keyframes csOrbA { to { transform: translate(120px, 90px) scale(1.15); } }
@keyframes csOrbB { to { transform: translate(-130px, -70px) scale(1.12); } }

@media (prefers-reduced-motion: reduce) {
  .cs *, .cs *::before, .cs *::after { animation: none !important; transition: none !important; }
  .cs-hex-wrap, .cs-f, .cs-submit, .cs-secure, .cs-m-list li { opacity: 1 !important; transform: none !important; }
  .cs-tick circle, .cs-tick path { stroke-dashoffset: 0 !important; }
}

/* ---------- Responsive ---------- */
@media (max-width: 1100px) {
  .cs-m-left, .cs-m-right { padding: 24px 26px 28px; }
  .cs-m-meta { grid-template-columns: 1fr; }
}
@media (max-width: 900px) {
  /* Single scrolling column on tablets / phones */
  .cs-m-overlay { overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 10px; }
  .cs-m-card { height: auto; max-width: 680px; margin: auto; }
  .cs-m-grid { display: block; }
  .cs-m-left { overflow: visible; border-right: 0; border-bottom: 1px solid rgba(11, 99, 206, 0.1); }
  .cs-m-right { overflow: visible; }
  .cs-m-meta { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 700px) {
  .cs-m-meta { grid-template-columns: 1fr; }
}
/* Short laptop screens: keep the popup compact */
@media (min-width: 901px) and (max-height: 700px) {
  .cs-m-card { height: calc(100dvh - 20px); }
  .cs-m-overlay { padding: 10px; }
  .cs-m-top { padding: 10px 24px 8px; }
  .cs-m-logo { height: 32px; }
}
@media (max-width: 640px) {
  .cs { padding: 64px 0 80px; }
  .cs-container { padding: 0 16px; }
  .cs-filters { gap: 8px; margin-bottom: 38px; }
  .cs-pill { padding: 8px 16px; font-size: 0.84rem; }
  .cs-m-card { border-radius: 22px; }
  .cs-m-top { padding: 18px 16px 10px; }
  .cs-m-logo { height: 34px; }
  .cs-m-left, .cs-m-right { padding: 18px 14px 22px; }
  .cs-m-titlebox { gap: 12px; }
  .cs-m-icon { width: 48px; height: 48px; border-radius: 14px; }
  .cs-m-formcard { padding: 20px 14px 16px; }
  .cs-m-list li { padding: 10px 12px; gap: 11px; font-size: 0.93rem; }
  .cs-m-num { width: 28px; height: 28px; }
  /* 16px stops iOS Safari zooming into inputs */
  .cs-box input { font-size: 16px; }
  .cs-btn-auto { width: 100%; }
  .cs-hex:hover { transform: none; }
}
@media (max-width: 360px) {
  .cs-m-logo { height: 32px; }
}
`;

export default CareerSection;