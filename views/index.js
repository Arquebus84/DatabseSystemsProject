// import { Database } from "sqlite";
// import DataAccess from './database.js';
// const express = require('express');
// const {DatabaseSync} = require('node:sqlite');

// // const table = document.getElementById("tableView");
const patientBT = document.getElementById("patientBT");
const facultyBT = document.getElementById('facultyBT');
const familyBT = document.getElementById("familyBT");
const paymentBT = document.getElementById("paymentBT");

const responseText = document.getElementById("tableView");

// // const tableValues = new DataAccess();
// db = DatabaseSync('nurseryDB.db');
//     // db = DatabaseSync('nurseryDB.db');
// const rows = db.prepare('SELECT * FROM faculty').all();   //query.all()
patientBT.addEventListener('click', function(e){
    document.getElementById("tableView").innerText = "Patient Table";//tableValues.getFacultyTable();
    // console.log(rows);
    
});
facultyBT.addEventListener('click', function(e){
    document.getElementById("tableView").innerText = "Faculty Table";//tableValues.getFacultyTable();
});
familyBT.addEventListener('click', function(e){
    document.getElementById("tableView").innerText = "Family Table";//tableValues.getFacultyTable();
});
paymentBT.addEventListener('click', function(e){
    document.getElementById("tableView").innerText = "Payment Table";//tableValues.getFacultyTable();
});