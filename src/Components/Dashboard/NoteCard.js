import React, { Component } from 'react'
import {Text, View} from 'react-native'
import {Card, Title, Paragraph} from 'react-native-paper'
import NoteCardStyle from '../../Styles/NoteCard'
import { connect } from 'react-redux'

class NoteCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            labelId : JSON.parse(this.props.notes.label_id)
        }
    }
    

    selectNote = (noteKey) => {
        this.props.navigation.push('AddNote', { noteKey : noteKey, notes : this.props.notes})
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
                    <View style = {{flexWrap : 'wrap', flexDirection : 'row'}}>
                        {
                            (this.state.labelId.length > 0) ?
                                this.props.userLabel.map(labels => (
                                    this.state.labelId.includes(labels.label_id) ?
                                        <React.Fragment key = {labels.label_id}>
                                            <View>
                                                <Text style = {NoteCardStyle.label_text}>{labels.label}</Text>
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
        )
    }
}

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        userLabel : state.createLabelReducer.userLabel
    }
}

export default connect(mapStateToProps)(NoteCard)
