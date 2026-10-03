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
- Upgraded TypeScript to 5.x and Jest to 30; dropped `chai` and `ts-node`.
- The published package now only contains `build/`, `README.md` and `LICENSE`.
- Added `types` and `engines` (Node >= 18) fields to `package.json`.
- Switched from Yarn to npm and added GitHub Actions CI.
