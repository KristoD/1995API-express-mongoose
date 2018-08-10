var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/1955_api');
app.use(bodyParser.json());

var personSchema = new mongoose.Schema({
    name: String
});

var Person = mongoose.model('Person', personSchema);

app.get('/', function(req, res) {
    Person.find({}, function(err, people) {
        if(err) {
            res.json({message: 'Error', error: err});
        } else {
            res.json({message: 'Success', data: people});
        }
    });
});

app.get('/:name', function(req, res) {
    Person.find({name: req.params.name}, function(err, person) {
        if(err) {
            res.json({message: 'Error', error: err});
        } else {
            res.json({message: 'Succes', data: person});
        }
    });
});

app.get('/new/:name', function(req, res) {
    Person.create({name: req.params.name}, function(err, person) {
        if(err) {
            res.json({message: 'Error', error: err});
        } else {
            res.json({message: 'Success', data: person});
        }
    });
});

app.get('/remove/:name', function(req, res) {
    Person.remove({name: req.params.name}, function(err) {
        if(err) {
            res.json({message: 'Error', error: err});
        } else {
            res.json({message: 'Success'});
        }
    });
});

app.listen(8000, function() {
    console.log('Server listening on port 8000...');
});
