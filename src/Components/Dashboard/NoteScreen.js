import React, { Component } from 'react'
import  { View, Text } from 'react-native'
import {Snackbar, Provider, Modal, Portal} from 'react-native-paper'
import HeaderBar from './HeaderBar';
import BottomBar from './BottomBar';
import NoteView from './NoteView';
import NoteScreenStyle from '../../Styles/NoteScreen'
import ProfileScreen from './ProfileScreen'
import * as Keychain from 'react-native-keychain'
import NoteDataControllerServices from '../../../Service/NoteDataControllerServices'

class NoteScreen extends Component {

constructor(props) {
    super(props)
    this.state = {
        listView : true,
        showEmptyNoteSnackbar : false,
        showDeletedNoteSnackbar : false,
        showProfileModal : false,
        photo : '',
        userId : ''
    }
}

 componentDidMount = async () => {
    const credential = await Keychain.getGenericPassword();
    const UserCredential = JSON.parse(credential.password);
     this.setState({
        userId : UserCredential.user.uid
    })

    if(this.props.route.params != undefined) {
        if(this.props.route.params.isEmptyNote != undefined) {
           this.setState({
                showEmptyNoteSnackbar : true
            })
        }
        if(this.props.route.params.isNoteDeleted != undefined) {
            this.setState({
                showDeletedNoteSnackbar : true
            })
        }
    } 
}

    selectView = () => {
        const {onPress} = this.props
         this.setState({
            listView : !this.state.listView
        })
        // onPress();
    }

    emptyNoteSnackbarHandler = async () => {
        const {onDismiss} = this.props
        await this.setState({ 
            showEmptyNoteSnackbar : false
        })
        this.props.navigation.setParams({isEmptyNote : false})
        // onDismiss();
    }

    deletedNoteSnackbarHandler = async () => {
        const {onDismiss} = this.props
        await this.setState({ 
            showDeletedNoteSnackbar : false
        })
        this.props.navigation.setParams({isNoteDeleted : false})
        // onDismiss();
    }

    restoreNotes = async() => {
        const {onPress} = this.props
        NoteDataControllerServices.restoreNote(this.props.route.params.userId, this.props.route.params.noteKey)
            .then(() => this.props.navigation.push('Home', {screen : 'Notes'}))
        // onPress();
    }

    showModal = async() => {
        const {onPress} = this.props
        await this.setState({
            showProfileModal : true
        })
        // onPress();
    }

    hideModal = async() => {
        const {onDismiss} = this.props
        await this.setState({
            showProfileModal : false
        })
        // onDismiss();
    }

    render() {
        return (
            <Provider>
            <View style={NoteScreenStyle.container}>
            <HeaderBar 
                photo = {this.state.photo}
                navigation = {this.props.navigation} 
                onPressView = {this.selectView} 
                listView = {this.state.listView} 
                onPressProfile = {this.showModal}/>
            <NoteView 
                navigation = {this.props.navigation} 
                listView = {this.state.listView} />
            <BottomBar 
                navigation = {this.props.navigation}/>
            <Snackbar
                style = {{marginBottom : 100}}
                visible={this.state.showEmptyNoteSnackbar}
                onDismiss={this.emptyNoteSnackbarHandler}
                duration = {1000}>
                Empty Note Discarded!!!
            </Snackbar>
            <Snackbar
                style = {{marginBottom : 100}}
                visible={this.state.showDeletedNoteSnackbar}
                onDismiss={this.deletedNoteSnackbarHandler}
                duration = {10000}
                action = {{
                    label : 'Undo',
                    onPress : this.restoreNotes
                }}>
                Note Moved to Bin!!!
        </Snackbar>
            <Portal>
                <Modal 
                    visible={this.state.showProfileModal} 
                    onDismiss={this.hideModal} 
                    contentContainerStyle={NoteScreenStyle.modal_container_style}>
                    <ProfileScreen 
                        navigation = {this.props.navigation}
                        photo = {this.state.photo}
                        changeImage = {this.changeImage}/>
                </Modal>
            </Portal>
        </View>
        </Provider>
        )
    }
}

export default NoteScreen
