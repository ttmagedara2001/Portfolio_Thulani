import './index.css'
import './App.css'

import SpaceBackground from './components/SpaceBackground'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'

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
        <div id="about"        className="min-h-screen flex items-center justify-center">
          <p className="text-slate-600 font-mono text-sm tracking-widest">ABOUT ME — Step 4</p>
        </div>
        <div id="experience"   className="min-h-screen flex items-center justify-center">
          <p className="text-slate-600 font-mono text-sm tracking-widest">EXPERIENCE — Step 3</p>
        </div>
        <div id="projects"     className="min-h-screen flex items-center justify-center">
          <p className="text-slate-600 font-mono text-sm tracking-widest">PROJECTS — Step 3</p>
        </div>
        <div id="achievements" className="min-h-screen flex items-center justify-center">
          <p className="text-slate-600 font-mono text-sm tracking-widest">ACHIEVEMENTS — Step 4</p>
        </div>
        <div id="contact"      className="min-h-screen flex items-center justify-center">
          <p className="text-slate-600 font-mono text-sm tracking-widest">CONTACT ME — Step 4</p>
        </div>
      </main>
    </div>
  )
}
