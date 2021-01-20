import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

const SignUp = () => {
  return(
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard');
    }}>
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.text_header}>header</Text>
      </View>

      <View style={styles.footer}>
        <Text>footer</Text>
      </View>

    </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp

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
    flex: 3,
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