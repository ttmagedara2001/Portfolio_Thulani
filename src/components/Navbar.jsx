import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/portfolioData'

const NAV_LINKS = [
  { id: 'hero',         label: 'Home'         },
  { id: 'about',        label: 'About Me'     },
  { id: 'experience',   label: 'Experience'   },
  { id: 'projects',     label: 'Projects'     },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact',      label: 'Contact Me'   },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [activeId,    setActiveId]    = useState('hero')

  // ── scroll opacity + active section detection ──────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)

      // pick the section whose top is closest to 120px from viewport top
      let closest = 'hero'
      let minDist = Infinity
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id)
        if (!el) continue
        const dist = Math.abs(el.getBoundingClientRect().top - 120)
        if (dist < minDist) { minDist = dist; closest = link.id }
      }
      setActiveId(closest)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const initials = profile.name.split(' ').map(w => w[0]).join('')

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1  }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#030014]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 group"
          >
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeId === id
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {activeId === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/[0.08]"
                      transition={{ type: 'spring', stiffness: 380, damping: 38 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={`mailto:${profile.email}`}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95"
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden text-slate-300 hover:text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1,  y: 0    }}
            exit={{    opacity: 0,  y: -20  }}
            transition={{ duration: 0.22 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#030014]/95 backdrop-blur-xl border-b border-white/[0.07] px-6 py-4 flex flex-col gap-1"
          >
            {NAV_LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeId === id
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {label}
              </button>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 text-center px-4 py-3 rounded-lg bg-indigo-600 text-white text-sm font-medium"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
