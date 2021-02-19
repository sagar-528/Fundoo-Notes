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
            userNotes : []
        }
    }

    componentDidMount = async () => {
        await SQLiteServices.selectNoteByLabelIdFromSQliteStorage(this.props.userId, this.props.route.params.labels.label_id, 0)
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
        //onPress();
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
                            title = {this.props.route.params.labels.label}/>
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
                        {this.state.userNotes.length > 0 ?
                            this.state.userNotes.map(note => (
                                <React.Fragment key = {note.note_id}>
                                    { <NoteCard listView = {this.state.listView} notes = {note} noteKey = {note.note_id} navigation = {this.props.navigation}/> }
                                </React.Fragment>
                            ))
                        : null}
                    </View>
                </ScrollView>
                <BottomBar navigation = {this.props.navigation}/>
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
