import React from 'react';
import ReactDOM from 'react-dom';
import NewDog from '../NewDog';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NewDog />, div)
})

it('has a name input', ()=>{
  const component = mount(<NewDog />)
  expect(component.find('label#name').text()).toBe("Name")
})

it("calls submitHandler onsubmit", ()=>{
  const mockSubmitHandler = jest.fn()
  const component = mount(<NewDog onSubmit={mockSubmitHandler}/>)
  component.find('button#submit').simulate('click', {button: 0})
  expect(mockSubmitHandler.mock.calls.length).toBe(1)
})

it("passes values on submit", ()=>{
  const mockSubmitHandler = jest.fn()
  const component = mount(<NewDog onSubmit={mockSubmitHandler}/>)
  component.find('input[name="name"]').simulate('change', {target: {value: 'Paws', name: 'name'}})
  component.find('input[name="age"]').simulate('change', {target: {value: 2, name: 'age'}})
  component.find('textarea[name="enjoys"]').simulate('change', {target: {value: 'Scratches', name: 'enjoys'}})
  component.find('button#submit').simulate('click', {button: 0})

  const submittedValues = mockSubmitHandler.mock.calls[0][0]

  expect(submittedValues["name"]).toBe("Paws")
  expect(submittedValues["age"]).toBe(2)
  expect(submittedValues["enjoys"]).toBe("Scratches")

})

  it("shows flash message when there is an error", ()=>{
  const mockSubmitHandler = jest.fn()
  const validationErrors = [
    {
      param: 'name',
      msg: 'Is required.'
    }
  ]
  const component = mount(<NewDog onSubmit={mockSubmitHandler} errors={validationErrors}/>)
  expect(component.find(".alert-danger").length).toBe(1)
})

it("highlights name input when there is an error", ()=>{
  const mockSubmitHandler = jest.fn()
  const validationErrors = {
    name: ['Is required.']
  }

  const component = mount(<NewDog onSubmit={mockSubmitHandler} errors={validationErrors}/>)
  expect(component.find('#name-form-group.has-error').length).toBe(1)
})

it("no help message for name when there is no error", ()=>{
  const mockSubmitHandler = jest.fn()
  const component = mount(<NewDog onSubmit={mockSubmitHandler}/>)
  expect(component.find("#name-help-block").length).toBe(0)
})

it("shows help message for name when there is an error", ()=>{
  const mockSubmitHandler = jest.fn()
  const validationErrors = {
     name: ['Is required.']
  }

  const component = mount(<NewDog onSubmit={mockSubmitHandler} errors={validationErrors}/>)
  expect(component.find("#name-help-block").length).toBe(1)
})
