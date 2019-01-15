import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Student } from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('Student Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Student />);
    expect(wrapper.exists()).toBe(true);
  });
});
