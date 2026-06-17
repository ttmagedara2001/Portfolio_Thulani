// ═══════════════════════════════════════════════════════════════════════════
//  Achievements.jsx — Tab-switched HONOURS ↔ RESEARCH
//  Large cards + full-screen slide panels with auto-swiping images
// ═══════════════════════════════════════════════════════════════════════════
import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy, Medal, Award, Star, BookOpen, Terminal,
  ExternalLink, Download, Eye, GraduationCap,
  X, ChevronLeft, ChevronRight, Images
} from 'lucide-react'

// ── Local Asset Pipeline ──────────────────────────────────────────────────────
import sdgCertificate from '../assets/SDG Sprints/SDG SPRINTS CERTIFICATE .pdf'
import sdgMain        from '../assets/sdg_sprints.png'
import sdgSlide1      from '../assets/SDG Sprints/ss.jpeg'
import sdgSlide2      from '../assets/SDG Sprints/ss1.jpeg'
import sdgSlide3      from '../assets/SDG Sprints/dwdwdw.jpeg'
import deansListPdf   from "../assets/dean's_list/Dean's List L3.pdf"
import hackxImg       from '../assets/hackx_accolade.png'
import coderallyImg   from '../assets/coderally_accolade.png'
import leagueImg      from '../assets/league_leaders.png'
import federatedImg   from '../assets/federated_learning_pub.png'
import privacyImg     from '../assets/privacy_iccp_pub.png'

// ═══════════════════════════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════════════════════════
const CELESTIAL_HONORS = [
  {
    id: 'accolade-01',
    seq: '01',
    title: "Dean's List — Level 3",
    authority: 'Faculty of Science, University of Kelaniya',
    timeline: '2025',
    tier: 'gold',
    icon: 'GraduationCap',
    telemetry: "Recognised with Academic Excellence on the Dean's List for outstanding GPA performance at undergraduate Level 3.",
    images: [],
    assetPdf: deansListPdf,
    assetLabel: 'VIEW_VERIFICATION',
    assetAction: 'view',
    tags: ['Academic Excellence', 'GPA 3.77', 'UOK'],
  },
  {
    id: 'accolade-02',
    seq: '02',
    title: 'Winner — SDG Sprints Challenge',
    authority: 'IEEE Sri Lanka Section SIGHT',
    timeline: '2026',
    tier: 'gold',
    icon: 'Trophy',
    telemetry: 'Secured top rank by engineering high-impact digital workflows directly mapped to United Nations Sustainable Development Goals.',
    images: [sdgMain, sdgSlide1, sdgSlide2, sdgSlide3],
    assetPdf: sdgCertificate,
    assetLabel: 'VIEW_VERIFICATION',
    assetAction: 'view',
    tags: ['IEEE', 'SDGs', 'Digital Innovation'],
  },
  {
    id: 'accolade-03',
    seq: '03',
    title: '1st Runners Up — HackX 10.0',
    authority: 'Dept. of Industrial Management, UOK',
    timeline: '2025',
    tier: 'silver',
    icon: 'Medal',
    telemetry: 'Built and pitched a high-fidelity technology prototype under intense, time-constrained hackathon development conditions.',
    images: [hackxImg],
    assetPdf: null,
    tags: ['Hackathon', 'Prototype', 'UOK'],
  },
  {
    id: 'accolade-04',
    seq: '04',
    title: 'Finalist — CodeRally 4.0',
    authority: 'IEEE Student Branch, IIT',
    timeline: '2023',
    tier: 'bronze',
    icon: 'Award',
    telemetry: 'Advanced to the final stage of a highly competitive, algorithmic speed-coding sprint ecosystem.',
    images: [coderallyImg],
    assetPdf: null,
    tags: ['IEEE', 'Competitive Coding', 'Algorithm'],
  },
  {
    id: 'accolade-05',
    seq: '05',
    title: "Finalist — League of Leaders '23",
    authority: 'Commerce Club, UOK',
    timeline: '2023',
    tier: 'bronze',
    icon: 'Star',
    telemetry: 'Evaluated and selected among elite student teams for strategic project resolution and operations layout.',
    images: [leagueImg],
    assetPdf: null,
    tags: ['Leadership', 'Strategy', 'Commerce Club'],
  },
]

