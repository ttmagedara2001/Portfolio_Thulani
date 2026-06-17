import { useState, useCallback, useEffect, useRef } from 'react'
import { Download, ChevronDown } from 'lucide-react'
import { profile, alphaStars } from '../data/portfolioData'
import cvFile from '../assets/CV/Thulani Magedara CV.pdf'

// ── GlitchText Component for Stellar Decrypt Effect ──────────────────────
const GLITCH_CHARS = '01$#@%&?_+=*^[]<>█▓▒░▖▗▘▙▚▛▜▝▞▟'

function GlitchText({ text, isActive }) {
  const [displayText, setDisplayText] = useState(text)
  const iterationRef = useRef(0)

  useEffect(() => {
    if (!isActive) { setDisplayText(text); return }
    iterationRef.current = 0
    const textLength = text.length
    const intervalId = setInterval(() => {
      setDisplayText(() =>
        text.split('').map((char, index) => {
          if (char === ' ' || char === '•') return char
          if (index < iterationRef.current) return text[index]
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        }).join('')
      )
      if (iterationRef.current >= textLength) { clearInterval(intervalId); setDisplayText(text) }
      iterationRef.current += 1.5
    }, 30)
    return () => clearInterval(intervalId)
  }, [isActive, text])

  return <span>{displayText}</span>
}

// ── Space HUD strings ─────────────────────────────────────────────────────
const HUD = {
  coordTL:  'RA 06h 45m 08s',
  coordBL:  'DEC +16° 42\' 58"',
  statusTR: 'UPLINK: NOMINAL',
  nodesTR:  'ACTIVE_NODES: 04',
  dataBR:   'STELLAR_CHART v3.0',
  velBR:    'EPOCH J2000.0',
}

// ── HUD text element ──────────────────────────────────────────────────────
function HudText({ children, className = '', style = {} }) {
  return (
    <span
      className={`font-mono text-[10px] tracking-[0.15em] uppercase pointer-events-none select-none ${className}`}
      style={{ color: 'rgba(99,102,241,0.5)', ...style }}
    >
      {children}
    </span>
  )
}

