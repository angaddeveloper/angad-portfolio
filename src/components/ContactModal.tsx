import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Check, AlertOctagon, RefreshCw, Mail, ShieldCheck, Clock, Linkedin, Github } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Track field focus for micro-glow lines
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus('sending');
    setErrorMsg('');

    // Fetch key from Vite environment
    const web3Key = (import.meta as any).env?.VITE_WEB3FORMS_KEY || "";

    if (web3Key && web3Key.trim() !== "") {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `Portfolio Uplink from ${form.name}`,
            name: form.name,
            email: form.email,
            message: form.message
          })
        });

        const result = await response.json();
        if (result.success) {
          setStatus('success');
          // Smooth auto-reset and close after rewarding feedback
          setTimeout(() => {
            setStatus('idle');
            setForm({ name: '', email: '', message: '' });
            onClose();
          }, 3500);
        } else {
          throw new Error(result.message || "Endpoint returned unscheduled response status.");
        }
      } catch (err: any) {
        console.error("Transmission interruption detected inside primary pipelines:", err);
        setErrorMsg(err?.message || "Direct API gateway timeout.");
        setStatus('error');
      }
    } else {
      // If environment token is missing, provide a robust UX asking user to configure or use Fallback mailto directly
      // Rather than silently failing, we display a beautiful choice in error state to let them choose
      setErrorMsg("VITE_WEB3FORMS_KEY is not declared in environment config.");
      setStatus('error');
    }
  };

  const triggerMailtoFallback = () => {
    const emailReceiver = "angaddeveloper@gmail.com";
    const subjectLine = `Portfolio Connection Pitch from ${form.name}`;
    const bodyContent = `Hi Angad,\n\nI reached out via your interactive portfolio website.\n\nSender Name: ${form.name}\nSender Email: ${form.email}\n\nSignal Payload:\n"${form.message}"\n\n---\nTransmission processed via fallback connection protocols.`;

    const mailtoDestination = `mailto:${emailReceiver}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyContent)}`;
    
    // Safely shift window location
    window.location.href = mailtoDestination;

    // Show instant success feedback so client flow remains uninterrupted
    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
      setForm({ name: '', email: '', message: '' });
      onClose();
    }, 3500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <style>{`
            @keyframes moving-background {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-shine-button {
              background-size: 200% auto;
              animation: moving-background 4s linear infinite;
            }
          `}</style>

          {/* Overlay mask with interactive smooth backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={status !== 'sending' ? onClose : undefined}
            className="absolute inset-0 bg-[#060110]/90 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 210 }}
            className="glass-card w-full max-w-lg p-6 md:p-9 rounded-[32px] border border-purple-500/20 bg-[#0C021D]/95 relative overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.25)] z-10"
          >
            {/* Top Close icon (hidden during transmission) */}
            {status !== 'sending' && (
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200 active:scale-90"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {status === 'success' ? (
              /* High-End Reward Success Panel */
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="flex flex-col items-center justify-center text-center py-10 gap-6"
              >
                <div className="relative">
                  {/* Glow core bursts */}
                  <div className="absolute inset-0 rounded-full bg-emerald-500/35 blur-xl animate-pulse" />
                  <motion.div 
                    initial={{ scale: 0.4 }}
                    animate={{ scale: [0.4, 1.15, 1] }}
                    transition={{ type: 'spring', damping: 15, stiffness: 180, delay: 0.1 }}
                    className="relative w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.2)]"
                  >
                    <Check className="w-8 h-8 stroke-[3]" />
                  </motion.div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-white font-black text-2xl uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-400">
                    SIGNAL DELIVERED
                  </h3>
                  <p className="text-[#D7E2EA]/80 text-sm max-w-sm leading-relaxed font-light px-4">
                    Your message has been successfully transmitted to <span className="font-semibold text-white">ANGAD</span>.
                    <br />
                    A response will typically arrive within 24 hours.
                  </p>
                </div>

                <div className="mt-2 flex flex-col items-center gap-1.5 font-mono text-[9px] text-purple-400 tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" />
                  <span>Terminal Resetting...</span>
                </div>
              </motion.div>

            ) : status === 'error' ? (
              /* Highly Polished Error Card with Custom Option buttons */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col text-left py-4 gap-5"
              >
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center text-rose-400 shrink-0">
                    <AlertOctagon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">
                      TRANSMISSION FAILED
                    </h4>
                    <p className="text-[#D7E2EA]/70 text-xs leading-relaxed font-light">
                      Unable to establish web connection. Please try again in a few moments, or trigger your local email client for direct dispatch.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mt-2 w-full">
                  <button
                    onClick={() => setStatus('idle')}
                    className="w-full py-3.5 px-4 rounded-xl border border-purple-500/30 hover:border-purple-400 bg-purple-500/10 hover:bg-purple-500/20 text-white font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer active:scale-[0.98]"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Try Web Transmission Again</span>
                  </button>

                  <button
                    onClick={triggerMailtoFallback}
                    className="w-full py-3.5 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-[#D7E2EA] font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer active:scale-[0.98]"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Direct Email Uplink Fallback</span>
                  </button>
                </div>

                <button
                  onClick={onClose}
                  className="mx-auto text-[10px] text-zinc-500 hover:text-zinc-300 uppercase tracking-widest font-mono underline cursor-pointer mt-2"
                >
                  Cancel Uplink
                </button>
              </motion.div>

            ) : (
              /* Premium Active Form Interface */
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                <div>
                  <h3 className="text-white font-black text-2xl uppercase tracking-wider flex items-center gap-2">
                    Uplink Terminal
                  </h3>
                  <p className="text-[#D7E2EA]/60 text-xs mt-1 font-light tracking-wide">
                    Establish a secure signals path to ANGAD's developer inbox.
                  </p>
                </div>

                {/* Symmetrical High-Trust Online Status Panel */}
                <div className="p-4 rounded-2xl border border-purple-500/15 bg-purple-500/5 backdrop-blur-md flex flex-col gap-2.5 text-xs select-none">
                  <div className="flex items-center gap-2 font-bold font-mono text-[#C9A8FF] uppercase tracking-wider">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span>Routing Status: ACCEPTING INQUIRIES</span>
                  </div>
                  <div className="space-y-1.5 text-[#D7E2EA]/75 font-light">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>Currently accepting freelance projects and collaborations.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>Typical response time: Within 24 hours.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>Secure form delivery enabled.</span>
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <div className="flex flex-col gap-4 mt-2">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5 relative">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] text-purple-300 font-mono uppercase tracking-widest font-bold">
                        Identification (Name)
                      </label>
                      {form.name.trim() !== '' && (
                        <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                          DETECTED
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`px-4 py-3 bg-[#0A0118]/50 border rounded-xl text-white text-sm focus:outline-none transition-all duration-300 placeholder-stone-500 font-sans hover:border-purple-500/45 hover:bg-[#0A0118]/70 ${
                        focusedField === 'name' 
                          ? 'border-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.3)] bg-[#0C021D]' 
                          : 'border-purple-500/20'
                      }`}
                      placeholder="Your Full Name"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5 relative">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] text-purple-300 font-mono uppercase tracking-widest font-bold">
                        Routing coordinates (Email)
                      </label>
                      {form.email.trim() !== '' && form.email.includes('@') && (
                        <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                          VALIDATED
                        </span>
                      )}
                    </div>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`px-4 py-3 bg-[#0A0118]/50 border rounded-xl text-white text-sm focus:outline-none transition-all duration-300 placeholder-stone-500 font-sans hover:border-purple-500/45 hover:bg-[#0A0118]/70 ${
                        focusedField === 'email' 
                          ? 'border-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.3)] bg-[#0C021D]' 
                          : 'border-purple-500/20'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1.5 relative">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] text-purple-300 font-mono uppercase tracking-widest font-bold">
                        Uplink Payload (Message)
                      </label>
                      {form.message.trim() !== '' && (
                        <span className="text-[9px] text-purple-300 font-mono">
                          {form.message.length} CHARS
                        </span>
                      )}
                    </div>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`px-4 py-3 bg-[#0A0118]/50 border rounded-xl text-white text-sm focus:outline-none transition-all duration-300 placeholder-stone-500 font-sans resize-none hover:border-purple-500/45 hover:bg-[#0A0118]/70 ${
                        focusedField === 'message' 
                          ? 'border-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.3)] bg-[#0C021D]' 
                          : 'border-purple-500/20'
                      }`}
                      placeholder="Tell me about your project, requirements, goals, timeline, and budget..."
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: status === 'sending' ? 1 : 1.015 }}
                  whileTap={{ scale: status === 'sending' ? 1 : 0.985 }}
                  type="submit"
                  disabled={status === 'sending'}
                  className={`px-6 py-4 rounded-xl text-white font-extrabold text-xs tracking-widest uppercase transition-all duration-400 flex items-center justify-center gap-2 mt-4 cursor-pointer w-full border border-purple-400/20 ${
                    status === 'sending' 
                      ? 'bg-purple-950/80 text-white/50 cursor-not-allowed shadow-[0_0_25px_rgba(139,92,246,0.15)]' 
                      : 'bg-gradient-to-r from-[#6D28D9] via-[#8B5CF6] to-[#DB2777] animate-shine-button hover:shadow-[0_0_30px_rgba(139,92,246,0.55)]'
                  }`}
                >
                  {status === 'sending' ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>TRANSMIT SIGNAL</span>
                    </>
                  )}
                </motion.button>

                {/* Secure External Uplinks Row */}
                <div className="flex items-center justify-center gap-4 pt-4 mt-2 border-t border-purple-500/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D7E2EA]/40">
                    Professional Networks:
                  </span>
                  
                  <motion.a
                    whileHover={{ scale: 1.05, y: -1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                    href="https://www.linkedin.com/in/angad-singh-9a7827417"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-500/5 hover:bg-[#8B5CF6]/10 border border-purple-500/15 hover:border-[#8B5CF6]/40 text-[#D7E2EA]/70 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.35)]"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold">LinkedIn</span>
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ scale: 1.05, y: -1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                    href="https://github.com/angadsingh6050"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/25 text-[#D7E2EA]/70 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                  >
                    <Github className="w-3.5 h-3.5 text-purple-300 shrink-0" />
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold">GitHub</span>
                  </motion.a>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
