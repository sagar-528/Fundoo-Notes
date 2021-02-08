import React from 'react';
import {shallow} from 'enzyme';
import AddNotes from '../../src/Components/Dashboard/AddNotes'

describe('test AddNotes', () => {
    
    it('should match to snapshot', () => {
        const component = shallow(<AddNotes />)
        expect(component).toMatchSnapshot();
    })

    it('test when title provided in textinput should update title state', async () => {
        const component = shallow(<AddNotes/>)
        expect(component.instance().state.title).toBe('')
        component.instance().handleTitle('Good Morning')
        expect(component.instance().state.title).toBe('Good Morning')
    })

    it('test when note provided in textinput should update note state', async () => {
        const component = shallow(<AddNotes/>)
        expect(component.instance().state.note).toBe('')
        component.instance().handleNotes('Good Morning')
        expect(component.instance().state.note).toBe('Good Morning')
    })

    it('test onPress event of back icon button when title and notes empty it will navigate to notes screen', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<AddNotes onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.handleBackIconButton();
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("Home");
    })

    it('test onPress event of back icon button when title and notes are not empty it will navigate to notes screen', async () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<AddNotes onPress = {onPressEvent} navigation = {navigation}/>)
        const instance = component.instance();
        instance.handleBackIconButton();
        instance.handleTitle('Good Morning')
        instance.handleNote('Good Morning')
        expect(onPressEvent).toHaveBeenCalled();
        expect(navigation.navigate).toBeCalledWith("Home");
    })
})