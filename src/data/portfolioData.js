// =============================================================================
// portfolioData.js — Single source of truth for all portfolio content.
// React components consume this data; nothing is hardcoded in JSX markup.
// =============================================================================

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
    title: "IoT Dashboard Suite",
    subtitle: "Protonest IoT Pvt. Ltd.",
    description:
      "Three mobile-responsive dashboards (Plant, Factory, Fleet) featuring real-time WebSocket telemetry streams, historical trend visualisation, and REST API actuator control — built to accelerate client acquisition.",
    techStack: [
      "React.js",
      "Tailwind CSS",
      "ESP32",
      "MQTT",
      "WebSockets",
      "REST API",
      "GitHub Actions",
      "Postman",
      "Grafana",
    ],
    category: "IoT / Full-Stack",
    featured: true,
    icon: "LayoutDashboard",
  },
  {
    id: "proj-2",
    title: "Sigiri Yathra",
    subtitle: "Augmented Reality for Cultural Heritage",
    description:
      "Landmark-recognition AR app that identifies UNESCO-listed historical sites (Lion's Paw, Royal Palace Ruins, etc.) and renders real-time 3D reconstructions with contextual information panels.",
    techStack: [
      "Unity",
      "C#",
      "ONNX",
      "Unity Barracuda",
      "Blender",
      "Agisoft Metashape",
    ],
    category: "AR / ML",
    featured: true,
    icon: "Layers",
  },
  {
    id: "proj-3",
    title: "Bin Matrix",
    subtitle: "Smart Waste Management System",
    description:
      "Automated waste segregation smart bin with connected mobile and web apps. Employs hybrid rule-based logic and embedded TensorFlow Lite ML for on-device classification, with sensor-driven MQTT/HTTP telemetry.",
    techStack: [
      "ESP32",
      "ESP32-CAM",
      "MQ Gas Sensors",
      "Moisture Sensors",
      "TensorFlow Lite",
      "C++",
      "Flutter",
      "React",
      "MQTT",
      "HTTP",
    ],
    category: "IoT / ML",
    featured: true,
    icon: "Cpu",
  },
  {
    id: "proj-4",
    title: "Fetch Me Home",
    subtitle: "Web-based Pet Adoption Platform",
    description:
      "End-to-end adoption portal connecting animal shelters with prospective owners. Features filtered pet browsing, shelter admin dashboards, and automated adoption request processing.",
    techStack: ["React.js", "Spring Boot", "MongoDB", "REST API"],
    category: "Full-Stack",
    featured: false,
    icon: "Heart",
  },
  {
    id: "proj-5",
    title: "Easy Park",
    subtitle: "Smart Car Parking System",
    description:
      "Real-time sensor-driven parking slot detection prototype with a connected mobile interface for slot reservation. Demonstrates low-latency IoT event handling at the embedded level.",
    techStack: ["Arduino", "C", "IoT Sensors", "Embedded Systems"],
    category: "IoT / Embedded",
    featured: false,
    icon: "Car",
  },
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
  },
  {
    id: "award-2",
    title: "1st Runners-Up — HackX 10.0",
    organiser: "Department of Industrial Management, University of Kelaniya",
    year: "2025",
    icon: "Medal",
    tier: "silver",
  },
  {
    id: "award-3",
    title: "Finalist — CodeRally 4.0",
    organiser: "IEEE Student Branch, IIT",
    year: "2023",
    icon: "Award",
    tier: "bronze",
  },
  {
    id: "award-4",
    title: "Finalist — League of Leaders '23",
    organiser: "Commerce Club, University of Kelaniya",
    year: "2023",
    icon: "Star",
    tier: "bronze",
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
