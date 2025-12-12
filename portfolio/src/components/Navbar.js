import React, { useState, useEffect } from "react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "contact", className: "contact-button", label: "Contact Me" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // FIXED: Proper scroll function with correct offsets
  const scrollToSection = (sectionId) => {
    // Close mobile menu
    setOpen(false);
    
    const section = document.getElementById(sectionId);
    if (!section) {
      console.error(`Section with id "${sectionId}" not found`);
      return;
    }

    // Get navbar height
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 70;
    
    // Get section position
    const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
    
    // Different offsets for different sections
    let offset = navbarHeight;
    
    if (sectionId === "home") {
      offset = 0; // Scroll to very top
    } else if (sectionId === "projects") {
      offset = navbarHeight + 20; // Extra space for projects
    } else if (sectionId === "about") {
      offset = navbarHeight + 20;
    } else if (sectionId === "skills") {
      offset = navbarHeight + 20;
    } else if (sectionId === "contact") {
      offset = navbarHeight + 20;
    }
    
    // Scroll with smooth behavior
    window.scrollTo({
      top: sectionPosition - offset,
      behavior: "smooth"
    });
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        {/* Logo - Click to go home */}
        <div 
          className="brand" 
          onClick={() => scrollToSection("home")}
          style={{ cursor: 'pointer' }}
        >
          <div className="logo-circle">
            <p>O</p>
          </div>
        </div>

        {/* Hamburger Icon */}
        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Menu */}
        <nav className={`nav ${open ? "open" : ""}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={item.className || "nav-link"}
              onClick={() => scrollToSection(item.id)}
              type="button"
              aria-label={`Navigate to ${item.label}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}