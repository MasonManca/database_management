-- Mason Manca
-- CPSC 321 Section 01
-- Dr.Bowers
-- 22 November 22
/*
************************** Main Relations **************************
-- Exercises( exercise_id, exercise_name, muscles_worked, desc, compound_or_accessory)
-- AllSplits( split_id, split_name, muscle_group_split, times_per_week, split_desc)
-- YourSplit( split_id, exercise_id, times_per_week, time_of_week, sets, reps )
-- ScientificResearch( exercise_id, muscles_worked, risk, reward, optimal_score, num_fibers )
-- Tips( exercise_id, tip_desc )
-- CompoundOrAccessory( exercise_id, compound_or_accessory, intensity, risk_val, reward_val)
-- BestForMuscleGroup( exercise_id, exercise_name, muscle_group, num_fibers, optimal_score)
*/

-- -- CREATE TABLE statements:
DROP TABLE IF EXISTS ScientificResearch;
DROP TABLE IF EXISTS UserWeekdaySplit;
DROP TABLE IF EXISTS Tips;
DROP TABLE IF EXISTS BestForMuscleGroup;
DROP TABLE IF EXISTS CompoundOrAccessory;
DROP TABLE IF EXISTS YourSplit;
DROP TABLE IF EXISTS AllSplits;
DROP TABLE IF EXISTS Exercises;

CREATE TABLE Exercises
(
    exercise_id INTEGER PRIMARY KEY,
    exercise_name CHAR(50),
    muscles_worked CHAR(100),
    description CHAR (250),
    compound_or_accessory CHAR(50)
);


CREATE TABLE AllSplits
(
    split_id INT,
    split_name CHAR(50),
    muscle_group_split CHAR (50),
    times_per_week INT,
    split_desc CHAR (250),
    PRIMARY KEY (split_id)
);

CREATE TABLE YourSplit
(
    split_id INTEGER PRIMARY KEY,
    split_name CHAR(50),
    muscle_group_split CHAR (50),
    times_per_week INT,
    split_desc CHAR (250),
    FOREIGN KEY (split_id) REFERENCES AllSplits (split_id)
);

CREATE TABLE ScientificResearch
(
    exercise_id INT,
    muscles_worked CHAR (100),
    risk INT,
    reward INT,
    optimal_score INT,
    num_fibers INT,
    PRIMARY KEY(exercise_id),
    FOREIGN KEY (exercise_id) REFERENCES Exercises (exercise_id)
);

CREATE TABLE Tips
(
    exercise_id INT,
    exercise_name CHAR(50),
    tip_desc CHAR(250),
    PRIMARY KEY (exercise_id),
    FOREIGN KEY (exercise_id) REFERENCES Exercises (exercise_id)
);

CREATE TABLE CompoundOrAccessory
(
    exercise_id INT,
    exercise_name CHAR(50),
    compound_or_accessory CHAR(50),
    intensity INT,
    risk_val INT,
    reward_val INT,
    PRIMARY KEY (exercise_id),
    FOREIGN KEY (exercise_id) REFERENCES Exercises(exercise_id)
);

CREATE TABLE BestForMuscleGroup
(
    exercise_id INT,
    exercise_name CHAR(50),
    muscle_group CHAR(50),
    num_fibers INT,
    optimal_score INT,
    PRIMARY KEY (exercise_id),
    FOREIGN KEY (exercise_id) REFERENCES Exercises (exercise_id)
);

CREATE TABLE UserWeekdaySplit(
    split_id INT,
    exercise_id INT,
    exercise_name CHAR(50),
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
    sets INT,
    reps INT,
    PRIMARY KEY (split_id,exercise_id, day_of_week),
    FOREIGN KEY (exercise_id) REFERENCES Exercises (exercise_id),
    FOREIGN KEY (split_id) REFERENCES AllSplits (split_id)
);
