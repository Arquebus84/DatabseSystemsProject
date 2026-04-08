
const path = require('path');
const express = require('express');

const app = express();
app.set('view engine', 'ejs');

const port = process.env.APP_PORT || 3000;

app.set('views', path.join(__dirname, 'src/views'));

app.get('/', (req, res) => {
    res.render('home', { title: "home page", user: 'Guest'});
});

app.listen(port, () => {
    console.log(`Running on website http://localhost:${port}`);
});