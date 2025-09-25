import React from "react";
import styles from "./Logo.module.css";
import logo from "../../assets/logo.svg";

export default function Logo({ width = 120 }) {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="QTify" style={{ width }} />
    </div>
  );
}
