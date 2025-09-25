import React from "react";
import styles from "./Button.module.css";

export default function Button({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
