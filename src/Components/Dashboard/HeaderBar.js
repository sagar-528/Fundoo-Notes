import React, { Component } from 'react'
import  { View, TouchableOpacity } from 'react-native'
import { Appbar, FAB, Avatar } from 'react-native-paper';
import NoteCss from '../../Styles/NoteCss'

class HeaderBar extends Component {

    constructor(props) {
        super(props)
    }

    handleMenuButton = () => {
        const {onPress} = this.props
        this.props.navigation.openDrawer();
        onPress();
    }

    render() {
        return (
            <View style = {NoteCss.container}>
                <Appbar.Header style={{ backgroundColor: 'grey'}}>
                    <Appbar.Action
                    icon = 'menu'
                    onPress = {this.handleMenuButton}
                    />
                    <Appbar.Content
                    style = {NoteCss.appbar_content_style}
                    title = "Search your notes"/>
                    <Appbar.Action
                    icon = { (this.props.listView) ? 'view-grid-outline' : 'view-agenda-outline'}
                    onPress={this.props.onPress}
                    />
                    <TouchableOpacity
                    style = {NoteCss.avatar_style} >
                    <Avatar.Image size={25} source={require('../../Assets/profile.jpg')} />
                    </TouchableOpacity>
                </Appbar.Header>
            </View>
        )
    }
}


export default HeaderBar
