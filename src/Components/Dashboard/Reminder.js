import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Appbar, Snackbar } from 'react-native-paper'
import ReminderScreenStyle from '../../Styles/Reminder'
import BottomBar from './BottomBar'
import NoteDataControllerServices from '../../../Service/NoteDataControllerServices'
import SQLiteServices from '../../../Service/SQLiteServices'
import { connect } from 'react-redux'
import { storeNavigationScreen } from '../../Redux/Actions/CreateNewLabelActions'

class Reminder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listView : true,
            showEmptyNoteSnackbar : false,
            showDeletedNoteSnackbar : false,
            showArchivedNoteSnackbar : false,
            userNotes : []
        }
    }

    componentDidMount = async () => {
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
        await SQLiteServices.selectNoteByArchiveFromSQliteStorage(this.props.userId, 1, 0)
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
            .catch(error => console.log('Error', error))
        this.props.storeNavigationScreen('reminderNote')
    }

    handleMenuButton = async () => {
        const {onPress} = this.props
        this.props.navigation.openDrawer();
        //onPress();
    }

    handleSearchIconButton = () => {
        this.props.navigation.navigate('Home', { screen : 'SearchNote'})
    }

    selectView = async () => {
        await this.setState({
            listView : !this.state.listView
        })
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
        NoteDataControllerServices.restoreNote(this.props.userId, this.props.route.params.noteKey)
            .then(() => this.props.navigation.push('Home', {screen : this.props.screenName}))
        //onPress()
    }

    unArchivedNote = async() => {
        NoteDataControllerServices.updateNoteArchive(this.props.route.params.noteKey, this.props.userId, this.props.route.params.notes)
            .then(() => this.props.navigation.push('Home', {screen : this.props.screenName}))
    }
    
    render(){
    return (
        <View style = {ReminderScreenStyle.mainContainer}>
        <View style = {{marginBottom : 10}}>
            <Appbar style = {{backgroundColor : 'transparent'}}>
                <Appbar.Action 
                    style = {{marginLeft : 10}}
                    icon = 'menu'
                    onPress = {this.handleMenuButton}/>
                <Appbar.Content 
                    title = 'Reminders'/>
                <Appbar.Action
                    style = {{marginRight : 10}}
                    icon = 'magnify'
                    onPress = {this.handleSearchIconButton}/>
                <Appbar.Action
                    style = {{marginRight : 10}}
                    icon = {(this.state.listView) ? 'view-grid-outline' : 'view-agenda-outline'}
                    onPress={this.selectView}
                />
            </Appbar>
        </View>
        <BottomBar
                navigation = {this.props.navigation} /> 
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
    )}
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

export default connect(mapStateToProps,mapDispatchToProps)(Reminder)
