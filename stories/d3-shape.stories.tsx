import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import * as d3Shape from 'd3-shape';

const stories = storiesOf('D3 Shapes', module);

stories.addDecorator(withKnobs);


stories.add('line', () => {
  const path = d3Shape.line()([[10, 60], [40, 90], [60, 10], [190, 10]])
  
  return (<svg viewBox="0 0 400 400" stroke='red' fill='none'><path d={path}/></svg>)

});

stories.add('arc', () => {
  const path = d3Shape.arc()({
    innerRadius: -10,
    outerRadius: 100,
    startAngle: 0,
    endAngle: Math.PI / 2
  })
  
  return (<svg viewBox="0 0 400 400" stroke='red' fill='blue'><path d={path}/></svg>)

});

