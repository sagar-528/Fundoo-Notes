import React, { Component } from 'react'
import {View, ScrollView} from 'react-native'
import { Appbar, Card, Title, Paragraph } from 'react-native-paper'
import * as Keychain from 'react-native-keychain';
import UserNotesServices from '../../../Service/UserNotesServices'
import DeletedScreenStyle from '../../Styles/DeletedScreen'
import NoteCard from './NoteCard'
import SQLiteServices from '../../../Service/SQLiteServices'

export class DeletedScreen extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            userNotes : []
        }
    }
    
    handleMenuButton = async () => {
        const {onPress} = this.props
        this.props.navigation.openDrawer();
        // onPress();
    }

    async componentDidMount() {
        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);

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

    handleMenuButton = async () => {
        const {onPress} = this.props
        this.props.navigation.openDrawer();
        //onPress();
    }

    render() {
        return (
            <View style = {DeletedScreenStyle.mainContainer}>
            <View style = {{marginBottom : 10}}>
                <Appbar style = {DeletedScreenStyle.header_style}>
                    <Appbar.Action
                        icon = 'menu'
                        onPress = {this.handleMenuButton}
                        />
                    <Appbar.Content title = 'Deleted'/>
                     {this.state.userNotes.length > 0 ?
                        (<Appbar.Action icon = 'dots-vertical'/>) : null
                    }
                </Appbar>
            </View>
            <ScrollView>
             <View>
             {this.state.userNotes.length > 0 ?
                this.state.userNotes.reverse().map(note => (
                    <React.Fragment key = {note.note_id}>
                    {note.is_deleted == 1 ? (
                        <NoteCard listView = {true} notes = {note} noteKey = {note.note_id} navigation = {this.props.navigation}/>
                        )
                    : null}                    
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

export default DeletedScreen
