// AIStatsSection.js
import React from 'react';
import '../styles.scss';

const AIStatsSection = () => {
  const stats = [
    { percentage: "95%", description: "Précision de l'IA dans la détection des tumeurs cérébrales", color: "#6c63ff" },
    { percentage: "90%", description: "Réduction du temps de diagnostic grâce à l'IA", color: "#00b894" },
    { percentage: "85%", description: "Amélioration de la détection des tumeurs précoces", color: "#ff6b6b" }
  ];

  return (
    <div className="ai-stats-section">
      <h2>Impact de l'IA dans la Détection des Tumeurs</h2>
      <p>L'intelligence artificielle améliore significativement la précision et la rapidité du diagnostic des tumeurs cérébrales.</p>

      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderColor: stat.color }}>
            <h3 style={{ color: stat.color }}>{stat.percentage}</h3>
            <p>{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIStatsSection;
