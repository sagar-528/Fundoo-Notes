import React from 'react';
import {shallow} from 'enzyme';
import CreateNewLabels from '../src/Components/Dashboard/CreateNewLabels';
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

describe('test CreateNewLabel', () => {
    it('should match to snapshot', () => {
        const component = shallow(<CreateNewLabels store = {store}/>)
        expect(component).toMatchSnapshot();
    })
})