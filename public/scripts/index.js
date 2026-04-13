// import { Database } from "sqlite";
// import DataAccess from './database.js';
// const express = require('express');
// const {DatabaseSync} = require('node:sqlite');

// const { json } = require("express");

// // const table = document.getElementById("tableView");
const patientBT = document.getElementById("patientBT");
const facultyBT = document.getElementById('facultyBT');
const familyBT = document.getElementById("familyBT");
const paymentBT = document.getElementById("paymentBT");
const paySumBT = document.getElementById("paySumBT");

//     // db = DatabaseSync('nurseryDB.db');
// const rows = db.prepare('SELECT * FROM faculty').all();   //query.all()
patientBT.addEventListener('click', function(e){
    // Fetch result from patient controller
    fetch('/api/patientTable')
        .then(response => response.json())
        .then(data => {

            // Create table header
            let table = '<table class="table table-bordered"><tr>' +
                '<th>ID</th><th>First Name</th><th>Last Name</th><th>Priority</th><th>Condition</th><th>Family</th></tr>';

            console.log("Data is " + typeof(data));
            // Fill rows by row
            Object.values(data).forEach(row => {
                table += `<tr><td>${row.ID}</td>` +
                    `<td>${row.firstName}</td>` +
                    `<td>${row.lastName}</td>` +
                    `<td>${row.priority}</td>` +
                    `<td>${row.condition}</td>` +
                    `<td>${row.familyContact}</td></tr>`;
            });

            // Add table closing
            table += '</table>';

            // Insert table into html
            document.getElementById("table").innerHTML = table;
        });
});

facultyBT.addEventListener('click', function(e){
    // Fetch result from faculty controller
    fetch('/api/facultyTable')
        .then(response => response.json())
        .then(data => {

            // Create table header
            let table = '<table class="table table-bordered"><tr>' +
                '<th>ID</th><th>Last Name</th><th>Type</th></tr>';
            
            //console.log("Data is " + typeof(data));
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
    // document.getElementById("tableView").innerText = "Family Table";//tableValues.getFacultyTable();
});

paymentBT.addEventListener('click', function(e){
    // document.getElementById("tableView").innerText = "Payment Table";//tableValues.getFacultyTable();
    fetch('/api/paymentTable')
        .then(response => response.json())
            .then(data =>{
                // Create table header
                let table = '<table class="table table-bordered"><tr>' +
                    '<th>ID</th><th>price</th><th>tax</th>';

                data.forEach(row =>{
                    table += `<tr><td>${row.paymentID}</td>`+
                        `<td>${row.price}</td>` +
                        `<td>${row.tax}</td></tr>`;
                });

                table += '</table>';

                document.getElementById("table").innerHTML = table;
            });
});

paySumBT.addEventListener('click', function(e){
    fetch('/api/paySumTable')
        .then(response => response.json())
            .then(data =>{
                // Create table header
                let table = '<table class="table table-bordered"><tr>' +
                    '<th>ID</th><th>Net Payment</th><th>tax</th>';

                data.forEach(row =>{
                    table += `<tr><td>${row.netPayment}</td>`+
                        `<td>${row.patientName}</td></tr>`
                });

                table += '</table>';

                document.getElementById("table").innerHTML = table;
            });
});