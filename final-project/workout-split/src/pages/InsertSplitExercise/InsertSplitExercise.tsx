import React from 'react';
import './InsertSplitExercise.css';


const InsertSplitExercise: React.FC = () => {
    return (
        <div className = "/InsertSplitExercise">
        <div className="row">
  <div className="col-6 display-4 p-3 "><h3 className = 'bg-light'>Add Exercise to the DataBase!</h3>
    <form>
      <div className="form-group">
        <label id="exercise-name" className = 'bg-light p-3'>Exercise Name</label>
        <input type="text" className="form-control" id="exercise-name" placeholder="Enter exercise name"></input>
      </div>
      <div className="form-group">
        <label id="times-per-week" className = 'bg-light p-3'>Times Per Week</label>
        <input type="number" className="form-control" id="times-per-week" placeholder="Enter number of times per week"></input>
      </div>
      <div className="form-group">
        <label id="time-of-week" className = 'bg-light p-3'>Time of Week</label>
        <input type="text" className="form-control" id="time-of-week" placeholder="Enter time of week"></input>
      </div>
      <div className="form-group">
        <label id="sets" className = 'bg-light p-3'>Sets</label>
        <input type="number" className="form-control" id="sets" placeholder="Enter number of sets"></input>
      </div>
      <div className="form-group">
        <label id="reps" className = 'bg-light p-3'>Reps</label>
        <input type="number" className="form-control" id="reps" placeholder="Enter number of reps"></input>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
</div>
<br />
<br />
<br />
<br />
<br />
<br />

</div>
);
};

export default InsertSplitExercise;