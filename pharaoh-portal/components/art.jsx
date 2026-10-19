/**
 * Hand-drawn Pharaonic artwork — all inline SVG so the page stays fast and
 * dependency-free. Swap FounderMedallion for a real <img> when a photo exists.
 */

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

/* ------------------------------------------------------------------ */
/* Golden pylon gate with colossi, obelisks and the winged sun disc    */
/* ------------------------------------------------------------------ */
export function PharaonicGate({ className = '' }) {
  return (
    <svg
      viewBox="0 0 900 540"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <defs>
        <linearGradient id="gateGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#8A6E1F" />
        </linearGradient>
      </defs>

      <g stroke="url(#gateGold)" strokeWidth="2" opacity="0.9">
        {/* winged sun disc (Ra / Behdety) */}
        <circle cx="450" cy="104" r="36" />
        <circle cx="450" cy="104" r="27" strokeWidth="1.2" />
        <path d="M414 96C370 78 320 76 268 92c52-4 104 0 146 12" strokeWidth="1.6" />
        <path d="M414 106c-46 2-92 10-126 26 42-14 88-20 126-20" strokeWidth="1.6" />
        <path d="M486 96c44-18 94-20 146-4-52-4-104 0-146 12" strokeWidth="1.6" />
        <path d="M486 106c46 2 92 10 126 26-42-14-88-20-126-20" strokeWidth="1.6" />

        {/* left pylon */}
        <path d="M150 470 188 150h128l22 320z" />
        <path d="M176 128h152" />
        <path d="M182 150 188 128M322 150 316 128" />
        <path d="M178 230h144M169 310h158M159 390h174" strokeWidth="1" opacity="0.55" />

        {/* right pylon */}
        <path d="M750 470 712 150H584l-22 320z" />
        <path d="M572 128h152" />
        <path d="M578 150 584 128M718 150 724 128" />
        <path d="M578 230h144M573 310h158M567 390h174" strokeWidth="1" opacity="0.55" />

        {/* gateway block + lintel */}
        <path d="M338 470V246h224v224" />
        <path d="M330 246h240M330 270h240" strokeWidth="1.4" />
        {/* doorway */}
        <path d="M392 470V302h116v168" strokeWidth="1.6" />
        <path d="M392 302h116" strokeWidth="2.4" />

        {/* obelisks */}
        <path d="M95 470V186M88 186v254M102 186v254" strokeWidth="1.6" />
        <path d="m86 186 9-26 9 26z" />
        <path d="M80 470h30v-28H80zM92 232h6M92 272h6M92 312h6M92 352h6" strokeWidth="1" />
        <path d="M805 470V186M798 186v254M812 186v254" strokeWidth="1.6" />
        <path d="m796 186 9-26 9 26z" />
        <path d="M790 470h30v-28h-30zM802 232h6M802 272h6M802 312h6M802 352h6" strokeWidth="1" />

        {/* seated colossi (Memnon-style) */}
        <g strokeWidth="1.6">
          <g transform="translate(196 312)">
            <path d="M8 4h56v140H8z" />
            <path d="M20 4h32l6 24H14z" />
            <path d="M24 28h24v22H24z" />
            <path d="M16 54h40v38H16z" />
            <path d="M20 70h32" strokeWidth="1" />
            <path d="M12 92h48v30H12z" />
            <path d="M8 122h56v22H8z" />
          </g>
          <g transform="translate(640 312)">
            <path d="M8 4h56v140H8z" />
            <path d="M20 4h32l6 24H14z" />
            <path d="M24 28h24v22H24z" />
            <path d="M16 54h40v38H16z" />
            <path d="M20 70h32" strokeWidth="1" />
            <path d="M12 92h48v30H12z" />
            <path d="M8 122h56v22H8z" />
          </g>
        </g>

        {/* stylobate + steps */}
        <path d="M120 470h660M104 490h692M88 510h724" strokeWidth="1.6" />
        <path d="M120 470v20M780 470v20M104 490v20M796 490v20" strokeWidth="1" opacity="0.5" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Founder medallion — placeholder silhouette inside a Pharaonic frame */
/* Replace the inner <svg> with <img src="/founder.jpg" .../> later.   */
/* ------------------------------------------------------------------ */
export function FounderMedallion({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {/* Horus wings wrapping the medallion */}
      <svg
        viewBox="0 0 520 260"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 text-gold/45"
        aria-hidden="true"
        {...STROKE}
      >
        <g strokeWidth="1.5">
          <path d="M258 96c-40-26-96-40-150-36 40 6 78 20 108 40" />
          <path d="M258 112c-52-18-118-24-176-8 48-4 96 4 140 22" />
          <path d="M258 128c-58-10-128-8-186 12 52-12 104-12 152 2" />
          <path d="M258 144c-56-2-124 6-176 28 50-16 100-20 146-10" />
          <path d="M262 96c40-26 96-40 150-36-40 6-78 20-108 40" />
          <path d="M262 112c52-18 118-24 176-8-48-4-96 4-140 22" />
          <path d="M262 128c58-10 128-8 186 12-52-12-104-12-152 2" />
          <path d="M262 144c56-2 124 6 176 28-50-16-100-20-146-10" />
        </g>
      </svg>

      {/* rings */}
      <div className="relative mx-auto aspect-square w-56 rounded-full bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.22),rgba(5,5,5,0.95)_70%)] p-[3px] shadow-gold-glow-lg sm:w-64">
        <div className="h-full w-full rounded-full border border-gold/50 p-[6px]">
          <div className="relative h-full w-full overflow-hidden rounded-full border border-gold/70 bg-ink">
            {/* sunburst rays behind the silhouette */}
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full text-gold/25"
              aria-hidden="true"
            >
              {Array.from({ length: 36 }).map((_, i) => {
                const a = (i / 36) * Math.PI * 2;
                return (
                  <line
                    key={i}
                    x1={100 + Math.cos(a) * 46}
                    y1={100 + Math.sin(a) * 46}
                    x2={100 + Math.cos(a) * 100}
                    y2={100 + Math.sin(a) * 100}
                    stroke="currentColor"
                    strokeWidth={i % 3 === 0 ? 1.6 : 0.8}
                  />
                );
              })}
            </svg>

            {/* PLACEHOLDER — swap for a real founder photograph */}
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full text-gold"
              role="img"
              aria-label="Founder portrait placeholder"
            >
              <defs>
                <linearGradient id="founderFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFD700" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#8A6E1F" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="150" r="62" fill="url(#founderFill)" />
              <circle cx="100" cy="84" r="30" fill="url(#founderFill)" />
            </svg>
          </div>
        </div>
      </div>

      {/* nemes bar beneath the medallion */}
      <div className="mx-auto mt-4 h-px w-40 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Official "TEOS Certified" wax-style golden seal                     */
/* ------------------------------------------------------------------ */
export function GoldenSeal({ className = '' }) {
  const ticks = Array.from({ length: 48 });
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="TEOS Certified — official seal"
    >
      <defs>
        <path id="sealArc" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        <linearGradient id="sealGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B8860B" />
          <stop offset="45%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>

      <g stroke="url(#sealGold)" strokeWidth="1.1">
        {ticks.map((_, i) => {
          const a = (i / ticks.length) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * 95}
              y1={100 + Math.sin(a) * 95}
              x2={100 + Math.cos(a) * 87}
              y2={100 + Math.sin(a) * 87}
            />
          );
        })}
      </g>

      <circle cx="100" cy="100" r="80" fill="none" stroke="url(#sealGold)" strokeWidth="2.4" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="url(#sealGold)" strokeWidth="0.9" />

      <text
        className="font-display"
        fill="url(#sealGold)"
        fontSize="11.5"
        fontWeight="700"
        letterSpacing="3.6"
      >
        <textPath href="#sealArc" startOffset="0%">
          TEOS CERTIFIED · OFFICIAL SEAL · ELMAHROSA
        </textPath>
      </text>

      {/* eye of Horus */}
      <g
        transform="translate(100 88) scale(1.5)"
        stroke="url(#sealGold)"
        fill="none"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M-8 -0.5c2.6-3.2 6.6-4.4 10-2.6 1.5.8 3 1.3 4.8 1.3" />
        <path d="M-8 -0.5c2 2.7 5.3 4 8.6 3" />
        <circle cx="-4.6" cy="-0.8" r="1.6" />
        <path d="M-4.4 2.6 -5.8 7.6" />
        <path d="M0.4 2c.1 2 1.6 3.3 3.7 3" />
      </g>

      <text
        x="100"
        y="122"
        textAnchor="middle"
        className="font-display"
        fill="url(#sealGold)"
        fontSize="15"
        fontWeight="800"
        letterSpacing="3"
      >
        TEOS
      </text>
      <text
        x="100"
        y="136"
        textAnchor="middle"
        className="font-sans"
        fill="url(#sealGold)"
        fontSize="8"
        fontWeight="600"
        letterSpacing="3.4"
      >
        CERTIFIED
      </text>
      <text
        x="100"
        y="150"
        textAnchor="middle"
        className="font-sans"
        fill="url(#sealGold)"
        fontSize="6.2"
        letterSpacing="2.2"
      >
        ALEXANDRIA · EGYPT
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Egyptian flag                                                       */
/* ------------------------------------------------------------------ */
export function EgyptianFlag({ className = '' }) {
  return (
    <svg viewBox="0 0 27 18" className={className} role="img" aria-label="Flag of Egypt">
      <rect width="27" height="6" y="0" fill="#CE1126" />
      <rect width="27" height="6" y="6" fill="#FFFFFF" />
      <rect width="27" height="6" y="12" fill="#000000" />
      {/* simplified Eagle of Saladin */}
      <g fill="#C09300" transform="translate(13.5 9)">
        <path d="M0 -3.4c1 0 1.7.6 2 1.5l1.8-.6-1.5 1.6 2.3.7-2 .6.9 1.2-2.1-.3.3 1.5H-1.9l.3-1.5-2.1.3.9-1.2-2-.6 2.3-.7L-3.8 -2.5l1.8.6c.3-.9 1-1.5 2-1.5z" />
        <path d="M-3.4 3.1h6.8v.5h-6.8z" opacity="0.85" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Large decorative Eye of Horus                                       */
/* ------------------------------------------------------------------ */
export function EyeOfHorusLarge({ className = '' }) {
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden="true" {...STROKE}>
      <defs>
        <linearGradient id="horusGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      <g stroke="url(#horusGold)" strokeWidth="3.2">
        <path d="M18 58c26-34 70-48 106-30 18 9 36 14 58 14" />
        <path d="M18 58c20 28 56 42 92 31" />
        <circle cx="68" cy="55" r="16" />
        <circle cx="68" cy="55" r="6" fill="url(#horusGold)" />
        <path d="M70 92 56 118" />
        <path d="M114 84c1 22 17 34 40 31" />
        <path d="M30 30c36-24 88-28 126-6" strokeWidth="2.4" />
      </g>
    </svg>
  );
}
