import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import CursorTrail from './components/CursorTrail';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <Router basename="/">
      <div className="min-h-screen bg-transparent flex flex-col relative">
        <AnimatedBackground />
        <CursorTrail />
        <div className="content-container flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
