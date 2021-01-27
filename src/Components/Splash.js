import React, {Component} from 'react'
import { View, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import GobalCss from '../Styles/GlobalCss';

class SplashScreen extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.push("SignIn")
    }, 2000)
}

render(){
  return(
    <View style = {GobalCss.container}>
      <View style = {GobalCss.homeHeader}>
        <Animatable.Image
        animation = "bounceIn"
        duraton = "1500"
        source = {require('../Assets/avatar.png')}/>
      </View>
      <Animatable.View 
        style = {GobalCss.homeFooter}
        animation = "fadeInUpBig"
      >
        <Text style = {GobalCss.title}>Welcome to Fundoo Notes App</Text> 
      </Animatable.View>
    </View>
  )};
};

export default  SplashScreen

