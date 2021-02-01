import React, { Component } from 'react'
import  { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Appbar, FAB, Avatar } from 'react-native-paper';

class Home extends Component {

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

  render(){
    return (
    <View style = {styles.container}>
      <Appbar.Header>
        <Appbar.Action
          icon = 'menu'/>
        <Appbar.Content
          style = {styles.appbar_content_style}
          title = "Search your notes"/>
        <Appbar.Action
          icon = {this.state.listView ? 'view-grid-outline' : 'view-agenda-outline'}
          onPress={this.selectView}
          />
        <TouchableOpacity
        style = {styles.avatar_style} >
          <Avatar.Image size={25} source={require('../Assets/profile.jpg')} />
        </TouchableOpacity>
      </Appbar.Header>
      <Appbar
        style = {[styles.bottom]}
      >
        <Appbar.Action icon = "check-box-outline"  />
        <Appbar.Action icon = "draw"  />
        <Appbar.Action icon = "microphone-outline'"  />
        <Appbar.Action icon = "panorama"  />
      </Appbar>
      <FAB icon = "plus"  style = {styles.fab} />
    </View>
        )}
    }

         
styles = StyleSheet.create({
    container: {
      flex : 1,
      backgroundColor : 'white'
    },
    bottom: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
    fab: {
      position: 'absolute',
      right: 16,
      bottom: 28,
    },

  appbar_content_style : {
      fontSize: 18
  },

  avatar_style : {
      marginRight : 15, 
      marginLeft : 5
  }
  });

export default Home
