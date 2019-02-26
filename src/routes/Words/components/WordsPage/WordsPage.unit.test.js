import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import WordsPage from '.'

Enzyme.configure({ adapter: new Adapter() })

describe('Words Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<WordsPage />)
    expect(wrapper.exists()).toBe(true)
  })
})
