import React from 'react';
import {shallow} from 'enzyme';
import BottomBar from '../../src/Components/Dashboard/BottomBar'

describe('test BottomBar', () => {
    
    it('should match to snapshot', () => {
        const component = shallow(<BottomBar />)
        expect(component).toMatchSnapshot();
    })

    it('test appbar action and icon in bottom bar component', () => {
        const component = shallow(<BottomBar />)
        expect(component.find(Appbar.Action)).toHaveLength(5)
        expect(component.find(Appbar.Action).at(0).props().icon).toEqual('check-box-outline')
        expect(component.find(Appbar.Action).at(1).props().icon).toEqual('brush')
        expect(component.find(Appbar.Action).at(2).props().icon).toEqual('microphone-outline')
        expect(component.find(Appbar.Action).at(3).props().icon).toEqual('panorama')
        expect(component.find(Appbar.Action).at(4).props().icon).toEqual('plus')
    })
    
})