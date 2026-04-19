import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import "../styles.scss";

const TopBar = () => {
  const [isAuthFormVisible, setAuthFormVisible] = useState(false);
  const [formType, setFormType] = useState("login");

  const toggleAuthForm = (form) => {
    setFormType(form);
    setAuthFormVisible(true);
  };

  const closeForm = () => {
    setAuthFormVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal")) {
        closeForm();
      }
    };

    if (isAuthFormVisible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isAuthFormVisible]);

  return (
    <div className="top-bar">
      <div className="logo">
        <img src="/images/logo.png" alt="BrainScan Logo" className="logo-image" />
        <h1>BrainScan</h1>
      </div>

      <nav className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/how-it-works">Comment ça marche</Link> {/* ✅ رابط جديد للصفحة */}
        <Link to="/apropos">À propos</Link>
      </nav>

      <div className="auth-buttons">
        <button className="login-btn" onClick={() => toggleAuthForm("login")}>Se connecter</button>
        <button className="signup-btn" onClick={() => toggleAuthForm("signup")}>S'inscrire</button>
      </div>

      {isAuthFormVisible && (
        <div className="modal">
          <Login formType={formType} closeForm={closeForm} />
        </div>
      )}
    </div>
  );
};

export default TopBar;
