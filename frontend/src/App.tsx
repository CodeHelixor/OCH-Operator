import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { TabProvider } from "./context/TabContext";

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const bgImage =
    (process.env.PUBLIC_URL || "") +
    (isLoginPage ? "/loginbackground.jpg" : "/" + encodeURIComponent("system background.jpg"));

  return (
    <div
      className="App app-background flex flex-col min-h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header />
      <div className="flex-grow flex flex-col min-h-0">
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
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <TabProvider>
        <AppContent />
      </TabProvider>
    </Router>
  );
}

export default App;
