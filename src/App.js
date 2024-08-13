import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ColombiaDash from "./pages/colombian_dash";
import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dash_colombia" />} />
        <Route path="/dash_colombia" element={<ColombiaDash />} />
      </Routes>
    </Router>
  );
}

export default App;
