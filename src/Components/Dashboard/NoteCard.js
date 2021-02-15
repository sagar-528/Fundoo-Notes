import React, { Component } from 'react'
import {Card, Title, Paragraph} from 'react-native-paper'
import NoteCardStyle from '../../Styles/NoteCard'

export class NoteCard extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.notes)
    }
    
    selectNote = (noteKey) => {
        this.props.navigation.navigate('AddNote', { noteKey : noteKey, notes : this.props.notes})
    }

    render() {
        return (
            <Card
                style = {(this.props.listView) ? NoteCardStyle.list_item_style :  NoteCardStyle.list_item_grid_style }
                onPress = {() => this.selectNote(this.props.noteKey)} >
                <Card.Content>
                    <Title 
                        style = {(this.props.notes.note == '') ? NoteCardStyle.list_title_note_empty_style : NoteCardStyle.list_title_style}>
                            {this.props.notes.title}
                    </Title>
                    <Paragraph
                        style = {(this.props.notes.title == '') ? NoteCardStyle.list_note_title_empty_style : NoteCardStyle.note_description_style}>
                            {this.props.notes.note}
                    </Paragraph>
                </Card.Content>  
            </Card>
        )
    }
}

export default NoteCard
