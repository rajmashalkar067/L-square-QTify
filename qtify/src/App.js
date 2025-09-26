import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Albums from "./components/Albums/Albums";
import "./index.css";


function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Albums />
      </main>
    </div>
  );
}

export default App;
