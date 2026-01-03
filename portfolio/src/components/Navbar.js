import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (!open) return;
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('.navbar')) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  const handleToggle = (e) => {
    e.stopPropagation();
    setOpen(prev => !prev);
  };

  const handleNavClick = (sectionId) => {
    setOpen(false);
    
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      section.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      setTimeout(() => {
        const navbarHeight = 90;
        window.scrollTo({
          top: window.pageYOffset - navbarHeight,
          behavior: 'smooth'
        });
      }, 100);
    }, 150);
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        {/* Logo */}
        <div 
          className="brand" 
          onClick={() => handleNavClick("home")}
          style={{ cursor: 'pointer' }}
        >
          <div className="logo-circle">
            <p>O</p>
          </div>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${open ? "active" : ""}`}
          onClick={handleToggle}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation - with inline fallback for mobile */}
        <nav 
          className={`nav ${open ? "open" : ""}`}
          style={{
            // Inline styles as fallback - only apply on mobile
            ...(window.innerWidth <= 768 && open ? {
              display: 'flex',
              maxHeight: '500px',
              padding: '20px'
            } : {})
          }}
        >
          <button 
            className="nav-link" 
            onClick={() => handleNavClick("home")}
          >
            Home
          </button>
          <button 
            className="nav-link" 
            onClick={() => handleNavClick("projects")}
          >
            Projects
          </button>
          <button 
            className="nav-link" 
            onClick={() => handleNavClick("about")}
          >
            About
          </button>
          <button 
            className="nav-link" 
            onClick={() => handleNavClick("skills")}
          >
            Skills
          </button>
          <button 
            className="contact-button" 
            onClick={() => handleNavClick("contact")}
          >
            Contact Me
          </button>
        </nav>
      </div>
    </header>
  );
}