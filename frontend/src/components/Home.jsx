import React, { useEffect, useState } from "react";
import WorkoutDetails from "./WorkoutDetails";
import WorkoutForm from "./WorkoutForm";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };
    fetchWorkout();
  }, [shouldFetch]);

  const handleWorkoutChange = () => {
    setShouldFetch(!shouldFetch);
  };

  return (
    <div className="home">
      <div className="home_container">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails 
              key={workout._id} 
              workout={workout} 
              onWorkoutDeleted={handleWorkoutChange} 
              onWorkoutUpdated={handleWorkoutChange} // Pass this to handle updates
            />
          ))}
      </div>
      <div>
        <WorkoutForm onWorkoutAdded={handleWorkoutChange} />
      </div>
    </div>
  );
};

export default Home;
