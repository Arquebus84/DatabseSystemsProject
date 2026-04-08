//NEW
// const { response } = require('express');
// import expr from 'express';
const {DatabaseSync} = require('node:sqlite');
// import sqlite from 'node:sqlite'; 

export default class DataAccess{
    db = DatabaseSync('nurseryDB.db');
    // db = DatabaseSync('nurseryDB.db');

    getFacultyTable(){
        const values = db.prepare('SELECT * FROM faculty').all();   //query.all()
        return values;
    }
}

//OLD
// const {createPool} = require('mysql');

// const pool = createPool({
//     user: 'root',
//     password: 'ithertzwhenIP#1984',
//     host: 'localhost',
//     database: 'fermentdb', 
//     connectionLimit: 10
// })

// pool.query('show tables;', (err, result, fields)=>{
//     if(err)
//         console.log(err);
//     return console.log(result);
// });