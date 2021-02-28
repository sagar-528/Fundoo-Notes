import React from 'react';
import {shallow} from 'enzyme';
import LabelNoteScreen from '../src/Components/Dashboard/LabelNoteScreen';
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

describe('test LabelNoteScreen', () => {
    it('should match to snapshot', () => {
        const component = shallow(<LabelNoteScreen store = {store}/>)
        expect(component).toMatchSnapshot();
    })
})