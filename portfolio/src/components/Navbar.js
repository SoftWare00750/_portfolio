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
      const navbarHeight = 70; // Fixed navbar height
      
      if (id === "home") {
        // Scroll to very top for home
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      } else {
        // For other sections, scroll with navbar offset
        const elementPosition = el.offsetTop;
        window.scrollTo({
          top: elementPosition - navbarHeight - 20,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <div className="brand" onClick={() => goTo("home")}>
          <div className="logo-circle"><p>O</p></div>
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