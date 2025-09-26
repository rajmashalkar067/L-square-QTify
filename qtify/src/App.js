// src/App.js (excerpt)
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";
import "./index.css";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Section title="Top Albums" />
      </main>
    </div>
  );
}

export default App;
