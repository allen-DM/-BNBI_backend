const mysql = require("mysql");
const dbInfo = require("../config/default.json").database;

const pool = mysql.createPool({
    host     :  dbInfo.host,
    user     :  dbInfo.user,
    password :  dbInfo.password,
    database :  dbInfo.database,
    port     :  dbInfo.port
});

module.exports = {
    /**
     * execute query by pool's connection 
     * @param {*} sql       (sql query string)
     * @param {*} values    (sql parameters)
     * @returns sql result
     */
    query : (sql, values)=>{
        return new Promise(( resolve, reject ) => {
            pool.getConnection(function(err, connection) {
                if (err) {
                    reject( err );
                } else {
                    connection.query(sql, values, ( err, rows) => {
        
                        if ( err ) {
                            reject( err );
                        } else {
                            resolve( rows );
                        }
                        connection.release();
                    });
                }
            });
        });
    },

    /**
     * get one connection which is in the connection pool
     * @returns pool's connection
     */
    getConnect:()=>{
        return new Promise(( resolve, reject ) => {
            pool.getConnection(function(err, connection) {
                if (err) {
                    reject( err );
                } else {
                    resolve( connection );
                }
            });
        });
    },

    /**
     * execute query with input connection
     * @param {*} connection    (pool's connection)
     * @param {*} sql           (sql query string)
     * @param {*} values        (sql parameters)
     * @returns sql result
     */
    queryByConnection : (connection, sql, values)=>{
        return new Promise(( resolve, reject ) => {
            connection.query(sql, values, ( err, rows) => {
                if ( err ) {
                    reject( err );
                } else {
                    resolve( rows );
                }
            });
        });
    },

    /**
     * execute query with transcation
     * it will handle error situation and to do rollback action
     * @param {*} connection    (pool's connection)
     * @param {*} sql           (sql query string)
     * @param {*} values        (sql parameters)
     * @returns sql result
     */
    transcationQuery : (connection, sql, values)=>{
        return new Promise(( resolve, reject ) => {
            connection.query(sql, values, ( err, rows) => {
                if ( err ) {
                    connection.rollback();
                    reject( err );
                } else {
                    resolve( rows );
                }
            });
        });
    },


    /**
     *  to do transcation's commit action for input connection
     *  it will handle error situation and to do rollback action
     * @param {*} connection    (pool's connection )
     */
    transcationCommit :(connection)=>{
        return new Promise((resolve, reject) => {
            try {
                connection.commit(function(err) {
                    if (err) {
                        return connection.rollback(function() {
                            throw err;
                        });
                    }
                });
                resolve();
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    },

    /**
     *  to do rollback and release connection
     * @param {*} connection    (pool's connection )
     */
    transcationRollback :(connection)=>{
        return new Promise((resolve, reject) => {
            try {
                connection.rollback();
                resolve();
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }
};