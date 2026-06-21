import { useRef, useState, MouseEvent } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { ArrowUpRight, Github, FolderGit2 } from 'lucide-react';
import GhostButton from './GhostButton';
import FadeIn from './FadeIn';

interface Project {
  id: number;
  name: string;
  category: string;
  desc: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  images: string[];
  status?: string;
  isPrivateRepo?: boolean;
  comingSoon?: boolean;
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // High-fidelity curated digital work items of Angad
  const projects: Project[] = [
    {
      id: 1,
      name: 'ANGAD Portfolio',
      category: 'Personal Portfolio',
      desc: 'A premium responsive portfolio website featuring modern UI design, interactive animations, glassmorphism effects, smooth user experience, and mobile-first development.',
      tech: ['React', 'Framer Motion', 'TypeScript', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: 'https://github.com/angadsingh6050',
      images: ['UI Wireframe', 'Perspective Grid', 'Core Modules'],
      status: 'Live'
    },
    {
      id: 2,
      name: 'Toppers Origin Test App',
      category: 'EdTech Platform',
      desc: 'An educational testing platform built for Bihar Board students featuring online quizzes, test management, student performance tracking, responsive design, and Firebase-powered functionality.',
      tech: ['React', 'Firebase', 'Tailwind CSS', 'Responsive Design'],
      liveUrl: 'https://toppersoriginboardtest.netlify.app/',
      isPrivateRepo: true,
      images: ['Quiz Engine', 'Performance HUD', 'Firebase Schema'],
      status: 'Live'
    },
    {
      id: 3,
      name: 'BusinessPro CRM',
      category: 'Business Website & CRM Dashboard',
      desc: 'A modern business management platform designed to help businesses manage leads, appointments, customers, inquiries, analytics, and day-to-day operations through a responsive dashboard.',
      tech: ['React', 'Tailwind CSS', 'UI Design', 'Responsive Design'],
      comingSoon: true,
      images: ['Lead Flow', 'Operations Dial', 'Analytics Board'],
      status: 'Coming Soon'
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="py-12 md:py-16 relative bg-[#0A0118]"
    >
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid container header */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center mb-10">
        <FadeIn delay={0.1}>
          <span className="text-[10px] md:text-xs tracking-[0.3em] font-semibold text-[#C9A8FF] uppercase">
            SELECTED CREATIONS
          </span>
        </FadeIn>
        <FadeIn delay={0.2} className="mt-3">
          <h2 className="text-3xl md:text-5xl font-black hero-heading tracking-tight uppercase">
            Projects
          </h2>
        </FadeIn>
      </div>

      {/* Stacking layout container */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-16 md:gap-20">
        {projects.map((project, index) => {
          return (
            <CardWrapper 
              key={project.id} 
              project={project} 
              index={index} 
              total={projects.length} 
            />
          );
        })}
      </div>
    </section>
  );
}

// High-fidelity graphic telemetry visualizers tailored to specific project IDs
function MicroTelemetryGraphic({ projectId, index }: { projectId: number; index: number }) {
  if (projectId === 1) {
    if (index === 0) {
      // UI Wireframe bento
      return (
        <div className="w-full flex flex-col gap-2 p-1 max-w-[120px]">
          <div className="grid grid-cols-3 gap-1.5">
            <div className="h-3 rounded bg-purple-500/10 border border-purple-500/20" />
            <div className="h-3 rounded bg-blue-500/10 border border-blue-500/20 col-span-2" />
          </div>
          <div className="h-8 rounded bg-[#8B5CF6]/10 border border-purple-500/30 w-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
          </div>
          <div className="h-3 rounded bg-white/5 border border-white/10" />
        </div>
      );
    }
    if (index === 1) {
      // Perspective matrix grid lines
      return (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden min-h-[50px]">
          <div className="absolute inset-0 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:8px_8px] opacity-35" />
          <svg className="w-12 h-12 text-purple-400/40" viewBox="0 0 100 100">
            <line x1="10" y1="90" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
            <line x1="90" y1="90" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
            <line x1="10" y1="10" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
            <line x1="90" y1="10" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="#C9A8FF" strokeWidth="0.8" strokeDasharray="2 2" />
            <circle cx="50" cy="50" r="3.5" fill="#A855F7" className="animate-pulse" />
          </svg>
        </div>
      );
    }
    // Core modules node-tree
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-1">
        <svg className="w-10 h-10 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" strokeDasharray="1 1" />
          <circle cx="12" cy="12" r="4.5" fill="rgba(139, 92, 246, 0.2)" stroke="#C9A8FF" />
        </svg>
      </div>
    );
  }
  
  if (projectId === 2) {
    if (index === 0) {
      // Analytics HUD bars
      return (
        <div className="w-full flex items-end justify-center gap-1.5 h-12 pt-1 px-1">
          <motion.div animate={{ height: ['40%', '80%', '40%'] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} className="w-1.5 bg-blue-500/20 border border-blue-500/40 rounded-t" />
          <motion.div animate={{ height: ['85%', '55%', '85%'] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="w-1.5 bg-[#8B5CF6]/30 border border-purple-500/50 rounded-t" />
          <motion.div animate={{ height: ['30%', '95%', '30%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="w-1.5 bg-emerald-500/20 border border-emerald-500/40 rounded-t" />
          <motion.div animate={{ height: ['60%', '30%', '60%'] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-1.5 bg-indigo-500/20 border border-indigo-500/40 rounded-t" />
        </div>
      );
    }
    if (index === 1) {
      // Ledger Stream stripes
      return (
        <div className="w-full flex flex-col gap-1.5 p-1 max-w-[120px]">
          <div className="flex items-center justify-between text-[6px] font-mono text-zinc-500 border-b border-white/5 pb-0.5">
            <span>TX-FLOW</span>
            <span className="text-emerald-400">SYNC</span>
          </div>
          <div className="h-2.5 rounded bg-white/[0.02] border border-white/5 flex items-center px-1 justify-between">
            <span className="w-6 h-[2px] bg-white/10 rounded" />
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
          </div>
          <div className="h-2.5 rounded bg-[#8B5CF6]/5 border border-purple-500/20 flex items-center px-1 justify-between">
            <span className="w-8 h-[2px] bg-purple-400/20 rounded" />
            <span className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" />
          </div>
        </div>
      );
    }
    // Metrics Dial
    return (
      <div className="w-full h-full flex items-center justify-center relative min-h-[45px]">
        <svg className="w-11 h-11 animate-spin" style={{ animationDuration: '9s' }} viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="15.915" fill="none" stroke="url(#blue-gradient)" strokeWidth="2" strokeDasharray="75 25" strokeDashoffset="25" />
          <defs>
            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute font-mono text-[8px] text-blue-300 font-extrabold">92%</div>
      </div>
    );
  }

  if (projectId === 3) {
    if (index === 0) {
      // Orbital System loops
      return (
        <div className="w-full h-full flex items-center justify-center relative min-h-[45px]">
          <div className="absolute w-10 h-10 rounded-full border border-dashed border-purple-500/25 animate-spin" style={{ animationDuration: '6s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-400" />
          </div>
          <div className="absolute w-6 h-6 rounded-full border border-blue-500/15 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-300" />
          </div>
          <div className="w-2 h-2 rounded-full bg-[#A855F7]/30 border border-purple-400" />
        </div>
      );
    }
    if (index === 1) {
      // Coordinate Map / Radar sweep
      return (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden min-h-[45px]">
          <div className="absolute w-full h-[0.5px] bg-sky-500/20 top-1/2" />
          <div className="absolute h-full w-[0.5px] bg-sky-500/20 left-1/2" />
          <div className="absolute w-9 h-9 rounded-full border border-sky-500/15" />
          <div className="absolute top-2 left-3 w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
        </div>
      );
    }
    // Gravity math plot line
    return (
      <div className="w-full h-full flex items-center justify-center px-1 min-h-[45px]">
        <svg className="w-full h-8 text-[#8B5CF6]" viewBox="0 0 100 40">
          <path d="M0,20 Q25,0 50,20 T100,20" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          <path d="M0,20 Q25,-5 50,20 T100,20" fill="none" stroke="url(#purple-grad)" strokeWidth="1.2" />
          <circle cx="50" cy="20" r="1.5" fill="#3B82F6" />
          <defs>
            <linearGradient id="purple-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Vesper DevOps Monitor CPU / Logs / Network
  if (index === 0) {
    // CPU telemetry columns
    return (
      <div className="w-full flex flex-col gap-1.5 p-1 max-w-[120px]">
        <div className="flex gap-1 items-center">
          <div className="w-1 h-1 rounded-sm bg-purple-500/50" />
          <span className="text-[6px] font-mono text-zinc-500">CORE_01</span>
        </div>
        <div className="h-1.5 w-full rounded-sm bg-neutral-900 border border-white/5 flex overflow-hidden">
          <div className="w-[82%] bg-[#8B5CF6] h-full" />
        </div>
        <div className="flex gap-1 items-center mt-0.5">
          <div className="w-1 h-1 rounded-sm bg-emerald-500/50" />
          <span className="text-[6px] font-mono text-zinc-500">CORE_02</span>
        </div>
        <div className="h-1.5 w-full rounded-sm bg-neutral-900 border border-white/5 flex overflow-hidden">
          <div className="w-[45%] bg-emerald-400 h-full" />
        </div>
      </div>
    );
  }
  if (index === 1) {
    // Simulated Terminal stdout logs stream
    return (
      <div className="w-full flex flex-col gap-1 p-1 text-left select-none font-mono max-w-[120px]">
        <div className="text-[6px] text-zinc-500 truncate">&gt; NPM RUN DEPLOY</div>
        <div className="text-[6px] text-purple-400 truncate">&gt; SOCKETS_READY 3K0</div>
        <div className="text-[6px] text-emerald-400 truncate">&gt; ENGINE_ONLINE</div>
      </div>
    );
  }
  // DevOps Network Grid
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-1 font-mono min-h-[45px]">
      <div className="text-[8px] text-[#A855F7] font-black tracking-widest animate-pulse">ALIVE</div>
      <div className="text-[6.5px] text-white/30 tracking-widest mt-0.5">14MS</div>
    </div>
  );
}

// Sub-component wrapper for sticky scale calculations
interface CardWrapperProps {
  project: Project;
  index: number;
  total: number;
  key?: any;
}

function CardWrapper({ project, index, total }: CardWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Monitor scroll progress relative to cell viewport entry to implement scale reduction
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ['start start', 'end start'],
  });

  // Target scale calculation: 1 - (total - 1 - index) * 0.03
  const targetScaleVal = 1 - (total - 1 - index) * 0.03;
  // Map scale compression factor
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScaleVal]);
  // Map subtle light decrease during stack overlapping
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  // Framer Motion values for the dynamic tilt angles
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-performance spring setup for fluid cursor response and natural return damping
  const springConfig = { damping: 25, stiffness: 150, mass: 0.6 };
  const rotateX = useSpring(x, springConfig);
  const rotateY = useSpring(y, springConfig);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized position from card center (-0.5 to 0.5)
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    
    // Map coordinates to a elegant, subtle tilt range (max 5 degrees)
    const rX = -(mouseY / (height / 2)) * 5;
    const rY = (mouseX / (width / 2)) * 5;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Sticky offset distance calculation: index * 28px + 100px header clearance
  const stickyTopOffset = `${index * 28 + 100}px`;

  return (
    <div 
      ref={elementRef}
      className="sticky min-h-[50vh] md:min-h-[750px] flex items-center justify-center shadow-2xl"
      style={{
        top: stickyTopOffset,
        zIndex: index + 10,
        perspective: 1200, // Enables realistic 3D perspective distortion
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          scale,
          opacity,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="glass-card w-full rounded-[30px] md:rounded-[60px] border border-purple-500/25 p-6 md:p-12 flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 items-center justify-between bg-[#0C021D]/90 backdrop-blur-xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-500 hover:border-purple-400/50 hover:shadow-[0_25px_60px_rgba(139,92,246,0.22)]"
      >
        {/* Subtle grid accent inside the cards */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Info panel */}
        <div className="w-full lg:w-1/2 flex flex-col text-left justify-center relative z-10">
          
          {/* Card meta identifier with symmetrical Status Badge */}
          <div className="flex items-center justify-between w-full mb-3 md:mb-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
              <span className="text-[10px] md:text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase">
                {project.category}
              </span>
            </div>

            {project.status && (
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-wider font-semibold uppercase border ${
                project.status === 'Live'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.05)]'
                  : 'bg-pink-500/10 border-pink-500/20 text-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.05)]'
              }`}>
                {project.status === 'Coming Soon' ? '🚀 In Development' : project.status}
              </span>
            )}
          </div>

          <h3 className="text-white font-extrabold text-xl md:text-3xl lg:text-4xl tracking-wide uppercase select-all">
            {project.name}
          </h3>

          <p className="text-[#D7E2EA]/75 font-light text-xs md:text-sm lg:text-base leading-relaxed mt-4 md:mt-5 max-w-lg select-all">
            {project.desc}
          </p>

          {/* Badges container */}
          <div className="flex flex-wrap gap-2 mt-5 md:mt-7">
            {project.tech.map((badge, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-[10px] md:text-xs font-mono bg-purple-500/10 border border-purple-500/10 text-purple-200"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Dynamic Link buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-8 md:mt-8">
            {project.comingSoon ? (
              <div className="flex items-center gap-1.5 px-4 py-2 bg-purple-950/20 border border-purple-500/15 rounded-xl text-xs font-mono tracking-widest text-[#C9A8FF]/60 select-none shadow-[0_0_10px_rgba(139,92,246,0.05)]">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                <span>🚀 COMING SOON</span>
              </div>
            ) : (
              <>
                <GhostButton href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <span>Live Demo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </GhostButton>

                {project.isPrivateRepo ? (
                  <div 
                    title="The source code is private to protect administrative tools and proprietary question banks."
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-900 border border-white/5 rounded-xl text-xs font-mono tracking-widest text-zinc-500 cursor-help select-none"
                  >
                    <span>🔒 PRIVATE REPOSITORY</span>
                  </div>
                ) : (
                  project.githubUrl && (
                    <GhostButton href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="border-white/20 text-white/80 hover:bg-white/5">
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </GhostButton>
                  )
                )}
              </>
            )}
          </div>
        </div>

        {/* 3-Column Image mockup placeholder Grid */}
        <div className="w-full lg:w-1/2 aspect-[4/3] max-h-[300px] lg:max-h-[380px] grid grid-cols-3 gap-2 md:gap-3 shrink-0 relative z-10 shadow-2xl">
          {project.images.map((img, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="rounded-2xl md:rounded-[24px] bg-neutral-950/40 border border-purple-500/10 hover:border-purple-500/25 transition-all duration-300 flex items-center justify-center p-3 text-center h-full relative overflow-hidden group select-none cursor-pointer"
            >
              {/* Overlay highlight */}
              <div className="absolute inset-0 bg-[#8B5CF6]/[0.01] group-hover:bg-[#8B5CF6]/[0.06] transition-colors duration-300 pointer-events-none" />

              {/* Technical framing lines */}
              <div className="absolute top-2 left-2 w-3 h-[1px] bg-[#8B5CF6]/30" />
              <div className="absolute top-2 left-2 w-[1px] h-3 bg-[#8B5CF6]/30" />
              <div className="absolute bottom-2 right-2 w-3 h-[1px] bg-[#8B5CF6]/30" />
              <div className="absolute bottom-2 right-2 h-3 w-[1px] bg-[#8B5CF6]/30" />

              <div className="flex flex-col items-center gap-3 relative pointer-events-none z-10 w-full scale-[0.85] md:scale-100">
                {/* Visual simulator telemetry graphic */}
                <div className="w-full h-12 flex items-center justify-center overflow-hidden">
                  <MicroTelemetryGraphic projectId={project.id} index={i} />
                </div>
                
                <span className="text-[8px] md:text-[9px] font-mono text-stone-400 group-hover:text-stone-200 transition-colors duration-300 uppercase py-1 px-2.5 bg-[#8C5C8C]/5 border border-white/5 rounded-full select-none max-w-full truncate text-center">
                  {img}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </div>
  );
}
