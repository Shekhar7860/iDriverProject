import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "iDriver";
const database_version = "1.0";
const database_displayname = "iDriver Database";
const database_size = 200000;

export default class Database {

  initDB() {
    let db;
    return new Promise((resolve) => {
      console.log("Plugin integrity check ...");
      SQLite.echoTest()
        .then(() => {
          console.log("Integrity check passed ...");
          console.log("Opening database ...");
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
          )
            .then(DB => {
              db = DB;
              console.log("Database OPEN");
              db.executeSql('SELECT 1 FROM TBL_USER LIMIT 1').then(() => {
                  console.log("Database is ready ... executing query ...");
              }).catch((error) =>{
                  console.log("Received error: ", error);
                  console.log("Database not yet ready ... populating data");
                  db.transaction((tx) => {
                      tx.executeSql('CREATE TABLE IF NOT EXISTS TBL_USER ( access_token ,driver_code ,  picture , primary_email , password , name , user_id , staff, firebase_user_id,   vehicle_code , vehicle_type , login_status, firebase_connection_status)');
                  }).then(() => {
                      console.log("Table created successfully");
                  }).catch(error => {
                      console.log(error);
                  });
              });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log("echoTest failed - plugin not functional");
        });
      });
  };


  closeDatabase(db) {
    if (db) {
      console.log("Closing DB");
      db.close()
        .then(status => {
          console.log("Database CLOSED");
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log("Database was not OPENED");
    }
  };

  listProduct() {
    return new Promise((resolve) => {
      const userObj = [];
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM TBL_USER', []).then(([tx,results]) => {
            console.log("Query completed");
            var len = results.rows.length;
            console.log(results.rows.item(0), '000vcvcvbbv00')
            resolve( results.rows.item(0));
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });  
  }

  productById(id) {
    console.log(id);
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Product WHERE prodId = ?', [id]).then(([tx,results]) => {
            console.log(results);
            if(results.rows.length > 0) {
              let row = results.rows.item(0);
              resolve(row);
            }
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });  
  }

  addProduct(obj) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('INSERT INTO TBL_USER VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [ obj.accessToken,  obj.driver_code, obj.picture, obj.primary_email,  obj.password, obj.name , obj.user_id, obj.staff , obj.firebase_user_id , obj.vehicle_code , obj.vehicle_type , obj.login_status  , obj.firebase_connection_status ]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });  
  }

  updateProduct(id, prod) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('UPDATE Product SET prodName = ?, prodDesc = ?, prodImage = ?, prodPrice = ? WHERE prodId = ?', [prod.prodName, prod.prodDesc, prod.prodImage, prod.prodPrice, id]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });  
  }

  deleteProduct(id) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('DELETE FROM Product WHERE prodId = ?', [id]).then(([tx, results]) => {
            console.log(results);
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });  
  }
}
