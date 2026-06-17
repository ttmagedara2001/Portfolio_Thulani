import { motion } from 'framer-motion'
import { Cpu, GraduationCap, Network, ShieldCheck, Plus, Calendar, Compass, Terminal } from 'lucide-react'
import internshipImg from '../assets/internship/internship.jpeg'

const MISSION_LOG = [
  {
    phase: "PHASE 01",
    tagline: "ACTIVE MISSION",
    role: "Applications Engineer - Intern",
    organization: "Protonest IoT Pvt. Ltd",
    timeline: "6 Months // 2026 DEPLOYMENT",
    telemetry: "Designed and developed high-fidelity IoT ecosystems to accelerate client acquisition, focusing on seamless frontend interfaces and robust firmware testing.",
    tech: ["React.js", "Tailwind CSS", "Figma", "ESP32", "MQTTX", "MQTT", "GitHub Actions", "Vercel", "Claude", "RAG", "Agentic Workflows"],
    bullets: [
      { category: "Frontend & UI/UX", detail: "Architected responsive telemetry dashboard systems for three flagship applications (Plant, Factory, and Fleet Management) using React.js, Tailwind CSS, and Figma." },
      { category: "Firmware & Concurrency", detail: "Engineered ESP32 firmware for scalability testing and utilized MQTTX to validate core MQTT topic protocols." },
      { category: "Pipelines & Automation", detail: "Established automated CI/CD pipelines using GitHub Actions to streamline software builds, testing, and continuous deployment over Vercel/Cloud gateways." },
      { category: "AI-Driven Workflow", detail: "Optimized system code logic and architecture efficiency using GitHub Copilot and Claude inside Agentic, Planning, and RAG frameworks." }
    ],
    coordinates: "LAT 6.9697° N // LON 79.9149° E",
    color: "from-cyan-400 via-cyan-500 to-indigo-500",
    glowColor: "rgba(34, 211, 238, 0.15)",
    borderColor: "group-hover:border-cyan-500/40",
    icon: Cpu
  }
]

export default function Experience() {
  // Container stagger variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  return (
    <section
      id="experience"
      className="relative w-full py-24 md:py-32 px-6 lg:px-12 flex flex-col justify-center overflow-hidden border-t border-white/[0.04]"
      style={{
        background: 'linear-gradient(180deg, #02000a 0%, #030014 50%, #020009 100%)'
      }}
    >
      {/* Tactical radar coordinate grids overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" aria-hidden="true">
        <svg className="absolute w-full h-full text-indigo-500/[0.08]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="experience-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#experience-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header HUD Descriptor */}
        <div className="mb-20 md:mb-24 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm tracking-[0.4em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            MISSION_CHRONOLOGY // 02
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight font-sans">
            Deployments & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">
              Active Milestones
            </span>
          </h2>
        </div>

        {/* Chronological Mission Log Track */}
        <div className="relative ml-2 sm:ml-6 md:ml-12 pl-6 sm:pl-10 md:pl-16 border-l-2 border-dashed border-white/[0.07]">
          
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-16"
          >
            {MISSION_LOG.map((log, index) => {
              const Icon = log.icon
              return (
                <motion.div
                  key={log.phase}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="group relative"
                >
                  {/* Glowing Scroll-Responsive Timeline Nodes */}
                  <motion.div
                    initial={{ scale: 0.8, backgroundColor: "rgba(30, 27, 75, 0.8)", borderColor: "rgba(255, 255, 255, 0.08)" }}
                    whileInView={{
                      scale: 1.1,
                      backgroundColor: "#030014",
                      borderColor: index === 0 ? "#22d3ee" : index === 1 ? "#6366f1" : index === 2 ? "#a855f7" : "#f43f5e",
                      boxShadow: `0 0 20px ${log.glowColor}`
                    }}
                    viewport={{ once: false, margin: "-120px" }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-[-35px] sm:left-[-51px] md:left-[-77px] top-0 w-8 h-8 rounded-full border bg-slate-950 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors z-20"
                  >
                    <Icon size={14} />
                  </motion.div>

                  {/* Glassmorphic Tactical Card */}
                  <div className="relative p-6 md:p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300 backdrop-blur-md">
                    
                    {/* Visual Corner Brackets */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/[0.08] group-hover:border-cyan-400/40 transition-colors duration-300" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/[0.08] group-hover:border-cyan-400/40 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/[0.08] group-hover:border-cyan-400/40 transition-colors duration-300" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/[0.08] group-hover:border-cyan-400/40 transition-colors duration-300" />

                    {/* Metadata Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.05] pb-4 mb-4 select-none font-mono text-[10px] sm:text-xs tracking-wider text-slate-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center text-slate-400">
                          <Plus size={12} className="text-cyan-400 mr-1" />
                          {log.phase}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                        <span className="text-indigo-400/80">{log.tagline}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center text-slate-400">
                          <Compass size={12} className="text-indigo-400 mr-1" />
                          {log.coordinates}
                        </span>
                      </div>
                    </div>

                    {/* Content Core Body */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                      {/* Internship photo panel */}
                      <div className="shrink-0 w-full md:w-[200px] h-[140px] md:h-auto relative rounded-xl overflow-hidden border border-white/[0.06] bg-[#02000c]/80">
                        <img
                          src={internshipImg}
                          alt="Protonest IoT Internship"
                          className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                        />
                        {/* Scanline + gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
                             style={{ background: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 50%)', backgroundSize: '100% 3px' }} />
                        {/* Label badge */}
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded
                                        bg-black/60 border border-cyan-500/20 font-mono text-[8px] text-cyan-400/80 tracking-widest">
                          <Terminal size={8} />
                          FIELD_OPS
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-black text-slate-100 tracking-wide uppercase leading-tight mb-1">
                          {log.role}
                        </h3>
                        <div className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-4">
                          {log.organization}
                        </div>
                        <p className="text-sm md:text-base text-slate-400 leading-relaxed font-sans mb-6">
                          {log.telemetry}
                        </p>

                        {/* Telemetry Bullets Grid (Mainly Phase 04) */}
                        {log.bullets.length > 0 && (
                          <div className="space-y-4 border-l border-white/[0.05] pl-4 mb-6">
                            {log.bullets.map((bullet, bIndex) => (
                              <div key={bIndex} className="text-sm text-slate-400 leading-relaxed">
                                <span className="text-cyan-400/80 font-mono text-xs uppercase tracking-wider block mb-1">
                                  &gt; {bullet.category}
                                </span>
                                {bullet.detail}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Time Duration Badge Container */}
                      <div className="shrink-0 flex items-start">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.05] bg-[#020008]/40 font-mono text-[10px] md:text-xs text-indigo-300">
                          <Calendar size={12} className="text-indigo-400" />
                          <span>{log.timeline}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tech Badges Container */}
                    <div className="flex flex-wrap gap-2 pt-2 select-none">
                      {log.tech.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] text-slate-400 hover:text-slate-200 transition-colors font-mono text-[10px] tracking-wider uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>
                </motion.div>
              )
            })}
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
