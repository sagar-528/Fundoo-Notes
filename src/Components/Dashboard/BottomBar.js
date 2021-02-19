import React, { Component } from 'react'
import  { View } from 'react-native'
import { Appbar, FAB } from 'react-native-paper';
import BottomBarStyle from '../../Styles/BottomBar'

export class BottomBar extends Component {

    handlePlusIconButton = () => {
        const {onPress} = this.props;
        this.props.navigation.push('AddNote')
        // onPress();
    }

    render() {
        return (
            <View style = {BottomBarStyle.bottombar_view}>
                <Appbar style = {BottomBarStyle.bottombar}>
                    <Appbar.Action
                        style = {BottomBarStyle.bottom_bar_action_style}
                        icon = 'check-box-outline'
                        />
                    <Appbar.Action
                        style = {BottomBarStyle.bottom_bar_action_style}
                        icon = 'brush'
                        />
                    <Appbar.Action
                        style = {BottomBarStyle.bottom_bar_action_style}
                        icon = 'microphone-outline'
                        />
                    <Appbar.Action
                        style = {BottomBarStyle.bottom_bar_action_style}
                        icon = 'panorama'
                        />
                    <Appbar.Content/>
                    <Appbar.Action  
                        style = {BottomBarStyle.plus_button_style} 
                        icon = 'plus'
                        onPress = {this.handlePlusIconButton}
                        />
                </Appbar>
            </View>
        )
    }
}


export default BottomBar
