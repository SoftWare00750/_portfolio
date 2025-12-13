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
    
    // Special case for home - scroll to absolute top
    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return;
    }

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (!section) {
        console.error(`Section with id "${sectionId}" not found`);
        return;
      }

      // Get navbar height
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 70;
      
      // Get the section's absolute position in the document
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top + window.pageYOffset;
      
      // Calculate custom offsets for each section
      // These are tuned based on your actual CSS margins and padding
      let finalOffset;
      
      switch(sectionId) {
        case "projects":
          // Projects: The section title should be visible below navbar
          finalOffset = sectionTop - navbarHeight - 30;
          break;
          
        case "about":
          // About section
          finalOffset = sectionTop - navbarHeight - 60;
          break;
          
        case "skills":
          // Skills has large negative margin
          finalOffset = sectionTop - navbarHeight - 20;
          break;
          
        case "contact":
          // Contact section
          finalOffset = sectionTop - navbarHeight - 50;
          break;
          
        default:
          finalOffset = sectionTop - navbarHeight - 40;
      }
      
      // Perform the scroll
      window.scrollTo({
        top: Math.max(0, finalOffset),
        behavior: "smooth"
      });
      
      console.log(`Scrolling to ${sectionId}:`, {
        sectionTop,
        navbarHeight,
        finalOffset,
        actualScrollTo: Math.max(0, finalOffset),
        currentScroll: window.pageYOffset
      });
    }, 100);
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