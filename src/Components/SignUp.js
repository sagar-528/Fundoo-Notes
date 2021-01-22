import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import GlobalCss from '../Styles/GlobalCss'

const SignUp = ( { navigation } ) => {
  return(
    <TouchableWithoutFeedback onPress = {() => {
      Keyboard.dismiss();
    }}>
    <View style = {GlobalCss.container}>

      <View style = {GlobalCss.header}>
        <Text style = {GlobalCss.text_header}>Sign Up</Text>
      </View>

      <Animatable.View 
      animation = "fadeInUpBig"
      style = {GlobalCss.footer}
  >
      <Text style = {GlobalCss.text_footer}>Username</Text>
      
      <View style = {GlobalCss.action}>
          <FontAwesome5 
              name = "user"
              size = {20}
              color = "black"
          />
          <TextInput 
              placeholder = "Your Username"
              placeholderTextColor = "black"
              style = {GlobalCss.textInput}
          />
      </View>
      
      <Text style = {[GlobalCss.text_footer, {
          marginTop: 35
      }]}>Password</Text>
      
      <View style = {GlobalCss.action}>
          <Feather 
              name = "unlock"
              size = {20}
              color = "black"
          />
          <TextInput 
              placeholder = "Your Password"
              placeholderTextColor = "black"
              style = {GlobalCss.textInput}
           />
      </View>
      
      <Text style = {[GlobalCss.text_footer, {
        marginTop: 35
    }]}> Confirm Password </Text>
    
    <View style = {GlobalCss.action}>
        <Feather 
            name = "lock"
            size = {20}
            color = "black"
        />
        <TextInput 
            placeholder = "confirm Password"
            placeholderTextColor = "black"
            style = {GlobalCss.textInput}
         />
    </View>
    
          <View style = {{alignItems: 'center', marginTop: 15}}>
          <TouchableOpacity
              style = {[GlobalCss.signIn, {
                  borderColor: '#009387',
                  borderWidth: 1,
                  marginTop: 15
              }]}
              onPress = { () => {navigation.navigate('SignIn')} }
          >
              <Text style = {[GlobalCss.textSign, {
                  color: 'black'
              }]}>Sign Up</Text>
          </TouchableOpacity>
          
          <View style = {{flexDirection:'row',padding: 5}}>
            <Text style = {{color: 'black'}}> Already have an account? </Text>
            <TouchableOpacity onPress = { () => {navigation.navigate('SignIn')} }>
              <Text style = {{color: '#1976d2', fontSize: 16}}> Sign In</Text>
            </TouchableOpacity>
          </View>
      </View>
  </Animatable.View>

    </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp