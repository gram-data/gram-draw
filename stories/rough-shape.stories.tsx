import React, {useRef, useEffect} from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import ReactRough, { Rectangle, Path } from 'react-rough';

// import {range} from '../src/draw-util';
import {point, vector} from '../src/draw-line';
import {dot, semicircle, diameter, rect} from '../src/draw-shape';

export default {
  title: 'RoughJS Rendering',
  component: point,
  decorators: [withKnobs]
};

const canvasSize = 800;
const defaultSize = 100;
const defaultSpin = (Math.PI);

export const point_vector_dot = () => {
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

  return (
    <ReactRough height={canvasSize} width={canvasSize}>
      <Path
        d={path}
        stroke="red"
        fill="green"
      />
    </ReactRough>
  );
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

  return (
    <ReactRough height={canvasSize} width={canvasSize}>
      <Path
        d={path}
        stroke="red"
        fill="green"
      />
    </ReactRough>
  );
};
