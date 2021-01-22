import React from 'react'
import {  View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import GlobalCss from '../Styles/GlobalCss'

const SignIn = ( { navigation } ) => {
  return(
    <TouchableWithoutFeedback onPress = {() => {
        Keyboard.dismiss();
    }}>
    <View style = {GlobalCss.container}>
 
        <View style = {GlobalCss.header}>
            <Text style = {GlobalCss.text_header}>Welcome!!!</Text>
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
                    name = "lock"
                    size = {20}
                    color = "black"
                />
                <TextInput 
                    placeholder = "Your Password"
                    placeholderTextColor = "black"
                    style = {GlobalCss.textInput}
                 />
            </View>
                <TouchableOpacity onPress = { () => {navigation.navigate('ForgetPassword')} }>
                    <Text style = {{color: '#1976d2', marginTop:15, fontSize: 15}}>Forgot password?</Text>
                </TouchableOpacity>
            
                <View style = {GlobalCss.button}>
                <TouchableOpacity
                    style = {[GlobalCss.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                    onPress = { () => {navigation.navigate('SignIn')} }
                >
                <Text style = {[GlobalCss.textSign, {
                    color:'black'
                }]}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = {[GlobalCss.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                    onPress = { () => {navigation.navigate('SignUp')} }
                >
                    <Text style = {[GlobalCss.textSign, {
                        color: 'black'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default SignIn
