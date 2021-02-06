import React, { Component } from 'react'
import  { View } from 'react-native'
import { Appbar, FAB } from 'react-native-paper';
import NoteCss from '../../Styles/NoteCss'

export class BottomBar extends Component {
    render() {
        return (
            <View>
                <Appbar
                style = {NoteCss.bottom}>
                    <Appbar.Action icon = "check-box-outline" />
                    <Appbar.Action icon = "brush"  />
                    <Appbar.Action icon = "microphone-outline"  />
                    <Appbar.Action icon = "panorama"  />
                </Appbar>
                <FAB icon = "plus"  
                style = {NoteCss.fab}
                onPress = {() => this.props.navigation.navigate('AddNote')}
                />
            </View>
        )
    }
}


export default BottomBar
