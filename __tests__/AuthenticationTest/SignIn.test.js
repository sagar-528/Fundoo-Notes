import React from 'react';
import {shallow} from 'enzyme';
import SignIn from '../../src/Components/Authentication/SignIn'
import UserServices from '../../Service/UserServices'

describe('test SignIn', () => {

    it('When render should match to snapshot', () => {
        const component = shallow(<SignIn/>)
        expect(component).toMatchSnapshot();
    })

    it('When email handler method should update email state', async() => {
        const component = shallow(<SignIn/>)
        expect(component.instance().state.email).toBe('')
        component.instance().textInputChangeEmail('gupta.sagar528@gmail.com')
        expect(component.instance().state.email).toBe('gupta.sagar528@gmail.com')
    })

    it('When password handler method should update password state', async() => {
        const component = shallow(<SignIn/>)
        expect(component.instance().state.password).toBe('')
        component.instance().textInputChangePassword('Qwerty@111')
        expect(component.instance().state.password).toBe('Qwerty@111')
    })

    it('When onPress event of sign in button when all textinput empty it will update the stateEmpty state to true ', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<SignIn onPress = {onPressEvent}/>)
        const instance = component.instance();
        await instance.signInHandler();
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.emailEmpty).toBe(true)
        expect(instance.state.passwordEmpty).toBe(true)
    })

    it('When onPress event of sign up button it will navigate to sign up screen', async() => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<SignIn onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.SignUpHandler();

        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith('SignUp');
    })

    it('When onPress event of forgot password button it will navigate forgot password screen', async() => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<SignIn onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.forgotPasswordHandler();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith('ForgotPassword');
    })

    // it('When onPress event of sign in button when email is valid but password invalid then invalidPassword state should be true', async() => {
    //     const navigation = { navigate : jest.fn() }
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<SignIn onPress = {onPressEvent} navigation = {navigation} />)
    //     const instance = component.instance();
    //     instance.textInputChangeEmail('gupta.sagar528@gmail.com')
    //     instance.textInputChangePassword('Qwerty@111')
    //     await instance.signInHandler();
    //     expect(onPressEvent).toHaveBeenCalled();
    //     return UserServices.SignIn(instance.state.email, instance.state.password).catch(error => expect(instance.state.invalidPassword).toBe(true))
    // })

    it('When onPress event of sign in button when email is invalid then invalidEmail state should be true', async() => {
        const onPressEvent = jest.fn();
        const component = shallow(<SignIn onPress = {onPressEvent}/>)
        const instance = component.instance();
        instance.textInputChangeEmail('guptasagar528@gmail.com')
        instance.passwordHandler('Qwerty@111')
        await instance.signInHandler();
        expect(onPressEvent).toHaveBeenCalled();
        return UserServices.SignIn(instance.state.email, instance.state.password).catch(error => expect(instance.state.invalidEmail).toBe(true))
    }, 10000)

})