import React from "react";
import "../HowItWorks.css"; 
import TopBar from "./TopBar";

const steps = [
  {
    title: "🔍 Analyse des IRM",
    description: "Les utilisateurs téléchargent leurs images IRM et l'IA analyse la présence et la nature de la tumeur."
  },
  {
    title: "🤖 Prédiction avec IA",
    description: "Le modèle IA basé sur MobileNet/ResNet classifie les tumeurs en bénignes ou malignes avec haute précision."
  },
  {
    title: "🗄 Stockage des Résultats",
    description: "Les résultats sont stockés de manière sécurisée dans une base de données synchronisée (MySQL + MongoDB)."
  },
  {
    title: "💬 Chat avec un Médecin",
    description: "Le patient peut discuter avec un médecin via un chatbot IA et obtenir des conseils sur son état de santé."
  },
  {
    title: "🚀 Déploiement & Sécurité",
    description: "L’application est hébergée sur un cloud sécurisé (AWS/Google Cloud) avec des mécanismes de protection avancés."
  }
];

const HowItWorks = () => {
  return (
    <div>
      <TopBar /> 
      <div className="how-it-works-container">
        <h1>🛠 Comment ça marche ?</h1>
        <p className="subtitle">
          Découvrez le fonctionnement de notre système d'analyse des IRM grâce à l'intelligence artificielle.
        </p>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-box" data-step={index + 1}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
