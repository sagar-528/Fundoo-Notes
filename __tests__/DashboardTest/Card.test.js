import React from 'react';
import {shallow} from 'enzyme';
import Card from '../../src/Components/Dashboard/Card'

describe('test Card', () => {
    
    it('should match to snapshot', () => {
        const component = shallow(<Card />)
        expect(component).toMatchSnapshot();
    })

})