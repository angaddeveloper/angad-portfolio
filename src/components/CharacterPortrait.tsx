import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

// Set this to a path like '/assets/mascot.png' if you want to display an uploaded transparent mascot.
// Keep it empty '' to use the gorgeous interactive neon cyber-placeholder.
const CHARACTER_IMAGE = '';

export default function CharacterPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Image loading state indicators
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Motion values for ultra-smooth 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Dynamic parallax translation values for true depth displacement
  const translateX = useSpring(useMotionValue(0), { damping: 30, stiffness: 100 });
  const translateY = useSpring(useMotionValue(0), { damping: 30, stiffness: 100 });

  const rotateX = useSpring(mouseY, { damping: 25, stiffness: 120 });
  const rotateY = useSpring(mouseX, { damping: 25, stiffness: 120 });

  // Glitch interactions state
  const [isGlitching, setIsGlitching] = useState(false);
  const clickTimesRef = useRef<number[]>([]);

  const handlePortraitClick = () => {
    const now = Date.now();
    // Keep clicks only from the last 1500ms
    clickTimesRef.current = clickTimesRef.current.filter((t) => now - t < 1500);
    clickTimesRef.current.push(now);

    if (clickTimesRef.current.length >= 4) {
      setIsGlitching(true);
      clickTimesRef.current = []; // Clear click history
      
      // Stop glitching after 1.2s
      setTimeout(() => {
        setIsGlitching(false);
      }, 1200);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isGlitching) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized coordinate from -0.5 to +0.5
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;

    // Scale to max 12deg tilt
    mouseX.set(x * 12);
    mouseY.set(-y * 12);

    // Subtle opposite parallax translation for deep 3D offset feeling (max 10px shift)
    translateX.set(x * 10);
    translateY.set(y * 10);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    translateX.set(0);
    translateY.set(0);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const activeImagePath = CHARACTER_IMAGE;
  const showMascot = !!CHARACTER_IMAGE && !imageError;

  return (
    <div className="relative w-full aspect-square max-w-[540px] mx-auto flex items-center justify-center p-6 select-none md:scale-105">
      {/* LAYER 1: Deep backplane ambient drop-shadow gradients (layered violet-blue glow) */}
      <div className="absolute w-[95%] h-[95%] rounded-full bg-gradient-to-tr from-purple-600/20 via-indigo-500/15 to-blue-500/5 blur-[90px] -z-15 animate-pulse duration-[6s]" />
      <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-bl from-blue-600/15 via-violet-600/20 to-transparent blur-[70px] -z-15" />

      {/* LAYER 2: Holographic Concentric Orbit Rings - Multi-tiered system centered behind */}
      {/* Outer Orbit 1: Dotted neon violet ring with orbiting node */}
      <div className="absolute w-[122%] h-[122%] pointer-events-none -z-10 animate-spin" style={{ animationDuration: '40s' }}>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.3" strokeDasharray="2 3" />
          <circle cx="50" cy="3" r="1.5" fill="#C9A8FF" className="shadow-[0_0_12px_#A855F7]" />
        </svg>
      </div>

      {/* Orbit 2: Solid blue tech circle with negative animation direction */}
      <div className="absolute w-[136%] h-[136%] pointer-events-none -z-10 animate-spin" style={{ animationDuration: '60s', animationDirection: 'reverse' }}>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(37, 99, 235, 0.2)" strokeWidth="0.4" strokeDasharray="18 10" />
          <circle cx="50" cy="3" r="1.2" fill="#60A5FA" className="shadow-[0_0_10px_#3B82F6]" />
        </svg>
      </div>

      {/* Orbit 3 (Inner detailed dial): Dual concentric tick borders */}
      <div className="absolute w-[110%] h-[110%] pointer-events-none -z-10 animate-spin" style={{ animationDuration: '28s' }}>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(168, 85, 247, 0.15)" strokeWidth="0.8" strokeDasharray="0.3 1.5" />
          <circle cx="50" cy="50" r="46.5" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.2" />
        </svg>
      </div>

      {/* LAYER 5: Crosshair Holographic Target Markers on coordinates (Top layer highlights) */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-purple-500/45 pointer-events-none -translate-x-2 -translate-y-2 z-30" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-purple-500/45 pointer-events-none translate-x-2 -translate-y-2 z-30" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-purple-500/45 pointer-events-none -translate-x-2 translate-y-2 z-30" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-purple-500/45 pointer-events-none translate-x-2 translate-y-2 z-30" />

      {/* MIXED LAYERING (Layer 2 & Layer 4): Floating starry dust particle array interleaved for depth */}
      {[...Array(12)].map((_, i) => {
        const top = [10, 22, 38, 82, 72, 17, 88, 48, 5, 95, 30, 78][i];
        const left = [18, 88, 92, 12, 85, 68, 30, 8, 50, 45, 96, 2][i];
        const delay = i * 0.4;
        const speed = 4 + (i % 4) * 2.5;
        const isBlue = i % 2 === 0;
        
        // Dynamic Depth interleaving: Even particles float FOREGROUND (Layer 4), Odd fly BACKGROUND (Layer 2)
        const particleZIndex = i % 2 === 0 ? 'z-20' : '-z-5';

        return (
          <motion.div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full pointer-events-none shadow-lg ${particleZIndex} ${
              isBlue ? 'bg-blue-400 shadow-blue-500/50' : 'bg-purple-400 shadow-purple-500/55'
            }`}
            style={{ top: `${top}%`, left: `${left}%` }}
            animate={{
              y: [0, -18, 0],
              x: [0, 10, 0],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              delay: delay,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* Interactive 3D Tilt Wrapper Container */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handlePortraitClick}
        style={{ rotateX, rotateY, x: translateX, y: translateY, transformStyle: 'preserve-3d' }}
        animate={isGlitching ? {
          x: [0, -14, 10, -18, 12, -6, 14, 0],
          y: [0, 9, -14, 6, -9, 5, 2, 0],
          skewX: [0, 24, -22, 16, -14, 0],
          skewY: [0, -8, 10, -4, 0],
          scale: [1, 1.12, 0.94, 1.06, 1],
          filter: [
            'hue-rotate(0deg) contrast(1) saturate(1)',
            'hue-rotate(90deg) contrast(1.8) saturate(2) brightness(1.1)',
            'hue-rotate(180deg) contrast(2.2) saturate(0.6) brightness(0.9)',
            'hue-rotate(270deg) contrast(1.5) saturate(1.8)',
            'hue-rotate(360deg) contrast(1) saturate(1)'
          ]
        } : {
          y: [0, -12, 0], // Floating oscillatory breathing displacement
          scale: [1, 1.025, 1], // Breathing core scale pulse
        }}
        transition={isGlitching ? {
          duration: 0.9,
          ease: "easeInOut"
        } : {
          y: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          },
          scale: {
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className={`relative w-full h-full flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-150 ${isGlitching ? 'z-50' : ''}`}
      >
        {showMascot ? (
          /* LAYER 3: Interactive 3D Mascot Character Render */
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Purple ambient glow layer behind character */}
            <div className="absolute w-[80%] h-[80%] rounded-full bg-purple-600/30 blur-[70px] pointer-events-none -z-10 mix-blend-screen animate-pulse duration-[8s]" />
            <div className="absolute w-[60%] h-[60%] rounded-full bg-cyan-600/20 blur-[50px] pointer-events-none -z-10 mix-blend-screen" />

            {/* Smooth Cinematic Entrance and Render Wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, filter: 'blur(12px)' }}
              animate={imageLoaded ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="w-full h-full flex items-center justify-center relative overflow-visible"
            >
              <img
                src={activeImagePath}
                alt="ANGAD 3D Mascot Banner"
                onLoad={() => setImageLoaded(true)}
                onError={handleImageError}
                referrerPolicy="no-referrer"
                /* 
                  Scale carefully:
                  - Mobile: fits nicely in view without horizontal scrolling/clipping
                  - Desktop: w-[122%] md:w-[124%] makes it 115-125% larger than default circular avatar
                  High-end cyber glow outline wraps dynamically around transparent shape body using drop-shadow
                */
                className="w-[110%] h-[110%] md:w-[122%] md:h-[122%] object-contain pointer-events-none select-none relative z-10 drop-shadow-[0_0_15px_rgba(139,92,246,0.4)] drop-shadow-[0_0_35px_rgba(6,182,212,0.3)] transition-transform duration-300 transform preserve-3d"
              />
            </motion.div>

            {/* Overlay Bloom Spotlight Highlight */}
            <div className="absolute inset-x-0 bottom-0 top-1/4 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_65%)] mix-blend-screen z-25" />
          </div>
        ) : (
          /* Stunning high-fidelity designer fallback when no mascot is uploaded yet */
          <div className={`w-[90%] h-[90%] rounded-full bg-gradient-to-b from-[#110526]/85 to-[#0b031c]/95 border-[1.5px] backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group shadow-[0_0_40px_rgba(139,92,246,0.18)] hover:shadow-[0_0_60px_rgba(139,92,246,0.45)] transition-all duration-500 ${
            isGlitching 
              ? 'border-red-500/80 bg-red-950/40 shadow-[0_0_60px_rgba(239,68,68,0.5)]' 
              : 'border-purple-500/35 hover:border-purple-400/60'
          }`}>
            
            {/* Ambient inner flow lines */}
            <div className="absolute inset-0 bg-radial-glow opacity-30 group-hover:opacity-45 transition-opacity pointer-events-none" />
            
            {/* Abstract core icon with neon pulse glow rings */}
            <div className="relative mb-6">
              <div className={`absolute inset-[-14px] blur-2xl opacity-25 rounded-full transition-colors duration-300 ${isGlitching ? 'bg-red-500' : 'bg-[#a855f7]'}`} />
              <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center relative transition-all duration-500 ${
                isGlitching 
                  ? 'border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' 
                  : 'border-purple-500/40 text-purple-300 shadow-[0_0_25px_rgba(139,92,246,0.2)] group-hover:border-purple-400 group-hover:shadow-[0_0_35px_rgba(168,85,247,0.4)]'
              }`}>
                {/* Double pulsing rings inside */}
                <div className="absolute inset-1 rounded-full border border-dashed border-purple-400/25 animate-spin duration-[20s]" />
                <span className="text-4xl font-extrabold hero-heading tracking-tighter select-none font-mono">
                  {isGlitching ? 'ERR' : 'A'}
                </span>
              </div>
            </div>

            {/* Typography elements */}
            <h3 className={`font-black text-2xl mb-1.5 tracking-wider uppercase transition-colors duration-300 font-sans ${isGlitching ? 'text-red-400' : 'text-white'}`}>
              {isGlitching ? 'OVERLOCK_GP' : 'ANGAD'}
            </h3>
            
            <p className="text-[#D7E2EA] text-[10px] sm:text-xs uppercase tracking-[0.25em] leading-relaxed font-light opacity-80 max-w-[200px] font-mono">
              {isGlitching ? 'UPLINK INTEGRITY CRITICAL' : 'Frontend Engineer & UI Architect'}
            </p>
            
            {/* Status dynamic pill wrapper */}
            <div className={`mt-5 flex gap-2 items-center justify-center px-4 py-1.5 rounded-full border transition-all duration-300 ${
              isGlitching 
                ? 'bg-red-500/20 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                : 'bg-gradient-to-r from-purple-950/40 to-[#0A0118]/80 border-purple-500/25 hover:border-purple-400/40 shadow-[0_0_12px_rgba(139,92,246,0.1)]'
            }`}>
              <span className={`w-2 h-2 rounded-full animate-ping ${isGlitching ? 'bg-red-500' : 'bg-emerald-400'}`} />
              <span className={`text-[9px] tracking-[0.2em] font-bold uppercase font-mono ${isGlitching ? 'text-red-400' : 'text-emerald-400'}`}>
                {isGlitching ? 'REBOOTING CORE...' : 'Active & Available'}
              </span>
            </div>
            
            {/* Futuristic horizontal aesthetic overlay coordinate lines */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent pointer-events-none" />
            <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/15 to-transparent pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent pointer-events-none" />

            {/* Cyber glitch overlays while active */}
            {isGlitching && (
              <>
                <div className="absolute top-6 left-0 w-full h-[1px] bg-red-400 opacity-70 animate-bounce" />
                <div className="absolute bottom-10 left-0 w-full h-[1.5px] bg-cyan-400 opacity-60" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85))] pointer-events-none" />
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

