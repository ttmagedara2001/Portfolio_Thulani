// ═══════════════════════════════════════════════════════════════════════════
//  Contact.jsx — Sub-space Transmission Terminal
//  Split-grid: Left = Telemetry Hub | Right = Message Payload Form
// ═══════════════════════════════════════════════════════════════════════════
import { useState, useRef, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, Phone, MapPin, MessageSquare, Send,
  Terminal, Radio, Zap,
  CheckCircle, AlertCircle, Loader
} from 'lucide-react'

// ── Inline SVG icons (not available in this lucide-react build) ────────────
function GithubIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  CONTACT DATA
// ═══════════════════════════════════════════════════════════════════════════
const CONTACT_NODES = [
  {
    id: 'email',
    label: 'PRIMARY_UPLINK',
    value: 'thulanimagedara@gmail.com',
    icon: Mail,
    accent: 'cyan',
    href: 'mailto:thulanimagedara@gmail.com',
    copyable: true,
  },
  {
    id: 'phone',
    label: 'MOBILE_COMMS',
    value: '+94 74 087 6190',
    icon: Phone,
    accent: 'indigo',
    href: 'tel:+94740876190',
    copyable: true,
  },
  {
    id: 'whatsapp',
    label: 'WHATSAPP_ROUTING',
    value: '+94 47 158 9927',
    icon: MessageSquare,
    accent: 'green',
    href: 'https://wa.me/94471589927',
    copyable: false,
  },
  {
    id: 'location',
    label: 'SECTOR_NODE',
    value: 'University of Kelaniya, Sri Lanka',
    icon: MapPin,
    accent: 'purple',
    href: null,
    copyable: false,
  },
]

const SOCIAL_LINKS = [
  {
    id: 'github',
    label: 'GITHUB_NETWORK',
    handle: '@ttmagedara2001',
    href: 'https://github.com/ttmagedara2001',
    icon: GithubIcon,
    color: 'hover:text-white hover:border-white/30 hover:shadow-[0_0_14px_rgba(255,255,255,0.08)]',
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN_VECTOR',
    handle: 'thulani-magedara',
    href: 'https://www.linkedin.com/in/thulani-magedara-99868724b/',
    icon: LinkedinIcon,
    color: 'hover:text-blue-400 hover:border-blue-400/40 hover:shadow-[0_0_14px_rgba(59,130,246,0.18)]',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
//  ACCENT STYLES MAP
// ═══════════════════════════════════════════════════════════════════════════
const ACCENT = {
  cyan:   { icon: 'text-cyan-400',   border: 'border-cyan-500/25',   bg: 'bg-cyan-950/15',   glow: 'group-hover:shadow-[0_0_14px_rgba(34,211,238,0.15)]',   text: 'text-cyan-400'   },
  indigo: { icon: 'text-indigo-400', border: 'border-indigo-500/25', bg: 'bg-indigo-950/15', glow: 'group-hover:shadow-[0_0_14px_rgba(99,102,241,0.15)]',   text: 'text-indigo-400' },
  green:  { icon: 'text-green-400',  border: 'border-green-500/25',  bg: 'bg-green-950/15',  glow: 'group-hover:shadow-[0_0_14px_rgba(34,197,94,0.15)]',    text: 'text-green-400'  },
  purple: { icon: 'text-purple-400', border: 'border-purple-500/25', bg: 'bg-purple-950/15', glow: 'group-hover:shadow-[0_0_14px_rgba(168,85,247,0.15)]',   text: 'text-purple-400' },
}

// ═══════════════════════════════════════════════════════════════════════════
//  COPY-TO-CLIPBOARD HOOK
// ═══════════════════════════════════════════════════════════════════════════
function useCopy() {
  const [copied, setCopied] = useState(null)
  const copy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    })
  }
  return { copied, copy }
}

