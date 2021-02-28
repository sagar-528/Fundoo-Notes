import React from 'react';
import {shallow} from 'enzyme';
import Reminder from '../src/Components/Dashboard/Reminder'
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

describe('test Reminder', () => {
    
    it('should match to snapshot', () => {
        const component = shallow(<Reminder store = {store} />)
        expect(component).toMatchSnapshot();
    })
})