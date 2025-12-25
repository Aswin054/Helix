// src/App.jsx
import React from 'react';
import Hero from './components/Hero';
import About from './components/About';

function App() {
  return (
    <div className="min-h-screen bg-gradient-animated bg-[length:400%_400%] animate-gradient">
      <Hero />
      <About />
    </div>
  );
}

export default App;
