import React, {Component} from 'react'
import { View, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GobalCss from '../Styles/GlobalCss';

class SplashScreen extends Component {

  constructor(props) {
    super(props)
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
        <FontAwesome5 
        name = "foursquare"
        color = "#fff"
        size = {200}
        animation = "bounceIn"
        duraton = "1500"/>
      </View>
      <Animatable.View 
        style = {GobalCss.homeFooter}
        animation = "fadeInUpBig"
      >
        <Text style = {GobalCss.title}>Fundoo Notes App</Text> 
      </Animatable.View>
    </View>
  )};
};

export default  SplashScreen

