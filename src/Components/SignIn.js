import React from 'react'
import {  View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import GlobalCss from '../Styles/GlobalCss';
import UserServices from '../../Service/UserServices';
import UserSocialServices from '../../Service/UserSocialServices';


class SignIn extends React.Component {

constructor(props) {
    super(props)

    this.state = {
        email : '',
        password : '',
        invalidEmail : false,
        invalidPassword : false,
        secureTextPassword : true,
        emailEmpty : false,
        passwordEmpty : false,
    }
}


textInputChangeEmail = (val) =>{
     this.setState({
          email : val,
          invalidEmail : false,
          invalidPassword : false,
          emailEmpty : false
      })
  }
  
  textInputChangePassword = (val) =>{
     this.setState({
          password : val,
          invalidEmail : false,
          invalidPassword : false,
          emailEmpty : false
      })
  }

handleSecureTextPassword = () => {
    const {onPress} = this.props
    if(this.state.secureTextPassword == true) {
        this.setState({
            secureTextPassword : false
        })
    }
    else {
        this.setState({
            secureTextPassword : true
        })
    }
    (onPress == undefined) ? null : onPress();
}

signInHandler = () => {
    const {onPress} = this.props
    if(this.state.email != '' && this.state.password != '')
    {
                UserServices.SignIn(this.state.email, this.state.password)
                .then(UserCredential => {
                        console.log("signIn");
                        this.props.navigation.push('Home')
                    })
                .catch(error => {
                    if(error == 'Email not Found') {
                        this.setState({
                        invalidEmail : true
                        })
                    }
                    if(error == 'Incorrect Password') {
                        this.setState({
                            invalidPassword : true
                        })
                        console.log('incorrect password');
                    }
                })
        }
    else{
        if(this.state.email == '') {
           this.setState({
                emailEmpty : true
            })
        }
        if(this.state.password == '') {
             this.setState({
                passwordEmpty : true
            })
        }
    }
    onPress();
}

SignUpHandler = () =>{
    const {onPress} = this.props;
    this.props.navigation.navigate('SignUp')
    onPress();
}

forgotPasswordHandler = () =>{
    const {onPress} = this.props;
    this.props.navigation.navigate('ForgotPassword')
    onPress();
}

handleFacebookLoginButton = () => {
    UserSocialServices.facebookLogin()
    .then(UserCredential => {
        UserSocialServices.writeUserDataForFacebookLogin(UserCredential);
        this.props.navigation.push('Home')
    })
        .catch(error => {
            console.log(error)
        })
}

render(){
  return(
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
            <Text style = {GlobalCss.text_footer}>Email-Id</Text>
            
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
                <Text style={GlobalCss.text_error_style}>
                    {(this.state.emailEmpty) ? 'Required..' : (this.state.invalidEmail) ? 'Email not Found..' : null}
                </Text>
            </View>
            
            <Text style = {[GlobalCss.text_footer, {
                marginTop: 10
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
                    onChangeText={this.textInputChangePassword}
                    secureTextEntry = {this.state.secureTextPassword}
                 />
            </View>
            <View>
                <Text style = {GlobalCss.text_error_style}>
                    {(this.state.passwordEmpty) ? 'Required..' : (this.state.invalidPassword) ? 'Invalid Password..' : null}
                </Text>
            </View>
                <TouchableOpacity onPress = { this.forgotPasswordHandler }>
                    <Text style = {{color: '#1976d2', marginTop:5, fontSize: 15}}>Forgot password?</Text>
                </TouchableOpacity>
            
                <View style = {GlobalCss.button}>
                <TouchableOpacity
                    style = {[GlobalCss.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                    onPress = { this.signInHandler }
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
                    onPress = { this.SignUpHandler }
                >
                    <Text style = {[GlobalCss.textSign, {
                        color: 'black'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
                <View>
                    <Text style={{marginTop: 10, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 15,}}>Or</Text>
                </View>
                <TouchableOpacity onPress={this.handleFacebookLoginButton}>
                <View style={GlobalCss.facebookButton} >
                   <FontAwesome5 
                   name = "facebook"
                   size = {20}
                   color = "blue" />
                   <Text style = {[GlobalCss.homeTextSign,{
                    color: '#1976d2'
                   }]}>Login with Facebook</Text>
            </View>
            </TouchableOpacity>
    </Animatable.View>
    </View>
    </TouchableWithoutFeedback>
  )};
};

export default SignIn
