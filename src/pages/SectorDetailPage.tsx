import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Zap, Bot, Sun, GraduationCap, Cpu, Layers,
  ArrowRight,
  ChevronRight, ChevronLeft, Check, ArrowUpRight
} from 'lucide-react';

interface SubCategoryDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  specs: { label: string; value: string }[];
}

interface SectorPageData {
  id: string;
  number: string;
  title: string;
  category: string;
  accentColor: string;
  tagline: string;
  heroDescription: string;
  image: string;
  heroVideo?: string;
  icon: any;
  overviewPoints: string[];
  subCategories: SubCategoryDetail[];
}

const SECTORS_DATA: Record<string, SectorPageData> = {
  'smart-living': {
    id: 'smart-living',
    number: '01',
    title: 'Smart Living Solutions',
    category: 'HOME & OFFICE AUTOMATION',
    accentColor: '#0066FF',
    icon: Zap,
    tagline: 'Intelligent Touch, App & Voice Space Automation for Modern Living',
    heroDescription: 'Transform residential villas, luxury apartments, and corporate workspaces with our integrated IoT automation architecture. From feather-touch glass switches to automated curtains, energy telemetry, and biometric security, experience seamless intelligence.',
    image: '/img/p1.png',
    heroVideo: '/v/a.mp4',
    overviewPoints: [
      'Retrofittable into existing standard modular wall switch back-boxes',
      'Unified smartphone mobile application (iOS & Android) with local offline Wi-Fi control',
      'Dual-way state feedback, power consumption telemetry, and scheduled automation routines',
      'Compatible with voice assistants (Google Home, Amazon Alexa & Apple Siri Shortcuts)'
    ],
    subCategories: [
      {
        id: 'smart-switches',
        title: 'Smart Switches & Touch Panels',
        tagline: 'Feather-touch capacitive glass panels with dual-color LED backlight',
        description: 'Luxury tempered glass touch switches available in 2, 4, 6, and 8-gang configurations. Engineered with flame-retardant enclosures, high-amperage relays for inductive loads (fans, geysers, ACs), and instant tactile feedback.',
        image: '/img/p1.png',
        features: [
          'Dual-state LED status indicators (Amber active / Cyan standby)',
          'High current 10A-25A Omron/Panasonic grade internal relay switching',
          'Full smartphone app sync + RF 433MHz remote control support',
          'Child safety lock and overload spark protection'
        ],
        specs: [
          { label: 'Operating Voltage', value: '90V - 250V AC, 50/60Hz' },
          { label: 'Glass Material', value: '4mm Scratch-Proof Toughened Glass' },
          { label: 'Connectivity', value: 'Wi-Fi 2.4GHz b/g/n + RF 433MHz' },
          { label: 'Expected Life', value: '100,000+ Mechanical Cycles' }
        ]
      },
      {
        id: 'smart-lights',
        title: 'Smart Lights & Architectural Dimming',
        tagline: 'Tunable white CCT, RGB ambient glow, and automated circadian dimming',
        description: 'Dynamic illumination systems for architectural cove lighting, spotlights, and ambient fixtures. Schedule mood transitions from energizing cool white during morning hours to calming warm amber in the evening.',
        image: '/img/p2.png',
        features: [
          'Smooth flicker-free trailing-edge 0-100% digital dimming',
          'Preset scene activations (Cinema Mode, Dinner Party, Sleep, Reading)',
          'Sunrise & sunset astronomical clock scheduling',
          'Multi-room grouping and master switch synchronization'
        ],
        specs: [
          { label: 'Dimming Type', value: 'Leading/Trailing Edge & PWM 0-10V' },
          { label: 'Color Range', value: 'RGB + CCT (2700K Warm - 6500K Cool)' },
          { label: 'Protocol', value: 'BLE Mesh / Wi-Fi / Zigbee 3.0' },
          { label: 'Energy Savings', value: 'Up to 35% reduction in lighting draw' }
        ]
      },
      {
        id: 'cctv-security',
        title: 'CCTV & AI Vision Surveillance',
        tagline: 'Ultra HD 4K perimeter security with intelligent person/vehicle detection',
        description: 'Commercial and residential video surveillance with optical zoom, night vision color infrared, two-way audio intercoms, and local network video recorder (NVR) with encrypted cloud backup.',
        image: '/img/p3.png',
        features: [
          'Smart AI human, face, and vehicle movement alert zones',
          'Starlight sensor technology for full-color night surveillance',
          'Multi-device remote live streaming with zero latency buffering',
          'Tamper alerts, perimeter tripwire warnings, and siren triggers'
        ],
        specs: [
          { label: 'Resolution', value: '4K Ultra HD (3840 x 2160, 8MP)' },
          { label: 'Field of View', value: '110° Wide Angle with 4x Optical Zoom' },
          { label: 'Storage', value: 'Up to 8TB Local NVR + Cloud Mirroring' },
          { label: 'Weather Rating', value: 'IP67 Dust & Water Immersion Proof' }
        ]
      },
      {
        id: 'smart-door-locks',
        title: 'Smart Biometric Door Locks',
        tagline: 'Keyless multi-factor authentication with anti-peep digital keypads',
        description: 'Heavy-duty mortise biometric locks crafted from aerospace-grade aluminum. Offers swift semiconductor fingerprint unlocking, encrypted RFID cards, dynamic guest PIN codes, and emergency mechanical key overrides.',
        image: '/img/p4.png',
        features: [
          '0.3-second 360-degree Swedish semiconductor fingerprint sensor',
          'One-time OTP passwords for visiting guests, domestic staff, and deliveries',
          'Automated deadbolt engagement with multi-point stainless steel latching',
          'Anti-tamper loud alarm and battery low voltage warning alert'
        ],
        specs: [
          { label: 'Unlock Methods', value: 'Fingerprint, PIN, RFID Card, App, Key' },
          { label: 'Fingerprint Capacity', value: 'Up to 100 User Fingerprints' },
          { label: 'Battery Life', value: '8 x AA (12-14 Months typical usage)' },
          { label: 'Emergency Backup', value: 'Type-C USB external power port' }
        ]
      }
    ]
  },

  'industrial-automation': {
    id: 'industrial-automation',
    number: '02',
    title: 'Industrial Automation',
    category: 'FACTORY SYSTEMS & PANELS',
    accentColor: '#FF9900',
    icon: Bot,
    tagline: 'Heavy-Duty Control Panels, Motor Drives & Automated Field Machines',
    heroDescription: 'End-to-end industrial automation for textile mills, manufacturing plants, agricultural pump grids, and commercial entrances across Tamil Nadu. We engineer robust PLC/SCADA panels, heavy-duty gate actuators, and smart irrigation controllers.',
    image: '/img/a.png',
    heroVideo: '/v/b.mp4',
    overviewPoints: [
      'Tailor-made industrial IP65 powder-coated control panels with Siemens & Schneider switchgear',
      'Automated heavy-duty sliding & swing gate motors supporting loads up to 3500kg',
      'Precision agriculture multi-valve irrigation controllers with live soil telemetry',
      'Hands-on field automation and PLC/SCADA programming training academy'
    ],
    subCategories: [
      {
        id: 'gate-automation',
        title: 'Gate Automation & Barrier Actuators',
        tagline: 'Motorized sliding, swing, and telescopic gate drives for factories & estates',
        description: 'Industrial-grade electromechanical and hydraulic gate drives built for continuous duty cycles. Equipped with safety optical photocells, soft start-stop deceleration, remote key fobs, and mobile GSM intercom triggers.',
        image: '/img/a1.png',
        features: [
          'High-torque oil-bath gear motor with hardened steel drive rack',
          'Infrared safety photo-beams preventing closure on vehicles or pedestrians',
          'Manual mechanical key release lever for emergency power outage operation',
          'Flashing warning strobe lamp and automatic timed closing logic'
        ],
        specs: [
          { label: 'Weight Capacity', value: '500kg to 3500kg heavy industrial gates' },
          { label: 'Operating Speed', value: '12 - 18 meters per minute' },
          { label: 'Duty Cycle', value: '100% Continuous Industrial Duty' },
          { label: 'Protection Rating', value: 'IP55 Weatherproof Aluminum Housing' }
        ]
      },
      {
        id: 'smart-irrigation',
        title: 'Smart Agricultural Irrigation Systems',
        tagline: 'Telemetry-driven multi-zone solenoid valve & pump automation',
        description: 'Autonomous crop irrigation controllers synchronizing submersible pumps with capacitive soil moisture sensors, overhead tank levels, and weather data. Eliminates crop under-watering and reduces farm labor dependencies by 70%.',
        image: '/img/a2.png',
        features: [
          'Multi-zone valve sequencing with programmable flow volume timers',
          'Solar DC pump and 3-phase grid pump synchronization with phase fault cutoff',
          'SMS alerts, GSM remote triggers, and live moisture graph monitoring',
          'Dry-run protection algorithm preventing motor cavitation damage'
        ],
        specs: [
          { label: 'Valve Output', value: '8 to 32 Zone 24VAC / 12VDC Solenoids' },
          { label: 'Sensor Inputs', value: 'Capacitive Moisture, Temp, Float Level' },
          { label: 'Connectivity', value: '4G LTE GSM / GPRS + Wi-Fi' },
          { label: 'Enclosure', value: 'IP65 UV-stabilized Polycarbonate Box' }
        ]
      },
      {
        id: 'custom-panels',
        title: 'Custom Electrical Control Panels & VFDs',
        tagline: 'IP65 industrial motor control centers, PLC racks & soft starters',
        description: 'Custom engineered electrical control panels designed to client mechanical layouts. Assembled with branded contactors, miniature circuit breakers, variable frequency drives (VFDs), and programmable logic controllers.',
        image: '/img/a3.png',
        features: [
          'Overload, phase failure, short-circuit, and voltage surge protection',
          'VFD speed modulation optimizing motor electrical draw by up to 30%',
          'Clear mimic digital instrumentation displays with emergency stop mushroom pushbuttons',
          'Neat DIN-rail terminal routing with heat-shrink ferrule wire numbering'
        ],
        specs: [
          { label: 'Panel Construction', value: '1.6mm / 2.0mm CRCA Sheet Steel' },
          { label: 'Finish', value: '7-Tank Process Pure Polyester Powder Coating' },
          { label: 'Switchgear', value: 'Schneider / Siemens / L&T / ABB' },
          { label: 'Certification', value: 'CPRI Tested Design Guidelines' }
        ]
      },
      {
        id: 'industrial-training',
        title: 'Industrial Automation Training & Lab',
        tagline: 'Practical field automation, SCADA, PLC programming & sensor calibration',
        description: 'Hands-on training curriculum for engineering students, factory technicians, and maintenance managers. Learn industrial wiring, PLC ladder logic, Modbus telemetry, and live troubleshooting on actual hardware testbeds.',
        image: '/img/a4.png',
        features: [
          'Direct practice on Siemens, Delta, and Schneider PLC test benches',
          'SCADA HMI graphical screen development and Modbus sensor integration',
          'VFD parameter tuning, acceleration curves, and relay logic troubleshooting',
          'Internship certification and industrial field visit exposure'
        ],
        specs: [
          { label: 'Course Formats', value: '1-Week Intensive / 1-Month Hands-on Lab' },
          { label: 'Hardware Access', value: '1:1 Student to PLC Workbench Ratio' },
          { label: 'Key Platforms', value: 'Siemens TIA Portal, Delta WPLSoft, Modbus' },
          { label: 'Location', value: 'SMARToi Engineering Facility, Karur, TN' }
        ]
      }
    ]
  },

  'solar-solution': {
    id: 'solar-solution',
    number: '03',
    title: 'Solar Energy Solutions',
    category: 'RENEWABLE POWER & EPC',
    accentColor: '#E2B049',
    icon: Sun,
    tagline: 'Turnkey Solar Power Plants, High-Efficiency BLDC Pumps & Clean Energy',
    heroDescription: 'Reliable photovoltaic solar installations engineered for residences, commercial spinning mills, educational institutions, and agricultural farmlands across South India. Achieve zero electricity bills and complete power independence.',
    image: '/img/b1.png',
    heroVideo: '/v/c.mp4',
    overviewPoints: [
      'Tier-1 Monocrystalline PERC solar panels with 25-year linear power warranty',
      'Direct DC solar BLDC agricultural pump sets eliminating grid tariff costs',
      'Commercial rooftop installations from 10kW to 100kW+ with net-metering subsidy support',
      'All-in-one dusk-to-dawn solar street lighting with lithium iron phosphate batteries'
    ],
    subCategories: [
      {
        id: 'residential-solar',
        title: '1 - 10kW Residential Rooftop Solar',
        tagline: 'Grid-tied, off-grid and hybrid rooftop solar power for independent homes',
        description: 'Turnkey residential rooftop solar systems designed to meet daily household consumption. Generate clean power, export excess units to the TNEB grid via bidirectional net-metering, and enjoy lifetime utility savings.',
        image: '/img/b1.png',
        features: [
          'High-efficiency bifacial / PERC solar panels with >21.5% cell efficiency',
          'Smart transformerless solar string inverter with Wi-Fi power telemetry',
          'Hot-dip galvanized structural mounting frames engineered for high wind zones',
          'Complete assistance for government net-metering approval & subsidy filing'
        ],
        specs: [
          { label: 'System Capacities', value: '1kW, 3kW, 5kW, 8kW, 10kW Sets' },
          { label: 'Annual Generation', value: '~1,500 units per kW annually' },
          { label: 'Payback Period', value: '3.5 to 4.5 Years average ROI' },
          { label: 'Warranty', value: '25-Year Panel Performance / 5-Yr Inverter' }
        ]
      },
      {
        id: 'bldc-pumps',
        title: 'BLDC Solar Agricultural Pump Motors',
        tagline: 'High-torque brushless DC submersible and surface pumps for farmland',
        description: 'Heavy-duty solar pumping systems engineered to operate directly from solar arrays from dawn to dusk without batteries or grid power. Powered by internal MPPT controllers maximizing water output during low sunlight.',
        image: '/img/b2.png',
        features: [
          'High-efficiency permanent magnet brushless DC (BLDC) motor design',
          'Corrosion-resistant stainless steel (SS304/SS316) pump body & impeller',
          'Automatic sun tracking MPPT variable speed operation with soft-start',
          'Built-in dry-run safety shutoff and lightning surge protection'
        ],
        specs: [
          { label: 'Motor Rating', value: '1HP, 2HP, 3HP, 5HP, 7.5HP, 10HP BLDC' },
          { label: 'Discharge Head', value: 'Up to 200 Meters dynamic head' },
          { label: 'Operating Efficiency', value: '>90% motor efficiency' },
          { label: 'Subsidies', value: 'Eligible for State Agricultural Solar Grants' }
        ]
      },
      {
        id: 'solar-outdoor-lights',
        title: 'Solar Outdoor & Street Lighting',
        tagline: 'All-in-one integrated LED street lights for streets, factories & farms',
        description: 'Self-contained outdoor lighting fixtures combining solar panels, bright Philips/Osram LED chips, smart MPPT charge controllers, and LiFePO4 batteries into a single sleek corrosion-resistant housing.',
        image: '/img/b3.png',
        features: [
          'Autonomous dusk-to-dawn automatic illumination with zero wiring needed',
          'Intelligent microwave radar motion sensor dimming (100% active / 30% standby)',
          'High cycle-life Lithium Iron Phosphate (LiFePO4) battery with 2000+ cycles',
          'Heavy-duty die-cast aluminum chassis with IP66 weatherproof rating'
        ],
        specs: [
          { label: 'Wattages', value: '20W, 40W, 60W, 90W, 120W High-Lumen' },
          { label: 'Luminous Flux', value: '160 - 180 Lumens per Watt' },
          { label: 'Battery Chemistry', value: 'LiFePO4 (Overcharge & Thermal Protected)' },
          { label: 'Backup Autonomy', value: '2-3 Rainy/Overcast Days continuous runtime' }
        ]
      },
      {
        id: 'commercial-solar',
        title: '10 - 100kW Commercial & Industrial Solar',
        tagline: 'Industrial rooftop power plants for spinning mills, factories & schools',
        description: 'Large-scale commercial solar photovoltaic EPC installations engineered to offset peak daytime industrial electricity tariffs. Features detailed energy audits, structural load calculations, and remote cloud SCADA monitoring.',
        image: '/img/b4.png',
        features: [
          'Dual MPPT multi-string inverters ensuring maximum yield from split roofs',
          'Significant commercial tax benefits through accelerated depreciation',
          'Real-time cloud generation dashboard with automated fault diagnosis',
          'Turnkey execution: HT/LT interconnection, earthing grid, and net-metering'
        ],
        specs: [
          { label: 'System Range', value: '10kW to 100kW+ MW Scale Plants' },
          { label: 'Mounting Structure', value: 'Anodized Aluminum / Pre-Galvanized Steel' },
          { label: 'Inverter Topology', value: '3-Phase 415V Grid-Tied Inverter Racks' },
          { label: 'O&M Support', value: 'Comprehensive Annual Maintenance Contracts' }
        ]
      }
    ]
  },

  'skill-development': {
    id: 'skill-development',
    number: '04',
    title: 'Skill Development',
    category: 'ENGINEERING LABS & TRAINING',
    accentColor: '#0284C7',
    icon: GraduationCap,
    tagline: 'Hands-On Certified Engineering Academy & Practical Tech Labs',
    heroDescription: 'Bridging the critical gap between academic theory and real-world industrial engineering. We provide practical hands-on training programs in drone assembly & piloting, multi-layer PCB design, 3D CAD/CAM mechanics, and advanced robotics.',
    image: '/img/c1.png',
    heroVideo: '/v/d.mp4',
    overviewPoints: [
      'Certified drone pilot training with certified instructors and open flight grounds',
      'Industrial multi-layer PCB layout design, schematic capture & hands-on SMD soldering',
      'Parametric 3D CAD/CAM mechanical modeling, CNC toolpaths & rapid 3D prototyping',
      'Real-time robotics programming with sensor fusion, ROS, and computer vision'
    ],
    subCategories: [
      {
        id: 'drone-training',
        title: 'DRONE Pilot & Assembly Training',
        tagline: 'Certified drone pilot curriculum, flight simulation & agricultural operations',
        description: 'Comprehensive drone piloting and assembly masterclass. Students learn aerodynamics, quadcopter/hexacopter frame assembly, flight controllers (Pixhawk/ArduPilot), DGCA flight safety regulations, and field agricultural spraying protocols.',
        image: '/img/c1.png',
        features: [
          'Simulator training sessions followed by live open-ground flight maneuvers',
          'Autonomous waypoint mission planning for aerial land mapping',
          'Payload calibration for agricultural spraying nozzles and thermal cameras',
          'Drone troubleshooting, ESC calibration, and LiPo battery safety procedures'
        ],
        specs: [
          { label: 'Drone Categories', value: 'Micro, Small & Agricultural Spray Drones' },
          { label: 'Curriculum', value: 'Aerodynamics, Avionics, Mission Planner, Rules' },
          { label: 'Field Practice', value: 'Dedicated Flying Grounds in Tamil Nadu' },
          { label: 'Certification', value: 'SMARToi Professional Drone Pilot Certificate' }
        ]
      },
      {
        id: 'pcb-design',
        title: 'PCB Design & Hardware Fabrication',
        tagline: 'Schematic capture, multi-layer PCB layout, Gerber generation & soldering',
        description: 'Industry-standard printed circuit board design using KiCad and Altium Designer. Master component footprint creation, high-speed trace routing, electromagnetic interference (EMI) reduction, and hands-on SMD soldering in our hardware lab.',
        image: '/img/c2.png',
        features: [
          'Schematic design of microcontrollers (ESP32, ARM Cortex, STM32)',
          'Power plane routing, ground decoupling, and thermal relief copper pours',
          'Generation of manufacturing Gerbers, BOM, and Pick & Place pick lists',
          'Hands-on surface mount (SMD) hot-air rework and soldering practice'
        ],
        specs: [
          { label: 'Software Tools', value: 'KiCad, Altium Designer, EasyEDA' },
          { label: 'Board Types', value: 'Single, 2-Layer & 4-Layer FR4 Boards' },
          { label: 'Hands-on Project', value: 'Design & Assemble your own IoT PCB' },
          { label: 'Lab Equipment', value: 'Digital Oscilloscopes, Hot-Air Soldering Rigs' }
        ]
      },
      {
        id: 'cad-cam',
        title: 'CAD/CAM & 3D Mechanical Modeling',
        tagline: 'Parametric 3D solid modeling, assemblies, CNC toolpaths & prototyping',
        description: 'Professional mechanical design training utilizing SolidWorks and Autodesk Fusion 360. Transform conceptual ideas into manufacture-ready 3D solid models, sheet metal flat patterns, and G-code toolpaths for CNC cutting and 3D printing.',
        image: '/img/c3.png',
        features: [
          'Parametric sketch modeling, extrusion, sweeps, and complex lofts',
          'Assembly constraints, interference checking, and exploded view documentation',
          'Sheet metal design with bend radius allowances and flat pattern export',
          'Exporting STL files for 3D printing and DXF drawings for laser cutting'
        ],
        specs: [
          { label: 'Software Suites', value: 'SolidWorks, Autodesk Fusion 360, AutoCAD' },
          { label: 'Disciplines', value: 'Solid Modeling, Sheet Metal, CAM G-code' },
          { label: 'Practical Lab', value: '3D print and laser cut student designs' },
          { label: 'Target Audience', value: 'Mechanical, Mechatronics & Diploma Engineers' }
        ]
      },
      {
        id: 'ai-robotics',
        title: 'AI & Industrial Robotics Training',
        tagline: 'Autonomous mobile robot algorithms, computer vision & embedded firmware',
        description: 'Explore the future of autonomous systems. Learn Robot Operating System (ROS), computer vision using Python & OpenCV, ultrasonic/LiDAR obstacle avoidance routines, motor kinematics, and edge AI deployment.',
        image: '/img/c4.png',
        features: [
          'Differential drive kinematics and motor encoder PID tuning',
          'Computer vision for real-time object tracking and QR code navigation',
          'Integration of LiDAR SLAM sensors for 2D room mapping',
          'Embedded C/C++ and Python firmware development on single-board computers'
        ],
        specs: [
          { label: 'Core Platforms', value: 'Raspberry Pi 5, ESP32, Arduino, Jetson Nano' },
          { label: 'Languages', value: 'Python, Embedded C/C++, Linux Shell' },
          { label: 'Robots Used', value: 'SMARToi Autonomous 4WD Mobile Robot Testbeds' },
          { label: 'Certification', value: 'Advanced Robotics Specialist Certificate' }
        ]
      }
    ]
  },

  'robot-services': {
    id: 'robot-services',
    number: '05',
    title: 'Robot Services',
    category: 'AUTONOMOUS SERVICE ROBOTS',
    accentColor: '#8B5CF6',
    icon: Cpu,
    tagline: 'Autonomous Service, Delivery & Interactive AI Greeting Robots',
    heroDescription: 'Transform customer experiences with cutting-edge autonomous mobile service robots. Engineered for corporate headquarters, convention centers, restaurants, hospitals, and educational showcases with LiDAR obstacle avoidance.',
    image: '/img/d1.png',
    heroVideo: '/v/e.mp4',
    overviewPoints: [
      'Multi-tier autonomous serve robots with precision obstacle navigation',
      'Interactive greeting robots with touchscreen check-in and voice AI interaction',
      'Autonomous charging dock return and multi-floor elevator IoT integration',
      'Rental, purchase, and customized corporate branding options available'
    ],
    subCategories: [
      {
        id: 'serve-robot',
        title: 'Autonomous SERVE ROBOT',
        tagline: 'Multi-tray autonomous delivery robot for restaurants, hospitals & events',
        description: 'High-payload autonomous indoor delivery robot designed to navigate crowded dining rooms, hotel corridors, and office spaces. Multi-sensor LiDAR and depth cameras ensure smooth transit without bumping into guests or obstacles.',
        image: '/img/d1.png',
        features: [
          'Multi-tier food-grade stainless steel trays supporting up to 40kg total payload',
          'Centimeter-accurate LiDAR SLAM navigation with dynamic path replanning',
          'Customizable voice announcements and interactive arrival touchscreen',
          'Automatic return to kitchen / staging area once delivery is acknowledged'
        ],
        specs: [
          { label: 'Payload Capacity', value: '40 kg (10-15 kg per individual tray)' },
          { label: 'Battery Runtime', value: '10 - 12 Hours continuous delivery' },
          { label: 'Navigation', value: 'LiDAR + Dual 3D Depth Cameras + Ultrasonic' },
          { label: 'Transit Speed', value: '0.2 - 1.2 m/s adjustable walking speed' }
        ]
      },
      {
        id: 'greeting-robot',
        title: 'Interactive GREETING ROBOT',
        tagline: 'AI receptionist robot for corporate lobbies, showrooms & hospitality',
        description: 'Engaging humanoid service robot equipped with a high-definition touchscreen chest display, AI facial recognition, and conversational speech dialogue. Welcomes VIP guests, prints visitor badges, and guides visitors to meeting rooms.',
        image: '/img/d2.png',
        features: [
          'Facial recognition welcoming recognized executives and frequent clients by name',
          'Full-HD 1080p touch display displaying corporate presentations and interactive menus',
          'Autonomous guided tour mode leading visitors to designated room destinations',
          'Multilingual voice greeting support in English, Tamil, and Hindi'
        ],
        specs: [
          { label: 'Display Screen', value: '13.3-inch Capacitive Multi-touch HD IPS' },
          { label: 'Microphone Array', value: '6-Mic Ring Array with 5m Voice Pickup' },
          { label: 'Facial Recognition', value: '<0.5s recognition with 99.2% accuracy' },
          { label: 'Charging', value: 'Auto-docking wireless / contact charging' }
        ]
      },
      {
        id: 'navigation-cloud',
        title: 'Autonomous Navigation & Fleet Sync',
        tagline: 'LiDAR SLAM mapping, obstacle avoidance & cloud management platform',
        description: 'Our proprietary robot fleet management software. Map complex multi-room facilities effortlessly, establish virtual keep-out zones, monitor battery levels remotely, and dispatch robots across departments.',
        image: '/img/d3.png',
        features: [
          'Rapid facility mapping within 30 minutes using hand-held tablet controller',
          'Virtual walls and forbidden zone markers set directly on floorplan maps',
          'Cloud dashboard tracking operational hours, trip counts, and maintenance diagnostics',
          'OTA remote software updates and custom interaction firmware uploads'
        ],
        specs: [
          { label: 'Mapping Area', value: 'Up to 25,000 sq. meters per building layout' },
          { label: 'Fleet Coordination', value: 'Multi-robot traffic synchronization' },
          { label: 'Network', value: 'Dual-band Wi-Fi 2.4/5GHz + 4G SIM failover' },
          { label: 'Safety', value: 'TUV Certified Dual Emergency Stop Buttons' }
        ]
      },
      {
        id: 'custom-voice-ai',
        title: 'Custom Voice & Brand AI Personalization',
        tagline: 'Tailored conversational dialogue, corporate skins & marketing displays',
        description: 'Customize the robot to embody your exact brand identity. We customize corporate vinyl skin wraps, program company-specific Q&A knowledge bases, and integrate product catalog databases into the interactive touchscreen.',
        image: '/img/d4.png',
        features: [
          'Custom brand vinyl livery wrapped to client corporate color schemes',
          'Tailored dialogue training with company product FAQs and pricing matrices',
          'Lead capture mode gathering visitor email and phone credentials',
          'Custom event audio clips, birthday songs, and celebratory announcements'
        ],
        specs: [
          { label: 'Customization', value: 'Full Body Vinyl Wraps + Logo Placement' },
          { label: 'Languages', value: 'English, Tamil, Hindi Voice Synthesis' },
          { label: 'Data Security', value: 'Encrypted local visitor storage' },
          { label: 'Support', value: 'On-site deployment technician provided' }
        ]
      }
    ]
  },

  'fabrication': {
    id: 'fabrication',
    number: '06',
    title: 'Precision Fabrication',
    category: 'INDUSTRIAL MANUFACTURING',
    accentColor: '#10B981',
    icon: Layers,
    tagline: '3D Printing, Fiber Laser Cutting, CNC Machining & Powder Coating',
    heroDescription: 'State-of-the-art precision job-work and prototype manufacturing under one roof in Karur. From high-accuracy laser cutting and CNC turning to rapid 3D printing and electrostatic powder coating, we fabricate metal and polymer assemblies to exact tolerances.',
    image: '/img/e1.png',
    heroVideo: '/v/f.mp4',
    overviewPoints: [
      'Industrial FDM & SLA 3D printing for functional prototypes and custom IoT enclosures',
      'High-power fiber laser cutting for mild steel, stainless steel, aluminum & acrylics',
      'DRO lathe turning, precision milling, and multi-axis hydraulic press brake bending',
      '7-tank chemical pre-treatment and electrostatic powder coating finishing'
    ],
    subCategories: [
      {
        id: '3d-printing',
        title: 'Industrial 3D Printing & Rapid Prototyping',
        tagline: 'Fused Deposition Modeling (FDM) & Stereolithography (SLA) resin printing',
        description: 'Rapid additive manufacturing for mechanical prototypes, custom electronic enclosures, drone chassis components, and functional tooling. Fast turnaround times turning your 3D CAD files into physical parts in 24 hours.',
        image: '/img/e1.png',
        features: [
          'High precision FDM printing with engineering polymers (PLA, ABS, PETG, Carbon Fiber)',
          'SLA optical resin printing for ultra-smooth surface finishes and miniature gears',
          'Large build volume capacity accommodating single-piece prototypes up to 400mm',
          'Support structure removal, chemical vapor smoothing, and threaded brass insert installation'
        ],
        specs: [
          { label: 'Layer Resolution', value: '50 to 300 Microns high-precision' },
          { label: 'Materials', value: 'PLA+, ABS, PETG, TPU Flexible, Tough Resin' },
          { label: 'Max Build Size', value: '400 x 400 x 450 mm build envelope' },
          { label: 'Lead Time', value: '24 - 48 Hours rapid delivery' }
        ]
      },
      {
        id: 'laser-cutting',
        title: 'Metal & Non-Metal Laser Cutting',
        tagline: 'High-power fiber and CO2 CNC laser cutting with burr-free edge quality',
        description: 'Computer-controlled precision laser profiling for sheet metals and non-metal substrates. Delivers clean, burr-free cuts with exceptional repeatability for industrial machinery panels, decorative screens, and chassis plates.',
        image: '/img/e3.png',
        features: [
          'Fiber laser cutting for mild steel, stainless steel (SS304/SS316), aluminum & brass',
          'CO2 laser cutting and engraving for acrylic, MDF wood, leather, and industrial gaskets',
          'Complex geometric profile cutting directly from DXF / DWG CAD drawings',
          'Minimal heat-affected zone preventing thermal distortion on thin gauge sheets'
        ],
        specs: [
          { label: 'Cutting Capacity', value: 'MS up to 16mm, SS up to 10mm, Acrylic 20mm' },
          { label: 'Positional Accuracy', value: '±0.03 mm high repeatability' },
          { label: 'Bed Size', value: '1500 x 3000 mm standard sheet bed' },
          { label: 'Cutting Gas', value: 'Nitrogen (oxide-free) & Oxygen assist' }
        ]
      },
      {
        id: 'dro-machining',
        title: 'DRO Lathe & CNC Machining',
        tagline: 'Precision turning, milling, drilling & shaft manufacturing',
        description: 'Heavy-duty machine shop equipped with Digital Readout (DRO) precision lathes, vertical milling machines, and drilling stations. We machine custom shafts, bearing housings, rollers, and flanges to tight engineering tolerances.',
        image: '/img/e5.png',
        features: [
          'Precision turning, facing, boring, knurling, and internal/external thread cutting',
          'Keyway slotting, PCD hole circle drilling, and surface face milling',
          'Inspection with vernier calipers, micrometers, and bore gauges ensuring tight fitment',
          'Machining in EN8, EN24, mild steel, stainless steel, brass, and Delrin plastic'
        ],
        specs: [
          { label: 'Tolerances', value: 'Within ±0.015 mm precision fitting' },
          { label: 'Lathe Capacity', value: 'Up to 600mm swing over bed, 2000mm length' },
          { label: 'Materials Handled', value: 'Carbon Steel, Alloy Steels, Cast Iron, Brass' },
          { label: 'Tooling', value: 'Tungsten carbide inserts & high-speed steel' }
        ]
      },
      {
        id: 'machine-bending',
        title: 'CNC Hydraulic Sheet Bending',
        tagline: 'Multi-axis press brake sheet metal bending with precision angle control',
        description: 'Hydraulic press brake bending for control panel boxes, electrical enclosures, brackets, and structural machine guards. Programmed with multi-bend sequences guaranteeing consistent angle profiles across production batches.',
        image: '/img/e7.png',
        features: [
          'CNC multi-axis backgauge positioning for rapid repetitive bending cycles',
          'Sectional hardened punches and V-dies accommodating various sheet thicknesses',
          'Flange bend angle accuracy within ±0.5 degrees',
          'Fabrication of custom electrical IP-rated enclosures and chassis boxes'
        ],
        specs: [
          { label: 'Bending Tonnage', value: '100 Ton Hydraulic Press Brake' },
          { label: 'Bending Length', value: 'Up to 2500 mm continuous bend width' },
          { label: 'Thickness Range', value: '0.8 mm to 6.0 mm sheet steel' },
          { label: 'Angle Accuracy', value: '±0.5° with CNC crowning compensation' }
        ]
      },
      {
        id: 'powder-coating',
        title: 'Electrostatic Powder Coating',
        tagline: '7-tank chemical pre-treatment and cured thermoset powder finish',
        description: 'Heavy-duty surface protection preventing rust, chemical corrosion, and UV discoloration. Parts undergo rigorous 7-tank de-greasing, rust removal, and zinc phosphating prior to electrostatic powder spray and 200°C oven curing.',
        image: '/img/e9.png',
        features: [
          'Uniform 60-80 micron coating thickness with exceptional impact resistance',
          'Vibrant RAL color shades available in glossy, matte, satin, and textured finishes',
          'Tested against salt spray and outdoor moisture humidity corrosion',
          'Eco-friendly process with zero VOC volatile solvent emissions'
        ],
        specs: [
          { label: 'Pre-Treatment', value: '7-Tank Chemical Degrease & Phosphating' },
          { label: 'Oven Curing', value: '200°C for 20 minutes uniform curing' },
          { label: 'Coating Thickness', value: '60 - 80 Microns dry film thickness' },
          { label: 'Finish Textures', value: 'Glossy, Matt, Semi-Gloss, Leatherette' }
        ]
      },
      {
        id: 'parts-painting',
        title: '3D Parts Painting & Surface Finishing',
        tagline: 'Automotive polyurethane (PU) spray painting & custom enclosures',
        description: 'High-end cosmetic surface finishing for 3D printed components, metal enclosures, and display prototypes. Multi-stage primer application, fine wet sanding, polyurethane color coat, and scratch-resistant protective clear lacquer.',
        image: '/img/e12.png',
        features: [
          'Fills layer lines on 3D prints to achieve injection-molded smooth aesthetics',
          'Multi-coat polyurethane (PU) automotive paint with high gloss or matte sheen',
          'Screen printing and laser marking of custom logos and port indicators',
          'Scratch-resistant UV clear coat preserving color brilliance'
        ],
        specs: [
          { label: 'Paint System', value: '2K Polyurethane (PU) Automotive Grade' },
          { label: 'Surface Preparation', value: 'High-build spray putty & 1000-grit wet sand' },
          { label: 'Applications', value: 'Robot Casings, Showroom IoT Devices, Jigs' },
          { label: 'Color Matching', value: 'Custom Pantone / RAL shade matching' }
        ]
      }
    ]
  }
};

