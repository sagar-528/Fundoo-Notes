import React, { Component } from 'react'
import {AppState} from 'react-native';
import NavigationStack  from './src/Navigation/NavigationStack'
import {Provider} from 'react-redux'
import store from './src/Redux/store'
import Notification from './Service/Notification'
import PushNotification from "react-native-push-notification";
import BackgroundTimer from 'react-native-background-timer';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState
    }
  }

  componentDidMount = async() => {
    Notification.checkPermission()
    AppState.addEventListener("change", this.handleAppStateChange);
    PushNotification.configure({
      
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        alert(notification.title + '\n' + notification.message)
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
    BackgroundTimer.setInterval(() => {
      Notification.reminderNotification()
    }, 60000);
  }

  handleAppStateChange = async nextAppState => {
    await this.setState({ appState: nextAppState });
  };

  componentWillUnmount() {
    this.setState = (state,callback)=>{
        return;
    };
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
