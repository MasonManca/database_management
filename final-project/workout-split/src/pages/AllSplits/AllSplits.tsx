import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import './YourSplit.css';

const AllSplits: React.FC = () => {

    const [splitID, setSplitID] = useState([]);
    const [splitName, setSplitName] = useState([]);
    const [muscleGroupSplit, setMuscleGroupSplit] = useState([]);
    const [timesPerWeek, setTimesPerWeek] = useState([]);
    const [split_dest, setSplitDest] = useState([]);

    const addRow = (split_id: number) => {
        window.location.href = `/YourSplit/${split_id}`;
    }
    const svg = () =>{ return(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
  </svg>)};

    useEffect(() => {
        fetch('http://localhost:3001/AllSplits')
        .then(res => res.json())
        .then(data => {
            setSplitID(data);
            setSplitName(data);
            setMuscleGroupSplit(data);
            setTimesPerWeek(data);
            setSplitDest(data);
        
            console.log(data);
        }).catch(err => console.log(err));
    }
    , []);

    return(
        <div className="AllSplits">
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
                    {splitID.map((split: any) => {
                        return (
                            <tr className='clickable-row'>
                                <th scope="row" >{split.split_id} <button className="btn p-1 w-50 bg-light" onClick={() => addRow(split.split_id)}>+</button></th>
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

export default AllSplits;