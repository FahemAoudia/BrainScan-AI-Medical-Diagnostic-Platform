import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Calendar, Clock, LogOut, Menu, Stethoscope } from "lucide-react";
import "../styles.scss";
import CalendarComponent from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ChatbotComponent from "../components/ChatbotComponent";
import ChatComponent from "../components/ChatComponent"; // استيراد مكون المحادثة
import { MessageCircle } from "lucide-react";

const DoctorPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [activePage, setActivePage] = useState("Accueil");
    const [doctorName, setDoctorName] = useState("Utilisateur inconnu");
    const [doctorId, setDoctorId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [unavailableType, setUnavailableType] = useState("fullDay"); // "fullDay" أو "timeRange"
const [startTime, setStartTime] = useState("00:00"); 
const [endTime, setEndTime] = useState("23:59");
const [filterName, setFilterName] = useState(""); 
const [filterStartDate, setFilterStartDate] = useState(null);
const [filterEndDate, setFilterEndDate] = useState(null);
const [showTodayOnly, setShowTodayOnly] = useState(false); 
const [selectedPatient, setSelectedPatient] = useState(null);
const [patientReports, setPatientReports] = useState([]);
const [searchPatient, setSearchPatient] = useState(""); // ✅ Ajout du filtre pour rechercher un patient


    useEffect(() => {
        fetchDoctorInfo();
    }, []);

    useEffect(() => {
        if (doctorId) {
            fetchAppointments();
        }
    }, [doctorId]);
   
   
    

    // ✅ Récupérer les informations du médecin
    const fetchDoctorInfo = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch("http://localhost:5000/api/users/me", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (response.ok) {
                setDoctorName(data.name);
                setDoctorId(data.id);
            } else {
                console.error("❌ Échec de la récupération des informations du médecin:", data);
            }
        } catch (error) {
            console.error("❌ Erreur lors du chargement des informations du médecin:", error);
        }
    };

    // ✅ Récupérer les rendez-vous réservés
    const fetchAppointments = async () => {
        try {
            console.log("📡 Fetching appointments...");
    
            const response = await fetch(
                `http://localhost:5000/api/doctor_calendar/doctor/${doctorId}`
            );
    
            const data = await response.json();
            console.log("📥 API Response:", data);
    
            if (Array.isArray(data) && data.length > 0) {
                setAppointments(data);
            } else {
                console.warn("⚠️ Aucun rendez-vous trouvé !");
                setAppointments([]); 
            }
        } catch (error) {
            console.error("❌ Erreur lors du chargement des rendez-vous:", error);
            setAppointments([]);
        }
    };
    
    
    
    

    // ✅ Déconnexion
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // ✅ تغيير الصفحة النشطة
    const changePage = (page) => {
        setActivePage(page); // تحديث الصفحة النشطة
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("❌ Veuillez sélectionner une image IRM");
            return;
        }
    
        setLoading(true);
        setResult(null);
    
        const formData = new FormData();
        formData.append("file", selectedFile);
    
        try {
            const response = await fetch("http://localhost:5000/api/ai/predict", {
                method: "POST",
                body: formData,
            });
    
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("❌ Erreur lors du téléchargement de l'image:", error);
            alert("❌ Une erreur s'est produite lors de l'analyse de l'image");
        } finally {
            setLoading(false);
        }
    };


    const handleGenerateReport = async () => {
        if (!result || !selectedPatient) {
            alert("❌ Aucune analyse à ajouter au rapport.");
            return;
        }
    
        const reportData = {
            patient_id: Number(selectedPatient.patient_id),
            doctor_id: Number(doctorId),
            diagnosis: result.prediction || "unknown",
            confidence: parseFloat(result.confidence) || 0,
            scan_image_url: result.image_url || ""  // ✅ Utiliser l'image enregistrée sur le serveur
        };
    
        try {
            const response = await fetch("http://localhost:5000/api/reports/mysql/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reportData)
            });
    
            const data = await response.json();
            console.log("📥 Réponse de l'API:", data);
    
            if (response.ok && data.pdf_url) {
                alert("✅ Le rapport a été généré avec succès !");
                downloadReport(data.pdf_url, selectedPatient.patient_id);
            } else {
                console.warn("⚠️ L'API n'a pas renvoyé de lien de rapport:", data);
                alert("⚠️ Le rapport a été généré mais aucun lien de téléchargement n'a été trouvé !");
            }
        } catch (error) {
            console.error("❌ Erreur lors de la génération du rapport:", error);
        }
    };
    
    
