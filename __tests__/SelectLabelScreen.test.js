import React from 'react';
import {shallow} from 'enzyme';
import SelectLabelScreen from '../src/Components/Dashboard/SelectLabelScreen';
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
        const component = shallow(<SelectLabelScreen store = {store}/>)
        expect(component).toMatchSnapshot();
    })
})