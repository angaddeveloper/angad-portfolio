import Magnet from './Magnet';
import { motion } from 'motion/react';

interface NavbarProps {
  onNavClick: (section: string) => void;
}

export default function Navbar({ onNavClick }: NavbarProps) {
  const links = ['About', 'Skills', 'Projects'];

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
      className="w-full fixed top-0 left-0 right-0 z-30 px-4 py-3 md:px-12 md:py-4 flex justify-between items-center bg-[#050010]/85 backdrop-blur-md border-b border-purple-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
    >
      {/* Brand Logo */}
      <a 
        href="#hero" 
        onClick={(e) => {
          e.preventDefault();
          onNavClick('hero');
        }} 
        className="flex items-center gap-1 hover:opacity-90 transition-opacity shrink-0"
      >
        <span className="text-lg md:text-2xl font-black hero-heading tracking-widest text-white">ANGAD</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
      </a>

      {/* Navigation menu - fully responsive across all screens */}
      <nav className="flex items-center gap-1 min-[375px]:gap-2 sm:gap-3 md:gap-5 select-none shrink-0">
        
        {/* Responsive, lightweight anchor links visible on both mobile & desktop */}
        <div className="flex items-center gap-0.5 min-[370px]:gap-1 sm:gap-1.5 md:gap-3">
          {links.map((link) => (
            <Magnet key={link} padding={40} strength={1.5}>
              <button
                onClick={() => onNavClick(link.toLowerCase())}
                className="text-[9px] min-[360px]:text-[10px] md:text-xs font-semibold text-[#D7E2EA]/85 hover:text-white hover:opacity-100 transition-all duration-200 uppercase tracking-widest px-1.5 py-1 rounded-lg hover:bg-white/[0.02]"
              >
                {link}
              </button>
            </Magnet>
          ))}

          {/* Separator Line */}
          <div className="w-px h-3.5 bg-purple-500/25 mx-1 sm:mx-1.5 md:mx-2" />
        </div>

        {/* Highlighted high-intensity cyber-glow CTA Contact Button */}
        <Magnet padding={60} strength={3}>
          <button
            onClick={() => onNavClick('contact')}
            className="relative font-extrabold uppercase text-[9px] min-[360px]:text-[10px] md:text-xs tracking-widest px-3 sm:px-4 py-1.5 rounded-full text-white group/btn transition-all duration-300 flex items-center justify-center cursor-pointer overflow-visible"
          >
            {/* Pulsing neon status base glow layer - stays perfectly separated and stands out */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#6366F1] blur-[8px] opacity-80 group-hover/btn:opacity-100 group-hover/btn:blur-[12px] transition-all duration-300" />
            
            {/* Cyber boundary ring */}
            <span className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 z-10 pointer-events-none" />

            {/* Dark glass internal mask */}
            <span className="absolute inset-[1px] bg-[#050010] rounded-full z-0 group-hover/btn:bg-gradient-to-r group-hover/btn:from-[#8B5CF6]/90 group-hover/btn:to-[#6366F1]/90 transition-all duration-300" />
            
            <span className="relative z-20 flex items-center gap-1.5 py-[1px]">
              {/* Pulsing neon active indicators */}
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-85" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400 shadow-[0_0_8px_#34D399]" />
              </span>
              <span className="text-[#E9D5FF] group-hover/btn:text-white transition-colors tracking-widest font-bold">
                Contact
              </span>
            </span>
          </button>
        </Magnet>
      </nav>
    </motion.header>
  );
}
