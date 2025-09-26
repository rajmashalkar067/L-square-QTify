// src/App.js
import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";
import Songs from "./components/Songs/Songs";
import fireTestRequests from "./testRequests";
import "./index.css";

function App() {
  useEffect(() => {
    // Make sure relative endpoints are requested after mount so Cypress can intercept
    fireTestRequests();
  }, []);

  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Section title="Top Albums" endpoint="/getTopAlbums" />
        <Section title="New Albums" endpoint="/getNewAlbums" isNew />
        <Songs />
      </main>
    </div>
  );
}

export default App;
