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
// finds all the exercises for a given muscle group
app.get('/Exercises/:muscle', function(req,res){
    let muscle = req.params.muscle;
    let sql = "SELECT * FROM Exercises WHERE muscles_worked = '" + muscle + "';";
    db.query
    (sql, function(err, result){
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});
 // finds the best exercises in the table for each muscle group, compound or accessory respectively.
app.get('/Exercises/:muscle/:cmp_or_acc', function(req,res){
    let muscle = req.params.muscle;
    let cmp_or_acc = req.params.cmp_or_acc;
    let sql = "SELECT * FROM Exercises WHERE muscles_worked = '" + muscle + "' AND compound_or_accessory = '" + cmp_or_acc + "';";
    db.query
    (sql, function(err, result){
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});
 // finds the worst exercises in your split for each muscle group
// app.get('/YourSplit', function(req,res){
//     let sql = (`CREATE VIEW WorstForMuscleGroup as
//             SELECT exercise_id, exercise_name, muscles_worked, num_fibers_worked
//             FROM (SELECT exercise_id, exercise_name, muscles_worked, num_fibers_worked, 
//                          ROW_NUMBER() OVER (PARTITION BY muscles_worked ORDER BY num_fibers_worked ASC) as rn
//                   FROM BestForMuscleGroup) as t
//             WHERE rn = 1;`)
//     db.query
//     (sql, function(err, result){
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// });
// finds the worst exercises in your split for each muscle group
// app.get('/Exercises/:muscle/:cmp_or_acc/:exercise', function(req,res){
//     let muscle = req.params.muscle;
//     let cmp_or_acc = req.params.cmp_or_acc;
//     let exercise = req.params.exercise;
//     let sql = "SELECT * FROM Exercises WHERE muscles_worked = '" + muscle + "' AND compound_or_accessory = '" + cmp_or_acc + "' AND exercise_name = '" + exercise + "';";
//     db.query
//     (sql, function(err, result){
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// });

// returns the AllSplits table
app.get('/AllSplits', function(req,res){
    db.query('SELECT * FROM AllSplits', function(err, result){
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});
// returns the ScientificResearch table
app.get('/ScientificResearch', function(req,res){
    db.query('SELECT * FROM ScientificResearch', function(err, result){
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});
// Returns the usersplit based on which they chose from AllSplits
app.get('/YourSplit', function(req,res){
    db.query('SELECT * FROM YourSplit', function(err, result){
        if (err) {
            console.log(err);

        } else {
            res.send(result);
        }
    })
});
// Returns the usersplit based on muscle group choice
// app.get('/YourSplit/:muscle', function(req,res){
//     let muscle = req.params.muscle;
//     let sql = "SELECT * FROM YourSplit WHERE muscles_worked = '" + muscle + "';";
//     db.query
//     (sql, function(err, result){
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// });

// app.get('/YourSplit/:muscle/:cmp_or_acc', function(req,res){
//     let muscle = req.params.muscle;
//     let cmp_or_acc = req.params.cmp_or_acc;
//     let sql = "SELECT * FROM YourSplit WHERE muscles_worked = '" + muscle + "' AND compound_or_accessory = '" + cmp_or_acc + "';";
//     db.query
//     (sql, function(err, result){
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// });
// returns the BestForMuscleGroup table
app.get('/BestForMuscleGroup', function(req,res){
    db.query('SELECT bf.exercise_id, bf.exercise_name, bf.muscles_worked FROM BestForMuscleGroup bf LEFT JOIN YourSplit ys USING (exercise_id) WHERE ys.exercise_id IS NULL', function(err, result){
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get('/BestForMuscleGroup/:muscle', function(req,res){
    db.query = ('SELECT exercise_id, exercise_name, muscles_worked FROM BestForMuscleGroup WHERE CASE WHEN muscles_worked = "Chest" THEN 1 WHEN muscles_worked = "Back" THEN 2 WHEN muscles_worked = "Legs" THEN 3 WHEN muscles_worked = "Shoulders" THEN 4 WHEN muscles_worked = "Arms" THEN 5 WHEN muscles_worked = "Abs" THEN 6 ELSE 7 END = 1', function(err, result){
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

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

app.get('/BestForMuscleGroup/', function(req,res){
    db.query("SELECT exercise_id, exercise_name, num_fibers_worked FROM (SELECT exercise_id, exercise_name, num_fibers_worked, ROW_NUMBER() OVER (PARTITION BY muscles_worked ORDER BY num_fibers_worked DESC) as rn FROM BestForMuscleGroup) as t WHERE rn = 1", function(err, result){
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
// adding into exercise table
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
// adding to AllSplits table
app.post('/add/AllSplits', function(req, res){
    let split_id = req.body.split_id;
    let split_name = req.body.split_name;
    let exercise_name = req.body.exercise_name;
    let times_per_week = req.body.times_per_week;
    let time_of_week = req.body.time_of_week;
    let sets = req.body.sets;
    let reps = req.body.reps;
    let sql = "INSERT INTO AllSplits (split_id, split_name, exercise_name, times_per_week, time_of_week, sets, reps) VALUES ('" + split_id + "', '" + split_name + "', '" + exercise_name + "', '" + times_per_week + "', '" + time_of_week + "', '" + sets + "', '" + reps + "');";
    db.query
    (sql, (
        err, result) => {
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

app.post('/add/BestForMuscleGroup', function(req, res){
    let exercise_id = req.body.exercise_id;
    let exercise_name = req.body.exercise_name;
    let muscles_worked = req.body.muscles_worked;
    let num_fibers_worked = req.body.num_fibers_worked;
    let sql = "INSERT INTO BestForMuscleGroup (exercise_id, exercise_name, muscles_worked, num_fibers_worked) VALUES ('" + exercise_id + "', '" + exercise_name + "', '" + muscles_worked + "', '" + num_fibers_worked + "');";
    db.query
    (sql, (
        err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

app.post('/add/Tips', function(req, res){
    let tip_id = req.body.tip_id;
    let tip = req.body.tip;
    let sql = "INSERT INTO Tips (tip_id, tip) VALUES ('" + tip_id + "', '" + tip + "');";
    db.query
    (sql, (
        err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

app.post('/add/Exercises', function(req, res){
    let name = req.body.exercise_name;
    let muscle_group = req.body.muscles_worked;
    let desc = req.body.description;
    let cmp_or_acc = req.body.compound_or_accessory;
    let sql = "INSERT INTO Exercises (exercise_name, muscles_worked, description, compound_or_accessory) VALUES ('" + name + '", "' + muscle_group + '", "' + desc + '", "' + cmp_or_acc + "');";
    db.query
    (sql, (
        err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});


// Updating table statements:

app.put('/update/Exercises', function(req, res){
    let name = req.body.exercise_name;
    let muscle_group = req.body.muscles_worked;
    let desc = req.body.description;
    let cmp_or_acc = req.body.compound_or_accessory;
    let sql = "UPDATE Exercises SET muscles_worked = '" + muscle_group + "', description = '" + desc + "', compound_or_accessory = '" + cmp_or_acc + "' WHERE exercise_name = '" + name + "';";
    db.query
    (sql, (
        err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

app.put('/update/AllSplits', function(req, res){
    let split_id = req.body.split_id;
    let split_name = req.body.split_name;
    let exercise_name = req.body.exercise_name;
    let times_per_week = req.body.times_per_week;
    let time_of_week = req.body.time_of_week;
    let sets = req.body.sets;
    let reps = req.body.reps;
    let sql = "UPDATE AllSplits SET split_name = '" + split_name + "', exercise_name = '" + exercise_name + "', times_per_week = '" + times_per_week + "', time_of_week = '" + time_of_week + "', sets = '" + sets + "', reps = '" + reps + "' WHERE split_id = '" + split_id + "';";
    db.query
    (sql, (
        err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

app.put('/update/YourSplit', function(req, res){
    let split_id = req.body.split_id;
    let split_name = req.body.split_name;
    let exercise_name = req.body.exercise_name;
    let times_per_week = req.body.times_per_week;
    let time_of_week = req.body.time_of_week;
    let sets = req.body.sets;
    let reps = req.body.reps;
    let sql = "UPDATE YourSplit SET split_name = '" + split_name + "', exercise_name = '" + exercise_name + "', times_per_week = '" + times_per_week + "', time_of_week = '" + time_of_week + "', sets = '" + sets + "', reps = '" + reps + "' WHERE split_id = '" + split_id + "';";
    db.query
    (sql, (
        err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

app.put('/update/BestForMuscleGroup', function(req, res){
    let exercise_id = req.body.exercise_id;
    let exercise_name = req.body.exercise_name;
    let muscles_worked = req.body.muscles_worked;
    let num_fibers_worked = req.body.num_fibers_worked;
    let sql = "UPDATE BestForMuscleGroup SET exercise_name = '" + exercise_name + "', muscles_worked = '" + muscles_worked + "', num_fibers_worked = '" + num_fibers_worked + "' WHERE exercise_id = '" + exercise_id + "';";
    db.query
    (sql, (
        err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

app.put('/update/Tips', function(req, res){
    let tip_id = req.body.tip_id;
    let tip = req.body.tip;
    let sql = "UPDATE Tips SET tip = '" + tip + "' WHERE tip_id = '" + tip_id + "';";
    db.query
    (sql, (
        err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

app.put('/update/UserWeekdaySplit', function(req, res){
    let split_id = req.body.split_id;
    let split_name = req.body.split_name;
    let exercise_name = req.body.exercise_name;
    let times_per_week = req.body.times_per_week;
    let time_of_week = req.body.time_of_week;
    let sets = req.body.sets;
    let reps = req.body.reps;
    let sql = "UPDATE UserWeekdaySplit SET split_name = '" + split_name + "', exercise_name = '" + exercise_name + "', times_per_week = '" + times_per_week + "', time_of_week = '" + time_of_week + "', sets = '" + sets + "', reps = '" + reps + "' WHERE split_id = '" + split_id + "';";
    db.query
    (sql, (
        err, result) => {
            if (err) console.log(err);
            else res.send(result);
            })
    });
            
app.put('/update/UserWeekendSplit', function(req, res){
    let split_id = req.body.split_id;
    let split_name = req.body.split_name;
    let exercise_name = req.body.exercise_name;
    let times_per_week = req.body.times_per_week;
    let time_of_week = req.body.time_of_week;
    let sets = req.body.sets;
    let reps = req.body.reps;
    let sql = "UPDATE UserWeekendSplit SET split_name = '" + split_name + "', exercise_name = '" + exercise_name + "', times_per_week = '" + times_per_week + "', time_of_week = '" + time_of_week + "', sets = '" + sets + "', reps = '" + reps + "' WHERE split_id = '" + split_id + "';";
    db.query
    (sql, (
        err, result) => {
            if (err) console.log(err);
            else res.send(result);
            })
    });

    
    
// Deleting from table statements:
app.delete('/delete/AllSplits', function(req, res){
    let split_id = req.body.split_id;
    let sql = "DELETE FROM AllSplits WHERE split_id = '" + split_id + "';";
    db.query
    (sql, (
        err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

app.delete('/delete/YourSplit', function(req, res){
    let split_id = req.body.split_id;
    let sql = "DELETE FROM YourSplit WHERE split_id = '" + split_id + "';";
    db.query
    (sql, (
        err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

app.delete('/delete/BestForMuscleGroup', function(req, res){
    let exercise_id = req.body.exercise_id;
    let sql = "DELETE FROM BestForMuscleGroup WHERE exercise_id = '" + exercise_id + "';";
    db.query
    (sql, (
        err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

app.delete('/delete/Tips', function(req, res){
    let tip_id = req.body.tip_id;
    let sql = "DELETE FROM Tips WHERE tip_id = '" + tip_id + "';";
    db.query
    (sql, (
        err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

app.delete('/delete/UserWeekdaySplit', function(req, res){
    let split_id = req.body.split_id;
    let sql = "DELETE FROM UserWeekdaySplit WHERE split_id = '" + split_id + "';";
    db.query
    (sql, (
        err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

app.delete('/delete/UserWeekendSplit', function(req, res){
    let split_id = req.body.split_id;
    let sql = "DELETE FROM UserWeekendSplit WHERE split_id = '" + split_id + "';";
    db.query
    (sql, (
        err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

// faceted search of exercises based on muscle group, optimal score, and num_fibers
app.get('/filer/ScientificResearch', function(req, res){
    let muscle_group = req.body.muscle_group;
    let optimal_score = req.body.optimal_score;
    let num_fibers = req.body.num_fibers;
    let sql = "SELECT * FROM ScientificResearch WHERE muscle_group = '" + muscle_group + "' AND optimal_score = '" + optimal_score + "' AND num_fibers = '" + num_fibers + "';";
    if(muscle_group == null && optimal_score == null && num_fibers == null){
        sql = "SELECT * FROM ScientificResearch;";
    }
    else if(muscle_group == null && optimal_score == null){
        sql = "SELECT * FROM ScientificResearch WHERE num_fibers = '" + num_fibers + "';";
    }
    else if(muscle_group == null && num_fibers == null){
        sql = "SELECT * FROM ScientificResearch WHERE optimal_score = '" + optimal_score + "';";
    }
    else if(optimal_score == null && num_fibers == null){
        sql = "SELECT * FROM ScientificResearch WHERE muscle_group = '" + muscle_group + "';";
    }
    else if(muscle_group == null){
        sql = "SELECT * FROM ScientificResearch WHERE optimal_score = '" + optimal_score + "' AND num_fibers = '" + num_fibers + "';";
    }
    else if(optimal_score == null){
        sql = "SELECT * FROM ScientificResearch WHERE muscle_group = '" + muscle_group + "' AND num_fibers = '" + num_fibers + "';";
    }
    else if(num_fibers == null){
        sql = "SELECT * FROM ScientificResearch WHERE muscle_group = '" + muscle_group + "' AND optimal_score = '" + optimal_score + "';";
    }
    db.query
    (sql, (
        err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});



// setting up mysql server to listen to the correct host and ports
app.listen(3001, () => {
    console.log('Server is running at port 3001!');
});