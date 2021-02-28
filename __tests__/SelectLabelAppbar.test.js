import React from 'react';
import {shallow} from 'enzyme';
import SelectLabelAppbar from '../src/Components/Dashboard/SelectLabelAppbar';

describe('test SelectLabelAppbar', () => {
    it('should match to snapshot', () => {
        const component = shallow(<SelectLabelAppbar />)
        expect(component).toMatchSnapshot();
    })

})