// ═══════════════════════════════════════════════════════════════════════════
//  CONTACT NODE CARD
// ═══════════════════════════════════════════════════════════════════════════
function ContactNode({ node, copied, onCopy }) {
  const Icon = node.icon
  const a = ACCENT[node.accent] ?? ACCENT.cyan
  const isCopied = copied === node.id

  return (
    <div className={`group relative flex items-center gap-4 p-4 rounded-xl border ${a.border} ${a.bg}
                     backdrop-blur-sm transition-all duration-300 ${a.glow} cursor-default`}>
      {/* Corner ticks */}
      <div className={`absolute top-0 left-0 w-2.5 h-2.5 border-t border-l ${a.border} opacity-60`} />
      <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r ${a.border} opacity-60`} />

      {/* Icon */}
      <div className={`shrink-0 w-10 h-10 rounded-lg border ${a.border} ${a.bg} flex items-center justify-center`}>
        <Icon size={16} className={a.icon} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className={`font-mono text-[8px] tracking-[0.25em] uppercase mb-0.5 ${a.text} opacity-70`}>
          {node.label}
        </div>
        {node.href ? (
          <a href={node.href}
             target={node.href.startsWith('http') ? '_blank' : undefined}
             rel={node.href.startsWith('http') ? 'noopener noreferrer' : undefined}
             className={`text-sm font-medium text-slate-200 hover:${a.text === 'text-cyan-400' ? 'text-cyan-300' : a.text} transition-colors truncate block`}>
            {node.value}
          </a>
        ) : (
          <span className="text-sm text-slate-300 truncate block">{node.value}</span>
        )}
      </div>

      {/* Copy button */}
      {node.copyable && (
        <button
          onClick={() => onCopy(node.value, node.id)}
          className={`shrink-0 flex items-center gap-1 px-2 py-1 rounded border font-mono text-[7px]
                      uppercase tracking-widest transition-all duration-200 cursor-pointer
                      ${isCopied
                        ? 'border-green-500/40 bg-green-950/20 text-green-400'
                        : `${a.border} text-slate-500 hover:${a.text} hover:${a.border.replace('/25','/50')}`}`}>
          <AnimatePresence mode="wait" initial={false}>
            {isCopied ? (
              <motion.span key="done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                           className="flex items-center gap-1">
                <CheckCircle size={8} /> COPIED
              </motion.span>
            ) : (
              <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                COPY
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  FORM INPUT
// ═══════════════════════════════════════════════════════════════════════════
function TerminalInput({ id, label, placeholder, type = 'text', value, onChange, error, textarea = false }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-mono text-[9px] tracking-[0.28em] text-cyan-400/70 uppercase select-none">
        {label}
      </label>
      <div className="relative">
        {/* Active scan line on focus */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-sm bg-cyan-400/0
                        peer-focus:bg-cyan-400/80 transition-all duration-300" />
        <Tag
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={textarea ? 5 : undefined}
          className={`peer w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm text-slate-200
                      placeholder:text-slate-600 placeholder:font-mono placeholder:text-[11px]
                      placeholder:tracking-widest font-sans outline-none resize-none
                      transition-all duration-200
                      ${error
                        ? 'border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/40'
                        : 'border-indigo-500/20 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30'
                      }`}
          style={{ background: 'rgba(2, 0, 20, 0.7)' }}
        />
        {/* Scanline overlay inside input */}
        <div className="absolute inset-0 rounded-xl pointer-events-none opacity-[0.025]"
             style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.3) 2px, rgba(34,211,238,0.3) 3px)' }} />
      </div>
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
//  TRANSMISSION FORM
// ═══════════════════════════════════════════════════════════════════════════
const INITIAL = { name: '', email: '', message: '' }
const INITIAL_ERRORS = { name: '', email: '', message: '' }

// ── Web3Forms access key — safe to expose in frontend code ────────────────
// To activate: go to https://web3forms.com → enter thulanimagedara@gmail.com
// → check your inbox → copy the access key → paste it below
const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'

function TransmissionForm() {
  const [fields, setFields] = useState(INITIAL)
  const [errors, setErrors] = useState(INITIAL_ERRORS)
  const [status, setStatus]  = useState('idle') // idle | sending | success | error
  const nameId    = useId()
  const emailId   = useId()
  const messageId = useId()

  const validate = () => {
    const e = { ...INITIAL_ERRORS }
    if (!fields.name.trim())                          e.name    = 'FIELD_REQUIRED: OPERATOR_NAME'
    if (!fields.email.trim())                         e.email   = 'FIELD_REQUIRED: EMAIL_ADDRESS'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'INVALID_FORMAT: EMAIL_PACKET'
    if (!fields.message.trim())                       e.message = 'FIELD_REQUIRED: MESSAGE_PAYLOAD'
    else if (fields.message.trim().length < 10)       e.message = 'PAYLOAD_TOO_SHORT: MIN_10_CHARS'
    setErrors(e)
    return !Object.values(e).some(Boolean)
  }

  const handleChange = (field) => (e) => {
    setFields(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    // Guard: if the access key hasn't been configured yet, show an error
    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      console.warn('Web3Forms key not configured. Visit https://web3forms.com to get your key.')
      setStatus('error')
      return
    }

    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key:   WEB3FORMS_KEY,
          subject:      `[Portfolio] New message from ${fields.name}`,
          from_name:    'Portfolio Contact Terminal',
          name:         fields.name,
          email:        fields.email,
          message:      fields.message,
          // Honeypot anti-spam
          botcheck:     '',
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setFields(INITIAL)
      } else {
        console.error('Web3Forms error:', data)
        setStatus('error')
      }
    } catch (err) {
      console.error('Transmission failed:', err)
      setStatus('error')
    }
  }

  const handleReset = () => { setStatus('idle'); setErrors(INITIAL_ERRORS) }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 relative">
      {/* Success overlay */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5
                       rounded-2xl bg-[#030016]/95 backdrop-blur-md border border-green-500/25"
          >
            {/* Corner brackets — green */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-green-400/50" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-green-400/50" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-green-400/50" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-green-400/50" />

            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, type: 'spring' }}>
              <CheckCircle size={44} className="text-green-400 drop-shadow-[0_0_18px_rgba(34,197,94,0.7)]" />
            </motion.div>
            <div className="text-center px-6">
              <div className="font-mono text-[10px] tracking-[0.35em] text-green-400/70 uppercase mb-2">
                TRANSMISSION_COMPLETE
              </div>
              <p className="text-lg font-black text-white uppercase tracking-tight">Signal Dispatched</p>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Message delivered to <span className="text-cyan-400">thulanimagedara@gmail.com</span>
              </p>
            </div>
            <button type="button" onClick={handleReset}
                    className="px-5 py-2 rounded-lg border border-green-500/30 text-green-400
                               hover:bg-green-950/20 font-mono text-[9px] tracking-widest uppercase
                               transition-all duration-200 cursor-pointer">
              SEND_ANOTHER
            </button>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5
                       rounded-2xl bg-[#030016]/95 backdrop-blur-md border border-red-500/25"
          >
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-red-400/50" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-red-400/50" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-red-400/50" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-red-400/50" />

            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, type: 'spring' }}>
              <AlertCircle size={44} className="text-red-400 drop-shadow-[0_0_18px_rgba(248,113,113,0.7)]" />
            </motion.div>
            <div className="text-center px-6">
              <div className="font-mono text-[10px] tracking-[0.35em] text-red-400/70 uppercase mb-2">
                TRANSMISSION_FAILED
              </div>
              <p className="text-lg font-black text-white uppercase tracking-tight">Signal Lost</p>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Check your connection or try emailing directly.
              </p>
            </div>
            <button type="button" onClick={handleReset}
                    className="px-5 py-2 rounded-lg border border-red-500/30 text-red-400
                               hover:bg-red-950/20 font-mono text-[9px] tracking-widest uppercase
                               transition-all duration-200 cursor-pointer">
              RETRY_TRANSMISSION
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <TerminalInput
        id={nameId} label="// OPERATOR_DESIGNATION"
        placeholder="ENTER_YOUR_NAME..."
        value={fields.name} onChange={handleChange('name')} error={errors.name}
      />
      <TerminalInput
        id={emailId} label="// RETURN_ADDRESS"
        placeholder="YOUR_EMAIL@DOMAIN.COM" type="email"
        value={fields.email} onChange={handleChange('email')} error={errors.email}
      />
      <TerminalInput
        id={messageId} label="// MESSAGE_PAYLOAD"
        placeholder="ENTER_TRANSMISSION_CONTENT..." textarea
        value={fields.message} onChange={handleChange('message')} error={errors.message}
      />

      {/* Character counter */}
      <div className="flex justify-end">
        <span className={`font-mono text-[8px] tracking-widest ${
          fields.message.length > 500 ? 'text-amber-400' : 'text-slate-600'}`}>
          {fields.message.length}_CHARS
        </span>
      </div>

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={status !== 'sending' ? { scale: 1.02, boxShadow: '0 0 28px rgba(34,211,238,0.28)' } : {}}
        whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
        className={`relative w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl
                    border font-mono text-sm tracking-widest uppercase font-bold
                    transition-all duration-300 overflow-hidden cursor-pointer
                    ${status === 'sending'
                      ? 'border-cyan-500/30 text-cyan-400/60 bg-cyan-950/10 cursor-not-allowed'
                      : 'border-cyan-500/40 text-cyan-300 bg-cyan-950/15 hover:bg-cyan-950/28 hover:border-cyan-400/65'}`}
      >
        {/* Pulse ring on idle */}
        {status === 'idle' && (
          <span className="absolute inset-0 rounded-xl bg-cyan-400/5 animate-pulse pointer-events-none" />
        )}
        {/* Sweep line on hover */}
        <span className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

        {status === 'sending' ? (
          <>
            <Loader size={16} className="animate-spin" />
            TRANSMITTING...
          </>
        ) : (
          <>
            <Send size={16} />
            [ INITIATE_TRANSMISSION ]
          </>
        )}
      </motion.button>

      {/* Transmission log line */}
      <div className="flex items-center gap-2 font-mono text-[8px] text-slate-600 tracking-widest uppercase select-none">
        <span className={`w-1.5 h-1.5 rounded-full ${
          status === 'sending' ? 'bg-amber-400 animate-pulse' :
          status === 'success' ? 'bg-green-400' :
          status === 'error'   ? 'bg-red-400' :
          'bg-slate-600'}`} />
        {status === 'sending' ? 'UPLINK_ACTIVE: ROUTING_PACKET...' :
         status === 'success' ? 'TRANSMISSION_CONFIRMED // EMAIL_DELIVERED' :
         status === 'error'   ? 'ERROR: UPLINK_FAILED — RETRY OR USE DIRECT EMAIL' :
         'COMMS_LINK: STANDBY'}
      </div>
    </form>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════
const sectionVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.14 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function Contact() {
  const { copied, copy } = useCopy()

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 px-6 lg:px-16 overflow-hidden border-t border-white/[0.04]"
      style={{ background: 'transparent' }}
    >
      {/* Subtle section veil */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'linear-gradient(180deg, rgba(3,0,20,0.72) 0%, rgba(3,0,22,0.68) 50%, rgba(2,0,16,0.75) 100%)' }}
        aria-hidden
      />

      {/* Ambient nebula glow accents */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[350px] rounded-full pointer-events-none z-0"
           style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full pointer-events-none z-0"
           style={{ background: 'radial-gradient(ellipse, rgba(34,211,238,0.04) 0%, transparent 70%)' }} />

      {/* Custom keyframes */}
      <style>{`
        @keyframes comm-blink {
          0%, 49%  { opacity: 1; }
          50%, 100%{ opacity: 0; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-14 md:mb-18"
        >
          <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-400 tracking-[0.4em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            SUB-SPACE_COMMS // 05
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight font-sans leading-none">
            Contact{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">
              Terminal
            </span>
          </h2>
          <p className="mt-4 font-mono text-[11px] text-slate-500 tracking-widest max-w-lg">
            COMMS_RELAY ACTIVE // CONFIGURE PAYLOAD &amp; INITIATE UPLINK — RESPONSE_ETA: &lt;48H
          </p>
        </motion.div>

        {/* ── Split grid ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
        >
          {/* ════ LEFT — Telemetry Hub ════ */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-6">

            {/* Station header card */}
            <div className="relative rounded-2xl border border-indigo-500/15 bg-slate-950/20 backdrop-blur-md p-5 overflow-hidden">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/40" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/40" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400/40" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/40" />

              {/* Scanline tint inside */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] rounded-2xl"
                   style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.5) 2px, rgba(34,211,238,0.5) 3px)' }} />

              <div className="relative z-10 flex items-center justify-between border-b border-white/[0.05] pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <Radio size={16} className="text-cyan-400 animate-pulse" />
                  <div>
                    <div className="font-mono text-[9px] text-cyan-400/70 tracking-widest uppercase">TELEMETRY_HUB</div>
                    <div className="font-mono text-[10px] text-slate-300 tracking-wide">STATION_ALPHA</div>
                  </div>
                </div>
                {/* Blinking status */}
                <div className="flex items-center gap-1.5 font-mono text-[8px] tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"
                        style={{ animation: 'comm-blink 1.4s step-end infinite' }} />
                  <span className="text-green-400/80">COMMS_LINK: STANDBY</span>
                </div>
              </div>

              {/* Coordinates row */}
              <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[9px] text-slate-600 tracking-wider mb-5 border border-dashed border-indigo-500/15 rounded-lg p-3 bg-slate-950/30 backdrop-blur-sm">
                <div><span className="text-slate-700">RA:</span> <span className="text-indigo-400/70">06h 45m</span></div>
                <div><span className="text-slate-700">DEC:</span> <span className="text-indigo-400/70">+16° 43'</span></div>
                <div><span className="text-slate-700">FREQ:</span> <span className="text-cyan-400/70">432 MHz</span></div>
                <div><span className="text-slate-700">NODE:</span> <span className="text-cyan-400/70">UOK_ALPHA</span></div>
              </div>

              {/* Contact nodes */}
              <div className="relative z-10 flex flex-col gap-3">
                {CONTACT_NODES.map(node => (
                  <ContactNode key={node.id} node={node} copied={copied} onCopy={copy} />
                ))}
              </div>
            </div>

            {/* Social vector links */}
            <div className="flex flex-col gap-3">
              <div className="font-mono text-[9px] text-slate-600 tracking-[0.3em] uppercase">
                NETWORK_ANCHORS:
              </div>
              <div className="flex flex-col gap-2.5">
                {SOCIAL_LINKS.map(s => {
                  const Icon = s.icon
                  return (
                    <motion.a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className={`group flex items-center gap-4 p-4 rounded-xl border border-white/[0.07]
                                  bg-slate-950/40 backdrop-blur-sm text-slate-400 transition-all duration-250
                                  ${s.color}`}
                    >
                      <div className="p-2 rounded-lg border border-white/[0.06] bg-slate-900/60 group-hover:border-white/20 transition-colors">
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-[8px] tracking-[0.25em] text-slate-600 uppercase mb-0.5">{s.label}</div>
                        <div className="text-sm font-medium truncate">{s.handle}</div>
                      </div>
                      <Zap size={12} className="opacity-0 group-hover:opacity-60 transition-opacity duration-200" />
                    </motion.a>
                  )
                })}
              </div>
            </div>

          </motion.div>

          {/* ════ RIGHT — Transmission Terminal ════ */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <div className="relative rounded-2xl border border-indigo-500/15 bg-slate-950/20 backdrop-blur-md p-6 md:p-8 overflow-hidden">

              {/* Corner brackets — larger, indigo */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-indigo-400/35" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-indigo-400/35" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-indigo-400/35" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-indigo-400/35" />

              {/* Subtle inner scanline */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.025] rounded-2xl"
                   style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(99,102,241,0.6) 3px, rgba(99,102,241,0.6) 4px)' }} />

              {/* Terminal header */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/[0.05] pb-5 mb-7">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[9px] text-slate-500 tracking-widest">
                    <Terminal size={10} className="text-indigo-400/70" />
                    TRANSMISSION_TERMINAL v3.0
                  </div>
                </div>
                {/* Live freq bar */}
                <div className="hidden sm:flex items-center gap-0.5 h-4">
                  {[3,5,8,5,7,4,6,3,7,5,8,3].map((h, i) => (
                    <div key={i}
                         className="w-0.5 bg-cyan-400/50 rounded-full"
                         style={{ height: `${h * 4}%`, minHeight: 2, animation: `pulse ${0.8 + i * 0.12}s ease-in-out infinite alternate` }} />
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="relative z-10">
                <TransmissionForm />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Bottom HUD bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-5 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-5 font-mono text-[9px] text-slate-600 tracking-widest uppercase">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-cyan-500/55 animate-pulse" />
              UPLINK: ACTIVE
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-indigo-500/55 animate-pulse" />
              ENCRYPTION: AES_256
            </span>
          </div>
          <span className="font-mono text-[9px] text-slate-600 tracking-widest">
            © 2026 THULANI MAGEDARA // ALL SYSTEMS NOMINAL
          </span>
        </motion.div>
      </div>
    </section>
  )
}
