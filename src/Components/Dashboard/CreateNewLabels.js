import React, { Component } from 'react'
import {View, Text, TextInput, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {Appbar, Provider} from 'react-native-paper';
import CreateNewLabelStyle from '../../Styles/CreateNewLabels'
import {storeUserLabel} from '../../Redux/Actions/CreateNewLabelActions'
import { connect } from 'react-redux'
import UserLabelServices from '../../../Service/UserLabelServices'
import LabelAppbar from './LabelAppbar'
import NoteDataControllerServices from '../../../Service/NoteDataControllerServices'
import SQLiteLabelServices from '../../../Service/SQLiteLabelServices'
import SQLiteServices from '../../../Service/SQLiteServices'

class CreateNewLabels extends Component {

    constructor(props) {
        super(props)
        this.state = {
            createLabel : true,
            createLabelText : '',
            labelAlreadyExistMsg : false,
            change : true,
            activeLabel : '',
            userNotes : []
        }
    }

    componentDidMount = async () => {
        await SQLiteServices.selectNoteFromSQliteStorage(this.props.userId)
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
            .catch(error => console.log('Error', error))
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

    selectActiveLabel = async (labelKey) => {
        await this.setState({
            activeLabel : labelKey,
            createLabel : false
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
                var labelKey = this.generateLabelKey()
                NoteDataControllerServices.storeLabel(this.props.userId, labelKey, this.state.createLabelText)
                    .then(() => {
                        SQLiteLabelServices.selectLabelFromSQliteStorage(this.props.userId)
                            .then(async result => {
                                var temp = [];
                                if(result.rows.length != 0) {
                                    for (let i = 0; i < result.rows.length; ++i)
                                        temp.push(result.rows.item(i));
                                }
                                this.props.storeUserLabel(temp)
                            })
                            .catch(error => console.log(error))
                    })
                    .catch(error => console.log(error))
                await this.setState({
                    createLabel : !this.state.createLabel,
                    createLabelText : ''
                })
            }
        }
    }

    generateLabelKey = () => {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < 20; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    render() {
        return (
            <Provider>
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
                            this.props.userLabel.length > 0 ?
                                this.props.userLabel.map(labels => 
                                (
                                    <React.Fragment key = {labels.label_id}>
                                        <LabelAppbar 
                                            labelKey = {labels.label_id} 
                                            labels = {labels} 
                                            activeLabel = {this.state.activeLabel} 
                                            selectActiveLabel = {this.selectActiveLabel}
                                            userNotes = {this.state.userNotes} 
                                        />
                                    </React.Fragment>
                                ))
                                :
                                null
                        }
                    </View>
                </ScrollView>
            </View>
            </Provider>
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