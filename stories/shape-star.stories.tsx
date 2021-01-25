import React from 'react';

import { withKnobs, number } from '@storybook/addon-knobs';

import {star} from '../src/draw-shape';
import {DisplaySVG} from './display-svg';

const defaultPoints = 5;
const defaultSize = 100;
const defaultSpin = (Math.PI);

export default {
  title: 'Shapes/Star',
  component: star,
  decorators: [withKnobs]
};


export const centered_star = () => {
  const numPoints = number('Points', defaultPoints, {
    range: true,
    min: 3,
    max: 48
  });
  const polySpin = number('Spin', defaultSpin, {
    range: true,
    min: 0,
    max: Math.PI,
    step: (Math.PI/12),
  });
  const radius = number('Radius', defaultSize, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });
  const retraction = number('Retraction', 0.5, {
    range: true,
    min: 0.1,
    max: 1.0,
    step: 0.1
  });
  const path = star(radius, retraction, numPoints, polySpin);

  return (<DisplaySVG size={2*radius}><path d={path}/></DisplaySVG> )

};


export const top_left_star = () => {
  const numPoints = number('Points', defaultPoints, {
    range: true,
    min: 3,
    max: 48
  });
  const polySpin = number('Spin', defaultSpin, {
    range: true,
    min: 0,
    max: Math.PI,
    step: (Math.PI/12),
  });
  const radius = number('Radius', defaultSize, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });
  const retraction = number('Retraction', 0.5, {
    range: true,
    min: 0.1,
    max: 1.0,
    step: 0.1
  });
  const path = star(radius, retraction, numPoints, polySpin,  0, 0, false);

  return (<DisplaySVG size={2*radius}><path d={path}/></DisplaySVG> )

};

