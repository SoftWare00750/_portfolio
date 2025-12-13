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

  const scrollToSection = (sectionId) => {
    // Close mobile menu immediately
    setOpen(false);
    
    // Special handling for home - scroll to top
    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return;
    }

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      const section = document.getElementById(sectionId);
      
      if (!section) {
        console.error(`Section with id "${sectionId}" not found`);
        // Try direct anchor navigation as fallback
        const anchor = document.querySelector(`#${sectionId}`);
        if (anchor) {
          anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      // Get navbar height
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 70;
      
      // Calculate position - use offsetTop for more reliable positioning
      const sectionTop = section.offsetTop;
      
      // Apply offset based on section
      let additionalOffset = 80;
      if (sectionId === "projects") {
        additionalOffset = 150; // Accounts for negative margin-top
      } else if (sectionId === "about") {
        additionalOffset = 100;
      } else if (sectionId === "skills") {
        additionalOffset = 150; // Accounts for negative margin-top
      } else if (sectionId === "contact") {
        additionalOffset = 80;
      }
      
      const targetPosition = sectionTop - navbarHeight - additionalOffset;
      
      // Scroll to calculated position
      window.scrollTo({
        top: Math.max(0, targetPosition), // Ensure we don't scroll to negative position
        behavior: "smooth"
      });
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