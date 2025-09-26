import React, { useEffect, useState } from "react";
import Slider from "../Slider/Slider";
import "./Albums.css";

export default function Albums() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [showAllTop, setShowAllTop] = useState(false);

  useEffect(() => {
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
        <Slider slideBy={340}>
          {topAlbums.length === 0 ? (
            <div className="card">No top albums yet</div>
          ) : (
            topAlbums
              .slice(0, showAllTop ? topAlbums.length : Math.min(8, topAlbums.length))
              .map((a, idx) => (
                <div key={a.id || idx} className="card">
                  <img src={a.image || a.cover || ""} alt={a.title || "album"} />
                  <div className="card-title">{a.title || "Album"}</div>
                </div>
              ))
          )}
        </Slider>

        {topAlbums.length > 6 && (
          <button className="show-all" onClick={() => setShowAllTop((s) => !s)}>
            {showAllTop ? "Show Less" : "Show All"}
          </button>
        )}
      </div>

      <div className="albums-block">
        <h2>New Albums</h2>
        <div className="cards-row">
          {newAlbums.length === 0 ? (
            <div className="card">No new albums yet</div>
          ) : (
            newAlbums.map((a, idx) => (
              <div key={a.id || idx} className="card">
                <img src={a.image || a.cover || ""} alt={a.title || "new-album"} />
                <div className="card-title">{a.title || "Album"}</div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="albums-block">
        <h2>Songs</h2>
        <div className="cards-row songs-row">
          {songs.length === 0 ? (
            <div>No songs yet</div>
          ) : (
            songs.map((s, idx) => (
              <div key={s.id || idx} className="song-card">
                <div className="song-title">{s.title || "Song"}</div>
                <div className="song-artist">{s.artist || "Artist"}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
