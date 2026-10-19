/**
 * Pharaonic line icons — 24x24, stroke-based, consistent weight.
 * Each core product gets a distinct ancient-Egypt symbol.
 */

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

/** Ankh — keys of life → Sovereign Wallet */
export function IconAnkh(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="5.2" r="3.4" />
      <path d="M12 8.6V21" />
      <path d="M7.6 12.4h8.8" />
    </svg>
  );
}

/** Feather of Ma'at — truth & justice → Comply Crawl */
export function IconFeather(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21V7.5" />
      <path d="M12 7.5C12 4 14.6 1.6 18.5 1.2c-.4 4-3 6.6-6.5 6.9z" />
      <path d="M12 12.2C12 8.7 9.4 6.3 5.5 5.9c.4 4 3 6.6 6.5 6.9z" />
      <path d="M12 16.4c0-2 1.4-3.6 3.6-4" />
    </svg>
  );
}

/** Eye of Horus (Wadjet) — protection & watch → Sentinel Shield */
export function IconEyeOfHorus(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2.2 12.2c3.2-4.2 8.4-5.8 12.6-3.6 2.1 1.1 4.3 1.7 6.9 1.7" />
      <path d="M2.2 12.2c2.4 3.4 6.6 5 10.8 3.7" />
      <circle cx="8.2" cy="11.6" r="2.2" />
      <path d="M8.4 15.9 6.7 21.6" />
      <path d="M13.6 15.1c.1 2.6 2 4.2 4.7 3.8" />
      <path d="M3.6 7.3c4.4-3 10.6-3.4 14.8-.7" />
    </svg>
  );
}

/** Djed pillar — stability & unity → UnityCare */
export function IconDjed(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7.6 3.6h8.8" />
      <path d="M8.4 6.7h7.2" />
      <path d="M8.4 9.8h7.2" />
      <path d="M8.4 12.9h7.2" />
      <path d="M12 13v5.2" />
      <path d="M6.8 19h10.4" />
      <path d="M8.4 3.6v9.3" />
      <path d="M15.6 3.6v9.3" />
    </svg>
  );
}

/** Lotus — the Nile, renewal, civic life → Civic Mixer */
export function IconLotus(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21v-5" />
      <path d="M12 16c-3.6 0-6.6-2.4-7.4-5.6 2.9.4 5.4 1.7 7.4 3.6" />
      <path d="M12 16c3.6 0 6.6-2.4 7.4-5.6-2.9.4-5.4 1.7-7.4 3.6" />
      <path d="M12 14c-1.7-1.9-2.4-4.3-2-6.8 1.5 1.5 2.1 3.6 2 5.4" />
      <path d="M12 14c1.7-1.9 2.4-4.3 2-6.8-1.5 1.5-2.1 3.6-2 5.4" />
      <path d="M12 7.4c-.9-1.5-.9-3.2 0-4.8.9 1.6.9 3.3 0 4.8z" />
    </svg>
  );
}

/** Pyramid — monuments rebuilt → Digital Reconstruction of Gaza */
export function IconPyramid(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 2.6 20.6h18.8L12 3z" />
      <path d="M12 3v17.6" />
      <path d="M7.4 11.8 12 20.6l4.6-8.8" />
    </svg>
  );
}

/** Scarab — investigation & transformation → Labs Due Diligence MCP */
export function IconScarab(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="4.9" r="2.3" />
      <ellipse cx="12" cy="14.6" rx="5.3" ry="6.4" />
      <path d="M12 8.3v12.7" />
      <path d="M6.7 14.6h10.6" />
      <path d="M6.9 10.4 3 7.4" />
      <path d="M17.1 10.4 21 7.4" />
      <path d="M6.9 18.6 3.4 21" />
      <path d="M17.1 18.6 20.6 21" />
    </svg>
  );
}

/** Was scepter — dominion & power → Sentinel Stack */
export function IconWasScepter(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20.2V8.4" />
      <path d="M9.4 22.4 12 20.2l2.6 2.2" />
      <path d="M12 8.4 9.2 4.4" />
      <path d="M9.2 4.4 4.4 3.2" />
      <path d="M9.2 4.4 10.6 1.6" />
      <path d="M12 12.4h3.4" />
    </svg>
  );
}

/** Sun disc (Ra) with rays — the TEOS core at centre */
export function IconSunDisc(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="8.4" strokeDasharray="2.4 3" />
      <path d="M12 1.4v2.2M12 20.4v2.2M1.4 12h2.2M20.4 12h2.2" />
      <path d="M4.5 4.5 6.1 6.1M17.9 17.9l1.6 1.6M19.5 4.5l-1.6 1.6M6.1 17.9l-1.6 1.6" />
    </svg>
  );
}

/** Cartouche — royal name enclosure → brand mark */
export function IconCartouche(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="6.5" width="18" height="11" rx="5.5" />
      <path d="M6.6 6.5v11" />
      <path d="M12 9.6v4.8" />
      <path d="M9.8 12h4.4" />
    </svg>
  );
}

/** GitHub Actions: repo valuation gauge */
export function IconGauge(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3.6 17.4a9 9 0 1 1 16.8 0" />
      <path d="M12 17.4 16 10" />
      <circle cx="12" cy="17.4" r="1.5" />
      <path d="M12 4.2v1.8M4.6 8.2l1.5.9M19.4 8.2l-1.5.9" />
    </svg>
  );
}

/** Shield with check — guard / security rules */
export function IconShieldCheck(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.4 4.4 5.4v6c0 4.6 3.2 8.4 7.6 10.2 4.4-1.8 7.6-5.6 7.6-10.2v-6L12 2.4z" />
      <path d="M8.6 11.8 11 14.2l4.4-4.6" />
    </svg>
  );
}

/** Lock — zero-trust / encryption */
export function IconLock(props) {
  return (
    <svg {...base} {...props}>
      <rect x="4.6" y="10.4" width="14.8" height="10.2" rx="2" />
      <path d="M8 10.4V7.6a4 4 0 0 1 8 0v2.8" />
      <path d="M12 14.4v2.6" />
    </svg>
  );
}

/** Network / shielded nodes — sovereign & independent */
export function IconSovereign(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="4.6" r="2.2" />
      <circle cx="5" cy="17.4" r="2.2" />
      <circle cx="19" cy="17.4" r="2.2" />
      <path d="M10.5 6.4 6.4 15.6M13.5 6.4l4.1 9.2M7.2 17.4h9.6" />
    </svg>
  );
}

/** Skull-blocked — blocks hackers & malware */
export function IconBlockThreat(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.6c-3.6 0-6.4 2.6-6.4 6 0 2.1 1 3.6 2.2 4.7v2.5h8.4v-2.5c1.2-1.1 2.2-2.6 2.2-4.7 0-3.4-2.8-6-6.4-6z" />
      <circle cx="9.6" cy="9.4" r="1.4" />
      <circle cx="14.4" cy="9.4" r="1.4" />
      <path d="M9.6 18.6 7 21.4M14.4 18.6l2.6 2.8" />
      <path d="M4.4 4.4 19.6 19.6" />
    </svg>
  );
}

/** QR glyph — blockchain / checksum verification */
export function IconQr(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.4" y="3.4" width="6.4" height="6.4" rx="1" />
      <rect x="14.2" y="3.4" width="6.4" height="6.4" rx="1" />
      <rect x="3.4" y="14.2" width="6.4" height="6.4" rx="1" />
      <path d="M14.2 14.2h2.6v2.6h-2.6zM18.4 18.4h2.2v2.2h-2.2zM14.2 20.6h2.2M20.6 14.2v2.2" />
    </svg>
  );
}
