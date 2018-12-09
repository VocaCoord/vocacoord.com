import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Root from './Root';
import configureStore from '../store/configureStore';

Enzyme.configure({ adapter: new Adapter() });

/* change mock store to an actual store mocker */
describe('Root Component', () => {
  it('renders without crashing', () => {
    const mockStore = configureStore();
    const wrapper = shallow(<Root store={mockStore} />);

    expect(wrapper.exists()).toBe(true);
  });
});
