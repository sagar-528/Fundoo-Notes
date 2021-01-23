import React from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import GlobalCss from '../Styles/GlobalCss'

const SignUp = ( { navigation } ) => {

const signUpHandler = () => {
  navigation.navigate('SignIn')
}

const signInHandler = () => {
  navigation.navigate('SignIn')
}
  return(
    <TouchableWithoutFeedback onPress = {() => {
      Keyboard.dismiss();
    }}>
    <View style = {GlobalCss.container}>

      <View style = {GlobalCss.header}>
        <FontAwesome5 
                name = "google"
                color = "#fff"
                size = {40}
        />
        <Text style = {GlobalCss.text_header}>Fundoo-Notes</Text>
      </View>

    <Animatable.View 
      animation = "fadeInUpBig"
      style = {GlobalCss.footer}
    >

    <Text style = {GlobalCss.text_footer}>First Name</Text>
    <View style = {GlobalCss.action}>
        <FontAwesome5 
            name = "user"
            size = {20}
            color = "black"
        />
        <TextInput 
            placeholder = "Your First Name"
            placeholderTextColor = "black"
            style = {GlobalCss.textInput}
        />
    </View>

    <Text style = {[GlobalCss.text_footer, {
      marginTop: 10
      }]}>Last Name</Text>
    <View style = {GlobalCss.action}>
        <FontAwesome5 
            name = "user"
            size = {20}
            color = "black"
        />
        <TextInput 
            placeholder = "Your Last Name"
            placeholderTextColor = "black"
            style = {GlobalCss.textInput}
        />
    </View>

      <Text style = {[GlobalCss.text_footer, {
        marginTop: 10
        }]}>Username</Text>
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
          marginTop: 10
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
    
          <View style = {{alignItems: 'center', marginTop: 15}}>
          <TouchableOpacity
              style = {[GlobalCss.signIn, {
                  borderColor: '#009387',
                  borderWidth: 1,
                  marginTop: 15
              }]}
              onPress = { signUpHandler }
          >
              <Text style = {[GlobalCss.textSign, {
                  color: 'black'
              }]}>Sign Up</Text>
          </TouchableOpacity>
          
          <View style = {{flexDirection:'row',padding: 5}}>
            <Text style = {{color: 'black', fontSize: 17}}> Already have an account? </Text>
            <TouchableOpacity onPress = { signInHandler }>
              <Text style = {{color: '#1976d2', fontSize: 17}}> Sign In</Text>
            </TouchableOpacity>
          </View>
      </View>
  </Animatable.View>

    </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp