const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('IO Error - Unable to append server.log.');
        }
    });
    next();
});

//
// app.use((req, res, next) => {
//     res.render('maint.hbs');
// });

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'the dynamic home page',
        currentYear: new Date().getFullYear(),
        thunderdome: 'two enter one leaves'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'the about page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "error handling req"
    });
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});