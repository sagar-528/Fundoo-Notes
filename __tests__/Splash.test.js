import React from 'react';
import {shallow} from 'enzyme';
import Splash from '../src/Components/Authentication/Splash'

describe('test Splash', () => {
    
    it('should match to snapshot', () => {
        const component = shallow(<Splash />)
        expect(component).toMatchSnapshot();
    })

})