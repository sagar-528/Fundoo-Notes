import React from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import GlobalCss from '../Styles/GlobalCss';

const ForgetPassword = ( { navigation } ) => {

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
    <Text style = {GlobalCss.text_footer}>Email-Id</Text>
    
    <View style = {GlobalCss.action}>
        <FontAwesome5 
            name = "envelope"
            size = {20}
            color = "black"
        />
        <TextInput 
            placeholder = "Your Email-Id"
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
  
        <View style = {{alignItems: 'center', marginTop: 20}}>
        <TouchableOpacity
            style = {[GlobalCss.signIn, {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15
            }]}
            onPress = { signInHandler }
        >
            <Text style = {[GlobalCss.textSign, {
                color: 'black'
            }]}>Submit</Text>
        </TouchableOpacity>
    </View>
    </Animatable.View>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgetPassword
