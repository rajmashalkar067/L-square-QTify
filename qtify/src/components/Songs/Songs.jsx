import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_BASE = "https://qtify-backend.labs.crio.do";
const endpointMap = {
  "/getTopAlbums": `${BACKEND_BASE}/albums/top`,
  "/getNewAlbums": `${BACKEND_BASE}/albums/new`,
  "/getSongs": `${BACKEND_BASE}/songs`,
};

export default function Songs({ endpoint = "/getSongs" }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const apiUrl = endpointMap[endpoint] || endpoint;
    console.log("[Songs] fetching", apiUrl);
    axios.get(apiUrl).then(r => setSongs(r?.data?.songs ?? r?.data ?? [])).catch(e => {
      console.error("[Songs] err", e.message || e);
      setSongs([]);
    });
  }, [endpoint]);

  return (
    <section>
      <h3>Top Songs</h3>
      {songs.length === 0 ? <p>No songs found</p> : <ul>{songs.map(s => <li key={s.id}>{s.title}</li>)}</ul>}
    </section>
  );
}
