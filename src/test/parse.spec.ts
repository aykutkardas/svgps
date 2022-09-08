const { parse } = require('../lib/parse');
const { expect } = require('chai');

import {
  AirPlaySVG,
  AirPlayJSON,
  SettingsIconSVG,
  SettingsIconJSON,
  SvelteSVG,
  SvelteJSON,
  ArrowLeftCircleSVG,
  ArrowLeftCircleJSON,
} from '../sample';

describe('Parse', () => {
  it('AirPlaySVG - [Path, Polygon]', () => {
    const result = parse(AirPlaySVG);
    const expected = JSON.parse(AirPlayJSON);

    expect(result).to.deep.equal(expected);
  });

  it('SettingsIconSVG - [Circle, Path]', () => {
    const result = parse(SettingsIconSVG);
    const expected = JSON.parse(SettingsIconJSON);

    expect(result).to.deep.equal(expected);
  });

  it('SvelteSVG - [Circle, Path]', () => {
    const result = parse(SvelteSVG);
    const expected = JSON.parse(SvelteJSON);

    expect(result).to.deep.equal(expected);
  });

  it('ArrowLeftCircleSVG - [Polyline, Path]', () => {
    const result = parse(ArrowLeftCircleSVG);
    const expected = JSON.parse(ArrowLeftCircleJSON);

    expect(result).to.deep.equal(expected);
  });
});
