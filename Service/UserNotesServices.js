import Firebase from '../Environment/Firebase'

class UserNotesServices {

    storeNoteinDatabase = (userid, title, note) => {
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note
            }
            Firebase.database().ref('UserNotes/' + userid).push({
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

    updateNoteInFirebase = (userid, notekey, title, note) => {
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note
            }
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey).set({
                notes : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

}

export default new UserNotesServices()