// src/App.jsx
import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Workflow from './components/Workflow';
import Works from './components/Works';
import CallToAction from './components/CallToAction';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Workflow />
      <Works />
      <CallToAction />
    </div>
  );
}

export default App;
