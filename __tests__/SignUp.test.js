import React from 'react';
import {shallow} from 'enzyme';
import SignUp from '../src/Components/SignUp'

describe('test SignUp', () => {
    
    it('should match to snapshot', () => {
        const component = shallow(<SignUp />)
        expect(component).toMatchSnapshot();
    })

    it('test when first name provided in textinput should update first name state', async () => {
        const component = shallow(<SignUp />)
        expect(component.instance().state.firstName).toBe('')
        component.instance().textInputChangeFirstName('Sagar')
        expect(component.instance().state.firstName).toBe('Sagar')
    })

    it('test when last name provided in textinput should update last name state', async () => {
        const component = shallow(<SignUp />)
        expect(component.instance().state.lastName).toBe('')
        component.instance().textInputChangeLastName('Gupta')
        expect(component.instance().state.lastName).toBe('Gupta')
    })

    it('test when email provided in textinput should update email state', async () => {
        const component = shallow(<SignUp />)
        expect(component.instance().state.email).toBe('')
        component.instance().textInputChangeEmail('gupta.sagar528@gmail.com')
        expect(component.instance().state.email).toBe('gupta.sagar528@gmail.com')
    })

    it('test when password provided in textinput should update password state', async () => {
        const component = shallow(<SignUp />)
        expect(component.instance().state.password).toBe('')
        component.instance().textInputChangePassword('Qwerty@111')
        expect(component.instance().state.password).toBe('Qwerty@111')
    })

    it('test when provided firstName is valid firstName validation state will be true', async () => {
        const component = shallow(<SignUp />)
        component.instance().setState({ firstName : 'Sagar'})
        component.instance().validateFirstName()
        expect(component.instance().state.firstNameValidation).toBe(true)
    })

    it('test when provided firstName is invalid firstName validation state will be false', async () => {
        const component = shallow(<SignUp />)
        component.instance().setState({ firstName : 'sagar'})
        component.instance().validateFirstName()
        expect(component.instance().state.firstNameValidation).toBe(false)
    })

    it('test when provided lastName is valid lastName validation state will be true', async () => {
        const component = shallow(<SignUp />)
        component.instance().setState({ lastName : 'Gupta'})
        component.instance().validateLastName()
        expect(component.instance().state.lastNameValidation).toBe(true)
    })

    it('test when provided lastName is invalid lastName validation state will be false', () => {
        const component = shallow(<SignUp />)
        component.instance().setState({ lastName : 'gupta'})
        component.instance().validateLastName()
        expect(component.instance().state.lastNameValidation).toBe(false)
    })

    it('test when provided email is valid email validation state will be true', async () => {
        const component = shallow(<SignUp />)
        component.instance().setState({ email : 'gupta.sagar528@gmail.com'})
        component.instance().validateEmail();
        expect(component.instance().state.emailValidation).toBe(true)
    })

    it('test when provided email is invalid email validation state will be false', async () => {
        const component = shallow(<SignUp />)
        component.instance().setState({ email : 'gupta.sagar528#gmail.com'})
        component.instance().validateEmail();
        expect(component.instance().state.emailValidation).toBe(false)
    })

    it('test when provided password is valid password validation state will be true', async () => {
        const component = shallow(<SignUp />)
        component.instance().setState({ password : 'Qwerty@111'})
        component.instance().validatePassword();
        expect(component.instance().state.passwordValidation).toBe(true)
    })

    it('test when provided password is invalid password validation state will be false', async () => {
        const component = shallow(<SignUp />)
        component.instance().setState({ password : 'qwerty1234'})
        component.instance().validatePassword();
        expect(component.instance().state.passwordValidation).toBe(false)
    })

    it('test onPress event of sign in button it will navigate to sign in screen', async () => {
        const navigation = { push : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<SignUp onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.signInHandler();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.push).toBeCalledWith("SignIn");
    })

    it('test onPress event of sign up button when all textinput empty it will update the stateEmpty state to true ', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<SignUp onPress = {onPressEvent}/>)
        const instance = component.instance();
        
        await instance.signUpHandler();
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.firstNameEmpty).toBe(true)
        expect(instance.state.lastNameEmpty).toBe(true)
        expect(instance.state.emailEmpty).toBe(true)
        expect(instance.state.passwordEmpty).toBe(true)
    })

})
