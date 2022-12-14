import React from 'react';
import { useState, useEffect } from 'react';


const Tips: React.FC = () => {
    const [exerciseID, setExerciseID] = useState([]);
    const [exerciseName, setExerciseName] = useState([]);
    const [tipDescription, setTipDescription] = useState([]);


    useEffect(() => {
        fetch('http://localhost:3001/Exercises')
        .then(res => res.json())
        .then(data => {
            setExerciseName(data);
            console.log(data);
        }).catch(err => console.log(err));
        }, []); // if empty, works on load

    useEffect(() => {
        fetch('http://localhost:3001/Tips')
        .then(res => res.json())
        .then(data => {
            setExerciseID(data);
            setExerciseName(data);
            setTipDescription(data);

            console.log(data);
        }).catch(err => console.log(err));
    }, []);

return(

    <div className="Tips">
    <table id = 'table-name' className="table table-dark position-absolute">
        <thead>
            <tr>
                <th scope="col">Exercise ID</th>
                <th scope="col">Exercise Name</th>
                <th scope="col">Tip Description</th>

            </tr>    
        </thead>
        <tbody >
            {exerciseID.map((tips: any) => {
                return (
                    <tr className='clickable-row'>
                        <th scope="row" >{tips.exercise_id} </th>
                        <td>{tips.exercise_name}</td>
                        <td>{tips.tip_desc}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
    </div>

);

};

export default Tips;