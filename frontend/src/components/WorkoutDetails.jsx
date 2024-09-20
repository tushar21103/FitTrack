import React, { useState } from "react";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout, onWorkoutDeleted, onWorkoutUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      toast.error("Error Deleting Workout", {
        position: "bottom-right",
      });
    }
    if (response.ok) {
      toast.success("Workout Deleted successfully", {
        position: "bottom-right",
      });
      onWorkoutDeleted();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedWorkout = { title, load, reps };

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "PATCH",
      body: JSON.stringify(updatedWorkout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      toast.error("Error Updating Workout", {
        position: "bottom-right",
      });
    }
    if (response.ok) {
      toast.success("Workout Updated successfully", {
        position: "bottom-right",
      });
      setIsEditing(false);
      onWorkoutUpdated();
    }
  };

  return (
    <div className="workout_details">
      {!isEditing ? (
        <>
          <h3>{workout.title.toUpperCase()}</h3>
          <p>
            <strong>Load(kg): </strong>
            {workout.load}
          </p>
          <p>
            <strong>Reps: </strong>
            {workout.reps}
          </p>
          <p>
            Created{" "}
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </p>
          <p>
            Updated{" "}
            {formatDistanceToNow(new Date(workout.updatedAt), {
              addSuffix: true,
            })}
          </p>
          <span onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </span>
          <button onClick={() => setIsEditing(true)}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
        </>
      ) : (
        <form className="workout-form" onSubmit={handleUpdate}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Workout title"
          />

          <label htmlFor="load">Load (kg)</label>
          <input
            type="number"
            id="load"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            placeholder="Load in kg"
          />

          <label htmlFor="reps">Reps</label>
          <input
            type="number"
            id="reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="Number of reps"
          />

          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              Update Workout
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default WorkoutDetails;
