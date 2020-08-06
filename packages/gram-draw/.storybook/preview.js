// import { addDecorator } from '@storybook/svelte';
// import { withA11y } from '@storybook/addon-a11y';

// addDecorator(withA11y);

import { addDecorator } from '@storybook/react';
import { withThemeProvider } from 'storybook-addon-theme-ui'
import { merge } from 'theme-ui';
import { addParameters } from '@storybook/react';
import * as themes from '@theme-ui/presets'
import {category10} from '../src/themes'

addParameters({
  themeUi: {
    themes: [
      { theme: merge(themes.funk, category10), name: 'Funk' },
      { theme: themes.future, name: 'Future' },
      { theme: themes.roboto, name: 'Roboto' },
      { theme: themes.dark, name: 'Dark' },
      { theme: themes.deep, name: 'Deep' },
      { theme: themes.swiss, name: 'Swiss' },
      { theme: themes.tosh, name: 'Tosh' }
    ]
  },
})

addDecorator(withThemeProvider)
