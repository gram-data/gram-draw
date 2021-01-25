import React from 'react';

import { withKnobs, number, select } from '@storybook/addon-knobs';

import {wideline} from '../src/draw-line';
import {DisplaySVG} from './display-svg';

export default {
  title: 'Lines/Wideline',
  component: wideline,
  decorators: [withKnobs]
};


export const semicircle_endcaps = () => {

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

  const cap  = select("Cap", {
    Outer: 'outer',
    Inner: 'inner',
    Left:  'left',
    Right: 'right'
  },
  'outer');

  const path = wideline(toX, toY, width, cap, width, width);

  return (<DisplaySVG size={1200}><path d={path}/></DisplaySVG> )

};
