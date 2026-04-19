import React from 'react';
import { motion } from 'framer-motion';
import '../styles.scss';

const IntroSlide = () => {
  return (
    <div className="intro-slide">
      <motion.div 
        className="intro-content"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }} 
      >
        <h1>Analyse IRM Assistée par IA</h1>
        <p>Obtenez un diagnostic rapide et précis grâce à notre intelligence artificielle spécialisée dans la détection des tumeurs cérébrales.</p>
        <motion.button
          className="explore-btn"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          Commencer
        </motion.button>
      </motion.div>

      <motion.img 
        src="/images/2.png" 
        alt="Analyse cérébrale" 
        className="intro-image"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />

      <motion.div 
        className="scroll-down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p>SCROLL DOWN</p>
        <span>&#x21E3;</span>
      </motion.div>
    </div>
  );
};

export default IntroSlide;
