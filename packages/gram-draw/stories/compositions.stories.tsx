import React from 'react';

import { withKnobs, number } from '@storybook/addon-knobs';

// import {range} from '../src/draw-util';
import {point, vector} from '../src/draw-line';
import {dot, diameter, rect} from '../src/draw-shape';
import {DisplaySVG} from '../src/display-svg';

export default {
  title: 'Compositions',
  component: point,
  decorators: [withKnobs]
};

export const point_vector_dot = () => {
  const canvasSize = 800;
  const length = number('Vector segment lengths', 100, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });
  const vector1Direction = number('Vector 1 Direction', 0, {
    range: true,
    min: 0,
    max: Math.PI*2,
    step: (Math.PI/12),
  });
  const vector2Direction = number('Vector 2 Direction', Math.PI/3, {
    range: true,
    min: 0,
    max: Math.PI*2,
    step: (Math.PI/12),
  });
  const dotSize = number('Dot size', 8, {
    range: true,
    min: 0,
    max: 20,
    step: 1
  });

  const origin = point(canvasSize/2, canvasSize/2);
  const line1 = vector(length, vector1Direction)
  const localDot = dot(dotSize);
  const line2 = vector(length, vector2Direction)
  const path = `${origin} ${localDot} ${line1} ${localDot} ${line2} ${localDot}`

  return (<DisplaySVG strokePattern='line' size={canvasSize}>
    <path d={path}/>
  </DisplaySVG> )
};


export const point_vector_diameter = () => {
  const canvasSize = 800;
  const length = number('Vector lengths', 100, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });
  const vector1Direction = number('Vector 1 Direction', 0, {
    range: true,
    min: 0,
    max: Math.PI*2,
    step: (Math.PI/12),
  });
  const vector2Direction = number('Vector 2 Direction', Math.PI/3, {
    range: true,
    min: 0,
    max: Math.PI*2,
    step: (Math.PI/12),
  });
  const diameterSize = number('Diameter size', 4, {
    range: true,
    min: 0,
    max: 20,
    step: 1
  });

  const origin = point(canvasSize/2, canvasSize/2);
  const lineRight = vector(length, vector1Direction)
  const lineDown = vector(length, vector2Direction)
  const path = `
    ${origin} 
    ${diameter(diameterSize, vector1Direction-Math.PI/2)} 
    ${lineRight} 
    ${diameter(diameterSize*2, (vector1Direction+vector2Direction)/2-Math.PI/2)} 
    ${lineDown} 
    ${diameter(diameterSize, vector2Direction-Math.PI/2)} 
    `

  return (<DisplaySVG strokePattern='line' size={canvasSize}>
    <path d={path}/>
  </DisplaySVG> )
};


export const point_vector_rect = () => {
  const canvasSize = 800;
  const length = number('Vector segment lengths', 100, {
    range: true,
    min: 10,
    max: 200,
    step: 10
  });
  const vector1Direction = number('Vector 1 Direction', 0, {
    range: true,
    min: 0,
    max: Math.PI*2,
    step: (Math.PI/12),
  });
  const vector2Direction = number('Vector 2 Direction', Math.PI/3, {
    range: true,
    min: 0,
    max: Math.PI*2,
    step: (Math.PI/12),
  });
  const width = number('Rectangle Width', 20, {
    range: true,
    min: 2,
    max: 20,
    step: 2
  });
  const height = number('Rectangle Height', 10, {
    range: true,
    min: 2,
    max: 20,
    step: 2
  });

  const origin = point(canvasSize/2, canvasSize/2);
  const lineRight = vector(length, vector1Direction)
  const lineDown = vector(length, vector2Direction)
  const path = `
    ${origin} 
    ${rect(width, height)}
    ${lineRight} 
    ${rect(width, height)}
    ${lineDown} 
    ${rect(width, height)}
    `

  return (<DisplaySVG strokePattern='line' size={canvasSize}>
    <path d={path}/>
  </DisplaySVG> )
};
