import React from 'react';
import {shallow} from 'enzyme';
import SignIn from '../../src/Components/Authentication/SignIn'
import UserServices from '../../Service/UserServices'

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

    it('test the password handler method should update password state', () => {
        const component = shallow(<SignIn/>)
        expect(component.instance().state.password).toBe('')
        component.instance().textInputChangePassword('Qwerty@111')
        expect(component.instance().state.password).toBe('Qwerty@111')
    })

    it('test onPress event of sign in button when all textinput empty it will update the stateEmpty state to true ', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<SignIn onPress = {onPressEvent}/>)
        const instance = component.instance();
        await instance.signInHandler();
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.emailEmpty).toBe(true)
        expect(instance.state.passwordEmpty).toBe(true)
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

    it('test onPress event of sign in button when email is valid but password invalid then invalidPassword state should be true', async() => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<SignIn onPress = {onPressEvent} navigation = {navigation} />)
        const instance = component.instance();
        instance.textInputChangeEmail('gupta.sagar528@gmail.com')
        instance.textInputChangePassword('Qwerty@111')
        await instance.signInHandler();
        expect(onPressEvent).toHaveBeenCalled();
        return UserServices.SignIn(instance.state.email, instance.state.password).catch(error => expect(instance.state.invalidPassword).toBe(true))
    })
})