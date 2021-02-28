import React from 'react';
import {shallow} from 'enzyme';
import LabelAppbar from '../src/Components/Dashboard/LabelAppbar';
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

describe('test LabelAppbar', () => {
    it('should match to snapshot', () => {
        const component = shallow(<LabelAppbar store = {store}/>)
        expect(component).toMatchSnapshot();
    })
})
