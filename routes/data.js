var express = require('express');
var router = express.Router();

var db = require('../database');

// const patientBT = document.getElementById("patientBT");

//Database Logic
router.get('/', function(request, response, next){
    // response.send('list all sample data');
    // response.render('main', {title: 'Express'});
    // var quer = "Select count(*) from information_schema.tables where table_schema = nurserydb";

    var query = 'SELECT * FROM faculty JOIN faculty_type where faculty.facultyTypeID = faculty_type.facultyTypeID';
    db.query(query, function(error, data){
        if(error){
            throw error;
        }else{
            response.render('main', {title:'', action:'list', sampleData:data});
        }
    });
});

router.get('/add', function(request, response, next){
    response.send('sample data');
});

 //Button Logic
// patientBT.addEventListener('click', function(e){
//     document.getElementById("tableView").innerText = "Patient Table";
// });

module.exports = router;