import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('renders create a dog form', ()=> {
  const app = mount(<App />)
  expect(app.find('.subtitle').text()).toEqual('Add a Dog')
})

it('links to dog index', ()=>{
  const app = mount(<App />)
  app.find('a#dogs-link').simulate('click', {button: 0})
  expect(app.find('.subtitle').text()).toEqual('All the Dogs')
})
