const {createPool} = require('mysql');

const pool = createPool({
    user: 'root',
    password: 'ithertzwhenIP#1984',
    host: 'localhost',
    database: 'fermentdb', 
    connectionLimit: 10
})
