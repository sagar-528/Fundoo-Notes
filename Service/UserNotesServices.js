import Firebase from '../Environment/Firebase'

class UserNotesServices {

    storeNoteInDatabase = (userid, notes, noteKey) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid + '/' + noteKey).set({
                notes : notes
            })
            .then(() => resolve('success')) 
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

    updateNoteInFirebase = (userid, notekey, notes) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey).set({
                notes : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    deleteNoteInFirebase = (userid, notekey, notes) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey + '/' + 'notes').update({
                title : notes.title,
                note : notes.note,
                isDeleted : 1
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    restoreNoteInFirebase = (userid, notekey) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey + '/notes').update({
                isDeleted : 0
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    removeNoteInFirebase = (userid, notekey) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey).remove()
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    updateNoteLabelInFirebase = (userid, notekey, notes) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey + '/' + 'notes').update({
                title : notes.title,
                note : notes.note,
                labelId : notes.labelId
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }
    
}

export default new UserNotesServices()