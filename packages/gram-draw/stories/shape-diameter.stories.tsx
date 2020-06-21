import React from 'react';

import { withKnobs, number } from '@storybook/addon-knobs';


import {range}      from '../src/draw-util';
import {point}      from '../src/draw-line';
import {diameter}   from '../src/draw-shape';
import {DisplaySVG} from '../src/display-svg';

const defaultCount = 6;
const defaultRadius = 40;
const defaultSpin = (Math.PI);

export default {
  title: 'Shapes/Diameter',
  component: point,
  decorators: [withKnobs]
};


export const random_diameters = () => {
  const pathCount = number('Diameter lines', defaultCount, {
    range: true,
    min: 1,
    max: 12
  });
  const radius = number('Diameter radius', defaultRadius, {
    range: true,
    min: 1,
    max: 80,
    step: 2
  });
  const width = 800;

  const path = point(width/2, width/2) + ' ' + range(pathCount).map( i =>  
    `${diameter(radius, Math.random() * Math.PI*2)}
    ` 
  ).join(' ');

  return (<DisplaySVG strokePattern='line' size={width}><path d={path}/></DisplaySVG> )
  
};

