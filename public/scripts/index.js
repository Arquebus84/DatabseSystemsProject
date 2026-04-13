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
            let table = '<table class="tableFormat table-bordered">'+
                '<tr><th class="tableFormat">ID</th><th class="tableFormat">First Name</th><th class="tableFormat">Last Name</th>'+
                '<th class="tableFormat">Priority</th><th class="tableFormat">Condition</th><th class="tableFormat">Family</th></tr>';

            // console.log("Data is " + typeof(data));
            // Fill rows by row
            Object.values(data).forEach(row => {
                table += `<tr><td class="tableFormat">${row.ID}</td>` +
                    `<td class="tableFormat">${row.firstName}</td>` +
                    `<td class="tableFormat">${row.lastName}</td>` +
                    `<td class="tableFormat">${row.priority}</td>` +
                    `<td class="tableFormat">${row.conditionDesc}</td>` +
                    `<td class="tableFormat">${row.familyContact}</td></tr>`;
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
            let table = '<table class="tableFormat table-bordered"><tr>' +
                '<th class="tableFormat">ID</th><th class="tableFormat">Last Name</th><th class="tableFormat">Type</th></tr>';
            
            //console.log("Data is " + typeof(data));
            // Fill rows by row
            Object.values(data).forEach(row => {
                table += `<tr><td class="tableFormat">${row.facultyID}</td>` +
                    `<td class="tableFormat">${row.facultyLastName}</td>` +
                    `<td class="tableFormat">${row.facultyType}</td></tr>`;
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
                let table = '<table class="tableFormat table-bordered">'+
                    '<tr><th class="tableFormat">ID</th><th class="tableFormat">Price</th><th class="tableFormat">Tax</th><tr>';

                Object.values(data).forEach(row =>{
                    table += `<tr><td class="tableFormat">${row.paymentID}</td>`+
                        `<td class="tableFormat">${row.price}</td>` +
                        `<td class="tableFormat">${row.tax}</td></tr>`;
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
                let table = '<table class="tableFormat table-bordered"><tr>' +
                    '<th>Net Payment</th><th>Patient Last Name</th>';

                Object.values(data).forEach(row =>{
                    table += `<tr><td class="tableFormat">${row.netPayment}</td>`+
                        `<td class="tableFormat">${row.patientName}</td></tr>`
                });

                table += '</table>';

                document.getElementById("table").innerHTML = table;
            });
});