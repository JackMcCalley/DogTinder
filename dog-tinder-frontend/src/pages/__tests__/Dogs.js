import React from 'react'
import ReactDOM from 'react-dom'
import Dogs from '../Dogs'
import { mount } from 'enzyme'

const dogs = [
  {
    id: 1,
    name: 'Archie',
    age: 6,
    enjoys: "Playing with rocks."
  },
  {
    id: 2,
    name: 'Dury',
    age: 15,
    enjoys: "Running away."
  },
  {
    id: 3,
    name: 'Spot',
    age: 6,
    enjoys: "Hide under the car."
  },
  {
    id: 4,
    name: 'Abbey',
    age: 8,
    enjoys: "Stealing human food"
  }
]

it('Dogs renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Dogs dogs={dogs} />, div)
})

it('Renders the dogs', ()=>{
  const component = mount(<Dogs dogs={dogs} />)
  const headings = component.find('h4 > .dog-name')
  expect(headings.length).toBe(4)
})


it('Renders the dogs name', ()=>{
  const component = mount(<Dogs dogs={dogs} />)
  const age = component.find('h4 > .dog-name').first()
  expect(age.text()).toBe("Archie")
})

it('Renders the dog age', ()=>{
  const component = mount(<Dogs dogs={dogs} />)
  const age = component.find('h4 > .dog-age').first()
  expect(age.text()).toBe("6 years old")
})

it('Renders what the dog enjoys', ()=>{
  const component = mount(<Dogs dogs={dogs} />)
  const age = component.find('.dog-enjoys').first()
  expect(age.text()).toBe("Playing with rocks.")
})
