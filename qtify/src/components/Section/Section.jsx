import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

export default function Section({
  title = "Top Albums",
  endpoint = "https://qtify-backend.labs.crio.do/albums/top",
}) {
  const [items, setItems] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(endpoint)
      .then((res) => {
        const data = res?.data?.albums ?? res?.data ?? res;
        setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <section className={styles.sectionRoot}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button className={styles.collapseBtn} onClick={() => setCollapsed(c => !c)}>
            Collapse
          </button>
        </div>

        {!collapsed && (
          <div className={styles.gridWrap}>
            {loading && <div className={styles.loading}>Loading...</div>}

            {!loading && items.length > 0 && (
              <div className={styles.grid}>
                {items.map((album) => (
                  <Card key={album.id || album.slug || album.title} album={album} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
