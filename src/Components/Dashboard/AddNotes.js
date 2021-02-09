import React, { Component } from 'react'
import NoteCss from '../../Styles/NoteCss'
import {View, ScrollView, TextInput} from 'react-native'
import { Appbar, Snackbar } from 'react-native-paper'
import * as Keychain from 'react-native-keychain'
import UserNotesServices from '../../../Service/UserNotesServices'

export class AddNotes extends Component {

constructor(props) {
    super(props)

    this.state = {
        noteKey : '',
        title : '',
        note : '' 
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
    if(this.props.route.params != undefined) {
        await this.setState({
            noteKey : this.props.route.params.noteKey,
            title : this.props.route.params.notes.title,
            note : this.props.route.params.notes.note
        })
    }
}

handleBackIconButton = async () => {
    const {onPress} = this.props
    const credential = await Keychain.getGenericPassword();
    const UserCredential = JSON.parse(credential.password);
    if(this.state.title != '' || this.state.note != '') {
        if(this.props.route.params == undefined) {
            UserNotesServices.storeNoteinDatabase(UserCredential.user.uid, this.state.title, this.state.note)
                .then(() => this.props.navigation.push('Home'))
                .catch(error => console.log(error)) 
        } 
        else {
            UserNotesServices.updateNoteInFirebase(UserCredential.user.uid, this.state.noteKey, this.state.title, this.state.note)
                .then(() => this.props.navigation.push('Home'))
                .catch(error => console.log(error))
        }
    }
    else{
        if(this.props.route.params == undefined) {
            this.props.navigation.push('Home', { screen: 'Notes', params : {isEmptyNote : true}}) 
        } 
        else {
            UserNotesServices.updateNoteInFirebase(UserCredential.user.uid, this.state.noteKey, this.state.title, this.state.note)
                .then(() => this.props.navigation.push('Home'))
                .catch(error => console.log(error))
        }
    }
    // onPress();  
}

    render() {
        return (
            <View style = {NoteCss.mainContainer}>
            <View>
                <Appbar style = {NoteCss.header_style}>
                    <Appbar.Action 
                        style = {{marginLeft : 10}}
                        icon = 'keyboard-backspace'
                        onPress = {this.handleBackIconButton}
                    />
                    <Appbar.Content />
                    <Appbar.Action
                        style = {NoteCss.header_icon_style}                             
                        icon = 'pin-outline'/>
                    <Appbar.Action    
                        style = {NoteCss.header_icon_style}                          
                        icon = 'bell-plus-outline'/>
                    <Appbar.Action 
                        icon = 'archive-arrow-down-outline'/>
                </Appbar>
            </View>
            <ScrollView style = {{marginBottom : 60}}> 
                <TextInput
                    style = {NoteCss.title_style}
                    multiline = {true} 
                    placeholder = 'Title'
                    onChangeText = {this.handleTitle}
                    value = {this.state.title}
                />
                <TextInput
                    style = {NoteCss.note_style}
                    multiline = {true} 
                    placeholder = 'Note'
                    onChangeText = {this.handleNotes}
                    value = {this.state.note}
                />
            </ScrollView>
            <View style = {NoteCss.bottom_view}>
                <Appbar style = {NoteCss.bottom_appbar_style}>
                    <Appbar.Action 
                        icon = 'plus-box-outline'/>
                    <Appbar.Content/>
                    <Appbar.Action 
                        icon = 'undo-variant'/>
                    <Appbar.Action 
                        icon = 'redo-variant'/>
                    <Appbar.Content/>
                    <Appbar.Action 
                        icon = 'dots-vertical'/>
                </Appbar>
            </View>
        </View>
        )
    }
}

export default AddNotes
