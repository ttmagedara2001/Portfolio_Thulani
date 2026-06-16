import './index.css'
import './App.css'

import SpaceBackground from './components/SpaceBackground'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import AboutMe         from './components/AboutMe'
import Experience      from './components/Experience'
import Projects        from './components/Projects'
import Achievements    from './components/Achievements'
import Contact        from './components/Contact'

/**
 * App.jsx — Root shell.
 *
 * Global layer order (z-index):
 *   0  — SpaceBackground canvas (fixed)
 *   10 — page content sections
 *   50 — Navbar (fixed)
 *
 * Sections wired in as steps complete:
 *   Step 2 ✓ → SpaceBackground + Navbar + Hero
 *   Step 3   → Projects + Experience
 *   Step 4   → Skills + Publications + Achievements + Contact
 */

export default function App() {
  return (
    <div
      className="relative min-h-screen font-['Inter',sans-serif]"
      style={{ background: '#030014' }}
    >
      {/* ── Global kinetic starfield ── */}
      <SpaceBackground />

      {/* ── Fixed navigation ── */}
      <Navbar />

      {/* ── Page sections ── */}
      <main className="relative z-10">
        <Hero />

        {/* Placeholder blocks — removed as real components are wired in */}
        <AboutMe />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </div>
  )
}
