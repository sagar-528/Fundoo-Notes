import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

const SignUp = () => {
  return(
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.text_header}>Sign Up</Text>
      </View>

      <Animatable.View 
      animation="fadeInUpBig"
      style={styles.footer}
  >
      <Text style={styles.text_footer}>Username</Text>
      
      <View style={styles.action}>
          <FontAwesome5 
              name="user"
              size={20}
              color="#fff"
          />
          <TextInput 
              placeholder="Your Username"
              placeholderTextColor="#fff"
              style={styles.textInput}
          />
      </View>
      
      <Text style={[styles.text_footer, {
          marginTop: 35
      }]}>Password</Text>
      
      <View style={styles.action}>
          <Feather 
              name="unlock"
              size={20}
              color="#fff"
          />
          <TextInput 
              placeholder="Your Password"
              placeholderTextColor="#fff"
              style={styles.textInput}
           />
      </View>
      
      <Text style={[styles.text_footer, {
        marginTop: 35
    }]}> Confirm Password </Text>
    
    <View style={styles.action}>
        <Feather 
            name="lock"
            size={20}
            color="#fff"
        />
        <TextInput 
            placeholder="confirm Password"
            placeholderTextColor="#fff"
            style={styles.textInput}
         />
    </View>
    
          <View style={styles.button}>
          <TouchableOpacity
              style={[styles.signIn, {
                  borderColor: '#009387',
                  borderWidth: 1,
                  marginTop: 15
              }]}
          >
              <Text style={[styles.textSign, {
                  color: '#fff'
              }]}>Sign Up</Text>
          </TouchableOpacity>
          
          <View style={{flexDirection:'row',padding: 5}}>
            <Text style={{color: '#fff'}}> Already have an account? </Text>
            <TouchableOpacity>
              <Text style={{color: 'black', fontSize: 16}}> Sign In</Text>
            </TouchableOpacity>
          </View>
      </View>
  </Animatable.View>

    </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp

const styles = StyleSheet.create({

  container: {
    flex: 1, 
    backgroundColor: '#e0e0e0'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#616161',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
 },
 text_header: {
  color: '#616161',
  fontWeight: 'bold',
  fontSize: 25
},
text_header: {
  color: '#616161',
  fontWeight: 'bold',
  fontSize: 30
},
textInput: {
  flex: 1,
  marginTop: Platform.OS === 'ios' ? 0 : -12,
  paddingLeft: 10,
  color: '#05375a',
},
text_footer: {
  color: '#009387',
  fontSize: 25
},
action: {
  flexDirection: 'row',
  marginTop: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#f2f2f2',
  paddingBottom: 5
},
button: {
  alignItems: 'center',
  marginTop: 25
},
signIn: {
  width: '100%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10
},
textSign: {
  fontSize: 18,
  fontWeight: 'bold'
}
})