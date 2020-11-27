import React from 'react';

import { withKnobs, number } from '@storybook/addon-knobs';

import {point} from '../src/draw-line';
import {rect} from '../src/draw-shape';
import {DisplaySVG} from './display-svg';

const defaultPoints = 6;
const defaultSize = 100;
const defaultSpin = (Math.PI);

export default {
  title: 'Shapes/Rectangle',
  component: rect,
  decorators: [withKnobs]
};


export const centered_rectangle = () => {
  const width = number('Width', defaultSize * 2, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });
  const height = number('Height', defaultSize, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });

  const path = rect(width, height);

  return (<DisplaySVG size={Math.max(width,height)}><path d={path}/></DisplaySVG> )

};


export const top_left_rectangle = () => {
  const width = number('Width', defaultSize * 2, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });
  const height = number('Height', defaultSize, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });

  const path = `
    ${point(width/2, width/2)}
    ${rect(width, height)}
    `;

  return (<DisplaySVG size={Math.max(width,height)}><path d={path}/></DisplaySVG> )

};
