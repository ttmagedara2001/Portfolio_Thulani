// =============================================================================
// portfolioData.js — Single source of truth for all portfolio content.
// React components consume this data; nothing is hardcoded in JSX markup.
// =============================================================================

import sdgSprints from '../assets/sdg_sprints.png'
import hackxAccolade from '../assets/hackx_accolade.png'
import coderallyAccolade from '../assets/coderally_accolade.png'
import leagueLeaders from '../assets/league_leaders.png'
import federatedLearning from '../assets/federated_learning_pub.png'
import privacyIccp from '../assets/privacy_iccp_pub.png'


// ---------------------------------------------------------------------------
// ALPHA STARS — Hero Stellar Constellation Map role nodes
// xPct / yPct are the percentage-based canvas positions (0–1) for each node.
// ---------------------------------------------------------------------------
export const alphaStars = [
  {
    id: 'fullstack',
    title: 'Fullstack Developer',
    tagline: 'Architecting end-to-end digital environments.',
    stack: 'React.js • Tailwind CSS • Spring Boot • MongoDB • Java',
    xPct: 0.22,
    yPct: 0.32,
  },
  {
    id: 'iot',
    title: 'IoT Developer',
    tagline: 'Engineering real-time cyber-physical telemetries.',
    stack: 'ESP32 • MQTT • WebSockets • REST APIs • Grafana',
    xPct: 0.72,
    yPct: 0.25,
  },
  {
    id: 'ar',
    title: 'AR Developer',
    tagline: 'Constructing immersive, spatial computing experiences.',
    stack: 'Unity • C# • Unity Barracuda • 3D Reconstruction',
    xPct: 0.30,
    yPct: 0.70,
  },
  {
    id: 'ecosystem',
    title: 'Ecosystem Builder',
    tagline: 'Aligning technical human networks for global impact.',
    stack: 'Community Management • Leadership • Volunteering • Project Operations',
    xPct: 0.75,
    yPct: 0.68,
  },
];

// ---------------------------------------------------------------------------
// PROFILE
// ---------------------------------------------------------------------------
export const profile = {
  name: "Thulani Magedara",
  title: "Applications Engineer",
  subtitle: "Full-Stack & IoT Developer",
  location: "Sri Lanka",
  email: "thulanimagedara@gmail.com",
  phone: "+94 74 087 6190",
  github: "https://github.com/ttmagedara2001",
  linkedin: "https://www.linkedin.com/in/thulani-magedara/",
  about:
    "Innovative and adaptable developer skilled in Java, React, Spring Boot, and SQL/NoSQL, with hands-on experience in building full-stack applications, IoT systems, and AR-based solutions. Passionate about crafting efficient, user-focused software while thriving in collaborative, fast-paced environments. Known for strong problem-solving, leadership, and the ability to turn ideas into impactful digital solutions.",
};

// ---------------------------------------------------------------------------
// EDUCATION
// ---------------------------------------------------------------------------
export const education = [
  {
    id: "edu-1",
    degree: "BSc (Hons) in Electronics and Computer Science",
    institution: "University of Kelaniya",
    gpa: "3.63 / 4.00",
    graduationYear: "2026",
    status: "Undergraduate",
    coursework: [
      "Software Engineering",
      "Database Management Systems",
      "Machine Learning & AI",
      "IoT Systems & Embedded Systems",
      "Industrial Automation",
      "Enterprise Application Development with Java",
      "Data Structures and Algorithms",
      "Object-Oriented Programming with Java",
      "Industrial Electronics",
    ],
  },
];

// ---------------------------------------------------------------------------
// PROFESSIONAL EXPERIENCE
// ---------------------------------------------------------------------------
export const experience = [
  {
    id: "exp-1",
    role: "Applications Engineer — Intern",
    company: "Protonest IoT Pvt. Ltd.",
    duration: "6 Months",
    type: "Internship",
    highlights: [
      {
        category: "Frontend & UI/UX",
        detail:
          "Designed Userflow Diagrams and developed mobile-responsive dashboards for three flagship apps (Plant, Factory, and Fleet Management) using React.js, Tailwind CSS, and Figma.",
      },
      {
        category: "Firmware & Testing",
        detail:
          "Developed ESP32 firmware for concurrency testing; used MQTTX to validate MQTT topics and protocol reliability across IoT nodes.",
      },
      {
        category: "Tools & Monitoring",
        detail:
          "Conducted API testing via Postman, visualised real-time telemetry in Grafana, and produced technical demo videos for client pitches.",
      },
      {
        category: "Deployment & CI/CD",
        detail:
          "Managed application deployment and maintained CI/CD pipelines using GitHub Actions to automate builds, testing, and continuous delivery.",
      },
      {
        category: "AI-Enhanced Development",
        detail:
          "Leveraged GitHub Copilot, Claude (Sonnet/Opus), and GPT with Agent Mode, Planning, and RAG architectures to optimise code efficiency and system architecture.",
      },
    ],
    tags: [
      "React.js",
      "Tailwind CSS",
      "ESP32",
      "MQTT",
      "Grafana",
      "Postman",
      "GitHub Actions",
      "Figma",
    ],
  },
];

