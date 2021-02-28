import React from 'react';
import {shallow} from 'enzyme';
import RBSheetProfileOption from '../src/Components/Dashboard/RBSheetProfileOption'
import {Button} from 'react-native-paper'

describe('test RBSheetProfileOption', () => {

    it('should match to snapshot', () => {
        const component = shallow(<RBSheetProfileOption />)
        expect(component).toMatchSnapshot();
    })

    it('test component in RBSheetProfileOption component', () => {
        const component = shallow(<RBSheetProfileOption/>)
        expect(component.find(Button)).toHaveLength(3)
    })

})