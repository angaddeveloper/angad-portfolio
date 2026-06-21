import { useRef, useEffect } from 'react';

interface MarqueeItem {
  id: string;
  title: string;
  category: string;
  gradient: string;
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const row1Data: MarqueeItem[] = [
    { id: 'r1-1', title: 'Cosmic Portal Viewport', category: 'Creative WebGL', gradient: 'from-purple-900/50 via-[#7C3AED]/30 to-blue-900/40' },
    { id: 'r1-2', title: 'Neural Commerce Dashboard', category: 'Data Visuals', gradient: 'from-[#2563EB]/40 to-[#10B981]/15' },
    { id: 'r1-3', title: 'Quantum Token Space', category: 'Web3 Platform', gradient: 'from-pink-900/40 via-red-900/25 to-purple-900/30' },
    { id: 'r1-4', title: 'Holographic Audio Synth', category: 'Creative Audio', gradient: 'from-emerald-950 to-[#2563EB]/25' },
    { id: 'r1-5', title: 'Celestial Mesh orbit', category: 'Three.js Mesh', gradient: 'from-indigo-950 via-purple-900/30 to-pink-950' },
  ];

  const row2Data: MarqueeItem[] = [
    { id: 'r2-1', title: 'Hyperion Analytics', category: 'SaaS Suite', gradient: 'from-blue-950 to-indigo-900/45' },
    { id: 'r2-2', title: 'Exo-Skeletal Shell', category: 'HTML Canvas', gradient: 'from-rose-950 via-[#7C3AED]/20 to-stone-900/50' },
    { id: 'r2-3', title: 'Vesper Financial Terminal', category: 'TypeScript App', gradient: 'from-emerald-950 to-cyan-900/40' },
    { id: 'r2-4', title: 'Helix UI Blueprint', category: 'Component Engine', gradient: 'from-[#7C3AED]/35 to-[#2563EB]/40' },
    { id: 'r2-5', title: 'Aurora Particle Generator', category: 'Generative Art', gradient: 'from-indigo-900/30 via-pink-900/20 to-[#7C3AED]/40' },
  ];

  // Tripling the array elements to ensure seamless looped margins
  const row1Tripled = [...row1Data, ...row1Data, ...row1Data];
  const row2Tripled = [...row2Data, ...row2Data, ...row2Data];

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.offsetTop;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const innerHeight = window.innerHeight;

      // Unmodified Offset formula: (scrollY - sectionTop + innerHeight) * 0.3
      const originalOffset = (scrollY - sectionTop + innerHeight) * 0.3;

      if (row1Ref.current) {
        // Row 1 scrolls right: translate positively
        row1Ref.current.style.transform = `translate3d(${-250 + originalOffset}px, 0px, 0px)`;
      }
      if (row2Ref.current) {
        // Row 2 scrolls left: translate negatively
        row2Ref.current.style.transform = `translate3d(${120 - originalOffset}px, 0px, 0px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial load alignment

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-10 md:py-16 overflow-hidden relative w-full border-t border-b border-purple-500/10 bg-[#0A0118]/25"
    >
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#2563EB]/25 to-transparent" />

      {/* Rows Container */}
      <div className="flex flex-col gap-6 md:gap-8 w-full">
        
        {/* Row 1 scrolling right */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div 
            ref={row1Ref}
            className="flex gap-4 md:gap-6" 
            style={{ willChange: 'transform', transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)' }}
          >
            {row1Tripled.map((item, index) => (
              <div 
                key={`${item.id}-${index}`}
                className="w-[320px] h-[200px] md:w-[420px] md:h-[270px] shrink-0 rounded-2xl border border-purple-500/25 relative overflow-hidden flex flex-col justify-between p-6 bg-gradient-to-br transition-all duration-300 group hover:border-[#8B5CF6]/60 shadow-[0_0_15px_rgba(139,92,246,0.05)]"
                style={{ 
                  background: 'rgba(124, 58, 237, 0.03)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Background glowing gradients */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${item.gradient} opacity-40 group-hover:opacity-75 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0118] via-transparent to-transparent opacity-80" />

                {/* Grid Overlay inside card */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                {/* Top actions */}
                <div className="relative flex justify-between items-start z-10 w-full">
                  <span className="text-[10px] md:text-xs font-mono text-[#C9A8FF] tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-400/25 uppercase">
                    {item.category}
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                </div>

                {/* Bottom title */}
                <div className="relative text-left z-10 w-full">
                  <h3 className="text-white font-bold text-base md:text-lg tracking-wide uppercase">
                    {item.title}
                  </h3>
                  <div className="h-[2px] w-8 bg-gradient-to-r from-[#8B5CF6] to-cyan-400 mt-2.5 group-hover:w-20 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 scrolling left */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div 
            ref={row2Ref}
            className="flex gap-4 md:gap-6" 
            style={{ willChange: 'transform', transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)' }}
          >
            {row2Tripled.map((item, index) => (
              <div 
                key={`${item.id}-${index}`}
                className="w-[320px] h-[200px] md:w-[420px] md:h-[270px] shrink-0 rounded-2xl border border-[#2563EB]/25 relative overflow-hidden flex flex-col justify-between p-6 bg-gradient-to-br transition-all duration-300 group hover:border-[#2563EB]/60 shadow-[0_0_15px_rgba(37,99,235,0.05)]"
                style={{ 
                  background: 'rgba(37, 99, 235, 0.03)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Background glowing gradients */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${item.gradient} opacity-40 group-hover:opacity-75 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0118] via-transparent to-transparent opacity-80" />

                {/* Grid Overlay inside card */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                {/* Top actions */}
                <div className="relative flex justify-between items-start z-10 w-full">
                  <span className="text-[10px] md:text-xs font-mono text-cyan-400 tracking-widest bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/25 uppercase">
                    {item.category}
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                </div>

                {/* Bottom title */}
                <div className="relative text-left z-10 w-full">
                  <h3 className="text-white font-bold text-base md:text-lg tracking-wide uppercase">
                    {item.title}
                  </h3>
                  <div className="h-[2px] w-8 bg-gradient-to-r from-cyan-400 to-[#2563EB] mt-2.5 group-hover:w-20 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
