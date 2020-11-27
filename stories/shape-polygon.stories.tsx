import React from 'react';

import { withKnobs, number } from '@storybook/addon-knobs';

import {polygon} from '../src/draw-shape';
import {DisplaySVG} from './display-svg';

const defaultPoints = 6;
const defaultSize = 100;
const defaultSpin = (Math.PI);

export default {
  title: 'Shapes/Polygon',
  component: polygon,
  decorators: [withKnobs]
};


export const centered_polygon = () => {
  const numPoints = number('Points', defaultPoints, {
    range: true,
    min: 3,
    max: 12
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
  const path = polygon(radius, numPoints, polySpin);

  return (<DisplaySVG size={2*radius}><path d={path}/></DisplaySVG> )

};


export const top_left_polygon = () => {
  const numPoints = number('Points', defaultPoints, {
    range: true,
    min: 3,
    max: 12
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
  const path = polygon(radius, numPoints, polySpin,  0, 0, false);

  return (<DisplaySVG size={2*radius}><path d={path}/></DisplaySVG> )

};
