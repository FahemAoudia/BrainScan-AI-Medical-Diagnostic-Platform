import API_BASE_URL from "../config";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, FileText, Calendar, LogOut, Menu } from "lucide-react";
import "../styles.scss";
import CalendarComponent from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ChatbotComponent from "../components/ChatbotComponent";
import ChatComponent from "../components/ChatComponent"; // استيراد مكون المحادثة
import { MessageCircle } from "lucide-react";

const PatientPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const availableTimes = ["09:00", "10:00", "14:00", "16:00"];
  const [activePage, setActivePage] = useState("Accueil");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [patientName, setPatientName] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editAppointmentId, setEditAppointmentId] = useState(null);
  const [reports, setReports] = useState([]);
  const [patientId, setPatientId] = useState(null); 
  const [filterName, setFilterName] = useState(""); // ✅ Correction : Déclaration de la variable filterName

  const navigate = useNavigate();

  useEffect(() => {
    fetchPatientInfo();
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (activePage === "Rapports" && patientId) {
      fetchReports();
    }
  }, [activePage, patientId]);

  const fetchReports = async () => {
    if (!patientId) {
      console.warn("⚠️ Aucun ID patient trouvé !");
      return;
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/reports/mysql/${patientId}`);
      const data = await response.json();
  
      if (Array.isArray(data)) {
        setReports(data);
      } else {
        setReports([]);
        console.warn("⚠️ Aucune donnée de rapport trouvée !");
      }
    } catch (error) {
      console.error("❌ Erreur lors du chargement des rapports:", error);
      setReports([]);
    }
  };





  const enterEditMode = (appointment) => {
    setEditMode(true);
    setEditAppointmentId(appointment.id);
    setSelectedDate(new Date(appointment.date));
    setSelectedTime(appointment.time);
  };

  const handleLogout = () => {
    console.log("🚪 Déconnexion...");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    setSelectedDoctor(doctorId);
    
    if (doctorId) {
        console.log("🧑‍⚕️ Médecin sélectionné:", doctorId);
        fetchAppointmentsForDoctor(doctorId); // ✅ Récupérer les rendez-vous pour le médecin sélectionné et le patient actuel
    } else {
        setAppointments([]); // Si aucun médecin n'est sélectionné, vider la liste des rendez-vous
    }
};

const handleUpdateAppointment = async () => {
  if (!selectedDate || !selectedTime) {
      setMessage("❌ Veuillez sélectionner une date et une heure!");
      return;
  }

  const updatedAppointment = {
      appointment_date: selectedDate.toISOString().split("T")[0],
      appointment_time: selectedTime,
      patient_id: patientId,
      doctor_id: selectedDoctor
  };

  try {
      const response = await fetch(`${API_BASE_URL}/api/appointments/${editAppointmentId}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(updatedAppointment)
      });

      if (response.ok) {
          setMessage("✅ Rendez-vous modifié avec succès!");
          setEditMode(false);
          setEditAppointmentId(null);
          fetchAppointmentsForDoctor(selectedDoctor); // ✅ Mettre à jour les rendez-vous après modification
      } else {
          let errorMessage = "❌ Échec de la modification du rendez-vous.";
          try {
              const errorText = await response.text();
              errorMessage = `❌ Échec de la modification du rendez-vous: ${errorText || "Une erreur inconnue s'est produite"}`;
          } catch (textError) {
              console.warn("⚠️ Impossible de lire la réponse d'erreur:", textError);
          }
          setMessage(errorMessage);
      }
  } catch (error) {
      console.error("❌ Erreur lors de la modification du rendez-vous:", error);
      setMessage("❌ Une erreur s'est produite lors de la tentative de modification du rendez-vous.");
  }
};



  const fetchPatientInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      console.log("📢 Données du patient récupérées:", data);

      if (response.ok && data.name) {
        setPatientName(data.name);
        setPatientId(data.id);
      } else {
        console.error("❌ Échec de la récupération des données du patient:", data);
        setPatientName("Utilisateur inconnu");
        setPatientId(null);
      }
    } catch (error) {
      console.error("❌ Erreur lors du chargement des données du patient:", error);
      setPatientName("Utilisateur inconnu");
      setPatientId(null);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments/doctors`);
      let data = await response.json();

      console.log("📢 Données des médecins récupérées:", data);

      if (!Array.isArray(data)) {
        console.error("❌ Les données récupérées ne sont pas un tableau:", data);
        data = [];
      }

      setDoctors(data);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des médecins:", error);
      setDoctors([]);
    }
  };

  const fetchAppointmentsForDoctor = async (doctorId) => {
    if (!patientId) {
        console.error("❌ ID du patient non trouvé.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/appointments/doctor/${doctorId}/patient/${patientId}`, {
            method: "GET",
        });

        const data = await response.json();
        console.log("📅 Rendez-vous réservés pour le patient:", data);

        if (response.ok && Array.isArray(data)) {
            setAppointments(data);
        } else {
            console.error("❌ Échec de la récupération des rendez-vous ou données incorrectes:", data);
            setAppointments([]);
        }
    } catch (error) {
        console.error("❌ Erreur lors du chargement des rendez-vous:", error);
        setAppointments([]);
    }
};


