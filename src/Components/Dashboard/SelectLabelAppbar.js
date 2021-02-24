import React, { Component } from 'react'
import {View} from 'react-native'
import {Appbar, Checkbox, TouchableRipple} from 'react-native-paper'

export class SelectLabelAppbar extends Component {

    constructor(props) {
        super(props)
    }
    
    handleCheckbox = async() => {
        if(this.props.selectedLabel.includes(this.props.labelKey)) {
            this.props.handleSelectedLabel(this.props.labelKey, 'remove')
        }
        else {
            this.props.handleSelectedLabel(this.props.labelKey, 'add')
        }
    }

    render() {
        return (
            <View>
            <TouchableRipple onPress = {this.handleCheckbox}>
                <Appbar style = {{backgroundColor : 'transparent'}}>
                    <Appbar.Action 
                        style = {{marginLeft : 10}}
                        icon = 'label-outline' />
                    <Appbar.Content
                        title = {this.props.labels.label_name}
                        titleStyle = {{fontSize : 18}} />
                    <View
                        style = {{marginRight : 10}}>
                        <Checkbox 
                            status = {(this.props.selectedLabel.includes(this.props.labelKey)) ? 'checked' : 'unchecked'}
                            onPress = {this.handleCheckbox}
                            uncheckedColor = 'black'
                            color = '#4169E1'/>
                    </View>
                </Appbar>
            </TouchableRipple>
        </View>
        )
    }
}

export default SelectLabelAppbar
