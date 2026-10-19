'use client';

import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PharaonicGate, FounderMedallion } from './art';
import { GoldButton, OutlineButton } from './ui';
import { IconCartouche, IconLock, IconShieldCheck } from './icons';
import { GITHUB_REPO, GUMROAD, PRICE_CTA } from './site';

const PILLARS = [
  '57 AI Providers Orchestration',
  '312 GPU Nodes',
  'Zero-Trust Architecture',
  '99.999% Uptime',
];

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="top" className="relative overflow-hidden pb-28 pt-32 sm:pt-40">
      {/* backdrop: gate + glow + grid */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full">
        <div className="absolute left-1/2 top-16 h-[760px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_65%)] blur-2xl" />
        <PharaonicGate className="absolute left-1/2 top-20 w-[1280px] max-w-none -translate-x-1/2 text-gold/25" />
        <div className="pattern-gate absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-8">
        <motion.div {...rise(0.05)}>
          <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full border border-gold/25 bg-gold/[0.06] px-5 py-2">
            <IconCartouche className="h-4 w-4 text-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              Elmahrosa Sovereign Ecosystem
            </span>
            <span aria-hidden className="h-3 w-px bg-gold/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
              Built in Alexandria, Egypt
            </span>
          </div>
        </motion.div>

        <motion.h1
          {...rise(0.15)}
          className="mt-9 font-display leading-[0.88] text-balance"
        >
          <span className="text-gold-foil block text-[clamp(3.6rem,13vw,9.5rem)] font-black tracking-[0.1em] drop-shadow-[0_0_60px_rgba(212,175,55,0.35)]">
            TEOS
          </span>
          <span className="text-gold-foil-static mt-5 block text-[clamp(1.5rem,4.6vw,3.1rem)] font-semibold tracking-[0.06em]">
            Sovereign&nbsp;Wallet
          </span>
          <span className="mt-2 block text-[clamp(0.95rem,2.6vw,1.6rem)] font-medium tracking-[0.22em] text-white/55">
            HEART&nbsp;OF&nbsp;ORGANIZATION
          </span>
        </motion.h1>

        {/* four pillars */}
        <motion.div
          {...rise(0.28)}
          className="mx-auto mt-9 flex max-w-4xl flex-wrap items-center justify-center gap-x-5 gap-y-3"
        >
          {PILLARS.map((p, i) => (
            <Fragment key={p}>
              {i > 0 && (
                <span
                  aria-hidden
                  className="hidden h-4 w-px bg-gold/45 sm:block"
                />
              )}
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-xs">
                {p}
              </span>
            </Fragment>
          ))}
        </motion.div>

        {/* founder medallion */}
        <motion.div
          {...rise(0.4)}
          className="mx-auto mt-14 flex w-fit flex-col items-center"
        >
          <FounderMedallion className="animate-float" />
          <p className="font-display mt-4 text-sm font-semibold tracking-[0.24em] text-gold">
            FOUNDER &amp; CHIEF ARCHITECT
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/40">
            Elmahrosa · Alexandria
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          {...rise(0.55)}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <GoldButton href={GUMROAD} className="w-full sm:w-auto">
            {PRICE_CTA}
          </GoldButton>
          <OutlineButton href={GITHUB_REPO} className="w-full sm:w-auto">
            View on GitHub
          </OutlineButton>
        </motion.div>

        {/* reassurance strip */}
        <motion.div
          {...rise(0.68)}
          className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[11px] uppercase tracking-[0.18em] text-white/45"
        >
          <span className="inline-flex items-center gap-2">
            <IconLock className="h-4 w-4 text-gold/70" />
            Bring your own keys — they stay on your machine
          </span>
          <span className="inline-flex items-center gap-2">
            <IconShieldCheck className="h-4 w-4 text-gold/70" />
            Offline Windows installer
          </span>
        </motion.div>
      </div>
    </section>
  );
}
