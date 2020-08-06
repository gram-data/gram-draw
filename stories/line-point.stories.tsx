import React from 'react';

import { withKnobs, number } from '@storybook/addon-knobs';

import {range} from '../src/draw-util';
import {point} from '../src/draw-line';
import {dot}   from '../src/draw-shape';
import {DisplaySVG} from '../src/display-svg';

const defaultPoints = 6;
const defaultSize = 8;
const defaultSpin = (Math.PI);

export default {
  title: 'Lines/Point with Dot',
  component: point,
  decorators: [withKnobs]
};


export const random_points = () => {
  const numPoints = number('Points', defaultPoints, {
    range: true,
    min: 1,
    max: 12
  });
  const dotSize = number('Dot size', defaultSize, {
    range: true,
    min: 0,
    max: 20,
    step: 1
  });
  const width = 800;

  const path = range(numPoints).map( i =>  
    `${point(Math.floor(Math.random() * (width - dotSize * 2)), 
             Math.floor(Math.random() * (width - dotSize * 2))
      )}
    ${dot(dotSize)}
    ` 
  ).join(' ');

  return (<DisplaySVG strokePattern='line' size={width}><path d={path}/></DisplaySVG> )
  
};

