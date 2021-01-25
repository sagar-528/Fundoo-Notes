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

    login(email, password) {
        return new Promise((resolve, reject) => {
            Firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => resolve(user))
                .catch(error => {
                    if (error.code === 'auth/user-not-found') {
                        reject('Email not Found')
                    }
                    if (error.code === 'auth/wrong-password') {
                        reject('Incorrect Password')
                    }
                    console.log(error)
                })
        })
    }

    forgotPassword(email) {
        return new Promise((resolve, reject) => {
            Firebase.auth().sendPasswordResetEmail(email)
                .then(user => resolve(user))
                .catch(error => {
                    if (error.code === 'auth/user-not-found') {
                        reject('Email not Found')
                    }
                    console.log(error);
                })
        })
    }

}

export default new UserServices();
