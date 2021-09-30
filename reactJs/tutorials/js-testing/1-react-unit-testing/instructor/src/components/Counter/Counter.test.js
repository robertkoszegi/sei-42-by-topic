import React from 'react'
import { shallow } from 'enzyme'

import Counter from './Counter'

// describes a whole suite of tests
describe('Counter component', () => {

  let component
  beforeEach(() => {
    component = shallow(<Counter />)
  })
  
  // add the rest of the tests here
  // test 1 for the Counter component
  it('should have a header that says "Counter"', () => {
    expect(component.contains(<h1>Counter</h1>)).toBe(true)
  })

  // test 2
  it('should have a state attribute called number initialized to zero', () => {
    expect(component.state('number')).toEqual(0)
  })

  // test 3

})