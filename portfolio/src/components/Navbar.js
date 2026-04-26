import React, { useState, useEffect, useRef } from "react";

// ── Sun SVG icon ──
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

// ── Crescent Moon SVG icon ──
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Initialise theme attribute on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  // Toggle dark / light
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        navRef.current &&
        hamburgerRef.current &&
        !navRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  // Close dropdown when scrolling
  useEffect(() => {
    const handleScroll = () => { if (open) setOpen(false); };
    if (open) window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  const scrollToSection = (sectionId) => {
    setOpen(false);
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (!section) return;
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        window.scrollTo({ top: window.pageYOffset - 90, behavior: "smooth" });
      }, 100);
    }, 150);
  };

  return (
    <>
      {/* ── NAVBAR ── */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">

          {/* Logo + Theme Toggle side by side */}
          <div
            className="brand"
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
          >
            <div className="logo-circle" onClick={() => scrollToSection("home")}>
              <p>O</p>
            </div>

            {/* ── Theme Toggle Button ── */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <button className="nav-link" onClick={() => scrollToSection("home")}>
              Home
            </button>
            <button className="nav-link" onClick={() => scrollToSection("projects")}>
              Projects
            </button>
            <button className="nav-link" onClick={() => scrollToSection("about")}>
              About
            </button>
            <button className="nav-link" onClick={() => scrollToSection("skills")}>
              Skills
            </button>
            <button className="contact-button" onClick={() => scrollToSection("contact")}>
              Contact Me
            </button>
          </nav>

          {/* Hamburger – visible on mobile only */}
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

      {/* ── MOBILE DROPDOWN ── */}
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