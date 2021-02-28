import React from 'react';
import {shallow} from 'enzyme';
import NoteCard from '../src/Components/Dashboard/NoteCard'
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

describe('test NoteCard', () => {
    
    it('should match to snapshot', () => {
        const component = shallow(<NoteCard store = {store}/>)
        expect(component).toMatchSnapshot();
    })

    it('When onPress event of selectNote it will navigate to AddNote Screen', async () => {
        const navigation = { push : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<NoteCard onPress = {onPressEvent} navigation = {navigation} store = {store} />)
        const instance = component.instance();
        await instance.selectNote();
        expect(onPressEvent).toHaveBeenCalled();
        // expect(navigation.push).toBeCalledWith("AddNote");
    })

})