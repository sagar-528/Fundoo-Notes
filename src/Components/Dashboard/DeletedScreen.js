import React, { Component } from 'react'
import {View, ScrollView} from 'react-native'
import { Appbar, Card, Title, Paragraph } from 'react-native-paper'
import * as Keychain from 'react-native-keychain';
import UserNotesServices from '../../../Service/UserNotesServices'
import DeletedScreenStyle from '../../Styles/DeletedScreen'

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
        UserNotesServices.getNoteFromDatabase(UserCredential.user.uid)
            .then(async data => {
                let notes = data ? data : {}
                await this.setState({
                    userNotes : notes
                })
            })
    }

    render() {
        let noteID = Object.keys(this.state.userNotes);
        return (
            <View style = {DeletedScreenStyle.mainContainer}>
            <View style = {{marginBottom : 10}}>
                <Appbar style = {DeletedScreenStyle.header_style}>
                    <Appbar.Action
                        icon = 'menu'
                        onPress = {this.handleMenuButton}
                        />
                    <Appbar.Content title = 'Deleted'/>
                    {noteID.length > 0 ?
                        (<Appbar.Action icon = 'dots-vertical'/>) : null
                    }
                </Appbar>
            </View>
            <ScrollView>
            <View>
                { noteID.length > 0 ?
                    noteID.reverse().map(key => ( 
                        <React.Fragment key = {key}>
                            {this.state.userNotes[key].notes.isDeleted ? 
                                (<Card style = {DeletedScreenStyle.list_item_style}>
                                    <Card.Content>
                                        <Title>
                                                {this.state.userNotes[key].notes.title}
                                        </Title>
                                        <Paragraph>
                                                {this.state.userNotes[key].notes.note}
                                        </Paragraph>
                                    </Card.Content>  
                                </Card>)
                            : null}
                            
                        </React.Fragment>
                    )) 
                    :
                    null
                }
            </View>
            </ScrollView>
        </View>
        )
    }
}

export default DeletedScreen
