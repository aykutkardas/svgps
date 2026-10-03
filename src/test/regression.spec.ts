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
