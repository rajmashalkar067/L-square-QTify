import React from "react";
import styles from "./Hero.module.css";
import headphones from "../../assets/headphones.svg";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Music for everyone</h1>
        <p className={styles.subtitle}>
          Discover millions of tracks. Listen everywhere. Curate your mood.
        </p>
        <div className={styles.ctaRow}>
          {/* reusable Button */}
          <button className={styles.primary}>Get Started</button>
        </div>
      </div>

      <div className={styles.visual}>
        <img src={headphones} alt="Headphones" className={styles.headphoneImg} />
      </div>
    </section>
  );
}
