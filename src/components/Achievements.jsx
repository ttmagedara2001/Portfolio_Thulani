import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Award, Star, ExternalLink, BookOpen, Terminal, ChevronLeft, ChevronRight } from 'lucide-react'
import { awards, publications } from '../data/portfolioData'

// Helper to resolve award icons with tier-specific coloring and neon glow dropshadows
function getAwardIcon(iconName, tier) {
  const size = 18
  const colors = {
    gold: "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]",
    silver: "text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.6)]",
    bronze: "text-amber-700 drop-shadow-[0_0_8px_rgba(180,83,9,0.5)]"
  }
  const colorClass = colors[tier] || "text-cyan-400"

  switch (iconName) {
    case 'Trophy':
      return <Trophy size={size} className={colorClass} />
    case 'Medal':
      return <Medal size={size} className={colorClass} />
    case 'Award':
      return <Award size={size} className={colorClass} />
    case 'Star':
      return <Star size={size} className={colorClass} />
    default:
      return <Award size={size} className={colorClass} />
  }
}

// ── Horizontal Slider Track Wrapper Component ─────────────────────────────
function AchievementsSlider({ items, type }) {
  const sliderRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null)

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
      updateScrollState()
      window.addEventListener('resize', updateScrollState)
    }
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', updateScrollState)
      }
      window.removeEventListener('resize', updateScrollState)
    }
  }, [items])

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const cardWidth = 460 + 24 // Card width + gap
      const clientWidth = sliderRef.current.clientWidth
      const scrollOffset = Math.max(cardWidth, Math.floor(clientWidth * 0.75))
      const targetScroll = sliderRef.current.scrollLeft + (direction === 'left' ? -scrollOffset : scrollOffset)
      
      sliderRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
    }
  }

  const isAward = type === 'award'
  const accentColor = isAward ? 'cyan' : 'indigo'
  const hoverBorderColor = isAward ? 'rgba(34, 211, 238, 0.35)' : 'rgba(99, 102, 241, 0.35)'
  const hoverShadowColor = isAward ? 'rgba(34, 211, 238, 0.15)' : 'rgba(99, 102, 241, 0.15)'

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Track HUD Header and Navigation Buttons */}
      <div className="flex justify-between items-center border-b border-white/[0.05] pb-4 mb-2 select-none">
        <div className="flex items-center gap-3">
          {isAward ? (
            <Trophy size={16} className="text-cyan-400 animate-pulse" />
          ) : (
            <BookOpen size={16} className="text-indigo-400 animate-pulse" />
          )}
          <h3 className={`font-mono text-xs uppercase tracking-[0.25em] font-bold ${isAward ? 'text-cyan-400' : 'text-indigo-400'}`}>
            {isAward ? 'SUB-PANEL A // CELESTIAL_HONORS_DECK' : 'SUB-PANEL B // RESEARCH_TELEMETRY_DECK'}
          </h3>
        </div>

        {/* Console Nav Toggle Set */}
        <div className="flex items-center gap-2 select-none font-mono text-[9px]">
          <button
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            className={`group flex items-center gap-1 py-1.5 px-3 rounded-lg border transition-all duration-300 cursor-pointer ${
              canScrollLeft
                ? `border-${accentColor}-500/30 text-${accentColor}-400 bg-${accentColor}-950/10 hover:bg-${accentColor}-950/30 hover:border-${accentColor}-400/50 hover:shadow-[0_0_10px_rgba(99,102,241,0.15)] active:scale-95`
                : 'border-white/[0.04] text-slate-600 bg-transparent cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={10} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span>PREV_NODE</span>
          </button>
          <button
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            className={`group flex items-center gap-1 py-1.5 px-3 rounded-lg border transition-all duration-300 cursor-pointer ${
              canScrollRight
                ? `border-${accentColor}-500/30 text-${accentColor}-400 bg-${accentColor}-950/10 hover:bg-${accentColor}-950/30 hover:border-${accentColor}-400/50 hover:shadow-[0_0_10px_rgba(99,102,241,0.15)] active:scale-95`
                : 'border-white/[0.04] text-slate-600 bg-transparent cursor-not-allowed'
            }`}
          >
            <span>NEXT_NODE</span>
            <ChevronRight size={10} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Swipeable Carousel Slider */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto gap-6 pb-6 scroll-smooth snap-x snap-mandatory scrollbar-none cursor-grab active:cursor-grabbing w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
              y: -8,
              borderColor: hoverBorderColor,
              boxShadow: `0 15px 30px -10px ${hoverShadowColor}`
            }}
            transition={{ type: "spring", stiffness: 90, damping: 15 }}
            onMouseEnter={() => setHoveredCardIndex(idx)}
            onMouseLeave={() => setHoveredCardIndex(null)}
            className="group relative w-[310px] md:w-[500px] shrink-0 snap-center rounded-2xl border border-white/[0.05] bg-slate-950/45 hover:bg-slate-950/65 transition-[background-color] duration-300 p-4 md:p-5 backdrop-blur-md overflow-hidden flex flex-col md:flex-row gap-4 justify-between"
          >
            {/* Cyber Tracer Neon Border Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl overflow-hidden z-25" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="16"
                className={`fill-none transition-colors duration-300 ${isAward ? 'group-hover:stroke-cyan-400' : 'group-hover:stroke-indigo-400'}`}
                strokeWidth="1.5"
                strokeDasharray="140 500"
                style={{
                  animation: 'border-trace 3s linear infinite',
                  opacity: hoveredCardIndex === idx ? 0.85 : 0,
                  transition: 'opacity 0.3s ease'
                }}
              />
            </svg>

            {/* Tactical corner brackets */}
            <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l border-white/[0.06] group-hover:-translate-x-[3px] group-hover:-translate-y-[3px] transition-all duration-300 pointer-events-none ${isAward ? 'group-hover:border-cyan-400/50' : 'group-hover:border-indigo-400/50'}`} />
            <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r border-white/[0.06] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] transition-all duration-300 pointer-events-none ${isAward ? 'group-hover:border-cyan-400/50' : 'group-hover:border-indigo-400/50'}`} />
            <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/[0.06] group-hover:-translate-x-[3px] group-hover:translate-y-[3px] transition-all duration-300 pointer-events-none ${isAward ? 'group-hover:border-cyan-400/50' : 'group-hover:border-indigo-400/50'}`} />
            <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/[0.06] group-hover:translate-x-[3px] group-hover:translate-y-[3px] transition-all duration-300 pointer-events-none ${isAward ? 'group-hover:border-cyan-400/50' : 'group-hover:border-indigo-400/50'}`} />

            {/* Panel 1: Space Illustration Frame (Reserves space for images) */}
            <div className="relative w-full md:w-[170px] h-[120px] md:h-full shrink-0 overflow-hidden rounded-xl border border-white/[0.04] bg-[#02000c]/80 flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-75 group-hover:opacity-90"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] text-slate-500">
                  NO_PREVIEW_SIGNAL
                </div>
              )}
              {/* Scanline grid texture overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 pointer-events-none opacity-[0.08]" 
                   style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 3px, 3px 100%' }} />

              {/* Glowing Icon Floating Badge */}
              <div className="absolute top-2 left-2 z-20 p-1.5 rounded-lg border border-white/[0.06] bg-[#02000d]/90 flex items-center justify-center">
                {isAward ? getAwardIcon(item.icon, item.tier) : <Terminal size={12} className="text-indigo-400" />}
              </div>

              {/* Vertical Laser Sweep Line */}
              <div 
                className={`absolute left-0 right-0 h-[1.5px] bg-${accentColor}-400/30 opacity-0 group-hover:opacity-100 pointer-events-none z-10`}
                style={{
                  animation: 'sweep 3.5s linear infinite'
                }}
              />
            </div>

            {/* Panel 2: Technical Description metadata details */}
            <div className="flex flex-col justify-between items-start flex-1 min-w-0 text-left md:h-full gap-3">
              <div className="w-full">
                <div className="flex justify-between items-baseline gap-2 mb-1 w-full select-none">
                  <span className={`font-mono text-[8px] tracking-widest font-bold truncate ${isAward ? 'text-cyan-500/80' : 'text-indigo-400/80'}`}>
                    {isAward ? item.organiser : `PEER_REVIEW_${String(idx + 1).padStart(2, '0')}`}
                  </span>
                  <span className="font-mono text-[9px] text-slate-500 shrink-0">
                    {isAward ? item.year : item.date}
                  </span>
                </div>
                
                <h4 className="text-xs md:text-sm font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h4>
                
                {!isAward && (
                  <p className="text-[8px] font-mono text-slate-500 uppercase tracking-wide truncate mt-0.5">
                    {item.venue}
                  </p>
                )}
                
                <p className="text-[10px] md:text-[11px] text-slate-400 font-sans leading-relaxed mt-2 line-clamp-3">
                  {item.telemetry}
                </p>
              </div>

              {/* Tech Tags and Link Action Button */}
              <div className="flex items-center justify-between w-full pt-3 border-t border-white/[0.04] mt-auto">
                <div className="flex gap-1 select-none overflow-hidden max-w-[55%]">
                  {isAward ? (
                    <span className={`px-1.5 py-0.5 rounded border font-mono text-[7px] uppercase tracking-wider ${
                      item.tier === 'gold' ? 'border-amber-500/20 bg-amber-500/5 text-amber-400' :
                      item.tier === 'silver' ? 'border-slate-400/20 bg-slate-400/5 text-slate-300' :
                      'border-amber-700/20 bg-amber-700/5 text-amber-600'
                    }`}>
                      {item.tier}_tier
                    </span>
                  ) : (
                    item.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="px-1.5 py-0.5 rounded bg-slate-900/60 border border-white/[0.04] text-slate-500 font-mono text-[7px] tracking-wider uppercase truncate"
                      >
                        {tag}
                      </span>
                    ))
                  )}
                </div>

                {!isAward ? (
                  <button className="flex items-center gap-1 py-1 px-2 rounded border border-indigo-500/30 text-indigo-400 hover:text-indigo-300 hover:border-indigo-400/50 hover:bg-indigo-950/20 hover:shadow-[0_0_8px_rgba(99,102,241,0.25)] font-mono text-[8px] tracking-widest transition-all duration-300 cursor-pointer shrink-0">
                    <span>[ ACCESS_ABSTRACT ]</span>
                    <ExternalLink size={8} />
                  </button>
                ) : (
                  <span className="font-mono text-[8px] text-slate-600 select-none uppercase tracking-widest shrink-0">
                    ACCOLADE_SECURED
                  </span>
                )}
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative w-full py-24 md:py-32 px-6 lg:px-12 flex flex-col justify-center overflow-hidden border-t border-white/[0.04]"
      style={{
        background: 'linear-gradient(180deg, #02000a 0%, #030016 50%, #02000c 100%)'
      }}
    >
      {/* Decorative Constellation Grid Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-15" aria-hidden="true">
        <svg className="absolute w-full h-full text-indigo-500/[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="achievements-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1.2" fill="currentColor" />
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#achievements-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16 md:gap-20">
        
        {/* HUD Section Header */}
        <div className="flex flex-col gap-2 text-left">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm tracking-[0.4em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            SYSTEMS_ACCOLADES // 04
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight font-sans">
            Honors & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
              Research Telemetry
            </span>
          </h2>
        </div>

        {/* Swipeable Sliders Deck Panels (Stacked Vertically for Data Density) */}
        <div className="flex flex-col gap-12 w-full">
          {/* Slider 1: Awards & Accolades */}
          <AchievementsSlider items={awards} type="award" />

          {/* Slider 2: Publications & Research */}
          <AchievementsSlider items={publications} type="pub" />
        </div>

      </div>
    </section>
  )
}
