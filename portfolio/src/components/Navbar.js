import React, { useState, useEffect, useRef } from "react";

// Sun icon — shown in dark mode (invites switch to light)
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1"  x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1"  y1="12" x2="3"  y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
    <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22" />
  </svg>
);

// Crescent moon icon — shown in light mode (invites switch to dark)
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark]   = useState(true);
  const navRef        = useRef(null);
  const hamburgerRef  = useRef(null);

  // Set initial theme attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", next);
  };

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        open &&
        navRef.current &&
        hamburgerRef.current &&
        !navRef.current.contains(e.target) &&
        !hamburgerRef.current.contains(e.target)
      ) setOpen(false);
    };
    if (open) {
      document.addEventListener("mousedown", handler);
      document.addEventListener("touchstart", handler);
    }
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  // Close on scroll
  useEffect(() => {
    const handler = () => { if (open) setOpen(false); };
    if (open) window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [open]);

  const scrollToSection = (id) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        window.scrollTo({ top: window.pageYOffset - 90, behavior: "smooth" });
      }, 100);
    }, 150);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">

          {/* Logo + Theme toggle */}
          <div className="brand" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              className="logo-circle"
              onClick={() => scrollToSection("home")}
              style={{ cursor: "pointer" }}
            >
              {/* Render as span so CSS color targets it cleanly */}
              <span style={{ color: "inherit", fontWeight: 800, fontSize: "30px" }}>O</span>
            </div>

            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Desktop nav */}
          <nav className="nav-desktop">
            <button className="nav-link" onClick={() => scrollToSection("home")}>Home</button>
            <button className="nav-link" onClick={() => scrollToSection("projects")}>Projects</button>
            <button className="nav-link" onClick={() => scrollToSection("about")}>About</button>
            <button className="nav-link" onClick={() => scrollToSection("skills")}>Skills</button>
            <button className="contact-button" onClick={() => scrollToSection("contact")}>Contact Me</button>
          </nav>

          {/* Hamburger */}
          <div
            ref={hamburgerRef}
            className={`hamburger ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
            style={{ cursor: "pointer" }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* Mobile dropdown */}
      <nav ref={navRef} className={`nav-mobile ${open ? "open" : ""}`}>
        <button className="nav-link" onClick={() => scrollToSection("home")}>Home</button>
        <button className="nav-link" onClick={() => scrollToSection("projects")}>Projects</button>
        <button className="nav-link" onClick={() => scrollToSection("about")}>About</button>
        <button className="nav-link" onClick={() => scrollToSection("skills")}>Skills</button>
        <button className="contact-button" onClick={() => scrollToSection("contact")}>Contact Me</button>
      </nav>
    </>
  );
}