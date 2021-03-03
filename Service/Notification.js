import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'react-native-firebase';
import SQLiteServices from '../Service/SQLiteServices'
import * as Keychain from 'react-native-keychain';

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

    sendPushNotification = async (title, note) => {
        const token = await AsyncStorage.getItem('fcmToken')
        const FIREBASE_API_KEY = "cVxqwbI2CQw:APA91bF-qB4a_2jHLYhwrHMQh-_PbzpGereICtVHcvopjterJKA7RvB829XyUdGZGJBhz6nxhoGDupf9rz6TwO8Rgb4WTzwK9bkoPYgksVJ2EKmeHYgAvv1_9aBb9Ms0KGmi9wD5At99"
        const message = {
          registration_ids: [
            token
          ],
          notification: {
            title: title,
            body: note,
            vibrate: 1,
            sound: 1,
            show_in_foreground: true,
            priority: "high",
            content_available: true,
          },
          data: {
            title: title,
            body: note,
            score: 50,
            wicket: 1,
          },
        }

        let response = await fetch("https://fcm.googleapis.com/fcm/send", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=' + FIREBASE_API_KEY,
          },
          body: JSON.stringify(message),
        })
        response = await response.json()
        console.log(response)
    }

    reminderNotification = async() => {
        console.log('true')
        const isLoggedIn = JSON.parse(await AsyncStorage.getItem('isLoggedIn'))
        let date = new Date()
        let reminder
        if(isLoggedIn) {
            const credential = await Keychain.getGenericPassword();
            const UserCredential = JSON.parse(credential.password);
            await SQLiteServices.selectNoteFromSQliteStorage(UserCredential.user.uid)
                .then(async result => {
                    if(result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i) {
                        if(JSON.parse(result.rows.item(i).reminder) != '') {
                            reminder = new Date(JSON.parse(result.rows.item(i).reminder))
                            if(date.getDate() == reminder.getDate() &&
                                date.getMonth() == reminder.getMonth() &&
                                date.getFullYear() == reminder.getFullYear() &&
                                date.getHours() == reminder.getHours() &&
                                date.getMinutes() == reminder.getMinutes()) {
                                    this.sendPushNotification(result.rows.item(i).title, result.rows.item(i).note);
                            }
                        }
                    }
                }                
            })
            .catch(error => console.log('Error', error))
        }
    }

    localNotification = (title, note) => {
        PushNotification.localNotification({
            title: title,
            message: note
        });
    }

}

export default new Notification();