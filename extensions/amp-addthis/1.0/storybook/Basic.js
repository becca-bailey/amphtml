import * as Preact from '#preact';
import {BentoAddthis} from '../component';

export default {
  title: 'Addthis',
  component: BentoAddthis,
  args: {
    'exampleProperty': 'example string property argument',
  },
};

// DO NOT SUBMIT: This is example code only.
export const _default = (args) => {
  return (
    <BentoAddthis style={{width: 300, height: 200}} {...args}>
      This text is inside.
    </BentoAddthis>
  );
};
