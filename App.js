import React, { Component } from 'react'
import NavigationStack  from './src/Navigation/NavigationStack'
import {Provider} from 'react-redux'
import store from './src/Redux/store'
import Notification from './Service/Notification'
import PushNotification from "react-native-push-notification";


export class App extends Component {

  componentDidMount = async() => {
    Notification.checkPermission()
    
    PushNotification.configure({
      
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        alert(notification.data.title, notification.data.body)
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
     // PushNotification.localNotification({
    //   title: "My Notification Title", // (optional)
    //   message: "My Notification Message", // (required)
    // });
   Notification.reminderNotification() 
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
