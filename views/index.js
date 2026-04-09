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
db = DatabaseSync('nurseryDB.db');
//     // db = DatabaseSync('nurseryDB.db');
// const rows = db.prepare('SELECT * FROM faculty').all();   //query.all()
patientBT.addEventListener('click', function(e){
    document.getElementById("tableView").innerText = "Patient Table";//tableValues.getFacultyTable();
    // console.log(rows);
    
});
facultyBT.addEventListener('click', function(e){
    document.getElementById("tableView").innerText = "Faculty Table";//tableValues.getFacultyTable();

    // Start the table and header row
    let table = '<table class="table table-bordered">' +
        '<tr>' +
        '<td>facultyID</td>' +
        '<td>facultyLastName</td>' +
        '<td>facultyTypeID</td>'
        '</tr>';

    // Rows
    const values = db.prepare('SELECT * FROM faculty JOIN faculty_type where faculty.facultyTypeID = faculty_type.facultyTypeID').all();

    // Loop over each connection and create a row for each
    values.forEach(function(data) {
        // Append a row to the table for each connection
        table += '<tr>' +
            '<td id="facultyID' + i + '">' + data.facultyID + '</td>' +
            '<td id="facultyLastName' + i + '">' + data.facultyLastName + '</td>' +
            '<td id="facultyLastName' + i + '">' + data.facultyTypeID + '</td>'
        '</tr>';
    });

    // Close the table
    table += '</table>';

    // Set the innerHTML of the connectionMod element
    document.getElementById("table").innerHTML = table;
});
familyBT.addEventListener('click', function(e){
    document.getElementById("tableView").innerText = "Family Table";//tableValues.getFacultyTable();
});
paymentBT.addEventListener('click', function(e){
    document.getElementById("tableView").innerText = "Payment Table";//tableValues.getFacultyTable();
});