const bookAppointment = async () => {
  if (!selectedDoctor) {
      setMessage("❌ Veuillez choisir un médecin avant de réserver.");
      return;
  }
  if (!selectedDate || !selectedTime) {
      setMessage("❌ Veuillez sélectionner une date et une heure pour le rendez-vous!");
      return;
  }
  if (!phone) {
    console.log("📱 Numéro de téléphone non saisi. Le numéro enregistré sera utilisé s'il est disponible.");
}

  const appointment_date = selectedDate.toISOString().split("T")[0];
  const appointment_time = selectedTime;

  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
  });

  const userData = await response.json();
  const patient_id = userData.id;

  const appointmentData = {
      patient_id,
      doctor_id: selectedDoctor,
      appointment_date,
      appointment_time,
      phone: phone || userData.phone, // ✅ Utiliser le numéro enregistré si l'utilisateur n'en a pas saisi de nouveau
    };

  console.log("📨 Données envoyées au serveur:", appointmentData);

  try {
      const response = await fetch(`${API_BASE_URL}/api/appointments/book`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointmentData),
      });

      const data = await response.json();
      if (response.ok) {
          setMessage(`✅ Rendez-vous réservé avec succès chez le médecin le ${appointment_date} à ${appointment_time}`);
          fetchAppointmentsForDoctor(selectedDoctor); // ✅ Mettre à jour le tableau automatiquement après la réservation
      } else {
          console.error("❌ Erreur lors de la réservation:", data);
          setMessage(`❌ Échec de la réservation: ${data.detail}`);
      }
  } catch (error) {
      console.error("❌ Erreur lors de l'envoi de la demande:", error);
      setMessage("❌ Une erreur s'est produite lors de la tentative de réservation du rendez-vous.");
  }
};


  const deleteAppointment = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // ✅ Ajouter le token si nécessaire pour l'authentification
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (response.ok) {
            setMessage("✅ Rendez-vous annulé avec succès!");
            fetchAppointmentsForDoctor(selectedDoctor); // ✅ Mettre à jour le tableau automatiquement après la suppression
            // Assurez-vous que `fetchAppointments` fonctionne correctement ici
        } else {
            const errorData = await response.json();
            console.error("❌ Erreur lors de l'annulation du rendez-vous:", errorData.detail);
            setMessage(`❌ Échec de l'annulation du rendez-vous: ${errorData.detail}`);
        }
    } catch (error) {
        console.error("❌ Erreur lors de l'annulation du rendez-vous:", error);
    }
};


  return (
    <div className="dashboard-container">
      <motion.div
        className={`sidebar ${isOpen ? "open" : "closed"}`}
        initial={{ width: 80 }}
        animate={{ width: isOpen ? 250 : 80 }}
      >
        <motion.div className="menu-icon" onClick={() => setIsOpen(!isOpen)} whileHover={{ scale: 1.2 }}>
          <Menu size={28} />
        </motion.div>

        <nav className="sidebar-nav">
          <motion.a whileHover={{ scale: 1.1 }} className={`nav-item ${activePage === "Accueil" ? "active" : ""}`} onClick={() => setActivePage("Accueil")}>
            <Home size={24} />
            {isOpen && <motion.span>Accueil</motion.span>}
          </motion.a>

          <motion.a whileHover={{ scale: 1.1 }} className={`nav-item ${activePage === "Rapports" ? "active" : ""}`} onClick={() => setActivePage("Rapports")}>
            <FileText size={24} />
            {isOpen && <motion.span>Rapports</motion.span>}
          </motion.a>

          <motion.a whileHover={{ scale: 1.1 }} className={`nav-item ${activePage === "Rendez-vous" ? "active" : ""}`} onClick={() => setActivePage("Rendez-vous")}>
            <Calendar size={24} />
            {isOpen && <motion.span>Rendez-vous</motion.span>}
          </motion.a>

          <motion.a
          whileHover={{ scale: 1.1 }}
          className={`nav-item ${activePage === "Chat" ? "active" : ""}`}
          onClick={() => setActivePage("Chat")}
        >
          <MessageCircle size={24} /> {/* أيقونة المحادثة */}
          {isOpen && <motion.span>Chat</motion.span>}
        </motion.a>

          <motion.a whileHover={{ scale: 1.1 }} className="nav-item logout" onClick={handleLogout}>
            <LogOut size={24} />
            {isOpen && <motion.span>Déconnexion</motion.span>}
          </motion.a>
        </nav>
      </motion.div>

      <div className="panel-container">
        {activePage === "Accueil" && (
          <motion.div className="panel-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2>Bienvenue, {patientName}!</h2>
            <p>Vous pouvez consulter vos résultats et vos rapports médicaux ici.</p>
          </motion.div>
        )}




{activePage === "Rapports" && (
  <motion.div className="panel-content">
    <h2>📄 Vos Rapports Médicaux</h2>

    {reports.length > 0 ? (
      <table className="appointments-table">
        <thead>
          <tr>
          <th>Patient</th>
            <th>📅 Date</th>
            <th>🩺 Diagnostic</th>
            <th>📄 Rapport</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <motion.tr
              key={report.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <td>{patientName}</td>
              <td>{new Date(report.created_at).toLocaleDateString()}</td>
              <td>{report.diagnosis}</td>
              <td>
  <motion.button
    onClick={() => window.open(`${API_BASE_URL}/${report.report_url.replace(/^\//, '')}`, "_blank")}
    className="confirm"
    whileHover={{ scale: 1.05 }}
  >
    Télécharger
  </motion.button>
</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>❌ Aucun rapport disponible pour le moment.</p>
    )}
  </motion.div>
)}








{activePage === "Chat" && (
  <motion.div className="chat-panel">
    <h2>💬 Discuter avec un médecin</h2>

    {/* شريط البحث */}
    <input
      type="text"
      placeholder="🔍 Rechercher un médecin..."
      value={filterName}
      onChange={(e) => setFilterName(e.target.value)}
      className="search-bar"
    />

    {/* قائمة الأطباء (تظهر فقط عند البحث) */}
    {filterName && !selectedDoctor && ( // إخفاء قائمة الأطباء عند فتح المحادثة
      <div className="doctor-list">
        {doctors
          .filter((doc) => doc.doctor_name.toLowerCase().includes(filterName.toLowerCase()))
          .map((doc) => (
            <motion.div
              key={doc.doctor_id}
              className="doctor-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedDoctor(doc); // تحديد الطبيب
                setFilterName(""); // إعادة ضبط البحث
              }}
            >
              {doc.doctor_name}
            </motion.div>
          ))}
      </div>
    )}

    {/* إظهار المحادثة */}
    {selectedDoctor && (
      <ChatComponent
        userId={patientId}
        recipientId={selectedDoctor.doctor_id}
        chatId={`${patientId}_${selectedDoctor.doctor_id}`}
        recipientName={selectedDoctor.doctor_name}
        senderType="patient"
        closeChat={() => {
        }}
      />
    )}
  </motion.div>
)}






