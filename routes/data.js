var express = require('express');
var router = express.Router();

// var db = require('./database');

router.get('/', function(req, res, next){
    res.render('example', {title: 'Express'});
    // var query = 'SELECT * FROM faculty';
    // db.query(query, function(error, data){
    //     if(error){
    //         throw error;
    //     }else{
    //         res.render('example', {title:'NodeJS MySQL Application', action:'list', sampleData:data});
    //     }
    // });
});

router.get('/add', function(req, res, next){
    // response.send('sample data');
});

module.exports = router;