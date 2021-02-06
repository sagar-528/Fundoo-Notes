import React from 'react';
import {shallow} from 'enzyme';
import NoteScreen from '../../src/Components/Dashboard/NoteScreen';

describe('test NoteScreen', () => {
    
    it('should match to snapshot', () => {
        const component = shallow(<NoteScreen />)
        expect(component).toMatchSnapshot();
    })
})