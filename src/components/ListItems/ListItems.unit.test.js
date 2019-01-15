import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ListItems } from '.';

Enzyme.configure({ adapter: new Adapter() });

const pathname = '';

const globalProps = {
  add: () => {},
  edit: () => {},
  generateTo: () => ({ pathname }),
  list: [{}],
  name: '',
  remove: () => {},
  title: ''
};

describe('List Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ListItems {...globalProps} />);
    expect(wrapper.exists()).toBe(true);
  });
});
