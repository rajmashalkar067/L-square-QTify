import React, { useRef } from "react";
import styles from "./Slider.module.css";

export default function Slider({ children, slideBy = 340 }) {
  const containerRef = useRef(null);

  const next = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: slideBy, behavior: "smooth" });
  };

  const prev = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: -slideBy, behavior: "smooth" });
  };

  return (
    <div className={styles.sliderWrap}>
      <button className={styles.ctrl} onClick={prev} aria-label="prev">‹</button>
      <div className={styles.slider} ref={containerRef}>{children}</div>
      <button className={styles.ctrl} onClick={next} aria-label="next">›</button>
    </div>
  );
}
