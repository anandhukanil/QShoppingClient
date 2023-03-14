import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from "react-icons/fa";
import styles from "./styles.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerColumn}>
        <h3>About Us</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div className={styles.footerColumn}>
        <h3>Customer Service</h3>
        <ul>
          <li><a href="/">Contact Us</a></li>
          <li><a href="/">Shipping Information</a></li>
          <li><a href="/">Returns & Exchanges</a></li>
          <li><a href="/">FAQ</a></li>
        </ul>
      </div>
      <div className={styles.footerColumn}>
        <h3>Connect With Us</h3>
        <ul className={styles.socialMedia}>
          <li><a href="/"><FaFacebook /></a></li>
          <li><a href="/"><FaTwitter /></a></li>
          <li><a href="/"><FaInstagram /></a></li>
          <li><a href="/"><FaPinterest /></a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
