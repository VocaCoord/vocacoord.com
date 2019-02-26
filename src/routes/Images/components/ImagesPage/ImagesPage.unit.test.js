import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ImagesPage from '.'

Enzyme.configure({ adapter: new Adapter() })

describe('Images Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ImagesPage />)
    expect(wrapper.exists()).toBe(true)
  })
})
