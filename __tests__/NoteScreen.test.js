import React from 'react';
import {shallow} from 'enzyme';
import NoteScreen from '../src/Components/Dashboard/NoteScreen';


describe('test NoteScreen', () => {
    
    it('should match to snapshot', () => {
        const component = shallow(<NoteScreen />)
        expect(component).toMatchSnapshot();
    })

    it('When onPress event of list view icon or grid view icon it will change the listView State', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<NoteScreen onPress = {onPressEvent}/>)
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

    it('When onDismiss event of snackbar for empty note it will change the showEmptyNoteSnackbar State to be false', async () => {
        const navigation = { setParams : jest.fn() }
        const onDismissEvent = jest.fn();
        const component = shallow(<NoteScreen onDismiss = {onDismissEvent}/>)
        const instance = component.instance();
        await instance.emptyNoteSnackbarHandler();
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.showEmptyNoteSnackbar).toBe(false);
        expect(navigation.setParams).toHaveBeenCalled()
    })

    it('When onDismiss event of snackbar for delete note it will change the showDeletedNoteSnackbar State to be false', async () => {
        const onDismissEvent = jest.fn();
        const component = shallow(<NoteScreen onDismiss = {onDismissEvent}/>)
        const instance = component.instance();
        await instance.deletedNoteSnackbarHandler();
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.showDeletedNoteSnackbar).toBe(false);
    })
    
    it('When onPress method action button Undo in Snackbar it will call the UserNotesServices restoreNoteInFirebase method', async () => {
        const onPressEvent = jest.fn();
        const UserNotesServices = {restoreNoteInFirebase : jest.fn()}
        const component = shallow(<NoteScreen onPress= {onPressEvent} />)
        const instance = component.instance();
        await instance.restoreNotes();
        expect(onPressEvent).toHaveBeenCalled();
        
    })

    it('When onPress event of profile icon button it will set showProfileModal to be true', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<NoteScreen onPress = {onPressEvent}/>)
        const instance = component.instance();
        await instance.showModal();
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.showProfileModal).toBe(true);
    })

    it('When onDismiss event of profile modal it will set showProfileModal to be false', async () => {
        const onDismissEvent = jest.fn();
        const component = shallow(<NoteScreen onDismiss = {onDismissEvent}/>)
        const instance = component.instance();
        await instance.hideModal();
        expect(onDismissEvent).toHaveBeenCalled();
        expect(instance.state.showProfileModal).toBe(false);
    })

    it('When onPress event of change image method it will set showProfileModal to be false', async () => {
        const onPressEvent = jest.fn();
        const component = shallow(<NoteScreen onPress = {onPressEvent}/>)
        const instance = component.instance();
        await instance.changeImage();
        expect(onPressEvent).toHaveBeenCalled();
        expect(instance.state.showProfileModal).toBe(false);
    })

})