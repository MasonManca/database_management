import React from 'react';
import './Home.css';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';


const Home: React.FC = () => {

    const [split_id, setSplitID] = useState(0);
    const [exerciseID, setExerciseID] = useState([]);
    const [times_per_week, setTimesPerWeek] = useState([]);
    const [time_of_week, setTimeOfWeek] = useState([]);
    const [sets, setSets] = useState([]);
    const [reps, setReps] = useState([]);
    const [splitExerciseID, setSplitExerciseID] = useState([]);
    const [inputData, setInputData] = useState([]);

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

  useEffect(() => {
    fetch('http://localhost:3001/InsertSplitExercise')
    .then(res => res.json())
    .then(data => {
        setSplitExerciseID(data);
        console.log(data);
    }).catch(err => console.log(err));
  }, []);


  //   useEffect(() => {
  //     let ID = window.location.href.split('/').pop();        
  //     fetch(`http://localhost:3001/YourSplit/${ID}`)
  //     .then(res => res.json())
  //     .then(data => {
  //         console.log(data);
  //         setInputData(data);
  //     }).catch(err => console.log(err));

  // }, []);

    useEffect(() => {
      let ID = window.location.href.split('/').pop();        
      fetch(`http://localhost:3001/YourSplit/${ID}`)
      .then(res => res.json())
      .then(data => {
          console.log(data);
          setSplitExerciseID(data);
      }).catch(err => console.log(err));

  }, []);


    return (
        <div className='Home'> 
        <main role="main">

          <section className="jumbotron text-center">
            <div className="container">
              <h1 className="jumbotron-heading bg-light"> </h1>
              <p className="lead text-muted bg-light">From this Home page, you can navigate to all of the exercises contained in this app.
              You can also create your Workout Split by clicking the button below.</p>
              <p>
                <NavLink to="/Tips" className="btn btn-primary my-2">See Tips for all exercises</NavLink>
                <br />
                <NavLink to="/InsertSplitExercise" className="btn btn-secondary my-2">Add a new Exercise to the DataBase?</NavLink>
                <br />
              </p>
            </div>
          </section>
        </main>

    <div className="container">
        <h1 className="display-4 bg-light p-2">Weekly Calendar</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="col-sm-4 bg-light">Monday</th>
              <th className="col-sm-4 bg-light">Tuesday</th>
              <th className="col-sm-4 bg-light">Wednesday</th>
              <th className="col-sm-4 bg-light">Thursday</th>
              <th className="col-sm-4 bg-light">Friday</th>
              <th className="col-sm-4 bg-light">Saturday</th>
              <th className="col-sm-4 bg-light">Sunday</th>
            </tr>
          </thead>
          <tbody>
        
            {splitExerciseID.map((split_item: any) => {
                return (
                    <tr>
                        <td>Test</td>
                        <td className="bg-light">{split_item.split_id}</td>
                        <td className="bg-light">{split_item.exercise_name}</td>                        
                    </tr>
                )
            })}

            {/* <tr>
              <td className="bg-light">1</td>
              <td className="bg-light">2</td>
              <td className="bg-light">3</td>
              <td className="bg-light">4</td>
              <td className="bg-light">5</td>
              <td className="bg-light">6</td>
              <td className="bg-light">7</td>
            </tr> */}
          </tbody>
          </table>
    </div>
        <div className="container-fluid position-absolute">
          <div className="container bg-light">
            <p className=" bg-light"> Don't see any exercises? Choose a split: </p>
            <NavLink to="/AllSplits"><p className="btn btn-primary">Choose Split</p> </NavLink>
            <br />
            <br />
            <p className="bg-light ">Go to your weekly split?</p> 
            <NavLink to="/WeeklySplit"><p className="btn btn-primary">Press Here!</p> </NavLink>
            <br />
            <br />
          </div>
        </div>
</div>
    );
};

export default Home;

