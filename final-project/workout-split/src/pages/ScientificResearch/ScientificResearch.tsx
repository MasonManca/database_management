import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ScientificResearch.css';
import { NavLink, Routes, Route } from 'react-router-dom';



    const ScientificResearch: React.FC = () => {
            const [exerciseID, setExerciseID] = useState([]);
            const [muscleGroup, setMuscleGroup] = useState([]);
            const [num_fibers, setNumFibers] = useState([]);
            const [risk_val, setRiskVal] = useState([]);
            const [reward_val, setRewardVal] = useState([]);
            const [optimal_score, setOptimalScore] = useState([]);
    
            // useEffect(() => {
            //     fetch('http://localhost:3001/Exercises')
            //     .then(res => res.json())
            //     .then(data => {
            //         setExerciseName(data);
            //         console.log(data);
            //     }).catch(err => console.log(err));
            //     }, []); // if empty, works on load
    
            useEffect(() => {
                fetch('http://localhost:3001/ScientificResearch')
                .then(res => res.json())
                .then(data => {
                    setExerciseID(data);
                    setMuscleGroup(data);
                    setNumFibers(data);
                    setRiskVal(data);
                    setRewardVal(data);
                    setOptimalScore(data);

                    console.log(data);
                }).catch(err => console.log(err));
            }, []);

        return(

            <div className="Scientific">
            <table id = 'table-name' className="table table-dark position-absolute">
                <thead>
                    <tr>
                        <th scope="col">Exercise ID</th>
                        <th scope="col">Muscle Group</th>
                        <th scope="col"># Fibers</th>
                        <th scope="col">Risk</th>
                        <th scope="col">Reward</th>
                        <th scope="col">Optimal Score</th>
                    </tr>    
                </thead>
                <tbody >
                    {exerciseID.map((scientific: any) => {
                        return (
                            <tr className='clickable-row'>
                                <th scope="row" >{scientific.exercise_id} </th>
                                <td>{scientific.muscles_worked}</td>
                                <td>{scientific.risk}</td>
                                <td>{scientific.reward}</td>
                                <td>{scientific.optimal_score}</td>
                                <td>{scientific.num_fibers}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>

        );

    };



    export default ScientificResearch;