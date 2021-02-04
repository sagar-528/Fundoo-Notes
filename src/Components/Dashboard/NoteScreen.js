import React, { Component } from 'react'
import  { View } from 'react-native'
import HeaderBar from './HeaderBar';
import BottomBar from './BottomBar';
import Card from './Card';

class NoteScreen extends Component {

constructor(props) {
    super(props)
}

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
            <HeaderBar navigation = {this.props.navigation} />
            <Card navigation = {this.props.navigation}/>
            <BottomBar navigation = {this.props.navigation}/>
            </View>
        )
    }
}

export default NoteScreen
