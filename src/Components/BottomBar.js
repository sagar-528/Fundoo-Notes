import React, { Component } from 'react'
import  { View } from 'react-native'
import { Appbar, FAB } from 'react-native-paper';
import HomeCss from '../Styles/HomeCss';

export class BottomBar extends Component {
    render() {
        return (
            <View>
                <Appbar
                style = {HomeCss.bottom}>
                    <Appbar.Action icon = "check-box-outline" />
                    <Appbar.Action icon = "draw"  />
                    <Appbar.Action icon = "microphone-outline"  />
                    <Appbar.Action icon = "panorama"  />
                </Appbar>
                <FAB icon = "plus"  style = {HomeCss.fab} />
            </View>
        )
    }
}


export default BottomBar
