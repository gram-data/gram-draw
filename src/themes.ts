import { Property } from 'csstype';
import {
  interpolateRainbow,
  interpolateViridis,
  interpolatePlasma,
  interpolateInferno,
  interpolateMagma,
  interpolateWarm,
  interpolateCool,
  interpolateCubehelixDefault,
  interpolateGreys,
  interpolateBlues,
} from 'd3-scale-chromatic';
import { rgb } from 'd3-color';

export const baseColorFor = (baseColor: string) => rgb(baseColor);
export const darkColorFor = (baseColor: string) => rgb(baseColor).darker(0.15);
export const lightColorFor = (baseColor: string) =>
  rgb(baseColor).brighter(0.5);
export const textColorFor = (baseColor: string) => rgb(baseColor).brighter(0.5);

interface CategoryStyle {
  background: Property.Color;
  text: Property.Color;
  dark: Property.Color;
  light: Property.Color;
}
const categoryFrom = (colors: string[]): CategoryStyle[] =>
  Array.from(colors).map((baseColor) => ({
    background: baseColorFor(baseColor).toString(),
    text: textColorFor(baseColor).toString(),
    dark: darkColorFor(baseColor).toString(),
    light: lightColorFor(baseColor).toString(),
  }));

type InterpolatorFunc = (t: number) => string;

const interpolateFrom = (interpolator: InterpolatorFunc) => {
  return function (size: number) {
    var interpolatedColors = [];
    for (let i = 1; i <= size; i++) {
      interpolatedColors.push(rgb(interpolator(i / size)).hex());
    }
    console.log(interpolatedColors);
    return interpolatedColors;
  };
};

export const categories = {
  category10: categoryFrom([
    '#3e77af',
    '#ec8536',
    '#569d3e',
    '#c23932',
    '#8c6bb8',
    '#83584e',
    '#d37ebf',
    '#7f7f7f',
    '#bcbc45',
    '#5dbccc',
  ]),
  accent: categoryFrom([
    '#7fc97f',
    '#beaed4',
    '#fdc086',
    '#ffff99',
    '#386cb0',
    '#f0027f',
    '#bf5b17',
    '#666666',
  ]),
  dark2: categoryFrom([
    '#1b9e77',
    '#d95f02',
    '#7570b3',
    '#e7298a',
    '#66a61e',
    '#e6ab02',
    '#a6761d',
    '#666666',
  ]),
  paired: categoryFrom([
    '#a6cee3',
    '#1f78b4',
    '#b2df8a',
    '#33a02c',
    '#fb9a99',
    '#e31a1c',
    '#fdbf6f',
    '#ff7f00',
    '#cab2d6',
    '#6a3d9a',
    '#ffff99',
    '#b15928',
  ]),
  pastel1: categoryFrom([
    '#fbb4ae',
    '#b3cde3',
    '#ccebc5',
    '#decbe4',
    '#fed9a6',
    '#ffffcc',
    '#e5d8bd',
    '#fddaec',
    '#f2f2f2',
  ]),
  pastel2: categoryFrom([
    '#b3e2cd',
    '#fdcdac',
    '#cbd5e8',
    '#f4cae4',
    '#e6f5c9',
    '#fff2ae',
    '#f1e2cc',
    '#cccccc',
  ]),
  set1: categoryFrom([
    '#e41a1c',
    '#377eb8',
    '#4daf4a',
    '#984ea3',
    '#ff7f00',
    '#ffff33',
    '#a65628',
    '#f781bf',
    '#999999',
  ]),
  set2: categoryFrom([
    '#66c2a5',
    '#fc8d62',
    '#8da0cb',
    '#e78ac3',
    '#a6d854',
    '#ffd92f',
    '#e5c494',
    '#b3b3b3',
  ]),
  set3: categoryFrom([
    '#8dd3c7',
    '#ffffb3',
    '#bebada',
    '#fb8072',
    '#80b1d3',
    '#fdb462',
    '#b3de69',
    '#fccde5',
    '#d9d9d9',
    '#bc80bd',
    '#ccebc5',
    '#ffed6f',
  ]),
  tableau10: categoryFrom([
    '#4e79a7',
    '#f28e2c',
    '#e15759',
    '#76b7b2',
    '#59a14f',
    '#edc949',
    '#af7aa1',
    '#ff9da7',
    '#9c755f',
    '#bab0ab',
  ]),
  rainbow: categoryFrom(interpolateFrom(interpolateRainbow)(12)),
  viridis: categoryFrom(interpolateFrom(interpolateViridis)(12)),
  plasma: categoryFrom(interpolateFrom(interpolatePlasma)(12)),
  inferno: categoryFrom(interpolateFrom(interpolateInferno)(12)),
  magma: categoryFrom(interpolateFrom(interpolateMagma)(12)),
  warm: categoryFrom(interpolateFrom(interpolateWarm)(12)),
  cool: categoryFrom(interpolateFrom(interpolateCool)(12)),
  cubehelix: categoryFrom(interpolateFrom(interpolateCubehelixDefault)(12)),
  greys: categoryFrom(interpolateFrom(interpolateGreys)(12)),
  blues: categoryFrom(interpolateFrom(interpolateBlues)(12)),
};
