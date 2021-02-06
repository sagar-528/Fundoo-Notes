import React from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GlobalCss from '../../Styles/GlobalCss';
import { Dialog, Portal, Button, Paragraph, Provider } from 'react-native-paper';
import UserServices from '../../../Service/UserServices'
 

class ForgetPassword extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            email : '',
            invalidEmail : false,
            emailEmpty : false,
            visible : false
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
    const {onPress} = this.props
    if(this.state.email != '') {
        UserServices.forgotPassword(this.state.email)
                .then( () => {
                     this.setState({
                        visible : true
                    })
                })
                .catch( error => {
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
    // onPress();
}

hideDialog =  () => {
    const {onDismiss} = this.props
     this.setState({
        visible : false
    })
    // onDismiss();
}

handleDialogButton = () => {
    const {onPress} = this.props
    this.props.navigation.navigate('SignIn')
    // onPress();
}


render(){
  return(
      <Provider>
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
        <Portal>
            <Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
                <Dialog.Content>
                    <Paragraph style = {{fontSize : 20, paddingTop : 20}}>Mail is send to your Email-Id.</Paragraph>
                </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={this.handleDialogButton}>Ok</Button>
                    </Dialog.Actions>
            </Dialog>
        </Portal>
    </Animatable.View>
    </View>
    </TouchableWithoutFeedback>
    </Provider>
  )};
};

export default ForgetPassword