const BG_VIDEOS = ['/v/a.mp4', '/v/b.mp4', '/v/c.mp4', '/v/d.mp4', '/v/e.mp4', '/v/f.mp4'];

/* ============================================================
   Scroll-reveal wrapper (IntersectionObserver, runs once)
   ============================================================ */
const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, className = '', style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      const timer = setTimeout(() => setShown(true), 0);
      return () => clearTimeout(timer);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`sd-rv ${shown ? 'sd-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
};

interface SectorDetailPageProps {
  openQuoteModalWithSolution: (solutionTitle: string) => void;
}

export const SectorDetailPage: React.FC<SectorDetailPageProps> = ({ openQuoteModalWithSolution }) => {
  const { sectorId } = useParams<{ sectorId: string }>();
  const navigate = useNavigate();

  // Handle URL normalization (spaces, %20, hyphens, and aliases)
  let activeKey = (sectorId || 'smart-living').toLowerCase().replace(/%20|\s+/g, '-');
  if (activeKey === 'smart-living-solutions') activeKey = 'smart-living';
  if (activeKey === 'solar-solutions' || activeKey === 'solar-energy-solutions') activeKey = 'solar-solution';
  if (activeKey === 'robot-service' || activeKey === 'robot-services') activeKey = 'robot-services';
  if (activeKey === 'industrial' || activeKey === 'industrial-automation') activeKey = 'industrial-automation';
  if (activeKey === 'skill' || activeKey === 'skill-development') activeKey = 'skill-development';
  if (activeKey === 'precision-fabrication' || activeKey === 'fabrication') activeKey = 'fabrication';

  const sector = SECTORS_DATA[activeKey] || SECTORS_DATA['smart-living'];
  const IconComponent = sector.icon;
  const ALL_SECTOR_KEYS = Object.keys(SECTORS_DATA);
  const totalSubs = sector.subCategories.length;

  // Background rotating video index every 10 seconds
  const [currentVideoIdx, setCurrentVideoIdx] = useState<number>(0);

  useEffect(() => {
    const videoTimer = setInterval(() => {
      setCurrentVideoIdx(prev => (prev + 1) % BG_VIDEOS.length);
    }, 10000);
    return () => clearInterval(videoTimer);
  }, []);

  // ==========================================================
  // HERO DYNAMIC SUB-CATEGORY TEXT SWITCHER
  // ==========================================================
  const [heroSlideIdx, setHeroSlideIdx] = useState<number>(0);
  const [isHeroPaused, setIsHeroPaused] = useState<boolean>(false);

  const changeHeroSlide = (direction: 1 | -1) => {
    setHeroSlideIdx(prev => (prev + direction + totalSubs) % totalSubs);
  };

  // Hero Text Switcher Auto-Play every 5.5 seconds
  useEffect(() => {
    if (isHeroPaused) return;
    const heroTimer = setInterval(() => {
      setHeroSlideIdx(prev => (prev + 1) % totalSubs);
    }, 5500);
    return () => clearInterval(heroTimer);
  }, [isHeroPaused, totalSubs]);

  // ==========================================================
  // MODULE SHOWCASE (single card: 70% image slider / 30% text)
  // ==========================================================
  const [showIdx, setShowIdx] = useState<number>(0);
  const [showPaused, setShowPaused] = useState<boolean>(false);

  // Reset indices when sector changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroSlideIdx(0);
      setShowIdx(0);
    }, 0);
    return () => clearTimeout(timer);
  }, [sector.id]);

  const goShow = (i: number) => setShowIdx((i + totalSubs) % totalSubs);

  // Auto-play every 7 seconds (pauses on hover)
  useEffect(() => {
    if (showPaused || totalSubs < 2) return;
    const t = setInterval(() => setShowIdx(p => (p + 1) % totalSubs), 7000);
    return () => clearInterval(t);
  }, [showPaused, totalSubs, showIdx]);

  const activeSub = sector.subCategories[showIdx] || sector.subCategories[0];

  const scrollToModules = () => {
    document.getElementById('slider-showcase')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="sd-root" style={{ position: 'relative', minHeight: '100vh', background: '#050911', color: '#FFFFFF', paddingTop: '100px', overflowX: 'hidden' }}>

      {/* ========================================================
          BACKGROUND ROTATING VIDEO (Changes every 10 seconds)
          ======================================================== */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        {BG_VIDEOS.map((vidSrc, idx) => (
          <video
            key={vidSrc}
            src={vidSrc}
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: idx === currentVideoIdx ? 0.32 : 0,
              transition: 'opacity 1.8s ease-in-out',
              filter: 'brightness(0.55) contrast(1.15) saturate(1.2)'
            }}
          />
        ))}

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 30%, rgba(5, 9, 17, 0.75) 0%, rgba(5, 9, 17, 0.96) 85%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.8
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* ========================================================
            1. BREADCRUMB BAR
            ======================================================== */}
        <div className="sd-crumbs">
          <div className="sd-container sd-crumbs-inner">
            <nav className="sd-crumb-trail" aria-label="Breadcrumb">
              <Link to="/" className="sd-crumb-link">Home</Link>
              <span className="sd-crumb-sep">/</span>
              <Link to="/product" className="sd-crumb-link">Solutions</Link>
              <span className="sd-crumb-sep">/</span>
              <span className="sd-crumb-current">
                <IconComponent size={15} />
                {sector.title}
              </span>
            </nav>
          </div>
          <div className="sd-crumb-bar" />
        </div>

        {/* ========================================================
            2. HERO SECTION - SINGLE VIDEO WITH DYNAMIC SUB-CATEGORY TEXT SWITCHING
            ======================================================== */}
        <section
          style={{
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '0px'
          }}
        >
          <div
            className="suez-hero-slider"
            onMouseEnter={() => setIsHeroPaused(true)}
            onMouseLeave={() => setIsHeroPaused(false)}
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(720px, 94vh, 960px)',
              minHeight: '700px',
              overflow: 'hidden',
              background: '#000000',
              userSelect: 'none'
            }}
          >
            {/* Single continuous video background for this sector */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                zIndex: 1
              }}
            >
              <video
                key={sector.heroVideo || BG_VIDEOS[0]}
                src={sector.heroVideo || BG_VIDEOS[0]}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.82) contrast(1.08)'
                }}
              />
            </div>

            {/* Vertical glass grid split overlay */}
            <div
              className="suez-slide-parts"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                width: '100%',
                height: '100%',
                zIndex: 2,
                pointerEvents: 'none'
              }}
            >
              {[0, 1, 2, 3].map((partIdx) => (
                <div
                  key={partIdx}
                  className="suez-slide-part"
                  style={{
                    position: 'relative',
                    width: '25%',
                    height: '100%',
                    overflow: 'hidden',
                    borderRight: partIdx < 3 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    background: 'rgba(0, 0, 0, 0.15)'
                  }}
                />
              ))}
            </div>

            {/* Cinematic dark radial shade */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(5, 9, 17, 0.28) 0%, rgba(5, 9, 17, 0.75) 100%)',
                zIndex: 3,
                pointerEvents: 'none'
              }}
            />

            {/* Top Category Badge */}
            <div
              style={{
                position: 'absolute',
                top: '36px',
                left: 0,
                width: '100%',
                textAlign: 'center',
                zIndex: 12,
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.9)',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
                userSelect: 'none'
              }}
            >
              {sector.category}
            </div>

            {/* Sub-Category Content switching dynamically in center */}
            <div
              key={sector.subCategories[heroSlideIdx]?.id || heroSlideIdx}
              className="suez-slide-content"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                maxWidth: '1050px',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 12,
                padding: '0 80px',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ animation: 'suez-fade-in 0.65s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.16)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 16px',
                    borderRadius: '999px',
                    marginBottom: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.25)'
                  }}
                >
                  Module 0{heroSlideIdx + 1} / 0{totalSubs}
                </span>

                <h3
                  style={{
                    fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)',
                    fontWeight: 700,
                    letterSpacing: '3.5px',
                    textTransform: 'uppercase',
                    color: 'rgba(255, 255, 255, 0.95)',
                    marginBottom: '14px',
                    textShadow: '0 2px 12px rgba(0, 0, 0, 0.8)'
                  }}
                >
                  {sector.title}
                </h3>

                <h2
                  style={{
                    fontSize: 'clamp(1.5rem, 3.2vw, 2.6rem)',
                    fontWeight: 800,
                    lineHeight: 1.2,
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    color: '#FFFFFF',
                    marginBottom: '18px',
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)'
                  }}
                >
                  {(sector.subCategories[heroSlideIdx]?.title || '').split('').map((char, charIdx) => (
                    <span
                      key={charIdx}
                      className="suez-letter"
                      style={{
                        display: 'inline-block',
                        letterSpacing: '3px',
                        animation: `suez-letter-up 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${0.1 + charIdx * 0.02}s both`
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h2>

                <p
                  style={{
                    fontSize: 'clamp(0.92rem, 1.3vw, 1.08rem)',
                    color: 'rgba(255, 255, 255, 0.88)',
                    maxWidth: '680px',
                    margin: '0 auto',
                    lineHeight: 1.6,
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.85)'
                  }}
                >
                  {sector.subCategories[heroSlideIdx]?.tagline}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                changeHeroSlide(-1);
              }}
              className="sd-hero-arrow sd-hero-arrow-prev"
              aria-label="Previous Slide"
              style={{
                position: 'absolute',
                left: '28px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.24)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 25,
                transition: 'all 0.25s ease',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.45)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.24)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                changeHeroSlide(1);
              }}
              className="sd-hero-arrow sd-hero-arrow-next"
              aria-label="Next Slide"
              style={{
                position: 'absolute',
                right: '28px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.24)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 25,
                transition: 'all 0.25s ease',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.45)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.24)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </section>

        {/* ========================================================
            3. MODULE MARQUEE STRIP
            ======================================================== */}
        <div className="sd-marquee" aria-label="Modules in this sector">
          <div className="sd-marquee-fade sd-fade-l" />
          <div className="sd-marquee-fade sd-fade-r" />
          <div className="sd-marquee-track">
            {[...Array(4)].map((_, setIdx) => (
              <React.Fragment key={setIdx}>
                {sector.subCategories.map((sub, sIdx) => (
                  <button
                    type="button"
                    key={`${setIdx}-${sub.id}`}
                    className="sd-pill"
                    onClick={scrollToModules}
                  >
                    <span className="sd-pill-num">0{sIdx + 1}</span>
                    <span className="sd-pill-title">{sub.title}</span>
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Everything below remounts when the sector changes so reveals replay */}
        <div key={sector.id}>

          {/* ========================================================
              4. SECTOR OVERVIEW
              ======================================================== */}
          <section className="sd-section">
            <div className="sd-blob sd-blob-a" />
            <div className="sd-blob sd-blob-b" />
            <div className="sd-container sd-overview">
              <div className="sd-overview-copy">
                <Reveal>
                  <span className="sd-eyebrow"><i /> {sector.category}</span>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="sd-h2 sd-left">{sector.tagline}</h2>
                </Reveal>
                <Reveal delay={160}>
                  <p className="sd-lead">{sector.heroDescription}</p>
                </Reveal>
                <Reveal delay={240}>
                  <div className="sd-stats">
                    <div className="sd-stat">
                      <strong>{String(totalSubs).padStart(2, '0')}</strong>
                      <span>Modules</span>
                    </div>
                    <div className="sd-stat">
                      <strong>{sector.number}</strong>
                      <span>Core Sector</span>
                    </div>
                    <div className="sd-stat">
                      <strong>Karur</strong>
                      <span>Tamil Nadu, India</span>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={320}>
                  <button
                    type="button"
                    className="sd-btn sd-btn-primary"
                    onClick={() => openQuoteModalWithSolution(sector.title)}
                  >
                    Get a Quote <ArrowRight size={17} />
                  </button>
                </Reveal>
              </div>

              <div className="sd-points">
                {sector.overviewPoints.map((point, i) => (
                  <Reveal key={i} delay={120 + i * 110}>
                    <div className="sd-point">
                      <span className="sd-point-icon"><Check size={16} strokeWidth={3} /></span>
                      <p>{point}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ========================================================
              5. EXPLORE OTHER CORE SECTORS
              ======================================================== */}
          <section className="sd-section sd-section-white">
            <div className="sd-container">
              <Reveal>
                <div className="sd-head">
                  <span className="sd-eyebrow"><i /> Our Core Sectors</span>
                  <h2 className="sd-h2">Explore more <span className="sd-grad">SMARToi</span> solutions</h2>
                  <div className="sd-underline" />
                </div>
              </Reveal>

              <div className="sd-sectors">
                {ALL_SECTOR_KEYS.map((k, i) => {
                  const sec = SECTORS_DATA[k];
                  const isCurrent = sec.id === sector.id;
                  const SecIcon = sec.icon;
                  return (
                    <Reveal key={sec.id} delay={i * 70}>
                      <button
                        type="button"
                        className={`sd-sector ${isCurrent ? 'is-current' : ''}`}
                        aria-current={isCurrent ? 'page' : undefined}
                        onClick={() => {
                          navigate(`/solution/${sec.id}`);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <div className="sd-sector-top">
                          <span className="sd-sector-icon"><SecIcon size={20} /></span>
                          <span className="sd-sector-num">{sec.number}</span>
                        </div>
                        <div className="sd-sector-title">{sec.title}</div>
                        <div className="sd-sector-foot">
                          {isCurrent ? (
                            <span className="sd-here"><i /> You are here</span>
                          ) : (
                            <span className="sd-go">View <ArrowUpRight size={14} /></span>
                          )}
                        </div>
                      </button>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ========================================================
              6. MODULES SHOWCASE
              ======================================================== */}
          <section id="slider-showcase" className="sd-section">
            <div className="sd-blob sd-blob-c" />
            <div className="sd-container sd-container-wide">
              <Reveal>
                <div className="sd-head">
                  <span className="sd-eyebrow"><i /> {totalSubs} Modules</span>
                  <h2 className="sd-h2">
                    Explore <span className="sd-grad">{sector.title}</span> modules
                  </h2>
                  <p className="sd-sub">
                    Slide through each module to see what it does, key specifications, and request a quote.
                  </p>
                  <div className="sd-underline" />
                </div>
              </Reveal>

              <Reveal>
                <div
                  className="sd-show"
                  onMouseEnter={() => setShowPaused(true)}
                  onMouseLeave={() => setShowPaused(false)}
                >
                  {/* ---------- LEFT: 70% IMAGE SLIDER ---------- */}
                  <div className="sd-show-media">
                    {sector.subCategories.map((sub, i) => (
                      <img
                        key={sub.id}
                        src={sub.image}
                        alt={sub.title}
                        className={`sd-show-img ${i === showIdx ? 'is-active' : ''}`}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                      />
                    ))}
                    <div className="sd-show-shade" />

                    <span className="sd-show-count">
                      {String(showIdx + 1).padStart(2, '0')}
                      <em> / {String(totalSubs).padStart(2, '0')}</em>
                    </span>

                    <button
                      type="button"
                      className="sd-show-arrow sd-show-prev"
                      aria-label="Previous module"
                      onClick={() => goShow(showIdx - 1)}
                    >
                      <ChevronLeft size={26} />
                    </button>
                    <button
                      type="button"
                      className="sd-show-arrow sd-show-next"
                      aria-label="Next module"
                      onClick={() => goShow(showIdx + 1)}
                    >
                      <ChevronRight size={26} />
                    </button>

                    {/* thumbnails + progress */}
                    <div className="sd-show-bottom">
                      <div className="sd-show-thumbs">
                        {sector.subCategories.map((sub, i) => (
                          <button
                            type="button"
                            key={sub.id}
                            className={`sd-thumb ${i === showIdx ? 'is-active' : ''}`}
                            onClick={() => goShow(i)}
                            aria-label={`Go to ${sub.title}`}
                          >
                            <img src={sub.image} alt="" loading="lazy" />
                            <span>{String(i + 1).padStart(2, '0')}</span>
                          </button>
                        ))}
                      </div>
                      <div className="sd-show-bar">
                        <div
                          key={`${showIdx}-${showPaused}`}
                          className={`sd-show-bar-fill ${showPaused ? 'is-paused' : ''}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ---------- RIGHT: 30% TEXT (changes with slide) ---------- */}
                  <div className="sd-show-info">
                    <div key={activeSub.id} className="sd-show-info-in">
                      <span className="sd-show-badge">
                        Module {String(showIdx + 1).padStart(2, '0')}
                      </span>
                      <h3>{activeSub.title}</h3>
                      <p className="sd-show-tag">{activeSub.tagline}</p>
                      <p className="sd-show-desc">{activeSub.description}</p>

                      <ul className="sd-card-list">
                        {activeSub.features.slice(0, 3).map((f, fi) => (
                          <li key={fi}>
                            <span className="sd-tick"><Check size={12} strokeWidth={3.2} /></span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="sd-show-specs">
                        {activeSub.specs.slice(0, 2).map((s) => (
                          <div key={s.label} className="sd-spec">
                            <span>{s.label}</span>
                            <strong>{s.value}</strong>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="sd-btn sd-btn-card"
                        onClick={() => openQuoteModalWithSolution(`${sector.title} — ${activeSub.title}`)}
                      >
                        Get Quote <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ========================================================
              7. BOTTOM CTA
              ======================================================== */}
          <section className="sd-section sd-section-white sd-cta-section">
            <div className="sd-container">
              <Reveal>
                <div className="sd-cta">
                  <div className="sd-cta-glow sd-cta-glow-a" />
                  <div className="sd-cta-glow sd-cta-glow-b" />
                  <div className="sd-cta-grid" />

                  <div className="sd-cta-logo">
                    <img src="/img/logos.jpeg" alt="SMARToi" />
                  </div>

                  <div className="sd-cta-copy">
                    <h3>
                      Ready to deploy <span>{sector.title}?</span>
                    </h3>
                    <p>
                      Our multi-disciplinary engineering team in Karur, Tamil Nadu handles custom sizing,
                      layout drawings, and on-site deployment across South India.
                    </p>
                    <div className="sd-cta-actions">
                      <button
                        type="button"
                        className="sd-btn sd-btn-green"
                        onClick={() => openQuoteModalWithSolution(sector.title)}
                      >
                        <span className="sd-btn-ic"><IconComponent size={16} /></span>
                        Request Custom Engineering Proposal
                        <ArrowRight size={17} />
                      </button>
                      <button type="button" className="sd-btn sd-btn-ghost" onClick={scrollToModules}>
                        Browse modules
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </div>
      </div>

      <style>{`
        /* =====================================================
           SMARToi brand tokens (from logo)
           ===================================================== */
        .sd-root {
          --navy: #12307E;
          --navy-deep: #0A1F5C;
          --blue: #1F5BC4;
          --blue-soft: #E8F0FD;
          --green: #3DA845;
          --green-deep: #2C8A35;
          --ink: #0B1B3F;
          --muted: #5B6B8C;
          --line: #DCE5F5;
          --bg: #F4F8FE;
          --grad: linear-gradient(135deg, var(--navy) 0%, var(--blue) 55%, var(--green) 130%);
          --grad-text: linear-gradient(90deg, var(--blue) 0%, var(--green) 100%);
        }

        .sd-container { max-width: 1280px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 32px); position: relative; z-index: 2; }
        .sd-container-wide { max-width: 1440px; width: 100%; }

        /* ---------- Reveal animation ---------- */
        .sd-rv { opacity: 0; transform: translateY(30px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); will-change: opacity, transform; height: 100%; }
        .sd-rv.sd-in { opacity: 1; transform: none; }

        /* ---------- Breadcrumb ---------- */
        .sd-crumbs { background: #fff; position: relative; z-index: 20; box-shadow: 0 4px 18px rgba(18,48,126,.08); }
        .sd-crumbs-inner { display: flex; justify-content: center; padding-top: 16px; padding-bottom: 16px; }
        .sd-crumb-trail { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 8px; font-size: .94rem; font-weight: 600; }
        .sd-crumb-link { color: var(--muted); text-decoration: none; transition: color .2s; }
        .sd-crumb-link:hover { color: var(--navy); }
        .sd-crumb-sep { color: #C3D0EA; }
        .sd-crumb-current { display: inline-flex; align-items: center; gap: 7px; color: var(--navy); font-weight: 800; background: var(--blue-soft); padding: 5px 14px; border-radius: 999px; }
        .sd-crumb-current svg { color: var(--green); }
        .sd-crumb-bar { height: 3px; background: linear-gradient(90deg, var(--navy), var(--blue), var(--green), var(--blue), var(--navy)); background-size: 200% 100%; animation: sd-slide 6s linear infinite; }
        @keyframes sd-slide { to { background-position: -200% 0; } }

        /* ---------- Marquee ---------- */
        .sd-marquee { position: relative; overflow: hidden; background: linear-gradient(90deg, var(--navy-deep), var(--navy) 50%, var(--navy-deep)); padding: 16px 0; border-top: 1px solid rgba(255,255,255,.08); border-bottom: 3px solid var(--green); }
        .sd-marquee-fade { position: absolute; top: 0; bottom: 0; width: clamp(40px, 9vw, 120px); z-index: 3; pointer-events: none; }
        .sd-fade-l { left: 0; background: linear-gradient(90deg, var(--navy-deep), transparent); }
        .sd-fade-r { right: 0; background: linear-gradient(270deg, var(--navy-deep), transparent); }
        .sd-marquee-track { display: flex; width: max-content; animation: sd-marquee 30s linear infinite; }
        .sd-marquee-track:hover { animation-play-state: paused; }
        @keyframes sd-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .sd-pill { display: inline-flex; align-items: center; gap: 12px; margin-right: 20px; padding: 8px 20px 8px 10px; border-radius: 999px; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.16); color: #fff; cursor: pointer; white-space: nowrap; font-family: inherit; transition: background .25s, border-color .25s, transform .25s; }
        .sd-pill:hover { background: rgba(61,168,69,.22); border-color: var(--green); transform: translateY(-2px); }
        .sd-pill-num { font-size: .72rem; font-weight: 800; font-family: ui-monospace, monospace; background: var(--green); color: #fff; padding: 3px 9px; border-radius: 999px; }
        .sd-pill-title { font-size: .9rem; font-weight: 700; }
        .sd-pill svg { color: #8FE096; }

        /* ---------- Sections ---------- */
        .sd-section { position: relative; overflow: hidden; padding: clamp(52px, 8vw, 104px) 0; background-color: var(--bg); background-image: linear-gradient(rgba(31,91,196,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(31,91,196,.05) 1px, transparent 1px); background-size: 36px 36px; color: var(--ink); }
        .sd-section-white { background-color: #fff; }
        .sd-blob { position: absolute; border-radius: 50%; filter: blur(70px); opacity: .5; pointer-events: none; z-index: 1; animation: sd-float 14s ease-in-out infinite; }
        .sd-blob-a { width: 380px; height: 380px; background: rgba(31,91,196,.22); top: -120px; right: -100px; }
        .sd-blob-b { width: 300px; height: 300px; background: rgba(61,168,69,.2); bottom: -100px; left: -80px; animation-delay: -6s; }
        .sd-blob-c { width: 420px; height: 420px; background: rgba(31,91,196,.16); top: 10%; left: -140px; }
        @keyframes sd-float { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(24px,-26px) scale(1.08); } }

        .sd-eyebrow { display: inline-flex; align-items: center; gap: 9px; font-size: .78rem; font-weight: 800; letter-spacing: .14em; color: var(--blue); background: #fff; border: 1px solid var(--line); padding: 7px 16px; border-radius: 999px; box-shadow: 0 4px 14px rgba(18,48,126,.07); }
        .sd-eyebrow i { width: 8px; height: 8px; border-radius: 50%; background: var(--green); }

        .sd-head { text-align: center; max-width: 780px; margin: 0 auto clamp(32px, 5vw, 56px); }
        .sd-h2 { font-size: clamp(1.7rem, 3.6vw, 2.7rem); font-weight: 900; line-height: 1.18; letter-spacing: -.02em; color: var(--navy); margin: 18px 0 0; }
        .sd-h2.sd-left { text-align: left; }
        .sd-grad { background: var(--grad-text); -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent; }
        .sd-sub { color: var(--muted); font-size: 1.04rem; line-height: 1.65; margin: 14px auto 0; max-width: 620px; }
        .sd-underline { width: 72px; height: 4px; border-radius: 4px; margin: 20px auto 0; background: linear-gradient(90deg, var(--blue), var(--green)); }

        /* ---------- Overview ---------- */
        .sd-overview { display: grid; grid-template-columns: 1.05fr .95fr; gap: clamp(28px, 5vw, 72px); align-items: center; }
        .sd-overview-copy { display: flex; flex-direction: column; align-items: flex-start; }
        .sd-lead { color: #34456B; font-size: clamp(1rem, 1.3vw, 1.1rem); line-height: 1.75; margin: 20px 0 0; max-width: 60ch; }
        .sd-stats { display: flex; flex-wrap: wrap; gap: 14px; margin: 28px 0 30px; }
        .sd-stat { background: #fff; border: 1px solid var(--line); border-left: 4px solid var(--green); border-radius: 14px; padding: 12px 20px; min-width: 120px; box-shadow: 0 8px 22px -10px rgba(18,48,126,.2); }
        .sd-stat strong { display: block; font-size: 1.4rem; color: var(--navy); font-weight: 900; line-height: 1.1; }
        .sd-stat span { font-size: .8rem; color: var(--muted); font-weight: 600; }

        .sd-points { display: grid; gap: 14px; }
        .sd-point { display: flex; gap: 16px; align-items: flex-start; background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 18px 20px; box-shadow: 0 10px 28px -14px rgba(18,48,126,.25); transition: transform .3s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s; }
        .sd-point:hover { transform: translateX(6px); border-color: var(--blue); box-shadow: 0 16px 36px -14px rgba(31,91,196,.4); }
        .sd-point p { margin: 0; color: #2B3C63; font-size: .98rem; line-height: 1.6; font-weight: 500; }
        .sd-point-icon { flex-shrink: 0; width: 32px; height: 32px; border-radius: 10px; display: grid; place-items: center; color: #fff; background: linear-gradient(135deg, var(--blue), var(--green)); }

        /* ---------- Buttons ---------- */
        .sd-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; font-family: inherit; font-weight: 700; border: none; cursor: pointer; border-radius: 999px; transition: transform .25s ease, box-shadow .25s ease, background .25s ease; position: relative; overflow: hidden; text-align: center; }
        .sd-btn svg { transition: transform .25s ease; flex-shrink: 0; }
        .sd-btn:hover svg:last-child { transform: translateX(4px); }
        .sd-btn:focus-visible, .sd-sector:focus-visible, .sd-pill:focus-visible { outline: 3px solid var(--green); outline-offset: 3px; }
        .sd-btn-primary { padding: 14px 30px; font-size: .98rem; color: #fff; background: var(--grad); box-shadow: 0 14px 30px -10px rgba(31,91,196,.6); }
        .sd-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 20px 36px -10px rgba(31,91,196,.7); }

        /* ---------- Sector cards ---------- */
        .sd-sectors { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }
        .sd-sector { width: 100%; height: 100%; min-height: 150px; display: flex; flex-direction: column; justify-content: space-between; gap: 14px; text-align: left; font-family: inherit; cursor: pointer; background: #fff; border: 1px solid var(--line); border-radius: 20px; padding: 18px; color: var(--ink); box-shadow: 0 10px 26px -14px rgba(18,48,126,.28); transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s, border-color .3s, background .3s; position: relative; overflow: hidden; }
        .sd-sector::after { content: ""; position: absolute; left: 0; bottom: 0; height: 4px; width: 0; background: linear-gradient(90deg, var(--blue), var(--green)); transition: width .4s ease; }
        .sd-sector:hover { transform: translateY(-6px); border-color: var(--blue); box-shadow: 0 22px 40px -16px rgba(31,91,196,.45); }
        .sd-sector:hover::after { width: 100%; }
        .sd-sector-top { display: flex; align-items: center; justify-content: space-between; }
        .sd-sector-icon { width: 42px; height: 42px; border-radius: 13px; display: grid; place-items: center; color: var(--blue); background: var(--blue-soft); transition: background .3s, color .3s, transform .3s; }
        .sd-sector:hover .sd-sector-icon { background: var(--grad); color: #fff; transform: rotate(-8deg) scale(1.08); }
        .sd-sector-num { font-family: ui-monospace, monospace; font-size: .76rem; font-weight: 800; color: var(--muted); }
        .sd-sector-title { font-size: .98rem; font-weight: 800; line-height: 1.28; color: var(--navy); }
        .sd-sector-foot { font-size: .8rem; font-weight: 700; }
        .sd-go { display: inline-flex; align-items: center; gap: 4px; color: var(--blue); }
        .sd-here { display: inline-flex; align-items: center; gap: 7px; color: #fff; }
        .sd-here i { width: 8px; height: 8px; border-radius: 50%; background: #7CE085; }
        .sd-sector.is-current { background: var(--grad); border-color: transparent; transform: translateY(-6px); box-shadow: 0 22px 40px -14px rgba(18,48,126,.6); }
        .sd-sector.is-current .sd-sector-title, .sd-sector.is-current .sd-sector-num { color: #fff; }
        .sd-sector.is-current .sd-sector-icon { background: rgba(255,255,255,.2); color: #fff; }

        /* ---------- Module cards ---------- */
        .sd-modules { display: grid; gap: clamp(20px, 3vw, 32px); grid-template-columns: 1fr; }
        .sd-card { height: 100%; display: flex; flex-direction: column; background: #fff; border: 1px solid var(--line); border-radius: 24px; overflow: hidden; cursor: pointer; box-shadow: 0 16px 40px -20px rgba(18,48,126,.35); transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s, border-color .35s; position: relative; }
        .sd-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--blue), var(--green)); transform: scaleX(0); transform-origin: left; transition: transform .45s ease; z-index: 5; }
        .sd-card:hover { transform: translateY(-8px); border-color: rgba(31,91,196,.5); box-shadow: 0 30px 56px -22px rgba(31,91,196,.55); }
        .sd-card:hover::before { transform: scaleX(1); }
        .sd-card-media { position: relative; height: clamp(200px, 22vw, 250px); overflow: hidden; background: var(--grad); flex-shrink: 0; }
        .sd-card-media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .8s cubic-bezier(.16,1,.3,1), opacity .3s; }
        .sd-card:hover .sd-card-media img { transform: scale(1.08); }
        .sd-card-shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,31,92,.05) 35%, rgba(10,31,92,.7) 100%); pointer-events: none; }
        .sd-card-badge { position: absolute; left: 16px; top: 16px; font-family: ui-monospace, monospace; font-weight: 800; font-size: .82rem; color: #fff; background: var(--grad); padding: 6px 13px; border-radius: 999px; box-shadow: 0 6px 16px rgba(10,31,92,.4); }
        .sd-card-arrow { position: absolute; right: 16px; top: 16px; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; background: rgba(255,255,255,.92); color: var(--navy); transform: scale(.8) rotate(-45deg); opacity: 0; transition: all .35s cubic-bezier(.16,1,.3,1); }
        .sd-card:hover .sd-card-arrow { opacity: 1; transform: scale(1) rotate(0); }
        .sd-card-body { display: flex; flex-direction: column; flex: 1; padding: clamp(20px, 2.4vw, 28px); }
        .sd-card-body h3 { margin: 0; font-size: clamp(1.1rem, 1.6vw, 1.3rem); font-weight: 800; line-height: 1.3; color: var(--navy); }
        .sd-card-tag { margin: 8px 0 0; font-size: .92rem; line-height: 1.55; color: var(--muted); }
        .sd-card-list { list-style: none; padding: 0; margin: 18px 0 0; display: grid; gap: 10px; }
        .sd-card-list li { display: flex; gap: 10px; align-items: flex-start; font-size: .88rem; line-height: 1.5; color: #2B3C63; }
        .sd-tick { flex-shrink: 0; margin-top: 2px; width: 18px; height: 18px; border-radius: 50%; display: grid; place-items: center; color: #fff; background: var(--green); }
        .sd-specs { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0 22px; padding-top: 18px; border-top: 1px dashed var(--line); }
        .sd-spec { background: var(--bg); border-radius: 12px; padding: 10px 12px; min-width: 0; }
        .sd-spec span { display: block; font-size: .7rem; font-weight: 700; color: var(--muted); letter-spacing: .02em; }
        .sd-spec strong { display: block; font-size: .8rem; color: var(--navy); font-weight: 700; margin-top: 3px; line-height: 1.35; overflow-wrap: anywhere; }
        .sd-btn-card { margin-top: auto; width: 100%; padding: 13px 18px; font-size: .92rem; color: #fff; background: var(--grad); border-radius: 14px; }
        .sd-btn-card:hover { transform: translateY(-2px); box-shadow: 0 14px 26px -10px rgba(31,91,196,.65); }

        /* ---------- Module showcase (70 / 30) ---------- */
        .sd-show { display: grid; grid-template-columns: 7fr 3fr; min-height: 620px; width: 100%; background: #fff; border: 1px solid var(--line); border-radius: 28px; overflow: hidden; box-shadow: 0 30px 70px -28px rgba(18,48,126,.45); }

        .sd-show-media { position: relative; overflow: hidden; background: #000; min-height: 380px; width: 100%; height: 100%; }
        .sd-show-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; opacity: 0; transform: scale(1.04); transition: opacity .7s ease, transform 6s ease-out; }
        .sd-show-img.is-active { opacity: 1; transform: scale(1); }
        .sd-show-shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,31,92,.18) 0%, transparent 40%, rgba(10,31,92,.85) 100%); pointer-events: none; }

        .sd-show-count { position: absolute; top: 20px; left: 22px; z-index: 4; font-family: ui-monospace, monospace; font-weight: 800; font-size: 1.3rem; color: #fff; background: rgba(10,31,92,.55); backdrop-filter: blur(8px); padding: 8px 16px; border-radius: 999px; border: 1px solid rgba(255,255,255,.2); }
        .sd-show-count em { font-style: normal; opacity: .6; font-size: .9rem; }

        .sd-show-arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 5; width: 52px; height: 52px; border-radius: 50%; display: grid; place-items: center; cursor: pointer; color: #fff; background: rgba(255,255,255,.22); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,.3); transition: background .25s, transform .25s; }
        .sd-show-arrow:hover { background: var(--green); transform: translateY(-50%) scale(1.1); }
        .sd-show-prev { left: 18px; }
        .sd-show-next { right: 18px; }

        .sd-show-bottom { position: absolute; left: 0; right: 0; bottom: 0; z-index: 4; padding: 0 22px 20px; }
        .sd-show-thumbs { display: flex; gap: 10px; margin-bottom: 14px; overflow-x: auto; scrollbar-width: none; }
        .sd-show-thumbs::-webkit-scrollbar { display: none; }
        .sd-thumb { position: relative; flex: 0 0 auto; width: 86px; height: 56px; padding: 0; border-radius: 12px; overflow: hidden; cursor: pointer; border: 2px solid rgba(255,255,255,.35); opacity: .7; background: var(--navy); transition: all .3s ease; }
        .sd-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .sd-thumb span { position: absolute; left: 5px; bottom: 3px; font-size: .66rem; font-weight: 800; color: #fff; font-family: ui-monospace, monospace; text-shadow: 0 1px 4px rgba(0,0,0,.8); }
        .sd-thumb:hover { opacity: 1; transform: translateY(-3px); }
        .sd-thumb.is-active { opacity: 1; border-color: var(--green); box-shadow: 0 0 0 3px rgba(61,168,69,.35); }

        .sd-show-bar { height: 4px; border-radius: 4px; background: rgba(255,255,255,.25); overflow: hidden; }
        .sd-show-bar-fill { height: 100%; width: 100%; transform-origin: left; background: linear-gradient(90deg, var(--blue), var(--green)); animation: sd-progress 7s linear forwards; }
        .sd-show-bar-fill.is-paused { animation-play-state: paused; }
        @keyframes sd-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        .sd-show-info { padding: clamp(22px, 2.4vw, 32px); display: flex; flex-direction: column; overflow-y: visible; max-height: none; background: linear-gradient(180deg, #fff 0%, var(--bg) 100%); }
        .sd-show-info-in { display: flex; flex-direction: column; flex: 1; animation: sd-textin .6s cubic-bezier(.16,1,.3,1); }
        @keyframes sd-textin { from { opacity: 0; transform: translateX(26px); } to { opacity: 1; transform: none; } }
        .sd-show-badge { align-self: flex-start; font-size: .72rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: #fff; background: var(--grad); padding: 6px 14px; border-radius: 999px; }
        .sd-show-info h3 { margin: 14px 0 0; font-size: clamp(1.2rem, 1.7vw, 1.5rem); font-weight: 900; line-height: 1.25; color: var(--navy); }
        .sd-show-tag { margin: 8px 0 0; font-size: .88rem; font-weight: 600; line-height: 1.5; color: var(--blue); }
        .sd-show-desc { margin: 12px 0 0; font-size: .88rem; line-height: 1.65; color: #34456B; }
        .sd-show-info .sd-card-list { margin-top: 16px; }
        .sd-show-specs { display: grid; grid-template-columns: 1fr; gap: 8px; margin: 18px 0 20px; padding-top: 16px; border-top: 1px dashed var(--line); }

        @media (max-width: 1100px) {
          .sd-show { grid-template-columns: 6fr 4fr; }
        }
        @media (max-width: 1024px) {
          .sd-show-arrow { display: none !important; }
        }
        @media (max-width: 860px) {
          .sd-show { grid-template-columns: 1fr; border-radius: 20px; }
          .sd-show-media { height: clamp(280px, 58vw, 400px); min-height: 0; }
          .sd-show-info { max-height: none; overflow: visible; padding: 20px 18px; }
          .sd-show-specs { grid-template-columns: 1fr 1fr; }
          .sd-show-count { top: 14px; left: 14px; font-size: 1rem; padding: 6px 12px; }
          .sd-show-bottom { padding: 0 14px 14px; }
          .sd-thumb { width: 72px; height: 48px; border-radius: 10px; }
        }
        @media (max-width: 540px) {
          .sd-show { border-radius: 18px; }
          .sd-show-arrow { display: none !important; }
          .sd-thumb { width: 62px; height: 42px; border-radius: 8px; }
          .sd-show-specs { grid-template-columns: 1fr; }
          .sd-show-info { padding: 18px 14px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sd-show-img, .sd-show-info-in, .sd-show-bar-fill { animation: none !important; transition: none !important; }
        }

        /* ---------- CTA ---------- */
        .sd-cta-section { padding-bottom: clamp(60px, 9vw, 120px); }
        .sd-cta { position: relative; overflow: hidden; display: flex; align-items: center; gap: clamp(28px, 5vw, 64px); padding: clamp(32px, 5vw, 64px); border-radius: clamp(22px, 3vw, 32px); background: linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 55%, #1B4FB3 100%); box-shadow: 0 34px 70px -26px rgba(10,31,92,.7); color: #fff; }
        .sd-cta-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px); background-size: 34px 34px; pointer-events: none; mask-image: radial-gradient(circle at 30% 40%, #000 0%, transparent 75%); -webkit-mask-image: radial-gradient(circle at 30% 40%, #000 0%, transparent 75%); }
        .sd-cta-glow { position: absolute; border-radius: 50%; filter: blur(60px); pointer-events: none; animation: sd-float 12s ease-in-out infinite; }
        .sd-cta-glow-a { width: 320px; height: 320px; background: rgba(61,168,69,.45); right: -90px; bottom: -120px; }
        .sd-cta-glow-b { width: 260px; height: 260px; background: rgba(60,130,255,.4); left: -80px; top: -110px; animation-delay: -5s; }
        .sd-cta-logo { position: relative; z-index: 2; flex-shrink: 0; width: clamp(200px, 24vw, 300px); background: #fff; border-radius: 22px; padding: clamp(18px, 2.4vw, 28px); box-shadow: 0 24px 50px -16px rgba(0,0,0,.5); animation: sd-bob 5s ease-in-out infinite; }
        .sd-cta-logo img { display: block; width: 100%; height: auto; object-fit: contain; }
        @keyframes sd-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        .sd-cta-copy { position: relative; z-index: 2; flex: 1; min-width: 0; }
        .sd-cta-copy h3 { margin: 0 0 14px; font-size: clamp(1.7rem, 3.4vw, 2.6rem); font-weight: 900; line-height: 1.18; letter-spacing: -.02em; }
        .sd-cta-copy h3 span { color: #7CE085; }
        .sd-cta-copy p { margin: 0 0 28px; max-width: 58ch; color: #CFDBF5; font-size: clamp(.98rem, 1.3vw, 1.08rem); line-height: 1.7; }
        .sd-cta-actions { display: flex; flex-wrap: wrap; gap: 14px; }
        .sd-btn-green { padding: 15px 30px; font-size: .98rem; color: #fff; background: linear-gradient(90deg, var(--green) 0%, var(--green-deep) 100%); box-shadow: 0 16px 32px -10px rgba(61,168,69,.7); }
        .sd-btn-green:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 22px 40px -10px rgba(61,168,69,.85); }
        .sd-btn-ic { width: 28px; height: 28px; border-radius: 50%; background: #fff; color: var(--green-deep); display: grid; place-items: center; flex-shrink: 0; }
        .sd-btn-ghost { padding: 15px 28px; font-size: .98rem; color: #fff; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.35); }
        .sd-btn-ghost:hover { background: rgba(255,255,255,.18); transform: translateY(-3px); }

        /* =====================================================
           Responsive
           ===================================================== */
        @media (min-width: 720px) { .sd-modules.sd-cols-2 { grid-template-columns: repeat(2, 1fr); } .sd-modules.sd-cols-3 { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1100px) { .sd-modules.sd-cols-3 { grid-template-columns: repeat(3, 1fr); } }

        @media (max-width: 1180px) {
          .sd-sectors { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 920px) {
          .sd-overview { grid-template-columns: 1fr; }
          .sd-cta { flex-direction: column; text-align: center; }
          .sd-cta-copy p { margin-left: auto; margin-right: auto; }
          .sd-cta-actions { justify-content: center; }
          .sd-cta-logo { width: min(280px, 70%); }
        }
        @media (max-width: 640px) {
          .sd-sectors { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .sd-sector { min-height: 138px; padding: 14px; }
          .sd-sector-title { font-size: .9rem; }
          .sd-stat { flex: 1 1 calc(50% - 14px); min-width: 0; }
          .sd-btn-green, .sd-btn-ghost, .sd-btn-primary { width: 100%; }
          .sd-overview-copy .sd-btn { width: 100%; }
          .sd-crumbs-inner { padding-top: 12px; padding-bottom: 12px; }
          .sd-crumb-trail { font-size: .86rem; }
          .sd-card-arrow { opacity: 1; transform: none; }
        }
        @media (max-width: 380px) {
          .sd-sectors { grid-template-columns: 1fr; }
          .sd-specs { grid-template-columns: 1fr; }
        }
        @media (hover: none) {
          .sd-card:hover, .sd-sector:hover, .sd-point:hover { transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sd-rv { opacity: 1; transform: none; transition: none; }
          .sd-marquee-track, .sd-blob, .sd-cta-glow, .sd-cta-logo, .sd-crumb-bar, .sd-eyebrow i, .sd-here i { animation: none !important; }
        }

        /* Hero responsive rules */
        @keyframes suez-fade-in {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes suez-letter-up {
          from { opacity: 0; transform: translateY(110%); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .sd-hero-arrow {
            display: none !important;
          }
          .suez-hero-slider {
            height: clamp(680px, 88vh, 800px) !important;
            min-height: 640px !important;
          }
        }
        @media (max-width: 768px) {
          .suez-hero-slider {
            height: clamp(620px, 85vh, 740px) !important;
            min-height: 580px !important;
          }
          .suez-slide-content {
            padding: 24px 20px !important;
          }
        }
      `}</style>
    </div>
  );
};