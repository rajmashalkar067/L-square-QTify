import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css"; // optional

// helper map: relative test endpoints -> real backend URLs
const BACKEND_BASE = "https://qtify-backend.labs.crio.do";
const endpointMap = {
  "/getTopAlbums": `${BACKEND_BASE}/albums/top`,
  "/getNewAlbums": `${BACKEND_BASE}/albums/new`,
  "/getSongs": `${BACKEND_BASE}/songs`, // if needed elsewhere
};

export default function Section({ title, endpoint, isNew }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!endpoint) return;

    // If endpoint is one of the test-relative endpoints, use the mapped backend url.
    // Otherwise assume it's a full URL and use as-is.
    const apiUrl = endpointMap[endpoint] || (endpoint.startsWith("http") ? endpoint : endpoint);

    console.log(`[Section] title=${title} endpointProp=${endpoint} resolvedApiUrl=${apiUrl}`);

    setLoading(true);
    axios
      .get(apiUrl)
      .then((res) => {
        // backend returns { albums: [...] } or direct array depending on endpoint
        const data = res?.data?.albums ?? res?.data ?? [];
        setItems(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(`[Section] fetch error for ${apiUrl}:`, err.message || err);
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [endpoint, title]);

  return (
    <section className={styles?.section || ""}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12}}>
        <h3>{title}</h3>
        <button style={{ background: "transparent", color: "#11c552", border: "none" }}>
          {isNew ? "Show All" : "Collapse"}
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && items.length === 0 && <p>No albums found</p>}

      {!loading && items.length > 0 && (
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {items.map((album) => (
            <Card key={album.id || album.title} album={album} />
          ))}
        </div>
      )}
    </section>
  );
}