const RESEARCH_TELEMETRY = [
  {
    id: 'pub-01',
    seq: '01',
    title: 'Federated Learning for Privacy-Preserving Cyber Bullying Detection',
    outlet: '5th Global Conference on Children and Youth',
    venueFull: '5th Global Conference on Children and Youth, Oxford, UK',
    timeline: 'Mar 2025',
    tags: ['Federated Learning', 'Privacy-Preserving ML', 'Cyber Safety'],
    telemetry: 'Proposed cutting-edge decentralized machine learning models to identify cyberbullying patterns while rigidly safeguarding child data privacy at the edge.',
    images: [federatedImg],
    link: null,
  },
  {
    id: 'pub-02',
    seq: '02',
    title: 'Privacy Preserving Cyber Bullying Detection using Federated Learning',
    outlet: 'International Conference on Child Protection (ICCP)',
    venueFull: 'International Conference on Child Protection (ICCP), University of Kelaniya',
    timeline: 'Aug 2025',
    tags: ['Federated Learning', 'Child Protection', 'NLP'],
    telemetry: 'Engineered technical privacy-preserving model risk mitigation strategies complying with strict international sensitive data protection standards.',
    images: [privacyImg],
    link: null,
  },
]

// ═══════════════════════════════════════════════════════════════════════════
//  TIER CONFIG
// ═══════════════════════════════════════════════════════════════════════════
const TIER = {
  gold:   { border: 'rgba(251,191,36,0.4)',  glow: '0 20px 40px -12px rgba(251,191,36,0.22)',  badge: 'border-amber-500/30 bg-amber-500/10 text-amber-300',   label: 'GOLD_TIER',   hoverBorder: 'rgba(251,191,36,0.55)'   },
  silver: { border: 'rgba(203,213,225,0.32)', glow: '0 20px 40px -12px rgba(203,213,225,0.15)', badge: 'border-slate-400/30 bg-slate-400/10 text-slate-300',   label: 'SILVER_TIER', hoverBorder: 'rgba(203,213,225,0.5)'  },
  bronze: { border: 'rgba(194,65,12,0.3)',   glow: '0 20px 40px -12px rgba(194,65,12,0.16)',   badge: 'border-orange-700/30 bg-orange-700/10 text-orange-500', label: 'FINALIST',    hoverBorder: 'rgba(194,65,12,0.5)'    },
}

