import { Reveal, Eyebrow } from './ui';
import {
  IconLock,
  IconShieldCheck,
  IconBlockThreat,
  IconSovereign,
  IconSunDisc,
  IconGauge,
} from './icons';

const GUARANTEES = [
  {
    icon: IconLock,
    title: 'Zero-Trust Architecture',
    desc: 'No implicit trust. Every request is authenticated, scoped and logged.',
  },
  {
    icon: IconShieldCheck,
    title: 'End-to-End Encryption',
    desc: 'Traffic and secrets are encrypted in transit and at rest, on your machine.',
  },
  {
    icon: IconBlockThreat,
    title: 'Blocks Hackers & Malware',
    desc: 'Sentinel Stack interdicts malicious payloads before they execute.',
  },
  {
    icon: IconSovereign,
    title: 'Sovereign & Independent',
    desc: 'Self-hosted and vendor-independent. No telemetry, no phone-home.',
  },
];

const ACTIONS = [
  {
    icon: IconGauge,
    name: 'Sovereign Repo Valuator',
    score: '0–100',
    desc: 'Scores every repository on a 0–100 sovereignty index before merge.',
  },
  {
    icon: IconShieldCheck,
    name: 'Sentinel Shield Guard',
    score: '258 rules',
    desc: 'ALLOW · WARN · BLOCK enforcement across 258 security rules.',
  },
];

function ShieldDiagram() {
  const nodes = Array.from({ length: 8 });
  const threats = [
    { label: 'MALWARE', a: 214 },
    { label: 'INTRUSION', a: 326 },
    { label: 'EXFILTRATION', a: 92 },
    { label: 'CONFIG DRIFT', a: 148 },
  ];
  const pt = (deg, r) => {
    const rad = (deg * Math.PI) / 180;
    return { x: 200 + Math.cos(rad) * r, y: 200 + Math.sin(rad) * r };
  };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
        <defs>
          <path
            id="orbitArc"
            d="M200,200 m-170,0 a170,170 0 1,1 340,0 a170,170 0 1,1 -340,0"
          />
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="200" r="150" fill="url(#coreGlow)" />

        {/* outer containment ring */}
        <circle
          cx="200"
          cy="200"
          r="190"
          fill="none"
          stroke="currentColor"
          className="text-gold/20"
          strokeWidth="1"
          strokeDasharray="3 7"
        />

        {/* rotating Sentinel Stack ring with its label */}
        <g
          className="origin-center animate-spin"
          style={{ animationDuration: '34s', transformBox: 'fill-box' }}
        >
          <circle
            cx="200"
            cy="200"
            r="170"
            fill="none"
            stroke="currentColor"
            className="text-gold/35"
            strokeWidth="1"
            strokeDasharray="26 12"
          />
          <text
            className="font-display"
            fill="currentColor"
            fontSize="11"
            fontWeight="700"
            letterSpacing="4"
          >
            <textPath href="#orbitArc" startOffset="25%">
              SENTINEL STACK · THREAT MONITOR ·
            </textPath>
          </text>
        </g>

        {/* emerald shield ring */}
        <circle
          cx="200"
          cy="200"
          r="118"
          fill="none"
          stroke="currentColor"
          className="text-emerald/45"
          strokeWidth="1.5"
        />
        <circle
          cx="200"
          cy="200"
          r="118"
          fill="none"
          stroke="currentColor"
          className="text-emerald/25"
          strokeWidth="8"
          strokeDasharray="2 16"
        />

        {/* enforcement nodes on the shield ring */}
        {nodes.map((_, i) => {
          const p = pt((i / 8) * 360 - 90, 118);
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="4"
              fill="currentColor"
              className="text-gold"
            />
          );
        })}

        {/* inbound threats stopped at the shield */}
        {threats.map((t) => {
          const outer = pt(t.a, 192);
          const stop = pt(t.a, 128);
          return (
            <g key={t.label}>
              <line
                x1={outer.x}
                y1={outer.y}
                x2={stop.x}
                y2={stop.y}
                stroke="currentColor"
                className="text-rose-400/45"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <circle
                cx={outer.x}
                cy={outer.y}
                r="5"
                fill="currentColor"
                className="text-rose-400/70"
              />
              <line
                x1={stop.x - 7}
                y1={stop.y - 7}
                x2={stop.x + 7}
                y2={stop.y + 7}
                stroke="currentColor"
                className="text-emerald"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1={stop.x + 7}
                y1={stop.y - 7}
                x2={stop.x - 7}
                y2={stop.y + 7}
                stroke="currentColor"
                className="text-emerald"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>

      {/* labels for the threats */}
      {threats.map((t) => {
        const p = pt(t.a, 224);
        return (
          <span
            key={t.label}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.18em] text-rose-300/70"
            style={{ left: `${(p.x / 400) * 100}%`, top: `${(p.y / 400) * 100}%` }}
          >
            {t.label}
          </span>
        );
      })}

      {/* the core */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center text-center">
          <IconSunDisc className="h-10 w-10 animate-pulse-ring text-gold" />
          <p className="font-display mt-3 text-lg font-black tracking-[0.24em] text-gold">
            TEOS CORE
          </p>
          <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/45">
            Zero-Trust Boundary
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Security() {
  return (
    <section id="security" className="relative border-t border-gold/10 py-24 sm:py-28">
      <div className="pattern-gate pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <Eyebrow tone="emerald">Security architecture</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              dir="rtl"
              lang="ar"
              className="font-arabic text-gold-foil-static text-balance text-[clamp(1.5rem,4.4vw,2.9rem)] font-bold leading-tight"
            >
              قلب المنظمة - جدار الحماية الحتمي
            </h2>
          </Reveal>
          <Reveal delay={0.09}>
            <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-white/45">
              The heart of the organization — the inevitable firewall
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-2">
          <Reveal delay={0.12}>
            <ShieldDiagram />
          </Reveal>

          <div>
            <ul className="grid gap-5 sm:grid-cols-2">
              {GUARANTEES.map(({ icon: Icon, title, desc }, i) => (
                <Reveal key={title} delay={0.16 + i * 0.06}>
                  <li className="card-surface h-full rounded-2xl p-5 transition-colors duration-300 hover:border-emerald/40">
                    <span className="grid h-10 w-10 place-items-center rounded-lg border border-emerald/30 bg-emerald/[0.08] text-emerald">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display mt-4 text-[15px] font-bold text-white/95">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/50">
                      {desc}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.4}>
              <div className="mt-8 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.07] to-transparent p-6">
                <div className="mb-5 flex items-center gap-3">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/80" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"
                    />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-gold">
                    GitHub Actions
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {ACTIONS.map(({ icon: Icon, name, score, desc }) => (
                    <div
                      key={name}
                      className="rounded-xl border border-gold/15 bg-ink/70 p-4"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Icon className="h-4 w-4 text-gold" />
                        <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 font-mono text-[10px] font-bold text-gold">
                          {score}
                        </span>
                      </div>
                      <p className="font-display mt-3 text-[13px] font-bold leading-tight text-white/90">
                        {name}
                      </p>
                      <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/45">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
