import React from "react";
import styles from "./Search.module.css";

export default function Search({ placeholder = "Search a song, album, or artist" }) {
  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        placeholder={placeholder}
        aria-label="search-input"
      />
      <button className={styles.iconBtn} aria-label="search">
        🔍
      </button>
    </div>
  );
}
