import React, { Component } from 'react'
import {View} from 'react-native'
import { Menu, TouchableRipple} from 'react-native-paper'

export class DotsVerticalRestoreRBSheetMenu extends Component {
   
   constructor(props) {
       super(props)
   }
   
    render() {
        return (
            <View style = {{flex : 1}}>
                <TouchableRipple onPress = {this.props.restore}>
                    <Menu.Item icon = "restore" title = "Restore" />
                </TouchableRipple>
                <TouchableRipple onPress = {this.props.deleteForever}>
                    <Menu.Item icon = "delete-forever" title = "Delete forever" />
                </TouchableRipple>
            </View>
        )
    }
}

export default DotsVerticalRestoreRBSheetMenu
