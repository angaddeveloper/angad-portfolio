import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function InteractiveBackground() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Custom cursor position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring values for lagging ring with smoother values
  const cursorRingX = useSpring(cursorX, { damping: 30, stiffness: 350, mass: 0.4 });
  const cursorRingY = useSpring(cursorY, { damping: 30, stiffness: 350, mass: 0.4 });

  // Spring values for mouse-follow radial glow
  const glowX = useSpring(cursorX, { damping: 45, stiffness: 120 });
  const glowY = useSpring(cursorY, { damping: 45, stiffness: 120 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  // Particle Canvas Drift
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Re-size canvas on change
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create premium star/particle system
    const particleCount = 65;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      opacityPulse: number;
      opacityDirection: number;
      maxOpacity: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      const isViolet = Math.random() > 0.5;
      const rgb = isViolet ? '139, 92, 246' : '37, 99, 235';
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        color: `rgba(${rgb}, `,
        speedX: (Math.random() - 0.5) * 0.18,
        speedY: (Math.random() - 0.5) * 0.18,
        opacityPulse: Math.random() * 0.4 + 0.1,
        opacityDirection: Math.random() > 0.5 ? 0.005 : -0.005,
        maxOpacity: Math.random() * 0.35 + 0.15
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections between close particles for a cybergrid feel
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 12100) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / 110) * 0.07;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw and drift particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Pulse opacity
        p.opacityPulse += p.opacityDirection;
        if (p.opacityPulse > p.maxOpacity || p.opacityPulse < 0.05) {
          p.opacityDirection = -p.opacityDirection;
        }

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacityPulse})`;
        ctx.shadowColor = 'rgba(139, 92, 246, 0.5)';
        ctx.shadowBlur = p.radius > 1.2 ? 4 : 0;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Background Animated Grid & Textures */}
      <div className="fixed inset-0 pointer-events-none -z-40 overflow-hidden bg-[#050011]">
        
        {/* Animated Mesh Gradients Flow */}
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-700/10 rounded-full blur-[130px] animate-mesh-one" />
        <div className="absolute bottom-[10%] right-[-15%] w-[600px] h-[600px] bg-blue-700/10 rounded-full blur-[140px] animate-mesh-two" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-indigo-700/5 rounded-full blur-[120px] animate-mesh-three" />

        {/* Animated Custom CSS Grid with 3D Depth perspective */}
        <div 
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.08) 1.5px, transparent 1.5px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.08) 1.5px, transparent 1.5px)
            `,
            backgroundSize: '48px 48px',
            animation: 'grid-drift 40s linear infinite',
          }}
        />

        {/* Cinematic SVG Noise Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.055] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
        
        {/* Particle Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>

      {/* Global Stable Radial Glows */}
      <div className="fixed pointer-events-none -z-30 top-[-15%] left-[-10%] w-[700px] h-[700px] bg-[#6D28D9] opacity-[0.12] rounded-full blur-[150px]"></div>
      <div className="fixed pointer-events-none -z-30 bottom-[-15%] right-[-10%] w-[800px] h-[800px] bg-[#1D4ED8] opacity-[0.12] rounded-full blur-[150px]"></div>

      {/* Radial Mouse-Follow Glow - Screen blend mode */}
      <motion.div
        className="fixed pointer-events-none -z-30 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.16] mix-blend-screen bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500"
        style={{
          x: glowX,
          y: glowY,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Custom Cursor System */}
      {isVisible && (
        <>
          {/* Inner small dot */}
          <motion.div
            className="fixed pointer-events-none z-50 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#A855F7] mix-blend-difference hidden md:block"
            style={{
              x: cursorX,
              y: cursorY,
              transform: 'translate(-50%, -50%)',
            }}
          />
          {/* Lagging Ring */}
          <motion.div
            className="fixed pointer-events-none z-50 w-10 h-10 rounded-full border border-purple-400/40 hidden md:block shadow-[0_0_8px_rgba(168,85,247,0.15)] bg-purple-500/[0.02]"
            style={{
              x: cursorRingX,
              y: cursorRingY,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </>
      )}

      {/* Keyframes style embedded */}
      <style>{`
        @keyframes grid-drift {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 96px 192px;
          }
        }
        @keyframes mesh-drift-one {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.15); }
          66% { transform: translate(-30px, 40px) scale(0.9); }
        }
        @keyframes mesh-drift-two {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-50px, 30px) scale(1.1); }
        }
        @keyframes mesh-drift-three {
          0%, 100% { transform: translate(0px, 0px) scale(0.9); }
          50% { transform: translate(30px, -40px) scale(1.2); }
        }
        .animate-mesh-one {
          animation: mesh-drift-one 24s ease-in-out infinite;
        }
        .animate-mesh-two {
          animation: mesh-drift-two 28s ease-in-out infinite;
        }
        .animate-mesh-three {
          animation: mesh-drift-three 20s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

