import React from "react";
import styles from "./Navbar.module.css";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Button from "../Button/Button";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Logo width={110} />
      </div>

      <div className={styles.center}>
        <Search />
      </div>

      <div className={styles.right}>
        <Button>Give Feedback</Button>
      </div>
    </nav>
  );
}
