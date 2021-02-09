import React, { Component } from 'react'
import {ScrollView, View} from 'react-native';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import NoteCss from '../../Styles/NoteCss'
import UserNotesServices from '../../../Service/UserNotesServices'

export default class NoteView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNotes : []
       }
    }

    async  componentDidMount() {
        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);
        UserNotesServices.getNoteFromDatabase(UserCredential.user.uid)
            .then(async data => {
                let notes = data ? data : {}
                await this.setState({
                    userNotes : notes
                })
            })
    }

    selectNote = (noteKey) => {
        this.props.navigation.navigate('AddNote', { noteKey : noteKey, notes : this.state.userNotes[noteKey].notes})
    }
    
    render() {
        let noteID = Object.keys(this.state.userNotes);
        return (
            <ScrollView style = {{marginBottom : 60}}>
            <View style = {{flexDirection: 'row', flexWrap: 'wrap'}}>
                { noteID.length > 0 ?
                    noteID.reverse().map(key => (
                        <Card
                            key = {key}
                            style = {(this.props.listView) ? NoteCss.list_item_style : NoteCss.list_item_grid_style }
                            onPress = {() => this.selectNote(key)} >
                            <Card.Content>
                                <Title 
                                    style = {(this.state.userNotes[key].notes.note == '') ? NoteCss.list_title_note_empty_style : NoteCss.list_title_style}>
                                            {this.state.userNotes[key].notes.title}
                                </Title>
                                <Paragraph
                                    style = {(this.state.userNotes[key].notes.title == '') ? NoteCss.list_note_title_empty_style : NoteCss.note_description_style}>
                                            {this.state.userNotes[key].notes.note}
                                </Paragraph>
                            </Card.Content>  
                        </Card>
                    )) 
                    :
                    null
                }
            </View>
        </ScrollView>
        )
    }
}
