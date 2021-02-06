import React, {Component} from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import GlobalCss from '../../Styles/GlobalCss'
import UserServices from '../../../Service/UserServices';
import { Dialog, Portal, Button, Provider, Paragraph } from 'react-native-paper';

export default class SignUp extends Component{
  
  constructor(props) {
    super(props)
    
    this.state = {
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        firstNameValidation : true,
        lastNameValidation : true,
        emailValidation : true,
        passwordValidation : true,
        secureTextPassword : true,
        firstNameEmpty : false,
        lastNameEmpty : false,
        emailEmpty : false,
        passwordEmpty : false,
        emailPresent : false,
        visible : false,
    }
  }

 textInputChangeFirstName = (val) =>{
  this.setState({
    firstName: val,
    firstNameEmpty : false
  })
  this.validateFirstName();
}

textInputChangeLastName = (val) =>{
    this.setState({
     lastName: val,
     lastNameEmpty : false
   })
   this.validateLastName();
 }

textInputChangeEmail = (val) =>{
    this.setState({
     email: val,
     emailEmpty : false,
     emailPresent : false
   })
   this.validateEmail();
 }

 textInputChangePassword = (val) =>{
    this.setState({
     password: val,
     passwordEmpty : false,
   })
   this.validatePassword();
 }

  validateFirstName = () => {
    const nameRegex = new RegExp("^[A-Z][a-z]{1,}$")
      if(nameRegex.test(this.state.firstName)) {
        this.setState({
          firstNameValidation : true
      })
    }
    else {
        this.setState({
          firstNameValidation : false
      })
    }
  }

  validateLastName = () => {
    const nameRegex = new RegExp("^[A-Z][a-z]{2,}$")
    if(nameRegex.test(this.state.lastName)) {
      this.setState({
          lastNameValidation : true
      })
    }
    else {
      this.setState({
          lastNameValidation : false
    })
   }
  }

validateEmail = () => {
  const emailRejex = new RegExp("^[0-9a-zA-Z]+([._+-][0-9A-Za-z]+)*@[0-9A-Za-z]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$")
  if(emailRejex.test(this.state.email)) {
      this.setState({
          emailValidation : true
      })
  } 
  else {
      this.setState({
          emailValidation : false
      })
  }
}

validatePassword = () => {
  const passwordRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@#$%^&(){}:'<>,.>/~`_+=|].).{8,}$");
  if(passwordRegex.test(this.state.password)) {
      this.setState({
          passwordValidation: true
      })
  }
  else {
      this.setState({
          passwordValidation: false
      })
  }
}

 signUpHandler = async() =>{
  const {onPress} = this.props;
    if(this.state.firstName != '' &&  this.state.lastName != '' && this.state.email != '' && this.state.password != ''){
      UserServices.SignUp(this.state.email, this.state.password)
          .then( async userCredential => {
           await this.setState({
              visible : true
            })
            UserServices.writeUserDataInRealtimeDatabase(userCredential.user.uid, this.state.firstName, this.state.lastName, userCredential.user.email)
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
    else{
      if(this.state.firstName == '') {
          await this.setState({
              firstNameEmpty : true
          })
      }
      if(this.state.lastName == ''){
          await this.setState({
              lastNameEmpty : true
          })
      }
      if(this.state.email == '') {
          await this.setState({
              emailEmpty : true
          })
      }
      if(this.state.password == '') {
          await this.setState({
              passwordEmpty : true
          })
      }
      if(this.state.confirmPassword == '') {
          await this.setState({
              confirmPasswordEmpty : true
          })
      }
  }   
  // onPress();
 }

 signInHandler = () => {
   const {onPress} = this.props;
    this.props.navigation.push("SignIn")
    // onPress();
 }

 hideDialog = async  () => {
  const {onDismiss} = this.props
   this.setState({
      visible : false
  })
  // onDismiss()
}

handleDialogButton = () => {
  const {onPress} = this.props
  this.props.navigation.navigate('SignIn')
  // onPress()
}

render(){
  return(
    <Provider>
    <ScrollView>
    <TouchableWithoutFeedback onPress = {() => {
      Keyboard.dismiss();
    }}>
    <View style = {GlobalCss.container}>

      <View style = {GlobalCss.header}>
        <FontAwesome5 
                name = "foursquare"
                color = "#fff"
                size = {50}
        />
        <Text style = {GlobalCss.text_header}>Fundoo Notes</Text>
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
      <View>
        <Text style = {GlobalCss.text_error_style}>
            {(this.state.firstNameEmpty) ? 'required..' : (this.state.firstNameValidation) ? null : 'Invalid First Name'}
        </Text>
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
      <View>
        <Text style = {GlobalCss.text_error_style}>
            {(this.state.lastNameEmpty) ? 'required..' : (this.state.lastNameValidation) ? null : 'Invalid Last Name..'}
        </Text>
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
      <View>    
        <Text style = {GlobalCss.text_error_style}>
            {(this.state.emailEmpty) ? 'required..' : (this.state.emailValidation) ? (this.state.emailPresent) ? 'Email Already Exist' : null : 'Invalid Email..'}
        </Text>
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
              secureTextEntry = {this.state.secureTextPassword}
           />
      </View>
      <View>    
        <Text style = {GlobalCss.text_error_style}>
            {(this.state.passwordEmpty) ? 'required..' : (this.state.passwordValidation) ? null : 'Invalid Password..'}
        </Text>
      </View>
          <View style = {{alignItems: 'center', marginTop: 20}}>
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
            <Text style = {{color: 'black', fontSize: 17}}>Already have an account? </Text>
            <TouchableOpacity onPress = { this.signInHandler }>
              <Text style = {{color: '#1976d2', fontSize: 17}}>Sign In</Text>
            </TouchableOpacity>
          </View>
       </View>
       <Portal>
          <Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
            <Dialog.Content>
              <Paragraph style = {{fontSize : 20, paddingTop : 20}}>SucessFull Sign Up.</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this.handleDialogButton}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Animatable.View>
    </View>
    </TouchableWithoutFeedback>
    </ScrollView>
    </Provider>
  )}
}
