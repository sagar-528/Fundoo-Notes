import { findNodeHandle } from 'react-native'
import Firebase from '../Environment/Firebase'

class UserServices {
     
  SignUp(email, password){
        return new Promise((resolve, reject) => {
            console.log('handleSignUp')
            Firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => resolve(user))
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    reject('Email Already Exist')
                }
                console.log(error);
            })
        })
    }

}

export default new UserServices();
