import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  className?: string;
  key?: any;
  type?: 'spring' | 'tween';
  damping?: number;
  stiffness?: number;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  y = 30,
  x = 0,
  className = '',
  type = 'spring',
  damping = 18,
  stiffness = 90,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        type: type === 'spring' ? 'spring' : 'tween',
        stiffness: type === 'spring' ? stiffness : undefined,
        damping: type === 'spring' ? damping : undefined,
        duration: type === 'tween' ? duration : undefined,
        delay,
        ease: type === 'tween' ? 'easeOut' : undefined,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
