import React from "react";
import "../Apropos.css";
import TopBar from "./TopBar"; 

const Apropos = () => {
  return (
        <div>
          <TopBar />
          <div className="apropos-container">
      <div className="apropos-container">
        <div className="apropos-box">
          <h1>À Propos</h1>

          <div className="profile-section">
            <h2>Aoudia Fahem</h2>
            <p className="role">Programmeur Web & Intelligence Artificielle</p>
            <p className="description">
              Je suis un développeur passionné par la création d’applications web et mobiles intégrant l'intelligence artificielle.
              Actuellement, je travaille sur mon projet de fin d’études sous la direction de <strong>Mr. Hichem Benfriha</strong>.
              Mon objectif est de concevoir des solutions innovantes et intelligentes dans divers domaines technologiques. 🚀
            </p>
          </div>

          <div className="stats-section">
            <div className="stat-card">
              <h3>📅 +3 ans</h3>
              <p>Expérience en développement web & IA</p>
            </div>
            <div className="stat-card">
              <h3>🖥️ +10 projets</h3>
              <p>Applications web et mobiles réalisées</p>
            </div>
            <div className="stat-card">
              <h3>👥 +50 collaborations</h3>
              <p>Projets en équipe et clients satisfaits</p>
            </div>
          </div>

          <div className="skills-section">
            <div className="skill-card">
              <h3>💻 Développement Web & Mobile</h3>
              <p>Création d’applications modernes avec IA.</p>
            </div>
            <div className="skill-card">
              <h3>🤖 Solutions Intelligentes</h3>
              <p>Utilisation de l’IA pour divers domaines.</p>
            </div>
            <div className="skill-card">
              <h3>🛠 Travail en Équipe</h3>
              <p>Encadrement et gestion de projets innovants.</p>
            </div>
          </div>

          <div className="contact-section">
            <h3>📬 Contactez-moi :</h3>
            <div className="contact-box">
              <p>📧 <a href="mailto:aoudiafahem1@gmail.com">aoudiafahem1@gmail.com</a></p>
              <p>📞 <a href="tel:+14383661196">+1 438-366-1196</a></p>
              <p>🔗 <a href="https://www.linkedin.com/in/fahem-aoudia-416902346/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
              <p>💻 <a href="https://github.com/aoudiafahem" target="_blank" rel="noopener noreferrer">GitHub</a></p>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
  
  );
};

export default Apropos;
