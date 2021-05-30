import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './LoginForm';

describe(' LOGIN FORM ', () => {
    const props = {
        onSubmit: jest.fn()
    }

    const render = () => shallow(<LoginForm {...props} />);

    test('should render', ()=> {
        const wrapper = render ();
        expect(wrapper.exists()).toBe(true);
    })

    test('should call submit', () => {
        const wrapper = render ();
        const form = wrapper.find ('form');
        form.simulate('submit', {preventDefault: () => {}});
        expect(props.onSubmit).toHaveBeenCalled();
    })

    test('should submit credentials', () => {
        const credentials = {
            email: 'Eva', 
            password: 'password',
            remember: false
        }
        const wrapper = render ();
        const emailField = wrapper.find('[name="email"]');
        emailField
            .props()
            .onChange({target: {name :'email', value: credentials.email}})
        const passwordField = wrapper.find('[name="password"]'); 
        passwordField
            .props()
            .onChange({target: {name :'password', value: credentials.password}})
        const rememberField = wrapper.find('[name="remember"]'); 
        rememberField
            .props()
            .onChange({target: {name :'remember', value: credentials.remember}})
        const form = wrapper.find ('form');
        form.simulate('submit', {preventDefault: () => {}});
        expect(wrapper.find('button').props().disabled).toBe(false);
        expect(props.onSubmit).toHaveBeenCalledWith(credentials);
    })

    test('snapshot testing', () => {
        const wrapper = render();
        expect (wrapper).toMatchSnapshot();
    })

})