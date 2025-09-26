// src/App.js
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";
import Songs from "./components/Songs/Songs"; // add Songs component (see next step)
import "./index.css";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        {/* Top Albums (Cypress intercepts /getTopAlbums) */}
        <Section title="Top Albums" endpoint="/getTopAlbums" />

        {/* New Albums (Cypress intercepts /getNewAlbums) */}
        <Section title="New Albums" endpoint="/getNewAlbums" />

        {/* Songs list (Cypress intercepts /getSongs) */}
        <Songs />
      </main>
    </div>
  );
}

export default App;
