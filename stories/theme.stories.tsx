import React from 'react';

import { withKnobs, number, boolean, select, color } from '@storybook/addon-knobs';
import { addParameters } from '@storybook/react';

addParameters({
  darkMode: {
    stylePreview: true
  }
});


import ThemeTypography from './theme-typography';
import ThemeColors from './theme-colors';

export default {
  title: 'Themes',
  component: ThemeTypography,
  decorators: [withKnobs]
};


export const html_typography = () => {
  return (<ThemeTypography /> )
};


export const html_colors = () => {
  const category = select('Color Category', {
    Category10: 'category10',
    Accent: 'accent',
    Dark2: 'dark2',
    Paired: 'paired',
    Pastel1: 'pastel1',
    Pastel2: 'pastel2',
    Set1: 'set1',
    Set2: 'set2',
    Set3: 'set3',
    Tableau10: 'tableau10',
    Rainbow: 'rainbow',
    Viridis: 'viridis',   
    Plasma:  'plasma',
    Inferno: 'inferno',
    Magma:   'magma',
    Warm:    'warm',
    Cool:    'cool',
    Cubehelix: 'cubehelix',
    Greys:    'greys',
    Blues:    'blues'
  }, 'category10')
  
  return (<ThemeColors category={category} /> )
  
};
