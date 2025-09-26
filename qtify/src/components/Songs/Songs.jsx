// src/components/Songs/Songs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Songs.css";

export default function Songs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get("/getSongs")
      .then((res) => {
        const data = res?.data?.songs ?? res?.data ?? res;
        setSongs(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        console.warn("getSongs error", e);
        setSongs([]);
      });
  }, []);

  return (
    <section className="songs-root">
      <h3>Top Songs</h3>
      <div className="songs-grid">
        {songs.map((s, idx) => (
          <div key={s.id || idx} className="song-card">
            <div className="song-title">{s.title || "Song"}</div>
            <div className="song-artist">{s.artist || s.artists || "Artist"}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
