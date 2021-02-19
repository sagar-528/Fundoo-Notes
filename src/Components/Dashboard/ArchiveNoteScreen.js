import React, { Component } from 'react'
import {View, ScrollView} from 'react-native'
import { Appbar } from 'react-native-paper'
import { connect } from 'react-redux'
import SQLiteServices from '../../../Service/SQLiteServices'
import NoteCard from './NoteCard'
import ArchiveNoteScreenStyle from '../../Styles/ArchiveNoteScreen'

class ArchiveNoteScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listView : true,
            userNotes : []
        }
    }

    componentDidMount = async () => {
        await SQLiteServices.selectNoteByArchiveFromSQliteStorage(this.props.userId, 1, 0)
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

    handleMenuButton = async () => {
        const {onPress} = this.props
        this.props.navigation.openDrawer();
        //onPress();
    }

    handleSearchIconButton = () => {
        this.props.navigation.navigate('Home', { screen : 'SearchNote'})
    }

    selectView = async () => {
        await this.setState({
            listView : !this.state.listView
        })
    }

    render() {
        return (
            <View style = {ArchiveNoteScreenStyle.mainContainer}>
                <View style = {{marginBottom : 10}}>
                    <Appbar style = {ArchiveNoteScreenStyle.header_style}>
                        <Appbar.Action
                            style = {{marginLeft : 10}}
                            icon = 'menu'
                            onPress = {this.handleMenuButton}
                            />
                        <Appbar.Content title = 'Archive'/>
                        <Appbar.Action
                            style = {{marginRight : 10}}
                            icon = 'magnify'
                            onPress = {this.handleSearchIconButton}/>
                        <Appbar.Action
                            style = {{marginRight : 10}}
                            icon = {(this.state.listView) ? 'view-grid-outline' : 'view-agenda-outline'}
                            onPress={this.selectView} />
                    </Appbar>
                </View>
                <ScrollView style = {{marginBottom : 60}}>
                    <View style = {ArchiveNoteScreenStyle.list_container}>
                        {this.state.userNotes.length > 0 ?
                            this.state.userNotes.map(note => (
                                <React.Fragment key = {note.note_id}>
                                    { <NoteCard listView = {this.state.listView} notes = {note} noteKey = {note.note_id} navigation = {this.props.navigation}/> }
                                </React.Fragment>
                            ))
                        : null}
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

export default connect(mapStateToProps)(ArchiveNoteScreen)
