import { useState, useCallback, useEffect, useRef } from 'react'
import { Download, ChevronDown } from 'lucide-react'
import { profile, alphaStars } from '../data/portfolioData'
import RadarTerminal from './RadarTerminal'

// ── GlitchText Component for Digital Matrix Decrypt Effect ────────────────
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
            if (char === ' ' || char === '•') return char
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
    }, 30)

    return () => clearInterval(intervalId)
  }, [isActive, text])

  return <span>{displayText}</span>
}

// ── HUD text strings ────────────────────────────────────────────────────────
const HUD = {
  coordTL:  'AZIMUTH 182.4°',
  coordBL:  'ELEVATION +34.2°',
  statusTR: 'SCAN_PASS: ACTIVE',
  nodesTR:  'ACTIVE_CONTACTS: 04',
  dataBR:   'RADAR_TERMINAL v2.0',
  velBR:    'FREQ 9.42 GHz',
}

// ── HUD text element ─────────────────────────────────────────────────────────
function HudText({ children, className = '', style = {} }) {
  return (
    <span
      className={`font-mono text-[10px] tracking-[0.15em] uppercase pointer-events-none select-none ${className}`}
      style={{ color: 'rgba(99,102,241,0.55)', ...style }}
    >
      {children}
    </span>
  )
}

// ── Radar target colors mapping ──────────────────────────────────────────────
const TARGET_COLORS = {
  fullstack: {
    borderHot: 'border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.4)]',
    textHot: 'text-fuchsia-200',
    accentHot: 'text-fuchsia-400',
    bracketHot: 'border-fuchsia-400',
    flashAnim: 'animate-radar-flash-fuchsia'
  },
  iot: {
    borderHot: 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]',
    textHot: 'text-cyan-200',
    accentHot: 'text-cyan-400',
    bracketHot: 'border-cyan-400',
    flashAnim: 'animate-radar-flash-cyan'
  },
  ar: {
    borderHot: 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]',
    textHot: 'text-purple-200',
    accentHot: 'text-purple-400',
    bracketHot: 'border-purple-400',
    flashAnim: 'animate-radar-flash-purple'
  },
  ecosystem: {
    borderHot: 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]',
    textHot: 'text-amber-200',
    accentHot: 'text-amber-400',
    bracketHot: 'border-amber-400',
    flashAnim: 'animate-radar-flash-amber'
  }
}

