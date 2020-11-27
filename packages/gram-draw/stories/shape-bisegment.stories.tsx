import React from 'react';

import { withKnobs, number, select } from '@storybook/addon-knobs';

import {bisegment} from '../src/draw-shape';
import {DisplaySVG} from './display-svg';

const defaultSize = 100;

export default {
  title: 'Shapes/Bisegment',
  component: bisegment,
  decorators: [withKnobs]
};


export const centered_bisegment = () => {

  const radius = number('radius', defaultSize, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });
  const height = number('height', defaultSize, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });
  const cap  = select("Cap", {
    Outer: 'outer',
    Inner: 'inner',
    Left:  'left',
    Right: 'right'
  },
  'outer');

  const path = bisegment(radius, height, cap);

  return (<DisplaySVG size={2*radius}><path d={path}/></DisplaySVG> )
};


export const top_left_bisegment = () => {
  const radius = number('radius', defaultSize, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });
  const height = number('height', defaultSize, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });
  const cap  = select("Cap", {
    Outer: 'outer',
    Inner: 'inner',
    Left:  'left',
    Right: 'right'
  },
  'outer');
  const path = bisegment(radius, height, cap, 0,0,false);

  return (<DisplaySVG size={2*radius}><path d={path}/></DisplaySVG> )

};
