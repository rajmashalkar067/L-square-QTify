// src/components/Section/Section.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

export default function Section({
  title = "Top Albums",
  endpoint = "/getTopAlbums", // use relative endpoint by default
}) {
  const [items, setItems] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(endpoint)
      .then((res) => {
        // handle responses whether Cypress stub returns array or object
        const data = res?.data?.albums ?? res?.data ?? res;
        setItems(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.warn("Section fetch error", err);
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <section className={styles.sectionRoot}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button
            className={styles.collapseBtn}
            onClick={() => setCollapsed((c) => !c)}
          >
            Collapse
          </button>
        </div>

        {!collapsed && (
          <div className={styles.gridWrap}>
            {loading && <div className={styles.loading}>Loading...</div>}

            {!loading && items.length > 0 && (
              <div className={styles.grid}>
                {items.map((album) => (
                  <Card
                    key={album.id || album.slug || album.title}
                    album={album}
                  />
                ))}
              </div>
            )}

            {!loading && items.length === 0 && (
              <div className={styles.empty}>No albums found</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
