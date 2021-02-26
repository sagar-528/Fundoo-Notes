import React, { Component } from 'react'
import {View, ActivityIndicator, FlatList} from 'react-native'
import { Appbar, Snackbar } from 'react-native-paper'
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
            showNotes: [],
            index: 0,
            endReached : false,
            scroll : false,
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

        await SQLiteServices.selectNoteByDeletedFromSQliteStorage(this.props.userId, 1)
            .then(async result => {
                var temp = [];
                if(result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i)
                    temp.push(result.rows.item(i));
                    await this.setState({
                        userNotes : temp.reverse()
                    })
                    console.log(this.state.userNotes)
                }                
            })
            .catch(error => console.log(error))  
            let tempNotes = []
            let loadingIndex
            for(loadingIndex = 0; loadingIndex < 10 && loadingIndex < this.state.userNotes.length ; loadingIndex++) {
                tempNotes.push(this.state.userNotes[loadingIndex])
            }
            await this.setState({
                showNotes: tempNotes,
                index: loadingIndex
            }) 
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
        NoteDataControllerServices.restoreNoteSnackbar(this.props.userId, this.props.route.params.noteKey, this.props.route.params.notes, this.props.route.params.reminder)
            .then(() => this.props.navigation.push('Home', {screen : this.props.screenName}))
        //onPress()
    }

    unArchivedNote = async() => {
        NoteDataControllerServices.updateNoteArchive(this.props.route.params.noteKey, this.props.userId, this.props.route.params.notes)
            .then(() => this.props.navigation.push('Home', {screen : this.props.screenName}))
    }

    loadData = async (addIndex) => {
        for(let i = 0; i < addIndex; i++) {
            if(this.state.index == this.state.userNotes.length) {
                await this.setState({
                    index: 0,
                })
            }
            this.state.showNotes.push(this.state.userNotes[this.state.index])
            this.state.index ++
        }
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
                  <FlatList
                    keyExtractor = {(item, index) => JSON.stringify(index)}
                    data = {this.state.showNotes}
                    ListFooterComponent = {() => 
                        (this.state.endReached && this.state.scroll) ? 
                            <ActivityIndicator size="large" color="grey" /> : 
                            null}
                    onEndReached = {async () => {
                        await this.setState({
                            endReached : true
                        })
                    }}
                    onScroll = {async () => {
                        if (this.state.endReached) {
                            this.loadData(6)
                            await this.setState({
                                endReached : false,
                                scroll : true
                            })
                }
            }}
            onEndReachedThreshold={0.1}
            renderItem = {({ item }) => ( 
                <NoteCard 
                    listView = {true} 
                    notes = {item} 
                    noteKey = {item.note_id} 
                    navigation = {this.props.navigation} />       
                )}   
            />
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
        labelKey : state.createLabelReducer.labelKey
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeNavigationScreen : (screenName) => dispatch(storeNavigationScreen(screenName))
    }
}


export default  connect(mapStateToProps,mapDispatchToProps)(DeletedScreen)
