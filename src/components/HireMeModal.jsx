// ═══════════════════════════════════════════════════════════════════════════
//  HireMeModal.jsx — Professional Engagement Request Form
//  Triggered by the "Hire Me" button in the Navbar.
//  Submits to Web3Forms (same key as Contact section).
// ═══════════════════════════════════════════════════════════════════════════
import { useState, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle, AlertCircle, Loader, Briefcase, Mail, User, Building2 } from 'lucide-react'

// ── Web3Forms access key — same as Contact.jsx ────────────────────────────
// Get yours free at https://web3forms.com (enter thulanimagedara@gmail.com)
const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'

// ── Role / engagement type options ────────────────────────────────────────
const ROLE_TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']

// ── Small field component ──────────────────────────────────────────────────
function Field({ id, label, icon: Icon, placeholder, type = 'text', value, onChange, error, textarea = false }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.28em] text-cyan-400/70 uppercase select-none">
        {Icon && <Icon size={9} />}
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={textarea ? 4 : undefined}
        className={`w-full rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600
                    placeholder:font-mono placeholder:text-[11px] placeholder:tracking-widest
                    font-sans outline-none resize-none transition-all duration-200
                    border ${error
                      ? 'border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/30'
                      : 'border-white/[0.07] focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20'
                    }`}
        style={{ background: 'rgba(3, 0, 22, 0.85)' }}
      />
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-1 font-mono text-[9px] text-red-400/80 tracking-wider">
            <AlertCircle size={9} />{error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  MAIN MODAL
// ═══════════════════════════════════════════════════════════════════════════
const INITIAL = { name: '', email: '', company: '', roleType: '', message: '' }
const INIT_ERR = { name: '', email: '', company: '', message: '' }

export default function HireMeModal({ open, onClose }) {
  const [fields, setFields] = useState(INITIAL)
  const [errors, setErrors] = useState(INIT_ERR)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const nameId    = useId()
  const emailId   = useId()
  const companyId = useId()
  const msgId     = useId()

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleChange = (field) => (e) => {
    setFields(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }))
  }

  const validate = () => {
    const e = { ...INIT_ERR }
    if (!fields.name.trim())    e.name    = 'FIELD_REQUIRED: FULL_NAME'
    if (!fields.email.trim())   e.email   = 'FIELD_REQUIRED: EMAIL'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'INVALID_FORMAT: EMAIL'
    if (!fields.message.trim()) e.message = 'FIELD_REQUIRED: MESSAGE'
    else if (fields.message.trim().length < 10) e.message = 'MIN_10_CHARS'
    setErrors(e)
    return !Object.values(e).some(Boolean)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      console.warn('Web3Forms key not configured.')
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key:  WEB3FORMS_KEY,
          subject:     `[Hire Me] ${fields.roleType || 'Opportunity'} — ${fields.name}${fields.company ? ` @ ${fields.company}` : ''}`,
          from_name:   'Portfolio — Hire Me Form',
          name:        fields.name,
          email:       fields.email,
          company:     fields.company || '—',
          role_type:   fields.roleType || '—',
          message:     fields.message,
          botcheck:    '',
        }),
      })
      const data = await res.json()
      if (data.success) { setStatus('success'); setFields(INITIAL) }
      else              { console.error('Web3Forms error:', data); setStatus('error') }
    } catch (err) {
      console.error('Submission failed:', err)
      setStatus('error')
    }
  }

  const handleReset = () => { setStatus('idle'); setErrors(INIT_ERR) }
  const handleClose = () => { onClose(); setTimeout(() => { setStatus('idle'); setFields(INITIAL); setErrors(INIT_ERR) }, 400) }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="hm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* ── Modal panel ── */}
          <motion.div
            key="hm-panel"
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1     }}
            exit={{    opacity: 0, y: 60, scale: 0.97  }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full max-w-lg rounded-2xl border border-white/[0.09] overflow-hidden shadow-2xl"
              style={{ background: 'linear-gradient(160deg, #06011a 0%, #030014 60%, #04011e 100%)' }}
            >
              {/* Corner bracket accents */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-indigo-500/40" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-indigo-500/40" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-500/30" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-500/30" />

              {/* Top header bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                    <Briefcase size={15} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-mono text-[8px] tracking-[0.3em] text-indigo-400/70 uppercase mb-0.5">ENGAGEMENT_REQUEST</p>
                    <h2 className="text-sm font-bold text-white tracking-wide">Work With Thulani</h2>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center
                             text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/[0.05]
                             transition-all duration-200 cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Form body */}
              <div className="px-6 py-5 relative">
                <AnimatePresence mode="wait">

                  {/* ── Success state ── */}
                  {status === 'success' && (
                    <motion.div key="success"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center gap-4 py-10 text-center"
                    >
                      <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                        <CheckCircle size={48} className="text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.6)]" />
                      </motion.div>
                      <div>
                        <p className="font-mono text-[9px] tracking-[0.35em] text-emerald-400/70 uppercase mb-2">REQUEST_TRANSMITTED</p>
                        <p className="text-lg font-black text-white uppercase tracking-tight">Message Received!</p>
                        <p className="text-xs text-slate-400 font-sans mt-1.5 leading-relaxed">
                          Thank you for reaching out. I'll be in touch at <span className="text-cyan-400">thulanimagedara@gmail.com</span> soon.
                        </p>
                      </div>
                      <div className="flex gap-3 mt-2">
                        <button onClick={handleReset}
                                className="px-4 py-2 rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/20
                                           font-mono text-[9px] tracking-widest uppercase transition-all duration-200 cursor-pointer">
                          SEND_ANOTHER
                        </button>
                        <button onClick={handleClose}
                                className="px-4 py-2 rounded-lg bg-indigo-600/80 hover:bg-indigo-500/90 text-white
                                           font-mono text-[9px] tracking-widest uppercase transition-all duration-200 cursor-pointer">
                          CLOSE
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Error state ── */}
                  {status === 'error' && (
                    <motion.div key="error"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center gap-4 py-10 text-center"
                    >
                      <AlertCircle size={48} className="text-red-400 drop-shadow-[0_0_20px_rgba(248,113,113,0.5)]" />
                      <div>
                        <p className="font-mono text-[9px] tracking-[0.35em] text-red-400/70 uppercase mb-2">TRANSMISSION_FAILED</p>
                        <p className="text-base font-bold text-white">Couldn't send message</p>
                        <p className="text-xs text-slate-400 font-sans mt-1">
                          Try emailing directly at{' '}
                          <a href="mailto:thulanimagedara@gmail.com" className="text-cyan-400 underline">
                            thulanimagedara@gmail.com
                          </a>
                        </p>
                      </div>
                      <button onClick={handleReset}
                              className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-950/20
                                         font-mono text-[9px] tracking-widest uppercase transition-all duration-200 cursor-pointer">
                        TRY_AGAIN
                      </button>
                    </motion.div>
                  )}

                  {/* ── Idle / sending state — show form ── */}
                  {(status === 'idle' || status === 'sending') && (
                    <motion.form key="form" onSubmit={handleSubmit} noValidate
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col gap-4"
                    >
                      {/* Row 1: Name + Email */}
                      <div className="grid grid-cols-2 gap-4">
                        <Field id={nameId}  label="Full Name"    icon={User}      placeholder="Jane Smith"              value={fields.name}    onChange={handleChange('name')}    error={errors.name} />
                        <Field id={emailId} label="Email"        icon={Mail}      placeholder="jane@company.com"        value={fields.email}   onChange={handleChange('email')}   error={errors.email} type="email" />
                      </div>

                      {/* Row 2: Company + Role Type */}
                      <div className="grid grid-cols-2 gap-4">
                        <Field id={companyId} label="Company / Organisation" icon={Building2} placeholder="Acme Corp (optional)" value={fields.company} onChange={handleChange('company')} error={errors.company} />

                        {/* Role type selector */}
                        <div className="flex flex-col gap-1.5">
                          <label className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.28em] text-cyan-400/70 uppercase select-none">
                            <Briefcase size={9} />
                            Engagement Type
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {ROLE_TYPES.map(rt => (
                              <button
                                key={rt}
                                type="button"
                                onClick={() => setFields(f => ({ ...f, roleType: rt === f.roleType ? '' : rt }))}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider border transition-all duration-200 cursor-pointer ${
                                  fields.roleType === rt
                                    ? 'bg-indigo-600/25 border-indigo-400/50 text-indigo-300'
                                    : 'bg-transparent border-white/[0.07] text-slate-500 hover:text-slate-300 hover:border-white/20'
                                }`}
                              >
                                {rt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <Field id={msgId} label="Message / Opportunity Details" placeholder="Tell me about the role, project scope, timeline..." value={fields.message} onChange={handleChange('message')} error={errors.message} textarea />

                      {/* Submit */}
                      <div className="flex items-center justify-between pt-1">
                        <p className="text-[10px] text-slate-600 font-mono">
                          Replies within <span className="text-cyan-500/80">24–48h</span>
                        </p>
                        <button
                          type="submit"
                          disabled={status === 'sending'}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                                     transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-60
                                     disabled:cursor-not-allowed cursor-pointer"
                          style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 4px 20px rgba(99,102,241,0.35)' }}
                        >
                          {status === 'sending' ? (
                            <><Loader size={14} className="animate-spin" /> Sending…</>
                          ) : (
                            <><Send size={14} /> Send Message</>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
