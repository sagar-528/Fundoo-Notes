import SQLiteServices from './SQLiteServices'
import SQLiteLabelServices from './SQLiteLabelServices'
import UserLabelServices from './UserLabelServices' 
import UserNotesServices from './UserNotesServices'

class NoteDataControllerServices {

    storeNote = (noteId, userId, notes) => {
        return new Promise((resolve) => {
            SQLiteServices.storeNoteinSQliteStorage(userId, noteId, notes)
                .then(() => {
                    UserNotesServices.storeNoteInDatabase(userId, noteId, notes)
                        .then(() => console.log('added note'))
                        .catch(error => console.log(error))
                    resolve('success')
                })
                .catch(error => console.log(error))
        })
    }

    updateNote = (noteId, userId, notes) => {
        return new Promise((resolve) => {
            SQLiteServices.updateNoteinSQliteStorage(userId, noteId, notes)
                .then(() => {
                    UserNotesServices.updateNoteInFirebase(userId, noteId, notes)
                        .then(() => console.log('updated note'))
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
                        .then(() => console.log('removed note'))
                        .catch(error => console.log(error))
                    resolve('success')
                })
                .catch(error => console.log(error))
        })
    }

    deleteNote = (userId, noteKey, notes) => {
        return new Promise((resolve) => {
            SQLiteServices.deleteNoteinSQliteStorage(userId, noteKey, notes)
                .then(() => {
                    UserNotesServices.deleteNoteInFirebase(userId, noteKey, notes)
                        .then(() => console.log('deleted note'))
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
                        .then(() => console.log('restored note'))
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
                const UserNotes = {
                    title : notes[key].notes.title,
                    note : notes[key].notes.note,
                    isDeleted : notes[key].notes.isDeleted,
                    labelId : notes[key].notes.labelId,
                    isArchived : notes[key].notes.isArchived
                }
                SQLiteServices.storeNoteinSQliteStorage(userId, key, UserNotes)
            }
            else {
                const UserNotes = {
                    title : notes[key].notes.title,
                    note : notes[key].notes.note,
                    isDeleted : notes[key].notes.isDeleted,
                    labelId : notes[key].notes.labelId,
                    isArchived : notes[key].notes.isArchived
                }
                SQLiteServices.updateNoteinSQliteStorage(userId, key, UserNotes)
            }
        })
        noteKeySqlite.forEach(noteKey => {
            if(!noteKeyFirebase.includes(noteKey)) {
                SQLiteServices.removeNoteinSQliteStorage(userId, noteKey)
            }
        })
    }

    storeLabel = (userId, labelId, label) => {
        return new Promise((resolve) => {
            SQLiteLabelServices.storeLabelinSQliteStorage(userId, labelId, label)
                .then(() => {
                    UserLabelServices.addLabelinDatabase(userId, labelId, label)
                        .then(() => console.log('added label'))
                        .catch(error => console.log(error))
                    resolve('success')
                })
                .catch(error => console.log(error))
        })
    }

    updateLabel = (userId, labelId, label) => {
        return new Promise((resolve) => {
            SQLiteLabelServices.updateLabelinSQliteStorage(userId, labelId, label)
                .then(() => {
                    UserLabelServices.updateLabelInFirebase(userId, labelId, label)
                        .then(() => console.log('updated label'))
                        .catch(error => console.log(error))
                    resolve('success')
                })
                .catch(error => console.log(error))
        })
    }

    removeLabel = (userId, labelId) => {
        return new Promise((resolve) => {
            SQLiteLabelServices.removeLabelinSQliteStorage(userId, labelId)
                .then(() => {
                    UserLabelServices.deleteLabelInFirebase(userId, labelId)
                        .then(() => console.log('removed label'))
                        .catch(error => console.log(error))
                    resolve('success')
                })
                .catch(error => console.log(error))
        })
    }

    getLabelFromFirebaseToSqlite = async (userId) => {
        let labelKeyFirebase, labelKeySqlite, labels, label
        await UserLabelServices.getLabelFromDatabase(userId)
            .then(data => {
                labels = data ? data : {}
                labelKeyFirebase = Object.keys(labels);
            })
        await SQLiteLabelServices.selectLabelFromSQliteStorage(userId)
            .then(result => {
                labelKeySqlite = [];
                if(result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i)
                        labelKeySqlite.push(result.rows.item(i).label_id);
                }  
            })
        labelKeyFirebase.map(key => {
            if(!labelKeySqlite.includes(key)) {
                label = labels[key].label
                SQLiteLabelServices.storeLabelinSQliteStorage(userId, key, label)
            }
            else {
                label = labels[key].label
                SQLiteLabelServices.updateLabelinSQliteStorage(userId, key, label)
            }
        })
        labelKeySqlite.forEach(labelKey => {
            if(!labelKeyFirebase.includes(labelKey)) {
                SQLiteLabelServices.removeLabelinSQliteStorage(userId, labelKey)
            }
        });
    }

    retrieveDataFromFirebase = (userId) => {
        SQLiteServices.createTableInSQliteStorage(userId)
        this.getNoteFromFirebaseToSqlite(userId)
        SQLiteLabelServices.createTableInSQliteStorage(userId)
        this.getLabelFromFirebaseToSqlite(userId)
    }

    updateNoteLabel = (userId, noteKey, labelId) => {
        return new Promise((resolve) => {
            SQLiteServices.updateNoteLabelinSQliteStorage(userId, noteKey, labelId)
                .then(() => {
                    UserNotesServices.updateNoteLabelInFirebase(userId, noteKey, labelId)
                        .then(() => console.log('Label Updated'))
                        .catch(error => console.log(error))
                    resolve('success')
                })
                .catch(error => console.log(error))
        })
    }

    updateNoteArchive = (noteId, userId, usernotes) => {
        const notes = {
            title : usernotes.title,
            note : usernotes.note,
            isDeleted : usernotes.isDeleted,
            labelId : usernotes.labelId,
            isArchived : 0
        }
        return new Promise((resolve) => {
            SQLiteServices.updateNoteinSQliteStorage(userId, noteId, notes)
                .then(() => {
                    UserNotesServices.updateNoteInFirebase(userId, noteId, notes)
                        .then(() => console.log('updated note archive'))
                        .catch(error => console.log(error))
                    resolve('success')
                })
                .catch(error => console.log(error))
        })
    }

}

export default new  NoteDataControllerServices();