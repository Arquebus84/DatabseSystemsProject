const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ithertzwhenIP#1984',
    database: 'nurserydb'
});

connection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Database connected successfully');
    }
});

//Check if faculty table exits
// const sql = "SELECT COUNT(*) AS table_exists FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'nurserydb' AND TABLE_NAME = 'faculty'";
// connection.query(sql, (err, results) => {
//     if (results.table_exists > 0) {
//         console.log("Table exists!");
//     } else {
//         console.error("Table 'faculty' is missing.");
//     }
// });

module.exports = connection;