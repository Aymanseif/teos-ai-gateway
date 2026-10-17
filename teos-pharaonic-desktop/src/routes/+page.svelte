<script>
  import { onMount } from "svelte";
  import { invoke } from "@tauri-apps/api/core";
  import { openUrl } from "@tauri-apps/plugin-opener";

  const ADMIN_URL = "http://127.0.0.1:8082/admin";

  let splash = $state(true);
  let loading = $state(true);
  let starting = $state(false);
  let startError = $state("");
  let st = $state(null);

  const online = $derived(!!st?.online);

  async function refresh() {
    try {
      st = await invoke("gateway_status");
    } catch (e) {
      st = {
        online: false,
        error: String(e),
        providers: { total: 0, configured: 0, missing_key: 0, disconnected: 0, other: 0 },
        models: 0,
      };
    }
    loading = false;
  }

  async function startGateway() {
    starting = true;
    startError = "";
    try {
      await invoke("start_gateway");
    } catch (e) {
      startError = String(e);
    }
    // Only believe it worked if /health actually answers within ~20s.
    for (let i = 0; i < 20; i++) {
      await new Promise((r) => setTimeout(r, 1000));
      await refresh();
      if (st?.online) break;
    }
    starting = false;
  }

  function openAdmin() {
    openUrl(ADMIN_URL);
  }

  onMount(() => {
    refresh();
    const t = setTimeout(() => (splash = false), 1150);
    const iv = setInterval(refresh, 5000);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  });
</script>