// ── Quadrant node colors ──────────────────────────────────────────────────
const NODE_COLORS = {
  fullstack: { border: 'border-fuchsia-500', glow: '0 0 22px rgba(217,70,239,0.45)', starColor: 'rgba(217,70,239,1)', tether: '217,70,239', active: 'text-fuchsia-200', accent: 'text-fuchsia-400', badge: 'border-fuchsia-500/50 bg-fuchsia-950/30 text-fuchsia-300' },
  iot:       { border: 'border-cyan-400',    glow: '0 0 22px rgba(34,211,238,0.45)',  starColor: 'rgba(34,211,238,1)',   tether: '34,211,238',  active: 'text-cyan-200',    accent: 'text-cyan-400',    badge: 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300'   },
  ar:        { border: 'border-purple-500',  glow: '0 0 22px rgba(168,85,247,0.45)', starColor: 'rgba(168,85,247,1)',  tether: '168,85,247',  active: 'text-purple-200',  accent: 'text-purple-400',  badge: 'border-purple-500/50 bg-purple-950/30 text-purple-300' },
  ecosystem: { border: 'border-amber-400',   glow: '0 0 22px rgba(245,158,11,0.45)', starColor: 'rgba(245,158,11,1)',  tether: '245,158,11',  active: 'text-amber-200',   accent: 'text-amber-400',   badge: 'border-amber-500/50 bg-amber-950/30 text-amber-300'  },
}

// ── Alpha Star node card ──────────────────────────────────────────────────
function AlphaStarNode({ id, title, stack, isActive, positionClass, nodeRef }) {
  const c = NODE_COLORS[id]
  return (
    <div
      ref={nodeRef}
      className={`absolute ${positionClass} z-10 w-60 md:w-72 p-4 rounded-2xl border backdrop-blur-md
                  transition-all duration-500 font-mono select-none pointer-events-auto
                  ${isActive
                    ? `${c.border} bg-slate-950/30`
                    : 'border-indigo-950/25 bg-slate-950/15 opacity-30'}`}
      style={{ boxShadow: isActive ? c.glow : 'none' }}
    >
      {/* Star node indicator */}
      <div className="flex justify-between items-center text-[10px] tracking-wider mb-2">
        <span className={`flex items-center gap-1.5 ${isActive ? c.accent : 'text-slate-600'}`}>
          <span
            className={`w-2 h-2 rounded-full ${isActive ? '' : 'bg-slate-700'}`}
            style={isActive ? { background: c.starColor, boxShadow: `0 0 8px ${c.starColor}`, animation: 'star-breathe 2s ease-in-out infinite' } : {}}
          />
          {isActive ? '✦ STAR_LOCKED' : '✦ STANDBY'}
        </span>
        <span className="text-slate-600 text-[9px]">
          {id === 'fullstack' ? 'α-01' : id === 'iot' ? 'α-02' : id === 'ar' ? 'α-03' : 'α-04'}
        </span>
      </div>

      {/* Content */}
      <div className="relative pt-2 px-1">
        <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l transition-colors duration-300 ${isActive ? c.border : 'border-indigo-900/30'}`} />
        <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r transition-colors duration-300 ${isActive ? c.border : 'border-indigo-900/30'}`} />
        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-colors duration-300 ${isActive ? c.border : 'border-indigo-900/30'}`} />
        <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r transition-colors duration-300 ${isActive ? c.border : 'border-indigo-900/30'}`} />

        <h3 className={`font-black text-sm tracking-wide uppercase mb-2 transition-colors duration-300 ${isActive ? c.active : 'text-slate-500'}`}>
          {title}
        </h3>

        <div className={`text-[11px] leading-relaxed transition-all duration-500 ${isActive ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <span className={`${isActive ? c.accent : ''} font-semibold`}>STACK: </span>
          <GlitchText text={stack} isActive={isActive} />
        </div>
      </div>
    </div>
  )
}

// ── Laser Tether Canvas overlay ───────────────────────────────────────────
// Draws a glowing vector line from the active star node to the mouse cursor
function LaserTetherCanvas({ activeNode, nodeRefs }) {
  const canvasRef = useRef(null)
  const mouse     = useRef({ x: -9999, y: -9999 })
  const rafRef    = useRef(null)

  useEffect(() => {
    const onMove = e => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let tick = 0
    const draw = () => {
      tick++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (activeNode && nodeRefs[activeNode]?.current) {
        const rect    = nodeRefs[activeNode].current.getBoundingClientRect()
        const section = canvas.getBoundingClientRect()
        // Star center = node card center
        const sx = rect.left + rect.width  / 2 - section.left
        const sy = rect.top  + rect.height / 2 - section.top
        const mx = mouse.current.x - section.left
        const my = mouse.current.y - section.top

        const c = NODE_COLORS[activeNode]
        const alpha = 0.65 + 0.25 * Math.sin(tick * 0.08)

        // Outer soft glow line
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.lineTo(mx, my)
        ctx.strokeStyle = `rgba(${c.tether}, ${alpha * 0.3})`
        ctx.lineWidth   = 6
        ctx.lineCap     = 'round'
        ctx.stroke()

        // Core crisp laser line
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.lineTo(mx, my)
        ctx.strokeStyle = `rgba(${c.tether}, ${alpha})`
        ctx.lineWidth   = 1.5
        ctx.stroke()

        // Glowing dot at star end
        const starGlow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 10)
        starGlow.addColorStop(0, `rgba(${c.tether}, ${alpha})`)
        starGlow.addColorStop(1, `rgba(${c.tether}, 0)`)
        ctx.beginPath()
        ctx.arc(sx, sy, 10, 0, Math.PI * 2)
        ctx.fillStyle = starGlow
        ctx.fill()

        // Glowing dot at cursor end
        const cursorGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 6)
        cursorGlow.addColorStop(0, `rgba(${c.tether}, ${alpha * 0.8})`)
        cursorGlow.addColorStop(1, `rgba(${c.tether}, 0)`)
        ctx.beginPath()
        ctx.arc(mx, my, 6, 0, Math.PI * 2)
        ctx.fillStyle = cursorGlow
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [activeNode, nodeRefs])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 15 }}
      aria-hidden="true"
    />
  )
}

// ── Static star-chart rings decoration ───────────────────────────────────
// Replaces the old RadarTerminal — purely aesthetic, no rotating sweep
function StarChartRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      {/* Concentric rings — faint, ethereal */}
      {[320, 240, 160, 90].map((r, i) => (
        <div
          key={r}
          className="absolute rounded-full border border-indigo-500/[0.06]"
          style={{
            width:  r * 2,
            height: r * 2,
            animation: `spin ${120 + i * 40}s linear infinite${i % 2 === 1 ? ' reverse' : ''}`,
            borderStyle: i === 1 ? 'dashed' : 'solid',
          }}
        />
      ))}
      {/* Center reticle */}
      <div className="absolute w-16 h-16 rounded-full border border-indigo-400/15" />
      <div className="absolute w-3 h-3">
        <div className="absolute top-0 left-1/2 -translate-x-px w-px h-3 bg-indigo-400/30" />
        <div className="absolute left-0 top-1/2 -translate-y-px h-px w-3 bg-indigo-400/30" />
      </div>
    </div>
  )
}

// ── Main Hero ─────────────────────────────────────────────────────────────
const QUADRANT_DEFS = [
  { id: 'fullstack', title: 'Fullstack Developer',  stack: 'React.js • Tailwind CSS • Spring Boot • MongoDB', positionClass: 'left-[2vw] top-[18vh] md:left-[8vw]  md:top-[22vh]' },
  { id: 'iot',       title: 'IoT Developer',         stack: 'ESP32 • MQTT • WebSockets • REST APIs • Grafana',  positionClass: 'right-[2vw] top-[18vh] md:right-[8vw] md:top-[22vh]' },
  { id: 'ar',        title: 'AR Developer',           stack: 'Unity • C# • Unity Barracuda • 3D Reconstruction', positionClass: 'left-[2vw] bottom-[18vh] md:left-[8vw]  md:bottom-[22vh]' },
  { id: 'ecosystem', title: 'Ecosystem Builder',      stack: 'Community • Leadership • Volunteering • Strategy', positionClass: 'right-[2vw] bottom-[18vh] md:right-[8vw] md:bottom-[22vh]' },
]

export default function Hero() {
  const [activeNode, setActiveNode] = useState(null)

  // Refs for each quadrant card DOM element (laser tether origin)
  const nodeRefs = {
    fullstack: useRef(null),
    iot:       useRef(null),
    ar:        useRef(null),
    ecosystem: useRef(null),
  }

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* Thin veil so text stays readable over the fixed starfield */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(3,0,20,0.15) 0%, rgba(3,0,20,0.65) 90%)' }}
        aria-hidden="true"
      />

      {/* Static star-chart concentric rings */}
      <StarChartRings />

      {/* Laser tether canvas */}
      <LaserTetherCanvas activeNode={activeNode} nodeRefs={nodeRefs} />

      {/* Quadrant Alpha Star nodes */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {QUADRANT_DEFS.map(q => (
          <AlphaStarNode
            key={q.id}
            id={q.id}
            title={q.title}
            stack={q.stack}
            isActive={activeNode === q.id}
            positionClass={q.positionClass}
            nodeRef={nodeRefs[q.id]}
          />
        ))}
      </div>

      {/* Invisible hover zones — large hit areas matching each card quadrant */}
      {QUADRANT_DEFS.map(q => (
        <div
          key={`zone-${q.id}`}
          className="absolute w-[45vw] h-[45vh] pointer-events-auto cursor-crosshair"
          style={{
            top:    q.positionClass.includes('top')    ? 0 : undefined,
            bottom: q.positionClass.includes('bottom') ? 0 : undefined,
            left:   q.positionClass.includes('left')   ? 0 : undefined,
            right:  q.positionClass.includes('right')  ? 0 : undefined,
            zIndex: 8,
          }}
          onMouseEnter={() => setActiveNode(q.id)}
          onMouseLeave={() => setActiveNode(null)}
        />
      ))}

      {/* ── Central Typography ── */}
      <div className="relative z-20 w-full max-w-xl px-6 py-12 flex flex-col items-center justify-center text-center pointer-events-none select-none">
        <div className="pointer-events-auto flex flex-col items-center">

          {/* Section label */}
          <div className="font-mono text-[10px] tracking-[0.4em] text-indigo-300/60 uppercase mb-5">
            ✦ STELLAR_CHART_ACTIVE ✦
          </div>

          {/* Name — stellar mass glow */}
          <div className="relative select-none mb-5">
            <h1
              className="relative text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none font-sans"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(99,102,241,0.4)) drop-shadow(0 0 60px rgba(99,102,241,0.15))',
              }}
            >
              THULANI <br />
              <span className="text-slate-100">MAGEDARA</span>
            </h1>
          </div>

          {/* Active node telemetry */}
          <div className="min-h-[44px] flex flex-col items-center justify-center text-center font-mono text-[10px] tracking-wider mt-2">
            {activeNode ? (
              <div key={activeNode} className="flex flex-col items-center gap-1">
                <span className="text-indigo-300 font-semibold tracking-widest">
                  ✦ {NODE_COLORS[activeNode] && activeNode.toUpperCase().replace('_', ' ')} NODE LOCKED
                </span>
                <span className="text-slate-500">
                  VECTOR: {activeNode === 'fullstack' ? '213°' : activeNode === 'iot' ? '326°' : activeNode === 'ar' ? '146°' : '34°'} &nbsp;|&nbsp; DIST: 1.42 AU
                </span>
              </div>
            ) : (
              <span className="text-indigo-400/40 animate-pulse">SCANNING STELLAR FIELD...</span>
            )}
          </div>

        </div>
      </div>

      {/* ── CTA buttons ── */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
        <a
          href={cvFile}
          download="Thulani_Magedara_CV.pdf"
          id="hero-cta-cv"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105 active:scale-95 cursor-pointer font-sans"
          style={{
            background:  'linear-gradient(135deg, #4f46e5, #7c3aed)',
            boxShadow:   '0 4px 24px rgba(99,102,241,0.35)',
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
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-200 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer font-sans backdrop-blur-md"
          style={{
            border:     '1px solid rgba(99,102,241,0.2)',
            background: 'rgba(99,102,241,0.06)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.12)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.06)' }}
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
        <HudText>ALPHA_NODES: {alphaStars?.length ?? 4}</HudText>
        <HudText style={{ color: activeNode ? 'rgba(34,211,238,0.65)' : undefined }}>
          {activeNode ? `LOCKED: ${activeNode.toUpperCase()}` : 'SCANNING...'}
        </HudText>
      </div>

      {/* ── Bottom accent line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-10 transition-all duration-700"
        style={{
          background: activeNode
            ? `linear-gradient(90deg, transparent, rgba(${NODE_COLORS[activeNode]?.tether ?? '99,102,241'},0.6), transparent)`
            : 'linear-gradient(90deg, transparent, rgba(99,102,241,0.18), transparent)',
        }}
      />

      {/* ── Scroll cue ── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 cursor-pointer pointer-events-auto"
        style={{ color: 'rgba(100,116,139,0.6)' }}
        onClick={scrollToProjects}
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
