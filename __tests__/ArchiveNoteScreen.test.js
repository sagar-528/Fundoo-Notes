import React from 'react';
import {shallow} from 'enzyme';
import ArchiveNoteScreen from '../src/Components/Dashboard/ArchiveNoteScreen';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const initialState = {
    userId : '',
    userLabel : [],
    screenName : '',
    labelKey : ''
}
const store = mockStore(initialState)

describe('test ArchiveNoteScreen', () => {

    it('should match to snapshot', () => {
        const component = shallow(<ArchiveNoteScreen store = {store}/>)
        expect(component).toMatchSnapshot();
    })
    
})