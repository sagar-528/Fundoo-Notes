import React, { Component } from 'react'
import {View, Text, TextInput, TouchableWithoutFeedback} from 'react-native';
import {Appbar} from 'react-native-paper';
import NewLabelStyle from '../../Styles/NewLabel'

export class NewLabel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            createLabel : true
        }
    }

    handleBackIconButton = () => {
        this.props.navigation.goBack()
    }

    handleCreateLabel = () => {
        this.setState({
            createLabel : !this.state.createLabel
        })
    }

    render() {
        return (
            <View style = {NewLabelStyle.mainContainer}>
            <View>
                <Appbar style = {NewLabelStyle.header_style}>
                    <Appbar.Action 
                        style = {{marginLeft : 10}}
                        icon = 'keyboard-backspace'
                        onPress = {this.handleBackIconButton}/>
                    <Appbar.Content 
                        title = 'Edit Labels'/>
                </Appbar>
            </View>
            <View style = {this.state.createLabel ? NewLabelStyle.create_label_appbar : null}>
                <Appbar style = {NewLabelStyle.header_style}>
                    {
                        (this.state.createLabel ? 
                            <Appbar.Action 
                                style = {{marginLeft : 10}}
                                icon = 'close'
                                onPress = {this.handleCreateLabel}/>
                            : 
                            <Appbar.Action 
                                style = {{marginLeft : 10}}
                                icon = 'plus'
                                onPress = {this.handleCreateLabel}/>)
                    }
                    <TouchableWithoutFeedback onPress = {this.handleCreateLabel}>
                        <View style = {{width : '65%'}}>
                            <TextInput
                                style = {NewLabelStyle.textinput_style}    
                                placeholder = 'Create New Label'
                                editable = {this.state.createLabel ? true : false}
                                autoFocus = {true}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <Appbar.Content/>
                    {
                        (this.state.createLabel ? 
                            <Appbar.Action 
                                icon = 'check'/>
                            : 
                            null)
                    }
                </Appbar>
            </View>
        </View>
        )
    }
}

export default NewLabel
