// import React from 'react';
// import {shallow} from 'enzyme';
// import AddNotes from '../src/Components/Dashboard/AddNotes'
// import {Appbar, Snackbar} from 'react-native-paper'

// describe('test AddNotes', () => {
    
//     it('should match to snapshot', () => {
//         const component = shallow(<AddNotes />)
//         expect(component).toMatchSnapshot();
//     })

//     it('When title provided in textinput should update title state', async () => {
//         const component = shallow(<AddNotes/>)
//         expect(component.instance().state.title).toBe('')
//         component.instance().handleTitle('Title')
//         expect(component.instance().state.title).toBe('Title')
//     })

//     it('When note provided in textinput should update note state', async () => {
//         const component = shallow(<AddNotes />)
//         expect(component.instance().state.note).toBe('')
//         component.instance().handleNotes('This is note')
//         expect(component.instance().state.note).toBe('This is note')
//     })

//     it('test component in AddScreen component', () => {
//         const component = shallow(<AddNotes />)
//         expect(component.find(Appbar.Action)).toHaveLength(8)
//         expect(component.find(Appbar)).toHaveLength(4)
//         expect(component.find(Snackbar)).toHaveLength(3)
//     })

//     it('When onPress event of HandleDotIconButton it will call the RBSheet open function', async () => {
//         const RBSheet = {open : jest.fn()}
//         const onPressEvent = jest.fn();
//         const component = shallow(<AddNotes onPress = {onPressEvent} RBSheet = {RBSheet} />)
//         const instance = component.instance();
//         await instance.handleDotIconButton();
//         expect(onPressEvent).toHaveBeenCalled();
//         expect(RBSheet.open).toHaveBeenCalled();
//     })

//     it('when onDismiss event of Snackbar for empty note delete it will set isNoteNotAddedDeleted to be false', async () => {
//         const onDismissEvent = jest.fn();
//         const component = shallow(<AddNotes onDismiss = {onDismissEvent} />)
//         const instance = component.instance();
//         await instance.isNotAddedNoteDeletedSnackbarHandler();
//         expect(onDismissEvent).toHaveBeenCalled();
//         expect(instance.state.isNoteNotAddedDeleted).toBe(false)
//     })

//     it('When onPress event of back icon button when title and notes empty it will navigate to notes screen', async () => {
//         const navigation = { navigate : jest.fn() }
//         const onPressEvent = jest.fn();
//         const component = shallow(<AddNotes onPress = {onPressEvent} navigation = {navigation}/>)
//         const instance = component.instance();
//         instance.handleBackIconButton();
//         expect(onPressEvent).toHaveBeenCalled();
//         expect(navigation.navigate).toBeCalledWith("Notes");
//     })

//     it('When onPress event of back icon button when title and notes are not empty it will navigate to notes screen', async () => {
//         const navigation = { push : jest.fn() }
//         const onPressEvent = jest.fn();
//         const component = shallow(<AddNotes onPress = {onPressEvent} navigation = {navigation}/>)
//         const instance = component.instance();
//         instance.handleBackIconButton();
//         instance.handleTitle('title')
//         instance.handleNote('note')
//         expect(onPressEvent).toHaveBeenCalled();
//         expect(navigation.push).toBeCalledWith("Notes");
//     })


//     it('When onPress event of back icon button when title and notes are not empty it will navigate to notes screen', async () => {
//             const navigation = { push : jest.fn() }
//             const onPressEvent = jest.fn();
//             const component = shallow(<AddNotes onPress = {onPressEvent} navigation = {navigation}/>)
//             const instance = component.instance();
//             instance.handleTitle('Good Morning')
//             instance.handleNote('Good Morning')
//             await instance.handleBackIconButton();
//             expect(onPressEvent).toHaveBeenCalled();
//             expect(navigation.push).toBeCalledWith("Home");
//         })

//     it('When onPress event of restore Snackbar action it will set isDeleted to be 0', async () => {
//         const onPressEvent = jest.fn();
//         const component = shallow(<AddNotes onPress = {onPressEvent} />)
//         const instance = component.instance();
//         await instance.restoreSnackbarAction();
//         expect(onPressEvent).toHaveBeenCalled();
//     })

//     it('When onDismiss event of restore Snackbar it will set restoreSnackbar to be false', async () => {
//         const onDismissEvent = jest.fn();
//         const component = shallow(<AddNotes onDismiss = {onDismissEvent} />)
//         const instance = component.instance();
//         await instance.restoreSnackbarDismiss();
//         expect(onDismissEvent).toHaveBeenCalled();
//         expect(instance.state.restoreSnackbar).toBe(false)
//     })

//     it('When onPress event of restore Snackbar Action it will set isDeleted to be false', async () => {
//         const onPressEvent = jest.fn();
//         const component = shallow(<AddNotes onPress = {onPressEvent} />)
//         const instance = component.instance();
//         await instance.restoreDeleteSnackbarAction();
//         expect(onPressEvent).toHaveBeenCalled();
//         expect(instance.state.restoreSnackbar).toBe(false)
//     })

//     it('When onPress event of disabled TextInput it will set restoreSnackbar to be true', async () => {
//         const onPressEvent = jest.fn();
//         const component = shallow(<AddNotes onPress = {onPressEvent} />)
//         const instance = component.instance();
//         instance.setState({
//             isDeleted : 1
//         })
//         await instance.handlePressDisabledTextInput();
//         expect(onPressEvent).toHaveBeenCalled();
//         expect(instance.state.restoreSnackbar).toBe(true)
//     })

//     it('When onPress event of restore Delete Snackbar it will set deleteForeverDialog to be true', async () => {
//         const onDismissEvent = jest.fn();
//         const component = shallow(<AddNotes onDismiss = {onDismissEvent} />)
//         const instance = component.instance();
//         await instance.handleDeleteForeverButton();
//         expect(onDismissEvent).toHaveBeenCalled();
//         expect(instance.state.deleteForeverDialog).toBe(true)
//     })

//     it('When onDismiss event of delete forever dialog it will set deleteForeverDialog to be false', async () => {
//         const onDismissEvent = jest.fn();
//         const component = shallow(<AddNotes onDismiss = {onDismissEvent} />)
//         const instance = component.instance();
//         await instance.handleDeleteForeverDialogDismiss();
//         expect(onDismissEvent).toHaveBeenCalled();
//         expect(instance.state.deleteForeverDialog).toBe(false)
//     })

// })