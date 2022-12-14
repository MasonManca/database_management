const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'final_project'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


// Fetching all table statements:

app.get('/Exercises', function(req,res){
    db.query('SELECT * FROM Exercises', function(err, result){
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get('/AllSplits', function(req,res){
    db.query('SELECT * FROM AllSplits', function(err, result){
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get('/ScientificResearch', function(req,res){
    db.query('SELECT * FROM ScientificResearch', function(err, result){
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get('/YourSplit', function(req,res){
    db.query('SELECT * FROM YourSplit', function(err, result){
        if (err) {
            console.log(err);

        } else {
            res.send(result);
        }
    })
});

// http://localhost:3001/YourSplit/${ID}}
app.get('/YourSplit/:id', function(req,res){
    console.log(req.params.id);
    let id = req.params.id;
    let sql = "SELECT * FROM AllSplits WHERE split_id = " + id + ";";
    db.query
    (sql, function(err, result){
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get('/Tips', function(req,res){
    db.query('SELECT * FROM Tips', function(err, result){
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

// Inserting into tables statements:

app.post('/add/Exercises', function(req, res){
    let name = req.body.exercise_name;
    let muscle_group = req.body.muscles_worked;
    let desc = req.body.description;
    let cmp_or_acc = req.body.compound_or_accessory;
    let sql = "INSERT INTO Exercises (exercise_name, muscles_worked, description, compound_or_accessory) VALUES ('" + name + '", "' + muscle_group + '", "' + desc + '", "' + cmp_or_acc + "');";
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        else res.send(result);    
    })
});

app.post('/add/YourSplit', function(req, res){
    let split_id = req.body.split_id;
    let split_name = req.body.split_name;
    let exercise_name = req.body.exercise_name;
    let times_per_week = req.body.times_per_week;
    let time_of_week = req.body.time_of_week;
    let sets = req.body.sets;
    let reps = req.body.reps;
    
    let sql = "INSERT INTO YourSplit (split_id, split_name, exercise_name, times_per_week, time_of_week, sets, reps) VALUES ('" + split_id + "', '" + split_name + "', '" + exercise_name + "', '" + times_per_week + "', '" + time_of_week + "', '" + sets + "', '" + reps + "');";
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        else res.send(result);    
    })
});

// Updating table statements:


// Deleting from table statements:

app.listen(3001, () => {
    console.log('Server is running at port 3001!');
});