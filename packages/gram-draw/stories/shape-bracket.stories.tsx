import React from 'react';

import { withKnobs, number, select } from '@storybook/addon-knobs';

import {bracket} from '../src/draw-line';
import {DisplaySVG} from '../src/display-svg';

export default {
  title: 'Lines/Bracket',
  component: bracket,
  decorators: [withKnobs]
};


export const default_stadium = () => {

  const width = number('width', 40, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });

  const toX = number('to X', 600, {
    range: true,
    min: 10,
    max: 1200,
    step: 10
  });

  const toY = number('toY', 200, {
    range: true,
    min: 10,
    max: 800,
    step: 10
  });

  const capDirection  = select("Cap Direction", {
    Outer: 'outer',
    Inner: 'inner',
    Left:  'left',
    Right: 'right'
  },
  'outer');

  const capStyle  = select("Cap Style", {
    Semicircle: 'semicircle',
    Square: 'square',
    Angle:  'angle'
  },
  'semicircle');

  const path = bracket(toX, toY, width, capDirection, capStyle, width, width);

  return (<DisplaySVG size={1200}><path d={path}/></DisplaySVG> )

};