// ---------------------------------------------------------------------------
// PROJECTS
// ---------------------------------------------------------------------------
export const projects = [
  {
    id: "proj-1",
    phase: "PROJECT 01",
    tagline: "CYBER-PHYSICAL INFRASTRUCTURE",
    title: "IoT Real-Time Telemetry Fleet Dashboards",
    subtitle: "Protonest IoT Pvt Ltd",
    description: "Three mobile-responsive dashboards (Plant, Factory, Fleet) with real-time WebSocket telemetry, historical trends, and REST API actuator control. Powered by automated CI/CD and AI-optimized architecture logic.",
    techStack: ["React.js", "Tailwind CSS", "ESP32", "MQTT", "WebSockets", "REST", "GitHub Actions", "Grafana"],
    github: "https://github.com/ttmagedara2001",
    category: "IoT / Full-Stack",
    featured: true,
    icon: "LayoutDashboard",
    metrics: {
      complexity: 88,
      readiness: 95,
      health: 98,
      baudRate: 115200,
      sector: "SEC_01.A",
      systemLoad: "42%"
    }
  },
  {
    id: "proj-2",
    phase: "PROJECT 02",
    tagline: "SPATIAL COMPUTING VECTORS",
    title: "'Sigiri Yathra' Augmented Reality Portal",
    subtitle: "Cultural Heritage Reconstruction",
    description: "Landmark-recognition AR application identifying historical ruins (Lion's Paw Entrance, Royal Palace) to render high-fidelity, real-time 3D reconstructions with on-device ONNX machine learning models.",
    techStack: ["Unity", "C#", "ONNX", "Unity Barracuda", "Blender", "Agisoft Metashape"],
    github: "https://github.com/ttmagedara2001",
    category: "AR / ML",
    featured: true,
    icon: "Layers",
    metrics: {
      complexity: 92,
      readiness: 90,
      health: 94,
      baudRate: 9600,
      sector: "SEC_02.B",
      systemLoad: "78%"
    }
  },
  {
    id: "proj-3",
    phase: "PROJECT 03",
    tagline: "EMBEDDED MACHINE LEARNING",
    title: "Bin Matrix: Smart Composting System",
    subtitle: "Sensor Fusion & Waste Segregation",
    description: "Automated waste segregation smart system incorporating sensor fusion models, MQ gas/moisture diagnostics, and TensorFlow Lite edge computing connected to native cloud tracking web apps.",
    techStack: ["ESP32-CAM", "TensorFlow Lite", "C++", "MQTT", "React", "Flutter", "Hybrid Logic"],
    github: "https://github.com/ttmagedara2001",
    category: "IoT / ML",
    featured: true,
    icon: "Cpu",
    metrics: {
      complexity: 95,
      readiness: 92,
      health: 96,
      baudRate: 115200,
      sector: "SEC_03.C",
      systemLoad: "64%"
    }
  },
  {
    id: "proj-4",
    phase: "PROJECT 04",
    tagline: "FULL-STACK PORTALS",
    title: "Fetch Me Home Pet Adoption Engine",
    subtitle: "End-to-End Animal Shelter Portal",
    description: "Full-stack web platform connecting animal shelters with active communities. Features filtered multi-attribute pet browsing pipelines, secure data schemas, and dedicated administration management dashboards.",
    techStack: ["React.js", "Spring Boot", "MongoDB", "RESTful APIs"],
    github: "https://github.com/ttmagedara2001",
    category: "Full-Stack",
    featured: false,
    icon: "Heart",
    metrics: {
      complexity: 82,
      readiness: 98,
      health: 99,
      baudRate: 9600,
      sector: "SEC_04.D",
      systemLoad: "31%"
    }
  },
  {
    id: "proj-5",
    phase: "PROJECT 05",
    tagline: "EMBEDDED SYSTEMS PROTOCOLS",
    title: "Easy Park Real-Time Infrastructure",
    subtitle: "Smart Proximity Sensor Network",
    description: "Real-time hardware-driven slot detection micro-prototype mapping sensor feedback arrays directly onto consumer client smartphone screens for remote slot reservations.",
    techStack: ["Arduino", "C", "IoT Sensors", "Embedded Systems"],
    github: "https://github.com/ttmagedara2001",
    category: "IoT / Embedded",
    featured: false,
    icon: "Car",
    metrics: {
      complexity: 78,
      readiness: 96,
      health: 97,
      baudRate: 9600,
      sector: "SEC_05.E",
      systemLoad: "18%"
    }
  }
];

