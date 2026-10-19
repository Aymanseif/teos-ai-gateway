import { Reveal, Eyebrow, GoldButton } from './ui';
import { GoldenSeal, PharaonicGate } from './art';
import QrCode from './QrCode';
import {
  GUMROAD,
  SUPPORT_MAIL,
  SUPPORT_ADDRESS,
  PRICE_LABEL,
  RELEASE_FILE,
  RELEASE_SHA256,
} from './site';

const FEATURES = [
  { t: 'One-time payment', d: 'Pay once. No renewal, no seat metering.' },
  { t: 'No subscription', d: 'Nothing recurs. Nothing expires.' },
  { t: 'No usage markup', d: 'Your tokens bill straight to your providers.' },
  {
    t: 'Bring your own API keys',
    d: 'Keys stay on your machine — they are never proxied through us.',
  },
  { t: 'Honest pricing', d: 'One number, printed once. No anchor pricing.' },
];

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative border-t border-gold/10 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-10 h-[520px] overflow-hidden opacity-[0.16]">
        <PharaonicGate className="mx-auto w-[1100px] max-w-none -translate-y-6 text-gold" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <Eyebrow>Licensing</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-balance text-[clamp(1.8rem,4.6vw,3.2rem)] font-bold leading-[1.05]">
              <span className="text-white/80">One price. </span>
              <span className="text-gold-foil-static">Yours forever.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="card-surface relative mt-12 overflow-hidden rounded-3xl shadow-gold-glow-lg">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

            <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
              {/* left: the offer */}
              <div className="p-8 sm:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  TEOS AI Gateway
                </p>
                <h3 className="font-display mt-3 flex flex-wrap items-baseline gap-x-3">
                  <span className="text-gold-foil text-[clamp(3.2rem,9vw,4.6rem)] font-black leading-none">
                    {PRICE_LABEL}
                  </span>
                  <span className="font-display text-[clamp(1.1rem,3vw,1.6rem)] font-semibold tracking-[0.08em] text-white/85">
                    Lifetime License
                  </span>
                </h3>
                <p className="mt-3 text-sm text-white/50">
                  The complete offline Windows bundle — every product in the
                  sovereign ecosystem, one payment.
                </p>

                <ul className="mt-8 space-y-4">
                  {FEATURES.map((f) => (
                    <li key={f.t} className="flex items-start gap-3.5">
                      <Check />
                      <span>
                        <span className="block text-[14.5px] font-semibold text-white/90">
                          {f.t}
                        </span>
                        <span className="mt-0.5 block text-[12.5px] leading-relaxed text-white/45">
                          {f.d}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <GoldButton href={GUMROAD} className="mt-9 w-full">
                  Buy Now — Lifetime Access
                </GoldButton>

                <p className="mt-5 text-center text-[11px] leading-relaxed text-white/35">
                  One-time payment. Questions?{' '}
                  <a
                    href={SUPPORT_MAIL}
                    className="text-gold/80 underline-offset-4 hover:underline"
                  >
                    {SUPPORT_ADDRESS}
                  </a>
                </p>
              </div>

              {/* right: certification + verification seal */}
              <div className="flex flex-col justify-center gap-8 border-t border-gold/15 bg-gradient-to-b from-gold/[0.05] to-transparent p-8 sm:p-10 lg:border-l lg:border-t-0">
                <div className="flex flex-col items-center text-center">
                  <GoldenSeal className="h-40 w-40 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]" />
                  <p className="font-display mt-4 text-sm font-bold tracking-[0.26em] text-gold">
                    TEOS CERTIFIED
                  </p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-white/45">
                    Every licence ships sealed and integrity-checked.
                  </p>
                </div>

                <div className="rounded-2xl border border-gold/20 bg-[#0A0A0A] p-5">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-xl bg-[#F5E9C8] p-2.5 shadow-[0_0_24px_rgba(212,175,55,0.25)]">
                      <QrCode className="w-24" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald">
                        Scan to verify
                      </p>
                      <p className="mt-1 text-[11.5px] leading-relaxed text-white/50">
                        SHA-256 of the shipped installer.
                      </p>
                      <p className="mt-2 font-mono text-[10px] text-white/40">
                        {RELEASE_FILE}
                      </p>
                    </div>
                  </div>
                  <code className="mt-3 block break-all rounded-lg border border-gold/15 bg-ink p-2.5 font-mono text-[9.5px] leading-relaxed text-gold/70">
                    {RELEASE_SHA256}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
