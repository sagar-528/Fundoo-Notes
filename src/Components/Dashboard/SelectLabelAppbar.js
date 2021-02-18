import React, { Component } from 'react'
import {View} from 'react-native'
import {Appbar, Checkbox, TouchableRipple} from 'react-native-paper'

export class SelectLabelAppbar extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            checked : false
        }
    }
    
    handleCheckbox = () => {
        this.setState({
            checked : !this.state.checked
        })
    }

    render() {
        return (
            <View>
            <TouchableRipple onPress = {() => console.log('press')}>
                <Appbar style = {{backgroundColor : 'transparent'}}>
                    <Appbar.Action 
                        style = {{marginLeft : 10}}
                        icon = 'label-outline' />
                    <Appbar.Content
                        title = {this.props.labels.label}
                        titleStyle = {{fontSize : 18}} />
                    <View
                        style = {{marginRight : 10}}>
                        <Checkbox 
                            status = {this.state.checked ? 'checked' : 'unchecked'}
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
