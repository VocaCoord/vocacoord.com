import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DevTools } from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('DevTools Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<DevTools />);
    expect(wrapper.exists()).toBe(true);
  });
});
