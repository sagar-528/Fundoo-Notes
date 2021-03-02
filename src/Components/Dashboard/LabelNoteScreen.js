import React, { Component } from 'react'
import { View, ScrollView, Text, FlatList, ActivityIndicator } from 'react-native'
import { Appbar, Snackbar } from 'react-native-paper'
import BottomBar from './BottomBar'
import LabelNoteScreenStyle from '../../Styles/LabelNoteScreen'
import { connect } from 'react-redux'
import SQLiteServices from '../../../Service/SQLiteServices'
import NoteCard from './NoteCard'
import { storeLabelId, storeNavigationScreen } from '../../Redux/Actions/CreateNewLabelActions'
import NoteDataControllerServices from '../../../Service/NoteDataControllerServices'

class LabelNoteScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            listView : true,
            userArchivedNotes : [],
            userUnArchivedNotes : [],
            userNotes : [],
            showNotes: [],
            index: 0,
            endReached : false,
            archivePresent : false,
            labelId : this.getLabelId(),
            showEmptyNoteSnackbar : false,
            showDeletedNoteSnackbar : false,
            showArchivedNoteSnackbar : false,
            scroll : false
        }
    }

    getLabelId = () => {
        var temp = []
        temp.push(this.props.route.params.labels.label_id)
        return temp
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

        await SQLiteServices.selectNoteByArchiveFromSQliteStorage(this.props.userId, 0, 0)
            .then(async result => {
                var temp = [];
                if(result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i)
                        temp.push(result.rows.item(i));
                    await this.setState({
                        userUnArchivedNotes : temp.reverse()
                    })
                }                
            })
            .catch(error => console.log('Error', error))
            await SQLiteServices.selectNoteByArchiveFromSQliteStorage(this.props.userId, 1, 0)
            .then(async result => {
                var temp = [];
                if(result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i)
                        temp.push(result.rows.item(i));
                    await this.setState({
                        userArchivedNotes : temp.reverse()
                    })
                }                
            })
            .catch(error => console.log('Error', error))
        if(this.state.userArchivedNotes.length > 0) {
            this.state.userArchivedNotes.map(async note => {
                if(JSON.parse(note.label_id).includes(this.props.route.params.labels.label_id)){
                    await this.setState({
                        archivePresent : true
                    })
                }
            })
        }
        this.props.storeNavigationScreen('labelNote')
        this.props.storeLabelId(this.props.route.params.labels)

        await this.setState({
            userNotes : this.state.userUnArchivedNotes.concat(this.state.userArchivedNotes)
        })
        let tempNotes = []
        let loadingIndex
        for(loadingIndex = 0; loadingIndex < 10 && loadingIndex < this.state.userNotes.length ; loadingIndex++) {
            tempNotes.push(this.state.userNotes[loadingIndex])
        }
        await this.setState({
            showNotes: tempNotes,
            index: loadingIndex
        })
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

    selectView = async () => {
        await this.setState({
            listView : !this.state.listView
        })
        console.log(this.state.userNotes);
    }

    selectNote = (note) => {
        const {onPress} = this.props
        this.props.navigation.push('AddNote', { noteKey : note.note_id, notes : note})
        // onPress();
    }

    handleMenuIconButton = () => {
        this.props.navigation.openDrawer();
    }

    handleSearchIconButton = () => {
        this.props.navigation.push('Home', { screen : 'SearchNote'})
    }

    emptyNoteSnackbarHandler = async () => {
        const {onDismiss} = this.props
        await this.setState({ 
            showEmptyNoteSnackbar : false
        })
        this.props.navigation.setParams({isEmptyNote : undefined})
        // onDismiss();
    }

    deletedNoteSnackbarHandler = async () => {
        const {onDismiss} = this.props
        await this.setState({ 
            showDeletedNoteSnackbar : false
        })
        this.props.navigation.setParams({isNoteDeleted : undefined})
        // onDismiss();
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
            .then(() => this.props.navigation.push('Home', {screen : this.props.screenName, params : {labels : this.props.labelKey}}))
        // onPress();
    }

    unArchivedNote = async() => {
        NoteDataControllerServices.updateNoteArchive(this.props.route.params.noteKey, this.props.userId, this.props.route.params.notes)
            .then(() => this.props.navigation.push('Home', {screen : this.props.screenName, params : {labels : this.props.labelKey}}))
    }

    render() {
        return (
            <View style = {LabelNoteScreenStyle.mainContainer}>
                <View  style = {{marginBottom : 10}}>
                    <Appbar style = {{backgroundColor : 'transparent'}}>
                        <Appbar.Action 
                            style = {{marginLeft : 10}}
                            icon = 'menu'
                            onPress = {this.handleMenuIconButton}/>
                        <Appbar.Content 
                            title = {this.props.route.params.labels.label_name}/>
                        <Appbar.Action
                            style = {{marginRight : 10}}
                            icon = 'magnify'
                            onPress = {this.handleSearchIconButton}/>
                        <Appbar.Action
                            style = {{marginRight : 10}}
                            icon = {(this.state.listView) ? 'view-grid-outline' : 'view-agenda-outline'}
                            onPress={this.selectView}
                        />
                        <Appbar.Action
                            icon = 'dots-vertical' />
                    </Appbar>
                </View> 
                <FlatList
                    numColumns = {this.state.listView ? 1 : 2}
                    keyExtractor = {(item, index) => JSON.stringify(index)}
                    key = {this.state.listView ? 1 : 2}
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
                    JSON.parse(item.label_id).includes(this.props.route.params.labels.label_id) ? 
                        (<NoteCard
                            noteArchive = {item.is_archived == 1 ? true : undefined} 
                            listView = {this.state.listView}
                            notes = {item} 
                            noteKey = {item.note_id} 
                            navigation = {this.props.navigation}/>)
                    :
                    null
                )}
                contentContainerStyle={{ paddingBottom: 60}}                      
            /> 
                <BottomBar 
                    navigation = {this.props.navigation} 
                    labelId = {JSON.stringify(this.state.labelId)}/>
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
        storeNavigationScreen : (screenName) => dispatch(storeNavigationScreen(screenName)),
        storeLabelId : (labelKey) => dispatch(storeLabelId(labelKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelNoteScreen)
