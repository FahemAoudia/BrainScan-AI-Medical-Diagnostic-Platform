// Footer.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import "../styles.scss";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-info">
          <h3>BrainScan</h3>
          <p>Améliorer la détection des tumeurs cérébrales grâce à l'intelligence artificielle avancée.</p>
        </div>

        <div className="footer-links">
          <h4>Liens Utiles</h4>
          <ul>
            <li><a href="#home">Accueil</a></li>
            <li><a href="#how-it-works">Comment ça marche</a></li>
            <li><a href="#about">À propos</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Suivez-nous</h4>
          <div className="social-icons">
            <a href="https://facebook.com"><FaFacebookF /></a>
            <a href="https://twitter.com"><FaTwitter /></a>
            <a href="https://linkedin.com"><FaLinkedinIn /></a>
            <a href="https://instagram.com"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="footer-map">
      <iframe 
    title="BrainScan Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.5484123937915!2d-73.55858082408141!3d45.542213971079236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a0f4c1dc2f3%3A0x3e7f95db745b4e0!2s3030%20Rue%20Hochelaga%2C%20Montr%C3%A9al%2C%20QC%20H1W%201G2%2C%20Canada!5e0!3m2!1sen!2sca!4v1707152198345!5m2!1sen!2sca"
    width="100%" 
    height="200" 
    allowFullScreen="" 
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 BrainScan. Tous les droits sont réservés.</p>
        <div className="footer-policy">
          <a href="#privacy">Politique de Confidentialité</a>
          <a href="#terms">Conditions d'Utilisation</a>
          <a href="#contact">Contactez-nous</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
