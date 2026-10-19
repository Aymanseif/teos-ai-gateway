'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Scroll-reveal wrapper used by every section. */
export function Reveal({ children, delay = 0, y = 26, className = '', as = 'div' }) {
  const reduce = useReducedMotion();
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

/** Small gold eyebrow label above section titles. */
export function Eyebrow({ children, tone = 'gold' }) {
  const color = tone === 'emerald' ? 'text-emerald' : 'text-gold';
  return (
    <div className={`mb-4 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.32em] ${color}`}>
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-current opacity-70" />
      {children}
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-current opacity-70" />
    </div>
  );
}

/** Gold pill button (primary CTA). */
export function GoldButton({ children, href = '#', className = '', ...rest }) {
  return (
    <a
      href={href}
      className={`btn-gold inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-widest ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Outlined gold button (secondary CTA). */
export function OutlineButton({ children, href = '#', className = '', ...rest }) {
  return (
    <a
      href={href}
      className={`btn-outline inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-widest ${className}`}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}
