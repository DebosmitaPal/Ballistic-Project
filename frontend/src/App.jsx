import { useState } from "react";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import Analyze from "./components/Analyze";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Counting from "./components/Counting";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // Add page state

  function handleLoginClick() {
    setLoginOpen(true);
  }

  function handleLoginSuccess(userData) {
    setUser(userData);
  }

  function handleLogout() {
    setUser(null);
  }

  function handleAnalyzeClick() {
    setCurrentPage('analyze');
  }

  function handleHomeClick() {
    setCurrentPage('home');
  }

  // Render analyze page
  if (currentPage === 'analyze') {
    return (
      <>
        <Navbar 
          user={user} 
          onLoginClick={handleLoginClick} 
          onLogout={handleLogout}
          onAnalyzeClick={handleAnalyzeClick}
          onHomeClick={handleHomeClick}
        />
        <Analyze 
          user={user} 
          onLoginClick={handleLoginClick} 
          onLogout={handleLogout} 
        />
        {loginOpen && (
          <LoginModal onClose={() => setLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
        )}
      </>
    );
  }

  // Render home page
  return (
    <>
      <Navbar 
        user={user} 
        onLoginClick={handleLoginClick} 
        onLogout={handleLogout}
        onAnalyzeClick={handleAnalyzeClick}
        onHomeClick={handleHomeClick}
      />
      <section id="hero">
        <Hero />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="process">
        <Process />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="count">
        <Counting />
      </section>
      <FAQ />
      <section id="contact">
        <Footer />
      </section>

      {loginOpen && (
        <LoginModal onClose={() => setLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}