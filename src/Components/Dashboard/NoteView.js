import React, { Component } from 'react'
import {ScrollView, View, Text} from 'react-native';
import * as Keychain from 'react-native-keychain';
import * as Animatable from 'react-native-animatable';
import UserNotesServices from '../../../Service/UserNotesServices'
import NoteViewStyle from '../../Styles/NoteView'
import NoteCard from './NoteCard'
import SQLiteServices from '../../../Service/SQLiteServices'

export default class NoteView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNotes : []
       }
    }

     componentDidMount = async () =>{
        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);
        // UserNotesServices.getNoteFromDatabase(UserCredential.user.uid)
        //     .then( data => {
        //         let notes = data ? data : {}
        //         this.setState({
        //             userNotes : notes
        //         })
        //     })
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

    render() {
        let noteID = Object.keys(this.state.userNotes);
        return (
            <ScrollView style = {NoteViewStyle.container}>
            <Animatable.View 
            style = {NoteViewStyle.list_conatiner}
            animation = "fadeInUpBig">
            {this.state.userNotes.length > 0 ?
                this.state.userNotes.map(val => (
                        <React.Fragment key = {val.note_id}>
                            {val.is_deleted == 0 ? (
                                    <NoteCard listView = {this.props.listView} notes = {val} noteKey = {val.note_id} navigation = {this.props.navigation}/>)
                                : null}
                        </React.Fragment>
                    )) 
                    :
                    null
                }
            </Animatable.View>
        </ScrollView>
        )
    }
}
