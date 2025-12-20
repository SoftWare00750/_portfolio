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
    // Close mobile menu first
    setOpen(false);
    
    // Special handling for home - scroll to top
    if (sectionId === "home") {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
      return;
    }

    // Wait a bit for menu to close, then scroll
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      
      if (!section) {
        console.error(`Section with id "${sectionId}" not found`);
        return;
      }

      // Get navbar height
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 70;
      
      // Calculate position
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;

      // Scroll to the section
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }, 100);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

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
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          aria-label="Toggle menu"
          role="button"
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollToSection(item.id);
              }}
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