import * as Preact from '#preact';

import {BentoAutocomplete} from '../component';

import '../component.jss';

export default {
  title: 'Autocomplete',
  component: BentoAutocomplete,
  args: {
    items: [
      'apple',
      'banana',
      'cherry',
      'orange',
      'pear',
      'pineapple',
      'strawberry',
      'watermelon',
      'lemon',
      'lime',
    ],
    filter: 'prefix',
    minChars: 1,
  },
  argTypes: {
    filter: {
      control: {
        type: 'select',
        options: ['none', 'prefix', 'fuzzy', 'substring'],
      },
    },
    minChars: {
      control: {
        type: 'number',
      },
    },
  },
};

export const _default = (args) => {
  return (
    <BentoAutocomplete {...args}>
      <input type="text"></input>
    </BentoAutocomplete>
  );
};
