'use client';

import { useEffect, useRef } from 'react';

/**
 * Credly credential embed.
 *
 * The markup below is the exact snippet supplied for the badge, inlined so it
 * ships verbatim in the static HTML (the browser executes the async script on
 * first parse). The effect is only a safety net for client-side navigation:
 * it injects the same script if the static snippet somehow was not parsed.
 */
const SNIPPET = `<div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="f14c9ae0-c594-4cf8-af37-398545f5b75f" data-share-badge-host="https://www.credly.com"></div><script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>`;

export default function CredlyBadge({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const already =
      document.querySelector(
        'script[src*="credly.com/assets/utilities/embed.js"]',
      ) !== null;
    if (already) return;
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://cdn.credly.com/assets/utilities/embed.js';
    document.body.appendChild(s);
    return () => {};
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: SNIPPET }}
    />
  );
}
