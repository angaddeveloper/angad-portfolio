import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface GhostButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export default function GhostButton({
  children,
  onClick,
  className = '',
  href,
  target,
  rel,
}: GhostButtonProps) {
  const content = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-2.5 rounded-full border-2 border-[#A855F7]/50 text-[#D7E2EA] hover:bg-[#A855F7]/10 font-medium text-xs tracking-wider uppercase transition-colors duration-300 flex items-center justify-center gap-1.5 ${className}`}
    >
      {children}
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
}
