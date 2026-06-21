import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { Code, Globe, Terminal, Sparkles } from 'lucide-react';
import FadeIn from './FadeIn';

const ABOUT_COPY = "I build modern websites, interactive interfaces, and premium digital experiences that help brands stand out online. My focus is creating visually impressive, fast, and user-friendly products that combine creativity with performance.";

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  key?: any;
}

function Character({ char, progress, range }: CharacterProps) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }} className="relative">{char}</motion.span>;
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for character reveal
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start 0.8', 'end 0.25'],
  });

  const chars = ABOUT_COPY.split('');

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-16 md:py-24 relative flex items-center justify-center overflow-hidden bg-[#0A0118]"
    >
      <div className="absolute top-[10%] left-0 w-80 h-80 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Structural Layout Container */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        {/* Visual subtitle mark */}
        <FadeIn delay={0.1}>
          <div className="flex items-center gap-2 mb-4 bg-purple-500/10 px-4 py-1 rounded-full border border-purple-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
            <span className="text-[10px] md:text-xs tracking-[0.25em] font-semibold text-[#C9A8FF] uppercase">
              ABOUT INTRO
            </span>
          </div>
        </FadeIn>

        {/* Outer Box containing text and corner decorations */}
        <div className="w-full relative mt-4 p-8 md:p-14 rounded-[32px] bg-purple-500/[0.02] border border-purple-500/10 backdrop-blur-md">
          
          {/* Accent 1: float code-bracket glyph (top-left) */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 0.8, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.1 }}
            className="absolute top-[-15px] left-[-15px] md:top-[-20px] md:left-[-20px] p-3 rounded-2xl glass-card border border-purple-500/30"
          >
            <Code className="w-5 h-5 text-purple-300" />
          </motion.div>

          {/* Accent 2: glowing orbit ring (top-right) */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 0.8, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.15 }}
            className="absolute top-[-15px] right-[-15px] md:top-[-20px] md:right-[-20px] p-3 rounded-2xl glass-card border border-blue-500/30"
          >
            <Globe className="w-5 h-5 text-blue-300 animate-spin" style={{ animationDuration: '15s' }} />
          </motion.div>

          {/* Accent 3: holographic UI panel fragment (bottom-left) */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 0.8, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.2 }}
            className="absolute bottom-[-20px] left-[-15px] md:bottom-[-25px] md:left-[-20px] p-3 rounded-2xl glass-card border border-purple-500/30 w-32 flex flex-col gap-1.5"
          >
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-purple-300" />
              <span className="text-[8px] text-stone-400 font-mono tracking-widest uppercase">CORE MODE</span>
            </div>
            <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '75%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-purple-400" 
              />
            </div>
          </motion.div>

          {/* Accent 4: particle cluster (bottom-right) */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 0.8, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.25 }}
            className="absolute bottom-[-15px] right-[-15px] md:bottom-[-20px] md:right-[-20px] p-3 rounded-2xl glass-card border border-cyan-500/30"
          >
            <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
          </motion.div>

          {/* Scroll Character Reveal Paragraph */}
          <div ref={textRef} className="text-center md:px-10 py-6 max-w-4xl mx-auto">
            <h2 className="text-[#D7E2EA] font-medium text-lg min-[360px]:text-xl md:text-3xl leading-[1.65] md:leading-relaxed tracking-wider select-none">
              {chars.map((char, index) => {
                const start = index / chars.length;
                const end = (index + 1) / chars.length;
                return (
                  <Character
                    key={index}
                    char={char}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </h2>
          </div>

        </div>

      </div>
    </section>
  );
}
