import React, { Component } from 'react'
import  { View } from 'react-native'
import {Snackbar} from 'react-native-paper'
import HeaderBar from './HeaderBar';
import BottomBar from './BottomBar';
import NoteView from './NoteView';
import NoteCss from '../../Styles/NoteCss'

class NoteScreen extends Component {

constructor(props) {
    super(props)
    this.state = {
        listView : true,
        showEmptyNoteSnackbar : this.props.route.params == undefined 
                                    ? false 
                                : (this.props.route.params.isEmptyNote  == undefined 
                                    ? false 
                                : this.props.route.params.isEmptyNote)
    }
}

    selectView = async () => {
        const {onPress} = this.props
        await this.setState({
            listView : !this.state.listView
        })
        // onPress();
    }

    emptyNoteSnackbarHandler = async () => {
        await this.setState({ 
            showEmptyNoteSnackbar : false
        })
        this.props.navigation.setParams({isEmptyNote : false})
    }

    render() {
        return (
            <View style={NoteCss.mainContainer}>
            <HeaderBar navigation = {this.props.navigation} onPress = {this.selectView} listView = {this.state.listView} />
            <NoteView navigation = {this.props.navigation} listView = {this.state.listView} />
            <BottomBar navigation = {this.props.navigation}/>
            <Snackbar
                style = {{marginBottom : 100}}
                visible={this.state.showEmptyNoteSnackbar}
                onDismiss={this.emptyNoteSnackbarHandler}
                duration = {10000}>
                Empty Note Discarded
            </Snackbar>
            </View>
        )
    }
}

export default NoteScreen
