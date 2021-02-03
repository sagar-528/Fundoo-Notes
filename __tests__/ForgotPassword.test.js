import React from 'react';
import {shallow} from 'enzyme';
import ForgotPassword from '../src/Components/ForgotPassword'

describe('test Forgot Password', () => {
    
    it('should match to snapshot', () => {
        const component = shallow(<ForgotPassword/>)
        expect(component).toMatchSnapshot();
    })

    it('test when email provided in textinput should update email state', async () => {
        const component = shallow(<ForgotPassword />)
        expect(component.instance().state.email).toBe('')
        component.instance().textInputChangeEmail('gupta.sagar528@gmail.com')
        expect(component.instance().state.email).toBe('gupta.sagar528@gmail.com')
    })

    it('test onPress event of reset password button when all textinput empty it will update the stateEmpty state to true ', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<ForgotPassword onPress = {onPressEvent}/>)
        const instance = component.instance();
        await instance.resetPasswordHandler();
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.emailEmpty).toBe(true)
    })
    
})