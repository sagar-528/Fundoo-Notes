import React, { Component } from 'react'
import  { View, TouchableOpacity } from 'react-native'
import { Appbar, FAB, Avatar, TouchableRipple} from 'react-native-paper';
import HeaderBarStyle from '../../Styles/HeaderBar'

class HeaderBar extends Component {

    constructor(props) {
        super(props)
    }

    handleSearchButton = () => {
        const {onPress} = this.props
        this.props.navigation.push('Home', { screen : 'SearchNote'})
        // onPress();
    }

    handleMenuButton = () => {
        const {onPress} = this.props
        this.props.navigation.openDrawer();
        // onPress();
    }

    render() {
        return (
            <View style = {HeaderBarStyle.container}>
                <Appbar.Header style={{ backgroundColor: '#e0e0e0'}}>
                    <Appbar.Action
                    icon = 'menu'
                    onPress = {this.handleMenuButton}
                    />
                    <Appbar.Content
                    style = {HeaderBarStyle.appbar_content_style}
                    onPress = {this.handleSearchButton}
                    title = "Search your notes"/>
                    <Appbar.Action
                    icon = { (this.props.listView) ? 'view-grid-outline' : 'view-agenda-outline'}
                    onPress={this.props.onPressView}
                    />
                    <TouchableOpacity
                    style = {HeaderBarStyle.avatar_style}
                    onPress = {this.props.onPressProfile} >
                    <Avatar.Image 
                    size={25} 
                    style = {{backgroundColor : 'white'}}
                    source={(this.props.photo == '') ? require('../../Assets/profile.jpg') : {uri : this.props.photo}} />
                    </TouchableOpacity>
                </Appbar.Header>
            </View>
        )
    }
}


export default HeaderBar
