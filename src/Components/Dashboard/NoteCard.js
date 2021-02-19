import React, { Component } from 'react'
import {Text, View} from 'react-native'
import {Card, Title, Paragraph} from 'react-native-paper'
import NoteCardStyle from '../../Styles/NoteCard'
import { connect } from 'react-redux'

class NoteCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            labelName : ''
        }
    }
    
    componentDidMount = async () => {
        await this.props.userLabel.map(async labels => {
            if(labels.label_id == this.props.notes.label_id) {
                await this.setState({
                    labelName : labels.label
                })
            }
        })
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
                    {
                        (this.state.labelName != '') ?
                            <View style = {{flexWrap : 'wrap'}}>
                                <Text style = {NoteCardStyle.label_text}>{this.state.labelName}</Text>
                            </View>
                            :
                            null
                    }
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
