import React from 'react';
import { useState, useEffect } from 'react';
import './Exercises.css';

    const Exercises: React.FC = () => {
        const [exerciseID, setExerciseID] = useState([]);
        const [exerciseName, setExerciseName] = useState([]);
        const [muscleGroup, setMuscleGroup] = useState([]);
        const [cmpOrAcc, setcmpOrAcc] = useState([]);

        useEffect(() => {
            fetch('http://localhost:3001/Exercises')
            .then(res => res.json())
            .then(data => {
                setExerciseID(data);
                setExerciseName(data);
                setMuscleGroup(data);
                setcmpOrAcc(data);

                console.log(data);
            }).catch(err => console.log(err));
            }, []); // if empty, works on load

        return (
            <div className ="/Exercises">
            <body className = 'main-body position-absolute'>
            <table id = 'table-name' className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Exercise ID</th>
                        <th scope="col">Exercise Name</th>
                        <th scope="col">Muscle Group</th>
                        <th scope="col">Compound or Accessory</th>
                    </tr>    
                </thead>
                <tbody >
                    {exerciseID.map((exercise: any) => {
                        return (
                            <tr className='clickable-row'>
                                <th scope="row" >{exercise.exercise_id} </th>
                                <td><a className='btn btn-link' href="#a">{exercise.exercise_name}</a></td>
                                <td>{exercise.muscles_worked}</td>
                                <td>{exercise.compound_or_accessory}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </body>
            </div>
            );
        };


    export default Exercises;