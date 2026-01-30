import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // const API_BASE_URL =
  //   window._env_?.REACT_APP_API_BASE_URL || "http://localhost:8080";

  // const receivefromOCH = () => {
  //   const userConfirmed = window.confirm("Will you confirm this request?");
  //   if (userConfirmed) {
  //     console.log("request from OCH");
  //   }
  // };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     receivefromOCH();
  //   }, 5000);
  // }, []);

  return (
    <div
      className="App flex flex-col min-h-screen"
      style={{ background: "RGB(240,241,245)" }}
    >
      <Header />
      <Router>
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Loginpage />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
