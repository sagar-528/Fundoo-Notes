import React, { Component } from 'react'
import {ScrollView, View, Text} from 'react-native';
import * as Keychain from 'react-native-keychain';
import * as Animatable from 'react-native-animatable';
import NoteViewStyle from '../../Styles/NoteView'
import NoteCard from './NoteCard'
import SQLiteServices from '../../../Service/SQLiteServices'
import NoteDataControllerServices from '../../../Service/NoteDataControllerServices'

export default class NoteView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNotes : [],
       }
    }

     componentDidMount = async () =>{
        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);
       
      await  NoteDataControllerServices.retrieveDataFromFirebase(UserCredential.user.uid)
      await  SQLiteServices.selectNoteByDeletedFromSQliteStorage(UserCredential.user.uid, 0)
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
            .catch(error => console.log(error))
            console.log(this.state.userNotes)
    }

    render() {

        return (
            <ScrollView style = {NoteViewStyle.container}>
            <Animatable.View 
            style = {NoteViewStyle.list_conatiner}
            animation = "fadeInUpBig">
            {this.state.userNotes.length > 0 ?
                this.state.userNotes.map(note => (
                        <React.Fragment key = {note.note_id}>
                            {
                                    <NoteCard listView = {this.props.listView} notes = {note} noteKey = {note.note_id} navigation = {this.props.navigation}/>
                            }
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
