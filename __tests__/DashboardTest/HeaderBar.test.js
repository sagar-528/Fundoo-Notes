import React from 'react';
import {shallow} from 'enzyme';
import HeaderBar from '../../src/Components/Dashboard/HeaderBar'

describe('test HeaderBar', () => {
    it('should match to snapshot', () => {
        const component = shallow(<HeaderBar/>)
        expect(component).toMatchSnapshot();
    })

    it('test onPress event of list view icon or grid view icon it will change the listView State', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<HeaderBar onPress = {onPressEvent}/>)
        const instance = component.instance();
        expect(instance.state.listView).toBe(true);
        await instance.selectView();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(1);
        expect(instance.state.listView).toBe(false);
        await instance.selectView();
        expect(onPressEvent).toHaveBeenCalled();
        expect(onPressEvent).toHaveBeenCalledTimes(2);
        expect(instance.state.listView).toBe(true);
    })

})