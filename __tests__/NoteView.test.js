import React from 'react';
import {shallow} from 'enzyme';
import NoteView from '../src/Components/Dashboard/NoteView'

describe('test Note View', () => {
    
    it('should match to snapshot', () => {
        const component = shallow(<NoteView />)
        expect(component).toMatchSnapshot();
    })

    // it('When component did mount method should get user details and Update State', async () => {
    //     const component = shallow(<NoteView />)
    //     const instance = component.instance();
    //     await instance.componentDidMount()
    // })

})

