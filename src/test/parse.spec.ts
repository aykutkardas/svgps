import { parse } from '../lib';

import {
  AirPlaySVG,
  AirPlayJSON,
  SettingsIconSVG,
  SettingsIconJSON,
  SvelteSVG,
  SvelteJSON,
  ArrowLeftCircleSVG,
  ArrowLeftCircleJSON,
  RectSVG,
  RectJSON,
} from '../sample';

describe('Parse', () => {
  it('AirPlaySVG - [Path, Polygon]', () => {
    const result = parse(AirPlaySVG);
    const expected = JSON.parse(AirPlayJSON);
    expect(result).toEqual(expected);
  });

  it('SettingsIconSVG - [Circle, Path]', () => {
    const result = parse(SettingsIconSVG);
    const expected = JSON.parse(SettingsIconJSON);
    expect(result).toEqual(expected);
  });

  it('SvelteSVG - [Circle, Path]', () => {
    const result = parse(SvelteSVG);
    const expected = JSON.parse(SvelteJSON);
    expect(result).toEqual(expected);
  });

  it('ArrowLeftCircleSVG - [Polyline, Path]', () => {
    const result = parse(ArrowLeftCircleSVG);
    const expected = JSON.parse(ArrowLeftCircleJSON);
    expect(result).toEqual(expected);
  });

  it('RectSVG - [Rect, Path]', () => {
    const result = parse(RectSVG);
    const expected = JSON.parse(RectJSON);
    expect(result).toEqual(expected);
  });
});
