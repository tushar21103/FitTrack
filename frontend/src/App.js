import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import WorkoutDetails from "./components/WorkoutDetails"; 
import WorkoutForm from "./components/WorkoutForm";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/WorkoutDetails" element={<WorkoutDetails />} />
          <Route path="/WorkoutForm" element={<WorkoutForm />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
