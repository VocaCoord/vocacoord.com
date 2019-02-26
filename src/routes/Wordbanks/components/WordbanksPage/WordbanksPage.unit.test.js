import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import WordbanksPage from '.'

Enzyme.configure({ adapter: new Adapter() })

describe('Wordbanks Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<WordbanksPage />)
    expect(wrapper.exists()).toBe(true)
  })
})
