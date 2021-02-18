import React, { Component } from 'react'
import {View, Text, TextInput, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {Appbar} from 'react-native-paper';
import CreateNewLabelStyle from '../../Styles/CreateNewLabels'
import {storeUserLabel} from '../../Redux/Actions/CreateNewLabelActions'
import { connect } from 'react-redux'
import UserLabelServices from '../../../Service/UserLabelServices'
import LabelAppbar from './LabelAppbar'

class CreateNewLabels extends Component {

    constructor(props) {
        super(props)
        this.state = {
            createLabel : true,
            createLabelText : '',
            labelAlreadyExistMsg : false,
            change : true
        }
    }

    handleBackIconButton = () => {
        this.props.navigation.push('Home', { screen : 'Notes'})
    }

    handleCreateLabel = () => {
        this.setState({
            createLabel : !this.state.createLabel,
            createLabelText : ''
        })
    }

    handleCreateLabelTextInput = async (inputText) => {
        this.setState({
            createLabelText : inputText,
            labelAlreadyExistMsg : false
        })
    }

    handleCheckIconButton = async () => {
        if(this.state.createLabelText == '') {
            await this.setState({
                createLabel : !this.state.createLabel,
                createLabelText : ''
            })
        }
        else {
            let labelId = Object.keys(this.props.userLabel);
            let temp = []
            if(labelId.length > 0) {
                labelId.map(key => {
                    temp.push(this.props.userLabel[key].label.toLowerCase())
                })
            }
            if(temp.includes(this.state.createLabelText.toLowerCase())) {
                await this.setState({
                    labelAlreadyExistMsg : true
                })
            }
            else {
                UserLabelServices.addLabelinDatabase(this.props.userId, this.state.createLabelText)
                    .then(() => console.log('success'))
                    .catch(error => console.log(error))
                await UserLabelServices.getLabelFromDatabase(this.props.userId)
                    .then(async data => {
                        let labels = data ? data : {}
                        this.props.storeUserLabel(labels)
                    })
                await this.setState({
                    createLabel : !this.state.createLabel,
                    createLabelText : ''
                })
            }
        }
    }

    render() {
        let labelId = Object.keys(this.props.userLabel);
        return (
            <View style = {CreateNewLabelStyle.mainContainer}>
                <View>
                    <Appbar style = {CreateNewLabelStyle.header_style}>
                        <Appbar.Action 
                            style = {{marginLeft : 10}}
                            icon = 'keyboard-backspace'
                            onPress = {this.handleBackIconButton}/>
                        <Appbar.Content 
                            title = 'Edit Labels'/>
                    </Appbar>
                </View>
                <ScrollView>
                    <View style = {this.state.createLabel ? CreateNewLabelStyle.create_label_appbar : null}>
                        <Appbar style = {CreateNewLabelStyle.header_style}>
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
                            {
                                (this.state.createLabel ?
                                    <View style = {{flexDirection :'column', width : '65%'}}>
                                        <TextInput
                                        style = {this.state.labelAlreadyExistMsg ? CreateNewLabelStyle.textinput_error_style : CreateNewLabelStyle.textinput_style}    
                                        placeholder = 'Create New Label'
                                        autoFocus = {true}
                                        onChangeText = {this.handleCreateLabelTextInput}
                                        value = {this.state.createLabelText}/>

                                        {
                                            (this.state.labelAlreadyExistMsg) ?
                                            <Text style = {CreateNewLabelStyle.text_error_style}>
                                                Label Already Exist
                                            </Text>
                                            :
                                            null
                                        }
                                    </View>
                                :
                                <TouchableWithoutFeedback onPress = {this.handleCreateLabel}>
                                    <View style = {{width : '65%'}}>
                                        <Text
                                            style = {CreateNewLabelStyle.text_style}>
                                            Create New Label
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                )
                            }
                            
                            <Appbar.Content/>
                            {
                                (this.state.createLabel ? 
                                    <Appbar.Action
                                        onPress = {this.handleCheckIconButton}
                                        icon = 'check'/>
                                    : 
                                    null)
                            }
                        </Appbar>
                    </View>
                    <View>
                        {
                            labelId.length > 0 ?
                                labelId.map(key => (
                                    <React.Fragment key = {key}>
                                        <LabelAppbar labelKey = {key} />
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

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        userLabel : state.createLabelReducer.userLabel
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeUserLabel : (userLabel) => dispatch(storeUserLabel(userLabel))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateNewLabels)