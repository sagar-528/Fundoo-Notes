import React from 'react';
import {shallow} from 'enzyme';
import HeaderBar from '../src/Components/Dashboard/HeaderBar'
import { Appbar, Avatar } from 'react-native-paper';

describe('test HeaderBar', () => {
    it('should match to snapshot', () => {
        const component = shallow(<HeaderBar/>)
        expect(component).toMatchSnapshot();
    })

    it('When component in top bar component', () => {
        const component = shallow(<HeaderBar />)
        expect(component.find(Appbar.Action)).toHaveLength(2)
        expect(component.find(Appbar.Content)).toHaveLength(1)
        expect(component.find(Avatar.Image)).toHaveLength(1)
    })

    it('When onPress of Menu icon button it will open the Navigation Drawer', async () => {
        const navigation = { openDrawer : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<HeaderBar onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        await instance.handleMenuButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.openDrawer).toHaveBeenCalled()
    })

    it('When onPress of Menu icon button it will navigate to Search Screen.', async () => {
        const navigation = { push : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<HeaderBar onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        await instance.handleSearchButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.push).toHaveBeenCalled('SearchNote')
    })

})