import { Reveal, Eyebrow } from './ui';
import {
  IconAnkh,
  IconFeather,
  IconEyeOfHorus,
  IconLotus,
  IconDjed,
  IconPyramid,
  IconScarab,
  IconWasScepter,
  IconSunDisc,
} from './icons';

/** 3x3 field: the eight products ring the TEOS core (index 4). */
const CELLS = [
  {
    icon: IconAnkh,
    name: 'Sovereign Wallet',
    desc: 'Keys, credentials and spend control in one sovereign vault.',
  },
  {
    icon: IconFeather,
    name: 'Comply Crawl',
    desc: 'Continuous compliance crawling across your entire estate.',
  },
  {
    icon: IconEyeOfHorus,
    name: 'Sentinel Shield',
    desc: 'Runtime threat detection with policy enforced at the edge.',
  },
  {
    icon: IconLotus,
    name: 'Civic Mixer',
    desc: 'Private, auditable mixing for sensitive civic data flows.',
  },
  { core: true },
  {
    icon: IconDjed,
    name: 'UnityCare',
    desc: 'Coordinated health and social services that hold together.',
  },
  {
    icon: IconPyramid,
    name: 'Digital Reconstruction of Gaza',
    desc: 'AI-assisted planning for rebuilding essential infrastructure.',
  },
  {
    icon: IconScarab,
    name: 'Labs Due Diligence MCP',
    desc: 'Deep, model-driven due diligence for labs and ventures.',
  },
  {
    icon: IconWasScepter,
    name: 'Sentinel Stack',
    desc: '258 security rules — ALLOW · WARN · BLOCK on every change.',
  },
];

export default function Products() {
  return (
    <section id="products" className="relative border-t border-gold/10 py-24 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <Eyebrow>The ecosystem</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-balance text-[clamp(1.8rem,4.6vw,3.2rem)] font-bold leading-[1.05]">
              <span className="text-gold-foil-static">Eight Sovereign Products</span>
              <span className="text-white/35"> · </span>
              <span className="text-white/80">One Core</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic mt-4 text-[clamp(1.05rem,2.8vw,1.7rem)] font-bold text-gold"
            >
              الامتثال والشفافية عنواننا
            </p>
          </Reveal>
          <Reveal delay={0.13}>
            <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-white/40">
              Compliance and transparency are our motto
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CELLS.map((cell, i) =>
            cell.core ? (
              <Reveal key="core" delay={0.18} className="sm:col-span-2 lg:col-span-1">
                <div className="relative flex h-full min-h-[210px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-gold/50 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.18),rgba(10,10,10,0.9)_70%)] p-6 text-center shadow-gold-glow">
                  <div className="pointer-events-none absolute inset-0 animate-pulse-ring rounded-2xl border border-gold/30" />
                  <IconSunDisc className="h-12 w-12 text-gold" />
                  <p className="font-display mt-4 text-xl font-black tracking-[0.22em] text-gold">
                    TEOS
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-white/60">
                    Core
                  </p>
                  <p className="mt-3 text-[11px] leading-relaxed text-white/45">
                    One gateway · 57 AI providers
                    <br />
                    312 GPU nodes · one heart
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal key={cell.name} delay={0.2 + i * 0.05}>
                <div className="group card-surface flex h-full min-h-[210px] flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-gold-glow">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold/25 bg-gold/[0.06] text-gold transition-colors duration-300 group-hover:border-gold/60 group-hover:bg-gold/[0.14]">
                    <cell.icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display mt-5 text-[17px] font-bold leading-snug text-white/95">
                    {cell.name}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-white/50">
                    {cell.desc}
                  </p>
                </div>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
