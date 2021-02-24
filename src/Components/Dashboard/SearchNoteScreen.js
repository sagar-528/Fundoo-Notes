import React, { Component } from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import { Appbar, Card, Paragraph, Title, Text } from 'react-native-paper'
import * as Keychain from 'react-native-keychain';
import Highlighter from 'react-native-highlight-words';
import  SearchNoteScreenStyle from '../../Styles/SearchNoteScreen'
import SQLiteServices from '../../../Service/SQLiteServices'
import { connect } from 'react-redux'

class SearchNoteScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            search : '',
            userNotes : [],
            userNotesAfterSearch : [],
            userId : '',
            userId : '',
            label : false,
            archivePresent : false,
            archivePresentCheck : false,
        }
    }

    async componentDidMount() {
        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);
        await this.setState({
            userId : UserCredential.user.uid
        })
        SQLiteServices.selectNoteFromSQliteStorage(UserCredential.user.uid)
            .then(async result => {
                var temp = [];
                if(result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i)
                        temp.push(result.rows.item(i));
                    await this.setState({
                        userNotes : temp
                    })
                }                
            })
            .catch(error => console.log(error))
    }

    handleBackIconButton = () => {
        const {onPress} = this.props
        this.props.navigation.navigate('Home', {screen : 'Notes'})
        // onPress();
    }

    handleSearchTextInput = async (searchText) => {
        await this.setState({
            search : searchText,
            archivePresent : false,
            archivePresentCheck : false
        })
        if(this.state.search != '') {
            let temp = []
            for(let i = 0; i < this.state.userNotes.length; i++) {
                this.props.userLabel.map(async label => {
                    if(JSON.parse(this.state.userNotes[i].label_id).includes(label.label_id)) {
                        if(label.label_name.toLowerCase().includes(searchText.toLowerCase())) {
                            await this.setState({
                                label : true
                            })
                        }
                    }
                })
                if(this.state.userNotes[i].title.toLowerCase().includes(searchText.toLowerCase()) || 
                this.state.userNotes[i].note.toLowerCase().includes(searchText.toLowerCase()) ||                    
                this.state.label) { 
                    temp.push(this.state.userNotes[i])
                }
                await this.setState({
                    label : false
                })
            }
           await this.setState({
                userNotesAfterSearch: temp,
            })
            for(let i = 0; i < this.state.userNotesAfterSearch.length; i++) {
                if(this.state.userNotesAfterSearch[i].is_archived == 1 || this.state.archivePresentCheck) {
                    await this.setState({
                        archivePresent : true,
                        archivePresentCheck : true
                    })
                }
            }
        }
        else {
            await this.setState({
                userNotesAfterSearch : []
            })
        }
    }

    handleCloseButton = async () => {
        const {onPress} = this.props
        await this.setState({
            search : '',
            userNotesAfterSearch : []
        })
        // onPress();
    }

    selectNote = (note) => {
        const {onPress} = this.props
        this.props.navigation.push('AddNote', { noteKey : note.note_id, notes : note})
        // onPress();
    }

    render() {
        return (
            <View style = {SearchNoteScreenStyle.mainContainer}>
                 <View style = {SearchNoteScreenStyle.appbar_container_style}>
                    <Appbar style = {SearchNoteScreenStyle.header_style}>
                        <Appbar.Action  
                            style = {{marginLeft : 10}}
                            icon = 'keyboard-backspace'
                            onPress = {this.handleBackIconButton}/>
                        <TextInput
                            style = {SearchNoteScreenStyle.textinput_style}    
                            placeholder = 'Search your notes'
                            onChangeText = {this.handleSearchTextInput}
                            autoFocus = {true}
                            value = {this.state.search}/>
                        <Appbar.Content/>
                        {
                            (this.state.search != '') ? 
                                <Appbar.Action
                                    icon = 'close'
                                    onPress = {this.handleCloseButton}/>
                            : null
                        }

                    </Appbar>
                </View>
                <ScrollView>
                    <View>
                        {this.state.userNotesAfterSearch.length > 0 ?
                            this.state.userNotesAfterSearch.reverse().map(note => (
                                <React.Fragment key = {note.note_id}>
                                    {note.is_deleted == 0 && note.is_archived == 0 ?
                                    <Card
                                        style = {SearchNoteScreenStyle.list_item_style}
                                        onPress = {() => this.selectNote(note)}>
                                        <Card.Content>
                                            <Title 
                                                style = {(note.note == '') ? SearchNoteScreenStyle.list_title_note_empty_style : SearchNoteScreenStyle.list_title_style}>
                                                    <Highlighter
                                                        highlightStyle = {{backgroundColor: 'yellow'}}
                                                        searchWords = {[this.state.search]}
                                                        textToHighlight = {note.title}/>
                                            </Title>
                                            <Paragraph
                                                style = {(note.title == '') ? SearchNoteScreenStyle.list_note_title_empty_style : SearchNoteScreenStyle.note_description_style}>
                                                    <Highlighter
                                                        highlightStyle = {{backgroundColor: 'yellow'}}
                                                        searchWords = {[this.state.search]}
                                                        textToHighlight = {note.note}/>
                                            </Paragraph>
                                            <View style = {{flexWrap : 'wrap', flexDirection : 'row'}}>
                                                {
                                                    (JSON.parse(note.label_id).length > 0) ?
                                                        this.props.userLabel.map(labels => (
                                                            JSON.parse(note.label_id).includes(labels.label_id) ?
                                                                <React.Fragment key = {labels.label_id}>
                                                                    <View>
                                                                        <Text style = {SearchNoteScreenStyle.label_text}>{labels.label_name}</Text>
                                                                    </View>
                                                                </React.Fragment>
                                                            :
                                                            null
                                                        ))
                                                    :
                                                    null
                                                }
                                            </View>
                                        </Card.Content>
                                    </Card> 
                                    :
                                    null
                                    }                 
                                </React.Fragment>
                            ))
                            : null
                        }
                    </View>

                    <View>
                        {this.state.archivePresent ?
                            <Text style = {SearchNoteScreenStyle.archive_text_style}>ARCHIVE</Text>
                        :
                            null
                        }
                    </View>
                    <View>
                        {this.state.userNotesAfterSearch.length > 0 ?
                            this.state.userNotesAfterSearch.reverse().map(note => (
                                <React.Fragment key = {note.note_id}>
                                    {note.is_deleted == 0 && note.is_archived == 1 ?
                                    <Card
                                        style = {SearchNoteScreenStyle.list_item_style}
                                        onPress = {() => this.selectNote(note)}>
                                        <Card.Content>
                                            <Title 
                                                style = {(note.note == '') ? SearchNoteScreenStyle.list_title_note_empty_style : SearchNoteScreenStyle.list_title_style}>
                                                    <Highlighter
                                                        highlightStyle = {{backgroundColor: 'yellow'}}
                                                        searchWords = {[this.state.search]}
                                                        textToHighlight = {note.title}/>
                                            </Title>
                                            <Paragraph
                                                style = {(note.title == '') ? SearchNoteScreenStyle.list_note_title_empty_style : SearchNoteScreenStyle.note_description_style}>
                                                    <Highlighter
                                                        highlightStyle = {{backgroundColor: 'yellow'}}
                                                        searchWords = {[this.state.search]}
                                                        textToHighlight = {note.note}/>
                                            </Paragraph>
                                            <View style = {{flexWrap : 'wrap', flexDirection : 'row'}}>
                                                {
                                                    (JSON.parse(note.label_id).length > 0) ?
                                                        this.props.userLabel.map(labels => (
                                                            JSON.parse(note.label_id).includes(labels.label_id) ?
                                                                <React.Fragment key = {labels.label_id}>
                                                                    <View>
                                                                        <Text style = {SearchNoteScreenStyle.label_text}>{labels.label_name}</Text>
                                                                    </View>
                                                                </React.Fragment>
                                                            :
                                                            null
                                                        ))
                                                    :
                                                    null
                                                }
                                            </View>
                                        </Card.Content>
                                    </Card> 
                                    :
                                    null
                                    }                 
                                </React.Fragment>
                            ))
                            : null
                        }
                    </View>
                    
                </ScrollView>
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

export default connect(mapStateToProps)(SearchNoteScreen)
