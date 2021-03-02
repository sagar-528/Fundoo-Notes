import React, { Component } from 'react'
import NavigationStack  from './src/Navigation/NavigationStack'
import {Provider} from 'react-redux'
import store from './src/Redux/store'
import Notification from './Service/Notification'
import PushNotification from "react-native-push-notification";


export class App extends Component {

  componentDidMount = () => {
    Notification.checkPermission()
    
    PushNotification.configure({
      
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        alert('Test')
      },
      
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
      },
      
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  render() {
    return(
      <Provider store = {store}>
        <NavigationStack  />
      </Provider>
    );
  }
}

export default App
