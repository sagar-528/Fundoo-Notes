import React, { Component } from 'react'
import  { View, TouchableOpacity } from 'react-native'
import { Appbar, FAB, Avatar } from 'react-native-paper';
import HomeCss from '../../Styles/HomeCss'

export class HeaderBar extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            listView : true
        }
    }
    
    selectView = () => {
        this.setState({
           listView : !this.state.listView
       })
   }

    render() {
        return (
            <View style = {HomeCss.container}>
                <Appbar.Header>
                    <Appbar.Action
                    icon = 'menu'
                    onPress = {() => console.log('press')}/>
                    <Appbar.Content
                    style = {HomeCss.appbar_content_style}
                    title = "Search your notes"/>
                    <Appbar.Action
                    icon = {this.state.listView ? 'view-grid-outline' : 'view-agenda-outline'}
                    onPress={this.selectView}
                    />
                    <TouchableOpacity
                    style = {HomeCss.avatar_style} >
                    <Avatar.Image size={25} source={require('../../Assets/profile.jpg')} />
                    </TouchableOpacity>
                </Appbar.Header>
            </View>
        )
    }
}


export default HeaderBar
