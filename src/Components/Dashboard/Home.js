import React, { Component } from 'react'
import  { View } from 'react-native'
import HeaderBar from './HeaderBar';
import BottomBar from './BottomBar';
import HomeCss from '../../Styles/HomeCss';

class Home extends Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
    <View style = {HomeCss.container}>
      <HeaderBar navigation = {this.props.navigation}/>
      <BottomBar />
    </View>
        )}
    }

         
export default Home
