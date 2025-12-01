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

  const goTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      // Get the navbar height
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
      
      // Calculate the position accounting for navbar and any section padding
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      
      // Offset adjustments for each section based on your CSS
      let offset = navbarHeight;
      
      if (id === "home") {
        offset = 0; // Scroll to very top for home
      } else if (id === "projects") {
        offset = navbarHeight + 100; // Account for large top padding
      } else if (id === "about") {
        offset = navbarHeight + 80;
      } else if (id === "skills") {
        offset = navbarHeight + 80;
      } else if (id === "contact") {
        offset = navbarHeight + 60;
      }
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <div className="brand" onClick={() => goTo("home")}>
          <div className="logo-circle" ><p>O</p></div>
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
          {navItems.map((n) => (
            <button
              key={n.id}
              className={n.className ? n.className : "nav-link"}
              onClick={() => goTo(n.id)}
            >
              {n.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}