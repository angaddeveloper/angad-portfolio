import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Monitor, Paintbrush, Activity, Percent, Sparkles, Terminal } from 'lucide-react';
import CharacterPortrait from './CharacterPortrait';
import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import Magnet from './Magnet';

// Ultra-smooth native React CountUp element for luxury numerical stats
function Counter({ value, suffix = '', duration = 1.6 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalSteps = 45;
    const stepTime = (duration * 1000) / totalSteps;
    const increment = Math.ceil(end / totalSteps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span className="font-mono font-black">{count}{suffix}</span>;
}

export default function HeroSection({ onContactClick, onNavClick }: { onContactClick: () => void; onNavClick?: (section: string) => void }) {
  const roleBadges = [
    'Frontend Developer',
    'React Developer',
    'Modern Web Designer',
    'Firebase Developer',
  ];

  const statCards = [
    { 
      metric: <span className="font-mono text-xs tracking-wider text-purple-300">STORY</span>, 
      label: 'About Intro', 
      desc: 'Background & Creative Philosophy', 
      icon: Sparkles,
      accent: 'rgba(168, 85, 247, 0.4)',
      sectionId: 'about'
    },
    { 
      metric: <Counter value={15} suffix="+" />, 
      label: 'Core Skills', 
      desc: 'View Technical Capabilities', 
      icon: Layers,
      accent: 'rgba(59, 130, 246, 0.4)',
      sectionId: 'skills'
    },
    { 
      metric: <Counter value={50} suffix="+" />, 
      label: 'Selected Projects', 
      desc: 'High-End Curated Builds', 
      icon: Percent,
      accent: 'rgba(236, 72, 153, 0.4)',
      sectionId: 'projects'
    },
    { 
      metric: <Counter value={99} suffix="%" />, 
      label: 'Performance Rate', 
      desc: 'Ultra Fast Page Load speed', 
      icon: Monitor, 
      accent: 'rgba(16, 185, 129, 0.4)',
      sectionId: 'hero'
    },
    { 
      metric: <span className="font-mono font-black">3D</span>, 
      label: 'Immersive Shaders', 
      desc: 'Interactive Gravity Fields', 
      icon: Activity,
      accent: 'rgba(245, 158, 11, 0.4)',
      sectionId: 'hero'
    },
  ];

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 md:pt-28"
    >
      {/* Background radial spotlights specific to hero depth */}
      <div className="absolute top-[20%] left-[12%] w-96 h-96 bg-[#7C3AED]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-[#2563EB]/15 rounded-full blur-[150px] pointer-events-none" />

      {/* 3-Column Grid Container */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-4 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Staggered reveal headings & taglines with spatial alignment */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-center text-left order-2 md:order-1 relative z-20">
          
          <FadeIn delay={0.1} duration={0.8} y={35} type="tween">


            {/* Awwwards headings with gradient split & immersive glow shadows */}
            <div className="flex flex-col select-none">
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="hero-heading leading-none font-black text-[clamp(2.4rem,5.5vw,5rem)] tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-[#D7E2EA] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                >
                  ANGAD
                </motion.h1>
              </div>

              <div className="overflow-hidden py-1">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="hero-heading leading-none font-black text-[clamp(2.4rem,5.5vw,5rem)] tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400"
                  style={{ textShadow: '0 0 35px rgba(139, 92, 246, 0.25)' }}
                >
                  FRONTEND
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="hero-heading leading-none font-black text-[clamp(2.4rem,5.5vw,5rem)] tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-white to-indigo-100/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                >
                  CREATOR
                </motion.h1>
              </div>
            </div>

            {/* Verbatim narrative tagline */}
            <div className="mt-6 space-y-2 select-all">
              <span className="text-xs font-bold tracking-[0.2em] text-[#C9A8FF] uppercase block font-mono">
                Frontend Developer & Modern Web Creator
              </span>
              <p className="text-[#D7E2EA]/85 font-light text-sm md:text-base leading-relaxed max-w-sm">
                I build responsive websites, modern web applications, educational platforms, and interactive digital experiences.
              </p>
            </div>

            {/* Hover-lighting badge collection */}
            <div className="flex flex-wrap gap-2.5 mt-7 max-w-md">
              {roleBadges.map((badge, idx) => (
                <motion.span
                  whileHover={{ y: -2, scale: 1.03 }}
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-mono uppercase tracking-wider bg-white/[0.02] border border-white/5 hover:border-purple-500/30 text-[#D7E2EA]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] hover:bg-[#8B5CF6]/5 hover:text-white transition-all duration-300 pointer-events-auto"
                >
                  {badge}
                </motion.span>
              ))}
            </div>

            {/* Dynamic premium visual interactive call-to-action */}
            <div className="mt-9">
              <Magnet padding={100} strength={3.5}>
                <ContactButton onClick={onContactClick} />
              </Magnet>
            </div>
          </FadeIn>
        </div>

        {/* Center Column: Portrait with 3D tilts & orbits - maximized for visual focus */}
        <div className="md:col-span-4 lg:col-span-5 flex justify-center items-center order-1 md:order-2 py-4">
          <FadeIn delay={0.35} duration={0.9} y={40} type="tween">
            <CharacterPortrait />
          </FadeIn>
        </div>

        {/* Right Column: 5 floating, bobbing, frosted glass cards with sweeps & counts */}
        <div className="md:col-span-3 flex flex-col gap-4 justify-center order-3 relative z-20">
          <FadeIn delay={0.5} duration={0.9} y={35} type="tween" className="space-y-4">
            
            {/* Column subheader visual */}
            <div className="flex items-center gap-2 pl-1 mb-1 select-none">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/55">Technical Metrics</span>
            </div>

            {statCards.map((stat, idx) => {
              const Icon = stat.icon;
              // Specific aesthetic rotation templates matching initial designs
              const rotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1'];
              const rotClass = rotations[idx % rotations.length];
              const isInteractive = stat.sectionId && stat.sectionId !== 'hero';
              
              return (
                <motion.div
                  key={idx}
                  onClick={() => {
                    if (isInteractive && onNavClick) {
                      onNavClick(stat.sectionId);
                    }
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4 + idx * 0.45,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: idx * 0.25,
                  }}
                  whileHover={{ 
                    scale: 1.04, 
                    y: -4,
                    borderColor: isInteractive ? 'rgba(139, 92, 246, 0.65)' : 'rgba(168, 85, 247, 0.35)',
                    boxShadow: `0 8px 30px rgba(0, 0, 0, 0.4), 0 0 15px ${stat.accent}`
                  }}
                  className={`relative p-4 rounded-xl flex items-center gap-4 w-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-md transform ${rotClass} hover:rotate-0 transition-all duration-300 overflow-hidden group shadow-lg ${isInteractive ? 'cursor-pointer hover:bg-purple-500/5' : 'cursor-default'}`}
                >
                  {/* Luxury skew light sweep animation layer */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-lightsweep pointer-events-none bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-[-15deg]" />

                  {/* Left Tech Icon container with accent glows */}
                  <div className="w-11 h-11 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#C9A8FF] shrink-0 group-hover:bg-purple-500/10 group-hover:text-white group-hover:border-purple-400/30 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Stat display values */}
                  <div className="text-left select-none relative z-10 w-full">
                    <div className="flex items-baseline gap-1">
                      <span className="text-base md:text-lg font-black text-white tracking-tight group-hover:text-purple-300 transition-colors">
                        {stat.metric}
                      </span>
                    </div>
                    <h4 className="font-bold text-white/[0.85] text-xs leading-tight mt-0.5 flex items-center justify-between">
                      <span>{stat.label}</span>
                      {isInteractive && (
                        <span className="text-[8px] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0 text-purple-300 font-mono leading-none">
                          GO TO &rarr;
                        </span>
                      )}
                    </h4>
                    <p className="text-[#D7E2EA]/50 text-[9px] md:text-[10px] tracking-wide font-light">
                      {stat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </FadeIn>
        </div>

      </div>

      {/* Repeating light sweep keyframes */}
      <style>{`
        @keyframes lightsweep {
          0% { transform: translateX(-150%) skewX(-15deg); }
          50%, 100% { transform: translateX(150%) skewX(-15deg); }
        }
        .group-hover\\:animate-lightsweep {
          animation: lightsweep 2.2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

