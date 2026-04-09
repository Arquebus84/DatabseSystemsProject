var express = require('express');
var router = express.Router();

var db = require('../database');

// const patientBT = document.getElementById("patientBT");

//Database Logic
router.get('/', function(request, response, next){
    // response.send('list all sample data');
    // response.render('main', {title: 'Express'});
    // var quer = "Select count(*) from information_schema.tables where table_schema = nurserydb";

    var query = 'SELECT * FROM faculty';
    db.query(query, function(error, data){
        if(error){
            throw error;
        }else{
            response.render('main', {title:'NodeJS MySQL Application', action:'list', sampleData:data});
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