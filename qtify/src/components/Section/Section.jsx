// src/components/Section/Section.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Slider from "../Slider/Slider";
import styles from "./Section.module.css";

export default function Section({
  title = "Top Albums",
  endpoint = "/getTopAlbums", // relative endpoint (Cypress intercepts this)
  isNew = false,
}) {
  const [items, setItems] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    // debugging log
    // (useful to inspect on deployed site console and deployment logs)
    console.log("[Section] fetching endpoint:", endpoint);

    axios
      .get(endpoint)
      .then((res) => {
        const data = res?.data?.albums ?? res?.data ?? res;
        if (mounted) {
          if (Array.isArray(data) && data.length > 0) {
            console.log(`[Section] ${title}: got ${data.length} items from ${endpoint}`);
            setItems(data);
          } else {
            // empty relative response — try fallback to real backend (only for deployed UI)
            console.warn(`[Section] ${title}: no items from ${endpoint}, attempting backend fallback`);
            return axios.get("https://qtify-backend.labs.crio.do/albums/top")
              .then((r2) => {
                const d2 = r2?.data?.albums ?? r2?.data ?? r2;
                if (Array.isArray(d2)) {
                  console.log(`[Section] ${title}: fallback got ${d2.length} items`);
                  setItems(d2);
                } else {
                  setItems([]);
                }
              })
              .catch((e2) => {
                console.error("[Section] fallback error", e2);
                setItems([]);
              });
          }
        }
      })
      .catch((err) => {
        // relative fetch failed (404/CORS) — attempt fallback
        console.warn(`[Section] fetch error for ${endpoint}`, err);
        if (!mounted) return;
        axios
          .get("https://qtify-backend.labs.crio.do/albums/top")
          .then((r2) => {
            const d2 = r2?.data?.albums ?? r2?.data ?? r2;
            if (Array.isArray(d2)) {
              console.log(`[Section] ${title}: fallback got ${d2.length} items`);
              setItems(d2);
            } else {
              setItems([]);
            }
          })
          .catch((e2) => {
            console.error("[Section] fallback error", e2);
            setItems([]);
          });
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [endpoint, title]);

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
