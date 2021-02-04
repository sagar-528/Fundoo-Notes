import firebase from 'firebase'
import Firebase from '../Environment/Firebase'
import {LoginManager, AccessToken} from 'react-native-fbsdk'

class UserSocialServices {

    facebookLogin = () => {
        return new Promise(async (resolve, reject) => {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                reject('Login was cancelled')
            }          
            const data = await AccessToken.getCurrentAccessToken();         
            if (!data) {
                reject('Something went wrong obtaining access token');
            }

            const facebookCredential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            firebase.auth().signInWithCredential(facebookCredential)
            .then(UserCredential => {
                resolve(UserCredential)
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }

}

export default new UserSocialServices(); 