import React from 'react';
import {shallow} from 'enzyme';
import DotsVerticalRestoreRBSheetMenu from '../src/Components/Dashboard/DotsVerticalRestoreRBSheetMenu'
import { Menu, TouchableRipple } from 'react-native-paper';

describe('test DotsVerticalRestoreRBSheetMenu', () => {

    it('should match to snapshot', () => {
        const component = shallow(<DotsVerticalRestoreRBSheetMenu />)
        expect(component).toMatchSnapshot();
    })

    it('When menu item in DotsVerticalRBSheetMenu component', () => {
        const component = shallow(<DotsVerticalRestoreRBSheetMenu />)
        expect(component.find(Menu.item)).toHaveLength(2)
        expect(component.find(TouchableRipple)).toHaveLength(2)
    })

})