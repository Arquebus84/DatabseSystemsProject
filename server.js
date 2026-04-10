var path = require('path');
var express = require('express');
var app = express();

var dataRoutes = require('./src/routes/data');
const db = require('./src/models/database');

// var db = require('./database');

// var indexRouter = require('./routes/data');  //Fix this

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use('/api', dataRoutes);

app.get('/', (req, res) => {
    res.render('home', { title: 'Nursery Database' });
});

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`App running on http://localhost:${PORT}`);
});

module.exports = app;