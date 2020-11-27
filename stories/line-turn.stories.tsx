import React from 'react';

import { withKnobs, number, boolean, select, color } from '@storybook/addon-knobs';
import { addParameters } from '@storybook/react';

addParameters({
  darkMode: {
    stylePreview: true
  }
});

import {point, bend, bank, vector, halfsquare} from '../src/draw-line';
import {dot} from '../src/draw-shape';
import {range} from '../src/draw-util';

import {DisplaySVG} from './display-svg';

const width = 800;
const defaultCount = 6;
const hemSize = 20;
const defaultSpin = (Math.PI);

export default {
  title: 'Lines/Turn',
  component: bend,
  decorators: [withKnobs]
};


const selectTurnFunc = (turnStyle:string) => {
  return turnStyle === 'halfsquare'? halfsquare 
  : turnStyle === 'bank' ? bank
  : bend;
} 

export const turn_once = () => {
  const turnStyle = select("Turn style", {
    Bend: 'bend',
    Bank: 'bank',
    Halfsquare: 'halfsquare'
  }, 'bend');

  const direction = number('Direction', 0, {
    range: true,
    min: 0,
    max: Math.PI*2,
    step: (Math.PI/12),
  });
  const lineLength = number('Turn (direct) length', hemSize*4, {
    range: true,
    min: 10,
    max: 80,
    step: 10
  });
  const fraction = number('Turn fraction', 2, {
    range: true,
    min: 1,
    max: 8,
    step: 1
  });
  const mirror = boolean('Mirror', false);
  const stroke = color('Stroke', 'gray');
  const fill = color('Fill', 'none');

  const turnFunc = selectTurnFunc(turnStyle);

  const origin = point(width/2, width/2);
  const path =  `
      ${origin}
      ${dot(2)}
      ${turnFunc(lineLength, direction, fraction, mirror)} 
      ${dot(4)}
      ${origin}
      ${vector(lineLength, direction)}
      ${dot(8)}
      `

  return (<DisplaySVG fill={fill} strokeColor={stroke} strokePattern='line' size={width}><path d={path}/></DisplaySVG> )
  
};

export const spiraling_turns = () => {
  const walkLength = number('Walk length', 12, {
    range: true,
    min: 1,
    max: 24
  });
  const turnStyle = select("Turn style", {
    Bend: 'bend',
    Bank: 'bank',
    Halfsquare: 'halfsquare'
  }, 'bend');
  const lineLength = number('Turn (direct) length ', hemSize, {
    range: true,
    min: 2,
    max: 20,
    step: 10
  });
  const fraction = number('Turn fraction', 2, {
    range: true,
    min: 1,
    max: 8,
    step: 1
  });
  const mirror = boolean('Mirror', false);
  const clockwise = boolean('Clockwise', true);
  const fill = select('Fill', {
    None: 'none',
    Green: 'green',
    Red: 'red',
    Blue: 'blue'
  }, 'none');

  const turnFunc = selectTurnFunc(turnStyle);

  const path =  `
    ${point(width/2, width/2)} ` +
    range(walkLength, 1).map( i => {
      const direction = clockwise ? (Math.PI/fraction)*i : 0-(Math.PI/fraction)*i;
      return ` 
        ${turnFunc(lineLength * i, direction, fraction, mirror)} 
        ${dot(4*i)}
      `
    })


  return (<DisplaySVG fill={fill} strokePattern='line' size={width}><path d={path}/></DisplaySVG> )
  
};


export const random_turns = () => {
  const turnStyle = select("Turn style", {
    Bend: 'bend',
    Bank: 'bank',
    Halfsquare: 'halfsquare'
  }, 'bend');
  const walkLength = number('Walk length', defaultCount, {
    range: true,
    min: 1,
    max: 12
  });
  const lineLength = number('Turn length', hemSize, {
    range: true,
    min: 10,
    max: 80,
    step: 10
  });
  const fraction = number('Turn fraction', 2, {
    range: true,
    min: 1,
    max: 8,
    step: 1
  });
  const fill = select('Fill', {
    None: 'none',
    Green: 'green',
    Red: 'red',
    Blue: 'blue'
  }, 'none');

  const turnFunc = selectTurnFunc(turnStyle);

  const path =  `${point(width/2, width/2)} ` + range(walkLength).map( i =>  
    `
    ${turnFunc(lineLength, Math.random() * Math.PI, fraction, Math.random() > 0.5)}
    ` 
  ).join(' ');

  return (<DisplaySVG fill={fill} strokePattern='line' size={width}><path d={path}/></DisplaySVG> )
  
};