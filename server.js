var path = require('path');
var express = require('express');
var app = express();

var data = require('./routes/data');

// var db = require('./database');

// var indexRouter = require('./routes/data');  //Fix this

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/', data);

const PORT = 3000;

app.use(express.static('views'));

app.listen(PORT, ()=>{
    console.log(`App running on http://localhost:${PORT}`);
});

module.exports = app;