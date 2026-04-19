import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Utilisation de la navigation entre les pages
import '../Login.scss';

const Login = ({ formType, closeForm }) => {
    const [isLogin, setIsLogin] = useState(formType === 'login');
    const [userType, setUserType] = useState('patient'); // Par défaut, patient
    const [doctorCode, setDoctorCode] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate(); // ✅ Navigation entre les pages

    useEffect(() => {
        setIsLogin(formType === 'login');
    }, [formType]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔹 Fonction d'inscription d'un nouvel utilisateur
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    role: userType,
                    doctor_code: userType === "doctor" ? doctorCode : null,
                }),
            });

            const result = await response.json();
            console.log("✅ Réponse d'inscription :", result);

            if (response.ok) {
                alert("✅ Inscription réussie ! Veuillez vous connecter.");
                setIsLogin(true);
            } else {
                alert(result.detail || "❌ Une erreur est survenue lors de l'inscription.");
            }
        } catch (error) {
            console.error("❌ Erreur lors de l'inscription :", error);
        }
    };

    // 🔹 Fonction de connexion
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("🔍 Tentative de connexion...");

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    username: formData.email,
                    password: formData.password
                })
            });

            console.log("📡 Requête envoyée au serveur.");

            const result = await response.json();
            console.log("✅ Réponse du serveur :", result);

            if (response.ok) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("role", result.role);  

                alert("✅ Connexion réussie !");

                // ✅ Redirection en fonction du rôle de l'utilisateur
                if (result.role === 'patient') {
                    console.log("🔄 Redirection du patient vers PatientPanel");
                    navigate('/PatientPanel');
                } else if (result.role === 'doctor') {
                    console.log("🔄 Redirection du médecin vers DoctorPanel");
                    navigate('/Doctor-Panel');
                } else if (result.role === 'admin') {
                    console.log("🔄 Redirection de l'administrateur vers SuperAdminPanel");
                    navigate('/SuperAdminPanel');
                } else {
                    console.log("⚠️ Rôle inconnu, redirection vers la page d'accueil.");
                    navigate('/');
                }
            } else {
                alert(result.detail || "❌ Erreur lors de la connexion");
            }
        } catch (error) {
            console.error("❌ Erreur lors de la connexion :", error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-btn" onClick={closeForm}>&times;</span>

                {/* 🔹 Barre latérale pour basculer entre connexion et inscription */}
                <div className={`left-section ${isLogin ? '' : 'move-right'}`}>
                    <h2>{isLogin ? 'Bienvenue de retour !' : 'Rejoignez-nous !'}</h2>
                    <p>{isLogin ? 'Entrez vos informations pour vous connecter' : 'Créez un nouveau compte'}</p>
                    <button onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Créer un compte" : "Se connecter"}
                    </button>
                </div>

                {/* 🔹 Formulaire de connexion ou d'inscription */}
                <div className={`right-section ${isLogin ? '' : 'move-left'}`}>
                    <h2>{isLogin ? 'Connexion' : 'Créer un nouveau compte'}</h2>
                    <form onSubmit={isLogin ? handleLogin : handleRegister}>

                        {/* 🔹 Sélection du type d'utilisateur lors de l'inscription */}
                        {!isLogin && (
                            <>
                                <div className="select-container">
                                    <label htmlFor="userType">Type d'utilisateur :</label>
                                    <select
                                        name="userType"
                                        id="userType"
                                        onChange={(e) => setUserType(e.target.value)}
                                        required
                                    >
                                        <option value="patient">👤 Patient</option>
                                        <option value="doctor">🩺 Médecin</option>
                                    </select>
                                </div>

                                {/* 🔹 Champ du code médecin si l'utilisateur choisit "Médecin" */}
                                {userType === "doctor" && (
                                    <input
                                        type="text"
                                        name="doctorCode"
                                        placeholder="Code médecin (optionnel)"
                                        onChange={(e) => setDoctorCode(e.target.value)}
                                    />
                                )}
                            </>
                        )}

                        {/* 🔹 Champ du nom uniquement lors de l'inscription */}
                        {!isLogin && (
                            <input
                                type="text"
                                name="name"
                                placeholder="Nom d'utilisateur"
                                onChange={handleChange}
                                required
                            />
                        )}

                        {/* 🔹 Champ de l'email */}
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            onChange={handleChange}
                            required
                        />

                        <button type="submit">
                            {isLogin ? 'Se connecter' : "Créer un compte"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
