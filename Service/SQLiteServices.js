import SQLite from 'react-native-sqlite-storage';


function errorCB(err) {
    console.log("SQL Error: " + err);
  }
  
  function successCB() {
    console.log("SQL executed fine");
  }
  
  function openCB() {
    console.log("Database OPENED");
  }

const db = SQLite.openDatabase("user_notes.db", "1.0", "Test Database", 200000, openCB, errorCB);


class SQLiteServices {

    storeNoteinSQliteStorage = (userId, noteId, title, note, isDeleted) => {
        
        return new Promise((resolve, reject) => {
            
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO ${userId} (note_id, title, note, is_deleted) VALUES (?,?,?,?)`,
                    [noteId, title, note, isDeleted],
                    (tx, results) => resolve('Note Store in Sqlite'),
                    error =>  reject(error)
                );
            });
        })
    }

    updateNoteinSQliteStorage = (userId, noteId, title, note) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${userId} set title = ?, note = ? where note_id = ?`,
                    [title, note, noteId],
                    (tx, results) => resolve('Note Update in Sqlite'),
                    error => reject(error)
                );
            });
        })
    }

    deleteNoteinSQliteStorage = (userId, noteId) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${userId} set is_deleted = ? where note_id = ?`,
                    [1, noteId],
                    (tx, results) => resolve('Note deleted in sqlite'),
                    error => reject(error)
                );
            });
        })
    }

    restoreNoteinSQliteStorage = (userId, noteId) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${userId} set is_deleted = ? where note_id = ?`,
                    [0, noteId],
                    (tx, results) => resolve('Note restore From Sqlite'),
                    error => reject(error)
                );
            });
        })
    }

    removeNoteinSQliteStorage = (userId, noteId) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM ${userId} where note_id = ?`,
                    [noteId],
                    (tx, results) => resolve('note remove from Sqlite'),
                    error => reject(error)
                );
            });
        })
    }

    selectNoteFromSQliteStorage = (userId) => {
        return new Promise((resolve, reject) => {
            
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM ${userId}`,
                    [],
                    (tx, results) => {
                        resolve(results)
                    },
                    error => reject(error)
                );
            });
        })
    }

    createTableInSQliteStorage = (userId) => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS ${userId} (note_id TEXT PRIMARY KEY, title TEXT, note TEXT, is_deleted INTEGER)`,
                [],
                (tx, results) => console.log('table Create in Sqlite if no table existed'),
                error => console.log(error)
            )
        })
    }

    updateNoteinSQliteStorageFromFirebase = (userId, noteId, title, note, isDeleted) => {
        console.log(isDeleted)
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${userId} set title = ?, note = ?, is_deleted = ? where note_id = ?`,
                    [title, note, isDeleted, noteId],
                    (tx, results) => resolve('success'),
                    error => reject(error)
                );
            });
        })
    }

}

export default new SQLiteServices();