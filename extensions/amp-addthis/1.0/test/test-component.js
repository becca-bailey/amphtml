import * as Preact from '#preact';
import {BentoAddthis} from '../component';
import {mount} from 'enzyme';

describes.sandboxed('BentoAddthis preact component v1.0', {}, (env) => {
  // DO NOT SUBMIT: This is example code only.
  it('should render', () => {
    const wrapper = mount(<BentoAddthis testProp={true} />);

    const component = wrapper.find(BentoAddthis.name);
    expect(component).to.have.lengthOf(1);
    expect(component.prop('testProp')).to.be.true;
  });
});
