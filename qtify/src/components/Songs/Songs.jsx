// src/components/Songs/Songs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Songs.css";

export default function Songs() {
  const [songs, setSongs] = useState([]);

 useEffect(() => {
  console.log("[Songs] fetching /getSongs");
  axios.get("/getSongs")
    .then(res => {
      const data = res?.data?.songs ?? res?.data ?? res;
      if (Array.isArray(data) && data.length) {
        console.log("[Songs] got", data.length, "songs from /getSongs");
        setSongs(data);
      } else {
        console.warn("[Songs] no data from /getSongs, trying backend fallback");
        return axios.get("https://qtify-backend.labs.crio.do/songs")
          .then(r2 => {
            const d2 = r2?.data?.songs ?? r2?.data ?? r2;
            if (Array.isArray(d2)) setSongs(d2);
          })
          .catch(e => { console.error("[Songs] fallback error", e); setSongs([]); });
      }
    })
    .catch(err => {
      console.warn("[Songs] fetch error, trying fallback", err);
      axios.get("https://qtify-backend.labs.crio.do/songs")
        .then(r2 => { const d2 = r2?.data?.songs ?? r2?.data ?? r2; if (Array.isArray(d2)) setSongs(d2); })
        .catch(e => { console.error("[Songs] fallback error", e); setSongs([]); });
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
