import React from 'react';
import {shallow} from 'enzyme';
import SignUpScreen from '../src/Screens/SignUpScreen';

describe('test SignUpScreen', () => {
    it('should match to snapshot', () => {
        const component = shallow(<SignUpScreen/>)
        expect(component).toMatchSnapshot();
    })
})