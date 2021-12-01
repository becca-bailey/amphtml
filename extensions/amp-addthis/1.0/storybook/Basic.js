import * as Preact from '#preact';
import {BentoAddthis} from '../component';

export default {
  title: 'Addthis',
  component: BentoAddthis,
  args: {
    widgetType: 'floating',
  },
};

export const _default = (args) => {
  return (
    <BentoAddthis
      style={{width: 320, height: 92}}
      pubId="ra-5c191331410932ff"
      widgetId="9571"
      {...args}
    ></BentoAddthis>
  );
};
