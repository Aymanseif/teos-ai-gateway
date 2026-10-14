# Packaging — TEOS AI Gateway offline Windows bundle

Builds the shippable **TEOS AI Gateway** Windows distribution from this repository.

TEOS AI Gateway is a modified version of
[Free Claude Code](https://github.com/Alishahryar1/free-claude-code)
(AGPL-3.0-only). See the repository root `LICENSE` and `packaging/installer/NOTICE.md`.

## Build

Requires `uv`, `git`, and PowerShell 5.1+. From this `packaging/` folder:

```powershell
powershell -ExecutionPolicy Bypass -File .\Build-OfflineBundle.ps1 -IncludeSource -Version 1.0.0
```

`-IncludeSource` is required for a shippable build: the repository is private, so the
Corresponding Source must travel inside the ZIP (see the release checklist below).

| Parameter | Default | Meaning |
|---|---|---|
| `-RepoPath` | repo root (auto-detected) | checkout to build from |
| `-Version` | `1.0.0` | product version stamped into the build |
| `-OutDir` | `.\packaging\dist` | output directory |
| `-SkipBuild` | — | reuse an existing `dist\build` |
| `-IncludeSource` | off | bundle the sdist + full source ZIP inside the package |
| `-SupportEmail` | `AYMAN@TEOSEGYPT.COM` | support address written into the license notices |

The script builds a wheel + sdist with `SETUPTOOLS_SCM_PRETEND_VERSION=<Version>` so the
sold product carries a clean version instead of the git-derived development version,
then packs everything into a single ZIP.

## Output

```
packaging/dist/TEOS-AI-Gateway-Windows-<version>.zip
  Install-TEOS-AI-Gateway.ps1        offline installer
  dist\*.whl  dist\*.tar.gz     application package
  source\*-source.zip           full Corresponding Source (AGPL-3.0 §4/§6)
  LICENSE                       AGPL-3.0-only, verbatim
  NOTICE.md                     modification notice (§5a) + source pointer (§13)
  README-INSTALL.txt            buyer instructions
  app-icon.ico                  shortcut icon
```

## What the installer does

1. Installs the bundled wheel with `uv tool install` (Python 3.14.7).
2. Replaces the `teos-update` command with a no-op stub in the bin dir and the tool
   `Scripts` dir (and neutralises a leftover upstream `fcc-update` only if one is
   already present), so automatic updates can never replace this build with the
   original Free Claude Code.
3. Adds a `teos` command, on top of the real `teos-server`, `teos-doctor` and
   `teos-<agent>` commands that the wheel installs.
4. Creates Desktop + Start Menu shortcuts (add `-Startup` for launch at sign-in).

`-DryRun` prints the plan without changing anything.

## Release checklist (AGPL — do not skip)

- [ ] `-Version` bumped; date of modification in `NOTICE.md` updated.
- [ ] Full Corresponding Source is included (`source\*-source.zip`).
- [ ] Buyers can obtain the source (bundle `source\`, and/or a source URL in `NOTICE.md`).
- [ ] If hosted as a network service, offer the Corresponding Source to users (§13).
- [ ] Upstream attribution (LICENSE + GitHub link) preserved.
- [ ] No implication of endorsement by the original author or Anthropic.

## Notes

- The internal distribution name remains `free-claude-code` (the upstream AGPL package
  name); only the visible product surface is rebranded.
- First install needs internet for `uv`, Python 3.14.7, and Python dependencies; the
  application itself installs from the bundled wheel — not from PyPI or GitHub.
