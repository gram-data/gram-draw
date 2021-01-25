import React from 'react';

import { withKnobs, number } from '@storybook/addon-knobs';

import {point} from '../src/draw-line';
import {semicircle} from '../src/draw-shape';
import {DisplaySVG} from './display-svg';

const canvasSize = 800;
const defaultSize = 100;
const defaultSpin = (Math.PI);

export default {
  title: 'Shapes/Semi-circle',
  component: semicircle,
  decorators: [withKnobs]
};


export const single_semi_circle = () => {
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
  const origin = point(canvasSize/2, canvasSize/2)
  const path = `
    ${origin}
    ${semicircle(radius, spin)}
    `;

    return (<DisplaySVG size={canvasSize}><path d={path}/></DisplaySVG> )
};

export const two_semicircle = () => {
  const radius = number('radius', defaultSize, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });
  const spin1 = number('Spin 1', defaultSpin, {
    range: true,
    min: 0,
    max: Math.PI,
    step: (Math.PI/12),
  });
  const spin2 = number('Spin 2', defaultSpin/3, {
    range: true,
    min: 0,
    max: Math.PI,
    step: (Math.PI/12),
  });
  const origin = point(canvasSize/2, canvasSize/2)
  const path = `
    ${origin}
    ${semicircle(radius, spin1)}
    ${semicircle(radius, spin2)}
    `;

  return (<DisplaySVG size={canvasSize}><path d={path}/></DisplaySVG> )
};