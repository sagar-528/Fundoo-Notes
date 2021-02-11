import React, { Component } from 'react'
import {View} from 'react-native'
import { Menu, TouchableRipple} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'

export class DotVerticalMenu extends Component {
    
    constructor(props) {
        super(props)
    }
    
    
    render() {
        return (
            <View style = {{flex : 1}}>
                <TouchableRipple onPress={this.props.delete}>
                    <Menu.Item icon="delete-outline" title="Delete" />
                </TouchableRipple>
                <TouchableRipple>
                    <Menu.Item icon="content-copy" title="Make a copy" />
                </TouchableRipple>
                <TouchableRipple>
                    <Menu.Item icon="share-variant" title="Send" />
                </TouchableRipple>
                <TouchableRipple>
                    <Menu.Item 
                        icon={({ size, color }) => (
                            <Icon name="person-add-outline" size={size} color={color} />
                        )} 
                        title="Collaborator"/>
                </TouchableRipple>
                <TouchableRipple>
                    <Menu.Item icon="label-outline" title="Labels" />
                </TouchableRipple>
            </View>
        )
    }
}

export default DotVerticalMenu