// ═══════════════════════════════════════════════════════════════════════════
//  ICON RESOLVER
// ═══════════════════════════════════════════════════════════════════════════
function ResolveIcon({ name, tier, size = 16 }) {
  const cls = {
    gold:   'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.75)]',
    silver: 'text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.65)]',
    bronze: 'text-orange-600 drop-shadow-[0_0_6px_rgba(194,65,12,0.55)]',
  }[tier] ?? 'text-cyan-400'
  switch (name) {
    case 'Trophy':        return <Trophy        size={size} className={cls} />
    case 'Medal':         return <Medal         size={size} className={cls} />
    case 'Star':          return <Star          size={size} className={cls} />
    case 'GraduationCap': return <GraduationCap size={size} className={cls} />
    default:              return <Award         size={size} className={cls} />
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  AUTO-SWIPING IMAGE GALLERY — full-width, prominent
// ═══════════════════════════════════════════════════════════════════════════
function AutoGallery({ images, alt, autoPlay = true }) {
  const [idx, setIdx]         = useState(0)
  const [paused, setPaused]   = useState(false)
  const intervalRef           = useRef(null)
  const touchStartX           = useRef(null)
  const total                 = images.length

  // Auto-advance every 3s
  useEffect(() => {
    if (!autoPlay || total <= 1 || paused) return
    intervalRef.current = setInterval(() => {
      setIdx(i => (i + 1) % total)
    }, 3000)
    return () => clearInterval(intervalRef.current)
  }, [autoPlay, total, paused, idx])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  { setIdx(i => (i - 1 + total) % total); setPaused(true) }
      if (e.key === 'ArrowRight') { setIdx(i => (i + 1) % total);         setPaused(true) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  const prev = () => { setIdx(i => (i - 1 + total) % total); setPaused(true) }
  const next = () => { setIdx(i => (i + 1) % total);         setPaused(true) }

  // Touch swipe handlers
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev()
    }
    touchStartX.current = null
  }

  if (total === 0) return (
    <div className="w-full aspect-[16/9] rounded-2xl border border-amber-500/15 bg-amber-950/10 flex flex-col items-center justify-center gap-3">
      <GraduationCap size={48} className="text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
      <span className="font-mono text-xs text-amber-400/60 tracking-widest uppercase">Academic Record</span>
    </div>
  )

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[#02000c]/80 select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Main image — fixed aspect ratio */}
      <div className="relative" style={{ paddingBottom: '56%' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={idx}
            src={images[idx]}
            alt={`${alt} — ${idx + 1} of ${total}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </AnimatePresence>

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-10"
             style={{ background: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 50%)', backgroundSize: '100% 3px' }} />

        {/* Bottom veil */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#02000c]/90 to-transparent pointer-events-none z-10" />

        {/* Prev / Next */}
        {total > 1 && (<>
          <button onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full
                             bg-black/70 border border-white/20 flex items-center justify-center
                             hover:bg-black/90 hover:border-cyan-400/50 hover:shadow-[0_0_12px_rgba(34,211,238,0.3)]
                             transition-all duration-200 cursor-pointer backdrop-blur-sm">
            <ChevronLeft size={18} className="text-white" />
          </button>
          <button onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full
                             bg-black/70 border border-white/20 flex items-center justify-center
                             hover:bg-black/90 hover:border-cyan-400/50 hover:shadow-[0_0_12px_rgba(34,211,238,0.3)]
                             transition-all duration-200 cursor-pointer backdrop-blur-sm">
            <ChevronRight size={18} className="text-white" />
          </button>
        </>)}

        {/* Counter chip */}
        {total > 1 && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1
                          rounded-full bg-black/70 border border-white/15 backdrop-blur-sm
                          font-mono text-[10px] text-slate-300">
            <Images size={10} />
            {idx + 1} / {total}
          </div>
        )}

        {/* Auto-play indicator */}
        {total > 1 && !paused && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1
                          rounded-full bg-black/70 border border-cyan-500/25 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[8px] text-cyan-400/80 tracking-widest uppercase">AUTO</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      {total > 1 && (
        <div className="flex gap-1.5 px-4 py-3">
          {images.map((_, i) => (
            <button key={i} onClick={() => { setIdx(i); setPaused(true) }}
                    className="flex-1 h-1 rounded-full overflow-hidden bg-white/10 cursor-pointer transition-all hover:bg-white/20">
              <div
                className={`h-full rounded-full transition-all duration-300 ${i === idx ? 'bg-cyan-400' : 'bg-transparent'}`}
                style={{ width: i === idx ? '100%' : '0%' }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Thumbnail strip */}
      {total > 1 && (
        <div className="flex gap-2 px-4 pb-4 overflow-x-auto scrollbar-none">
          {images.map((img, i) => (
            <button key={i} onClick={() => { setIdx(i); setPaused(true) }}
                    className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer
                                ${i === idx
                                  ? 'border-cyan-400/70 shadow-[0_0_10px_rgba(34,211,238,0.35)] scale-105'
                                  : 'border-white/[0.07] opacity-50 hover:opacity-80 hover:border-white/20'}`}>
              <img src={img} alt={`thumb ${i+1}`} className="w-full h-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  COMPACT SLIDE PANEL — centered modal, smaller than screen
// ═══════════════════════════════════════════════════════════════════════════
function SlidePanel({ onClose, children }) {
  // Close on Escape
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.97 }}
        animate={{ y: 0,  opacity: 1, scale: 1    }}
        exit={{    y: 40, opacity: 0, scale: 0.97 }}
        transition={{ type: 'spring', damping: 28, stiffness: 240 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[82vh] bg-slate-950/95 border border-indigo-500/25
                   shadow-[0_0_60px_rgba(99,102,241,0.18)] rounded-2xl overflow-y-auto flex flex-col backdrop-blur-xl"
      >
        {/* Top neon accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none z-10" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-xl border border-white/[0.08]
                     bg-slate-900/60 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30
                     flex items-center justify-center transition-all active:scale-95 cursor-pointer
                     hover:shadow-[0_0_12px_rgba(34,211,238,0.2)] backdrop-blur-sm"
        >
          <X size={18} />
        </button>

        {children}
      </motion.div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  HONOR DETAIL PANEL CONTENT
// ═══════════════════════════════════════════════════════════════════════════
function HonorPanelContent({ item }) {
  const t = TIER[item.tier] ?? TIER.bronze

  return (
    <div className="flex flex-col gap-0 flex-1">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-cyan-400 uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          ACCOLADE_{item.seq} // {item.authority}
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight font-sans leading-tight mb-3 pr-12">
          {item.title}
        </h3>
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full border ${t.badge}`}>
            {t.label}
          </span>
          <span className="font-mono text-sm text-slate-400">{item.timeline}</span>
        </div>
      </div>

      {/* Image gallery — large and prominent */}
      <div className="px-8 py-6">
        <AutoGallery images={item.images} alt={item.title} autoPlay={true} />
      </div>

      {/* Telemetry body */}
      <div className="px-8 pb-6">
        <div className="border border-indigo-500/15 bg-slate-950/30 backdrop-blur-sm rounded-2xl p-5 mb-5">
          <div className="font-mono text-[9px] text-cyan-400/60 tracking-widest uppercase mb-3">
            &gt; MISSION_TELEMETRY
          </div>
          <p className="text-base text-slate-300 font-sans leading-relaxed">{item.telemetry}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {item.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full border border-white/[0.07] bg-slate-900/60
                                       text-slate-300 font-mono text-xs tracking-widest uppercase">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          {item.assetPdf && item.assetAction === 'view' && (
            <a href={item.assetPdf} target="_blank" rel="noopener noreferrer"
               className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border
                          border-cyan-500/35 text-cyan-400 bg-cyan-950/15 hover:bg-cyan-950/30
                          hover:border-cyan-400/55 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]
                          font-mono text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer">
              <Eye size={15} />✦ VIEW_VERIFICATION
            </a>
          )}
          {item.assetPdf && item.assetAction === 'download' && (
            <a href={item.assetPdf} download
               className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border
                          border-amber-500/35 text-amber-400 bg-amber-950/15 hover:bg-amber-950/28
                          hover:border-amber-400/55 hover:shadow-[0_0_20px_rgba(251,191,36,0.22)]
                          font-mono text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer">
              <Download size={15} />✦ DOWNLOAD_DECK
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  PUBLICATION DETAIL PANEL CONTENT
// ═══════════════════════════════════════════════════════════════════════════
function PubPanelContent({ item }) {
  return (
    <div className="flex flex-col gap-0 flex-1">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-indigo-400 uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          PEER_REVIEW_{item.seq} // {item.timeline}
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight font-sans leading-snug mb-2 pr-12">
          {item.title}
        </h3>
        <p className="font-mono text-xs text-indigo-400/60 tracking-wide">{item.venueFull}</p>
      </div>

      {/* Image gallery */}
      <div className="px-8 py-6">
        <AutoGallery images={item.images} alt={item.title} autoPlay={true} />
      </div>

      {/* Telemetry */}
      <div className="px-8 pb-6">
        <div className="border border-indigo-500/15 bg-slate-950/30 backdrop-blur-sm rounded-2xl p-5 mb-5">
          <div className="font-mono text-[9px] text-indigo-400/60 tracking-widest uppercase mb-3">
            &gt; RESEARCH_ABSTRACT
          </div>
          <p className="text-base text-slate-300 font-sans leading-relaxed">{item.telemetry}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {item.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full border border-indigo-500/22 bg-indigo-950/15
                                       text-indigo-300 font-mono text-xs tracking-widest uppercase">
              {tag}
            </span>
          ))}
        </div>

        {/* Action */}
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer"
             className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border
                        border-indigo-500/35 text-indigo-400 bg-indigo-950/15 hover:bg-indigo-950/28
                        hover:border-indigo-400/55 hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]
                        font-mono text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer">
            <ExternalLink size={15} />✦ ACCESS_ABSTRACT
          </a>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  HONOR CAROUSEL — horizontal scroll-snap with arrows + dot pager
// ═══════════════════════════════════════════════════════════════════════════
function HonorCarousel({ onSelect }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const scrollRef   = useRef(null)
  const touchStartX = useRef(null)
  const total       = CELESTIAL_HONORS.length

  const scrollTo = (idx) => {
    const clamped = Math.min(Math.max(idx, 0), total - 1)
    setActiveIdx(clamped)
    const el = scrollRef.current
    if (!el) return
    const card = el.children[clamped]
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  const prev = () => scrollTo(activeIdx - 1)
  const next = () => scrollTo(activeIdx + 1)

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const cardW = el.children[0]?.offsetWidth ?? 360
    const idx = Math.round(el.scrollLeft / (cardW + 24))
    setActiveIdx(Math.min(Math.max(idx, 0), total - 1))
  }

  return (
    <div className="relative">
      {/* Prev arrow */}
      <button
        onClick={prev}
        disabled={activeIdx === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20
                   w-10 h-10 rounded-full bg-slate-950/80 border border-white/10
                   items-center justify-center backdrop-blur-sm
                   hover:border-cyan-400/50 hover:shadow-[0_0_14px_rgba(34,211,238,0.25)]
                   disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200
                   cursor-pointer hidden md:flex"
      >
        <ChevronLeft size={18} className="text-white" />
      </button>

      {/* Scroll track */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="flex gap-6 overflow-x-auto pb-4
                   snap-x snap-mandatory scroll-smooth
                   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {CELESTIAL_HONORS.map((item) => (
          <div key={item.id} className="snap-center shrink-0">
            <HonorCard item={item} onClick={() => onSelect(item)} />
          </div>
        ))}
      </div>

      {/* Next arrow */}
      <button
        onClick={next}
        disabled={activeIdx === total - 1}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20
                   w-10 h-10 rounded-full bg-slate-950/80 border border-white/10
                   items-center justify-center backdrop-blur-sm
                   hover:border-cyan-400/50 hover:shadow-[0_0_14px_rgba(34,211,238,0.25)]
                   disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200
                   cursor-pointer hidden md:flex"
      >
        <ChevronRight size={18} className="text-white" />
      </button>

      {/* Dot pagination */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {CELESTIAL_HONORS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer
              ${i === activeIdx
                ? 'w-6 h-2 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]'
                : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'}`}
          />
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  HONOR CARD — large card grid, no thumbnail preview on card itself
// ═══════════════════════════════════════════════════════════════════════════
const cardVariants = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 80, damping: 18 } },
}

function HonorCard({ item, onClick }) {
  const t = TIER[item.tier] ?? TIER.bronze
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, borderColor: t.hoverBorder, boxShadow: t.glow }}
      transition={{ type: 'spring', stiffness: 100, damping: 18 }}
      onClick={onClick}
      className="group relative shrink-0 w-[300px] md:w-[360px] rounded-2xl border border-white/[0.07] bg-slate-950/20
                 backdrop-blur-md overflow-hidden flex flex-col p-6 gap-5 cursor-pointer
                 hover:bg-slate-950/35 transition-[background-color] duration-300 min-h-[300px]"
    >
      {/* Animated corner brackets */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/[0.08]
                      group-hover:border-cyan-400/55 group-hover:-translate-x-[2px] group-hover:-translate-y-[2px]
                      transition-all duration-300 pointer-events-none" />
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/[0.08]
                      group-hover:border-cyan-400/55 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]
                      transition-all duration-300 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white/[0.08]
                      group-hover:border-cyan-400/55 group-hover:-translate-x-[2px] group-hover:translate-y-[2px]
                      transition-all duration-300 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white/[0.08]
                      group-hover:border-cyan-400/55 group-hover:translate-x-[2px] group-hover:translate-y-[2px]
                      transition-all duration-300 pointer-events-none" />

      {/* Icon preview thumbnail (if images available) */}
      {item.images && item.images.length > 0 && (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/[0.06]">
          <img src={item.images[0]} alt={item.title}
               className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          {item.images.length > 1 && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full
                            bg-black/70 border border-white/15 font-mono text-[9px] text-slate-300">
              <Images size={9} />
              {item.images.length} photos
            </div>
          )}
        </div>
      )}

      {/* Dean's List placeholder when no images */}
      {(!item.images || item.images.length === 0) && (
        <div className="relative w-full h-40 rounded-xl border border-amber-500/15 bg-amber-950/10 flex flex-col items-center justify-center gap-2">
          <GraduationCap size={36} className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
          <span className="font-mono text-[9px] text-amber-400/60 tracking-widest uppercase">Academic Record</span>
        </div>
      )}

      {/* Top row: icon + tier badge */}
      <div className="flex items-start justify-between">
        <div className="p-3 rounded-xl border border-white/[0.08] bg-slate-900/60
                        group-hover:border-cyan-400/25 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.1)]
                        transition-all duration-300">
          <ResolveIcon name={item.icon} tier={item.tier} size={22} />
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${t.badge}`}>
            {t.label}
          </span>
          <span className="font-mono text-sm text-slate-400">{item.timeline}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="font-mono text-[10px] text-cyan-500/65 tracking-widest uppercase truncate">
          {item.authority}
        </div>
        <h4 className="text-base font-bold text-white leading-snug group-hover:text-cyan-200
                       transition-colors duration-300">
          {item.title}
        </h4>
        <p className="text-sm text-slate-400 font-sans leading-relaxed line-clamp-2">
          {item.telemetry}
        </p>
      </div>

      {/* Footer cue */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.05] mt-auto">
        <div className="flex items-center gap-2 font-mono text-[9px] text-slate-600
                        group-hover:text-cyan-400/70 transition-colors duration-300 tracking-widest uppercase">
          <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
          OPEN_FULL_RECORD
        </div>
        {item.assetPdf && (
          <span className={`font-mono text-[8px] uppercase tracking-widest flex items-center gap-1
                            ${item.assetAction === 'view' ? 'text-cyan-500/60' : 'text-amber-500/60'}`}>
            {item.assetAction === 'view' ? <Eye size={9} /> : <Download size={9} />}
            {item.assetLabel}
          </span>
        )}
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  PUBLICATION CARD — large, clean
// ═══════════════════════════════════════════════════════════════════════════
function PublicationCard({ item, onClick }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, borderColor: 'rgba(99,102,241,0.5)', boxShadow: '0 20px 40px -12px rgba(99,102,241,0.25)' }}
      transition={{ type: 'spring', stiffness: 100, damping: 18 }}
      onClick={onClick}
      className="group relative rounded-2xl border border-white/[0.07] bg-slate-950/20
                 backdrop-blur-md overflow-hidden flex flex-col p-6 gap-5 cursor-pointer
                 hover:bg-slate-950/35 transition-[background-color] duration-300 min-h-[280px]"
    >
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/[0.08]
                      group-hover:border-indigo-400/55 group-hover:-translate-x-[2px] group-hover:-translate-y-[2px]
                      transition-all duration-300 pointer-events-none" />
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/[0.08]
                      group-hover:border-indigo-400/55 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]
                      transition-all duration-300 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white/[0.08]
                      group-hover:border-indigo-400/55 group-hover:-translate-x-[2px] group-hover:translate-y-[2px]
                      transition-all duration-300 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white/[0.08]
                      group-hover:border-indigo-400/55 group-hover:translate-x-[2px] group-hover:translate-y-[2px]
                      transition-all duration-300 pointer-events-none" />

      {/* Image preview */}
      {item.images && item.images.length > 0 && (
        <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/[0.06]">
          <img src={item.images[0]} alt={item.title}
               className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full
                          bg-black/70 border border-indigo-500/25 font-mono text-[8px] text-indigo-300">
            <Terminal size={8} />
            RESEARCH
          </div>
        </div>
      )}

      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between">
        <div className="p-3 rounded-xl border border-white/[0.08] bg-slate-900/60
                        group-hover:border-indigo-400/25 group-hover:shadow-[0_0_12px_rgba(99,102,241,0.12)]
                        transition-all duration-300">
          <Terminal size={20} className="text-indigo-400 drop-shadow-[0_0_6px_rgba(99,102,241,0.5)]" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border
                           border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
            ABSTRACT
          </span>
          <span className="font-mono text-sm text-slate-400">{item.timeline}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="font-mono text-[10px] text-indigo-400/65 tracking-widest uppercase truncate">
          {item.outlet}
        </div>
        <h4 className="text-base font-bold text-white leading-snug group-hover:text-indigo-200
                       transition-colors duration-300 line-clamp-3">
          {item.title}
        </h4>
        <p className="text-sm text-slate-400 font-sans leading-relaxed line-clamp-2">
          {item.telemetry}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.05] mt-auto">
        <div className="flex items-center gap-2 font-mono text-[9px] text-slate-600
                        group-hover:text-indigo-400/70 transition-colors duration-300 tracking-widest uppercase">
          <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
          OPEN_RESEARCH_RECORD
        </div>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  TAB CONFIG
// ═══════════════════════════════════════════════════════════════════════════
const TABS = [
  { id: 'honours',  label: 'Honours',  icon: Trophy,   accent: 'cyan',   count: CELESTIAL_HONORS.length   },
  { id: 'research', label: 'Research', icon: BookOpen, accent: 'indigo', count: RESEARCH_TELEMETRY.length },
]

// ═══════════════════════════════════════════════════════════════════════════
//  MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════
export default function Achievements() {
  const [activeTab,    setActiveTab]    = useState('honours')
  const [selectedHonor, setSelectedHonor] = useState(null)
  const [selectedPub,   setSelectedPub]   = useState(null)

  const listVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
  }

  return (
    <section
      id="achievements"
      className="relative w-full py-24 md:py-32 px-6 lg:px-16 overflow-hidden border-t border-white/[0.04]"
      style={{ background: 'transparent' }}
    >
      {/* Custom keyframes */}
      <style>{`
        @keyframes sweep-vertical {
          0%   { top: -4%; opacity: 0.05; }
          15%  { opacity: 0.7; }
          85%  { opacity: 0.7; }
          100% { top: 108%; opacity: 0.05; }
        }
      `}</style>

      {/* Subtle section veil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(3,0,20,0.72) 0%, rgba(3,0,22,0.68) 55%, rgba(3,0,20,0.72) 100%)' }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-12 md:mb-14"
        >
          <div className="flex items-center gap-2 font-mono text-sm text-indigo-400 tracking-[0.4em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            SYSTEMS_ACCOLADES // 04
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight font-sans leading-none">
            Achievements
          </h2>
          <p className="mt-4 font-mono text-sm text-slate-500 tracking-widest">
            STELLAR_ARCHIVE: {CELESTIAL_HONORS.length} HONORS // {RESEARCH_TELEMETRY.length} PUBLICATIONS &nbsp;·&nbsp; CLICK CARD TO INSPECT
          </p>
        </motion.div>

        {/* ── Tab bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-1 p-1 mb-10 rounded-xl border border-indigo-500/15
                     bg-slate-950/25 backdrop-blur-xl w-fit"
        >
          {TABS.map(tab => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            const isCyan = tab.accent === 'cyan'
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2.5 px-6 py-3 rounded-lg font-mono text-sm
                            tracking-widest uppercase transition-colors duration-200 cursor-pointer select-none
                            ${active ? (isCyan ? 'text-cyan-300' : 'text-indigo-300') : 'text-slate-500 hover:text-slate-300'}`}
              >
                {active && (
                  <motion.div
                    layoutId="achievTab"
                    className={`absolute inset-0 rounded-lg ${isCyan
                      ? 'bg-cyan-950/50 border border-cyan-500/30'
                      : 'bg-indigo-950/50 border border-indigo-500/30'}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    style={{ zIndex: 0 }}
                  />
                )}
                <Icon size={15} className="relative z-10" />
                <span className="relative z-10">{tab.label}</span>
                <span className={`relative z-10 px-2 py-0.5 rounded-full font-mono text-xs
                                  ${active
                                    ? (isCyan ? 'bg-cyan-500/20 text-cyan-400' : 'bg-indigo-500/20 text-indigo-400')
                                    : 'bg-slate-800/60 text-slate-600'}`}>
                  {tab.count}
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* ── Tab content ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'honours' && (
            <motion.div
              key="honours"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400/65 tracking-[0.3em] uppercase mb-6">
                <Trophy size={12} />
                SUB-PANEL A // CELESTIAL_HONORS_DECK &nbsp;·&nbsp; {CELESTIAL_HONORS.length} ACCOLADES
              </div>
              <HonorCarousel onSelect={setSelectedHonor} />
            </motion.div>
          )}

          {activeTab === 'research' && (
            <motion.div
              key="research"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 font-mono text-xs text-indigo-400/65 tracking-[0.3em] uppercase">
                  <BookOpen size={12} />
                  SUB-PANEL B // RESEARCH_TELEMETRY_DECK &nbsp;·&nbsp; {RESEARCH_TELEMETRY.length} TRANSMISSIONS
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-indigo-900/30
                                bg-indigo-950/10 backdrop-blur-sm font-mono text-xs text-slate-500">
                  <Terminal size={10} className="text-indigo-400/60" />
                  SATELLITE_ARCHIVE_TERMINAL v1.0
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-1" />
                  <span className="text-cyan-400/80">ONLINE</span>
                </div>
              </div>
              <motion.div
                initial="hidden" animate="visible" variants={listVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {RESEARCH_TELEMETRY.map(item => (
                  <PublicationCard key={item.id} item={item} onClick={() => setSelectedPub(item)} />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom HUD bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-14 pt-5 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-5 font-mono text-xs text-slate-600 tracking-widest uppercase">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-cyan-500/55 animate-pulse" />
              HONORS: {CELESTIAL_HONORS.length}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-indigo-500/55 animate-pulse" />
              RESEARCH: {RESEARCH_TELEMETRY.length}
            </span>
          </div>
          <span className="font-mono text-xs text-slate-600 tracking-widest uppercase">
            ASSET_PIPELINE: ACTIVE // SDG_CERT + DEANS_LIST
          </span>
        </motion.div>
      </div>

      {/* ── Slide panels ── */}
      <AnimatePresence>
        {selectedHonor && (
          <SlidePanel key="honor-panel" onClose={() => setSelectedHonor(null)}>
            <HonorPanelContent item={selectedHonor} />
          </SlidePanel>
        )}
        {selectedPub && (
          <SlidePanel key="pub-panel" onClose={() => setSelectedPub(null)}>
            <PubPanelContent item={selectedPub} />
          </SlidePanel>
        )}
      </AnimatePresence>
    </section>
  )
}
