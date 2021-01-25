import React from 'react';

import { withKnobs, number, select } from '@storybook/addon-knobs';

import {pointed} from '../src/draw-shape';
import {DisplaySVG} from './display-svg';

const defaultSize = 100;

export default {
  title: 'Shapes/Pointed',
  component: pointed,
  decorators: [withKnobs]
};


export const centered_bisegment = () => {

  const width = number('width', 400, {
    range: true,
    min: 10,
    max: 600,
    step: 10
  });
  const height = number('height', 100, {
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
  const peak = height/2;
  const path = pointed(width, height, cap, peak);

  return (<DisplaySVG size={width+2*peak}><path d={path}/></DisplaySVG> )
};


export const top_left_bisegment = () => {
  const width = number('width', 400, {
    range: true,
    min: 10,
    max: 600,
    step: 10
  });
  const height = number('height', 100, {
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
  const peak = height/2;
  const path = pointed(width, height, cap, peak, 0,0,false);

  return (<DisplaySVG size={width+2*peak}><path d={path}/></DisplaySVG> )

};
