import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { Plus, Compass, ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react'
import { projects as PROJECT_CATALOG } from '../data/portfolioData'

// ── GlitchText Component for Projects Digital Decrypt Effect ────────────────
const GLITCH_CHARS = '01$#@%&?_+=*^[]<>█▓▒░▖▗▘▙▚▛▜▝▞▟'

function GlitchText({ text, isActive }) {
  const [displayText, setDisplayText] = useState(text)
  const iterationRef = useRef(0)

  useEffect(() => {
    if (!isActive) {
      setDisplayText(text)
      return
    }

    iterationRef.current = 0
    const textLength = text.length
    const intervalId = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '/' || char === '\'' || char === ':') return char
            if (index < iterationRef.current) return text[index]
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join('')
      })

      if (iterationRef.current >= textLength) {
        clearInterval(intervalId)
        setDisplayText(text)
      }
      iterationRef.current += 1.5
    }, 25)

    return () => clearInterval(intervalId)
  }, [isActive, text])

  return <span>{displayText}</span>
}

// ── Framer Motion Stagger Variants for Tech Stack ───────────────────────────
const techStackContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.08
    }
  }
}

const techStackBadgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 5 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 12
    }
  }
}

// ── Circular Gauge Component for Technical Spec Metrics ────────────────────
function CircularGauge({ value, label, color }) {
  const radius = 32
  const circumference = 2 * Math.PI * radius
  
  return (
    <div className="flex flex-col items-center gap-2 bg-slate-950/30 backdrop-blur-sm border border-indigo-500/10 p-3 rounded-xl relative overflow-hidden group/gauge w-full">
      {/* Tiny corner ticks for visual style */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-white/20" />
      <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-white/20" />
      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-white/20" />
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-white/20" />
      
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Background track circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="3"
            fill="transparent"
          />
          {/* Animated active path */}
          <motion.circle
            cx="32"
            cy="32"
            r={radius}
            stroke={color}
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (value / 100) * circumference }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 3px ${color})` }}
          />
        </svg>
        <span className="absolute font-mono text-[10px] font-bold text-white group-hover/gauge:scale-110 transition-transform">
          {value}%
        </span>
      </div>
      <span className="font-mono text-[8px] uppercase tracking-wider text-slate-400 text-center">
        {label}
      </span>
    </div>
  )
}

// ── Typing Logs Simulator for Cyber Cockpit Console Modal ───────────────────
const CONSOLE_LOG_LINES = [
  "INITIALIZING_PAYLOAD_DIAGNOSTICS...",
  "ESTABLISHING_SECURE_LINK: UPLINK_OK",
  "DECRYPTING_PROJECT_MANIFEST...",
  "RETRIEVING_SECTOR_COORDINATES: OK",
  "COMPILING_SOURCE_NODES...",
  "SYSTEM_HEALTH_CHECK: STATUS_GREEN",
  "DIAGNOSTICS_COMPLETED: READY_FOR_MISSION"
]

function CustomConsoleLogs({ active }) {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    if (!active) {
      setLogs([])
      return
    }

    let i = 0
    setLogs([CONSOLE_LOG_LINES[0]])
    const timer = setInterval(() => {
      i++
      if (i < CONSOLE_LOG_LINES.length) {
        setLogs(prev => [...prev, CONSOLE_LOG_LINES[i]])
      } else {
        clearInterval(timer)
      }
    }, 450)

    return () => clearInterval(timer)
  }, [active])

  return (
    <div className="bg-slate-950/30 backdrop-blur-sm border border-indigo-500/10 p-3.5 rounded-xl font-mono text-[9px] text-cyan-400/80 leading-relaxed shadow-inner overflow-hidden min-h-[140px] relative">
      <div className="flex items-center justify-between border-b border-white/[0.04] pb-2 mb-2 text-slate-500 text-[8px] uppercase select-none">
        <span>CONSOLE_LOGS</span>
        <span className="animate-pulse flex items-center gap-1 text-[7px] text-emerald-500">
          <span className="w-1 h-1 rounded-full bg-emerald-500" />
          ONLINE
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        {logs.map((log, logIdx) => (
          <div key={logIdx} className="flex gap-1.5 items-start">
            <span className="text-slate-600 select-none">&gt;</span>
            <span className={logIdx === logs.length - 1 ? "text-emerald-300 font-bold" : ""}>
              {log}
            </span>
          </div>
        ))}
        {logs.length < CONSOLE_LOG_LINES.length && (
          <span className="w-1.5 h-3 bg-emerald-400 inline-block animate-pulse mt-0.5" />
        )}
      </div>
    </div>
  )
}

// ── Dynamic 3D Card Hover Tilt Subcomponent ────────────────────────────────
function ProjectCard({ proj, idx, onMouseEnter, onMouseLeave, hoveredCardIndex, onClick }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Map mouse coordinate relative to card size to degrees of tilt rotation
  const rotateX = useTransform(y, [-150, 150], [10, -10])
  const rotateY = useTransform(x, [-210, 210], [-10, 10])

  function handleMouseMove(e) {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Relative coordinates centered on card (between -width/2 and width/2)
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2

    x.set(mouseX)
    y.set(mouseY)

    // Update CSS custom properties for radial spotlight tracker overlay
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
    onMouseLeave()
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -10,
        borderColor: 'rgba(34, 211, 238, 0.35)', 
        boxShadow: '0 20px 40px -15px rgba(34, 211, 238, 0.18)' 
      }}
      transition={{ type: "spring", stiffness: 85, damping: 14, delay: idx * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative w-[300px] md:w-[420px] shrink-0 snap-center rounded-2xl border border-indigo-500/15 bg-slate-950/20 hover:bg-slate-950/35 transition-[background-color] duration-300 p-6 md:p-8 backdrop-blur-lg overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      {/* Laser Tracer Neon Border Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl overflow-hidden z-[25]" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="16"
          className="fill-none stroke-cyan-400/0 group-hover:stroke-cyan-400 transition-colors duration-300"
          strokeWidth="1.5"
          strokeDasharray="120 450"
          style={{
            animation: 'border-trace 3s linear infinite',
            opacity: hoveredCardIndex === idx ? 0.85 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
      </svg>

      {/* Radar Sweeper HUD Line */}
      <div 
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          animation: 'sweep 3s linear infinite'
        }}
      />

      {/* Radial gradient hover glow tracker background overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.05), transparent 80%)'
        }}
      />

      {/* Tactical Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/[0.06] group-hover:border-cyan-400/60 group-hover:-translate-x-[3px] group-hover:-translate-y-[3px] transition-all duration-300 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/[0.06] group-hover:border-cyan-400/60 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] transition-all duration-300 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/[0.06] group-hover:border-cyan-400/60 group-hover:-translate-x-[3px] group-hover:translate-y-[3px] transition-all duration-300 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/[0.06] group-hover:border-cyan-400/60 group-hover:translate-x-[3px] group-hover:translate-y-[3px] transition-all duration-300 pointer-events-none" />

      {/* Card Details (Nested inside 3D transform preserve-3d) */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex flex-col justify-between h-full w-full">
        <div>
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-4 mb-4 select-none font-mono text-[10px] tracking-wider text-slate-500">
            <div className="flex items-center gap-2">
              <Plus size={10} className="text-cyan-400" />
              <span>{proj.phase}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span className="text-indigo-400/80">{proj.tagline}</span>
            </div>
            
            {/* Glowing GitHub Icon */}
            <motion.a
              href={proj.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1, rotate: 10, borderColor: 'rgba(34, 211, 238, 0.4)', boxShadow: '0 0 10px rgba(34, 211, 238, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 rounded-md border border-white/[0.05] bg-[#020008]/40 text-slate-400 hover:text-cyan-400 transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </motion.a>
          </div>

          {/* Subtitle / Company Badge */}
          <span className="inline-block px-2.5 py-0.5 mb-3 rounded border border-indigo-500/20 bg-indigo-950/20 text-indigo-300 font-mono text-[10px] uppercase tracking-wider">
            {proj.subtitle}
          </span>

          {/* Title with digital decryption decrypt effect */}
          <h3 className="text-lg md:text-xl font-bold text-slate-100 tracking-wide mb-3 leading-snug group-hover:text-cyan-300 transition-colors">
            <GlitchText text={proj.title} isActive={hoveredCardIndex === idx} />
          </h3>

          {/* Description */}
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-sans mb-6">
            {proj.description}
          </p>

          {/* Telemetry Status Bar - animates height and opacity on hover */}
          <div className="h-0 opacity-0 group-hover:h-5 group-hover:opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-between font-mono text-[9px] text-slate-500 border-t border-dashed border-white/[0.03] mt-2 pt-0 select-none pointer-events-none">
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400/80">PAYLOAD_LINK: ACTIVE</span>
            </span>
            <span>BAUD_RATE: {proj.metrics.baudRate} bps</span>
          </div>
        </div>

        {/* Tech stack badge lists */}
        <motion.div 
          variants={techStackContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.04] select-none"
        >
          {proj.techStack.map((tech) => (
            <motion.span
              key={tech}
              variants={techStackBadgeVariants}
              whileHover={{ scale: 1.08, color: '#22d3ee', backgroundColor: 'rgba(34, 211, 238, 0.05)', borderColor: 'rgba(34, 211, 238, 0.15)' }}
              className="px-2 py-0.5 rounded bg-slate-900/60 border border-white/[0.05] text-slate-400 font-mono text-[9px] tracking-widest uppercase transition-all duration-200"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

// ── Mission Diagnostic Cockpit Console Modal ───────────────────────────────
function ProjectDetailModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
    >
      {/* Background sweep laser line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent absolute top-0 left-0 animate-[sweep-vertical_4s_linear_infinite]" />
      </div>

      <motion.div
        initial={{ scale: 0.92, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 30, opacity: 0 }}
        transition={{ type: "spring", damping: 24, stiffness: 180 }}
        className="relative w-full max-w-4xl bg-slate-950/85 border border-cyan-500/25 shadow-[0_0_55px_rgba(6,182,212,0.15)] rounded-2xl p-6 md:p-10 backdrop-blur-xl overflow-hidden flex flex-col justify-between z-10"
      >
        {/* Tactical Corner Brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/50" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400/50" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400/50" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400/50" />

        {/* Modal Header */}
        <div className="flex justify-between items-start border-b border-white/[0.05] pb-6 mb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {project.phase} // {project.tagline}
            </div>
            <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight font-sans mt-1">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-white/[0.05] bg-slate-900/40 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body split panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8 text-left">
          
          {/* Specs Panel (Left Column) */}
          <div className="md:col-span-7 flex flex-col gap-6 w-full">
            <div>
              <span className="inline-block px-2.5 py-0.5 mb-3 rounded border border-indigo-500/20 bg-indigo-950/20 text-indigo-300 font-mono text-[10px] uppercase tracking-wider">
                {project.subtitle}
              </span>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* Custom Console log simulator */}
            <CustomConsoleLogs active={true} />
          </div>

          {/* Diagnostics Panel (Right Column) */}
          <div className="md:col-span-5 flex flex-col gap-6 w-full">
            {/* System Metrics HUD */}
            <div className="grid grid-cols-3 gap-3 w-full">
              <CircularGauge value={project.metrics.complexity} label="Complexity" color="#6366f1" />
              <CircularGauge value={project.metrics.readiness} label="Readiness" color="#06b6d4" />
              <CircularGauge value={project.metrics.health} label="Health" color="#10b981" />
            </div>

            {/* Tactical System Info */}
            <div className="bg-slate-950/30 backdrop-blur-sm border border-white/[0.04] p-4 rounded-xl font-mono text-[10px] text-slate-400 flex flex-col gap-2 relative">
              <div className="absolute top-0 right-3 px-2 py-0.5 translate-y-[-50%] bg-[#040114] border border-white/[0.05] rounded text-[8px] text-slate-500 uppercase tracking-widest">
                SYSTEM_SPECS
              </div>
              <div className="flex justify-between border-b border-dashed border-white/[0.03] pb-1">
                <span>BAUD_RATE:</span>
                <span className="text-white">{project.metrics.baudRate} bps</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-white/[0.03] pb-1">
                <span>SECTOR_COORDS:</span>
                <span className="text-white">{project.metrics.sector}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-white/[0.03] pb-1">
                <span>LOAD_FACTOR:</span>
                <span className="text-white">{project.metrics.systemLoad}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-white/[0.03] pb-1">
                <span>STACK_SIZE:</span>
                <span className="text-white">{project.techStack.length} Nodes</span>
              </div>
            </div>

            {/* Tech stack badge lists */}
            <div>
              <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider mb-2 select-none">
                INTEGRATED_LOGIC_STACK:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded bg-slate-900/60 border border-white/[0.05] text-slate-400 font-mono text-[9px] tracking-wider uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row gap-4 border-t border-white/[0.05] pt-6 select-none font-mono text-xs">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg border border-cyan-500/30 text-cyan-400 bg-cyan-950/10 hover:bg-cyan-950/30 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] active:scale-95 transition-all duration-300"
          >
            <ExternalLink size={14} />
            <span>OPEN_PAYLOAD_REPOSITORY</span>
          </a>
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg border border-white/[0.05] text-slate-400 bg-slate-900/40 hover:bg-slate-900/60 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span>TERMINATE_DIAGNOSTICS</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}


export default function Projects() {
  const sliderRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

  // Update scroll limits for active arrow states
  const updateScrollState = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      setCanScrollLeft(scrollLeft > 5)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5)
    }
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      slider.addEventListener('scroll', updateScrollState, { passive: true })
      // Initial check
      updateScrollState()
      // Recalculate on window resize
      window.addEventListener('resize', updateScrollState)
    }
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', updateScrollState)
      }
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const cardWidth = 340 + 24 // Card width + margin
      const clientWidth = sliderRef.current.clientWidth
      const scrollOffset = Math.max(cardWidth, Math.floor(clientWidth * 0.75))
      const targetScroll = sliderRef.current.scrollLeft + (direction === 'left' ? -scrollOffset : scrollOffset)
      
      sliderRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section
      id="projects"
      className="relative w-full py-24 md:py-32 px-6 lg:px-12 flex flex-col justify-center overflow-hidden border-t border-white/[0.04]"
      style={{
        background: 'transparent'
      }}
    >
      {/* Subtle section veil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(3,0,20,0.7) 0%, rgba(3,0,20,0.65) 50%, rgba(3,0,20,0.7) 100%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section HUD Header & Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm tracking-[0.4em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              STELLAR_PAYLOADS // 03
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight font-sans">
              Projects & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">
                Exploration Systems
              </span>
            </h2>
          </div>

          {/* Glowing Monospace Nav Toggles */}
          <div className="flex items-center gap-4 select-none font-mono text-xs">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`group flex items-center gap-1.5 py-2 px-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                canScrollLeft
                  ? 'border-cyan-500/30 text-cyan-400 bg-cyan-950/10 hover:bg-cyan-950/30 hover:border-cyan-400/50 hover:shadow-[0_0_12px_rgba(34,211,238,0.15)] active:scale-95'
                  : 'border-white/[0.04] text-slate-600 bg-transparent cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              <span>PREV_SYSTEM</span>
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`group flex items-center gap-1.5 py-2 px-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                canScrollRight
                  ? 'border-indigo-500/30 text-indigo-400 bg-indigo-950/10 hover:bg-indigo-950/30 hover:border-indigo-400/50 hover:shadow-[0_0_12px_rgba(99,102,241,0.15)] active:scale-95'
                  : 'border-white/[0.04] text-slate-600 bg-transparent cursor-not-allowed'
              }`}
            >
              <span>NEXT_SYSTEM</span>
              <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Cockpit Card Slider */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-6 pb-8 scroll-smooth snap-x snap-mandatory scrollbar-none cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROJECT_CATALOG.map((proj, idx) => (
            <ProjectCard
              key={proj.id}
              proj={proj}
              idx={idx}
              onMouseEnter={() => setHoveredCardIndex(idx)}
              onMouseLeave={() => setHoveredCardIndex(null)}
              hoveredCardIndex={hoveredCardIndex}
              onClick={() => setSelectedProject(proj)}
            />
          ))}
        </div>
      </div>

      {/* Cyber Diagnostic Console Overlay Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Custom keyframes for premium cockpit card animations */}
      <style>{`
        @keyframes sweep {
          0% { top: -5%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 105%; opacity: 0; }
        }
        @keyframes sweep-vertical {
          0% { top: -10%; opacity: 0.05; }
          15% { opacity: 0.75; }
          85% { opacity: 0.75; }
          100% { top: 110%; opacity: 0.05; }
        }
        @keyframes border-trace {
          0% { stroke-dashoffset: 570; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  )
}
