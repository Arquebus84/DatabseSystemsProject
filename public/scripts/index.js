// import { Database } from "sqlite";
// import DataAccess from './database.js';
// const express = require('express');
// const {DatabaseSync} = require('node:sqlite');
// // const table = document.getElementById("tableView");
const patientBT = document.getElementById("patientBT");
const facultyBT = document.getElementById('facultyBT');
const familyBT = document.getElementById("familyBT");
const paymentBT = document.getElementById("paymentBT");

//     // db = DatabaseSync('nurseryDB.db');
// const rows = db.prepare('SELECT * FROM faculty').all();   //query.all()
patientBT.addEventListener('click', function(e){
    // Fetch result from faculty controller
    fetch('/api/patientTable')
        .then(response => response.json())
        .then(data => {

            // Create table header
            let table = '<table class="table table-bordered"><tr>' +
                '<th>ID</th><th>First Name</th><th>Last Name</th><th>Priority</th><th>Condition</th><th>Family</th></tr>';

            // Fill rows by row
            data.forEach(row => {
                table += `<tr><td>${row.patientID}</td>` +
                    `<td>${row.firstName}</td>` +
                    `<td>${row.lastName}</td></tr>`
                        `<td>${row.patientPriority}</td>` +
                    `<td>${row.conditiondesc}</td>` +
                    `<td>${row.familyContact}</td>`;
            });

            // Add table closing
            table += '</table>';

            // Insert table into html
            document.getElementById("table").innerHTML = table;
        })
    
});

facultyBT.addEventListener('click', function(e) {
    // Fetch result from faculty controller
    fetch('/api/facultyTable')
        .then(response => response.json())
        .then(data => {

            // Create table header
            let table = '<table class="table table-bordered"><tr>' +
                '<th>ID</th><th>Last Name</th><th>Type</th></tr>';

            // Fill rows by row
            data.forEach(row => {
                table += `<tr><td>${row.facultyID}</td>` +
                    `<td>${row.facultyLastName}</td>` +
                    `<td>${row.facultyType}</td></tr>`;
            });

            // Add table closing
            table += '</table>';

            // Insert table into html
            document.getElementById("table").innerHTML = table;
        })
});

familyBT.addEventListener('click', function(e){
    document.getElementById("tableView").innerText = "Family Table";//tableValues.getFacultyTable();
});

paymentBT.addEventListener('click', function(e){
    document.getElementById("tableView").innerText = "Payment Table";//tableValues.getFacultyTable();
});