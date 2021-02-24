import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { Appbar, Card, Paragraph, Title } from 'react-native-paper'
import BottomBar from './BottomBar'
import LabelNoteScreenStyle from '../../Styles/LabelNoteScreen'
import { connect } from 'react-redux'
import SQLiteServices from '../../../Service/SQLiteServices'
import NoteCard from './NoteCard'

class LabelNoteScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            listView : true,
            userArchivedNotes : [],
            userUnArchivedNotes : [],
            archivePresent : false,
            labelId : this.getLabelId()
        }
    }

    getLabelId = () => {
        var temp = []
        temp.push(this.props.route.params.labels.label_id)
        return temp
    }


    componentDidMount = async () => {
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
        if(this.state.userArchivedNotes.length > 0) {
            this.state.userArchivedNotes.map(async note => {
                if(JSON.parse(note.label_id).includes(this.props.route.params.labels.label_id)){
                    await this.setState({
                        archivePresent : true
                    })
                }
            })
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
                <ScrollView style = {{marginBottom : 60}}>
                    <View style = {LabelNoteScreenStyle.list_container}>
                    {this.state.userUnArchivedNotes.length > 0 ?
                        this.state.userUnArchivedNotes.map(note => 
                            JSON.parse(note.label_id).includes(this.props.route.params.labels.label_id) ?
                                <React.Fragment key = {note.note_id}>
                                    { <NoteCard listView = {this.state.listView} notes = {note} noteKey = {note.note_id} navigation = {this.props.navigation}/> }
                                </React.Fragment>
                            :
                            null
                        )
                    : null}
                </View>
                <View>
                    {this.state.archivePresent ?
                        (
                            <Text style = {LabelNoteScreenStyle.archive_text_style} >ARCHIVE</Text>
                        )
                        :
                        null
                    }
                </View>
                <View style = {LabelNoteScreenStyle.list_container}>
                    {this.state.archivePresent ?
                        this.state.userArchivedNotes.map(note => 
                            JSON.parse(note.label_id).includes(this.props.route.params.labels.label_id) ?
                                <React.Fragment key = {note.note_id}>
                                    { <NoteCard 
                                        listView = {this.state.listView} 
                                        notes = {note} 
                                        noteKey = {note.note_id} 
                                        navigation = {this.props.navigation}/> }
                                </React.Fragment>
                            :
                            null
                        )
                        : null}
                    </View>
                </ScrollView>
                <BottomBar navigation = {this.props.navigation} labelId = {JSON.stringify(this.state.labelId)}/>
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

export default connect(mapStateToProps)(LabelNoteScreen)
