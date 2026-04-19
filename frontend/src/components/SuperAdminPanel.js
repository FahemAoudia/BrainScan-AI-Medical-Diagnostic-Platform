import API_BASE_URL from "../config";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, FileText, Calendar, LogOut, Menu, Settings, Users, Trash2, Edit } from "lucide-react";
import "../styles.scss";

const SuperAdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ doctor_code: "", specialty: "",user_id: "" });
  const [newUser, setNewUser] = useState({ doctor_code: "", name: "", specialty: "", status: "pending" });
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [activeTab, setActiveTab] = useState("accueil"); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      alert("⚠️ Accès refusé ! Veuillez vous connecter.");
      navigate("/");
    }

    if (activeTab === "accueil") {
      fetchDoctors();
    } else if (activeTab === "utilisateurs") {
      fetchUsers();
    }
  }, [navigate, activeTab]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/doctors`);
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("❌ Erreur lors du chargement des médecins:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("❌ Erreur lors du chargement des utilisateurs:", error);
    }
  };

  const handleAddDoctor = async () => {
    if (!newDoctor.doctor_code) {
      alert("❌ Veuillez entrer un code médecin.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/doctors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDoctor),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setDoctors([...doctors, result.doctor]);
        setNewDoctor({ doctor_code: "", specialty: "" });
      } else {
        alert(result.detail || "❌ Une erreur est survenue lors de l'ajout du médecin.");
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout du médecin:", error);
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/doctors/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("✅ code Médecin supprimé avec succès !");
        setDoctors(doctors.filter((doctor) => doctor.id !== id));
      } else {
        alert("❌ Erreur lors de la suppression du code médecin.");
      }
    } catch (error) {
      console.error("❌ Erreur lors de la suppression du code médecin:", error);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.doctor_code || !newUser.name) {
      alert("❌ Veuillez entrer un code médecin et un nom.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setUsers([...users, result.user]);
        setNewUser({ doctor_code: "", name: "", specialty: "", status: "pending" });
      } else {
        alert(result.detail || "❌ Une erreur est survenue lors de l'ajout de l'utilisateur.");
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout de l'utilisateur:", error);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (response.ok) {
        alert("✅ Statut de l'utilisateur mis à jour avec succès !");
        fetchUsers(); 
      } else {
        alert("❌ Erreur lors de la mise à jour du statut de l'utilisateur.");
      }
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour du statut de l'utilisateur:", error);
    }
  };
  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("✅ Utilisateur supprimé avec succès !");
        setUsers(users.filter((user) => user.id !== id));
      } else {
        alert("❌ Erreur lors de la suppression de l'utilisateur.");
      }
    } catch (error) {
      console.error("❌ Erreur lors de la suppression de l'utilisateur:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("✅ Déconnexion réussie !");
    navigate("/");
  };

  const filteredUsers = users.filter((user) => {
    const matchesName = user.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesStatus = searchStatus ? user.status === searchStatus : true;
    return matchesName && matchesStatus;
  });

  return (
    <div className="dashboard-container" style={{ background: "linear-gradient(135deg, #ff416c, #ff4b2b)" }}>
      <motion.div
        className={`sidebar ${isOpen ? "open" : "closed"}`}
        initial={{ width: 80 }}
        animate={{ width: isOpen ? 250 : 80 }}
        style={{ background: "linear-gradient(135deg, #ff4b2b, #ff416c)" }}
      >
        <motion.div
          className="menu-icon"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.2 }}
        >
          <Menu size={28} color="#fff" />
        </motion.div>

        <nav className="sidebar-nav">
          <motion.a
            whileHover={{ scale: 1.1 }}
            className="nav-item"
            onClick={() => setActiveTab("accueil")}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Home size={24} color="#fff" />
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                style={{ color: "#fff" }}
              >
                Accueil
              </motion.span>
            )}
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.1 }}
            className="nav-item"
            onClick={() => setActiveTab("utilisateurs")}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Users size={24} color="#fff" />
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                style={{ color: "#fff" }}
              >
                Utilisateurs
              </motion.span>
            )}
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            className="nav-item logout"
            onClick={handleLogout}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <LogOut size={24} color="#fff" />
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                style={{ color: "#fff" }}
              >
                Déconnexion
              </motion.span>
            )}
          </motion.a>
        </nav>
      </motion.div>

      <div className="panel-container">
        <motion.div
          className="panel-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <h2 style={{ color: "#fff" }}>Bienvenue dans votre espace, Super Admin!</h2>
        </motion.div>

        <motion.div
          className="panel-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          {activeTab === "accueil" ? (
            <>
              <h2>Gestion Code des médecins</h2>
              <table className="doctors-table">
                <thead>
                  <tr>
                    <th>Code Médecin</th>
                    <th>Spécialité</th>
                    <th>user_id</th>
                    <th>Actions</th>
                    

                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doctor) => (
                    <tr key={doctor.id}>
                      <td>{doctor.doctor_code}</td>
                      <td>{doctor.specialty}</td>
                      <td>{doctor.user_id}</td>
                      
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteDoctor(doctor.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

<div className="add-doctor-form">
  <h3>Ajouter un nouveau code médecin</h3>
  {/* هنا نضع الكود الذي سيستخدمه الطبيب (مثل 2026) */}
  <input
    type="text"
    placeholder="Code d'inscription (ex: 2026)"
    value={newDoctor.doctor_code}
    onChange={(e) => setNewDoctor({ ...newDoctor, doctor_code: e.target.value })}
  />
  
  {/* هنا نضع التخصص المرتبط بهذا الكود (مثل Cardiologue) */}
  <input
    type="text"
    placeholder="Spécialité (ex: Cardiologue)"
    value={newDoctor.specialty}
    onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
  />
  <button onClick={handleAddDoctor}>Ajouter</button>
</div>
            </>
          ) : (
            <>
              <h2>Gestion des médecins</h2>
              <div className="search-container">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Rechercher par nom"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="search-input"
                />
                <span className="search-icon">🔍</span> 
              </div>
              <select
                value={searchStatus}
                onChange={(e) => setSearchStatus(e.target.value)}
                className="search-select"
              >
                <option value="">Tous les statuts</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <table className="doctors-table">
                <thead>
                  <tr>
                    <th>Code Médecin</th>
                    <th>Nom Médecin</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.doctor_code}</td>
                      <td>{user.name}</td>
                      <td>{user.status}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleUpdateStatus(user.id, user.status === "active" ? "pending" : "active")}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SuperAdminPanel;