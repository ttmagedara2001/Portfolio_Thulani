import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Cpu, Globe, Brain, GraduationCap, Network, ShieldCheck } from 'lucide-react'
import uokLogo from '../assets/uok_logo.png'
import shcLogo from '../assets/shc_logo.jpg'

// Terminal contents for tech stack sections
const DIAGNOSTIC_DATA = {
  languages: {
    title: 'LAYER_01: LANGUAGE_STACK',
    status: 'ACTIVE',
    logs: [
      'INITIALIZING LANGUAGE RUNTIME SUBSYSTEM...',
      'SYSTEM DETECTED: JDK 19, MSVC Compilers, GCC Engine',
      'ESTABLISHING BARE-METAL & RUNTIME PROTOCOLS:',
      '  - JAVA: Enterprise Architecture & OOP Subsystems',
      '  - C / C#: Low-level concurrency & memory safety controllers',
      '  - JAVASCRIPT: High-throughput asynchronous event loops',
      '  - SQL: Relational schemas & highly optimized index engines',
      'VERIFICATION SUCCESSFUL: 100% OPERATIONAL CAPACITY'
    ]
  },
  web_cloud: {
    title: 'LAYER_02: ENTERPRISE_WEB_SYSTEMS',
    status: 'ACTIVE',
    logs: [
      'ESTABLISHING ENDPOINT ROUTING SERVICES...',
      'CONFIGURED TELEMETRIES: WebSockets, REST API Gateway',
      'DEPLOYED SERVICES:',
      '  - FRONTEND: React.js (V4 Engine) & Tailwind CSS Grid Layouts',
      '  - BACKEND: Spring Boot High-Throughput REST Controllers',
      '  - DATABASE: NoSQL MongoDB Clustering & SQL Integrations',
      '  - CI/CD GATEWAY: Automated GitHub Actions Build Pipelines',
      'ALL HOSTS SECURE // WEB ENGINE CONNECTED'
    ]
  },
  iot_hardware: {
    title: 'LAYER_03: CYBER_PHYSICAL_SYSTEMS',
    status: 'STABLE',
    logs: [
      'POLLING PERIPHERALS & SENSOR MATRIX...',
      'HARDWARE LAYER: ESP32, Arduino Microcontrollers',
      'TELEMETRY DATA BUS:',
      '  - MQTT Protocol: Low-latency MQTTX verified topic streams',
      '  - WebSockets: Real-time telemetry dashboard socket channels',
      '  - Grafana Interface: High-resolution hardware monitoring charts',
      '  - Bare-Metal Testing: Multithreading ESP32 firmware concurrency',
      'COMMUNICATIONS STABLE // SIGNAL SIGNAL_OK'
    ]
  },
  ai_data: {
    title: 'LAYER_04: DISTRIBUTED_INTELLIGENCE',
    status: 'RESONANT',
    logs: [
      'LOADING TENSOR MODELS & NEURAL PATHWAYS...',
      'ACTIVE ALGORITHMS:',
      '  - Federated Learning: Privacy-preserving NLP model clusters',
      '  - Unity Barracuda: On-device ONNX runtime environment execution',
      '  - TensorFlow Lite: Embedded classifier neural nets',
      '  - RAG / Agentic: Advanced logical pipeline generators',
      'RESEARCH PAPERS SUBMITTED // ICCP & GACY VENUES',
      'INTELLIGENCE STACK INITIALIZED'
    ]
  }
}

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState('languages')
  const [typedLogs, setTypedLogs] = useState([])
  const [logIndex, setLogIndex] = useState(0)
  const [leftTab, setLeftTab] = useState('focus')
  const [showCoursework, setShowCoursework] = useState(false)

  // Terminal Typing Simulation Effect
  useEffect(() => {
    setTypedLogs([])
    setLogIndex(0)
  }, [activeTab])

  useEffect(() => {
    const currentLogs = DIAGNOSTIC_DATA[activeTab].logs
    if (logIndex < currentLogs.length) {
      const timer = setTimeout(() => {
        setTypedLogs(prev => [...prev, currentLogs[logIndex]])
        setLogIndex(logIndex + 1)
      }, 120) // Fast typing simulation
      return () => clearTimeout(timer)
    }
  }, [logIndex, activeTab])

  // Scroll Fade-In Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const blockVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 px-6 lg:px-12 flex flex-col justify-center overflow-hidden border-t border-white/[0.04]"
      style={{
        background: 'linear-gradient(180deg, #02000a 0%, #030014 50%, #020009 100%)'
      }}
    >
      {/* Space Radar & Grid Decorative Underlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" aria-hidden="true">
        <svg className="absolute w-full h-full text-indigo-500/[0.08]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-indigo-500/10 border-dashed animate-[spin_120s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-cyan-500/10 animate-[spin_85s_linear_infinite_reverse]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header HUD Marker */}
        <div className="mb-16 md:mb-20 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm tracking-[0.4em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            ABOUT_ME // 01
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight font-sans">
            My Profile & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">
              Professional Journey
            </span>
          </h2>
        </div>

        {/* Asymmetric Asynchronous Column Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left Column: Interactive Subsystem Diagnostic Selector */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Interactive Left Column Tabs */}
            <div className="flex border-b border-white/[0.06] mb-8 gap-6 font-mono text-xs md:text-sm select-none overflow-x-auto scrollbar-none">
              {[
                { id: 'focus', label: 'TECH_SPECIALTIES', icon: Cpu },
                { id: 'education', label: 'EDUCATION', icon: GraduationCap },
                { id: 'leadership', label: 'LEADERSHIP', icon: Network }
              ].map((tab) => {
                const Icon = tab.icon
                const active = leftTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setLeftTab(tab.id)}
                    className={`relative pb-3 flex items-center gap-2 tracking-widest whitespace-nowrap transition-colors duration-300 ${
                      active ? 'text-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                    {active && (
                      <motion.div
                        layoutId="activeLeftTabBorder"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Tab Panels */}
            <div className="flex-1 min-h-[300px]">
              <AnimatePresence mode="wait">
                {leftTab === 'focus' && (
                  <motion.div
                    key="focus"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Card 1: Full-Stack */}
                    <div className="group relative p-5 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] hover:border-cyan-500/20 transition-all duration-300">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-slate-100 uppercase tracking-wide">
                          Full-Stack Systems
                        </h3>
                        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">
                          ACTIVE
                        </span>
                      </div>
                      <p className="text-sm md:text-base text-slate-400 mb-3 leading-relaxed">
                        Architecting high-throughput backend services and responsive, fluid user interfaces.
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {['React.js', 'Spring Boot', 'MongoDB', 'Java', 'Tailwind CSS'].map(tag => (
                          <span key={tag} className="text-xs font-mono text-slate-400 bg-[#070514] border border-white/[0.05] px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card 2: IoT & Cyber-Physical */}
                    <div className="group relative p-5 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] hover:border-indigo-500/20 transition-all duration-300">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-slate-100 uppercase tracking-wide">
                          IoT & Embedded Systems
                        </h3>
                        <span className="text-xs font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-500/20 px-2 py-0.5 rounded">
                          CYBER-PHYSICAL
                        </span>
                      </div>
                      <p className="text-sm md:text-base text-slate-400 mb-3 leading-relaxed">
                        Building real-time telemetry streams and bare-metal firmware with concurrency validation.
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {['ESP32', 'MQTT', 'WebSockets', 'Grafana', 'Arduino', 'C/C++'].map(tag => (
                          <span key={tag} className="text-xs font-mono text-slate-400 bg-[#070514] border border-white/[0.05] px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card 3: AI & AR Spatial Computing */}
                    <div className="group relative p-5 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] hover:border-purple-500/20 transition-all duration-300">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-slate-100 uppercase tracking-wide">
                          AI & Immersive Systems
                        </h3>
                        <span className="text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-500/20 px-2 py-0.5 rounded">
                          INTELLIGENCE
                        </span>
                      </div>
                      <p className="text-sm md:text-base text-slate-400 mb-3 leading-relaxed">
                        Deploying edge intelligence models and building immersive landmark-recognition AR applications.
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {['Federated Learning', 'Unity & C#', 'Unity Barracuda', 'TensorFlow Lite'].map(tag => (
                          <span key={tag} className="text-xs font-mono text-slate-400 bg-[#070514] border border-white/[0.05] px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {leftTab === 'education' && (
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-6"
                  >
                    {/* University of Kelaniya Card */}
                    <div className="group relative p-5 rounded-xl border border-white/[0.04] bg-[#050212]/80 hover:bg-[#07041a]/95 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm">
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/30 group-hover:scale-125 transition-transform duration-300" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/30 group-hover:scale-125 transition-transform duration-300" />

                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/[0.08] bg-white flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                          <img
                            src={uokLogo}
                            alt="University of Kelaniya Logo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 w-full">
                          <div className="flex flex-wrap justify-between items-start gap-1 mb-1">
                            <h4 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                              UNIVERSITY OF KELANIYA
                            </h4>
                            <span className="text-xs font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05]">
                              2022 - 2026
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 mb-1 leading-snug">
                            BSc (Hons) in Electronics and Computer Science
                          </h3>
                          
                          <div className="flex items-center gap-3 mb-3 text-sm">
                            <span className="text-slate-400 font-medium">Undergraduate</span>
                            <span className="w-1 h-1 rounded-full bg-slate-600" />
                            <span className="text-emerald-400 font-semibold font-mono">GPA 3.63 / 4.00</span>
                          </div>

                          <p className="text-sm md:text-base text-slate-400 mb-4 leading-relaxed">
                            Pursuing rigorous studies at the intersection of embedded hardware logic, software engines, and artificial intelligence models.
                          </p>

                          {/* Interactive Coursework Toggle */}
                          <div className="w-full">
                            <button
                              onClick={() => setShowCoursework(!showCoursework)}
                              className="flex items-center gap-2 text-xs md:text-sm font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors py-1 px-3 rounded bg-cyan-950/20 border border-cyan-500/20"
                            >
                              <span>{showCoursework ? 'HIDE_COURSEWORK' : 'VIEW_COURSEWORK'}</span>
                              <span className={`transition-transform duration-300 inline-block text-[10px] ${showCoursework ? 'rotate-180' : ''}`}>
                                ▼
                              </span>
                            </button>

                            <AnimatePresence>
                              {showCoursework && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-4 flex flex-wrap gap-2">
                                    {[
                                      "Software Engineering",
                                      "Database Management Systems",
                                      "Machine Learning & AI",
                                      "IoT & Embedded Systems",
                                      "Enterprise Java Dev",
                                      "Data Structures & Algorithms",
                                      "Object-Oriented Programming",
                                      "Industrial Electronics",
                                      "Industrial Automation"
                                    ].map(course => (
                                      <span key={course} className="text-xs font-mono text-slate-300 bg-indigo-950/20 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                                        {course}
                                      </span>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sacred Heart Convent Card */}
                    <div className="group relative p-5 rounded-xl border border-white/[0.04] bg-[#050212]/80 hover:bg-[#07041a]/95 hover:border-indigo-500/30 transition-all duration-300 backdrop-blur-sm">
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-indigo-500/30 group-hover:scale-125 transition-transform duration-300" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-indigo-500/30 group-hover:scale-125 transition-transform duration-300" />

                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/[0.08] bg-white flex items-center justify-center p-1 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                          <img
                            src={shcLogo}
                            alt="Sacred Heart Convent Logo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 w-full">
                          <div className="flex flex-wrap justify-between items-start gap-1 mb-1">
                            <h4 className="text-xs font-mono tracking-widest text-indigo-400 uppercase">
                              SACRED HEART CONVENT - GALLE
                            </h4>
                            <span className="text-xs font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05]">
                              Alumna
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 mb-1 leading-snug">
                            Primary & Secondary Education
                          </h3>
                          
                          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                            Built a strong analytical foundation in Physical Sciences and Mathematics, while developing active leadership roles in school clubs and activities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {leftTab === 'leadership' && (
                  <motion.div
                    key="leadership"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-4"
                  >
                    {[
                      {
                        role: "President",
                        org: "Humane Society of University of Kelaniya",
                        period: "2024 - 2025",
                        color: "border-cyan-500/30",
                        iconColor: "text-cyan-400",
                        detail: "Directed organization strategies, managed volunteer teams, and coordinated community animal welfare outreach programs."
                      },
                      {
                        role: "Secretary",
                        org: "KelaniSTEAM — University of Kelaniya",
                        period: "2023 - 2024",
                        color: "border-indigo-500/30",
                        iconColor: "text-indigo-400",
                        detail: "Structured project operations, compiled administrative protocols, and organized cross-disciplinary STEM workshops."
                      },
                      {
                        role: "Industry Relations Lead",
                        org: "Electronics & Computer Science Club, UOK",
                        period: "2023 - 2024",
                        color: "border-purple-500/30",
                        iconColor: "text-purple-400",
                        detail: "Connected undergraduate talent with industry giants, orchestrated networking summits, and coordinated tech forums."
                      },
                      {
                        role: "Organising Committee VP — Partnerships",
                        org: "CEO 2.0, AIESEC in UOK",
                        period: "2023",
                        color: "border-emerald-500/30",
                        iconColor: "text-emerald-400",
                        detail: "Negotiated strategic partnerships, managed brand sponsor pipelines, and facilitated business-to-academic integration."
                      }
                    ].map((item, idx) => (
                      <div
                        key={item.role + idx}
                        className={`relative pl-5 border-l-2 ${item.color} py-1 hover:bg-white/[0.01] transition-colors rounded-r-lg pr-3`}
                      >
                        <span className={`absolute left-[-5px] top-3.5 w-2.5 h-2.5 rounded-full border border-[#030014] bg-current ${item.iconColor}`} />

                        <div className="flex flex-wrap justify-between items-start gap-1">
                          <h4 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                            {item.role}
                          </h4>
                          <span className="text-xs font-mono text-slate-500 bg-white/[0.02] px-2 py-0.5 rounded border border-white/[0.05]">
                            {item.period}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-indigo-300 mb-1 tracking-wide uppercase">
                          {item.org}
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>



          {/* Right Column: Minimalist Glassmorphic System Diagnostic Panel */}
          <motion.div
            variants={blockVariants}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="relative flex-1 flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-md overflow-hidden p-6">
              
              {/* Decorative Corner Bracket Lines */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-indigo-500/40" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-indigo-500/40" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-indigo-500/40" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-indigo-500/40" />
              
              {/* HUD Header */}
              <div className="flex justify-between items-center border-b border-white/[0.06] pb-4 mb-4 select-none font-mono text-[10px] tracking-wider text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-slate-300 font-semibold uppercase">SYSTEM DIAGNOSTIC PANEL</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Terminal size={12} className="text-cyan-400" />
                  <span>CORE_STACK v4.12</span>
                </div>
              </div>

              {/* Vector Grid Radar Scope details in mini scale */}
              <div className="relative h-20 border border-white/[0.05] rounded-lg bg-[#020008]/60 mb-6 overflow-hidden flex items-center justify-between px-4 font-mono select-none pointer-events-none">
                <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(3,0,20,0.8)]" />
                <div className="flex flex-col gap-0.5 z-10">
                  <span className="text-[9px] text-cyan-400/80">LATITUDE: 6.9697° N</span>
                  <span className="text-[9px] text-cyan-400/80">LONGITUDE: 79.9149° E</span>
                  <span className="text-[9px] text-indigo-400/70">ACADEMIC_GRID: UOK_CORE</span>
                </div>
                <div className="flex flex-col items-end gap-0.5 z-10 text-right">
                  <span className="text-[9px] text-emerald-400/80">TEL_SIGNAL: SECURE</span>
                  <span className="text-[9px] text-slate-500">SYS_TEMP: 38.6°C</span>
                  <span className="text-[9px] text-slate-500">CPU_LOAD: 2.4%</span>
                </div>
              </div>

              {/* Subsystem Select Tabs */}
              <div className="grid grid-cols-2 gap-2 mb-6 select-none font-mono">
                {[
                  { id: 'languages', label: 'LANGUAGES', icon: Brain },
                  { id: 'web_cloud', label: 'CLOUD & WEB', icon: Globe },
                  { id: 'iot_hardware', label: 'IOT & HW', icon: Cpu },
                  { id: 'ai_data', label: 'AI & DATA', icon: ShieldCheck }
                ].map(tab => {
                  const Icon = tab.icon
                  const active = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-semibold tracking-wider transition-all duration-300 ${
                        active
                          ? 'bg-indigo-600/15 border-indigo-500/40 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                          : 'bg-[#04010d]/50 border-white/[0.04] text-slate-400 hover:text-slate-200 hover:border-white/[0.08]'
                      }`}
                    >
                      <Icon size={14} className={active ? 'text-indigo-400' : 'text-slate-500'} />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Interactive Virtual Terminal Output */}
              <div className="flex-1 min-h-[200px] rounded-xl border border-white/[0.05] bg-[#020006]/90 p-4 font-mono text-xs leading-relaxed select-text overflow-y-auto">
                <div className="flex items-center justify-between border-b border-indigo-950/40 pb-2 mb-3 select-none text-[10px] text-indigo-400/80">
                  <span>TERMINAL_OUTPUT // {DIAGNOSTIC_DATA[activeTab].title}</span>
                  <span className="animate-pulse px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300">
                    STATUS_{DIAGNOSTIC_DATA[activeTab].status}
                  </span>
                </div>
                
                <div className="space-y-1.5 min-h-[160px]">
                  <AnimatePresence mode="popLayout">
                    {typedLogs.map((log, index) => {
                      const isHeading = index === 0 || index === 2 || log.startsWith('VERIFICATION') || log.startsWith('ALL') || log.startsWith('COMMUNICATIONS') || log.startsWith('INTELLIGENCE')
                      const isIndent = log.startsWith('  -')
                      return (
                        <motion.div
                          key={`${activeTab}-${index}`}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.15 }}
                          className={`${
                            isHeading
                              ? 'text-cyan-400 font-bold'
                              : isIndent
                              ? 'text-slate-300 pl-2'
                              : 'text-slate-400'
                          }`}
                        >
                          {isIndent ? (
                            <span>
                              <span className="text-indigo-500 mr-1.5">✦</span>
                              {log.replace('  - ', '')}
                            </span>
                          ) : (
                            <span>
                              <span className="text-slate-600 mr-2">&gt;</span>
                              {log}
                            </span>
                          )}
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                  
                  {/* Cursor Telemetry blinker */}
                  {logIndex < DIAGNOSTIC_DATA[activeTab].logs.length ? (
                    <div className="text-cyan-400 animate-pulse flex items-center gap-1 select-none pl-4">
                      <span className="w-1.5 h-3 bg-cyan-400 animate-[blink_0.8s_infinite]" />
                      <span className="text-[10px] text-slate-500 font-mono tracking-widest">LOADING CORE_REGISTERS...</span>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-emerald-400 flex items-center gap-1 select-none pt-2"
                    >
                      <span className="text-emerald-500 font-bold">&gt;</span>
                      <span className="font-semibold animate-[blink_1s_infinite]">█</span>
                      <span className="text-[10px] text-slate-500 tracking-wider">SYSTEM READY. STANDBY FOR LINK_PING.</span>
                    </motion.div>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Embedded styles for custom terminal blinking animations */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
