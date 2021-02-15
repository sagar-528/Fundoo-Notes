import SQLiteServices from './SQLiteServices'
import UserNotesServices from './UserNotesServices'

class NoteDataControllerServices {

    storeNote = (noteId, userId, title, note) => {
        return new Promise((resolve) => {
            SQLiteServices.storeNoteinSQliteStorage(userId, noteId, title, note)
                .then(() => {
                    UserNotesServices.storeNoteInDatabase(userId, title, note, noteId)
                        .then(() => console.log('added'))
                        .catch(error => console.log(error))
                    resolve('success')
                })
                .catch(error => console.log(error))
        })
    }

    updateNote = (userId, noteKey, title, note) => {
        return new Promise((resolve) => {
            SQLiteServices.updateNoteinSQliteStorage(userId, noteKey, title, note)
                .then(() => {
                    UserNotesServices.updateNoteInFirebase(userId, noteKey, title, note)
                        .then(() => console.log('updated'))
                        .catch(error => console.log(error))
                    resolve('success')
                })
                .catch(error => console.log(error))
        })
    }

    removeNote = (userId, noteKey) => {
        return new Promise((resolve) => {
            SQLiteServices.removeNoteinSQliteStorage(userId, noteKey)
                .then(() => {
                    UserNotesServices.removeNoteInFirebase(userId, noteKey)
                        .then(() => console.log('removed'))
                        .catch(error => console.log(error))
                    resolve('success')
                })
                .catch(error => console.log(error))
        })
    }

    deleteNote = (userId, noteKey) => {
        return new Promise((resolve) => {
            SQLiteServices.deleteNoteinSQliteStorage(userId, noteKey)
                .then(() => {
                    UserNotesServices.deleteNoteInFirebase(userId, noteKey)
                        .then(() => console.log('deleted'))
                        .catch(error => console.log(error))
                    resolve('success')
                })
                .catch(error => console.log(error))
        })
    }

    restoreNote = (userId, noteKey) => {
        return new Promise((resolve) => {
            SQLiteServices.restoreNoteinSQliteStorage(userId, noteKey)
                .then(() => {
                    UserNotesServices.restoreNoteInFirebase(userId, noteKey)
                        .then(() => console.log('restored'))
                        .catch(error => console.log(error))
                    resolve('success')
                })
                .catch(error => console.log(error))
        })
    }

    getNoteFromFirebaseToSqlite = async (userId) => {
        let noteKeyFirebase, noteKeySqlite, notes, title, note, isDeleted
        await UserNotesServices.getNoteFromDatabase(userId)
            .then(data => {
                notes = data ? data : {}
                noteKeyFirebase = Object.keys(notes);
            })
        await SQLiteServices.selectNoteFromSQliteStorage(userId)
            .then(result => {
                noteKeySqlite = [];
                if(result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i)
                        noteKeySqlite.push(result.rows.item(i).note_id);
                }  
            })
        noteKeyFirebase.map(key => {
            if(!noteKeySqlite.includes(key)) {
                title = notes[key].notes.title
                note = notes[key].notes.note
                isDeleted = notes[key].notes.isDeleted
                SQLiteServices.storeNoteinSQliteStorage(userId, key, title, note)
                    .then(() => console.log('success'))
                    .catch(error => console.log(error))
            }
        })
    }

}

export default new  NoteDataControllerServices();