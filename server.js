var path = require('path');
var express = require('express');
// import express from 'express';
var app = express();

var data = require('./routes/data');

// var db = require('./database');

// var indexRouter = require('./routes/data');  //Fix this

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', data);

const PORT = 3000;

app.use(express.static('public'));

app.listen(PORT, ()=>{
    console.log(`App running on http://localhost:${PORT}`);
});

// app.get('/', (req, res)=>{
//     res.sendFile(__dirname + '/public');
// });

// app.get('/', (req, res)=>{
//     res.sendFile(__dirname + '/public/index.html');
// });

module.exports = app;