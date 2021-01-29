import React from 'react'
import  {  View, StyleSheet  } from 'react-native'
import { Colors, Appbar, FAB } from 'react-native-paper';

const Home = () => {

    return (
    <View style = {styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress = {() => navigation.goBack()} />
          <Appbar.Content title = "Title" />
          <Appbar.Action icon = "magnify" />
        </Appbar.Header>
      <Appbar
        style = {[styles.bottom]}
      >
        <Appbar.Action icon = "archive"  />
        <Appbar.Action icon = "email"  />
        <Appbar.Action icon = "label"  />
        <Appbar.Action icon = "delete"  />
      </Appbar>
      <FAB icon = "reply"  style = {styles.fab} />
    </View>
        )
    }

         
styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
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
  });

export default Home
