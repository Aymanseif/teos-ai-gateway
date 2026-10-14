# NOTICE — TEOS AI Gateway

**TEOS AI Gateway** is a **modified version** of
[Free Claude Code](https://github.com/Alishahryar1/free-claude-code),
Copyright (c) 2026 **Ali Khokhar**, licensed under the
**GNU Affero General Public License v3.0 only (AGPL-3.0-only)**.

The original license text is included verbatim as `LICENSE` in this bundle.

## Modification notice (AGPL-3.0 §5a)

This distribution is a modified version of the original work. Modifications were made
by the TEOS AI Gateway distributor and include, at minimum:

- Rebranding of user-visible names (Admin UI title/heading, desktop tray name,
  `--version` banner, and coding-agent provider display names) to "TEOS AI Gateway".
- An offline Windows installer and bundled distribution packaging (this bundle).
- Disabling of the bundled auto-update command (`teos-update` is a no-op in this
  build) so this build is not silently replaced by an upstream release.
- Renaming of the installed command-line commands from the upstream `fcc-*` names to
  the `teos-*` names (`teos`, `teos-server`, `teos-doctor`, and one command per
  supported coding agent: `teos-claude`, `teos-codex`, `teos-opencode`, ...). The
  Python package, distribution name, and `~/.fcc` data directory are unchanged.
- Provider-routing, retry-budget, fallback, and crash-recovery changes carried from the
  distributor's fork.

**Date of modification:** 2026-10-14

## Corresponding Source (AGPL-3.0 §4, §6, §13)

The complete Corresponding Source for this build is **included in this bundle**:

    source\TEOS-AI-Gateway-Windows-<version>-source.zip

It contains the full source tree and the exact build commit recorded in `SOURCE.txt`.
When present, `dist\<sdist>` holds the matching source distribution as well.

**Written offer (AGPL-3.0 §6).** For at least three years from your purchase we
will provide the Corresponding Source for this build, on request and at no charge.
Email `AYMAN@TEOSEGYPT.COM` quoting the build commit recorded in `SOURCE.txt`.

Keep `LICENSE`, `NOTICE.md` and `SOURCE.txt` with the software and pass them on to
anyone who receives it, as required by AGPL-3.0.

If you run a modified version of this software as a network service, AGPL-3.0 §13
requires you to offer the Corresponding Source to the users interacting with it.

## Trademarks

"Claude" is a trademark of Anthropic. This project is **not** affiliated with, endorsed
by, or sponsored by Anthropic, nor by the authors of Free Claude Code.

## No warranty

Provided "as is", without warranty of any kind, as set out in the AGPL-3.0 text.
