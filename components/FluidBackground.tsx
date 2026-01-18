import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground: React.FC = () => {
  // Respect user's reduced-motion preference
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return <div className="fixed inset-0 -z-10 bg-[#050505]" />;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      {/* Reduced sizes and blur to lower GPU cost */}
      <motion.div
        className="absolute top-[-5%] left-[-5%] w-[40vmax] h-[40vmax] bg-[#bef264] rounded-full mix-blend-soft-light filter blur-[30px] opacity-8 will-change-transform"
        animate={{ x: [0, 20, -20, 0], y: [0, -10, 10, 0], scale: [1, 1.08, 0.98, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-5%] w-[30vmax] h-[30vmax] bg-white rounded-full mix-blend-soft-light filter blur-[40px] opacity-5 will-change-transform"
        animate={{ x: [0, -20, 20, 0], y: [0, 20, -20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/80 pointer-events-none" />
    </div>
  );
};

export default FluidBackground;