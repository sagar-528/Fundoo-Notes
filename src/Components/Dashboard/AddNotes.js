import React, { Component } from 'react'
import AddNotesStyle from '../../Styles/AddNotes'
import {View, ScrollView, TextInput, TouchableWithoutFeedback, Text} from 'react-native'
import { Appbar, Snackbar, Provider, Portal, Dialog, Paragraph, Button } from 'react-native-paper'
import * as Keychain from 'react-native-keychain'
import RBSheet from 'react-native-raw-bottom-sheet'
import DotVerticalMenu from '../Dashboard/DotVerticalMenu'
import NoteDataControllerServices from '../../../Service/NoteDataControllerServices'
import DotsVerticalRestoreRBSheetMenu from './DotsVerticalRestoreRBSheetMenu'
import {storeUserLabel} from '../../Redux/Actions/CreateNewLabelActions'
import SQLiteLabelServices from '../../../Service/SQLiteLabelServices'
import { connect } from 'react-redux'


class AddNotes extends Component {

constructor(props) {
    super(props)

    this.state = {
        noteKey : '',
        title : '',
        note : '' ,
        userId : '',
        isDeleted : 0,
        labelId : [],
        isArchived : 0,
        isNoteNotAddedDeleted : false,
        deleteForeverDialog : false, 
        restoreDeleteSnackbar : false,
        noteUnArchivedSnackbar : false,
        restoreSnackbar : false,
    }
}

handleTitle = (title) => {
 this.setState({
        title : title
    })
}

handleNotes = (note) => {
 this.setState({
        note : note
    })
}

componentDidMount = async () => {
    const credential = await Keychain.getGenericPassword();
    const UserCredential = JSON.parse(credential.password);
    await this.setState({
        userId : UserCredential.user.uid
    })

    if(!this.props.route.params.newNote) {
        await this.setState({
            noteKey : this.props.route.params.noteKey,
            title : this.props.route.params.notes.title,
            note : this.props.route.params.notes.note,
            isDeleted : this.props.route.params.notes.is_deleted,
            labelId : JSON.parse(this.props.route.params.notes.label_id),
            isArchived : this.props.route.params.notes.is_archived,
        })
    }
    else {
        if(this.props.route.params.labelId == undefined) {
            if (this.props.route.params.notes != undefined) {
                await this.setState({
                    noteKey : this.props.route.params.noteKey,
                    title : this.props.route.params.notes.title,
                    note : this.props.route.params.notes.note,
                    isDeleted : this.props.route.params.notes.is_deleted,
                    labelId : JSON.parse(this.props.route.params.notes.label_id),
                    isArchived : this.props.route.params.notes.is_archived,
                })
            } else {
                await this.setState({
                    noteKey : this.generateNoteKey()
                })
            }
        } else {
            await this.setState({
                noteKey : this.generateNoteKey(),
                labelId : JSON.parse(this.props.route.params.labelId)
            })
        }
    }
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
     const {onPress} = this.props
     
     const notes = {
        title : this.state.title,
        note : this.state.note,
        isDeleted : this.state.isDeleted,
        labelId : JSON.stringify(this.state.labelId),
        isArchived : this.state.isArchived
    }

     if(this.state.title != '' || this.state.note != '') {
        if(this.props.route.params.newNote) {
            
            this.updateNoteIdInLabel()
            NoteDataControllerServices.storeNote(this.state.noteKey, this.state.userId, notes)
            .then(() => {
                if(this.props.screenName != 'labelNote') {
                    this.props.navigation.push('Home', {screen : this.props.screenName})
                } else {
                    this.props.navigation.push('Home', { screen : this.props.screenName, 
                                                         params : {labels : this.props.labelKey}})
                }
            })
        }

        else {

            this.updateNoteIdInLabel();
            NoteDataControllerServices.updateNote(this.state.noteKey, this.state.userId, notes)
            .then(() => {
                if(this.props.screenName != 'labelNote') {
                    this.props.navigation.push('Home', { screen : this.props.screenName })
                } else {
                    this.props.navigation.push('Home', { screen : this.props.screenName, 
                                                         params : { labels : this.props.labelKey }})
                }
            })
        }
    }

    else{
        if(this.props.route.params.newNote) {
            if(this.props.screenName != 'labelNote') {
                this.props.navigation.push('Home', { screen: this.props.screenName, 
                                                     params : {isEmptyNote : true}}) 
            } else {
                this.props.navigation.push('Home', { screen : this.props.screenName, 
                                                     params : { labels : this.props.labelKey,
                                                                isEmptyNote : true }})
            }
        } 
        else {
            this.removeNoteIdinLabel();
            NoteDataControllerServices.removeNote(this.state.userId, this.state.noteKey)
            .then(() => {
                if(this.props.screenName != 'labelNote') {
                    this.props.navigation.push('Home', { screen: this.props.screenName, 
                                                         params : {isEmptyNote : true}}) 
                } else {
                    this.props.navigation.push('Home', { screen : this.props.screenName, 
                                                         params : { labels : this.props.labelKey,
                                                                    isEmptyNote : true }})
                }
            })
        }
    }
    // onPress(); 
}

handleDeleteButton = async() => {
    this.RBSheet.close()
    
    await this.setState({
        isDeleted : 0
    })

    const notes = {
        title : this.state.title,
        note : this.state.note,
        isDeleted : this.state.isDeleted,
        labelId : JSON.stringify(this.state.labelId),
        isArchived : this.state.isArchived
    }
    if(this.props.route.params.newNote){
        await this.setState({
            isNoteNotAddedDeleted : true
        })
    }
    else {
        this.updateNoteIdInLabel();
        NoteDataControllerServices.deleteNote(this.state.userId, this.state.noteKey, notes)
        .then(() => {
            if(this.props.screenName != 'labelNote') {
                this.props.navigation.push('Home', { screen: this.props.screenName, 
                                                     params : {isNoteDeleted : true, 
                                                               noteKey : this.state.noteKey,
                                                               userId : this.state.userId}}) 
            } else {
                this.props.navigation.push('Home', { screen : this.props.screenName, 
                                                     params : { labels : this.props.labelKey,
                                                                isNoteDeleted : true, 
                                                                noteKey : this.state.noteKey,
                                                                userId : this.state.userId}})
            }                               
        })    
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
    if(this.props.route.params.newNote) {
        this.props.navigation.push('SelectLabel', { noteKey : this.state.noteKey, notes : notes, newNote : true})
    }
    else {
        this.props.navigation.push('SelectLabel', { noteKey : this.state.noteKey, notes : notes, newNote : false})
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
    const {onDismiss} = this.props
    await this.setState({
        deleteForeverDialog : false
    })
    // onDismiss();
}

handleDeleteForeverButton = async () => {
    const {onDismiss} = this.props
    this.RBSheet.close()
    await this.setState({
        deleteForeverDialog : true
    })
    // onDismiss();
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
    this.removeNoteIdinLabel();
    NoteDataControllerServices.removeNote(this.state.userId, this.state.noteKey)
        .then(() => this.props.navigation.push('Home', {screen : 'Deleted'}))
}

restoreDeleteSnackbarDismiss = () => {
    this.setState({
        restoreDeleteSnackbar : false
    })
}

restoreDeleteSnackbarAction = async() => {
    await this.setState({
        isDeleted : 1
    })

    const notes = {
        title : this.state.title,
        note : this.state.note,
        isDeleted : this.state.isDeleted,
        labelId : JSON.stringify(this.state.labelId),
        isArchived : this.state.isArchived
    }
    this.updateNoteIdInLabel()
    NoteDataControllerServices.deleteNote(this.state.userId, this.state.noteKey, notes)
}

handlePressDisabledTextInput = () => {
    const {onPress} = this.props;
    if(this.state.isDeleted == 1) {
        this.setState({
            restoreSnackbar : true
        })
    }
    // onPress();
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

handleArchiveDownButton = async () => {
    await this.setState({
        isArchived : 1
    })
    const notes = {
        title : this.state.title,
        note : this.state.note,
        isDeleted : this.state.isDeleted,
        labelId : JSON.stringify(this.state.labelId),
        isArchived : this.state.isArchived
    }
    if(this.state.title != '' || this.state.note != '') {
        if(this.props.route.params.newNote) {
            this.updateNoteIdInLabel()
            NoteDataControllerServices.storeNote(this.state.noteKey, this.state.userId, notes)
            .then(() => {
                if(this.props.screenName != 'labelNote') {
                    this.props.navigation.push('Home', {screen : this.props.screenName, 
                                                        params : {isNoteArchived : true, 
                                                                  noteKey : this.state.noteKey,
                                                                  userId : this.state.userId,
                                                                  notes : notes}})
                } else {
                    this.props.navigation.push('Home', { screen : this.props.screenName, 
                                                         params : {labels : this.props.labelKey,
                                                                    isNoteArchived : true, 
                                                                    noteKey : this.state.noteKey,
                                                                    userId : this.state.userId,
                                                                    notes : notes}})
                }
            })
        } 
        else {
            this.updateNoteIdInLabel()
            NoteDataControllerServices.updateNote(this.state.noteKey, this.state.userId, notes)
            .then(() => {
                if(this.props.screenName != 'labelNote') {
                    this.props.navigation.push('Home', {screen : this.props.screenName, 
                                                        params : {isNoteArchived : true, 
                                                                  noteKey : this.state.noteKey,
                                                                  userId : this.state.userId,
                                                                  notes : notes}})
                } else {
                    this.props.navigation.push('Home', { screen : this.props.screenName, 
                                                         params : { labels : this.props.labelKey,
                                                                    isNoteArchived : true, 
                                                                    noteKey : this.state.noteKey,
                                                                    userId : this.state.userId,
                                                                    notes : notes}})
                }
            }) 
        }
    }
    else{
        if(this.props.route.params.newNote) {
            if(this.props.screenName != 'labelNote') {
                this.props.navigation.push('Home', { screen: this.props.screenName, 
                                                     params : {isEmptyNote : true}}) 
            } else {
                this.props.navigation.push('Home', { screen : this.props.screenName, 
                                                     params : { labels : this.props.labelKey,
                                                                isEmptyNote : true }})
            } 
        } 
        else {
            this.removeNoteIdinLabel();
            NoteDataControllerServices.removeNote(this.state.userId, this.state.noteKey)
            .then(() => {
                if(this.props.screenName != 'labelNote') {
                    this.props.navigation.push('Home', { screen: this.props.screenName, 
                                                         params : {isEmptyNote : true}}) 
                } else {
                    this.props.navigation.push('Home', { screen : this.props.screenName, 
                                                         params : { labels : this.props.labelKey,
                                                                    isEmptyNote : true }})
                }
            })
        }
    }
    // onPress();
}

handleArchiveUpButton = async () => {
    await this.setState({
        isArchived : 0,
        noteUnArchivedSnackbar : true
    })
    const notes = {
        title : this.state.title,
        note : this.state.note,
        isDeleted : this.state.isDeleted,
        labelId : JSON.stringify(this.state.labelId),
        isArchived : this.state.isArchived
    }
    this.updateNoteIdInLabel()
    NoteDataControllerServices.updateNote(this.state.noteKey, this.state.userId, notes)
}

unArchiveSnackbarDismiss = () => {
    this.setState({
        noteUnArchivedSnackbar : false
    })
}

archiveSnackbarAction = async () => {
    await this.setState({
        isArchived : 1,
    })
    const notes = {
        title : this.state.title,
        note : this.state.note,
        isDeleted : this.state.isDeleted,
        labelId : JSON.stringify(this.state.labelId),
        isArchived : this.state.isArchived
    }
    
    this.updateNoteIdInLabel()
    NoteDataControllerServices.updateNote(this.state.noteKey, this.state.userId, notes)
}

updateNoteIdInLabel = () => {
    let noteId
    if(this.state.labelId.length > 0) {
        this.props.userLabel.map(label => {
            if(this.state.labelId.includes(label.label_id)){
                noteId = JSON.parse(label.note_id)
                if(!noteId.includes(this.state.noteKey)) {
                    noteId.push(this.state.noteKey)
                    const labels = {
                        labelName : label.label_name,
                        noteId : JSON.stringify(noteId)
                    }
                    NoteDataControllerServices.updateLabel(this.props.userId, label.label_id, labels)
                    this.updateLabelinReduxStore();
                }
            } else {
                noteId = JSON.parse(label.note_id)
                if(noteId.includes(this.state.noteKey)){
                    let index = noteId.indexOf(this.state.noteKey)
                    noteId.splice(index, 1)
                    const labels = {
                        labelName : label.label_name,
                        noteId : JSON.stringify(noteId)
                    }
                    NoteDataControllerServices.updateLabel(this.props.userId, label.label_id, labels)
                    this.updateLabelinReduxStore()
                }
            }
        })  
    } else {
        this.props.userLabel.map(label => {
            noteId = JSON.parse(label.note_id);
            if(noteId.includes(this.state.noteKey)) {
                let index = noteId.indexOf(this.state.noteKey)
                noteId.splice(index, 1)
                const labels = {
                    labelName : label.label_name,
                    noteId : JSON.stringify(noteId)
                }
                NoteDataControllerServices.updateLabel(this.props.userId, label.label_id, labels)
                this.updateLabelinReduxStore();
            }
        })
    }
}

removeNoteIdinLabel = () => {
    let noteId
    this.props.userLabel.map(label => {
        noteId = JSON.parse(label.note_id);
        if(noteId.includes(this.state.noteKey)) {
            let index = noteId.indexOf(this.state.noteKey)
            noteId.splice(index, 1)
            const labels = {
                labelName : label.label_name,
                noteId : JSON.stringify(noteId)
            }
            NoteDataControllerServices.updateLabel(this.props.userId, label.label_id, labels)
            this.updateLabelinReduxStore();
        }
    })        
}

updateLabelinReduxStore = () => {
    SQLiteLabelServices.selectLabelFromSQliteStorage(this.props.userId)
        .then(async result => {
            var temp = [];
            if(result.rows.length != 0) {
                for (let i = 0; i < result.rows.length; ++i)
                    temp.push(result.rows.item(i));
            }
            this.props.storeUserLabel(temp)
        })
        .catch(error => console.log(error))
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
                    
                        {
                            (this.state.isArchived == 0) ?
                                <Appbar.Action 
                                    icon = 'archive-arrow-down-outline'
                                    onPress = {this.handleArchiveDownButton}/>
                                :
                                <Appbar.Action 
                                    icon = 'archive-arrow-up-outline'
                                    onPress = {this.handleArchiveUpButton}/>
                        }

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
                    <View style = {AddNotesStyle.label_text_container}>
                    {
                        (this.state.labelId.length > 0) ?
                        this.props.userLabel.map(labels => (
                            this.state.labelId.includes(labels.label_id) ?
                               <React.Fragment key = {labels.label_id}>
                                    <TouchableWithoutFeedback onPress = {this.handleLabelButton}>
                                        <View>
                                            <Text style = {AddNotesStyle.label_text}>{labels.label_name}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </React.Fragment>
                            :
                            null
                        ))
                        :
                        null
                    }
                </View>
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
            <Snackbar
                style = {{marginBottom : 100}}
                visible={this.state.noteUnArchivedSnackbar}
                onDismiss={this.unArchiveSnackbarDismiss}
                duration = {10000}
                action = {{
                label : 'Undo',
                onPress : this.archiveSnackbarAction
                }}>
                    Note Unarchieved
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
        userLabel : state.createLabelReducer.userLabel,
        screenName : state.createLabelReducer.screenName,
        labelKey : state.createLabelReducer.labelKey,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeUserLabel : (userLabel) => dispatch(storeUserLabel(userLabel))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNotes)
