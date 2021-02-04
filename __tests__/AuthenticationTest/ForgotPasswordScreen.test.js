import React from 'react';
import {shallow} from 'enzyme';
import ForgotPasswordScreen from '../../src/Screens/ForgotPasswordScreen'

describe('test ForgotPasswordScreen', () => {
    it('should match to snapshot', () => {
        const component = shallow(<ForgotPasswordScreen/>)
        expect(component).toMatchSnapshot();
    })
})