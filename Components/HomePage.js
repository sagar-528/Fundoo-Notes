import React from 'react'
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const App = () => {
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
        animation="bounceIn"
        duraton="1500"
        source={require('./Assets/avatar.png')}/>
      </View>
      <Animatable.View 
      style={styles.footer}
      animation="fadeInUpBig"
      >
      <Text style={styles.title}>Wellcome to Registartion App.</Text>
      <Text style={styles.text}>Sign in with account</Text>
      <View style={styles.button}>
      <TouchableOpacity>
          <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}
          >
              <Text style={styles.textSign}>Get Started</Text>
          </LinearGradient>
      </TouchableOpacity>
      </View>
      </Animatable.View>
    </View>
  );
};


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#e0e0e0'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#616161',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  title: {
      color: '#fff',
      fontSize: 25,
      fontWeight: 'bold'
  },
  text: {
      color: '#fff',
      fontSize: 18,
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});

export default HomePage

