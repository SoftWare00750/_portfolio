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
    // Close mobile menu
    setOpen(false);
    
    const section = document.getElementById(sectionId);
    if (!section) {
      console.error(`Section with id "${sectionId}" not found`);
      return;
    }

    // Special handling for home - scroll to top
    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return;
    }

    // Get navbar height for offset calculation
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 70;
    
    // Get section's position relative to document
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
    
    // Calculate scroll position with appropriate offset for each section
    let scrollPosition;
    
    switch(sectionId) {
      case "projects":
        // Projects needs less offset since it has margin-top
        scrollPosition = sectionTop - navbarHeight - 50;
        break;
      case "about":
        // About section positioning
        scrollPosition = sectionTop - navbarHeight - 40;
        break;
      case "skills":
        // Skills section positioning
        scrollPosition = sectionTop - navbarHeight - 40;
        break;
      case "contact":
        // Contact section positioning
        scrollPosition = sectionTop - navbarHeight - 30;
        break;
      default:
        scrollPosition = sectionTop - navbarHeight - 20;
    }
    
    // Perform smooth scroll
    window.scrollTo({
      top: scrollPosition,
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