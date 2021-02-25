import React, { Component } from 'react'
import {ScrollView, FlatList} from 'react-native';
import * as Keychain from 'react-native-keychain';
import NoteViewStyle from '../../Styles/NoteView'
import NoteCard from './NoteCard'
import SQLiteServices from '../../../Service/SQLiteServices'

export default class NoteView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNotes : [],
            showNotes: [],
            index: 0,
            endReached : false
       }
    }

    async componentDidMount() {
        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);
    
        SQLiteServices.selectNoteByArchiveFromSQliteStorage(UserCredential.user.uid, 0, 0)
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
            let tempNotes = []
            let loadingIndex
            for(loadingIndex = 0; loadingIndex < 10 && loadingIndex < this.state.userNotes.length ; loadingIndex++) {
                tempNotes.push(this.state.userNotes[loadingIndex])
            }
            await this.setState({
                showNotes: tempNotes,
                index: loadingIndex
            })
    
        }
    
        loadData = async (addIndex) => {
            for(let i = 0; i < addIndex; i++) {
                if(this.state.index == this.state.userNotes.length) {
                    await this.setState({
                        index: 0,
                    })
                }
                this.state.showNotes.push(this.state.userNotes[this.state.index])
                this.state.index ++
            }
        }

    render() {

        return (
            <FlatList
                numColumns = {this.props.listView ? 1 : 2}
                keyExtractor = {(item, index) => JSON.stringify(index)}
                key = {this.props.listView ? 1 : 2}
                data = {this.state.showNotes}
                onEndReached = {async () => {
                    await this.setState({
                        endReached : true
                    })
                }}
                onScroll = {async () => {
                    if (this.state.endReached) {
                        this.loadData(5)
                        await this.setState({
                            endReached : false
                        })
                    }
                }}
                onEndReachedThreshold={0.1}
                renderItem = {({ item }) => ( 
                    <NoteCard 
                        listView = {this.props.listView}
                        notes = {item} 
                        noteKey = {item.note_id} 
                        navigation = {this.props.navigation}/>        
                )}  
                contentContainerStyle={{ paddingBottom: 60}} 
            />
        )
    }
}
