import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Words from './Words';

Enzyme.configure({ adapter: new Adapter() });

describe('Words Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Words />);
    expect(wrapper.exists()).toBe(true);
  });
});
