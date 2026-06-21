import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Mail, Github, Linkedin, Twitter, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const [copied, setCopied] = useState(false);
  const emailVal = "angaddeveloper@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailVal);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Could not copy:", err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-purple-500/10 z-20 bg-[#070114]/95 backdrop-blur-xl overflow-hidden py-12 md:py-16">
      {/* Background Matrix/Accent Lights */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start pb-12 border-b border-purple-500/10">
          
          {/* Col 1: Brand Wordmark, Availability Status & Narrative */}
          <div className="md:col-span-5 space-y-6 text-left">
            <div className="flex flex-col gap-2">
              <div href="#" className="flex items-center gap-1.5 cursor-pointer max-w-fit" onClick={scrollToTop}>
                <span className="text-2xl md:text-3xl font-black hero-heading tracking-widest text-white">ANGAD</span>
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              </div>
              <p className="text-[#D7E2EA]/60 text-sm font-light leading-relaxed max-w-sm mt-2">
                Engineering immersive web environments, fast modular setups, and user interfaces that resonate with digital aesthetics.
              </p>
            </div>

            {/* Availability Uplink Indicators */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/5 border border-purple-400/10 select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-[10px] text-emerald-300 font-mono tracking-widest uppercase font-semibold">
                Client Uplink Stable • Open for work
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Map (Client Convenience) */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#8B5CF6] font-semibold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> Map Location
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onNavClick('home')} 
                  className="text-[#D7E2EA]/70 hover:text-white transition-colors flex items-center gap-1 group font-light"
                >
                  <span className="w-1.5 h-[1.5px] bg-[#8B5CF6] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  [00] Launchpad
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick('about')} 
                  className="text-[#D7E2EA]/70 hover:text-white transition-colors flex items-center gap-1 group font-light"
                >
                  <span className="w-1.5 h-[1.5px] bg-[#8B5CF6] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  [01] Identity
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick('skills')} 
                  className="text-[#D7E2EA]/70 hover:text-white transition-colors flex items-center gap-1 group font-light"
                >
                  <span className="w-1.5 h-[1.5px] bg-[#8B5CF6] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  [02] Tech Stack
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick('projects')} 
                  className="text-[#D7E2EA]/70 hover:text-white transition-colors flex items-center gap-1 group font-light"
                >
                  <span className="w-1.5 h-[1.5px] bg-[#8B5CF6] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  [03] Showcase
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect / Quick Copy (Client Focus) */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#8B5CF6] font-semibold">
              Instant Connection
            </h4>
            
            <p className="text-xs font-light text-[#D7E2EA]/50 leading-relaxed max-w-sm">
              Copy developer coordinates with a single click to bypass online templates and establish communication.
            </p>

            {/* Quick interactive Copy Card */}
            <div className="relative">
              {/* Micro-success toast notification */}
              {copied && (
                <motion.div 
                  initial={{ opacity: 0, y: 12, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-emerald-500/90 text-[10px] font-mono tracking-widest uppercase text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center gap-1.5 backdrop-blur-md z-35"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>DISPATCH COPIED</span>
                </motion.div>
              )}

              <div 
                onClick={handleCopyEmail}
                className="group p-4 bg-purple-950/15 border border-purple-500/10 hover:border-purple-500/35 hover:bg-[#8B5CF6]/5 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.03)] hover:shadow-[0_0_25px_rgba(139,92,246,0.14)] active:scale-[0.98] overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#D7E2EA]/40">Primary Email</span>
                    <span className="text-xs font-medium text-[#D7E2EA]/90 group-hover:text-white transition-colors">{emailVal}</span>
                  </div>
                </div>
                <div className="text-purple-400 group-hover:text-white transition-colors mr-1">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#C9A8FF]/60 group-hover:text-white" />}
                </div>
              </div>
            </div>

            {/* Quick signal channels */}
            <div className="flex items-center gap-3 pt-2">
              <motion.a 
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                href="https://github.com/angadsingh6050" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/70 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.45)] transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                href="https://www.linkedin.com/in/angad-singh-9a7827417" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/70 hover:text-white hover:border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.45)] transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/70 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.45)] transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Panel with scrolling action */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-10 gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/35">
            <span>© {new Date().getFullYear()} ANGAD</span>
            <span className="hidden sm:inline text-purple-500/30">•</span>
            <span>ALL RIGHTS SECURED</span>
            <span className="hidden sm:inline text-purple-500/30">•</span>
            <span>DESIGN SPEC v1.2</span>
          </div>

          {/* Magnetic scroll-to-top button */}
          <motion.button
            whileHover={{ y: -4, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 220, damping: 15 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 group px-4 py-2.5 rounded-full bg-white/5 border border-white/5 text-xs text-white/70 hover:text-white hover:border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/10 font-mono uppercase tracking-widest transition-all duration-300"
          >
            Terminal Return
            <ArrowUp className="w-3.5 h-3.5 text-purple-400 group-hover:translate-y-[-2px] transition-transform duration-300" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
