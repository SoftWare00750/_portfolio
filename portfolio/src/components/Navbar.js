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
      
      // Calculate custom offsets for each section based on their CSS
      let finalOffset;
      
      switch(sectionId) {
        case "projects":
          // Projects has margin-top: -60px and needs extra space
          finalOffset = sectionTop - navbarHeight - 80;
          break;
          
        case "about":
          // About has margin-top: -10px
          finalOffset = sectionTop - navbarHeight - 100;
          break;
          
        case "skills":
          // Skills has margin-top: -130px
          finalOffset = sectionTop - navbarHeight - 50;
          break;
          
        case "contact":
          // Contact section
          finalOffset = sectionTop - navbarHeight - 80;
          break;
          
        default:
          finalOffset = sectionTop - navbarHeight - 60;
      }
      
      // Perform the scroll
      window.scrollTo({
        top: Math.max(0, finalOffset), // Prevent negative scroll
        behavior: "smooth"
      });
      
      console.log(`Scrolling to ${sectionId}:`, {
        sectionTop,
        navbarHeight,
        finalOffset,
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