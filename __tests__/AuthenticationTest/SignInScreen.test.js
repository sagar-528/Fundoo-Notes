import React from 'react';
import {shallow} from 'enzyme';
import SignInScreen from '../../src/Screens/SignInScreen';

describe('test SignInScreen', () => {
    it('should match to snapshot', () => {
        const component = shallow(<SignInScreen />)
        expect(component).toMatchSnapshot();
    })
})