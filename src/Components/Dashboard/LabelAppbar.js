import React, {Component} from 'react';
import {TextInput, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import { connect } from 'react-redux'
import UserLabelServices from '../../../Service/UserLabelServices'
import LabelAppBarStyle from '../../Styles/LabelAppbar'
import {storeUserLabel} from '../../Redux/Actions/CreateNewLabelActions'

class LabelAppbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit : false,
            editTextInput : this.props.userLabel[this.props.labelKey].label,
            emptyMsg : false,
            errorMsg : false,
        }
    }
    
    handleCheckButton = async () => {
        if(!this.state.errorMsg && !this.state.emptyMsg) {
            UserLabelServices.updateLabelInFirebase(this.props.userId, this.props.labelKey, this.state.editTextInput)
                .then(() => {
                    UserLabelServices.getLabelFromDatabase(this.props.userId)
                    .then(async data => {
                        let labels = data ? data : {}
                        this.props.storeUserLabel(labels)
                        this.setState({
                            edit : false
                        })
                    }) 
                })
                .catch(error => console.log(error))
        }
    }

    handleEditButton = () => {
        this.setState({
            edit : true
        })
    }

    handleEditTextInput = async (editText) => {
        let labelId = Object.keys(this.props.userLabel);
        let temp = []
        if(labelId.length > 0) {
            labelId.map(key => {
                temp.push(this.props.userLabel[key].label.toLowerCase())
            })
        }
        await this.setState({
            editTextInput : editText
        })
        if(this.state.editTextInput == '') {
            await this.setState({
                emptyMsg : true,
            })
        }
        else {
            await this.setState({
                emptyMsg : false
            })
            if(temp.includes(this.state.editTextInput.toLowerCase())){
                await this.setState({
                    errorMsg : true,
                })
            }
            else {
                await this.setState({
                    errorMsg : false,
                })
            }
        }
    }

    handleDeleteButton = () => {
        UserLabelServices.deleteLabelInFirebase(this.props.userId, this.props.labelKey)
            .then(() => {
                UserLabelServices.getLabelFromDatabase(this.props.userId)
                    .then(async data => {
                        let labels = data ? data : {}
                        this.props.storeUserLabel(labels)
                        this.setState({
                            edit : false
                        })
                    }) 
            })
            .catch(error => console.log(error))

    }

    render() {
        return(
            <Appbar style = {{backgroundColor : 'transparent'}}>
                {
                    (this.state.edit) ?
                    <Appbar.Action 
                        icon = 'delete-outline'
                        style = {{marginLeft : 10}}
                        onPress = {this.handleDeleteButton}/>
                    :
                    <Appbar.Action 
                        icon = 'label-outline'
                        style = {{marginLeft : 10}}/> 
                }
                {
                    (this.state.edit)?
                    <View style = {{flexDirection :'column', width : '65%'}}>
                        <TextInput
                            style = {(this.state.errorMsg || this.state.emptyMsg) ? LabelAppBarStyle.textinput_error_style : LabelAppBarStyle.textinput_style}
                            autoFocus = {true}
                            onChangeText = {this.handleEditTextInput}
                            value = {this.state.editTextInput}
                        />
                        {
                            (this.state.emptyMsg) ?
                                <Text style = {LabelAppBarStyle.text_error_style}>
                                    Enter a Label Name
                                </Text>
                                :
                                (this.state.errorMsg) ?
                                    <Text style = {LabelAppBarStyle.text_error_style}>
                                        Label Already Exist
                                    </Text>
                                    :
                                    null
                        }
                    </View>
                    :
                    <TouchableWithoutFeedback onPress = {this.handleEditButton}>
                        <View style = {{width : '65%'}}>
                            <Text
                                style = {LabelAppBarStyle.text_style}>
                                {this.props.userLabel[this.props.labelKey].label}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                <Appbar.Content/>
                {
                    (this.state.edit) ?
                    <Appbar.Action 
                        icon = 'check'
                        onPress = {this.handleCheckButton}/>
                    :
                    <Appbar.Action 
                        icon = 'pencil'
                        onPress = {this.handleEditButton}/>
                }
            </Appbar>
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
 export default connect(mapStateToProps,mapDispatchToProps)(LabelAppbar)
