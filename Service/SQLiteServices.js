import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'User_Notes.db', createFromLocation: 1});


class SQLiteServices {
    storeNoteinSQliteStorage = (userId, title, note) => {
        
        return new Promise((resolve, reject) => {
            
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO notes_table (user_id, title, note, is_deleted) VALUES (?,?,?,?)',
                    [userId, title, note, 0],
                    (tx, results) => {
                        resolve(results)
                    },
                    error =>  reject(error)
                );
            });
        })
    }

    updateNoteinSQliteStorage = (noteId, title, note) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE notes_table set title = ?, note = ? where note_id = ?',
                [title, note, noteId],
                (tx, results) => {
                    console.log('Results Updated', results.rowsAffected);
                },
                error => console.log(error)
            );
        });
    }

    deleteNoteinSQliteStorage = (noteId) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE notes_table set is_deleted = ? where note_id = ?',
                [1, noteId],
                (tx, results) => {
                    console.log('Results Deleted', results.rowsAffected);
                },
                error => console.log(error)
            );
        });
    }

    restoreNoteinSQliteStorage = (noteId) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE notes_table set is_deleted = ? where note_id = ?',
                [0, noteId],
                (tx, results) => {
                    console.log('Results Restored', results.rowsAffected);
                },
                error => console.log(error)
            );
        });
    }

    removeNoteinSQliteStorage = (noteId) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM notes_table where note_id = ?',
                [noteId],
                (tx, results) => {
                    console.log('Results Removed', results.rowsAffected);
                },
                error => console.log(error)
            );
        });
    }

    selectNoteFromSQliteStorage = (userId) => {
        return new Promise((resolve, reject) => {
            
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM notes_table where user_id = ?",
                    [userId],
                    (tx, results) => {
                        resolve(results)
                    },
                    error => reject(error)
                );
            });
        })
    }
}

export default new SQLiteServices();