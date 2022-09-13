const { parse } = require('../lib/parse');
const { expect } = require('chai');

import {
  AirPlaySVG,
  AirPlayIcomoonJSON,
  SettingsIconSVG,
  SettingsIconIcomoonJSON,
  SvelteSVG,
  SvelteIcomoonJSON,
  RectSVG,
  RectIcomoonJSON,
} from '../sample';

describe('Parse', () => {
  it('AirPlaySVG - [Path, Polygon]', () => {
    const result = parse(AirPlaySVG, { template: 'icomoon' });
    expect(result).to.deep.equal(JSON.parse(AirPlayIcomoonJSON));
  });

  it('SettingsIconSVG - [Circle, Path]', () => {
    const result = parse(SettingsIconSVG, { template: 'icomoon' });
    expect(result).to.deep.equal(JSON.parse(SettingsIconIcomoonJSON));
  });

  it('SvelteSVG - [Circle, Path]', () => {
    const result = parse(SvelteSVG, { template: 'icomoon' });
    expect(result).to.deep.equal(JSON.parse(SvelteIcomoonJSON));
  });

  it('RectSVG - [Rect, Path]', () => {
    const result = parse(RectSVG, { template: 'icomoon' });
    expect(result).to.deep.equal(JSON.parse(RectIcomoonJSON));
  });
});
