import React, { useEffect, useState } from "react";
import "./Albums.css";

/*
  This component issues XHRs to relative endpoints so Cypress tests
  can intercept them (getTopAlbums, getNewAlbums, getSongs).
*/

export default function Albums() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [showAllTop, setShowAllTop] = useState(false);

  useEffect(() => {
    // relative endpoints — Cypress commonly intercepts these names
    fetch("/getTopAlbums")
      .then((r) => r.json())
      .then(setTopAlbums)
      .catch(() => setTopAlbums([]));

    fetch("/getNewAlbums")
      .then((r) => r.json())
      .then(setNewAlbums)
      .catch(() => setNewAlbums([]));

    fetch("/getSongs")
      .then((r) => r.json())
      .then(setSongs)
      .catch(() => setSongs([]));
  }, []);

  return (
    <section className="albums-root">
      <div className="albums-block">
        <h2>Top Albums</h2>
        <div className="cards-row" data-testid="top-albums">
          {topAlbums.length === 0 && <div>No top albums yet</div>}
          {topAlbums
            .slice(0, showAllTop ? topAlbums.length : Math.min(6, topAlbums.length))
            .map((a, idx) => (
              <div key={a.id || idx} className="card">
                <img src={a.image || a.cover || ""} alt={a.title || "album"} />
                <div className="card-title">{a.title || "Album"}</div>
              </div>
            ))}
        </div>
        {topAlbums.length > 6 && (
          <button
            className="show-all"
            onClick={() => setShowAllTop((s) => !s)}
            aria-label="show-all-top"
          >
            {showAllTop ? "Show Less" : "Show All"}
          </button>
        )}
      </div>

      <div className="albums-block">
        <h2>New Albums</h2>
        <div className="cards-row" data-testid="new-albums">
          {newAlbums.length === 0 && <div>No new albums yet</div>}
          {newAlbums.map((a, idx) => (
            <div key={a.id || idx} className="card">
              <img src={a.image || a.cover || ""} alt={a.title || "new-album"} />
              <div className="card-title">{a.title || "Album"}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="albums-block">
        <h2>Songs</h2>
        <div className="cards-row songs-row" data-testid="songs">
          {songs.length === 0 && <div>No songs yet</div>}
          {songs.map((s, idx) => (
            <div key={s.id || idx} className="song-card">
              <div className="song-title">{s.title || "Song"}</div>
              <div className="song-artist">{s.artist || "Unknown"}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
