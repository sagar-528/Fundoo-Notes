import React from 'react';
import {shallow} from 'enzyme';
import SignUp from '../src/Components/Authentication/SignUp'
import UserServices from '../Service/UserServices'

describe('test SignUp', () => {

     beforeEach(() => {
        jest.setTimeout(30000);
    });
    
    it('should match to snapshot', () => {
        const component = shallow(<SignUp />)
        expect(component).toMatchSnapshot();
    })

    it('When first name provided in textinput should update first name state', () => {
        const component = shallow(<SignUp />)
        expect(component.instance().state.firstName).toBe('')
        component.instance().textInputChangeFirstName('Sagar')
        expect(component.instance().state.firstName).toBe('Sagar')
    })

    it('When last name provided in textinput should update last name state',  () => {
        const component = shallow(<SignUp />)
        expect(component.instance().state.lastName).toBe('')
        component.instance().textInputChangeLastName('Gupta')
        expect(component.instance().state.lastName).toBe('Gupta')
    })

    it('When email provided in textinput should update email state', () => {
        const component = shallow(<SignUp />)
        expect(component.instance().state.email).toBe('')
        component.instance().textInputChangeEmail('gupta.sagar528@gmail.com')
        expect(component.instance().state.email).toBe('gupta.sagar528@gmail.com')
    })

    it('When password provided in textinput should update password state', () => {
        const component = shallow(<SignUp />)
        expect(component.instance().state.password).toBe('')
        component.instance().textInputChangePassword('Qwerty@111')
        expect(component.instance().state.password).toBe('Qwerty@111')
    })

    it('When provided firstName is valid firstName validation state will be true', () => {
        const component = shallow(<SignUp />)
        component.instance().setState({ firstName : 'Sagar'})
        component.instance().validateFirstName()
        expect(component.instance().state.firstNameValidation).toBe(true)
    })

    it('When provided firstName is invalid firstName validation state will be false', () => {
        const component = shallow(<SignUp />)
        component.instance().setState({ firstName : 'sagar'})
        component.instance().validateFirstName()
        expect(component.instance().state.firstNameValidation).toBe(false)
    })

    it('When provided lastName is valid lastName validation state will be true', () => {
        const component = shallow(<SignUp />)
        component.instance().setState({ lastName : 'Gupta'})
        component.instance().validateLastName()
        expect(component.instance().state.lastNameValidation).toBe(true)
    })

    it('When provided lastName is invalid lastName validation state will be false', () => {
        const component = shallow(<SignUp />)
        component.instance().setState({ lastName : 'gupta'})
        component.instance().validateLastName()
        expect(component.instance().state.lastNameValidation).toBe(false)
    })

    it('When provided email is valid email validation state will be true', () => {
        const component = shallow(<SignUp />)
        component.instance().setState({ email : 'gupta.sagar528@gmail.com'})
        component.instance().validateEmail();
        expect(component.instance().state.emailValidation).toBe(true)
    })

    it('When provided email is invalid email validation state will be false', () => {
        const component = shallow(<SignUp />)
        component.instance().setState({ email : 'gupta.sagar528#gmail.com'})
        component.instance().validateEmail();
        expect(component.instance().state.emailValidation).toBe(false)
    })

    it('When provided password is valid password validation state will be true', () => {
        const component = shallow(<SignUp />)
        component.instance().setState({ password : 'Qwerty@111'})
        component.instance().validatePassword();
        expect(component.instance().state.passwordValidation).toBe(true)
    })

    it('When provided password is invalid password validation state will be false', () => {
        const component = shallow(<SignUp />)
        component.instance().setState({ password : 'qwerty1234'})
        component.instance().validatePassword();
        expect(component.instance().state.passwordValidation).toBe(false)
    })

    it('When onPress event of sign in button it will navigate to sign in screen', () => {
        const navigation = { push : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<SignUp onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.signInHandler();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.push).toBeCalledWith("SignIn");
    })

    it('When onPress event of sign up button when all textinput empty it will update the stateEmpty state to true ', async () => {
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

    it('When onPress event of sign up button when all fields are valid it will navigate to SignIn Screen', async() => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<SignUp onPress = {onPressEvent} navigation = {navigation} />)
        const instance = component.instance();
        instance.textInputChangeFirstName('Sagar')
        instance.textInputChangeLastName('Gupta')
        instance.textInputChangeEmail('gupta.sagar528@gmail.com')
        instance.textInputChangePassword('Qwerty@111')
        await instance.signUpHandler();
        expect(onPressEvent).toHaveBeenCalled();
        return UserServices.SignUp(instance.state.email, instance.state.password)
            .then(user => expect(navigation.navigate).toBeCalledWith('SignIn'))
            .catch(error => console.log(error))
    })

    it('When onPress event of sign up button when email is already present then emailPresent state should be true', async() => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<SignUp onPress = {onPressEvent} navigation = {navigation} />)
        const instance = component.instance();
        instance.textInputChangeFirstName('Sagar')
        instance.textInputChangeLastName('Gupta')
        instance.textInputChangeEmail('gupta.sagar528@gmail.com')
        instance.textInputChangePassword('Qwerty@111')
        await instance.signUpHandler();
        expect(onPressEvent).toHaveBeenCalled();
        return UserServices.SignUp(instance.state.email, instance.state.password).catch(error => expect(instance.state.emailPresent).toBe(true))
    })

    it('When onDismiss event of dialog button it will set visible state for dialog should be false', async () => {
        const onDismissEvent = jest.fn();
        const component = shallow(<SignUp onDismiss = {onDismissEvent}/>)
        const instance = component.instance();
        await instance.hideDialog();
        expect(onDismissEvent).toHaveBeenCalled();
        expect(instance.state.visible).toBe(false)
    })

    it('When onPress event of dialog action button it will navigate to Login Screen', async() => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<SignUp onPress = {onPressEvent} navigation = {navigation} />)
        const instance = component.instance();
        await instance.handleDialogButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith('SignIn')
    })

})
