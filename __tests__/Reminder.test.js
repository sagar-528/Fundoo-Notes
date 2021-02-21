import React from 'react';
import {shallow} from 'enzyme';
import Reminder from '../src/Components/Dashboard/Reminder'

describe('test Reminder', () => {
    
    it('should match to snapshot', () => {
        const component = shallow(<Reminder />)
        expect(component).toMatchSnapshot();
    })
})