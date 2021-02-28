import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase'

class Notification {
    
    checkPermission = async () => {
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
        console.log(fcmToken)
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            console.log(fcmToken)
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }

    requestPermission  = async() => {
        try {
            await firebase.messaging().requestPermission();
            this.getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    }  
}

export default new Notification();