# TEOS AI Gateway - Modifications

This project is a **modified version** of
[Free Claude Code](https://github.com/Alishahryar1/free-claude-code),
Copyright (c) 2026 Ali Khokhar, licensed under **AGPL-3.0-only**.

TEOS AI Gateway is an independent project. It is **not affiliated with, endorsed by,
or sponsored by** Anthropic, nor by the authors of Free Claude Code. "Claude" is a
trademark of Anthropic.

## Modifications made by TEOS

- Rebranded the user-visible surface to **TEOS AI Gateway** (Admin UI, desktop tray,
  the `--version` banner, and coding-agent provider names).
- Added an offline Windows bundle and installer (`packaging/`).
- Disabled the upstream `fcc-update` auto-update so this build is not silently replaced.
- Carried provider-routing, retry-budget, model-fallback, and crash-recovery hardening.

Date of modification: 2026-10-14.

## Planned (not yet implemented)

The following are planned and are **not** part of this build yet:

- Subscription and usage-credit (points) architecture.
- Multi-user accounts and quota management.
- Payment processing.
- Arabic user interface.

## License

This project remains licensed under **AGPL-3.0-only** (see `LICENSE`). The LICENSE
text is unchanged; line 1 only notes the TEOS modification. The complete Corresponding
Source is shipped with every distribution (bundle `source/`) and published at
https://github.com/Aymanseif/free-claude-code/tree/teos-ai-gateway
