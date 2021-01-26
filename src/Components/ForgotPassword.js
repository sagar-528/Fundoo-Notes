import React from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GlobalCss from '../Styles/GlobalCss';
import UserServices from '../../Service/UserServices'

class ForgetPassword extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            email : '',
            invalidEmail : false,
            emailEmpty : false
        }
    }

textInputChangeEmail = (val) =>{
    this.setState({
        email: val,
        invalidEmail : false,
        emailEmpty : false,
    })
}

 resetPasswordHandler = () => {
    if(this.state.email != '') {
        UserServices.forgotPassword(this.state.email)
            .then(user => this.props.navigation.push('SignIn'))
            .catch(error => {
                if(error == 'Email not Found') {
                    this.setState({
                        invalidEmail : true
                    })
                }
            })
    }
    else {
        if(this.state.email == '') {
             this.setState({
                emailEmpty : true
            })
        }
    }
}

render(){
  return(
    <TouchableWithoutFeedback onPress = {() => {
      Keyboard.dismiss();
    }}>
    <View style = {GlobalCss.container}>
    
    <View style = {GlobalCss.header}>
        <FontAwesome5 
            name = "user-circle"
            color = "#fff"
            size = {50}
        />
      <Text style = {GlobalCss.text_header}>FundooNotes</Text>
    </View>

    <Animatable.View 
    animation = "fadeInUpBig"
    style = {GlobalCss.footer}
    >
    <Text style = {[GlobalCss.text_footer,{marginTop: 30}]}>Email-Id</Text>
    
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
            onChangeText = {this.textInputChangeEmail}
        />
    </View>
    
    <View>    
        <Text style = {GlobalCss.text_error_style}>
            {(this.state.emailEmpty) ? 'required..' : (this.state.invalidEmail) ? 'Email not Found..' : null}
        </Text>
    </View>     

        <View style = {{alignItems: 'center', marginTop: 20}}>
        <TouchableOpacity
            style = {[GlobalCss.signIn, {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15
            }]}
            onPress = { this.resetPasswordHandler }
        >
            <Text style = {[GlobalCss.textSign, {
                color: 'black'
            }]}>Reset Password</Text>
        </TouchableOpacity>
    </View>
    </Animatable.View>
    </View>
    </TouchableWithoutFeedback>
  )};
};

export default ForgetPassword
