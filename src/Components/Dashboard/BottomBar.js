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
            <View>
                <Appbar
                style = {BottomBarStyle.bottom}>
                    <Appbar.Action icon = "check-box-outline" />
                    <Appbar.Action icon = "brush"  />
                    <Appbar.Action icon = "microphone-outline"  />
                    <Appbar.Action icon = "panorama"  />
                </Appbar>
                <FAB icon = "plus"  
                style = {BottomBarStyle.fab}
                onPress = {this.handlePlusIconButton}
                />
            </View>
        )
    }
}


export default BottomBar
