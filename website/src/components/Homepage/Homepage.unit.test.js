import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Homepage } from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('Homepage Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper.exists()).toBe(true);
  });
});
