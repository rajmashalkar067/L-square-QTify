import React from "react";
import Chip from "@mui/material/Chip";
import styles from "./Card.module.css";
import placeholder from "../../assets/headphones.svg";

export default function Card({ album = {} }) {
  const imageSrc = album.image || album.cover || placeholder;
  const follows = album.follows ?? album.follow_count ?? album.followers ?? 0;
  const title = album.title || album.name || "Unknown Album";

  return (
    <div className={styles.card} data-testid="album-card">
      <div className={styles.imageWrap}>
        <img src={imageSrc} alt={title} className={styles.image} />
        <div className={styles.bottomOverlay}>
          <Chip
            label={`${follows} Follows`}
            size="small"
            className={styles.chip}
            data-testid="follows-chip"
          />
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.title} title={title}>{title}</div>
      </div>
    </div>
  );
}
