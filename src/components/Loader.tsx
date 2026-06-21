import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      // Wait for exit transition to conclude before signaling parent
      const exitTimer = setTimeout(onComplete, 500);
      return () => clearTimeout(exitTimer);
    }, 1300);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0118]"
        >
          <div className="relative flex flex-col items-center text-center px-4">
            {/* Ambient Background Glow behind logo */}
            <div className="absolute w-44 h-44 rounded-full bg-[#7C3AED] blur-[60px] opacity-40 -translate-y-4 -z-10" />

            {/* Logo Text with character scale effects */}
            <motion.h1
              initial={{ opacity: 0, y: 25, letterSpacing: '0.15em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl md:text-7xl font-black hero-heading tracking-[0.35em] uppercase"
            >
              ANGAD
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-stone-300 text-xs md:text-sm font-light mt-4 tracking-[0.25em]"
            >
              FRONTEND DEVELOPER & CREATIVE DESIGNER
            </motion.p>

            {/* Glowing progress slider track */}
            <div className="w-28 h-[2px] bg-white/10 mt-6 relative overflow-hidden rounded-full">
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
