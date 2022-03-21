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
    highlightUserEntry: true,
  },
  argTypes: {
    filter: {
      control: {
        type: 'select',
        options: ['none', 'prefix', 'fuzzy', 'substring', 'token-prefix'],
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

export const inline = (args) => {
  return (
    <BentoAutocomplete {...args}>
      <textarea></textarea>
    </BentoAutocomplete>
  );
};

inline.args = {
  inline: ':',
};

// eslint-disable-next-line local/no-export-side-effect
export const withCustomItems = _default.bind();

withCustomItems.args = {
  items: [
    {
      city: 'Seattle',
      state: 'WA',
    },
    {
      city: 'San Francisco',
      state: 'CA',
    },
    {
      city: 'New York',
      state: 'NY',
    },
  ],
  filterValue: 'city',
  itemTemplate: ({city, state}) => {
    return (
      <div data-value={`${city}, ${state}`}>
        {city}, {state}
      </div>
    );
  },
};