// ✅ Fonction de téléchargement automatique du rapport
const downloadReport = (reportUrl, patientId) => {
    if (!reportUrl) {
        alert("❌ Impossible de télécharger le rapport. URL non valide.");
        return;
    }

    // ✅ Corriger l'URL pour qu'il soit complet
    const fullUrl = reportUrl.startsWith("http") ? reportUrl : `http://localhost:5000${reportUrl}`;

    console.log("🔗 Ouverture du rapport dans une nouvelle fenêtre:", fullUrl);

    // ✅ Ouvrir le rapport dans une nouvelle fenêtre
    const link = document.createElement("a");
    link.href = fullUrl;
    link.target = "_blank"; // Ouvrir le lien dans une nouvelle fenêtre
    link.rel = "noopener noreferrer"; // Pour des raisons de sécurité
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};    

const handleSetUnavailable = async () => {
    if (!selectedDate) {
        alert("❌ Veuillez sélectionner une date");
        return;
    }

    if (unavailableType === "timeRange" && (!startTime || !endTime)) {
        alert("❌ Veuillez spécifier une plage horaire");
        return;
    }

    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/appointments/unavailable", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                doctor_id: doctorId,
                date: selectedDate.toISOString().split('T')[0], // Convertir la date au format YYYY-MM-DD
                type: unavailableType, // "fullDay" ou "timeRange"
                start_time: startTime, // Seulement si le type est "timeRange"
                end_time: endTime, // Seulement si le type est "timeRange"
            }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("✅ Le rendez-vous a été marqué comme indisponible avec succès");
            fetchAppointments(); // Mettre à jour la liste des rendez-vous
        } else {
            console.error("❌ Échec de la marque du rendez-vous comme indisponible:", data);
            alert("❌ Une erreur s'est produite lors de la marque du rendez-vous comme indisponible");
        }
    } catch (error) {
        console.error("❌ Erreur lors de la marque du rendez-vous comme indisponible:", error);
        alert("❌ Une erreur s'est produite lors de la marque du rendez-vous comme indisponible");
    }
};


    const filteredAppointments = appointments.filter((appointment) => {
        if (filterName && !appointment.patient_name.toLowerCase().includes(filterName.toLowerCase())) {
            return false;
        }
    
        const appointmentDate = new Date(appointment.date);
        if (filterStartDate && appointmentDate < new Date(filterStartDate)) {
            return false;
        }
        if (filterEndDate && appointmentDate > new Date(filterEndDate)) {
            return false;
        }
    
        if (showTodayOnly) {
            const today = new Date();
            if (
                appointmentDate.getDate() !== today.getDate() ||
                appointmentDate.getMonth() !== today.getMonth() ||
                appointmentDate.getFullYear() !== today.getFullYear()
            ) {
                return false;
            }
        }
    
        return true;
    });

    const handleSelectPatient = (appointment) => {
        console.log("🟢 Patient sélectionné:", appointment);
    
        if (!appointment.patient_id) {
            console.error("❌ Aucun ID patient trouvé !");
            alert("❌ Erreur : Aucun ID patient trouvé.");
            return;
        }
    
        console.log("✅ ID patient détecté:", appointment.patient_id); 
    
        setSelectedPatient(appointment);
        setActivePage("Consultations");
    
        fetchPatientReports(appointment.patient_id);
    };
    

    const handleDownloadReport = async (patientId) => {
        if (!patientId) {
            alert("❌ Aucun patient sélectionné.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/api/reports/mysql/${patientId}`);
            if (!response.ok) {
                throw new Error("❌ Erreur lors de la récupération du rapport.");
            }
    
            const data = await response.json();
            if (!data.length || !data[0].report_url) {
                alert("❌ Aucun fichier PDF trouvé.");
                return;
            }
    
            const link = document.createElement("a");
            link.href = `http://localhost:5000/${data[0].report_url}`;
            link.setAttribute("download", `Rapport_Patient_${patientId}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("❌ Erreur lors du téléchargement du rapport:", error);
            alert("❌ Une erreur s'est produite lors du téléchargement du rapport.");
        }
    };

const fetchPatientReports = async (patientId) => {
    try {
        const response = await fetch(`http://localhost:5000/api/reports/mysql/${patientId}`);
        if (response.ok) {
            const data = await response.json();
            setPatientReports(data);
        } else {
            console.error("❌ Erreur lors de la récupération des rapports :", response.statusText);
            setPatientReports([]);
        }
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des rapports :", error);
        setPatientReports([]);
    }
};    
    return (
        <div className="dashboard-container">
            <motion.div
                className={`sidebar ${isOpen ? "open" : "closed"}`}
                initial={{ width: 80 }}
                animate={{ width: isOpen ? 250 : 80 }}
            >
                <motion.div
                    className="menu-icon"
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.2 }}
                >
                    <Menu size={28} />
                </motion.div>

                <nav className="sidebar-nav">
                    <motion.a
                        whileHover={{ scale: 1.1 }}
                        className={`nav-item ${activePage === "Accueil" ? "active" : ""}`}
                        onClick={() => changePage("Accueil")} 
                    >
                        <Home size={24} />
                        {isOpen && <motion.span>Accueil</motion.span>}
                    </motion.a>

                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        className={`nav-item ${activePage === "Consultations" ? "active" : ""}`}
                        onClick={() => changePage("Consultations")} 
                    >
                        <Stethoscope size={24} color="#fff" />
                        {isOpen && <motion.span>Consultations</motion.span>}
                    </motion.a>

                    <motion.a
                        whileHover={{ scale: 1.1 }}
                        className={`nav-item ${activePage === "Appointments" ? "active" : ""}`}
                        onClick={() => changePage("Appointments")} 
                    >
                        <Calendar size={24} />
                        {isOpen && <motion.span>Rendez-vous</motion.span>}
                    </motion.a>

                    <motion.a
                    whileHover={{ scale: 1.1 }}
                    className={`nav-item ${activePage === "Unavailable" ? "active" : ""}`}
                    onClick={() => changePage("Unavailable")} 
                >
                    <Clock size={24} />
                    {isOpen && <motion.span>Indisponibilité</motion.span>}
                    </motion.a>
                    <motion.a
                    whileHover={{ scale: 1.1 }}
                    className={`nav-item ${activePage === "Chat" ? "active" : ""}`}
                    onClick={() => setActivePage("Chat")}
                    >
                    <MessageCircle size={24} /> {/* أيقونة المحادثة */}
                    {isOpen && <motion.span>Chat</motion.span>}
                    </motion.a>

                    <motion.a
                        whileHover={{ scale: 1.1 }}
                        className="nav-item logout"
                        onClick={handleLogout}
                    >
                        <LogOut size={24} />
                        {isOpen && <motion.span>Déconnexion</motion.span>}
                    </motion.a>
                </nav>
            </motion.div>

            <div className="panel-container">
                {activePage === "Accueil" && (
                    <motion.div
                        className="panel-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Bienvenue, Dr. {doctorName}!</h2>
                        <p>Gérez vos rendez-vous et disponibilités ici.</p>
                    </motion.div>
                )}

{activePage === "Chat" && (
  <motion.div className="chat-panel">
    <h2>💬 Discuter avec un patient</h2>

    {/* شريط البحث */}
    <input
      type="text"
      placeholder="🔍 Rechercher un patient..."
      value={searchPatient}
      onChange={(e) => setSearchPatient(e.target.value)}
      className="search-bar"
    />

    {/* قائمة المرضى (تظهر فقط عند البحث) */}
    {searchPatient && !selectedPatient && ( // إخفاء قائمة المرضى عند فتح المحادثة
      <div className="patient-list">
        {[...new Map(
          appointments
            .filter((appointment) =>
              appointment.patient_name.toLowerCase().includes(searchPatient.toLowerCase())
            )
            .map((appointment) => [appointment.patient_id, appointment])
        ).values()].map((uniqueAppointment) => (
          <motion.div
            key={uniqueAppointment.patient_id}
            className="patient-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              console.log("📌 Sélectionner un patient :", uniqueAppointment);
              setSelectedPatient(uniqueAppointment); // تحديد المريض
              setSearchPatient(""); // إعادة ضبط البحث
            }}
          >
            {uniqueAppointment.patient_name}
          </motion.div>
        ))}
      </div>
    )}

    {/* إظهار المحادثة */}
    {selectedPatient && (
      <ChatComponent
        userId={doctorId}
        recipientId={selectedPatient.patient_id}
        chatId={`${selectedPatient.patient_id}_${doctorId}`}
        recipientName={selectedPatient.patient_name}
        senderType="doctor"
        closeChat={() => {
          console.log("🔙 Fermer la conversation, réafficher `chat-panel`");
          setSelectedPatient(null); // إعادة تعيين selectedPatient إلى null
        }}
      />
    )}
  </motion.div>
)}





