import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const SignIn = () => {
  return(
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <View style={styles.footer}>
            <Text>SignIn !!!!</Text>
        </View>
    </View>
  );
};

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#e0e0e0'
      },
      header: {
          flex: 1,
          justifyContent: 'flex-end',
          paddingHorizontal: 20,
          paddingBottom: 50
      },
      footer: {
          backgroundColor: '#616161',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 30
      },
      text_header: {
        color: '#616161',
        fontWeight: 'bold',
        fontSize: 30
    },
})
