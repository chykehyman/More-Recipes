/* eslint-disable */
import React from 'react';
import Spinner from 'react-md-spinner';
import { BrowserRouter as Router } from 'react-router-dom';
import SigninForm from '../../../components/signinPage/SigninForm.jsx';

/**
 *
 * @return { object } props
 */
const setup = () => {
  const props = {
    username: '',
    password: '',
    errors: {},
    showWarning: false,
    isLoading: false,
    handleChange: () => {},
    handleFocus: () => {},
    handleSubmit: () => {}
  };
  return props;
};

const props = setup();
describe('<SigninForm/>', () => {
  it('renders form with five input fields and a button', () => {
    const wrapper = shallow(<SigninForm {...props }/>);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('TextFieldGroup').length).toBe(2);
    expect(wrapper.find('button').length).toBe(1);
  }); it('renders Spinner component, when isLoading is ', () => {
    const wrapper = mount((
      <Router>
        <SigninForm {...props } isLoading = { true }/>
      </Router>));
    expect(wrapper.find(Spinner).length).toEqual(1);
  });
});
