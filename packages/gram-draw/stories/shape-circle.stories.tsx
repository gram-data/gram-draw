import React from 'react';

import { withKnobs, number } from '@storybook/addon-knobs';

import {circle} from '../src/draw-shape';
import {DisplaySVG} from './display-svg';

const defaultPoints = 6;
const defaultSize = 100;
const defaultSpin = (Math.PI);

export default {
  title: 'Shapes/Circle',
  component: circle,
  decorators: [withKnobs]
};


export const centered_circle = () => {
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
  const path = circle(radius, spin);

  return (<DisplaySVG size={2*radius}><path d={path}/></DisplaySVG> )
  
};

export const top_left_circle = () => {
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
  const path = circle(radius, spin, 0, 0, false);

  return (<DisplaySVG size={2*radius}><path d={path}/></DisplaySVG>)

};
