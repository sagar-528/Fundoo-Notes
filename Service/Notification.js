import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'react-native-firebase';

class Notification {
    
    checkPermission = async () => {
        console.log('start');
    const enabled = await firebase.messaging().hasPermission();
        console.log(enabled)
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    getToken = async() => {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }

    requestPermission  = async() => {
        console.log('token')
        try {
            await firebase.messaging().requestPermission();
            this.getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    }  
}

export default new Notification();