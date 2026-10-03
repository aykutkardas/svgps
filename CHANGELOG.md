# Changelog

## 0.9.0

### Fixes

- `parse` is now available as a named export (`import { parse } from 'svgps'`), as documented in the README. The default export still works.
- `circleToPath`, `rectToPath`, `polygonToPath` and `lineToPath` are now exported at runtime (they were previously exported as types only).
- `width`/`height` are now derived correctly from `viewBox` when the `<svg>` has no `width`/`height` attributes (previously returned `NaN`).
- `viewBox` values separated by commas or multiple spaces are now parsed correctly.
- The `icomoon` template no longer throws when the SVG has no `viewBox`.
- `circleToPath` no longer produces `NaN` when `r` is missing.

### Maintenance

- Removed the `lodash` dependency (fixes vulnerable `lodash` versions in the dependency tree).
- Upgraded `muninn` to `^1.0.0` and `svgpath` to `^2.6.0`.
- Upgraded TypeScript to 5.x; replaced Jest + Babel with Vitest; dropped `chai` and `ts-node`.
- The published package now only contains `build/`, `README.md` and `LICENSE`.
- Added `types` and `engines` fields to `package.json`.
- **Requires Node >= 20.18.1** (inherited from `cheerio` 1.x via `muninn` 1.0). Node 18 is end-of-life.
- Switched from Yarn to npm and added GitHub Actions CI.
- Rewrote the README (accurate examples, API reference, working badges).
