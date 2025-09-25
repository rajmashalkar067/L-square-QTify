import React from "react";
import styles from "./Search.module.css";

export default function Search({ placeholder = "Search for artists, songs, or podcasts" }) {
  return (
    <div className={styles.search}>
      <input className={styles.input} placeholder={placeholder} />
      <button className={styles.iconBtn} aria-label="search">
        🔍
      </button>
    </div>
  );
}
