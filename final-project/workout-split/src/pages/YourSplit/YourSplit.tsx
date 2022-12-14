import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import './YourSplit.css';


const YourSplit: React.FC = () => {
    const [split_id, setSplitID] = useState(0);
    const [exercise_id, setExerciseID] = useState([]);
    const [times_per_week, setTimesPerWeek] = useState([]);
    const [time_of_week, setTimeOfWeek] = useState([]);
    const [sets, setSets] = useState([]);
    const [reps, setReps] = useState([]);

    const [inputData, setInputData] = useState([]);

    useEffect(() => {
        let ID = window.location.href.split('/').pop();        
        fetch(`http://localhost:3001/YourSplit/${ID}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setInputData(data);
        }).catch(err => console.log(err));

    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/YourSplit')
        .then(res => res.json())
        .then(data => {
            setSplitID(data);
            setExerciseID(data);
            setTimesPerWeek(data);
            setTimeOfWeek(data);
            setSets(data);
            setReps(data);
            console.log(data);
        }).catch(err => console.log(err));
    }, []);

    return (
        <div className="YourSplit">
            <body className = 'main-body position-absolute'>
            <table id = 'table-name' className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">SplitID</th>
                        <th scope="col">Split Name</th>
                        <th scope="col">Muscle Group</th>
                        <th scope="col">Times Per Week</th>
                        <th scope="col">Split Description</th>
                    </tr>    
                </thead>
                    <tbody >
                    {inputData.map((split: any) => {
                        return (
                            <tr>
                                <th scope="row" >{split.split_id}</th>
                                <td>{split.split_name}</td>
                                <td>{split.muscle_group_split}</td>
                                <td>{split.times_per_week}</td>
                                <td>{split.split_desc}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </body>
    </div>
        


    )
};

export default YourSplit;