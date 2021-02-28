import React from 'react';
import {shallow} from 'enzyme';
import DeletedScreen from '../src/Components/Dashboard/DeletedScreen'
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

describe('test DeletedScreen', () => {

    it('should match to snapshot', () => {
        const component = shallow(<DeletedScreen store = {store}/> );
        expect(component).toMatchSnapshot();
    })

    it('When onPress of Menu icon button it will open the Navigation Drawer', async () => {
        const navigation = { openDrawer : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<DeletedScreen onPress = {onPressEvent} navigation = {navigation} store = {store}/>)
        const instance = component.instance();
        await instance.handleMenuButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.openDrawer).toHaveBeenCalled()
    })

    it('When onDismiss event of snackbar for empty note it will change the showEmptyNoteSnackbar State to be false', async () => {
        // const navigation = { setParams : jest.fn() }
        const onDismissEvent = jest.fn();
        const component = shallow(<DeletedScreen store = {store} onDismiss = {onDismissEvent}/>)
        const instance = component.instance();
        await instance.emptyNoteSnackbarHandler();
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.showEmptyNoteSnackbar).toBe(false);
        // expect(navigation.setParams).toHaveBeenCalled()
    })

})