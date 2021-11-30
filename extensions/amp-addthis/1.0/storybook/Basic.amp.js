import * as Preact from '#preact';
import {withAmp} from '@ampproject/storybook-addon';

export default {
  title: 'amp-addthis-1_0',
  decorators: [withAmp],
  parameters: {
    extensions: [{name: 'amp-addthis', version: '1.0'}],
    experiments: ['bento'],
  },
  args: {},
};

export const _default = (args) => {
  return (
    <amp-addthis
      width="320"
      height="92"
      data-pub-id="ra-5c191331410932ff"
      data-widget-id="957l"
      data-widget-type="floating"
      {...args}
    ></amp-addthis>
  );
};
