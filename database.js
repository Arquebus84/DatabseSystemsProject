const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ithertzwhenIP#1984',
    database: 'fermentdb'
});

connection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Database connected successfully');
    }
});

module.exports = connection;