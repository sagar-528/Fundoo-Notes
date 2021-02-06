import React, { Component } from 'react'
import  { View, TouchableOpacity } from 'react-native'
import { Appbar, FAB, Avatar } from 'react-native-paper';
import NoteCss from '../../Styles/NoteCss'

class HeaderBar extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            listView : true
        }
    }
    
    selectView = () => {
        const {onPress} = this.props
        this.setState({
          listView : !this.state.listView
       })
        // onPress()
   }

    render() {
        return (
            <View style = {NoteCss.container}>
                <Appbar.Header style={{ backgroundColor: 'grey'}}>
                    <Appbar.Action
                    icon = 'menu'
                    onPress = {() => this.props.navigation.openDrawer()}
                    />
                    <Appbar.Content
                    style = {NoteCss.appbar_content_style}
                    title = "Search your notes"/>
                    <Appbar.Action
                    icon = {this.state.listView ? 'view-grid-outline' : 'view-agenda-outline'}
                    onPress={this.selectView}
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
