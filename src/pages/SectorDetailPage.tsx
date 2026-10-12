import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Zap, Bot, Sun, GraduationCap, Cpu, Layers, 
  CheckCircle2, ArrowRight, Sparkles, 
  ChevronRight, ChevronLeft
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
    image: '/img/WhatsApp Image 2026-09-19 at 1.33.07 PM.jpeg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.33.07 PM.jpeg',
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
        image: '/img/s1.jpg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.03.43 PM.jpeg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.05.09 PM.jpeg',
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
    image: '/img/WhatsApp Image 2026-09-19 at 1.05.09 PM.jpeg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.05.09 PM.jpeg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.02.58 PM (1).jpeg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.04.46 PM.jpeg',
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
        image: '/img/s2.jpg',
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
          { label: 'Location', value: 'NUO TECH Engineering Facility, Karur, TN' }
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
    image: '/img/WhatsApp Image 2026-09-19 at 1.19.32 PM.jpeg',
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
        image: '/img/s1.jpg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.19.32 PM.jpeg',
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
        image: '/img/s3.jpg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.02.58 PM.jpeg',
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
    image: '/img/WhatsApp Image 2026-09-19 at 1.19.32 PM (1).jpeg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.19.32 PM (1).jpeg',
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
          { label: 'Certification', value: 'NUO TECH Professional Drone Pilot Certificate' }
        ]
      },
      {
        id: 'pcb-design',
        title: 'PCB Design & Hardware Fabrication',
        tagline: 'Schematic capture, multi-layer PCB layout, Gerber generation & soldering',
        description: 'Industry-standard printed circuit board design using KiCad and Altium Designer. Master component footprint creation, high-speed trace routing, electromagnetic interference (EMI) reduction, and hands-on SMD soldering in our hardware lab.',
        image: '/img/WhatsApp Image 2026-09-19 at 1.29.34 PM.jpeg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.29.34 PM (1).jpeg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.05.14 PM.jpeg',
        features: [
          'Differential drive kinematics and motor encoder PID tuning',
          'Computer vision for real-time object tracking and QR code navigation',
          'Integration of LiDAR SLAM sensors for 2D room mapping',
          'Embedded C/C++ and Python firmware development on single-board computers'
        ],
        specs: [
          { label: 'Core Platforms', value: 'Raspberry Pi 5, ESP32, Arduino, Jetson Nano' },
          { label: 'Languages', value: 'Python, Embedded C/C++, Linux Shell' },
          { label: 'Robots Used', value: 'NUO Autonomous 4WD Mobile Robot Testbeds' },
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
    image: '/img/WhatsApp Image 2026-09-19 at 1.05.14 PM.jpeg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.05.14 PM.jpeg',
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
        image: '/img/contact_hero_robots.jpg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.04.46 PM.jpeg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.03.43 PM.jpeg',
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
    image: '/img/WhatsApp Image 2026-09-19 at 1.29.34 PM.jpeg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.29.34 PM.jpeg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.29.34 PM (1).jpeg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.04.46 PM.jpeg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.05.09 PM.jpeg',
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
        image: '/img/s2.jpg',
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
        image: '/img/WhatsApp Image 2026-09-19 at 1.33.07 PM.jpeg',
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

const BG_VIDEOS = ['/v/s1.mp4', '/v/s2.mp4', '/v/s3.mp4'];

const SECTOR_CARD_THEMES: Record<string, { bg: string; shadow: string; border: string }> = {
  'smart-living': {
    bg: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    shadow: 'rgba(37, 99, 235, 0.45)',
    border: '#60A5FA'
  },
  'industrial-automation': {
    bg: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    shadow: 'rgba(234, 88, 12, 0.45)',
    border: '#FDBA74'
  },
  'solar-solution': {
    bg: 'linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)',
    shadow: 'rgba(202, 138, 4, 0.45)',
    border: '#FEF08A'
  },
  'skill-development': {
    bg: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
    shadow: 'rgba(2, 132, 199, 0.45)',
    border: '#7DD3FC'
  },
  'robot-services': {
    bg: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    shadow: 'rgba(124, 58, 237, 0.45)',
    border: '#C4B5FD'
  },
  'fabrication': {
    bg: 'linear-gradient(135deg, #0F766E 0%, #115E59 100%)',
    shadow: 'rgba(15, 118, 110, 0.45)',
    border: '#5EEAD4'
  }
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
  // HERO CITIES SLIDER STATE (Nikolay Talanov / suez OjGQza)
  // ==========================================================
  const [heroSlideIdx, setHeroSlideIdx] = useState<number>(0);
  const [prevHeroSlideIdx, setPrevHeroSlideIdx] = useState<number>(-1);
  const [isHeroPaused, setIsHeroPaused] = useState<boolean>(false);

  const changeHeroSlide = (direction: 1 | -1) => {
    setPrevHeroSlideIdx(heroSlideIdx);
    setHeroSlideIdx(prev => (prev + direction + totalSubs) % totalSubs);
  };

  // Hero Cities Slider Auto-Play every 6 seconds
  useEffect(() => {
    if (isHeroPaused) return;
    const heroTimer = setInterval(() => {
      setPrevHeroSlideIdx(heroSlideIdx);
      setHeroSlideIdx(prev => (prev + 1) % totalSubs);
    }, 6000);
    return () => clearInterval(heroTimer);
  }, [isHeroPaused, totalSubs, heroSlideIdx]);

  // Reset indices when sector changes
  useEffect(() => {
    setHeroSlideIdx(0);
    setPrevHeroSlideIdx(-1);
    setSliderIndex(0);
  }, [sector.id]);

  // ==========================================================
  // 3D PERSPECTIVE MODULE SLIDER STATE
  // ==========================================================
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [isSliderPaused, setIsSliderPaused] = useState<boolean>(false);
  const [tilt3D, setTilt3D] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const sliderStageRef = useRef<HTMLDivElement>(null);

  // Auto-play 3D slider every 6 seconds unless paused
  useEffect(() => {
    if (isSliderPaused) return;
    const sliderTimer = setInterval(() => {
      setSliderIndex(prev => (prev + 1) % totalSubs);
    }, 6000);
    return () => clearInterval(sliderTimer);
  }, [isSliderPaused, totalSubs]);

  const next3DSlide = () => {
    setSliderIndex(prev => (prev + 1) % totalSubs);
  };

  const prev3DSlide = () => {
    setSliderIndex(prev => (prev - 1 + totalSubs) % totalSubs);
  };

  // Interactive 3D mouse parallax tilt on slider stage
  const handleSliderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderStageRef.current) return;
    const rect = sliderStageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -6;
    const tiltY = ((x - centerX) / centerY) * 8;
    setTilt3D({ x: tiltX, y: tiltY });
  };

  const handleSliderMouseLeave = () => {
    setTilt3D({ x: 0, y: 0 });
    setIsSliderPaused(false);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#050911', color: '#FFFFFF', paddingTop: '100px', overflowX: 'hidden' }}>
      
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

        {/* Ambient Dark Tech Gradients for 100% Content Readability */}
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
            1. TOP BREADCRUMBS BAR (White BG, Centered)
            ======================================================== */}
        <div 
          style={{ 
            background: '#FFFFFF', 
            borderBottom: '1px solid #E2E8F0',
            padding: '16px 0',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
            position: 'relative',
            zIndex: 20
          }}
        >
          <div 
            className="container" 
            style={{ 
              maxWidth: '1280px', 
              margin: '0 auto', 
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Centered Breadcrumb links */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '8px', 
                fontSize: '0.94rem', 
                color: '#64748B',
                fontWeight: 500
              }}
            >
              <Link 
                to="/" 
                style={{ 
                  color: '#64748B', 
                  textDecoration: 'none', 
                  transition: 'color 0.2s',
                  fontWeight: 600
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0F172A'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
              >
                Home
              </Link>
              <span style={{ color: '#CBD5E1' }}>/</span>
              <Link 
                to="/product" 
                style={{ 
                  color: '#64748B', 
                  textDecoration: 'none', 
                  transition: 'color 0.2s',
                  fontWeight: 600
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0F172A'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
              >
                Solutions
              </Link>
              <span style={{ color: '#CBD5E1' }}>/</span>
              <span style={{ color: sector.accentColor, fontWeight: 700 }}>
                {sector.title}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. HERO SECTION - FULL-WIDTH CITIES SLIDER WITH VISIBLE VIDEO
            ======================================================== */}
        <section 
          style={{ 
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '0px'
          }}
        >
          {/* Edge-to-Edge Full Hero suez Slider */}
          <div
            className="suez-hero-slider"
            onMouseEnter={() => setIsHeroPaused(true)}
            onMouseLeave={() => setIsHeroPaused(false)}
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(620px, 86vh, 850px)',
              minHeight: '600px',
              overflow: 'hidden',
              background: '#000000',
              userSelect: 'none'
            }}
          >
            {/* Slides */}
            {sector.subCategories.map((sub, sIdx) => {
              const isActive = sIdx === heroSlideIdx;
              const isPrev = sIdx === prevHeroSlideIdx;

              if (!isActive && !isPrev) {
                return null;
              }

              return (
                <div
                  key={sub.id}
                  className={`suez-slide ${isActive ? 's--active' : ''} ${isPrev ? 's--prev' : ''}`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: isActive ? 10 : 5,
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.85s cubic-bezier(0.77, 0, 0.175, 1)'
                  }}
                >
                  {/* VIDEO BACKGROUND - FULLY VISIBLE & VIBRANT */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      overflow: 'hidden',
                      zIndex: 1
                    }}
                  >
                    <video
                      src={BG_VIDEOS[sIdx % BG_VIDEOS.length]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: isActive ? 'scale(1.0)' : 'scale(1.12)',
                        transition: 'transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)',
                        filter: 'brightness(0.85) contrast(1.05)'
                      }}
                    />
                  </div>

                  {/* 4 VERTICAL SLICED SHUTTER PANELS (suez signature shutter lines) */}
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
                          borderRight: partIdx < 3 ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
                          background: 'rgba(0, 0, 0, 0.15)',
                          transform: isActive ? 'translateY(0)' : 'translateY(-100%)',
                          transition: `transform 0.85s cubic-bezier(0.77, 0, 0.175, 1) ${partIdx * 0.08}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* Subtle Vignette for Text Contrast (keeps video clearly visible) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.22) 0%, rgba(0, 0, 0, 0.55) 100%)',
                      zIndex: 3
                    }}
                  />

                  {/* Top Heading (TRAVELERS style from suez pen) */}
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

                  {/* Centered Slide Content Overlay (CZECH REPUBLIC / PRAGUE / read more) */}
                  <div
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
                    {/* Subheading (CZECH REPUBLIC style) */}
                    <h3
                      style={{
                        fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)',
                        fontWeight: 700,
                        letterSpacing: '3.5px',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.95)',
                        marginBottom: '14px',
                        textShadow: '0 2px 12px rgba(0, 0, 0, 0.8)',
                        transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                        opacity: isActive ? 1 : 0,
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s'
                      }}
                    >
                      {sector.title}
                    </h3>

                    {/* Main Heading with Staggered Split Letters (P R A G U E style) */}
                    <h2
                      style={{
                        fontSize: 'clamp(1.5rem, 3.2vw, 2.5rem)',
                        fontWeight: 800,
                        lineHeight: 1.2,
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        color: '#FFFFFF',
                        marginBottom: '18px',
                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)',
                        overflow: 'hidden'
                      }}
                    >
                      {sub.title.split('').map((char, charIdx) => (
                        <span
                          key={charIdx}
                          className="suez-letter"
                          style={{
                            display: 'inline-block',
                            letterSpacing: '4px',
                            transform: isActive ? 'translateY(0)' : 'translateY(110%)',
                            opacity: isActive ? 1 : 0,
                            transition: `transform 0.55s cubic-bezier(0.2, 0.9, 0.3, 1.2) ${0.2 + charIdx * 0.02}s, opacity 0.45s ease ${0.2 + charIdx * 0.02}s`
                          }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))}
                    </h2>


                  </div>
                </div>
              );
            })}

            {/* Left and Right Navigation Arrows displayed on both side center corners */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                changeHeroSlide(-1);
              }}
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

         <div 
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            background: 'rgba(10, 16, 30, 0.92)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '16px 0',
            backdropFilter: 'blur(16px)'
          }}
        >
          {/* Edge Fade Gradients */}
          <div 
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '120px',
              background: 'linear-gradient(90deg, rgba(5, 9, 17, 1) 0%, transparent 100%)',
              zIndex: 5,
              pointerEvents: 'none'
            }}
          />
          <div 
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '120px',
              background: 'linear-gradient(270deg, rgba(5, 9, 17, 1) 0%, transparent 100%)',
              zIndex: 5,
              pointerEvents: 'none'
            }}
          />

          {/* Infinite Marquee Track (Repeated 4 times for seamless infinite scroll) */}
          <div 
            style={{
              display: 'flex',
              width: 'max-content',
              animation: 'subcategories-marquee 24s linear infinite',
              gap: '24px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
            onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
          >
            {[...Array(4)].map((_, setIdx) => (
              <React.Fragment key={setIdx}>
                {sector.subCategories.map((sub, sIdx) => (
                  <div 
                    key={`${setIdx}-${sub.id}`}
                    onClick={() => {
                      setSliderIndex(sIdx);
                      document.getElementById('slider-showcase')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      padding: '8px 20px',
                      borderRadius: '30px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${sector.accentColor}25`;
                      e.currentTarget.style.borderColor = sector.accentColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    }}
                  >
                    <span 
                      style={{ 
                        fontSize: '0.72rem', 
                        fontFamily: 'monospace', 
                        fontWeight: 800, 
                        color: sector.accentColor,
                        background: `${sector.accentColor}20`,
                        padding: '2px 8px',
                        borderRadius: '12px'
                      }}
                    >
                      0{sIdx + 1}
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>
                      {sub.title}
                    </span>
                    <Sparkles size={12} color={sector.accentColor} />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ========================================================
            3.5 EXPLORE OTHER CORE SECTORS (White BG + Black Grid + Color Cards)
            ======================================================== */}
        <section
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#FFFFFF',
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
            borderTop: '1px solid #E2E8F0',
            borderBottom: '1px solid #E2E8F0',
            padding: '36px 0 42px',
            zIndex: 10
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
            {/* Header label */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span
                style={{
                  fontSize: '11px',
                  color: '#0F172A',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  background: 'rgba(241, 245, 249, 0.95)',
                  border: '1px solid #E2E8F0',
                  padding: '6px 18px',
                  borderRadius: '20px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
                }}
              >
                EXPLORE OTHER CORE SECTORS
              </span>
            </div>

            {/* 6 Core Sector Cards Row */}
            <div
              className="core-sectors-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '14px',
                alignItems: 'stretch'
              }}
            >
              {ALL_SECTOR_KEYS.map((k) => {
                const sec = SECTORS_DATA[k];
                const isCurrent = sec.id === sector.id;
                const SecIcon = sec.icon;
                const theme = SECTOR_CARD_THEMES[sec.id] || {
                  bg: `linear-gradient(135deg, ${sec.accentColor}, #0F172A)`,
                  shadow: `${sec.accentColor}44`,
                  border: '#FFFFFF'
                };

                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      navigate(`/solution/${sec.id}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      background: theme.bg,
                      border: isCurrent
                        ? '3px solid #0F172A'
                        : '1px solid rgba(255, 255, 255, 0.25)',
                      borderRadius: '18px',
                      padding: '16px 18px',
                      minHeight: '106px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.24s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isCurrent ? 'translateY(-4px)' : 'translateY(0)',
                      boxShadow: isCurrent
                        ? `0 16px 36px -6px ${theme.shadow}, 0 0 0 3px #0F172A, 0 0 0 5px #FFFFFF`
                        : `0 8px 22px -4px ${theme.shadow}`,
                      outline: 'none',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 16px 32px -4px ${theme.shadow}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = isCurrent ? 'translateY(-4px)' : 'translateY(0)';
                      e.currentTarget.style.boxShadow = isCurrent
                        ? `0 16px 36px -6px ${theme.shadow}, 0 0 0 3px #0F172A, 0 0 0 5px #FFFFFF`
                        : `0 8px 22px -4px ${theme.shadow}`;
                    }}
                  >
                    {/* Top Row: Icon & Number */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginBottom: '12px'
                      }}
                    >
                      <SecIcon size={20} color="#FFFFFF" />
                      <span
                        style={{
                          fontSize: '11px',
                          fontFamily: 'monospace',
                          fontWeight: 800,
                          color: '#FFFFFF',
                          background: 'rgba(255, 255, 255, 0.24)',
                          backdropFilter: 'blur(4px)',
                          padding: '2px 8px',
                          borderRadius: '10px'
                        }}
                      >
                        {sec.number}
                      </span>
                    </div>

                    {/* Bottom Row: Title */}
                    <div
                      style={{
                        fontSize: '13.5px',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        lineHeight: 1.28,
                        letterSpacing: '-0.01em',
                        textShadow: '0 2px 6px rgba(0, 0, 0, 0.25)'
                      }}
                    >
                      {sec.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

       

  
        <section 
          id="slider-showcase"
          style={{ 
            padding: '80px 0 110px', 
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
            borderTop: '1px solid #E2E8F0',
            borderBottom: '1px solid #E2E8F0'
          }}
        >
          <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
            
            {/* Section Header */}
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.02em' }}>
                Explore <span style={{ color: sector.accentColor }}>{sector.title}</span> Modules
              </h2>

              <p style={{ color: '#64748B', fontSize: '1.02rem', lineHeight: 1.6, margin: 0 }}>
                Click or swipe to navigate through all {totalSubs} sub-categories in 3D perspective depth.
              </p>
            </div>

            {/* 3D Perspective Stage Viewport */}
            <div
              ref={sliderStageRef}
              onMouseMove={handleSliderMouseMove}
              onMouseEnter={() => setIsSliderPaused(true)}
              onMouseLeave={handleSliderMouseLeave}
              style={{
                position: 'relative',
                width: '100%',
                minHeight: '620px',
                perspective: '1400px',
                perspectiveOrigin: '50% 50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
                padding: '30px 0'
              }}
            >
              {/* Cards Container with 3D Tilt */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '780px',
                  height: '560px',
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${tilt3D.x}deg) rotateY(${tilt3D.y}deg)`,
                  transition: 'transform 0.15s ease-out'
                }}
              >
                {sector.subCategories.map((sub, index) => {
                  // Calculate shortest circular offset for carousel
                  let offset = index - sliderIndex;
                  if (offset < -Math.floor(totalSubs / 2)) offset += totalSubs;
                  if (offset > Math.floor(totalSubs / 2)) offset -= totalSubs;

                  const isCenter = offset === 0;
                  const isRight = offset === 1;
                  const isLeft = offset === -1;
                  const isVisible = Math.abs(offset) <= 1;

                  // 3D Perspective Transform Logic (matching suez 3D perspective slider)
                  let transformValue = '';
                  let opacityValue = 0;
                  let zIndexValue = 1;

                  if (isCenter) {
                    transformValue = 'translateX(0%) scale(1) translateZ(0px) rotateY(0deg)';
                    opacityValue = 1;
                    zIndexValue = 15;
                  } else if (isRight) {
                    transformValue = 'translateX(58%) scale(0.85) translateZ(-160px) rotateY(-28deg)';
                    opacityValue = 0.72;
                    zIndexValue = 8;
                  } else if (isLeft) {
                    transformValue = 'translateX(-58%) scale(0.85) translateZ(-160px) rotateY(28deg)';
                    opacityValue = 0.72;
                    zIndexValue = 8;
                  } else {
                    transformValue = `translateX(${offset * 70}%) scale(0.65) translateZ(-340px) rotateY(${offset > 0 ? -40 : 40}deg)`;
                    opacityValue = 0;
                    zIndexValue = 2;
                  }

                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSliderIndex(index)}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '28px',
                        overflow: 'hidden',
                        background: 'rgba(15, 23, 42, 0.95)',
                        border: isCenter 
                          ? `2px solid ${sector.accentColor}` 
                          : '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: isCenter
                          ? `0 30px 80px -15px ${sector.accentColor}55, 0 15px 35px rgba(0,0,0,0.8)`
                          : '0 20px 50px rgba(0,0,0,0.6)',
                        transform: transformValue,
                        opacity: opacityValue,
                        zIndex: zIndexValue,
                        transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.55s ease, border-color 0.3s ease',
                        cursor: isCenter ? 'default' : 'pointer',
                        pointerEvents: isVisible ? 'auto' : 'none',
                        display: 'grid',
                        gridTemplateRows: '220px 1fr'
                      }}
                    >
                      {/* Top Card Image */}
                      <div style={{ position: 'relative', overflow: 'hidden', background: '#040711' }}>
                        <img 
                          src={sub.image} 
                          alt={sub.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: isCenter ? 'none' : 'brightness(0.7) contrast(1.1)'
                          }}
                        />
                        <div 
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(180deg, transparent 30%, rgba(15, 23, 42, 1) 100%)'
                          }}
                        />

                        {/* Sub-Category Badge */}
                        <div 
                          style={{
                            position: 'absolute',
                            top: '16px',
                            left: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(10px)',
                            padding: '4px 14px',
                            borderRadius: '20px',
                            border: `1px solid ${sector.accentColor}66`,
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            color: sector.accentColor,
                            fontFamily: 'monospace'
                          }}
                        >
                          <span>SUB-CATEGORY 0{index + 1}</span>
                        </div>

                        {/* Slide Indicator on Top Right */}
                        <div 
                          style={{
                            position: 'absolute',
                            top: '16px',
                            right: '20px',
                            background: 'rgba(0, 0, 0, 0.65)',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            color: '#FFF',
                            fontWeight: 700
                          }}
                        >
                          {index + 1} / {totalSubs}
                        </div>
                      </div>

                      {/* Bottom Card Content */}
                      <div 
                        style={{
                          padding: '24px 28px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          background: 'rgba(15, 23, 42, 0.95)'
                        }}
                      >
                        <div>
                          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
                            {sub.title}
                          </h3>
                          <div style={{ fontSize: '0.86rem', color: sector.accentColor, fontWeight: 600, marginBottom: '12px' }}>
                            {sub.tagline}
                          </div>
                          <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.55, marginBottom: '16px' }}>
                            {sub.description}
                          </p>

                          {/* Capabilities Checkmarks */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '16px' }}>
                            {sub.features.slice(0, 4).map((feat, fIdx) => (
                              <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.8rem', color: '#E2E8F0' }}>
                                <CheckCircle2 size={13} color={sector.accentColor} style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Card Action Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openQuoteModalWithSolution(`${sector.title} — ${sub.title}`);
                          }}
                          className="btn btn-primary"
                          style={{
                            width: '100%',
                            padding: '12px 20px',
                            borderRadius: '16px',
                            background: `linear-gradient(135deg, ${sector.accentColor}, #0284C7)`,
                            fontSize: '0.92rem',
                            fontWeight: 700,
                            boxShadow: `0 6px 20px ${sector.accentColor}44`,
                            justifyContent: 'center'
                          }}
                        >
                          <span>Inquire / Get Quote for {sub.title}</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Previous 3D Slide Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev3DSlide();
                }}
                aria-label="Previous Slide"
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'rgba(10, 16, 30, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 25,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = sector.accentColor;
                  e.currentTarget.style.borderColor = sector.accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(10, 16, 30, 0.85)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <ChevronLeft size={26} />
              </button>

              {/* Next 3D Slide Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next3DSlide();
                }}
                aria-label="Next Slide"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'rgba(10, 16, 30, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 25,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = sector.accentColor;
                  e.currentTarget.style.borderColor = sector.accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(10, 16, 30, 0.85)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <ChevronRight size={26} />
              </button>

            </div>

            {/* Pagination Navigation Dots */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px', 
                marginTop: '36px' 
              }}
            >
              {sector.subCategories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSliderIndex(idx)}
                  aria-label={`Jump to slide ${idx + 1}`}
                  style={{
                    width: idx === sliderIndex ? '32px' : '10px',
                    height: '8px',
                    borderRadius: '4px',
                    background: idx === sliderIndex ? sector.accentColor : '#CBD5E1',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: idx === sliderIndex ? `0 0 12px ${sector.accentColor}` : 'none'
                  }}
                />
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================
            6. BOTTOM CTA & OTHER 5 SECTORS QUICK SWITCHER
            ======================================================== */}
        <section 
          style={{ 
            padding: '80px 0 110px', 
            backgroundColor: '#FFFFFF',
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
            borderTop: '1px solid #E2E8F0',
            position: 'relative'
          }}
        >
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            
            {/* Consultation Banner (Exact Matching Reference Design) */}
            <div 
              className="consultation-banner-card"
              style={{
                position: 'relative',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '28px',
                padding: '48px 56px',
                boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                gap: '52px'
              }}
            >
              {/* Top-Left Corner Diagonal Geometric Ribbon */}
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  pointerEvents: 'none',
                  zIndex: 2
                }}
              >
                {/* Red corner triangle */}
                <polygon points="0,0 72,0 0,72" fill="#DC2626" />
                {/* Black stripe */}
                <polygon points="0,82 0,100 100,0 82,0" fill="#0F172A" />
                {/* Light gray stripe */}
                <polygon points="0,108 0,118 118,0 108,0" fill="#E2E8F0" />
              </svg>

              {/* Bottom-Right Corner Diagonal Geometric Ribbon */}
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  pointerEvents: 'none',
                  zIndex: 2,
                  transform: 'rotate(180deg)'
                }}
              >
                {/* Red corner triangle */}
                <polygon points="0,0 72,0 0,72" fill="#DC2626" />
                {/* Black stripe */}
                <polygon points="0,82 0,100 100,0 82,0" fill="#0F172A" />
                {/* Light gray stripe */}
                <polygon points="0,108 0,118 118,0 108,0" fill="#E2E8F0" />
              </svg>

              {/* Left Side: 3D Isometric Cube Emblem with Soft Rings */}
              <div
                style={{
                  position: 'relative',
                  width: '180px',
                  height: '180px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {/* Outer faint circular ring */}
                <div
                  style={{
                    position: 'absolute',
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(220, 38, 38, 0.18)',
                    boxShadow: '0 0 20px rgba(220, 38, 38, 0.06)'
                  }}
                />
                {/* Inner circular white badge with soft shadow */}
                <div
                  style={{
                    position: 'relative',
                    width: '146px',
                    height: '146px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    boxShadow: '0 12px 35px -5px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src="/img/log.png"
                    alt="Cube Logo"
                    style={{
                      width: '96px',
                      height: '96px',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 12px 16px rgba(0, 0, 0, 0.16))'
                    }}
                  />
                </div>
              </div>

              {/* Right Side: Text & Red Pill Action Button */}
              <div style={{ flex: 1, position: 'relative', zIndex: 5 }}>
                {/* Red accent dash */}
                <div
                  className="banner-dash"
                  style={{
                    width: '42px',
                    height: '5px',
                    background: '#DC2626',
                    borderRadius: '3px',
                    marginBottom: '16px'
                  }}
                />

                <h3
                  style={{
                    fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
                    fontWeight: 900,
                    color: '#0F172A',
                    lineHeight: 1.2,
                    marginBottom: '14px',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Ready to deploy <span style={{ color: '#DC2626' }}>{sector.title}?</span>
                </h3>

                <p
                  style={{
                    fontSize: '1.04rem',
                    color: '#475569',
                    maxWidth: '650px',
                    lineHeight: 1.65,
                    marginBottom: '26px',
                    fontWeight: 500
                  }}
                >
                  Our multi-disciplinary engineering team in Karur, Tamil Nadu handles custom sizing, layout drawings, and on-site deployment across South India.
                </p>

                <button
                  onClick={() => openQuoteModalWithSolution(sector.title)}
                  style={{
                    padding: '14px 34px',
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    borderRadius: '40px',
                    background: 'linear-gradient(90deg, #E11D48 0%, #DC2626 50%, #B91C1C 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 12px 28px -4px rgba(220, 38, 38, 0.45)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 16px 36px -4px rgba(220, 38, 38, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 12px 28px -4px rgba(220, 38, 38, 0.45)';
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <IconComponent size={16} color="#DC2626" />
                  </div>
                  <span>Request Custom Engineering Proposal</span>
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>

          </div>
        </section>

      </div>

      <style>{`
        @keyframes subcategories-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 1100px) {
          .core-sectors-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .core-sectors-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 860px) {
          .consultation-banner-card {
            flex-direction: column !important;
            text-align: center !important;
            padding: 38px 20px !important;
            gap: 28px !important;
          }
          .consultation-banner-card .banner-dash {
            margin: 0 auto 16px !important;
          }
        }
        @media (max-width: 768px) {
          .suez-hero-slider {
            height: 660px !important;
          }
          .suez-slide-content {
            padding: 24px 20px !important;
          }
        }
      `}</style>
    </div>
  );
};
