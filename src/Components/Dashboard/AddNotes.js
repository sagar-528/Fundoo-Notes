import React, { Component } from 'react'
import AddNotesStyle from '../../Styles/AddNotes'
import {View, ScrollView, TextInput} from 'react-native'
import { Appbar, Menu,Snackbar } from 'react-native-paper'
import * as Keychain from 'react-native-keychain'
import UserNotesServices from '../../../Service/UserNotesServices'
import RBSheet from 'react-native-raw-bottom-sheet'
import Icon from 'react-native-vector-icons/Ionicons'
import DotVerticalMenu from '../Dashboard/DotVerticalMenu'

export class AddNotes extends Component {

constructor(props) {
    super(props)

    this.state = {
        noteKey : '',
        title : '',
        note : '' ,
        userId : '',
        isNoteNotAddedDeleted : false 
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
            note : this.props.route.params.notes.note
        })
    }
}

handleDotIconButton = () => {
    const {onPress} = this.props
    this.RBSheet.open()
    // onPress();
}

handleBackIconButton = () => {
    // const {onPress} = this.props
    if(this.state.title != '' || this.state.note != '') {
        if(this.props.route.params == undefined) {
            console.log(this.state.title)
            UserNotesServices.storeNoteInDatabase(this.state.userId, this.state.title, this.state.note)
                .then(() => this.props.navigation.navigate('Home', {screen : 'Notes'}))
                .then(console.log('note Added'))
                .catch(error => console.log(error)) 
        } 
        else {
            UserNotesServices.updateNoteInFirebase(this.state.userId, this.state.noteKey, this.state.title, this.state.note)
                .then(() => this.props.navigation.navigate('Home', {screen : 'Notes'}))
                .catch(error => console.log(error))
        }
    }
    else{
        if(this.props.route.params == undefined) {
            this.props.navigation.navigate('Home', { screen: 'Notes', params : {isEmptyNote : true}}) 
        } 
        else {
            UserNotesServices.removeNoteInFirebase(this.state.userId, this.state.noteKey)
                .then(() => this.props.navigation.navigate('Home', {screen : 'Notes', params : {isEmptyNote : true}}))
                .catch(error => console.log(error))
        }
    }
    // onPress();  
}

handleDeleteButton = async() => {
    this.RBSheet.close()
    if(this.props.route.params == undefined){
        await this.setState({
            isNoteNotAddedDeleted : true
        })
    }
    else {
        UserNotesServices.deleteNoteInFirebase(this.state.userId, this.state.noteKey, this.state.title, this.state.note)
                .then(() => this.props.navigation.push('Home', { screen : 'Notes', 
                                                                params : {isNoteDeleted : true, 
                                                                        noteKey : this.state.noteKey,
                                                                        title : this.state.title,
                                                                        note : this.state.note,
                                                                        userId : this.state.userId}}))
                .catch(error => console.log(error))
    }
}

isNotAddedNoteDeletedSnackbarHandler = async () => {
    const {onDismiss} = this.props
    await this.setState({ 
        isNoteNotAddedDeleted : false
    })
    // onDismiss();
}


    render() {
        return (
            <View style = {AddNotesStyle.mainContainer}>
            <View>
                <Appbar style = {AddNotesStyle.header_style}>
                    <Appbar.Action 
                        style = {{marginLeft : 10}}
                        icon = 'keyboard-backspace'
                        onPress = {this.handleBackIconButton}
                    />
                    <Appbar.Content />
                    <Appbar.Action
                        style = {AddNotesStyle.header_icon_style}                             
                        icon = 'pin-outline'/>
                    <Appbar.Action    
                        style = {AddNotesStyle.header_icon_style}                          
                        icon = 'bell-plus-outline'/>
                    <Appbar.Action 
                        icon = 'archive-arrow-down-outline'/>
                </Appbar>
            </View>
            <ScrollView style = {{marginBottom : 60}}> 
                <TextInput
                    style = {AddNotesStyle.title_style}
                    multiline = {true} 
                    placeholder = 'Title'
                    onChangeText = {this.handleTitle}
                    value = {this.state.title}
                />
                <TextInput
                    style = {AddNotesStyle.note_style}
                    multiline = {true} 
                    placeholder = 'Note'
                    onChangeText = {this.handleNotes}
                    value = {this.state.note}
                />
            </ScrollView>
            <View style = {AddNotesStyle.bottom_view}>
                <Appbar style = {AddNotesStyle.bottom_appbar_style}>
                    <Appbar.Action 
                        icon = 'plus-box-outline'/>
                    <Appbar.Content/>
                    <Appbar.Action 
                        icon = 'undo-variant'/>
                    <Appbar.Action 
                        icon = 'redo-variant'/>
                    <Appbar.Content/>
                    <Appbar.Action 
                        icon = 'dots-vertical'
                        onPress = {this.handleDotIconButton}/>
                </Appbar>
            </View>
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
                  <DotVerticalMenu delete = {this.handleDeleteButton} />     
                </RBSheet>
                <Snackbar
                    style = {{marginBottom : 100}}
                    visible={this.state.isNoteNotAddedDeleted}
                    onDismiss={this.isNotAddedNoteDeletedSnackbarHandler}
                    duration = {10000}>
                    Notes not added can't be deleted
                </Snackbar>
        </View>
        )
    }
}

export default AddNotes
