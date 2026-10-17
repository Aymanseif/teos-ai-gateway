# TEOS AI Gateway — Product Hunt Launch Copy

Copy/paste-ready launch copy. See [Consistency notes](#consistency-notes) at the end for two fixes.

## 1. Tagline (Product Hunt limit: 60 chars)

```
One installer to run 57 AIs & 11 coding agents. Local. Private.
```

## 2. Description (MAIN — use this)

```
Tired of 10 tabs, 10 keys, and 10 subscriptions just to code with AI?

TEOS AI Gateway is a single 11.2 MB Windows installer that unifies your entire AI stack.

→ 57 AI providers in one endpoint (OpenAI, Claude, Gemini, Groq, NVIDIA NIM, Ollama, OpenRouter + 52 more)
→ 11 coding agents natively (Claude Code, Codex, Cline, Roo Code, Aider, OpenCode, Pi, Hermes…)
→ Smart auto-fallback - if one provider fails, it switches instantly
→ Your keys stay local - AES-256 encrypted, never leaves your device
→ One-time purchase, no subscription
```

## 3. Maker's first comment

```
Tired of 10 tabs, 10 keys, and 10 subscriptions just to code with AI?

TEOS AI Gateway is a single 11.2 MB Windows installer that unifies your entire AI stack.

→ 57 AI providers in one endpoint (OpenAI, Claude, Gemini, Groq, NVIDIA NIM, Ollama, OpenRouter + 52 more)
→ 11 coding agents natively (Claude Code, Codex, Cline, Roo Code, Aider, OpenCode, Pi, Hermes…)
→ Smart auto-fallback - if one provider fails, it switches instantly
→ Your keys stay local - AES-256 encrypted, never leaves your device
→ One-time purchase, no subscription - $39 for the first 50 copies, then $99

Get it here: https://aamsmith3.gumroad.com/l/teos-ai-gateway
Source (AGPL-3.0): https://github.com/Aymanseif/teos-ai-gateway
```

## 4. Social / build-in-public post

```
Tired of 10 tabs, 10 keys, and 10 subscriptions just to code with AI?

TEOS AI Gateway is a single 11.2 MB Windows installer that unifies your entire AI stack.

→ 57 AI providers in one endpoint (OpenAI, Claude, Gemini, Groq, NVIDIA NIM, Ollama, OpenRouter + 52 more)
→ 11 coding agents natively (Claude Code, Codex, Cline, Roo Code, Aider, OpenCode, Pi, Hermes…)
→ Smart auto-fallback - if one provider fails, it switches instantly
→ Your keys stay local - AES-256 encrypted, never leaves your device
→ One-time purchase, no subscription - $39 for the first 50 copies, then $99

Get it here: https://aamsmith3.gumroad.com/l/teos-ai-gateway
Source (AGPL-3.0): https://github.com/Aymanseif/teos-ai-gateway

#AIAgents #ClaudeCode #OpenCode #Cline #Aider #Tauri #Rust #BuildInPublic
```

## Consistency notes

1. **Tagline is 63 characters — Product Hunt's limit is 60.** Suggested replacement (exactly 60):

   ```
   One installer for 57 AIs & 11 coding agents. Local. Private.
   ```

2. **"+ 52 more" does not add up.** The list names 7 providers, so `7 + 52 = 59`, not 57.
   Use "**+ 50 more**" to agree with the headline number and with the live landing page, which
   already says `OpenAI • Anthropic • Gemini • OpenRouter • Groq • Ollama • NVIDIA NIM • +50 more`.

3. **Provider count is inconsistent across the repo.** Pick one number and use it everywhere:

   | Location | Says |
   |---|---|
   | `README.md` | "56 ToS-friendly providers" |
   | `landing/index.html` | 7 named + "+50 more" = 57 |
   | Product Hunt tagline / card | 57 |

This file is excluded from the AGPL source archive via `.gitattributes` (marketing assets are not
part of the buyer's Corresponding Source, same as `landing/`).