// ---------------------------------------------------------------------------
// SKILLS
// ---------------------------------------------------------------------------
export const skillGroups = [
  {
    id: "skills-lang",
    label: "Languages",
    icon: "Code2",
    skills: ["Java", "C", "C#", "JavaScript", "SQL"],
  },
  {
    id: "skills-web",
    label: "Web Development",
    icon: "Globe",
    skills: [
      "HTML",
      "CSS",
      "React.js",
      "Spring Boot",
      "RESTful APIs",
      "WebSockets",
    ],
  },
  {
    id: "skills-iot",
    label: "IoT & Hardware",
    icon: "Cpu",
    skills: [
      "ESP32",
      "Arduino",
      "Firmware Development",
      "MQTTX",
      "Concurrency Testing",
      "MQTT Protocol",
    ],
  },
  {
    id: "skills-db",
    label: "Databases",
    icon: "Database",
    skills: ["MySQL", "MongoDB"],
  },
  {
    id: "skills-tools",
    label: "Tools & Deployment",
    icon: "Wrench",
    skills: [
      "CI/CD",
      "GitHub Actions",
      "Git",
      "VS Code",
      "IntelliJ IDEA",
      "Figma",
      "Grafana",
      "Postman",
      "Swagger",
    ],
  },
  {
    id: "skills-ai",
    label: "AI Productivity",
    icon: "Bot",
    skills: [
      "RAG Architectures",
      "Agentic Workflows",
      "Planning Mode",
      "GitHub Copilot",
      "Claude (Sonnet / Opus)",
    ],
  },
];

// ---------------------------------------------------------------------------
// PUBLICATIONS
// ---------------------------------------------------------------------------
export const publications = [
  {
    id: "pub-1",
    title:
      "Federated Learning for Privacy-Preserving Cyber Bullying Detection",
    type: "Abstract",
    venue:
      "5th Global Conference on Children and Youth",
    venueFull: "5th Global Conference on Children and Youth, Oxford, UK",
    date: "March 2025",
    tags: ["Federated Learning", "Privacy-Preserving ML", "Cyber Safety"],
    telemetry: "Proposed cutting-edge decentralized machine learning models to identify cyberbullying patterns while rigidly safeguarding child data privacy at the edge.",
    image: federatedLearning
  },
  {
    id: "pub-2",
    title:
      "Privacy Preserving Cyber Bullying Detection using Federated Learning",
    type: "Abstract",
    venue: "International Conference on Child Protection (ICCP) 2025",
    venueFull:
      "International Conference on Child Protection (ICCP) 2025, University of Kelaniya",
    date: "August 2025",
    tags: ["Federated Learning", "Child Protection", "NLP"],
    telemetry: "Engineered technical privacy-preserving model risk mitigation strategies complying with strict international sensitive data protection standards.",
    image: privacyIccp
  },
];

// ---------------------------------------------------------------------------
// AWARDS & ACHIEVEMENTS
// ---------------------------------------------------------------------------
export const awards = [
  {
    id: "award-1",
    title: "Winner — SDG Sprints Challenge",
    organiser: "IEEE Sri Lanka Section SIGHT",
    year: "2026",
    icon: "Trophy",
    tier: "gold",
    telemetry: "Secured top rank by engineering high-impact digital workflows directly mapped to United Nations Sustainable Development Goals.",
    image: sdgSprints
  },
  {
    id: "award-2",
    title: "1st Runners-Up — HackX 10.0",
    organiser: "Department of Industrial Management, University of Kelaniya",
    year: "2025",
    icon: "Medal",
    tier: "silver",
    telemetry: "Built and pitched a high-fidelity technology prototype under intense, time-constrained hackathon development conditions.",
    image: hackxAccolade
  },
  {
    id: "award-3",
    title: "Finalist — CodeRally 4.0",
    organiser: "IEEE Student Branch, IIT",
    year: "2023",
    icon: "Award",
    tier: "bronze",
    telemetry: "Advanced to the final stage of a highly competitive, algorithmic speed-coding sprint ecosystem.",
    image: coderallyAccolade
  },
  {
    id: "award-4",
    title: "Finalist — League of Leaders '23",
    organiser: "Commerce Club, University of Kelaniya",
    year: "2023",
    icon: "Star",
    tier: "bronze",
    telemetry: "Evaluated and selected among elite student teams for strategic project resolution and operations layout.",
    image: leagueLeaders
  },
];

// ---------------------------------------------------------------------------
// LEADERSHIP & EXTRACURRICULAR
// ---------------------------------------------------------------------------
export const leadership = [
  {
    id: "lead-1",
    role: "President",
    period: "2024–2025",
    organisation: "Humane Society of University of Kelaniya",
  },
  {
    id: "lead-2",
    role: "Vice President",
    period: "2023–2024",
    organisation: "Humane Society of University of Kelaniya",
  },
  {
    id: "lead-3",
    role: "Secretary",
    period: "2023–2024",
    organisation: "KelaniSTEAM — University of Kelaniya",
  },
  {
    id: "lead-4",
    role: "Industry Relations Lead",
    period: "2023–2024",
    organisation: "Electronics and Computer Science Club, UOK",
  },
  {
    id: "lead-5",
    role: "Organising Committee VP — Partnership Development",
    period: "2023",
    organisation: "CEO 2.0, AIESEC in UOK",
  },
];
