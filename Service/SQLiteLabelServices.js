import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'user_notes.db', createFromLocation: 1});

class SQLiteLabelServices {
    
    createTableInSQliteStorage = (userId) => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS '${userId}Label' (label_id TEXT PRIMARY KEY, label TEXT)`,
                [],
                (tx, results) => console.log('success'),
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
                    (tx, results) => resolve('success'),
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
                    (tx, results) => resolve('success'),
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
                    (tx, results) => resolve('success'),
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
                    (tx, results) => console.log('table deleted'),
                    error => console.log(error)
                );
            });
    }
}

export default new SQLiteLabelServices();