// ── Radar target quadrant card ───────────────────────────────────────────────
function RadarTarget({ id, title, stack, activeQuadrant, positionClass }) {
  const isHot = activeQuadrant === id
  const colors = TARGET_COLORS[id]

  return (
    <div
      key={id + (isHot ? '-hot' : '')}
      className={`absolute ${positionClass} z-10 w-64 md:w-72 p-4 rounded-xl border bg-[#02000a]/85 backdrop-blur-md transition-all duration-300 font-mono select-none pointer-events-auto ${
        isHot
          ? `${colors.flashAnim} ${colors.borderHot} text-white`
          : 'border-indigo-950/40 text-slate-500 opacity-25'
      }`}
    >
      {/* Target telemetry markers */}
      <div className="flex justify-between items-center text-[10px] md:text-[11px] tracking-wider mb-2 opacity-80">
        <span className={isHot ? colors.accentHot : 'text-indigo-400/40'}>
          {isHot ? '🛰️ TARGET_LOCKED' : '🛰️ STANDBY_SCAN'}
        </span>
        <span className="opacity-60">
          {id === 'fullstack' ? 'Q1.TL' : id === 'iot' ? 'Q2.TR' : id === 'ar' ? 'Q3.BL' : 'Q4.BR'}
        </span>
      </div>

      {/* Corner brackets */}
      <div className="relative pt-2 px-2 pb-2">
        <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors duration-300 ${isHot ? colors.bracketHot : 'border-indigo-800/30'}`} />
        <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-colors duration-300 ${isHot ? colors.bracketHot : 'border-indigo-800/30'}`} />
        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-colors duration-300 ${isHot ? colors.bracketHot : 'border-indigo-800/30'}`} />
        <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors duration-300 ${isHot ? colors.bracketHot : 'border-indigo-800/30'}`} />

        {/* Title */}
        <h3 className={`font-black text-sm md:text-base tracking-wide uppercase transition-colors duration-300 ${isHot ? colors.textHot : 'text-slate-400'}`}>
          {title}
        </h3>

        {/* Tech Stack */}
        <div className={`mt-2 pt-2 border-t border-dashed border-indigo-950/20 text-[11px] md:text-xs leading-relaxed transition-all duration-500 ${
          isHot ? 'opacity-100 max-h-24' : 'opacity-40 max-h-0 overflow-hidden'
        }`}>
          <span className={`${colors.accentHot} font-semibold`}>STACK: </span>
          <GlitchText text={stack} isActive={isHot} />
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Hero — main export
// ---------------------------------------------------------------------------
export default function Hero() {
  const [activeQuadrant, setActiveQuadrant] = useState(null)

  const handleSweepIntersect = useCallback((id) => {
    setActiveQuadrant(id)
  }, [])

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#02000a' }}
    >
      {/* Dynamic CSS animations */}
      <style>{`
        @keyframes radar-flash-fuchsia {
          0% {
            opacity: 1;
            filter: brightness(1.8) drop-shadow(0 0 12px rgba(217, 70, 239, 0.7));
            border-color: rgba(217, 70, 239, 1);
            color: rgba(255, 255, 255, 1);
          }
          20% {
            opacity: 1;
            filter: brightness(1.4) drop-shadow(0 0 8px rgba(217, 70, 239, 0.5));
            border-color: rgba(217, 70, 239, 0.85);
          }
          100% {
            opacity: 0.25;
            filter: brightness(1) drop-shadow(0 0 0px transparent);
            border-color: rgba(99, 102, 241, 0.15);
            color: rgba(165, 180, 252, 0.45);
          }
        }
        @keyframes radar-flash-cyan {
          0% {
            opacity: 1;
            filter: brightness(1.8) drop-shadow(0 0 12px rgba(6, 182, 212, 0.7));
            border-color: rgba(6, 182, 212, 1);
            color: rgba(255, 255, 255, 1);
          }
          20% {
            opacity: 1;
            filter: brightness(1.4) drop-shadow(0 0 8px rgba(6, 182, 212, 0.5));
            border-color: rgba(6, 182, 212, 0.85);
          }
          100% {
            opacity: 0.25;
            filter: brightness(1) drop-shadow(0 0 0px transparent);
            border-color: rgba(99, 102, 241, 0.15);
            color: rgba(165, 180, 252, 0.45);
          }
        }
        @keyframes radar-flash-purple {
          0% {
            opacity: 1;
            filter: brightness(1.8) drop-shadow(0 0 12px rgba(168, 85, 247, 0.7));
            border-color: rgba(168, 85, 247, 1);
            color: rgba(255, 255, 255, 1);
          }
          20% {
            opacity: 1;
            filter: brightness(1.4) drop-shadow(0 0 8px rgba(168, 85, 247, 0.5));
            border-color: rgba(168, 85, 247, 0.85);
          }
          100% {
            opacity: 0.25;
            filter: brightness(1) drop-shadow(0 0 0px transparent);
            border-color: rgba(99, 102, 241, 0.15);
            color: rgba(165, 180, 252, 0.45);
          }
        }
        @keyframes radar-flash-amber {
          0% {
            opacity: 1;
            filter: brightness(1.8) drop-shadow(0 0 12px rgba(245, 158, 11, 0.7));
            border-color: rgba(245, 158, 11, 1);
            color: rgba(255, 255, 255, 1);
          }
          20% {
            opacity: 1;
            filter: brightness(1.4) drop-shadow(0 0 8px rgba(245, 158, 11, 0.5));
            border-color: rgba(245, 158, 11, 0.85);
          }
          100% {
            opacity: 0.25;
            filter: brightness(1) drop-shadow(0 0 0px transparent);
            border-color: rgba(99, 102, 241, 0.15);
            color: rgba(165, 180, 252, 0.45);
          }
        }
        .animate-radar-flash-fuchsia {
          animation: radar-flash-fuchsia 3.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-radar-flash-cyan {
          animation: radar-flash-cyan 3.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-radar-flash-purple {
          animation: radar-flash-purple 3.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-radar-flash-amber {
          animation: radar-flash-amber 3.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* ── Background radar layer ── */}
      <div className="absolute inset-0 z-0">
        <RadarTerminal onSweepIntersect={handleSweepIntersect} />
      </div>

      {/* ── Full-section subtle vignette overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(2,0,10,0.2) 0%, rgba(2,0,10,0.85) 90%)',
        }}
        aria-hidden="true"
      />

      {/* ── Absolute Quadrant Target Interceptors ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <RadarTarget
          id="fullstack"
          title="Fullstack Developer"
          stack="React.js • Tailwind CSS • Spring Boot • MongoDB • Java"
          activeQuadrant={activeQuadrant}
          positionClass="left-[4vw] top-[18vh] md:left-[10vw] md:top-[22vh]"
        />
        <RadarTarget
          id="iot"
          title="IoT Developer"
          stack="ESP32 • MQTT • WebSockets • REST APIs • Grafana"
          activeQuadrant={activeQuadrant}
          positionClass="right-[4vw] top-[18vh] md:right-[10vw] md:top-[22vh]"
        />
        <RadarTarget
          id="ar"
          title="AR Developer"
          stack="Unity • C# • Unity Barracuda • 3D Reconstruction"
          activeQuadrant={activeQuadrant}
          positionClass="left-[4vw] bottom-[20vh] md:left-[10vw] md:bottom-[24vh]"
        />
        <RadarTarget
          id="ecosystem"
          title="Ecosystem Builder"
          stack="Community Management • Leadership • Volunteering • Project Operations"
          activeQuadrant={activeQuadrant}
          positionClass="right-[4vw] bottom-[20vh] md:right-[10vw] md:bottom-[24vh]"
        />
      </div>

      {/* ── Central Typography Layer ── */}
      <div className="relative z-20 w-full max-w-xl px-6 py-12 flex flex-col items-center justify-center text-center pointer-events-none select-none">
        <div className="pointer-events-auto flex flex-col items-center">
          
          {/* Modernized HUD Text Style */}
          <div className="font-mono text-[10px] tracking-[0.4em] text-cyan-400/70 uppercase mb-4 animate-pulse">
            ✦ RADAR_BEACON_ACTIVE ✦
          </div>

          {/* Centered Name with Chromatic Aberration */}
          <div className="relative group select-none mb-4">
            <h1
              className="relative text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none font-sans"
              style={{
                textShadow: '2.5px -1.5px 0px rgba(244, 63, 94, 0.75), -2.5px 1.5px 0px rgba(34, 211, 238, 0.75)'
              }}
            >
              THULANI <br />
              <span className="text-slate-200">MAGEDARA</span>
            </h1>
          </div>

          {/* Central Telemetry display deck */}
          <div className="min-h-[50px] flex flex-col items-center justify-center text-center font-mono text-[10px] tracking-wider text-cyan-400/80 mt-2">
            {activeQuadrant ? (
              <div key={activeQuadrant} className="animate-pulse flex flex-col items-center">
                <span className="text-indigo-300 font-semibold">LOCKED_SECTOR: {activeQuadrant.toUpperCase()}</span>
                <span className="text-slate-500 mt-0.5">
                  BEARING: {activeQuadrant === 'fullstack' ? '213°' : activeQuadrant === 'iot' ? '326°' : activeQuadrant === 'ar' ? '146°' : '34°'} | RANGE: 1.42 AU
                </span>
              </div>
            ) : (
              <span className="text-indigo-400/50 animate-pulse">TERMINAL STANDBY / SEARCHING...</span>
            )}
          </div>

        </div>
      </div>

      {/* ── CTA buttons (Download CV & View Projects positioned below the radar terminal) ── */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
        <a
          href="/cv.pdf"
          download="Thulani_Magedara_CV.pdf"
          id="hero-cta-cv"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105 active:scale-95 cursor-pointer font-sans"
          style={{
            background:    'linear-gradient(135deg,#4f46e5,#7c3aed)',
            boxShadow:     '0 4px 24px rgba(99,102,241,0.35)',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 32px rgba(99,102,241,0.55)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(99,102,241,0.35)' }}
        >
          <Download size={16} />
          Download CV
        </a>
        <button
          onClick={scrollToProjects}
          id="hero-cta-projects"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-200 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer font-sans"
          style={{
            border:     '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
        >
          View Projects
        </button>
      </div>

      {/* ── HUD Corner Overlays ── */}
      <div className="absolute top-4 left-6 hidden md:flex flex-col gap-0.5 pointer-events-none z-10">
        <HudText>{HUD.coordTL}</HudText>
        <HudText>{HUD.coordBL}</HudText>
      </div>
      <div className="absolute top-4 right-6 hidden md:flex flex-col items-end gap-0.5 pointer-events-none z-10">
        <HudText>{HUD.statusTR}</HudText>
        <HudText>{HUD.nodesTR}</HudText>
      </div>
      <div className="absolute bottom-6 left-6 hidden md:flex flex-col gap-0.5 pointer-events-none z-10">
        <HudText>{HUD.dataBR}</HudText>
        <HudText>{HUD.velBR}</HudText>
      </div>
      <div className="absolute bottom-6 right-6 hidden md:flex flex-col items-end gap-0.5 pointer-events-none z-10">
        <HudText>RADAR TARGETS: {alphaStars.length}</HudText>
        <HudText style={{ color: activeQuadrant ? 'rgba(34,211,238,0.7)' : undefined }}>
          {activeQuadrant ? `LOCKED: ${activeQuadrant.toUpperCase()}` : 'SCANNING...'}
        </HudText>
      </div>

      {/* ── Active Role Bottom Strip Indicator ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 z-10 transition-all duration-500"
        style={{
          background: activeQuadrant
            ? 'linear-gradient(90deg, transparent, rgba(34,211,238,0.7), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent)',
        }}
      />

      {/* ── Scroll cue ── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 cursor-pointer pointer-events-auto"
        style={{ color: 'rgba(100,116,139,0.7)' }}
        onClick={scrollToProjects}
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown
          size={16}
          className="animate-bounce"
        />
      </div>
    </section>
  )
}
