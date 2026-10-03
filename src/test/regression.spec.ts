import { describe, it, expect } from 'vitest';
import svgps, {
  parse,
  circleToPath,
  rectToPath,
  polygonToPath,
  lineToPath,
} from '../lib';
import type { Icon, IcomoonIcon } from '../lib';

describe('Exports', () => {
  it('exposes parse as both named and default export', () => {
    expect(typeof parse).toBe('function');
    expect(svgps).toBe(parse);
  });

  it('exposes the shape utils at runtime', () => {
    expect(circleToPath({ cx: 1, cy: 1, r: 1 })).toBe(
      'M 1 1 m -1, 0a 1 1 0 1 0 2 0a 1 1 0 1 0 -2 0',
    );
    expect(rectToPath({ x: 0, y: 0, width: 2, height: 2 })).toBe(
      'M 0 0, 0 2, 2 2, 2 0, 0 0',
    );
    expect(polygonToPath('0 0 1 1')).toBe('M0 0 1 1');
    expect(lineToPath({ x1: 0, y1: 0, x2: 1, y2: 1 })).toBe('M 0 0, 1 1');
  });
});

describe('viewBox', () => {
  it('derives width/height from viewBox when attributes are missing', () => {
    const result = parse(
      '<svg viewBox="0 0 24 32"><path d="M0 0h1"/></svg>',
    ) as Icon;
    expect(result.width).toBe(24);
    expect(result.height).toBe(32);
  });

  it('accepts comma and multi-space separated viewBox values', () => {
    const result = parse(
      '<svg viewBox="0,0,  48 , 16"><path d="M0 0h1"/></svg>',
    ) as Icon;
    expect(result.width).toBe(48);
    expect(result.height).toBe(16);
  });

  it('icomoon template works without a viewBox', () => {
    const result = parse(
      '<svg width="32" height="32"><path d="M0 0h32"/></svg>',
      { template: 'icomoon' },
    ) as IcomoonIcon;
    expect(result.icon.width).toBe(1024);
    expect(result.icon.paths).toEqual(['M0 0h1024']);
  });
});

describe('circleToPath', () => {
  it('does not produce NaN when r is missing', () => {
    expect(circleToPath({ cx: 5, cy: 5 })).not.toContain('NaN');
  });
});

describe('rectToPath', () => {
  it('keeps the plain output when there is no radius', () => {
    expect(rectToPath({ x: 1, y: 2, width: 3, height: 4 })).toBe(
      'M 1 2, 1 6, 4 6, 4 2, 1 2',
    );
    expect(rectToPath({ x: 1, y: 2, width: 3, height: 4, rx: 0 })).toBe(
      'M 1 2, 1 6, 4 6, 4 2, 1 2',
    );
  });

  it('rounds corners with rx', () => {
    expect(rectToPath({ x: 0, y: 0, width: 20, height: 10, rx: 2 })).toBe(
      'M 2 0 H 18 A 2 2 0 0 1 20 2 V 8 A 2 2 0 0 1 18 10 H 2 A 2 2 0 0 1 0 8 V 2 A 2 2 0 0 1 2 0 Z',
    );
  });

  it('uses ry for rx when only ry is set', () => {
    expect(rectToPath({ width: 20, height: 10, ry: 3 })).toBe(
      rectToPath({ width: 20, height: 10, rx: 3, ry: 3 }),
    );
  });

  it('clamps radii to half of the size', () => {
    expect(rectToPath({ width: 10, height: 10, rx: 100 })).toBe(
      rectToPath({ width: 10, height: 10, rx: 5, ry: 5 }),
    );
  });

  it('ignores invalid radii', () => {
    expect(rectToPath({ width: 10, height: 10, rx: NaN })).toBe(
      rectToPath({ width: 10, height: 10 }),
    );
  });

  it('is used for <rect rx> inside parse', () => {
    const result = parse(
      '<svg viewBox="0 0 20 10"><rect width="20" height="10" rx="2" ry="1"/></svg>',
    ) as Icon;
    expect(result.paths[0]).toContain('A 2 1 0 0 1');
    expect(result.attrs[0]).toEqual({});
  });
});

describe('icomoon preserveColors', () => {
  const svg =
    '<svg viewBox="0 0 24 24" stroke="#00f"><path d="M0 0h1" fill="#f00"/><path d="M1 1h1" fill="#f00"/></svg>';

  it('removes a fill/stroke shared by every path by default', () => {
    const result = parse(svg, { template: 'icomoon' }) as IcomoonIcon;
    expect(result.icon.attrs).toEqual([{}, {}]);
  });

  it('keeps colors when preserveColors is true', () => {
    const result = parse(svg, {
      template: 'icomoon',
      preserveColors: true,
    }) as IcomoonIcon;
    expect(result.icon.attrs).toEqual([
      { stroke: '#00f', fill: '#f00' },
      { stroke: '#00f', fill: '#f00' },
    ]);
  });
});
