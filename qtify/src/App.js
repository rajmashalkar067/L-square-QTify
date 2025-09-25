import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import "./index.css";


function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default App;
