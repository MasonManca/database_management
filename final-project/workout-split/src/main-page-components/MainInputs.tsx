import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './main-page.css';

const MainInputs: React.FC = () => {
    const [exerciseName, setExerciseName] = React.useState('');
    const [exerciseType, setExerciseType] = React.useState('');
    const [exerciseSets, setExerciseSets] = React.useState('');
    const [exerciseReps, setExerciseReps] = React.useState('');

    React.useEffect(() => {
        fetch('http://localhost:3001/Exercises')
        .then(res => res.json())
        .then(data => {
            setExerciseName(data);
            console.log(data);
        }).catch(err => console.log(err));
        }, []);

    return (
        <>
        
        </>

        );
    };
      
    export default MainInputs;