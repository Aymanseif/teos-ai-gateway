import { Reveal, Eyebrow, OutlineButton } from './ui';
import CredlyBadge from './CredlyBadge';
import { IconQr, IconShieldCheck, IconLock } from './icons';
import { CREDLY_BADGE, RELEASE_SHA256, RELEASE_FILE } from './site';

const FACTS = [
  { icon: IconShieldCheck, k: 'Issued by', v: 'Anthropic' },
  { icon: IconLock, k: 'Credential', v: 'Claude Partner Badge — Claude Code' },
  { icon: IconQr, k: 'Verified views', v: '170+ and counting' },
];

export default function Trust() {
  return (
    <section id="trust" className="relative border-t border-gold/10 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(212,175,55,0.07),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Third-party verification</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-balance text-[clamp(1.8rem,4.6vw,3.2rem)] font-bold leading-[1.05]">
              <span className="text-gold-foil-static">Verified by Anthropic</span>{' '}
              <span className="text-white/70">&amp; Secured on Blockchain</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/55">
              The badge below is issued by Anthropic and hosted on Credly — not
              rendered from a screenshot. Release integrity is SHA-256 pinned and
              independently verifiable.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          {/* live Credly credential */}
          <Reveal delay={0.12} className="card-surface rounded-2xl p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
                Credly verified credential
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/40 bg-emerald/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                Live
              </span>
            </div>
            <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-gold/15 bg-white/[0.02] p-4">
              <CredlyBadge />
            </div>
            <a
              href={CREDLY_BADGE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline"
            >
              View badge on Credly →
            </a>
          </Reveal>

          {/* what it means + integrity */}
          <div className="flex flex-col gap-6">
            <Reveal delay={0.18} className="card-surface flex-1 rounded-2xl p-6 sm:p-8">
              <ul className="space-y-5">
                {FACTS.map(({ icon: Icon, k, v }) => (
                  <li key={k} className="flex items-start gap-4">
                    <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-gold/25 bg-gold/[0.07] text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-white/40">
                        {k}
                      </span>
                      <span className="font-display block text-[15px] font-semibold text-white/90">
                        {v}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.24} className="card-surface rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-emerald/30 bg-emerald/[0.08] text-emerald">
                  <IconQr className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-emerald">
                    On-chain integrity
                  </p>
                  <p className="mt-1.5 text-sm text-white/60">
                    The SHA-256 of <span className="text-white/85">{RELEASE_FILE}</span> is
                    pinned and scannable from the pricing seal.
                  </p>
                  <code className="mt-3 block break-all rounded-lg border border-gold/15 bg-ink/80 p-3 font-mono text-[10px] leading-relaxed text-gold/80">
                    {RELEASE_SHA256}
                  </code>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