{#if splash}
  <div class="splash">
    <div class="doors">
      <div class="door left"></div>
      <div class="door right"></div>
    </div>
    <div class="glyph">𓂀 TEOS 𓋹</div>
  </div>
{/if}

<div class="app">
  <header>
    <div class="brand">
      <span class="eye">𓂀</span>
      <span class="wordmark">TEOS AI GATEWAY</span>
    </div>
    <div class="pill {online ? 'up' : 'down'}">
      <span class="dot"></span>
      {online ? "ONLINE" : "OFFLINE"} · localhost:8082
    </div>
  </header>

  <section class="hero">
    {#if loading}
      <div class="big">…</div>
      <p class="sub">بنتكلّم مع البوابة</p>
    {:else if online}
      <div class="big">{st.providers.total}</div>
      <p class="sub">
        مزوّد في البوابة · <b class="gold">{st.providers.configured}</b> مُهيّأ على جهازك
      </p>
      <p class="meta">
        النشِط: <b>{st.provider}</b>
        {#if st.model}<span class="dim"> · {st.model}</span>{/if}
        · <span class="dim">{st.models} موديل متاح</span>
      </p>
    {:else}
      <div class="big off">—</div>
      <p class="sub">البوابة مش شغالة</p>
      <p class="meta dim">شغّل المزوّد، وبعدين اعمل Refresh. الأرقام بتظهر بس لما تكون شغالة فعلاً.</p>
    {/if}

    <div class="actions">
      {#if online}
        <button class="primary" onclick={openAdmin}>افتح بوابة المحروسة</button>
        <button class="ghost" onclick={refresh} disabled={loading}>تحديث</button>
      {:else}
        <button class="primary" onclick={startGateway} disabled={starting}>
          {starting ? "بيشتغل…" : "شغّل بوابة المحروسة"}
        </button>
        <button class="ghost" onclick={refresh} disabled={loading}>تحديث</button>
      {/if}
    </div>
    {#if startError}<p class="err">{startError}</p>{/if}
  </section>

  <section class="cards">
    <article class="card">
      <h3>⚡ الذكاء الاصطناعي</h3>
      {#if online}
        <p>
          كتالوج بـ <b>{st.providers.total}</b> مزوّد و<b>{st.models}</b> موديل،
          و<b>{st.providers.configured}</b> جاهزين على جهازك دلوقتي.
        </p>
        <p class="dim small">
          <b class="gold">{st.providers.configured}</b> مُهيّأ ·
          {st.providers.missing_key} ناقص مفتاح ·
          {st.providers.disconnected} غير متصل ·
          {st.providers.other} أخرى
        </p>
      {:else}
        <p class="dim">لما البوابة تشتغل، هنا تظهر أعداد المزوّدين والموديلات الحقيقية.</p>
      {/if}
    </article>

    <article class="card">
      <h3>🧰 الأدوات</h3>
      <p>
        إعداد المزوّدين، كتالوج الموديلات، وجلسات الكود — كلها من الواجهة الإدارية
        اللي شغالة محليًا على جهازك.
      </p>
      <p class="dim small">مفيش أي حاجة بتتنقل للسحابة: كل ده localhost.</p>
    </article>

    <article class="card gold">
      <h3>🛡️ الحماية</h3>
      <p>
        مفاتيحك بتفضل على جهازك (BYOK). والـ Admin API <b>محلي فقط</b> — بيرفض أي
        طلب جاي بـ Origin خارجي (وده متأكد منه: بيرجّع
        <code>Admin UI is local-only</code>).
      </p>
      <p class="dim small">وكمان مزوّدين محليين زي Ollama / LM Studio / llama.cpp.</p>
    </article>
  </section>

  <footer>
    {#if st?.error}
      <span class="dim">آخر خطأ: {st.error}</span>
    {:else}
      <span class="dim">TEOS AI Gateway · v1.0.0 · offline-first</span>
    {/if}
  </footer>
</div>

<style>
  :global(html, body) {
    margin: 0;
    background: #0a0a0a;
    color: #f2f2f2;
    font-family: "Segoe UI", Tahoma, sans-serif;
  }
  :global(*, *::before, *::after) {
    box-sizing: border-box;
  }

  /* ---------- splash: temple doors ---------- */
  .splash {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: #0a0a0a;
    display: grid;
    place-items: center;
    overflow: hidden;
  }
  .doors {
    position: absolute;
    inset: 0;
  }
  .door {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 52%;
    background: linear-gradient(180deg, #17130a, #0c0a06);
    box-shadow: inset 0 0 80px rgba(212, 175, 55, 0.18);
  }
  .door.left {
    left: 0;
    border-right: 1px solid rgba(212, 175, 55, 0.6);
    animation: openLeft 1.05s cubic-bezier(0.7, 0, 0.25, 1) forwards;
  }
  .door.right {
    right: 0;
    border-left: 1px solid rgba(212, 175, 55, 0.6);
    animation: openRight 1.05s cubic-bezier(0.7, 0, 0.25, 1) forwards;
  }
  @keyframes openLeft {
    to {
      transform: translateX(-102%);
    }
  }
  @keyframes openRight {
    to {
      transform: translateX(102%);
    }
  }
  .glyph {
    position: relative;
    z-index: 2;
    font-size: 44px;
    letter-spacing: 6px;
    color: #d4af37;
    text-shadow: 0 0 24px rgba(212, 175, 55, 0.55);
    animation: glyph 1.05s ease forwards;
  }
  @keyframes glyph {
    0% {
      opacity: 0;
      transform: scale(0.94);
    }
    35% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  /* ---------- shell ---------- */
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background:
      radial-gradient(900px 380px at 50% -140px, rgba(212, 175, 55, 0.1), transparent 70%),
      #0a0a0a;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 26px;
    border-bottom: 1px solid #1d1a12;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .eye {
    color: #d4af37;
    font-size: 22px;
  }
  .wordmark {
    letter-spacing: 3px;
    font-size: 14px;
    color: #d4af37;
    font-weight: 700;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 999px;
    border: 1px solid #2a2519;
    color: #9a9a9a;
    direction: ltr;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #666;
  }
  .pill.up {
    border-color: rgba(0, 255, 136, 0.35);
    color: #00ff88;
  }
  .pill.up .dot {
    background: #00ff88;
    box-shadow: 0 0 10px #00ff88;
  }
  .pill.down {
    border-color: rgba(255, 90, 90, 0.3);
    color: #ff7a7a;
  }
  .pill.down .dot {
    background: #ff5a5a;
  }

  .hero {
    text-align: center;
    padding: 44px 24px 26px;
  }
  .big {
    font-size: 84px;
    line-height: 1;
    font-weight: 800;
    color: #d4af37;
    text-shadow: 0 0 40px rgba(212, 175, 55, 0.35);
    font-variant-numeric: tabular-nums;
  }
  .big.off {
    color: #3a3a3a;
    text-shadow: none;
  }
  .sub {
    margin: 12px 0 4px;
    font-size: 15px;
    color: #cfcfcf;
  }
  .gold {
    color: #d4af37;
  }
  .meta {
    margin: 4px 0 0;
    font-size: 13px;
    color: #bdbdbd;
    direction: ltr;
  }
  .dim {
    color: #7a7a7a;
  }
  .small {
    font-size: 12px;
  }
  .err {
    color: #ff7a7a;
    font-size: 12px;
    margin-top: 12px;
  }

  .actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 24px;
  }
  button {
    font: inherit;
    cursor: pointer;
    border-radius: 10px;
    padding: 12px 26px;
    border: 1px solid #d4af37;
    background: transparent;
    color: #d4af37;
    font-weight: 700;
    transition: 0.15s;
  }
  button.primary {
    background: linear-gradient(180deg, #e9c975, #d4af37);
    color: #14110a;
  }
  button.ghost {
    border-color: #2a2519;
    color: #9a9a9a;
  }
  button:disabled {
    opacity: 0.55;
    cursor: default;
  }
  button:not(:disabled):hover {
    filter: brightness(1.08);
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 8px 26px 26px;
  }
  .card {
    background: linear-gradient(160deg, #141414, #0d0d0d);
    border: 1px solid #262626;
    border-radius: 14px;
    padding: 20px;
  }
  .card.gold {
    border-color: rgba(212, 175, 55, 0.45);
  }
  .card h3 {
    margin: 0 0 10px;
    font-size: 16px;
    color: #d4af37;
  }
  .card p {
    margin: 0 0 8px;
    font-size: 13px;
    line-height: 1.7;
    color: #c9c9c9;
  }
  .card code {
    direction: ltr;
    display: inline-block;
    background: #000;
    border: 1px solid #2a2a2a;
    border-radius: 5px;
    padding: 1px 6px;
    font-size: 11px;
    color: #00d4ff;
  }

  footer {
    margin-top: auto;
    padding: 12px 26px;
    border-top: 1px solid #161616;
    font-size: 12px;
  }

  @media (max-width: 900px) {
    .cards {
      grid-template-columns: 1fr;
    }
    .big {
      font-size: 64px;
    }
  }
</style>
