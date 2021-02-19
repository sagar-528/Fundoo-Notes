import Firebase from '../Environment/Firebase'

class UserLabelServices {

    addLabelinDatabase = (userId,  labelId, label) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserLabels/' + userId + '/' + labelId).set({
                label : label,
            })
            .then(() => resolve('success')) 
            .catch((error) => reject(error))  
        }) 
    }

    getLabelFromDatabase = (userId) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserLabels/' + userId).once('value')
                .then(snapshot => resolve(snapshot.val()))
                .catch(error => reject(error))
        })
    }

    updateLabelInFirebase = (userid, labelKey, label) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserLabels/' + userid  + '/' + labelKey).set({
                label : label
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    deleteLabelInFirebase = (userid, labelKey) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserLabels/' + userid  + '/' + labelKey).remove()
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }
    
}

export default new UserLabelServices();