{activePage === "Rendez-vous" && (
          <motion.div className="appointment-panel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2>Planifier Rendez-vous</h2>
            <p>Sélectionnez une date et une heure pour votre rendez-vous.</p>

            <div className="select-container">
              <label>👨‍⚕️ Choisissez un médecin:</label>
              <select value={selectedDoctor} onChange={handleDoctorChange}>
                <option value="">-- Choisissez un médecin --</option>
                {Array.isArray(doctors) && doctors.length > 0 ? (
                  doctors.map((doc) => (
                    <option key={doc.doctor_id} value={doc.doctor_id}>
                      {doc.doctor_name}
                    </option>
                  ))
                ) : (
                  <option disabled>❌ Aucun médecin disponible</option>
                )}
              </select>
            </div>

            <div className="calendar-container">
              <CalendarComponent onChange={setSelectedDate} value={selectedDate} />
            </div>

            <div className="time-selection">
              <h3>Horaires disponibles :</h3>
              <div className="time-options">
                {availableTimes.map((time) => (
                  <motion.button key={time} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={`time-button ${selectedTime === time ? "selected" : ""}`} onClick={() => setSelectedTime(time)}>
                    {time}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="input-container">
              <label>📞 Entrez votre numéro de téléphone:</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Exemple: 0600000000" />
            </div>

            <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="confirm-button"
    onClick={bookAppointment}
    disabled={!selectedDoctor || !selectedDate || !selectedTime} // ✅ Activer le bouton en fonction du médecin, de la date et de l'heure uniquement
>
                {loading ? "🔄 Réservation en cours..." : "Confirmer le rendez-vous"}
            </motion.button>
            {message && <p className="message">{message}</p>}

            <h2>Rendez-vous réservés pour ce médecin:</h2>
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Heure</th>
                  <th>Nom du patient</th>
                  <th>Numéro de téléphone</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
    {appointments.length > 0 ? (
        appointments.map((appointment) => (
            <tr key={appointment.id}>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.patient_name || "Inconnu"}</td>
                <td>{appointment.phone || "Non disponible"}</td>
                <td>{appointment.status}</td>
                <td>
    <div className="action">
        <motion.button 
            onClick={() => deleteAppointment(appointment.id)} 
            className="cancel"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            Annuler
        </motion.button>
        
        <motion.button 
            onClick={() => enterEditMode(appointment)} 
            className="confirm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            Modifier
        </motion.button>

    </div>
</td>

</tr>
        ))
    ) : (
        <tr>
            <td colSpan="6">❌ Aucun rendez-vous pour ce médecin et ce patient actuel.</td>
        </tr>
    )}
    
</tbody>

            </table>

            {editMode && (
    <div className="edit-appointment-box">
        <h3>Modifier le rendez-vous :</h3>
        
        <div className="calendar-container">
            <CalendarComponent onChange={setSelectedDate} value={selectedDate} />
        </div>
        
        <div className="time-selection">
            <h3>Horaires disponibles :</h3>
            <div className="time-options">
                {availableTimes.map((time) => (
                    <motion.button 
                        key={time} 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.9 }} 
                        className={`time-button ${selectedTime === time ? "selected" : ""}`} 
                        onClick={() => setSelectedTime(time)}
                    >
                        {time}
                    </motion.button>
                ))}
            </div>
        </div>
        
        <div className="action">
            <button onClick={handleUpdateAppointment} className="confirm">
                Mettre à jour le rendez-vous
            </button>

            <button onClick={() => setEditMode(false)} className="cancel">
                Annuler la modification
            </button>
        </div>
        
        <ChatbotComponent />

    </div>
    
)}
      
          </motion.div>
        )}
      </div>
      <ChatbotComponent />

    </div>
    
  );
  
};

export default PatientPanel;
