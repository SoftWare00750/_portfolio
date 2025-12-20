import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e, targetId) => {
    e.preventDefault();
    setOpen(false);
    
    setTimeout(() => {
      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = 70;
        const targetPosition = target.offsetTop - navHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        {/* Logo */}
        <a 
          href="#home"
          className="brand" 
          onClick={(e) => handleClick(e, '#home')}
          style={{ textDecoration: 'none' }}
        >
          <div className="logo-circle">
            <p>O</p>
          </div>
        </a>

        {/* Hamburger */}
        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation */}
        <nav className={`nav ${open ? "open" : ""}`}>
          <a href="#home" className="nav-link" onClick={(e) => handleClick(e, '#home')}>
            Home
          </a>
          <a href="#projects" className="nav-link" onClick={(e) => handleClick(e, '#projects')}>
            Projects
          </a>
          <a href="#about" className="nav-link" onClick={(e) => handleClick(e, '#about')}>
            About
          </a>
          <a href="#skills" className="nav-link" onClick={(e) => handleClick(e, '#skills')}>
            Skills
          </a>
          <a href="#contact" className="contact-button" onClick={(e) => handleClick(e, '#contact')}>
            Contact Me
          </a>
        </nav>
      </div>
    </header>
  );
}