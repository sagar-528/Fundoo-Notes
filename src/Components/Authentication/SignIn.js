import React from 'react'
import {  View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import GlobalCss from '../../Styles/GlobalCss';
import UserServices from '../../../Service/UserServices';
import UserSocialServices from '../../../Service/UserSocialServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain'
import { connect } from 'react-redux'
import SQLiteLabelServices from '../../../Service/SQLiteLabelServices'
import {storeUserID, storeUserLabel} from '../../Redux/Actions/CreateNewLabelActions'
import NoteDataControllerServices from '../../../Service/NoteDataControllerServices';
import SQLiteServices from '../../../Service/SQLiteServices'

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
        isLoggedIn : false
    }
}

async componentDidMount(){
    try {
        const isLoggedIn = JSON.parse(await AsyncStorage.getItem('isLoggedIn'))
        if(isLoggedIn) {
            const credential = await Keychain.getGenericPassword();
            const UserCredential = JSON.parse(credential.password);
            await NoteDataControllerServices.retrieveDataFromFirebase(UserCredential.user.uid)

            this.props.storeUserId(UserCredential.user.uid)
            this.storeUserLabels(UserCredential.user.uid)
            this.props.navigation.push('Home', { screen: 'Notes' })
        }
      } 
      catch(e) {
        console.log(e)
      }
}

storeUserLabels = (userId) => {
    SQLiteLabelServices.selectLabelFromSQliteStorage(userId)
        .then(async result => {
            var temp = [];
            if(result.rows.length != 0) {
                for (let i = 0; i < result.rows.length; ++i)
                    temp.push(result.rows.item(i));
                } 
                this.props.storeUserLabel(temp)                 
        })
        .catch(error => console.log(error))
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

signInHandler = async () => {
    const {onPress} = this.props
    if(this.state.email != '' && this.state.password != '')
    {
        await UserServices.SignIn(this.state.email, this.state.password)
                .then( async (UserCredential) => {   
                        this.storeIteminAsyncStorage()
                        console.log("signIn"); 
                        await NoteDataControllerServices.retrieveDataFromFirebase(UserCredential.user.uid) 
                        await Keychain.setGenericPassword('UserCredential', JSON.stringify(UserCredential));
                        
                        await this.props.storeUserId(UserCredential.user.uid)
                        await this.storeUserLabels(UserCredential.user.uid)
                        this.props.navigation.navigate('Home', { screen: 'Notes' })
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
    // onPress();
}

storeIteminAsyncStorage = () => {
    try {
         this.setState({
            isLoggedIn : true
        })
         AsyncStorage.setItem('isLoggedIn', JSON.stringify(this.state.isLoggedIn));
    } catch (e) {
        console.log(e);
    }
}

SignUpHandler = () =>{
    const {onPress} = this.props;
    this.props.navigation.navigate('SignUp')
    // onPress();
}

forgotPasswordHandler = () =>{
    const {onPress} = this.props;
    this.props.navigation.navigate('ForgotPassword')
    // onPress();
}

handleFacebookLoginButton = async () => {
    const {onPress} = this.props;
    UserSocialServices.facebookLogin()
    .then( async UserCredential => {

        UserServices.readUserDataFromRealtimeDatabase(UserCredential.user.uid)
            .then(data =>{
                if(data == null){
                    UserServices.writeUserDataInRealtimeDatabase(
                        UserCredential.user.uid, 
                        UserCredential.additionalUserInfo.profile.first_name, 
                        UserCredential.additionalUserInfo.profile.last_name, 
                        UserCredential.additionalUserInfo.profile.email);
                }
            })
       
        await NoteDataControllerServices.retrieveDataFromFirebase(UserCredential.user.uid)
        this.storeIteminAsyncStorage()
        await Keychain.setGenericPassword('UserCredential', JSON.stringify(UserCredential));
        
        await this.props.storeUserId(UserCredential.user.uid)
        await this.storeUserLabels(UserCredential.user.uid)
        this.props.navigation.navigate('Home', { screen: 'Notes' })
    })
        .catch(error => {
            console.log(error)
        })
    // onPress();
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

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        userLabel : state.createLabelReducer.userLabel
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        storeUserId : (userId) => dispatch(storeUserID(userId)),
        storeUserLabel : (userLabel) => dispatch(storeUserLabel(userLabel))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)
