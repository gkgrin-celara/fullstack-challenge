import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Notes from "./components/Notes";
import Urls from "./components/Urls";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (

    <Router>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>⚛️ React + Vite Frontend</h1>
        <p>Backend says: {message || "Loading..."}</p>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Link to="/notes">
                  <button style={{ margin: "0.5rem", padding: "0.5rem 1rem" }}>
                    Notes
                  </button>
                </Link>
                <Link to="/urls">
                  <button style={{ margin: "0.5rem", padding: "0.5rem 1rem" }}>
                    URLs
                  </button>
                </Link>
              </div>
            }
          />
          <Route path="/notes" element={<Notes />} />
          <Route path="/urls" element={<Urls />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
