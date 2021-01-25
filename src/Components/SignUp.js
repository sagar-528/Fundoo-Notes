import React, {Component} from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import GlobalCss from '../Styles/GlobalCss'
import UserServices from '../../Service/UserServices';

export default class SignUp extends Component{
  
  constructor(props) {
    super(props)
    
    this.state = {
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        emailPresent : false
    }
  }

 textInputChangeFirstName = (val) =>{
  this.setState({
    firstName: val
  })
}

textInputChangeLastName = (val) =>{
    this.setState({
     lastName: val
   })
 }

textInputChangeEmail = (val) =>{
    this.setState({
     email: val
   })
 }

 textInputChangePassword = (val) =>{
    this.setState({
     password: val
   })
 }

 signUpHandler = async() =>{
    if(this.state.firstName != '' &&  this.state.lastName != '' && this.state.email != '' && this.state.password != ''){
      console.log('In SignUp Container');
      UserServices.SignUp(this.state.email, this.state.password)
          .then(user => {
              this.props.navigation.push("SignIn")
          })
          .catch(error => {
              if(error == 'Email Already Exist') {
                  this.setState({
                      emailPresent : true
                  })
              }
          })
    }
    else
      console.log('failed');
 }

 signInHandler = () => {
    this.props.navigation.push("SignIn")
 }

render(){
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
            name = "user-circle"
            size = {20}
            color = "black"
        />
        <TextInput 
            placeholder = "First Name"
            placeholderTextColor = "black"
            style = {GlobalCss.textInput}
            onChangeText={this.textInputChangeFirstName}
        />
      </View>

    <Text style = {[GlobalCss.text_footer, {
      marginTop: 10
      }]}>Last Name</Text>
    <View style = {GlobalCss.action}>
        <FontAwesome5 
            name = "user-circle"
            size = {20}
            color = "black"
        />
        <TextInput 
            placeholder = "Last Name"
            placeholderTextColor = "black"
            style = {GlobalCss.textInput}
            onChangeText={this.textInputChangeLastName}
        />
    </View>

      <Text style = {[GlobalCss.text_footer, {
        marginTop: 10
        }]}>Email-Id</Text>
      <View style = {GlobalCss.action}>
          <FontAwesome5 
              name = "user"
              size = {20}
              color = "black"
          />
          <TextInput 
              placeholder = "Your Email-Id"
              placeholderTextColor = "black"
              style = {GlobalCss.textInput}
              onChangeText={this.textInputChangeEmail}
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
              onChangeText={this.textInputChangePassword}
           />
      </View>
    
          <View style = {{alignItems: 'center', marginTop: 15}}>
          <TouchableOpacity
              style = {[GlobalCss.signIn, {
                  borderColor: '#009387',
                  borderWidth: 1,
                  marginTop: 15
              }]}
              onPress = { this.signUpHandler }
          >
              <Text style = {[GlobalCss.textSign, {
                  color: 'black'
              }]}>Sign Up</Text>
          </TouchableOpacity>
          
          <View style = {{flexDirection:'row',padding: 5}}>
            <Text style = {{color: 'black', fontSize: 17}}> Already have an account? </Text>
            <TouchableOpacity onPress = { this.signInHandler }>
              <Text style = {{color: '#1976d2', fontSize: 17}}> Sign In</Text>
            </TouchableOpacity>
          </View>
      </View>
  </Animatable.View>

    </View>
    </TouchableWithoutFeedback>
  )}
}
