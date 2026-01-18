import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  // Respect user's reduced-motion preference
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  const [isHovering, setIsHovering] = useState(false);

  // Motion values (no React renders when these update)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring config tuned down for lower CPU (less stiffness)
  const springConfig = { damping: 30, stiffness: 200, mass: 0.15 } as const;
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Last known mouse pos, updated from event and consumed in rAF loop
  const lastMouse = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Update lastMouse on pointermove (cheap)
    const onPointerMove = (e: PointerEvent) => {
      lastMouse.current.x = e.clientX;
      lastMouse.current.y = e.clientY;
    };

    // Use pointerover/pointerout to detect hover state on interactive elements
    const onPointerOver = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      setIsHovering(!!(el && (el.closest('button') || el.closest('a') || el.closest('[data-hover="true"]'))));
    };

    const onPointerOut = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el || (!el.closest('button') && !el.closest('a') && !el.closest('[data-hover="true"]'))) {
        setIsHovering(false);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('pointerout', onPointerOut, { passive: true });

    // rAF loop to write motion values at screen refresh rate (no DOM traversal here)
    const loop = () => {
      mouseX.set(lastMouse.current.x);
      mouseY.set(lastMouse.current.y);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('pointerout', onPointerOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference flex items-center justify-center hidden md:flex will-change-transform"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        className="relative rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.2)] flex items-center justify-center"
        style={{ width: isHovering ? 60 : 48, height: isHovering ? 60 : 48 }}
        animate={{ scale: isHovering ? 1.12 : 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      >
        <motion.span
          className="z-10 text-black font-black uppercase tracking-widest text-xs overflow-hidden whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.12 }}
        >
          View
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;