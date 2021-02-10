import React, { Component } from 'react'
import  { View } from 'react-native'
import {Snackbar} from 'react-native-paper'
import HeaderBar from './HeaderBar';
import BottomBar from './BottomBar';
import NoteView from './NoteView';
import UserNotesServices from '../../../Service/UserNotesServices'

class NoteScreen extends Component {

constructor(props) {
    super(props)
    this.state = {
        listView : true,
        showEmptyNoteSnackbar : false,
        showDeletedNoteSnackbar : false
    }
}

 componentDidMount() {
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
        UserNotesServices.restoreNoteInFirebase(this.props.route.params.userId, this.props.route.params.noteKey, this.props.route.params.title, this.props.route.params.note)
            .then(() => this.props.navigation.navigate('Home', {screen : 'Notes'}))
            .catch(error => console.log(error))
        // onPress();
    }

    render() {
        return (
            <View style={{flex : 1,backgroundColor : 'white'}}>
            <HeaderBar navigation = {this.props.navigation} onPress = {this.selectView} listView = {this.state.listView} />
            <NoteView navigation = {this.props.navigation} listView = {this.state.listView} />
            <BottomBar navigation = {this.props.navigation}/>
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
                duration = {1000}
                action = {{
                    label : 'Undo',
                    onPress : this.restoreNotes
                }}>
                Note Moved to Bin!!!
        </Snackbar>
            </View>
        )
    }
}

export default NoteScreen
