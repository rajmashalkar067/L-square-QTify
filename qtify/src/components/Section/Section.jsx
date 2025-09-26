// src/components/Section/Section.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Slider from "../Slider/Slider";
import styles from "./Section.module.css";

export default function Section({
  title = "Top Albums",
  endpoint = "/getTopAlbums",
  isNew = false, // when true, render a slider + show all control
}) {
  const [items, setItems] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(endpoint)
      .then((res) => {
        const data = res?.data?.albums ?? res?.data ?? res;
        setItems(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.warn("Section fetch error", err);
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  const headerButton = () => {
    if (isNew) {
      return (
        <button
          className={styles.collapseBtn}
          onClick={() => setShowAll((s) => !s)}
        >
          {showAll ? "Show Less" : "Show All"}
        </button>
      );
    }
    return (
      <button
        className={styles.collapseBtn}
        onClick={() => setCollapsed((c) => !c)}
      >
        {collapsed ? "Expand" : "Collapse"}
      </button>
    );
  };

  return (
    <section className={styles.sectionRoot}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {headerButton()}
        </div>

        {!collapsed && (
          <div className={styles.gridWrap}>
            {loading && <div className={styles.loading}>Loading...</div>}

            {!loading && items.length > 0 && (
              <>
                {isNew && !showAll && (
                  <Slider slideBy={220}>
                    {items.map((album) => (
                      <Card
                        key={album.id || album.slug || album.title}
                        album={album}
                      />
                    ))}
                  </Slider>
                )}

                {(!isNew || showAll) && (
                  <div className={styles.grid}>
                    {items.map((album) => (
                      <Card
                        key={album.id || album.slug || album.title}
                        album={album}
                      />
                    ))}
                  </div>
                )}
              </>
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
