import React from 'react';
import {shallow} from 'enzyme';
import DotVerticalMenu from '../src/Components/Dashboard/DotVerticalMenu'
import { Menu, TouchableRipple } from 'react-native-paper';

describe('test DotsVerticalRBSheetMenu', () => {

    it('should match to snapshot', () => {
        const component = shallow(<DotVerticalMenu />)
        expect(component).toMatchSnapshot();
    })

    it('When menu item in DotsVerticalRBSheetMenu component', () => {
        const component = shallow(<DotVerticalMenu />)
        expect(component.find(Menu.item)).toHaveLength(5)
        expect(component.find(TouchableRipple)).toHaveLength(5)
    })

})