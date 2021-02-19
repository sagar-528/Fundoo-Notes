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

class SQLiteLabelServices {
    
    createTableInSQliteStorage = (userId) => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS '${userId}Label' (label_id TEXT PRIMARY KEY, label TEXT)`,
                [],
                (tx, results) => console.log('create table label in sqlite'),
                error => console.log(error)
            )
        })
    }

    selectLabelFromSQliteStorage = (userId) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM '${userId}Label'`,
                    [],
                    (tx, results) => resolve(results),
                    error => reject(error)
                );
            });
        })
    }

    storeLabelinSQliteStorage = (userId, labelId, label) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO '${userId}Label' (label_id, label) VALUES (?,?)`,
                    [labelId, label],
                    (tx, results) => resolve('store label in sqlite'),
                    error => reject(error)
                );
            });
        })
    }

    updateLabelinSQliteStorage = (userId, labelId, label) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE '${userId}Label' set label = ? where label_id = ?`,
                    [label, labelId],
                    (tx, results) => resolve('update label in sqlite'),
                    error => reject(error)
                );
            });
        })
    }

    removeLabelinSQliteStorage = (userId, labelId) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM '${userId}Label' where label_id = ?`,
                    [labelId],
                    (tx, results) => resolve('remove label from Sqlite'),
                    error => reject(error)
                );
            });
        })
    }

    deleteTableinSQLiteStorage = (userId) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DROP TABLE '${userId}Label'`,
                    [],
                    (tx, results) => console.log('table deleted from sqlite'),
                    error => console.log(error)
                );
            });
    }
}

export default new SQLiteLabelServices();