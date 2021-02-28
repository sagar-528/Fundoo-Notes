import React, { Component } from 'react'
import {Text, View} from 'react-native'
import {Card, Title, Paragraph, Chip} from 'react-native-paper'
import NoteCardStyle from '../../Styles/NoteCard'
import { connect } from 'react-redux'
import moment from "moment";

class NoteCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            labelId : JSON.parse(this.props.notes.label_id)
        }
    }
    

    selectNote = (noteKey) => {
        const {onPress} = this.props
        this.props.navigation.push('AddNote', { noteKey : noteKey, notes : this.props.notes, newNote : false })
        onPress();
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
                            JSON.parse(this.props.notes.reminder) != '' ?
                                <Chip
                                    textStyle = {new Date() < new Date(JSON.parse(this.props.notes.reminder)) 
                                                    ? {fontSize : 13}
                                                    : {fontSize : 13, color : 'grey'}}
                                    style = {new Date() < new Date(JSON.parse(this.props.notes.reminder)) 
                                                    ? NoteCardStyle.chip_style
                                                    : NoteCardStyle.chip_faded_style}
                                        icon = 'alarm'>
                                            {moment(JSON.parse(this.props.notes.reminder)).format('D MMM, h.mm a')}
                                </Chip>
                                :
                                null
                        }
                        {
                            (this.state.labelId.length > 0) ?
                                this.props.userLabel.map(labels => (
                                    this.state.labelId.includes(labels.label_id) ?
                                        <React.Fragment key = {labels.label_id}>
                                            <Chip
                                                textStyle = {{fontSize : 13}}
                                                style = {NoteCardStyle.chip_style}>
                                                {labels.label_name}
                                            </Chip>
                                        </React.Fragment>
                                    :
                                    null
                                ))
                            :
                            null
                        }
                    </View>
                    {this.props.noteArchive != undefined ?
                        <View style = {{flexWrap : 'wrap', flexDirection : 'row-reverse', marginTop : 10}}>
                            <Text style = {NoteCardStyle.archive_text}>Archived</Text>
                        </View>
                    :
                    null}
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
