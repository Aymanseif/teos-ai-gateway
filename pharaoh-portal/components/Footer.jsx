import { Reveal } from './ui';
import { EgyptianFlag, EyeOfHorusLarge } from './art';
import { IconCartouche } from './icons';
import {
  GITHUB_ORG,
  PRODUCT_HUNT,
  CREDLY_BADGE,
  SUPPORT_MAIL,
  SUPPORT_ADDRESS,
  VERSION,
} from './site';

const LINKS = [
  {
    href: GITHUB_ORG,
    label: 'GitHub Organization',
    meta: '8 repositories',
    icon: 'github',
  },
  {
    href: PRODUCT_HUNT,
    label: 'Product Hunt',
    meta: 'Launch page',
    icon: 'ph',
  },
  {
    href: CREDLY_BADGE,
    label: 'Credly Profile',
    meta: 'Anthropic credential',
    icon: 'credly',
  },
];

function LinkIcon({ kind }) {
  if (kind === 'github') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"
        />
      </svg>
    );
  }
  if (kind === 'ph') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M13.6 12.6H10.4v3.2h1.7a1.6 1.6 0 0 0 0-3.2zm0-4.8H8.2v11.6h2.2v-3.4h3.2a3.5 3.5 0 0 0 0-7zm.2-4.2H4.5v19.6h2.2V17h7.1a6.3 6.3 0 0 0 0-13.4zM2.3 2h14.9a2.3 2.3 0 0 1 2.3 2.3v15.4a2.3 2.3 0 0 1-2.3 2.3H2.3A2.3 2.3 0 0 1 0 19.7V4.3A2.3 2.3 0 0 1 2.3 2z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.4 3.6 7.2v9.6L12 21.6l8.4-4.8V7.2L12 2.4zm0 2.3 6 3.4-6 3.4-6-3.4 6-3.4zM5.4 9.7l5.8 3.3v6.2l-5.8-3.3V9.7zm7.4 9.5v-6.2l5.8-3.3v6.2l-5.8 3.3z"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-[#040404] pt-20">
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-64 bg-[radial-gradient(ellipse_50%_100%_at_50%_0%,rgba(212,175,55,0.08),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <IconCartouche className="h-9 w-9 text-gold" />
            <p className="font-display mt-4 text-xl font-black tracking-[0.26em] text-white">
              PHARAOH <span className="text-gold">TEOS</span> PORTAL
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-white/40">
              Elmahrosa Sovereign Ecosystem
            </p>

            <div className="mt-6 flex items-center gap-3">
              <EgyptianFlag className="h-5 w-auto rounded-[2px] shadow-lg ring-1 ring-white/10" />
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/45">
                Built in Alexandria
              </span>
              <span aria-hidden className="h-3 w-px bg-gold/30" />
              <span className="font-display text-[11px] font-semibold tracking-[0.24em] text-gold">
                {VERSION} · Law Over Code
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {LINKS.map((l, i) => (
            <Reveal key={l.label} delay={0.06 * i}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-surface group flex h-full flex-col items-center rounded-2xl px-6 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-gold-glow"
              >
                <span className="text-gold transition-transform duration-300 group-hover:scale-110">
                  <LinkIcon kind={l.icon} />
                </span>
                <span className="font-display mt-3.5 text-[14px] font-bold text-white/90">
                  {l.label}
                </span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">
                  {l.meta}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 border-t border-gold/10 py-10">
          <EyeOfHorusLarge className="h-14 w-auto text-gold/50" />
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
            Support ·{' '}
            <a
              href={SUPPORT_MAIL}
              className="text-gold/80 underline-offset-4 hover:underline"
            >
              {SUPPORT_ADDRESS}
            </a>
          </p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/25">
            © {new Date().getFullYear()} Elmahrosa · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
