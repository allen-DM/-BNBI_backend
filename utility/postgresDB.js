const Pg =require("pg");
const pool = new Pg.Pool({
    user: "you_db_user",
    host: "you_db_host",
    database: "you_db",
    password: "",
    port: "you_db_port",
});

module.exports = {
    query:(sql, values)=> pool.query(sql, values)  
};