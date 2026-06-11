import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Cpu, Globe, Brain, GraduationCap, Network, ShieldCheck } from 'lucide-react'

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
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            SYSTEMS_COGNITION // 01
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-sans">
            Bridging Physical Telemetry, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">
              Digital Space & Human Networks
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
          {/* Left Column: Thematic Narrative Blocks */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Block 1: Orbital Trajectory */}
            <motion.div
              variants={blockVariants}
              className="group relative p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400 group-hover:scale-125 transition-transform duration-300" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400 group-hover:scale-125 transition-transform duration-300" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400 group-hover:scale-125 transition-transform duration-300" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400 group-hover:scale-125 transition-transform duration-300" />

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <div className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase mb-1">
                    SECTOR_01 // THE ORBITAL TRAJECTORY
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 uppercase tracking-wide mb-3">
                    Academic Foundation & Core Principles
                  </h3>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed font-sans">
                    Forging a dual-competency trajectory at the convergence of hardware mechanics and software engines. Pursuing a <span className="text-cyan-400 font-semibold">BSc (Hons) in Electronics and Computer Science</span> at the University of Kelaniya, sustaining an excellent <span className="text-indigo-400 font-semibold font-mono">3.63 GPA</span>. Designing enterprise architectures built to process high loads, optimize computational footprints, and translate raw telemetry into actionable intelligence.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Block 2: Cyber-Physical & Spatial Engine */}
            <motion.div
              variants={blockVariants}
              className="group relative p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] hover:border-indigo-500/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-indigo-400 group-hover:scale-125 transition-transform duration-300" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-indigo-400 group-hover:scale-125 transition-transform duration-300" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-indigo-400 group-hover:scale-125 transition-transform duration-300" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-indigo-400 group-hover:scale-125 transition-transform duration-300" />

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-indigo-400 shrink-0">
                  <Cpu size={20} />
                </div>
                <div>
                  <div className="text-[11px] font-mono tracking-widest text-indigo-400 uppercase mb-1">
                    SECTOR_02 // SYSTEM LAYERS & SPATIAL MATRIX
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 uppercase tracking-wide mb-3">
                    Embedded Telemetry & Immersive Execution
                  </h3>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed font-sans">
                    Constructing low-latency, cyber-physical feedback loops. Specializing in bare-metal concurrency validation on <span className="text-indigo-400 font-semibold">ESP32 microcontrollers</span>, automated <span className="text-cyan-400 font-semibold">GitHub Actions CI/CD pipelines</span>, and real-time WebSocket communication channels. Simultaneously engineering immersive virtual realities via Unity and C#, deploying embedded <span className="text-purple-400 font-semibold font-mono">ONNX/Unity Barracuda ML runtimes</span> for edge-computed 3D historical site reconstructions.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Block 3: Distributed Intelligence & Ecosystem Leadership */}
            <motion.div
              variants={blockVariants}
              className="group relative p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] hover:border-purple-500/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-purple-400 group-hover:scale-125 transition-transform duration-300" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-purple-400 group-hover:scale-125 transition-transform duration-300" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-purple-400 group-hover:scale-125 transition-transform duration-300" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-purple-400 group-hover:scale-125 transition-transform duration-300" />

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-500/20 text-purple-400 shrink-0">
                  <Network size={20} />
                </div>
                <div>
                  <div className="text-[11px] font-mono tracking-widest text-purple-400 uppercase mb-1">
                    SECTOR_03 // DISTRIBUTED NETWORKS & ORG CORE
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 uppercase tracking-wide mb-3">
                    Federated Learning & Collaborative Ecosystems
                  </h3>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed font-sans">
                    Pioneering privacy-centric intelligence structures. Co-authored international research publications demonstrating <span className="text-purple-400 font-semibold">Federated Learning</span> models to preserve privacy in cyberbullying detection. Fueling human networks as President of the Humane Society, Industry Relations Lead of the Electronics and Computer Science Club, and Secretary for KelaniSTEAM—structuring technical and social ecosystems for industry-scale impact.
                  </p>
                </div>
              </div>
            </motion.div>

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
