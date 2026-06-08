import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitBranch, ExternalLink, Mail, ChevronDown } from 'lucide-react'
import { profile } from '../data/portfolioData'

import imgAstronaut  from '../assets/astronaut-nobg.png'
import imgFullstack   from '../assets/hero-fullstack.png'
import imgIoT         from '../assets/hero-iot.png'
import imgAR          from '../assets/hero-ar.png'
import imgCommunity   from '../assets/hero-community.png'

// ---------------------------------------------------------------------------
// Phrases paired with their images
// ---------------------------------------------------------------------------
const SLIDES = [
  { phrase: "Thulani Magedara.",                    image: imgAstronaut,  color: 'from-indigo-400 to-purple-500'  },
  { phrase: "I'm a Fullstack Developer.",           image: imgFullstack,  color: 'from-indigo-500 to-cyan-500'    },
  { phrase: "I'm an IoT Developer.",                image: imgIoT,        color: 'from-cyan-500 to-teal-500'      },
  { phrase: "I'm an AR Developer.",                 image: imgAR,         color: 'from-purple-500 to-pink-500'    },
  { phrase: "I'm a Community Leader & Organizer.",  image: imgCommunity,  color: 'from-amber-500 to-orange-500'   },
]

const TYPING_SPEED  = 50
const ERASING_SPEED = 26
const PAUSE_TYPED   = 2400
const PAUSE_ERASED  = 350

// ---------------------------------------------------------------------------
// useTypingCarousel — returns { displayed, phraseIdx }
// ---------------------------------------------------------------------------
function useTypingCarousel() {
  const [displayed,  setDisplayed]  = useState('')
  const [phraseIdx,  setPhraseIdx]  = useState(0)
  const [isTyping,   setIsTyping]   = useState(true)
  const [isPaused,   setIsPaused]   = useState(false)

  useEffect(() => {
    const target = SLIDES[phraseIdx].phrase

    if (isPaused) {
      const id = setTimeout(() => setIsPaused(false), isTyping ? PAUSE_TYPED : PAUSE_ERASED)
      return () => clearTimeout(id)
    }

    if (isTyping) {
      if (displayed.length < target.length) {
        const id = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), TYPING_SPEED)
        return () => clearTimeout(id)
      } else {
        setIsPaused(true)
        setIsTyping(false)
      }
    } else {
      if (displayed.length > 0) {
        const id = setTimeout(() => setDisplayed(displayed.slice(0, -1)), ERASING_SPEED)
        return () => clearTimeout(id)
      } else {
        setIsPaused(true)
        setIsTyping(true)
        setPhraseIdx(i => (i + 1) % SLIDES.length)
      }
    }
  }, [displayed, isTyping, isPaused, phraseIdx])

  return { displayed, phraseIdx }
}

// ---------------------------------------------------------------------------
// FloatingOrb
// ---------------------------------------------------------------------------
function FloatingOrb({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
      transition={{ duration: 9, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// ---------------------------------------------------------------------------
// HeroImage — swaps image with smooth enter/exit + continuous float
// ---------------------------------------------------------------------------
function HeroImage({ phraseIdx }) {
  const slide = SLIDES[phraseIdx]

  return (
    <div className="relative w-full flex items-center justify-center min-h-[420px]">
      {/* Ambient glow tinted per role */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`glow-${phraseIdx}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1,  scale: 1   }}
          exit={{    opacity: 0,  scale: 0.8 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${slide.color} opacity-[0.15] blur-3xl pointer-events-none`}
        />
      </AnimatePresence>

      {/* Image — outer handles enter/exit, inner handles float */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phraseIdx}
          initial={{ opacity: 0, scale: 0.88, y: 40  }}
          animate={{ opacity: 1, scale: 1,    y: 0   }}
          exit={{    opacity: 0, scale: 0.88, y: -40 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex justify-center"
        >
          {/* Inner float loop */}
          <motion.img
            src={slide.image}
            alt={slide.phrase}
            className="w-full max-w-[460px] object-contain drop-shadow-[0_0_60px_rgba(139,92,246,0.4)]"
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.55, // start float after entry completes
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


// ---------------------------------------------------------------------------
// Hero — main export
// ---------------------------------------------------------------------------
export default function Hero() {
  const { displayed, phraseIdx } = useTypingCarousel()
  const slide = SLIDES[phraseIdx]

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Ambient orbs */}
      <FloatingOrb className="w-[700px] h-[700px] bg-indigo-600/20  -top-60 -left-60"  delay={0}   />
      <FloatingOrb className="w-[500px] h-[500px] bg-purple-600/15  top-1/3  right-0"   delay={2.5} />
      <FloatingOrb className="w-[400px] h-[400px] bg-cyan-500/10    bottom-0 left-1/3"  delay={1.5} />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-16 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-[calc(100vh-12rem)]">

          {/* ── Left Column ──────────────────────────────────── */}
          <div className="flex-1 flex flex-col justify-center lg:py-8">

            {/* Greeting chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-7 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-mono tracking-widest w-fit"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              HELLO, WORLD —
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl xl:text-7xl font-bold text-white leading-[1.06] tracking-tight mb-4"
            >
              {profile.name.split(' ').map((word, i) => (
                <span key={i} className={i === 1
                  ? 'block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400'
                  : 'block'
                }>
                  {word}
                </span>
              ))}
            </motion.h1>

            {/* Typing tagline — coloured per role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-10 mb-8 flex items-center"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={`color-${phraseIdx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`text-xl sm:text-2xl font-medium bg-gradient-to-r ${slide.color} bg-clip-text text-transparent`}
                >
                  {displayed}
                  <span className="inline-block w-[3px] h-[1.1em] ml-[3px] bg-indigo-400 align-middle animate-[blink_1s_step-end_infinite]" />
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Role pills — show only the 4 role slides */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {SLIDES.slice(1).map((s, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${
                    i + 1 === phraseIdx
                      ? `bg-gradient-to-r ${s.color} text-white border-transparent shadow-lg`
                      : 'bg-white/[0.04] text-slate-400 border-white/10'
                  }`}
                >
                  {s.phrase.replace("I'm ", '').replace('.', '')}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <a
                href={`mailto:${profile.email}`}
                id="hero-cta-hire"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95"
              >
                <Mail size={16} />
                Get in Touch
              </a>
              <button
                onClick={scrollToProjects}
                id="hero-cta-projects"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white font-semibold text-sm transition-all backdrop-blur-sm hover:border-white/20"
              >
                View Projects
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex items-center gap-3"
            >
              <a href={profile.github} target="_blank" rel="noreferrer" id="hero-github" aria-label="GitHub"
                className="p-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all hover:scale-110">
                <GitBranch size={18} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" id="hero-linkedin" aria-label="LinkedIn"
                className="p-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 hover:text-indigo-400 hover:border-indigo-400/30 hover:bg-indigo-500/10 transition-all hover:scale-110">
                <ExternalLink size={18} />
              </a>
              <a href={`mailto:${profile.email}`} id="hero-email" aria-label="Email"
                className="p-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-500/10 transition-all hover:scale-110">
                <Mail size={18} />
              </a>
              <span className="text-slate-600 text-sm font-mono ml-1">{profile.phone}</span>
            </motion.div>
          </div>

          {/* ── Right Column — Animated Image ────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0,  scale: 1    }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 w-full max-w-[420px] xl:max-w-[480px] lg:self-center"
          >
            <HeroImage phraseIdx={phraseIdx} />
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
