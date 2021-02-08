import React from 'react';
import {shallow} from 'enzyme';
import NoteView from '../../src/Components/Dashboard/NoteView'

describe('test Note View', () => {
    
    it('should match to snapshot', () => {
        const component = shallow(<NoteView />)
        expect(component).toMatchSnapshot();
    })

})

