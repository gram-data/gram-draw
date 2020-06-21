import React from 'react';

import { withKnobs, number } from '@storybook/addon-knobs';

import {semicircle} from '../src/draw-shape';
import {DisplaySVG} from '../src/display-svg';

const defaultPoints = 6;
const defaultSize = 100;
const defaultSpin = (Math.PI);

export default {
  title: 'Shapes/Semi-circle',
  component: semicircle,
  decorators: [withKnobs]
};


export const centered_semi_circle = () => {
  const radius = number('radius', defaultSize, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });
  const spin = number('Spin', defaultSpin, {
    range: true,
    min: 0,
    max: Math.PI,
    step: (Math.PI/12),
  });
  const path = semicircle(radius, spin);

  return (<DisplaySVG size={2*radius}><path d={path}/></DisplaySVG> )
  
};

export const top_left_semi_circle = () => {
  const radius = number('radius', defaultSize, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });
  const spin = number('Spin', defaultSpin, {
    range: true,
    min: 0,
    max: Math.PI,
    step: (Math.PI/12),
  });
  const path = semicircle(radius, spin, false, false, 0, 0, false);

  return (<DisplaySVG size={2*radius}><path d={path}/></DisplaySVG>)

};
