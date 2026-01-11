import React, { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both the dropdown and hamburger
      if (
        open &&
        navRef.current &&
        hamburgerRef.current &&
        !navRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        console.log("🖱️ Clicked outside - closing menu");
        setOpen(false);
      }
    };

    // Add event listener when menu is open
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside); // For mobile touch
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  // Close dropdown when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (open) {
        console.log("📜 Scrolled - closing menu");
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  const scrollToSection = (sectionId) => {
    console.log("🔵 Clicked:", sectionId);
    
    // Close menu first
    setOpen(false);
    console.log("🔵 Menu closed");
    
    // Wait for menu to close, then scroll
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      console.log("🔵 Section found:", section);
      
      if (!section) {
        console.error("❌ Section not found:", sectionId);
        return;
      }

      // Scroll to section
      section.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Adjust for navbar after scroll
      setTimeout(() => {
        const navbarHeight = 90;
        const currentScroll = window.pageYOffset;
        window.scrollTo({
          top: currentScroll - navbarHeight,
          behavior: 'smooth'
        });
      }, 100);
    }, 150);
  };

  const toggleMenu = () => {
    console.log("🍔 Hamburger clicked! Current state:", open);
    setOpen(!open);
    console.log("🍔 New state will be:", !open);
  };

  useEffect(() => {
    console.log("📱 Menu open state changed to:", open);
  }, [open]);

  return (
    <>
      {/* NAVBAR - Fixed at top */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          {/* Logo */}
          <div 
            className="brand" 
            onClick={() => scrollToSection("home")}
            style={{ cursor: 'pointer' }}
          >
            <div className="logo-circle">
              <p>O</p>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="nav-desktop">
            <button 
              className="nav-link" 
              onClick={() => scrollToSection("home")}
            >
              Home
            </button>
            <button 
              className="nav-link" 
              onClick={() => scrollToSection("projects")}
            >
              Projects
            </button>
            <button 
              className="nav-link" 
              onClick={() => scrollToSection("about")}
            >
              About
            </button>
            <button 
              className="nav-link" 
              onClick={() => scrollToSection("skills")}
            >
              Skills
            </button>
            <button 
              className="contact-button" 
              onClick={() => scrollToSection("contact")}
            >
              Contact Me
            </button>
          </nav>

          {/* Hamburger - Visible on mobile only */}
          <div
            ref={hamburgerRef}
            className={`hamburger ${open ? "active" : ""}`}
            onClick={toggleMenu}
            style={{ cursor: 'pointer' }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* MOBILE DROPDOWN MENU - OUTSIDE navbar, independent element */}
      <nav 
        ref={navRef}
        className={`nav-mobile ${open ? "open" : ""}`}
      >
        <button 
          className="nav-link" 
          onClick={() => scrollToSection("home")}
        >
          Home
        </button>
        <button 
          className="nav-link" 
          onClick={() => scrollToSection("projects")}
        >
          Projects
        </button>
        <button 
          className="nav-link" 
          onClick={() => scrollToSection("about")}
        >
          About
        </button>
        <button 
          className="nav-link" 
          onClick={() => scrollToSection("skills")}
        >
          Skills
        </button>
        <button 
          className="contact-button" 
          onClick={() => scrollToSection("contact")}
        >
          Contact Me
        </button>
      </nav>
    </>
  );
}