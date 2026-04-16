const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ithertzwhenIP#1984',     //Add password here
    database: 'nursingHomeDB'
});

connection.connect(function(err) {
    if (err) {
        console.error('DATABASE CONNECTION ERROR:', err.stack);
        console.error('Code:', err.code);
        console.error('Message:', err.message);
        return;
    }
    console.log('Database connected successfully as id ' + connection.threadId);
});

module.exports = connection;

//Check if faculty table exits
// const sql = "SELECT COUNT(*) AS table_exists FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'nurserydb' AND TABLE_NAME = 'faculty'";
// connection.query(sql, (err, results) => {
//     if (results.table_exists > 0) {
//         console.log("Table exists!");
//     } else {
//         console.error("Table 'faculty' is missing.");
//     }
// });
