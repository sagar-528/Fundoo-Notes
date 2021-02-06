import React from 'react';
import {shallow} from 'enzyme';
import AddNotes from '../../src/Components/Dashboard/AddNotes'

describe('test AddNotes', () => {
    
    it('should match to snapshot', () => {
        const component = shallow(<AddNotes />)
        expect(component).toMatchSnapshot();
    })
})