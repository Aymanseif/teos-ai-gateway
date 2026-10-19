/** Single source of truth for every link, price and identifier on the page. */

export const GUMROAD =
  'https://aamsmith3.gumroad.com/l/teos-ai-gateway?wanted=true';
export const GITHUB_REPO = 'https://github.com/Elmahrosa/teos-ai-gateway';
export const GITHUB_ORG = 'https://github.com/Elmahrosa';
export const PRODUCT_HUNT = 'https://www.producthunt.com/posts/teos-ai-gateway';
export const CREDLY_BADGE =
  'https://www.credly.com/badges/f14c9ae0-c594-4cf8-af37-398545f5b75f/public_url';

export const SUPPORT_ADDRESS = 'support@teos.elmahrosa.org';
export const SUPPORT_MAIL = `mailto:${SUPPORT_ADDRESS}`;

export const PRICE_LABEL = '$299';
export const PRICE_CTA = 'Get Lifetime License — $299';

export const VERSION = 'v5.1.0';

/** Real SHA-256 of TEOS-AI-Gateway-Windows-1.0.0.zip — what the QR encodes. */
export const RELEASE_FILE = 'TEOS-AI-Gateway-Windows-1.0.0.zip';
export const RELEASE_SHA256 =
  '31B82FF8DD70FEF4DDB1784C3BA127F116A6B03D12C2250FEE9CBDE188C049D7';
export const QR_PAYLOAD = `SHA256:${RELEASE_SHA256}`;

export const BADGE_ID = 'f14c9ae0-c594-4cf8-af37-398545f5b75f';

export const NAV_LINKS = [
  { href: '#trust', label: 'Verified' },
  { href: '#products', label: 'Products' },
  { href: '#security', label: 'Security' },
  { href: '#pricing', label: 'Pricing' },
];
