import React from 'react';
import {shallow} from 'enzyme';
import DrawerContent from '../../src/Components/Dashboard/DrawerContent'

describe('test Drawer Content', () => {
    
    it('should match to snapshot', () => {
        const component = shallow(<DrawerContent />)
        expect(component).toMatchSnapshot();
    })

})