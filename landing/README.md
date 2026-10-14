# TEOS AI Gateway — landing page

A single static page (`index.html`) that links to your Gumroad product.

## 1. Set your Gumroad URL (required)

The buttons currently point at a placeholder:

```
https://gumroad.com/l/teos-ai-gateway
```

Replace **every** occurrence with your real Gumroad product link. From this folder:

```powershell
(Get-Content index.html -Raw).Replace('https://gumroad.com/l/teos-ai-gateway', 'YOUR-REAL-GUMROAD-URL') | Set-Content index.html -NoNewline
```

## 2. Preview locally

Just open `index.html` in a browser, or serve it:

```powershell
npx serve .
```

## 3. Deploy to Vercel (static — takes ~1 minute)

### Option A — Vercel CLI (fastest)

```powershell
npx vercel login          # once
npx vercel deploy --prod  # run from this landing/ folder
```

### Option B — Vercel dashboard

1. Push this folder to a Git repo (or use the existing repo).
2. vercel.com → **Add New… → Project** → import the repo.
3. Set **Root Directory** to `landing`.
4. Framework Preset: **Other**. Build Command: *(empty)*. Output Directory: *(empty)*.
5. Deploy, then add your custom domain under **Settings → Domains**.

## Notes

- `og.png` and `favicon.ico` are already wired up for social sharing.
- Tailwind is loaded from the Play CDN for zero-build speed. When you want a
  production build, move to a Tailwind CLI/PostCSS build — not required to launch.
- Keep the AGPL attribution in the footer (it is legally required and already present).
- Update the support email: replace `hello@example.com` in `index.html`.
