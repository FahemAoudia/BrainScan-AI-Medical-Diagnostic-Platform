import React from "react";
import "../Apropos.css";
import TopBar from "./TopBar";

const Apropos = () => {
  return (
    <div>
      <TopBar />
      <div className="apropos-container">
        <div className="apropos-box">
          <h1>À propos</h1>

          <div className="profile-section">
            <h2>Fahem Aoudia</h2>
            <p className="role">Développeur full stack &amp; intelligence artificielle</p>
            <p className="description">
              Ingénieur logiciel orienté produit, je conçois des applications web performantes et des
              services d’IA appliquée, du prototype à la mise en production. Mon travail couvre
              l’architecture API, les interfaces utilisateur modernes et l’intégration de modèles
              d’apprentissage automatique dans des environnements contraints (Docker, cloud).
              Basé à Montréal, je privilégie la qualité du code, la sécurité des données et une
              expérience utilisateur soignée.
            </p>
          </div>

          <div className="stats-section">
            <div className="stat-card">
              <h3>Stack</h3>
              <p>React · FastAPI · Python · Docker · Cloud</p>
            </div>
            <div className="stat-card">
              <h3>Focus</h3>
              <p>IA appliquée, vision par ordinateur, APIs REST</p>
            </div>
            <div className="stat-card">
              <h3>Approche</h3>
              <p>Architecture propre, déploiement reproductible, documentation</p>
            </div>
          </div>

          <div className="skills-section">
            <div className="skill-card">
              <h3>Développement web &amp; API</h3>
              <p>Applications React, backends FastAPI / Node, intégration continue.</p>
            </div>
            <div className="skill-card">
              <h3>IA &amp; données</h3>
              <p>Modèles CNN, pipelines d’inférence, bonnes pratiques MLOps légers.</p>
            </div>
            <div className="skill-card">
              <h3>Production</h3>
              <p>Conteneurisation, variables d’environnement, supervision des déploiements.</p>
            </div>
          </div>

          <div className="contact-section">
            <h3>Contact</h3>
            <div className="contact-box">
              <p>
                📧{" "}
                <a href="mailto:aoudiafahem1@gmail.com">aoudiafahem1@gmail.com</a>
              </p>
              <p>
                📞 <a href="tel:+14383661196">+1 438-366-1196</a>
              </p>
              <p>
                🔗{" "}
                <a
                  href="https://www.linkedin.com/in/fahem-aoudia-416902346/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </p>
              <p>
                💻{" "}
                <a href="https://github.com/FahemAoudia" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apropos;
