import React, { useState } from "react";
import { toast } from 'react-toastify';


const WorkoutForm = ({onWorkoutAdded}) => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      toast.error('Error Adding Workout', {
        position: "bottom-right"
      });
    }
    if (response.ok) {
      setError(null);
      toast.success('Workout Added Successfully!', {
        position: "bottom-right"
      });
      setTitle('');
      setLoad('');
      setReps('');
      onWorkoutAdded();
    }
  };

  return (
    <form className="workoutForm" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <div className="form-fields">
        <div>
          <label htmlFor="title">Exercise Name</label>
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <label htmlFor="load">Load (kgs)</label>
          <input
            type="number"
            id="load"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
          />
        </div>
        <div>
          <label htmlFor="reps">Number of Reps</label>
          <input
            type="number"
            id="reps"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
          />
        </div>
      </div>

      <button type="submit">Add Exercise</button>
    </form>
  );
};

export default WorkoutForm;
