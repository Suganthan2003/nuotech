export interface SolutionItem {
  id: string;
  title: string;
  category: string;
  iconName: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  specs: string[];
  image: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  impact: string;
  image: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const COMPANY_INFO = {
  name: "NUO TECH",
  tagline: "NUO TECH — Innovate. Automate. Sustain.",
  subTagline: "From Ideas to Intelligent Solutions — We Design, Build & Automate.",
  location: "Karur, Tamil Nadu, India",
  fullAddress: "Nuo Tech, South 6, Seerangai Thottam, Puliyur, Karur, Tamil Nadu, 639114",
  email: "info@nuotech.in",
  phone: "6383184295",
  whatsapp: "99656 08260",
  whatsappUrl: "https://wa.me/919965608260",
  vision: "To build a smarter and more sustainable future by making advanced technology, automation and renewable energy practical and accessible to everyone.",
  mission: "To design and deliver innovative, reliable and affordable technology solutions that solve real-world problems, improve efficiency and promote sustainable development.",
  objective: "To transform ideas and real-world challenges into innovative automated products and sustainable technology solutions.",
  trainingLocations: ["Karur", "Namakkal", "Udumalaipettai", "Coimbatore"],
  socials: {
    youtube: "#",
    instagram: "#",
    facebook: "#",
    linkedin: "#"
  }
};

export const PROCESS_STEPS: ProcessStep[] = [
  { step: "01", title: "Understand", description: "We understand your exact requirements, operational problems, and target outcomes." },
  { step: "02", title: "Design", description: "Our engineering team develops mechanical, electrical, electronic & software architecture." },
  { step: "03", title: "Prototype", description: "We build and rigorously test a functional working prototype to validate design accuracy." },
  { step: "04", title: "Automate", description: "Integration of smart sensors, microcontrollers, motors, actuators, and cloud IoT connectivity." },
  { step: "05", title: "Manufacture", description: "Full-scale assembly and precision fabrication following industrial quality standards." },
  { step: "06", title: "Install & Commission", description: "On-site deployment, field calibration, safety testing, and comprehensive team training." },
  { step: "07", title: "Support", description: "Ongoing maintenance contracts, emergency troubleshooting, and lifetime technical support." }
];

export const SOLUTIONS: SolutionItem[] = [
  {
    id: "industrial-automation",
    title: "Industrial Automation",
    category: "Automation",
    iconName: "Cpu",
    tagline: "Optimize operations with custom control panels & machinery",
    description: "End-to-end industrial automation including custom control panel design, motor controllers, PLC integration, automated conveyor safety, and machine retrofit.",
    features: [
      "Electrical automation & control panels",
      "Motor control & variable frequency drives",
      "Pump & valve automated sequences",
      "Sensor integration & safety interlocks",
      "Industrial electrical troubleshooting"
    ],
    image: "/img/WhatsApp Image 2026-09-19 at 1.05.09 PM.jpeg"
  },
  {
    id: "custom-machinery",
    title: "Custom Machinery",
    category: "Manufacturing",
    iconName: "Cog",
    tagline: "Special purpose machines tailored for your manufacturing needs",
    description: "From concept sketch to heavy-duty automated machinery. We engineer custom SPM machines for textile, agricultural processing, and light manufacturing industries.",
    features: [
      "Special Purpose Machines (SPM)",
      "Automated assembly rigs",
      "Pneumatic & hydraulic actuation",
      "Custom metal fabrication & enclosures",
      "Precision speed & torque regulation"
    ],
    image: "/img/WhatsApp Image 2026-09-19 at 1.05.14 PM.jpeg"
  },
  {
    id: "solar-energy",
    title: "Solar Energy",
    category: "Renewable",
    iconName: "Sun",
    tagline: "Clean power for homes, farms & industrial facilities",
    description: "Turnkey solar PV solutions including rooftop solar, solar pump sets, hybrid inverter systems, and maintenance. Actively planning a future 1 MW utility plant.",
    features: [
      "Solar rooftop PV installation",
      "Solar powered agricultural pumps",
      "Maintenance & efficiency auditing",
      "Energy monitoring & storage",
      "Future 1 MW renewable project planning"
    ],
    image: "/img/WhatsApp Image 2026-09-19 at 1.19.32 PM.jpeg"
  },
  {
    id: "smart-agriculture",
    title: "Smart Agriculture",
    category: "Agriculture",
    iconName: "Sprout",
    tagline: "Data-driven farming for maximum yield & water savings",
    description: "Empowering farmers with automated irrigation, soil moisture sensing, overhead tank level automation, and remote pump switching.",
    features: [
      "Smart automatic irrigation controllers",
      "Soil moisture & environmental sensors",
      "Automatic water pump & valve automation",
      "Tank water level automation & alert",
      "Solar-powered IoT farm monitoring"
    ],
    image: "/img/WhatsApp Image 2026-09-19 at 1.02.58 PM.jpeg"
  },
  {
    id: "iot-solutions",
    title: "IoT & Remote Cloud Monitoring",
    category: "IoT",
    iconName: "Wifi",
    tagline: "Connect, monitor & control equipment from anywhere",
    description: "Cloud-connected IoT hardware using ESP32, ESP8266, custom microcontrollers, Wi-Fi/GSM, web dashboards, and mobile app control.",
    features: [
      "ESP32 & ESP8266 custom firmware",
      "Real-time web & mobile dashboards",
      "Cloud telemetry & data logging",
      "Remote equipment control & alerts",
      "Smart home, office & factory IoT"
    ],
    image: "/img/WhatsApp Image 2026-09-19 at 1.04.46 PM.jpeg"
  },
  {
    id: "pcb-electronics",
    title: "PCB & Electronics Design",
    category: "Electronics",
    iconName: "CircuitBoard",
    tagline: "From circuit design to production-ready boards",
    description: "Custom electronics design, schematic capture, multi-layer PCB layout, component assembly, testing, and rapid prototype fabrication.",
    features: [
      "Custom schematic & PCB layout",
      "Rapid prototype PCB fabrication",
      "SMD & Through-hole assembly",
      "Embedded microcontrollers (ARM/ESP)",
      "Testing & productization"
    ],
    image: "/img/WhatsApp Image 2026-09-19 at 1.29.34 PM.jpeg"
  },
  {
    id: "smart-home",
    title: "Smart Home & Office",
    category: "Automation",
    iconName: "Home",
    tagline: "Transform spaces with smart touch switches & voice control",
    description: "Modern automation for modern residences and workplaces. Smart lighting, fan controllers, energy metering, automated curtain tracks, and app control.",
    features: [
      "Smart lighting & dimming panels",
      "Appliance & fan automation",
      "Energy consumption telemetry",
      "Voice assistant integration",
      "Remote smartphone security & access"
    ],
    image: "/img/WhatsApp Image 2026-09-19 at 1.33.07 PM.jpeg"
  },
  {
    id: "cctv-security",
    title: "CCTV & Security",
    category: "Security",
    iconName: "ShieldCheck",
    tagline: "High-definition surveillance & smart perimeter access",
    description: "Professional CCTV camera installation, NVR/DVR networking, mobile remote live viewing, motion alert notifications, and perimeter security.",
    features: [
      "IP & HD CCTV installation",
      "Remote mobile streaming",
      "Commercial network cabling",
      "Maintenance & camera upgrades",
      "Integrated perimeter alarm systems"
    ],
    image: "/img/WhatsApp Image 2026-09-19 at 1.29.34 PM (1).jpeg"
  },
  {
    id: "gate-automation",
    title: "Gate Automation",
    category: "Automation",
    iconName: "DoorClosed",
    tagline: "Keyless, motorized gate solutions with remote control",
    description: "Automatic sliding and swing gate kits with safety infrared sensors, remote control keyfobs, RFID access, and mobile app triggers.",
    features: [
      "Heavy-duty sliding gate motors",
      "Dual arm swing gate actuators",
      "Infrared obstacle safety sensors",
      "RFID & Smartphone access control",
      "Integration with CCTV security"
    ],
    image: "/img/WhatsApp Image 2026-09-19 at 1.03.43 PM.jpeg"
  },
  {
    id: "drone-services",
    title: "Drone Services & Pilot Training",
    category: "Aerospace",
    iconName: "Plane",
    tagline: "Aerial mapping, agricultural spraying & certified pilot training",
    description: "Professional drone operations for aerial crop inspection, land surveying, industrial site monitoring, and pilot training across Tamil Nadu.",
    features: [
      "Aerial agricultural spraying & mapping",
      "Industrial structure inspection",
      "Certified drone pilot training support",
      "Locations: Karur, Namakkal, Udumalaipettai, Coimbatore",
      "Drone assembly & maintenance guidance"
    ],
    image: "/img/WhatsApp Image 2026-09-19 at 1.19.32 PM (1).jpeg"
  }
];

export const PRODUCTS: ProductItem[] = [
  {
    id: "nuo-agri-flow",
    name: "NUO AgriFlow Smart Controller",
    category: "Smart Agriculture",
    badge: "Best Seller",
    description: "Automated pump & valve controller with soil moisture inputs, solar power compatibility, and GSM/Wi-Fi remote monitoring.",
    specs: ["Single/3-Phase Pump Control", "Soil Moisture & Water Level", "Solar DC Input (12-24V)", "Mobile App & SMS Alerts"],
    image: "/img/WhatsApp Image 2026-09-19 at 1.02.58 PM (1).jpeg"
  },
  {
    id: "nuo-iot-gateway",
    name: "NUO Industrial IoT Gateway",
    category: "IoT Hardware",
    badge: "New Release",
    description: "Rugged DIN-rail industrial ESP32/ARM gateway with RS485 Modbus, Wi-Fi, Ethernet, and cloud MQTT broker integration.",
    specs: ["Dual Core 240MHz", "RS485 / Modbus RTU", "Din-Rail Industrial Enclosure", "Web GUI Dashboard"],
    image: "/img/WhatsApp Image 2026-09-19 at 1.04.46 PM.jpeg"
  },
  {
    id: "nuo-solar-pump",
    name: "NUO Solar DC Pump Automated Set",
    category: "Renewable Energy",
    badge: "Eco Hero",
    description: "Direct DC solar pump drive with built-in MPPT technology and dry-run safety auto-shutoff.",
    specs: ["MPPT High Efficiency Controller", "DC Submersible / Surface Pump", "Zero Grid Electricity Needed", "Overload & Surge Protection"],
    image: "/img/WhatsApp Image 2026-09-19 at 1.19.32 PM.jpeg"
  },
  {
    id: "nuo-custom-pcb",
    name: "NUO Custom Micro-Controller PCB",
    category: "Electronics",
    badge: "Custom Build",
    description: "Tailor-made industrial control PCB board with relay outputs, optocoupled inputs, and noise-isolated power supply.",
    specs: ["FR4 2-Layer / 4-Layer PCB", "Opto-isolated Digital I/O", "10A Heavy Duty Relays", "Custom Firmware Pre-loaded"],
    image: "/img/WhatsApp Image 2026-09-19 at 1.29.34 PM.jpeg"
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "100-Acre Smart Irrigation Grid",
    category: "Smart Agriculture",
    location: "Udumalaipettai, TN",
    description: "Automated 8 multi-zone valves and 3 solar-powered pumps synchronized with soil moisture telemetries.",
    impact: "Saved 45% water usage & reduced manual labor costs by 70%.",
    image: "/img/WhatsApp Image 2026-09-19 at 1.02.58 PM.jpeg"
  },
  {
    id: "proj-2",
    title: "Industrial Machine Automation Panel",
    category: "Industrial Automation",
    location: "Karur, TN",
    description: "Retrofitted legacy textile machinery with automated PLC touchscreen control & motor drive protection.",
    impact: "Boosted production throughput by 35% with zero safety downtime.",
    image: "/img/WhatsApp Image 2026-09-19 at 1.05.09 PM.jpeg"
  },
  {
    id: "proj-3",
    title: "Commercial Rooftop Solar & Storage",
    category: "Solar Energy",
    location: "Coimbatore, TN",
    description: "Designed & installed 50 kW Grid-tied solar system with real-time remote cloud energy analytics.",
    impact: "Reduced monthly electricity expenses by over ₹65,000.",
    image: "/img/WhatsApp Image 2026-09-19 at 1.19.32 PM.jpeg"
  },
  {
    id: "proj-4",
    title: "Smart Gate & Surveillance System",
    category: "Security & Gates",
    location: "Namakkal, TN",
    description: "Automatic motorized sliding gate with integrated HD CCTV camera, RFID entry, and safety sensors.",
    impact: "Enhanced site security & hands-free vehicle entry automation.",
    image: "/img/WhatsApp Image 2026-09-19 at 1.03.43 PM.jpeg"
  }
];

export interface SolutionSectorOption {
  id: string;
  title: string;
  subItems: string[];
}

export const SOLUTION_SECTORS: SolutionSectorOption[] = [
  {
    id: "smart-living",
    title: "Smart Living Solutions",
    subItems: [
      "Smart Switches",
      "Smart Lights",
      "CCTV",
      "Smart Door Locks"
    ]
  },
  {
    id: "industrial-automation",
    title: "Industrial Automation",
    subItems: [
      "Gate Automation",
      "Smart Irrigation System",
      "Custom Products",
      "Industrial Training"
    ]
  },
  {
    id: "solar-solution",
    title: "Solar Solution",
    subItems: [
      "1 - 10Kw Residential Solar",
      "BLDC Pump Motors",
      "Solar outdoor lights",
      "10 - 100 kw commercial Solar"
    ]
  },
  {
    id: "skill-development",
    title: "Skill Development",
    subItems: [
      "DRONE",
      "PCB DESIGN",
      "CAD/CAM",
      "AI & ROBOTICS"
    ]
  },
  {
    id: "robot-services",
    title: "Robot Services",
    subItems: [
      "SERVE ROBOT",
      "GREETING ROBOT"
    ]
  },
  {
    id: "fabrication",
    title: "Fabrication",
    subItems: [
      "3D PRINT",
      "METAL / NON METAL LASER CUTTING",
      "DRO / LATHE / MACHING",
      "MACHINE BENDING",
      "POWDER COATING",
      "3D PARTS PAINTING"
    ]
  }
];
