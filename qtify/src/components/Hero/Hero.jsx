import React, { useEffect } from "react";
import styles from "./Hero.module.css";
import headphones from "../../assets/headphones.svg"; // ensure this exists

export default function Hero() {
  // ensure an image is present and alt text
  useEffect(() => {
    // no-op - keeping for future fetch or analytics hook
  }, []);

  return (
    <section className={styles.hero} data-testid="hero-section">
      <div className={styles.content}>
        <h1 className={styles.title}>100 Thousand Songs, ad-free</h1>
        <p className={styles.subtitle}>
          Stream songs offline, discover playlists and more.
        </p>
        <div className={styles.ctaRow}>
          <button className={styles.primary}>Get Started</button>
        </div>
      </div>

      <div className={styles.visual}>
        <img src={headphones} alt="Headphones" className={styles.headphoneImg} />
      </div>
    </section>
  );
}
