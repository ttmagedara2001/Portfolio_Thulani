// ═══════════════════════════════════════════════════════════════════════════
//  Achievements.jsx — Tab-switched HONOURS ↔ RESEARCH
//  Cards: clean, no thumbnails; click → lightbox modal (like Projects)
//  SDG modal: swipeable image gallery
// ═══════════════════════════════════════════════════════════════════════════
import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy, Medal, Award, Star, BookOpen, Terminal,
  ExternalLink, Download, Eye, GraduationCap,
  X, ChevronLeft, ChevronRight, Images, ZoomIn
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
    id: 'accolade-02',
    seq: '02',
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
    id: 'accolade-03',
    seq: '03',
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
    id: 'accolade-04',
    seq: '04',
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
  {
    id: 'accolade-05',
    seq: '05',
    title: "Dean's List — Level 3",
    authority: 'Faculty of Science, University of Kelaniya',
    timeline: '2025',
    tier: 'gold',
    icon: 'GraduationCap',
    telemetry: "Recognised with Academic Excellence on the Dean's List for outstanding GPA performance at undergraduate Level 3.",
    images: [],
    assetPdf: deansListPdf,
    assetLabel: 'DOWNLOAD_DECK',
    assetAction: 'download',
    tags: ['Academic Excellence', 'GPA 3.63', 'UOK'],
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
  gold:   { border: 'rgba(251,191,36,0.4)',  glow: '0 20px 40px -12px rgba(251,191,36,0.22)',  badge: 'border-amber-500/30 bg-amber-500/10 text-amber-300',   label: 'GOLD_TIER',   hoverBorder: 'rgba(251,191,36,0.45)'   },
  silver: { border: 'rgba(203,213,225,0.32)', glow: '0 20px 40px -12px rgba(203,213,225,0.15)', badge: 'border-slate-400/30 bg-slate-400/10 text-slate-300',   label: 'SILVER_TIER', hoverBorder: 'rgba(203,213,225,0.4)'  },
  bronze: { border: 'rgba(194,65,12,0.3)',   glow: '0 20px 40px -12px rgba(194,65,12,0.16)',   badge: 'border-orange-700/30 bg-orange-700/10 text-orange-500', label: 'FINALIST',    hoverBorder: 'rgba(194,65,12,0.4)'    },
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
//  MODAL IMAGE GALLERY (swipeable) — used inside both modals
// ═══════════════════════════════════════════════════════════════════════════
function ModalGallery({ images, alt }) {
  const [idx, setIdx] = useState(0)
  const total = images.length

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  setIdx(i => (i - 1 + total) % total)
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % total)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  if (total === 0) return null

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/[0.07] bg-[#02000c]/80 select-none">
      {/* Main image */}
      <div className="relative" style={{ paddingBottom: '58%' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={idx}
            src={images[idx]}
            alt={`${alt} — image ${idx + 1}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </AnimatePresence>

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] z-10"
             style={{ background: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 50%)', backgroundSize: '100% 3px' }} />

        {/* Gradient veil at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#02000c]/80 to-transparent pointer-events-none z-10" />

        {/* Prev / Next — only show if multiple images */}
        {total > 1 && (
          <>
            <button onClick={() => setIdx(i => (i - 1 + total) % total)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full
                               bg-black/60 border border-white/15 flex items-center justify-center
                               hover:bg-black/85 hover:border-cyan-400/40 transition-all duration-200 cursor-pointer">
              <ChevronLeft size={15} className="text-white" />
            </button>
            <button onClick={() => setIdx(i => (i + 1) % total)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full
                               bg-black/60 border border-white/15 flex items-center justify-center
                               hover:bg-black/85 hover:border-cyan-400/40 transition-all duration-200 cursor-pointer">
              <ChevronRight size={15} className="text-white" />
            </button>
          </>
        )}

        {/* Slide counter */}
        {total > 1 && (
          <div className="absolute top-2 right-2 z-20 flex items-center gap-1 px-2 py-0.5 rounded
                          bg-black/60 border border-white/10 font-mono text-[8px] text-slate-300">
            <Images size={9} />
            {idx + 1} / {total}
          </div>
        )}
      </div>

      {/* Dot indicators — only if multiple */}
      {total > 1 && (
        <div className="flex justify-center gap-1.5 py-2.5">
          {images.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer
                                ${i === idx ? 'bg-cyan-400 scale-125' : 'bg-white/25 hover:bg-white/45'}`} />
          ))}
        </div>
      )}

      {/* Thumbnail strip — only if multiple images */}
      {total > 1 && (
        <div className="flex gap-1.5 px-3 pb-3 overflow-x-auto scrollbar-none">
          {images.map((img, i) => (
            <button key={i} onClick={() => setIdx(i)}
                    className={`shrink-0 w-14 h-10 rounded-md overflow-hidden border transition-all duration-200 cursor-pointer
                                ${i === idx ? 'border-cyan-400/70 shadow-[0_0_8px_rgba(34,211,238,0.3)]' : 'border-white/[0.07] opacity-50 hover:opacity-80'}`}>
              <img src={img} alt={`thumb ${i+1}`} className="w-full h-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  HONOR DETAIL MODAL
// ═══════════════════════════════════════════════════════════════════════════
function HonorModal({ item, onClose }) {
  const t = TIER[item.tier] ?? TIER.bronze

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
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8
                 bg-black/88 backdrop-blur-md overflow-y-auto"
    >
      {/* Laser sweep line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15 z-0">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent absolute animate-[sweep-vertical_4s_linear_infinite]" />
      </div>

      <motion.div
        initial={{ scale: 0.92, y: 28, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 28, opacity: 0 }}
        transition={{ type: 'spring', damping: 24, stiffness: 180 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#040114]/96 border border-cyan-500/22
                   shadow-[0_0_55px_rgba(6,182,212,0.16)] rounded-2xl p-6 md:p-8
                   backdrop-blur-xl z-10 flex flex-col gap-6"
      >
        {/* Tactical corner brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/50" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400/50" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400/50" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400/50" />

        {/* Header */}
        <div className="flex justify-between items-start gap-4 border-b border-white/[0.05] pb-5">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-cyan-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              ACCOLADE_{item.seq} // {item.authority}
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight font-sans leading-tight">
              {item.title}
            </h3>
            <div className="flex items-center gap-2 flex-wrap mt-1">
              <span className={`font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${t.badge}`}>
                {t.label}
              </span>
              <span className="font-mono text-[9px] text-slate-500">{item.timeline}</span>
            </div>
          </div>
          <button onClick={onClose}
                  className="shrink-0 p-2 rounded-lg border border-white/[0.06] bg-slate-900/40
                             text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30
                             transition-all active:scale-95 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* Image gallery */}
        {item.images && item.images.length > 0 && (
          <ModalGallery images={item.images} alt={item.title} />
        )}

        {/* No image placeholder for Dean's List */}
        {(!item.images || item.images.length === 0) && (
          <div className="w-full rounded-xl border border-amber-500/15 bg-amber-950/10 p-8 flex flex-col items-center gap-3">
            <GraduationCap size={36} className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
            <span className="font-mono text-[10px] text-amber-400/60 tracking-widest uppercase">Academic Record</span>
          </div>
        )}

        {/* Telemetry body */}
        <div className="border border-white/[0.04] bg-slate-950/40 rounded-xl p-4">
          <div className="font-mono text-[9px] text-cyan-400/60 tracking-widest uppercase mb-2">
            &gt; MISSION_TELEMETRY
          </div>
          <p className="text-sm text-slate-300 font-sans leading-relaxed">{item.telemetry}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded border border-white/[0.06] bg-slate-900/60
                                       text-slate-400 font-mono text-[8px] tracking-widest uppercase">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer actions */}
        <div className="flex flex-wrap gap-3 pt-2 border-t border-white/[0.05]">
          {item.assetPdf && item.assetAction === 'view' && (
            <a href={item.assetPdf} target="_blank" rel="noopener noreferrer"
               className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-lg border
                          border-cyan-500/30 text-cyan-400 bg-cyan-950/10 hover:bg-cyan-950/28
                          hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]
                          font-mono text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer">
              <Eye size={14} />[ VIEW_VERIFICATION ]
            </a>
          )}
          {item.assetPdf && item.assetAction === 'download' && (
            <a href={item.assetPdf} download
               className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-lg border
                          border-amber-500/30 text-amber-400 bg-amber-950/10 hover:bg-amber-950/25
                          hover:border-amber-400/50 hover:shadow-[0_0_15px_rgba(251,191,36,0.18)]
                          font-mono text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer">
              <Download size={14} />[ DOWNLOAD_DECK ]
            </a>
          )}
          <button onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-lg border
                             border-white/[0.05] text-slate-400 bg-slate-900/40 hover:bg-slate-900/60
                             hover:text-white font-mono text-[10px] tracking-widest uppercase
                             transition-all duration-300 cursor-pointer">
            TERMINATE_DIAGNOSTICS
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  PUBLICATION DETAIL MODAL
// ═══════════════════════════════════════════════════════════════════════════
function PubModal({ item, onClose }) {
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
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8
                 bg-black/88 backdrop-blur-md overflow-y-auto"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15 z-0">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent absolute animate-[sweep-vertical_4s_linear_infinite]" />
      </div>

      <motion.div
        initial={{ scale: 0.92, y: 28, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 28, opacity: 0 }}
        transition={{ type: 'spring', damping: 24, stiffness: 180 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#030016]/96 border border-indigo-500/22
                   shadow-[0_0_55px_rgba(99,102,241,0.18)] rounded-2xl p-6 md:p-8
                   backdrop-blur-xl z-10 flex flex-col gap-6"
      >
        {/* Tactical corner brackets — indigo */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-indigo-400/50" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-indigo-400/50" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-indigo-400/50" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-indigo-400/50" />

        {/* Header */}
        <div className="flex justify-between items-start gap-4 border-b border-white/[0.05] pb-5">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-indigo-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              PEER_REVIEW_{item.seq} // {item.timeline}
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight font-sans leading-snug">
              {item.title}
            </h3>
            <p className="font-mono text-[9px] text-indigo-400/60 tracking-wider mt-0.5">{item.venueFull}</p>
          </div>
          <button onClick={onClose}
                  className="shrink-0 p-2 rounded-lg border border-white/[0.06] bg-slate-900/40
                             text-slate-400 hover:text-indigo-400 hover:border-indigo-400/30
                             transition-all active:scale-95 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* Image viewer */}
        {item.images && item.images.length > 0 && (
          <ModalGallery images={item.images} alt={item.title} />
        )}

        {/* Telemetry */}
        <div className="border border-white/[0.04] bg-slate-950/40 rounded-xl p-4">
          <div className="font-mono text-[9px] text-indigo-400/60 tracking-widest uppercase mb-2">
            &gt; RESEARCH_ABSTRACT
          </div>
          <p className="text-sm text-slate-300 font-sans leading-relaxed">{item.telemetry}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded border border-indigo-500/20 bg-indigo-950/15
                                       text-indigo-300 font-mono text-[8px] tracking-widest uppercase">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap gap-3 pt-2 border-t border-white/[0.05]">
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer"
               className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-lg border
                          border-indigo-500/30 text-indigo-400 bg-indigo-950/10 hover:bg-indigo-950/25
                          hover:border-indigo-400/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.22)]
                          font-mono text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer">
              <ExternalLink size={14} />[ ACCESS_ABSTRACT ]
            </a>
          )}
          <button onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-lg border
                             border-white/[0.05] text-slate-400 bg-slate-900/40 hover:bg-slate-900/60
                             hover:text-white font-mono text-[10px] tracking-widest uppercase
                             transition-all duration-300 cursor-pointer">
            TERMINATE_DIAGNOSTICS
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  HONOR CARD — clean, no thumbnail, click → modal
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
      whileHover={{ y: -7, borderColor: t.hoverBorder, boxShadow: t.glow }}
      transition={{ type: 'spring', stiffness: 100, damping: 18 }}
      onClick={onClick}
      className="group relative rounded-2xl border border-white/[0.06] bg-slate-950/55
                 backdrop-blur-md overflow-hidden flex flex-col p-5 gap-4 cursor-pointer
                 hover:bg-slate-950/70 transition-[background-color] duration-300"
    >
      {/* Animated corner brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/[0.07]
                      group-hover:border-cyan-400/55 group-hover:-translate-x-[2px] group-hover:-translate-y-[2px]
                      transition-all duration-300 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/[0.07]
                      group-hover:border-cyan-400/55 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]
                      transition-all duration-300 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/[0.07]
                      group-hover:border-cyan-400/55 group-hover:-translate-x-[2px] group-hover:translate-y-[2px]
                      transition-all duration-300 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/[0.07]
                      group-hover:border-cyan-400/55 group-hover:translate-x-[2px] group-hover:translate-y-[2px]
                      transition-all duration-300 rounded-br-sm pointer-events-none" />

      {/* Top row: icon + tier badge */}
      <div className="flex items-start justify-between">
        <div className="p-2.5 rounded-xl border border-white/[0.07] bg-slate-900/60
                        group-hover:border-cyan-400/25 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.1)]
                        transition-all duration-300">
          <ResolveIcon name={item.icon} tier={item.tier} size={20} />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className={`font-mono text-[7px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${t.badge}`}>
            {t.label}
          </span>
          <span className="font-mono text-[9px] text-slate-500">{item.timeline}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="font-mono text-[9px] text-cyan-500/65 tracking-widest uppercase truncate">
          {item.authority}
        </div>
        <h4 className="text-sm font-bold text-white leading-snug group-hover:text-cyan-200
                       transition-colors duration-300">
          {item.title}
        </h4>
        <p className="text-[10px] text-slate-400 font-sans leading-relaxed line-clamp-3">
          {item.telemetry}
        </p>
      </div>

      {/* Footer: "View" cue + asset action */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] mt-auto">
        {/* View cue (always visible) */}
        <div className="flex items-center gap-1.5 font-mono text-[8px] text-slate-600
                        group-hover:text-cyan-400/70 transition-colors duration-300 tracking-widest uppercase">
          <ZoomIn size={10} />
          VIEW_RECORD
        </div>

        {/* Asset shortcut */}
        {item.assetPdf && (
          <span className={`font-mono text-[7px] uppercase tracking-widest flex items-center gap-1
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
//  PUBLICATION CARD — clean, click → modal
// ═══════════════════════════════════════════════════════════════════════════
function PublicationCard({ item, onClick }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -7, borderColor: 'rgba(99,102,241,0.45)', boxShadow: '0 20px 40px -12px rgba(99,102,241,0.22)' }}
      transition={{ type: 'spring', stiffness: 100, damping: 18 }}
      onClick={onClick}
      className="group relative rounded-2xl border border-white/[0.06] bg-slate-950/55
                 backdrop-blur-md overflow-hidden flex flex-col p-5 gap-4 cursor-pointer
                 hover:bg-slate-950/70 transition-[background-color] duration-300"
    >
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/[0.07]
                      group-hover:border-indigo-400/55 group-hover:-translate-x-[2px] group-hover:-translate-y-[2px]
                      transition-all duration-300 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/[0.07]
                      group-hover:border-indigo-400/55 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]
                      transition-all duration-300 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/[0.07]
                      group-hover:border-indigo-400/55 group-hover:-translate-x-[2px] group-hover:translate-y-[2px]
                      transition-all duration-300 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/[0.07]
                      group-hover:border-indigo-400/55 group-hover:translate-x-[2px] group-hover:translate-y-[2px]
                      transition-all duration-300 rounded-br-sm pointer-events-none" />

      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between">
        <div className="p-2.5 rounded-xl border border-white/[0.07] bg-slate-900/60
                        group-hover:border-indigo-400/25 group-hover:shadow-[0_0_12px_rgba(99,102,241,0.12)]
                        transition-all duration-300">
          <Terminal size={18} className="text-indigo-400 drop-shadow-[0_0_6px_rgba(99,102,241,0.5)]" />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="font-mono text-[7px] uppercase tracking-widest px-2 py-0.5 rounded-full border
                           border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
            ABSTRACT
          </span>
          <span className="font-mono text-[9px] text-slate-500">{item.timeline}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="font-mono text-[9px] text-indigo-400/65 tracking-widest uppercase truncate">
          {item.outlet}
        </div>
        <h4 className="text-sm font-bold text-white leading-snug group-hover:text-indigo-200
                       transition-colors duration-300 line-clamp-3">
          {item.title}
        </h4>
        <p className="text-[10px] text-slate-400 font-sans leading-relaxed line-clamp-3">
          {item.telemetry}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] mt-auto">
        <div className="flex items-center gap-1.5 font-mono text-[8px] text-slate-600
                        group-hover:text-indigo-400/70 transition-colors duration-300 tracking-widest uppercase">
          <ZoomIn size={10} />
          VIEW_RESEARCH
        </div>
        <div className="flex gap-1">
          {item.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-1.5 py-0.5 rounded border border-white/[0.05] bg-slate-900/60
                                       text-slate-600 font-mono text-[7px] tracking-wider uppercase">
              {tag}
            </span>
          ))}
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
  const [activeTab, setActiveTab]         = useState('honours')
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
      style={{ background: 'linear-gradient(180deg, #02000a 0%, #030016 55%, #02000d 100%)' }}
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

      {/* Dot-grid bg */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-18" aria-hidden>
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ach-grid" width="72" height="72" patternUnits="userSpaceOnUse">
              <circle cx="36" cy="36" r="1" fill="rgba(99,102,241,0.35)" />
              <path d="M 72 0 L 0 0 0 72" fill="none" stroke="rgba(99,102,241,0.07)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ach-grid)" />
        </svg>
      </div>
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
           style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-[380px] h-[380px] rounded-full pointer-events-none z-0"
           style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.038) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-12 md:mb-14"
        >
          <div className="flex items-center gap-2 font-mono text-[11px] text-indigo-400 tracking-[0.4em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            SYSTEMS_ACCOLADES // 04
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight font-sans leading-none">
            Achievements
          </h2>
          <p className="mt-4 font-mono text-[11px] text-slate-500 tracking-widest">
            STELLAR_ARCHIVE: {CELESTIAL_HONORS.length} HONORS // {RESEARCH_TELEMETRY.length} PUBLICATIONS &nbsp;·&nbsp; CLICK CARD TO INSPECT
          </p>
        </motion.div>

        {/* ── Tab bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-1 p-1 mb-10 rounded-xl border border-white/[0.06]
                     bg-slate-950/60 backdrop-blur-md w-fit"
        >
          {TABS.map(tab => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            const isCyan = tab.accent === 'cyan'
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs
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
                <Icon size={13} className="relative z-10" />
                <span className="relative z-10">{tab.label}</span>
                <span className={`relative z-10 px-1.5 py-0.5 rounded-full font-mono text-[9px]
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
              <div className="flex items-center gap-2 font-mono text-[10px] text-cyan-400/65 tracking-[0.3em] uppercase mb-6">
                <Trophy size={11} />
                SUB-PANEL A // CELESTIAL_HONORS_DECK &nbsp;·&nbsp; {CELESTIAL_HONORS.length} ACCOLADES
              </div>
              <motion.div
                initial="hidden" animate="visible" variants={listVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5"
              >
                {CELESTIAL_HONORS.map(item => (
                  <HonorCard key={item.id} item={item} onClick={() => setSelectedHonor(item)} />
                ))}
              </motion.div>
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
                <div className="flex items-center gap-2 font-mono text-[10px] text-indigo-400/65 tracking-[0.3em] uppercase">
                  <BookOpen size={11} />
                  SUB-PANEL B // RESEARCH_TELEMETRY_DECK &nbsp;·&nbsp; {RESEARCH_TELEMETRY.length} TRANSMISSIONS
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-indigo-900/30
                                bg-indigo-950/10 backdrop-blur-sm font-mono text-[8px] text-slate-500">
                  <Terminal size={9} className="text-indigo-400/60" />
                  SATELLITE_ARCHIVE_TERMINAL v1.0
                  <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse ml-1" />
                  <span className="text-green-400/80">ONLINE</span>
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
          <div className="flex items-center gap-5 font-mono text-[9px] text-slate-600 tracking-widest uppercase">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-cyan-500/55 animate-pulse" />
              HONORS: {CELESTIAL_HONORS.length}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-indigo-500/55 animate-pulse" />
              RESEARCH: {RESEARCH_TELEMETRY.length}
            </span>
          </div>
          <span className="font-mono text-[9px] text-slate-600 tracking-widest uppercase">
            ASSET_PIPELINE: ACTIVE // SDG_CERT + DEANS_LIST
          </span>
        </motion.div>
      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {selectedHonor && (
          <HonorModal key="honor-modal" item={selectedHonor} onClose={() => setSelectedHonor(null)} />
        )}
        {selectedPub && (
          <PubModal key="pub-modal" item={selectedPub} onClose={() => setSelectedPub(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
