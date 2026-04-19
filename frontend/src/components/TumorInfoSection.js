// TumorInfoSection.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import "../styles.scss";

const TumorInfoSection = ({ tumors }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleLearnMore = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="tumor-section">
      {tumors.map((tumor, index) => (
        <motion.div 
          className={`tumor-card slide-${index}`} 
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.03 }}
        >
          <img src={tumor.image} alt={tumor.title} className="tumor-image" />

          <div className="tumor-content">
            <h3>{tumor.title}</h3>
            <p>{tumor.description}</p>
            <button 
              className="learn-more-btn" 
              onClick={() => handleLearnMore(index)}
            >
              En savoir plus
            </button>
          </div>

          <motion.div 
            className={`emoji-overlay ${activeIndex === index ? 'active' : ''}`}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.4 }} 
            animate={{ opacity: activeIndex === index ? 1 : 0.2 }}
          >
            {index === 0 && "🧠"}   {/* Gliome */}
            {index === 1 && "💡"}   {/* Méningiome */}
            {index === 2 && "🔬"}   {/* Tumeur hypophysaire */}
            {index === 3 && "😊"}   {/* Cerveau Sain */}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default TumorInfoSection;
