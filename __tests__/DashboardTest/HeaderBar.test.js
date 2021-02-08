import React from 'react';
import {shallow} from 'enzyme';
import HeaderBar from '../../src/Components/Dashboard/HeaderBar'

describe('test HeaderBar', () => {
    it('should match to snapshot', () => {
        const component = shallow(<HeaderBar/>)
        expect(component).toMatchSnapshot();
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

})