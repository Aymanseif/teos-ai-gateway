import { Cinzel, Inter, Noto_Kufi_Arabic } from 'next/font/google';
import './globals.css';

const display = Cinzel({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const arabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata = {
  title: 'Pharaoh Teos Portal — Elmahrosa Sovereign Ecosystem',
  description:
    'TEOS Sovereign Wallet — heart of the organization. 57 AI provider orchestration, 312 GPU nodes, zero-trust architecture, 99.999% uptime. Built in Alexandria, Egypt.',
  keywords: [
    'TEOS',
    'Elmahrosa',
    'Pharaoh Teos Portal',
    'Sovereign Wallet',
    'AI gateway',
    'zero-trust',
    'Alexandria Egypt',
  ],
  openGraph: {
    title: 'Pharaoh Teos Portal — Elmahrosa Sovereign Ecosystem',
    description:
      'Sovereign Wallet · 57 AI Providers · 312 GPU Nodes · Zero-Trust · 99.999% Uptime. Built in Alexandria, Egypt.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${arabic.variable}`}>
      <body className="bg-ink text-white font-sans antialiased selection:bg-gold/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
