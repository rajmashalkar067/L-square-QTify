// src/components/Section/Section.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";

export default function Section({ title, endpoint, isNew }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!endpoint) return;

    console.log(`[Section:${title}] requesting ${endpoint}`);

    axios.get(endpoint)
      .then((res) => {
        const data = res?.data?.albums ?? res?.data ?? [];
        setItems(Array.isArray(data) ? data : []);
        console.log(`[Section:${title}] got`, data.length);
      })
      .catch((err) => {
        console.error(`[Section:${title}] error requesting ${endpoint}`, err.message);
        setItems([]);
      });
  }, [endpoint, title]);

  return (
    <section>
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p>No albums found</p>
      ) : (
        items.map((album) => (
          <Card key={album.id || album.title} album={album} />
        ))
      )}
      {isNew && <button>Show All</button>}
      {!isNew && <button>Collapse</button>}
    </section>
  );
}
