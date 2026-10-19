'use client';

import { useEffect, useState } from 'react';
import { IconCartouche } from './icons';
import { NAV_LINKS, GUMROAD } from './site';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-gold/15 bg-ink/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <IconCartouche className="h-7 w-7 text-gold transition-transform duration-300 group-hover:scale-110" />
          <span className="font-display text-[13px] font-bold uppercase tracking-[0.26em] text-white sm:text-sm">
            Pharaoh <span className="text-gold">Teos</span> Portal
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={GUMROAD}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] sm:px-5 sm:py-2.5"
        >
          Buy $299
        </a>
      </nav>
    </header>
  );
}
