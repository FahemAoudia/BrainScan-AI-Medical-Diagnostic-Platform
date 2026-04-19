import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage";
import Apropos from "./components/Apropos";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import PatientPanel from "./components/PatientPanel";
import DoctorPanel from "./components/DoctorPanel";
import SuperAdminPanel from "./components/SuperAdminPanel";
import UserPanel from "./components/UserPanel";
import Login from "./components/Login";
import "./styles.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/apropos" element={<Apropos />} />
        <Route path="/user-panel" element={<UserPanel />} />
        <Route path="/PatientPanel" element={<PatientPanel />} />
        <Route path="/doctor-panel" element={<DoctorPanel />} />
        <Route path="/SuperAdminPanel" element={<SuperAdminPanel />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </Router>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
