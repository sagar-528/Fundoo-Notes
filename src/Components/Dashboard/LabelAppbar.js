import React, {Component} from 'react';
import {TextInput, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Appbar, Dialog, Paragraph, Portal, Button} from 'react-native-paper';
import { connect } from 'react-redux'
import LabelAppBarStyle from '../../Styles/LabelAppbar'
import {storeUserLabel} from '../../Redux/Actions/CreateNewLabelActions'
import NoteDataControllerServices from '../../../Service/NoteDataControllerServices'
import SQLiteLabelServices from '../../../Service/SQLiteLabelServices'

class LabelAppbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit : false,
            editTextInput : this.props.labels.label_name,
            emptyMsg : false,
            errorMsg : false,
            dialogVisible : false
        }
    }
    
    handleCheckButton = async () => {
        const label = {
            labelName : this.state.editTextInput,
            noteId : this.props.labels.note_id
        }

        if(!this.state.errorMsg && !this.state.emptyMsg) {
            NoteDataControllerServices.updateLabel(this.props.userId, this.props.labelKey, label)
                .then(() => {
                    SQLiteLabelServices.selectLabelFromSQliteStorage(this.props.userId)
                        .then(async result => {
                            var temp = [];
                            if(result.rows.length != 0) {
                                for (let i = 0; i < result.rows.length; ++i)
                                    temp.push(result.rows.item(i));
                            }
                            console.log('updated', temp)
                            this.props.storeUserLabel(temp)
                            this.props.selectActiveLabel('')
                        }) 
                    .catch(error => console.log(error)) 
                })
                .catch(error => console.log(error))
        }
    }

    handleEditButton = () => {
        this.props.selectActiveLabel(this.props.labelKey)
        this.setState({
            editTextInput : this.props.labels.label_name
        })
    }

    handleEditTextInput = async (editText) => {
        let temp = []
        if(this.props.userLabel.length > 0) {
            this.props.userLabel.map(labels => {
                temp.push(labels.label_name.toLowerCase())
            })
        }
        await this.setState({
            editTextInput : editText
        })
        if(this.state.editTextInput == '') {
            await this.setState({
                emptyMsg : true,
            })
        }
        else {
            await this.setState({
                emptyMsg : false
            })
            if(temp.includes(this.state.editTextInput.toLowerCase())) {
                if(this.state.editTextInput.toLowerCase() == this.props.labels.label_name.toLowerCase()) {
                    await this.setState({
                        errorMsg : false,
                    })
                } else {
                    await this.setState({
                        errorMsg : true,
                    })
                }
            } else {
                await this.setState({
                    errorMsg : false,
                })
            }
        }
    }

    handleDeleteButton = () => {
        this.setState({
            dialogVisible : true
        })
        this.props.selectActiveLabel('')
    }

    handleDeleteDialogButton = () => {
        NoteDataControllerServices.removeLabel(this.props.userId, this.props.labelKey)
            .then(() => {
                SQLiteLabelServices.selectLabelFromSQliteStorage(this.props.userId)
                .then(async result => {
                    var temp = [];
                    if(result.rows.length != 0) {
                        for (let i = 0; i < result.rows.length; ++i)
                            temp.push(result.rows.item(i));
                    }
                    this.props.storeUserLabel(temp)
                        this.setState({
                            dialogVisible : false
                        })
                    }) 
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))

            if(this.props.userNotes.length > 0) {
                this.props.userNotes.map(notes => {
                    let labelId = JSON.parse(notes.label_id)
                    if(labelId.includes(this.props.labelKey)) {
                        let index = labelId.indexOf(this.props.labelKey)
                        labelId.splice(index, 1)
                        NoteDataControllerServices.updateNoteLabel(this.props.userId, notes.note_id, JSON.stringify(labelId))
                    }
                })
            }   
    }

    handleDialogDissmiss = () => {
        this.setState({
            dialogVisible : false
        })
    }

    render() {
        return(
            <View>
            <Appbar style = {{backgroundColor : 'transparent'}}>
                {
                    (this.props.activeLabel == this.props.labelKey) ?
                    <Appbar.Action 
                        icon = 'delete-outline'
                        style = {{marginLeft : 10}}
                        onPress = {this.handleDeleteButton}/>
                    :
                    <Appbar.Action 
                        icon = 'label-outline'
                        style = {{marginLeft : 10}}/> 
                }
                {
                    (this.props.activeLabel == this.props.labelKey)?
                    <View style = {{flexDirection :'column', width : '65%'}}>
                        <TextInput
                            style = {(this.state.errorMsg || this.state.emptyMsg) ? LabelAppBarStyle.textinput_error_style : LabelAppBarStyle.textinput_style}
                            onFocus = {this.handleEditButton}
                            autoFocus = {this.props.activeLabel == this.props.labelKey ? true : false}
                            onChangeText = {this.handleEditTextInput}
                            value = {this.state.editTextInput}
                        />
                        {
                            (this.state.emptyMsg) ?
                                <Text style = {LabelAppBarStyle.text_error_style}>
                                    Enter a Label Name
                                </Text>
                                :
                                (this.state.errorMsg) ?
                                    <Text style = {LabelAppBarStyle.text_error_style}>
                                        Label Already Exist
                                    </Text>
                                    :
                                    null
                        }
                    </View>
                    :
                    <TouchableWithoutFeedback onPress = {this.handleEditButton}>
                        <View style = {{width : '65%'}}>
                            <Text
                                style = {LabelAppBarStyle.text_style}>
                                {this.props.labels.label_name}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                <Appbar.Content/>
                {
                    (this.props.activeLabel == this.props.labelKey) ?
                    <Appbar.Action 
                        icon = 'check'
                        onPress = {this.handleCheckButton}/>
                    :
                    <Appbar.Action 
                        icon = 'pencil'
                        onPress = {this.handleEditButton}/>
                }
            </Appbar>
            <Portal>
                    <Dialog visible = {this.state.dialogVisible} onDismiss = {this.handleDialogDissmiss}>
                    <Dialog.Title
                        style = {{fontSize : 18}}>
                            Delete Label?
                    </Dialog.Title>
                    <Dialog.Content
                        style = {{paddingBottom : 5}}>
                        <Paragraph
                            style = {{fontSize : 18}}>
                            We'll delete this label and remove it from all of your notes. Your notes won't be deleted.
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions
                        style = {{marginBottom : 5}}>
                        <Button 
                            onPress = {this.handleDialogDissmiss}
                            color = 'blue'
                            style = {{marginRight : 10}}>
                                Cancel
                        </Button>
                        <Button 
                            onPress = {this.handleDeleteDialogButton}
                            color = 'blue'
                            style = {{marginRight : 20}}>
                                Delete
                        </Button>
                    </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        userLabel : state.createLabelReducer.userLabel
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeUserLabel : (userLabel) => dispatch(storeUserLabel(userLabel))
    }
}
 export default connect(mapStateToProps,mapDispatchToProps)(LabelAppbar)
