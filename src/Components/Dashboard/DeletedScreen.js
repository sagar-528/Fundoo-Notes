import React, { Component } from 'react'
import {View, ScrollView} from 'react-native'
import { Appbar, Snackbar } from 'react-native-paper'
import * as Keychain from 'react-native-keychain';
import UserNotesServices from '../../../Service/UserNotesServices'
import DeletedScreenStyle from '../../Styles/DeletedScreen'
import NoteCard from './NoteCard'
import SQLiteServices from '../../../Service/SQLiteServices'
import { connect } from 'react-redux'
import { storeNavigationScreen } from '../../Redux/Actions/CreateNewLabelActions'
import NoteDataControllerServices from '../../../Service/NoteDataControllerServices';

class DeletedScreen extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            userNotes : [],
            showEmptyNoteSnackbar : false,
            showDeletedNoteSnackbar : false,
            showArchivedNoteSnackbar : false,
        }
    }
    
    handleMenuButton = async () => {
        const {onPress} = this.props
        this.props.navigation.openDrawer();
        // onPress();
    }

    async componentDidMount() {

        if(this.props.route.params != undefined) {
            if(this.props.route.params.isEmptyNote != undefined) {
                await this.setState({
                    showEmptyNoteSnackbar : true
                })
            }
            if(this.props.route.params.isNoteDeleted != undefined) {
                await this.setState({
                    showDeletedNoteSnackbar : true
                })
            }
            if(this.props.route.params.isNoteArchived != undefined) {
                await this.setState({
                    showArchivedNoteSnackbar : true
                })
            }
        }

        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);

        SQLiteServices.selectNoteByDeletedFromSQliteStorage(UserCredential.user.uid, 1)
            .then(async result => {
                var temp = [];
                if(result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i)
                    temp.push(result.rows.item(i));
                    await this.setState({
                        userNotes : temp.reverse()
                    })
                }                
            })
            .catch(error => console.log(error))   
            this.props.storeNavigationScreen('Deleted')
    }

    handleMenuButton = async () => {
        const {onPress} = this.props
        this.props.navigation.openDrawer();
        // onPress();
    }

    emptyNoteSnackbarHandler = async () => {
        const {onDismiss} = this.props
        await this.setState({ 
            showEmptyNoteSnackbar : false
        })
        this.props.navigation.setParams({isEmptyNote : undefined})
        //onDismiss()
    }

    deletedNoteSnackbarHandler = async () => {
        const {onDismiss} = this.props
        await this.setState({ 
            showDeletedNoteSnackbar : false
        })
        this.props.navigation.setParams({isNoteDeleted : undefined})
        //onDismiss()
    }

    archivedNoteSnackbarHandler = async () => {
        await this.setState({ 
            showArchivedNoteSnackbar : false
        })
        this.props.navigation.setParams({isNoteArchived : undefined})
    }

    restoreNotes = async() => {
        const {onPress} = this.props
        NoteDataControllerServices.restoreNote(this.props.route.params.userId, this.props.route.params.noteKey)
            .then(() => this.props.navigation.push('Home', {screen : this.props.screenName}))
        //onPress()
    }

    unArchivedNote = async() => {
        NoteDataControllerServices.updateNoteArchive(this.props.route.params.noteKey, this.props.route.params.userId, this.props.route.params.notes)
            .then(() => this.props.navigation.push('Home', {screen : this.props.screenName}))
    }

    render() {
        return (
            <View style = {DeletedScreenStyle.mainContainer}>
            <View style = {{marginBottom : 10}}>
                <Appbar style = {DeletedScreenStyle.header_style}>
                    <Appbar.Action
                        icon = 'menu'
                        onPress = {this.handleMenuButton}
                        />
                    <Appbar.Content title = 'Deleted'/>
                     {this.state.userNotes.length > 0 ?
                        (<Appbar.Action icon = 'dots-vertical'/>) : null
                    }
                </Appbar>
            </View>
            <ScrollView>
             <View>
             {this.state.userNotes.length > 0 ?
                this.state.userNotes.map(note => (
                    <React.Fragment key = {note.note_id}>
                    {
                        <NoteCard 
                            listView = {true} 
                            notes = {note} 
                            noteKey = {note.note_id} 
                            navigation = {this.props.navigation}/>
                    }                    
                </React.Fragment>
                ))
                : null
                }
            </View> 
            </ScrollView>
            <Snackbar
                    style = {{marginBottom : 100}}
                    visible={this.state.showEmptyNoteSnackbar}
                    onDismiss={this.emptyNoteSnackbarHandler}
                    duration = {10000}>
                        Empty Note Discarded
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
                        Note Moved to Bin
                </Snackbar>
                <Snackbar
                    style = {{marginBottom : 100}}
                    visible={this.state.showArchivedNoteSnackbar}
                    onDismiss={this.archivedNoteSnackbarHandler}
                    duration = {10000}
                    action = {{
                        label : 'Undo',
                        onPress : this.unArchivedNote
                    }}>
                        Note Archived
                </Snackbar>
        </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        userLabel : state.createLabelReducer.userLabel,
        screenName : state.createLabelReducer.screenName,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeNavigationScreen : (screenName) => dispatch(storeNavigationScreen(screenName))
    }
}


export default  connect(mapStateToProps,mapDispatchToProps)(DeletedScreen)
