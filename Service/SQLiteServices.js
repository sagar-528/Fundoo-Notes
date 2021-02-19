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

    storeNoteinSQliteStorage = (userId, noteId, notes) => {
        
        return new Promise((resolve, reject) => {
            
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO ${userId} (note_id, title, note, is_deleted, label_id, is_archived) VALUES (?,?,?,?,?,?)`,
                    [noteId, notes.title, notes.note, notes.isDeleted, notes.labelId, notes.isArchived],
                    (tx, results) => resolve('Note Store in Sqlite'),
                    error =>  reject(error)
                );
            });
        })
    }

    updateNoteinSQliteStorage = (userId, noteId, notes) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${userId} set title = ?, note = ?, is_deleted = ?, label_id = ?, is_archived = ? where note_id = ?`,
                    [notes.title, notes.note, notes.isDeleted, notes.labelId, notes.isArchived, noteId],
                    (tx, results) => resolve('Note Update in Sqlite'),
                    error => reject(error)
                );
            });
        })
    }

    deleteNoteinSQliteStorage = (userId, noteId, notes) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${userId} set title = ?, note = ?, is_deleted = ? where note_id = ?`,
                    [notes.title, notes.note, 1, noteId],
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
                `CREATE TABLE IF NOT EXISTS ${userId} (note_id TEXT PRIMARY KEY, title TEXT, note TEXT, is_deleted INTEGER, label_id TEXT, is_archived INTEGER)`,
                [],
                (tx, results) => console.log('sucess'),
                error => console.log(error)
            )
        })
    }

   
    deleteTableinSQLiteStorage = (userId) => {
        db.transaction(tx => {
            tx.executeSql(
                `DROP TABLE ${userId}`,
                [],
                (tx, results) => console.log('table deleted'),
                error => console.log(error)
            );
        });
    }


    updateNoteLabelinSQliteStorage = (userId, noteId, notes) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${userId} set title = ?, note = ?, label_id = ? where note_id = ?`,
                    [notes.title, notes.note, notes.labelId, noteId],
                    (tx, results) => resolve('success'),
                    error => reject(error)
                );
            });
        })
    }

    selectNoteByLabelIdFromSQliteStorage = (userId, labelId, isDeleted) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM ${userId} where label_id = ? AND is_deleted = ?`,
                    [labelId, isDeleted],
                    (tx, results) => {
                        resolve(results)
                    },
                    error => reject(error)
                );
            });
        })
    }

    selectNoteByDeletedFromSQliteStorage = (userId, isDeleted) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM ${userId} where is_deleted = ?`,
                    [isDeleted],
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