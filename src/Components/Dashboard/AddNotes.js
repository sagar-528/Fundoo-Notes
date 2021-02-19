import React, { Component } from 'react'
import AddNotesStyle from '../../Styles/AddNotes'
import {View, ScrollView, TextInput, TouchableWithoutFeedback, Text} from 'react-native'
import { Appbar, Snackbar, Provider, Portal, Dialog, Paragraph, Button } from 'react-native-paper'
import * as Keychain from 'react-native-keychain'
import RBSheet from 'react-native-raw-bottom-sheet'
import DotVerticalMenu from '../Dashboard/DotVerticalMenu'
import NoteDataControllerServices from '../../../Service/NoteDataControllerServices'
import DotsVerticalRestoreRBSheetMenu from './DotsVerticalRestoreRBSheetMenu'
import { connect } from 'react-redux'


class AddNotes extends Component {

constructor(props) {
    super(props)

    this.state = {
        noteKey : this.generateNoteKey(),
        title : '',
        note : '' ,
        userId : '',
        isDeleted : 0,
        labelId : '',
        isArchived : 0,
        isNoteNotAddedDeleted : false,
        deleteForeverDialog : false, 
        restoreDeleteSnackbar : false,
        restoreSnackbar : false,
        lableName : ''
    }
}

handleTitle = async(title) => {
await this.setState({
        title : title
    })
}

handleNotes = async(note) => {
await this.setState({
        note : note
    })
}

componentDidMount = async () => {
    const credential = await Keychain.getGenericPassword();
    const UserCredential = JSON.parse(credential.password);
    await this.setState({
        userId : UserCredential.user.uid
    })

    if(this.props.route.params != undefined) {
        await this.setState({
            noteKey : this.props.route.params.noteKey,
            title : this.props.route.params.notes.title,
            note : this.props.route.params.notes.note,
            isDeleted : this.props.route.params.notes.is_deleted,
            labelId : this.props.route.params.notes.label_id,
            isArchived : this.props.route.params.notes.is_archived,
        })
    }
    this.props.userLabel.map(async labels => {
        if(labels.label_id == this.state.labelId) {
            await this.setState({
                labelName : labels.label
            })
        }
    })
}

handleDotIconButton = () => {
    const {onPress} = this.props
    this.RBSheet.open()
    // onPress();
}

generateNoteKey = () => {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 20; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

handleBackIconButton = async() => {
     // const {onPress} = this.props
     const notes = {
        title : this.state.title,
        note : this.state.note,
        isDeleted : this.state.isDeleted,
        labelId : this.state.labelId,
        isArchived : this.state.isArchived
    }

     if(this.state.title != '' || this.state.note != '') {
        if(this.props.route.params == undefined) {
            NoteDataControllerServices.storeNote(this.state.noteKey, this.state.userId, notes)
                .then(() => this.props.navigation.push('Home', {screen : 'Notes'}))
        } 
        else if(this.state.isDeleted == 0){
            NoteDataControllerServices.updateNote(this.state.userId, this.state.noteKey, notes)
                .then(() => this.props.navigation.push('Home', {screen : 'Notes'}))
        }
        else {
            this.props.navigation.push('Home', {screen : 'Deleted'})
        }
    }
    else{
        if(this.props.route.params == undefined) {
            this.props.navigation.push('Home', { screen: 'Notes', params : {isEmptyNote : true}}) 
        } 
        else {
            NoteDataControllerServices.removeNote(this.state.userId, this.state.noteKey)
                .then(() => this.props.navigation.push('Home', {screen : 'Notes', params : {isEmptyNote : true}}))
        }
    }
    //onPress(); 
}

handleDeleteButton = async() => {
    this.RBSheet.close()
    
    const notes = {
        title : this.state.title,
        note : this.state.note,
        isDeleted : this.state.isDeleted,
        labelId : this.state.labelId,
        isArchived : this.state.isArchived
    }
    if(this.props.route.params == undefined || this.props.route.params.newNote){
        await this.setState({
            isNoteNotAddedDeleted : true
        })
    }
    else {
        NoteDataControllerServices.deleteNote(this.state.userId, this.state.noteKey, notes)
        .then(() => this.props.navigation.push('Home', { screen : 'Notes', params : {isNoteDeleted : true, 
                                                                                    noteKey : this.state.noteKey,
                                                                                    userId : this.state.userId}})) 
    }
}

handleLabelButton = () => {
    this.RBSheet.close();
    const notes = {
        title : this.state.title,
        note : this.state.note,
        isDeleted : this.state.isDeleted,
        labelId : this.state.labelId,
        isArchived : this.state.isArchived
    }
    if(this.props.route.params == undefined) {
        this.props.navigation.push('SelectLabel', { noteKey : this.state.noteKey, notes : notes, newNote : true})
    }
    else {
        this.props.navigation.push('SelectLabel', { noteKey : this.state.noteKey, notes : notes})
    }
}

isNotAddedNoteDeletedSnackbarHandler = async () => {
    const {onDismiss} = this.props
    await this.setState({ 
        isNoteNotAddedDeleted : false
    })
    // onDismiss();
}

handleDeleteForeverDialogDismiss = async () => {
    await this.setState({
        deleteForeverDialog : false
    })
}

handleDeleteForeverButton = async () => {
    this.RBSheet.close()
    await this.setState({
        deleteForeverDialog : true
    })
}

handleRestoreButton = () => {
    this.RBSheet.close()
    NoteDataControllerServices.restoreNote(this.state.userId, this.state.noteKey)
        .then(async () => {
            await this.setState({
                isDeleted : 0,
                restoreDeleteSnackbar : true
            })
        })
}

handleDeleteForeverActionButton = () => {
    NoteDataControllerServices.removeNote(this.state.userId, this.state.noteKey)
        .then(() => this.props.navigation.push('Home', {screen : 'Deleted'}))
}

restoreDeleteSnackbarDismiss = () => {
    this.setState({
        restoreDeleteSnackbar : false
    })
}

restoreDeleteSnackbarAction = () => {
    const notes = {
        title : this.state.title,
        note : this.state.note,
        isDeleted : this.state.isDeleted,
        labelId : this.state.labelId,
        isArchived : this.state.isArchived
    }

    NoteDataControllerServices.deleteNote(this.state.userId, this.state.noteKey, notes)
        .then(() => {
            this.setState({
                isDeleted : 1
            })
        })
}

handlePressDisabledTextInput = () => {
    if(this.state.isDeleted == 1) {
        this.setState({
            restoreSnackbar : true
        })
    }
}

restoreSnackbarDismiss = () => {
    this.setState({
        restoreSnackbar : false
    })
}

restoreSnackbarAction = () => {
    NoteDataControllerServices.restoreNote(this.state.userId, this.state.noteKey)
        .then(() => {
            this.setState({
                isDeleted : 0
            })
        })
}

    render() {
        return (
            <Provider>
            <View style = {AddNotesStyle.mainContainer}>
            <View>
                <Appbar style = {AddNotesStyle.header_style}>
                    <Appbar.Action 
                        style = {{marginLeft : 10}}
                        icon = 'keyboard-backspace'
                        onPress = {this.handleBackIconButton}
                    />
                    <Appbar.Content />

                {
                (this.state.isDeleted == 0) ? 
                    <Appbar style = {{backgroundColor : 'transparent'}}>
                    <Appbar.Action
                        style = {AddNotesStyle.header_icon_style}                             
                        icon = 'pin-outline'/>
                    <Appbar.Action    
                        style = {AddNotesStyle.header_icon_style}                          
                        icon = 'bell-plus-outline'/>
                    <Appbar.Action 
                        icon = 'archive-arrow-down-outline'/>
                    </Appbar>
                    :
                    null
                }
                </Appbar>
            </View>
            <ScrollView style = {{marginBottom : 60}}> 
            <TouchableWithoutFeedback onPress = {this.handlePressDisabledTextInput}>
                <View>    
                    <TextInput
                        style = {AddNotesStyle.title_style}
                        multiline = {true} 
                        placeholder = 'Title'
                        onChangeText = {this.handleTitle}
                        value = {this.state.title}
                        editable = {(this.state.isDeleted == 1) ? false : true} 
                    />
                    <TextInput
                        style = {AddNotesStyle.note_style}
                        multiline = {true} 
                        placeholder = 'Note'
                        onChangeText = {this.handleNotes}
                        value = {this.state.note}
                        editable = {(this.state.isDeleted == 1) ? false : true}
                    />

                    {
                        (this.state.labelName != '') ?
                            <TouchableWithoutFeedback onPress = {this.handleLabelButton}>
                                <View style = {AddNotesStyle.label_text_container}>
                                    <Text style = {AddNotesStyle.label_text}>Add Label</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        :
                        null
                    }

                </View>
            </TouchableWithoutFeedback>    
            </ScrollView>
            <View style = {AddNotesStyle.bottom_view}>
                <Appbar style = {AddNotesStyle.bottom_appbar_style}>
                    <Appbar.Action 
                        icon = 'plus-box-outline'/>
                    <Appbar.Content/>
            {
                (this.state.isDeleted == 0) ? 
                    <Appbar style = {{backgroundColor : 'transparent'}}>
                    <Appbar.Action 
                        icon = 'undo-variant'/>
                    <Appbar.Action 
                        icon = 'redo-variant'/>
                    </Appbar>
                :
                null
            }
            <Appbar.Content/>
            <Appbar.Action 
                icon = 'dots-vertical'
                onPress = {this.handleDotIconButton}/>
            </Appbar>
            </View>
            
            {this.state.isDeleted == 0 ?
            <RBSheet
                    ref = {ref => {this.RBSheet = ref}}
                    height = {250}
                    customStyles = {{
                        container : {
                            marginBottom : 50,
                            borderTopWidth : 1,
                            borderColor : "#d3d3d3",   
                        },
                        wrapper: {
                            backgroundColor: "transparent",
                        },
                    }}>
                  <DotVerticalMenu delete = {this.handleDeleteButton} label = {this.handleLabelButton}/>     
                </RBSheet>
                :
                <RBSheet
                    ref = {ref => {this.RBSheet = ref}}
                    height = {110}
                    customStyles = {{
                        container : {
                            marginBottom : 50,
                            borderTopWidth : 1,
                            borderColor : "#d3d3d3", 
                        },
                        wrapper: {
                            backgroundColor: "transparent",
                        },
                    }}>
                        <DotsVerticalRestoreRBSheetMenu restore = {this.handleRestoreButton} deleteForever = {this.handleDeleteForeverButton}/>
                </RBSheet>
                }
                <Snackbar
                    style = {{marginBottom : 100}}
                    visible={this.state.isNoteNotAddedDeleted}
                    onDismiss={this.isNotAddedNoteDeletedSnackbarHandler}
                    duration = {10000}>
                    Notes not added can't be deleted
                </Snackbar>
                <Snackbar
                style = {{marginBottom : 100}}
                visible={this.state.restoreDeleteSnackbar}
                onDismiss={this.restoreDeleteSnackbarDismiss}
                duration = {10000}
                action = {{
                    label : 'Undo',
                    onPress : this.restoreDeleteSnackbarAction
                }}>
                    Note Restored
            </Snackbar>
            <Snackbar
                style = {{marginBottom : 100}}
                visible={this.state.restoreSnackbar}
                onDismiss={this.restoreSnackbarDismiss}
                duration = {10000}
                action = {{
                    label : 'Restore',
                    onPress : this.restoreSnackbarAction
                }}>
                    Can't edit in Recycle Bin
            </Snackbar>
            <Portal>
                <Dialog visible = {this.state.deleteForeverDialog} onDismiss = {this.handleDeleteForeverDialogDismiss}>
                    <Dialog.Content>
                        <Paragraph style = {{fontSize : 16}}>Delete this note forever?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button color = 'blue' onPress = {this.handleDeleteForeverDialogDismiss}>Cancel</Button>
                        <Button color = 'blue' onPress = {this.handleDeleteForeverActionButton}>Delete</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
        </Provider>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        userLabel : state.createLabelReducer.userLabel
    }
}

export default connect(mapStateToProps)(AddNotes)
