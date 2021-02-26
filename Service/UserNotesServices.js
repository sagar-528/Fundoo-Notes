import Firebase from '../Environment/Firebase'

class UserNotesServices {

    storeNoteInDatabase = (userid, noteKey, notes) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid + '/' + noteKey).set({
                notes : notes
            })
            .then(() => resolve('note store in firebase')) 
            .catch((error) => reject(error))  
        }) 
    }

    getNoteFromDatabase = (userid) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid).once('value')
                .then(snapshot => resolve(snapshot.val()))
                .catch(error => reject(error))
        })
    }

    updateNoteInFirebase = (userid, noteKey, notes) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid  + '/' + noteKey).set({
                notes : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    deleteNoteInFirebase = (userid, notekey, notes) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey).set({
                notes : notes
            })
            .then(() => resolve('deleted note from firebase'))
            .catch(error => reject(error))
        })
    }

    restoreNoteInFirebase = (userid, notekey) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey + '/notes').update({
                isDeleted : 0
            })
            .then(() => resolve('restore note from firebase'))
            .catch(error => reject(error))
        })
    }

    removeNoteInFirebase = (userid, notekey) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey).remove()
            .then(() => resolve('remove note from firebase'))
            .catch(error => reject(error))
        })
    }

    updateNoteLabelInFirebase = (userid, notekey, labelId) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey + '/' + 'notes').update({
                labelId : labelId
            })
            .then(() => resolve('update label in firbase'))
            .catch(error => reject(error))
        })
    }
    
}

export default new UserNotesServices()