{activePage === "Consultations" && selectedPatient && (
    <motion.div
        className="panel-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
        <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            Consultations
        </motion.h2>
        <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            Gérez vos consultations ici.
        </motion.p>

        <motion.div 
            className="patient-info" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
        >
            <h3>🩺 Informations du Patient</h3>
            <p><strong>👤 Nom :</strong> {selectedPatient.patient_name}</p>
            <p><strong>📧 Email :</strong> {selectedPatient.patient_email}</p>
            <p><strong>📅 Date :</strong> {selectedPatient.date}</p>
            <p><strong>⏰ Heure :</strong> {selectedPatient.time}</p>
        </motion.div>

        <motion.div
            className="ai-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
        >
            <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                Analyse d'IRM
            </motion.h3>

            <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="upload-button"
                onClick={() => fileInputRef.current.click()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
            >
                Choisir un fichier
            </motion.button>

            {imagePreview && (
                <motion.img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                />
            )}

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="analyze-button"
                onClick={handleUpload}
                disabled={loading}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
            >
                {loading ? "🔄 Analyse en cours..." : "🔍 Analyser l’IRM"}
            </motion.button>

            {result && (
    <motion.div
        className="result-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
    >
        <h4>⚡ Résultat :</h4>
        <p><strong>Diagnostic :</strong> {result.prediction}</p>
        <p><strong>Confiance :</strong> {result.confidence}%</p>

        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="confirm"
            onClick={handleGenerateReport}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            
        >
             Télécharger le rapport 📑
        </motion.button>
    </motion.div>
)}                     
   </motion.div>
                    </motion.div>
                )}

{activePage === "Appointments" && (
    <motion.div
        className="panel-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
        <h2>Liste des Rendez-vous</h2>

        {/* بار التصفية */}
        <div className="filter-bar">
            <div className="filter-group">
                <label>Filtrer par nom:</label>
                <input
                    type="text"
                    placeholder="Nom du patient"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                />
            </div>

            <div className="filter-group">
                <label>Filtrer par date:</label>
                <input
                    type="date"
                    value={filterStartDate || ""}
                    onChange={(e) => setFilterStartDate(e.target.value)}
                />
                <span>à</span>
                <input
                    type="date"
                    value={filterEndDate || ""}
                    onChange={(e) => setFilterEndDate(e.target.value)}
                />
            </div>

            <div className="filter-group">
                <label>
                    <input
                        type="checkbox"
                        checked={showTodayOnly}
                        onChange={(e) => setShowTodayOnly(e.target.checked)}
                    />
                    Afficher les rendez-vous d'aujourd'hui seulement
                </label>
            </div>
        </div>

        {filteredAppointments.length > 0 ? (
            <table className="appointments-table">
                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>Examiner</th>
                    </tr>
                </thead>
                <tbody>
    {filteredAppointments.map((appointment) => (
        <motion.tr
            key={appointment.patient_id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
        >
            <td>{appointment.patient_name}</td>
            <td>{appointment.patient_email}</td>
            <td>{appointment.phone}</td>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td>
                <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    className="confirm"
                    onClick={() => handleSelectPatient(appointment)}
                >
                    Examiner
                </motion.button>
            </td>
        </motion.tr>
    ))}
</tbody>
            </table>
        ) : (
            <p>Aucun rendez-vous disponible pour le moment.</p>
        )}
    </motion.div>
)}
{activePage === "Unavailable" && (
    <motion.div
        className="panel-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
        <h2>Définir les Indisponibilités</h2>
        <CalendarComponent
            onChange={setSelectedDate}
            value={selectedDate}
            className="custom-calendar"
        />
        <div className="time-selection">
            <label>
                <input
                    type="radio"
                    name="unavailableType"
                    value="timeRange"
                    checked={unavailableType === "timeRange"}
                    onChange={() => setUnavailableType("timeRange")}
                />
                Plage horaire
            </label>
        </div>

        {unavailableType === "timeRange" && (
            <div className="time-range">
                <label>De:</label>
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <label>À:</label>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
            </div>
        )}

        <motion.button
            onClick={handleSetUnavailable}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="confirm-button"
        >
            Définir comme Indisponible
        </motion.button>
    </motion.div>
)}
            </div>
            <ChatbotComponent />

        </div>
    );
};

export default DoctorPanel;