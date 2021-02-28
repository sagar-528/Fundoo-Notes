import React from 'react';
import {shallow} from 'enzyme';
import AddReminder from '../src/Components/Dashboard/AddReminder'

describe('test AddReminder', () => {

    it('should match to snapshot', () => {
        const component = shallow(<AddReminder />)
        expect(component).toMatchSnapshot();
    })

})
