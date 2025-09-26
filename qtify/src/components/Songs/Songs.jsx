// src/components/Songs/Songs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Songs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    console.log("[Songs] requesting /getSongs");
    let mounted = true;
    axios.get("/getSongs")
      .then(res => {
        if (!mounted) return;
        const data = res?.data?.songs ?? res?.data ?? res;
        if (Array.isArray(data)) {
          setSongs(data);
          console.log("[Songs] got", data.length);
        } else {
          setSongs([]);
          console.warn("[Songs] empty response from /getSongs");
        }
      })
      .catch(err => {
        console.error("[Songs] error requesting /getSongs", err && err.message);
        setSongs([]);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      {/* render song cards / placeholder */}
      {songs.length === 0 ? <p>No songs found</p> : songs.map(s => <div key={s.id}>{s.title}</div>)}
    </div>
  );
}
