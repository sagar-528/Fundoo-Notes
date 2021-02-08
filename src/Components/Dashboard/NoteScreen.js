import React, { Component } from 'react'
import  { View } from 'react-native'
import HeaderBar from './HeaderBar';
import BottomBar from './BottomBar';
import NoteView from './NoteView';
import NoteCss from '../../Styles/NoteCss'

class NoteScreen extends Component {

constructor(props) {
    super(props)
    this.state = {
        listView : true,
    }
}

    selectView = async () => {
        const {onPress} = this.props
        await this.setState({
            listView : !this.state.listView
        })
        onPress()
    }

    render() {
        return (
            <View style={NoteCss.mainContainer}>
            <HeaderBar navigation = {this.props.navigation} onPress = {this.selectView} listView = {this.state.listView} />
            <NoteView navigation = {this.props.navigation} listView = {this.state.listView} />
            <BottomBar navigation = {this.props.navigation}/>
            </View>
        )
    }
}

export default NoteScreen
