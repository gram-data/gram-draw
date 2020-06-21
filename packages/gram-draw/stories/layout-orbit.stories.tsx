import React from 'react';

import { withKnobs, number } from '@storybook/addon-knobs';

import {range, indexedPoint} from '../src/draw-util';
import {point} from '../src/draw-line';
import {dot} from '../src/draw-shape';
import {DisplaySVG} from '../src/display-svg';

const defaultPoints = 6;
const defaultSize = 4;
const defaultSpin = (Math.PI);

export default {
  title: 'Layouts/Orbit',
  component: point,
  decorators: [withKnobs]
};


export const dot_orbit = () => {
  const numPoints = number('Point count', defaultPoints, {
    range: true,
    min: 1,
    max: 12
  });
  const spin = number('Spin', 0, {
    range: true,
    min: 0,
    max: Math.PI,
    step: (Math.PI/12),
  });
  const pointSize = number('Point size', defaultSize, {
    range: true,
    min: 0,
    max: 20,
    step: 1
  });
  
  const orbitRadius = number('Orbit radius', 100, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });
  const width = orbitRadius * 2 + pointSize * 2
  const origin = {x:width/2, y:width/2};

  const path = range(numPoints).map( i =>  {
    const vertex = indexedPoint(origin.x, origin.y, i, numPoints, spin, orbitRadius);
    return `
      ${point(vertex.x, vertex.y)} 
      ${dot(pointSize)}`
  }).join(' ');

  return (<DisplaySVG size={width}><path d={path}/></DisplaySVG> )
  
};

