import { motion } from 'motion/react';
import { Mail, ArrowUpRight } from 'lucide-react';

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  href?: string;
}

export default function ContactButton({ onClick, className = '', href }: ContactButtonProps) {
  const content = (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`relative px-8 py-4.5 rounded-full font-bold text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white overflow-hidden group transition-all duration-300 shadow-2xl cursor-pointer ${className}`}
    >
      {/* Dynamic Animated border gradient ring */}
      <span className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Cybernetic backgrounds */}
      <span className="absolute inset-[1.5px] bg-[#090117] rounded-full -z-10" />
      
      {/* High-intensity backend glow backplane */}
      <span className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 opacity-20 blur-md rounded-full group-hover:opacity-85 group-hover:blur-xl transition-all duration-300 -z-20" />
      
      {/* Moving interior solid gradient backer */}
      <span className="absolute inset-0 bg-gradient-to-r from-purple-600/80 via-indigo-600/80 to-blue-500/80 opacity-[0.12] group-hover:opacity-[0.85] transition-all duration-500 -z-10" />
      
      {/* Moving glossy sweep highlight */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-sweep duration-1000 -z-10" />

      {/* Button content layouts */}
      <span className="relative z-10 flex items-center justify-center gap-2 select-none">
        <Mail className="w-3.5 h-3.5 text-purple-300 group-hover:text-white group-hover:rotate-[12deg] transition-all duration-300" />
        <span>
          Establish Uplink
        </span>
        {/* Connection status active dot */}
        <span className="relative flex h-1.5 w-1.5 ml-0.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400 shadow-[0_0_8px_#34D399]" />
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-blue-300 group-hover:text-white translate-x-0 translate-y-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ml-1" />
      </span>

      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-150%) skewX(-15deg); }
          50%, 100% { transform: translateX(150%) skewX(-15deg); }
        }
        .group-hover\\:animate-sweep {
          animation: sweep 2.2s ease-in-out infinite;
        }
      `}</style>
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block relative">
        {content}
      </a>
    );
  }

  return content;
}

