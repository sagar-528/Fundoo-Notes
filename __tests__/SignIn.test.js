import React from 'react';
import {shallow} from 'enzyme';
import SignIn from '../src/Components/SignIn'

describe('test SignIn', () => {
    it('test when render should match to snapshot', () => {
        const component = shallow(<SignIn/>)
        expect(component).toMatchSnapshot();
    })

    it('test the email handler method should update email state', () => {
        const component = shallow(<SignIn/>)
        expect(component.instance().state.email).toBe('')
        component.instance().textInputChangeEmail('gupta.sagar528@gmail.com')
        expect(component.instance().state.email).toBe('gupta.sagar528@gmail.com')
    })

    it('test the password handler method should update password state', async () => {
        const component = shallow(<SignIn/>)
        expect(component.instance().state.password).toBe('')
        component.instance().textInputChangePassword('Qwerty@111')
        expect(component.instance().state.password).toBe('Qwerty@111')
    })

    it('test onPress event of eye icon of password textinput called it will change the secureTextPassword State', () => {
        const onPressEvent = jest.fn();
        const component = shallow(<SignIn onPress = {onPressEvent}/>)
        const instance = component.instance();
        expect(instance.state.secureTextPassword).toBe(true);
    })

    it('test onPress event of sign up button it will navigate to sign up screen', () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<SignIn onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.SignUpHandler();

        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith('SignUp');
    })

    it('test onPress event of forgot password button it will navigate forgot password screen', () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<SignIn onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.forgotPasswordHandler();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith('ForgotPassword');
    })
})