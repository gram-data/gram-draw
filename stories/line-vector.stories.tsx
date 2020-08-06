import React from 'react';

import { withKnobs, number } from '@storybook/addon-knobs';

import {point, vector} from '../src/draw-line';
import {range} from '../src/draw-util';

import {DisplaySVG} from '../src/display-svg';

const defaultCount = 6;
const defaultLength = 40;

export default {
  title: 'Lines/Vector',
  component: vector,
  decorators: [withKnobs]
};


export const random_vector_walk = () => {
  const walkLength = number('Walk length', defaultCount, {
    range: true,
    min: 1,
    max: 12
  });
  const lineLength = number('Vector length', defaultLength, {
    range: true,
    min: 10,
    max: 80,
    step: 10
  });
  const width = 800;

  const path =  `${point(width/2, width/2)} ` + range(walkLength).map( i =>  
    `
    ${vector(lineLength, Math.random() * Math.PI*2)}
    ` 
  ).join(' ');

  return (<DisplaySVG fill='none' strokePattern='line' size={width}><path d={path}/></DisplaySVG> )
  
};


export const spiral_vector_walk = () => {
  const walkLength = number('Walk length', 60, {
    range: true,
    min: 1,
    max: 100
  });
  const lineLength = number('Vector length', 2, {
    range: true,
    min: 1,
    max: 4,
    step: 1
  });
  const turn = number('Vector turn', 4, {
    range: true,
    min: 3,
    max: 12,
    step: 1
  });
  const width = 800;

  const path =  `${point(width/2, width/2)} ` + 
    range(walkLength).map( i =>  
      `
      ${vector(lineLength*i,i*Math.PI/turn)}
      ` 
    ).join(' ');

  return (<DisplaySVG fill='none' strokePattern='line' size={width}><path d={path}/></DisplaySVG> )
  
};