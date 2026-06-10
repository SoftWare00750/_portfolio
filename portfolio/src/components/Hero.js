import React, { useState, useEffect, useRef } from "react";

const LOADING_TEXTS = [
  { text: "Web Developer",      className: "loading-text-web" },
  { text: "Frontend Developer", className: "loading-text-frontend" },
  { text: "Mobile Developer",   className: "loading-text-mobile" },
  { text: "Game Developer",     className: "loading-text-game" },
];

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const textRef = useRef(null);
  const menuRef = useRef(null);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // Rotate the title text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(i => (i + 1) % LOADING_TEXTS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Lock animate state once scroll animation fires
  useEffect(() => {
    const check = setInterval(() => {
      if (textRef.current && textRef.current.classList.contains("animate")) {
        setHasAnimated(true);
        clearInterval(check);
      }
    }, 50);
    return () => clearInterval(check);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [menuOpen]);

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-text1">
            <div className="name-section">
              <h1 className="hero-name">
                <span className="first-name">Stephen :/</span>
                <span className="middle-name">Da+mi</span>
                <br />
                <span className="last-name">Otunla</span>
              </h1>

              {/* ── X / Menu button ── */}
              <div className="hero-menu-wrap" ref={menuRef}>
                <button
                  className={`hero-menu-btn ${menuOpen ? "open" : ""}`}
                  onClick={() => setMenuOpen(o => !o)}
                  aria-label="Navigation menu"
                >
                  {/* Animated X ↔ dots */}
                  <span className="hm-bar hm-bar1"></span>
                  <span className="hm-bar hm-bar2"></span>
                  <span className="hm-bar hm-bar3"></span>
                </button>

                {menuOpen && (
                  <div className="hero-menu-dropdown">
                    <button
                      className="hero-menu-item"
                      onClick={() => scrollToSection("projects")}
                    >
                      <span className="hero-menu-icon">🗂️</span> My Work
                    </button>
                    <button
                      className="hero-menu-item"
                      onClick={() =>
                        window.open(
                          "https://drive.google.com/file/d/1CZydhqyrEKcl6eKwSMWSeMMej0unNsHo/view?usp=drivesdk",
                          "_blank"
                        )
                      }
                    >
                      <span className="hero-menu-icon">📄</span> My Resume
                    </button>
                    <button
                      className="hero-menu-item"
                      onClick={() => scrollToSection("skills")}
                    >
                      <span className="hero-menu-icon">⚙️</span> My Skills
                    </button>
                  </div>
                )}
              </div>
            </div>

            <span className="hero-sub">
              <p
                ref={textRef}
                className={`hero-sub-right-fixed ${LOADING_TEXTS[currentTextIndex].className}${hasAnimated ? " animate" : ""}`}
              >
                {LOADING_TEXTS[currentTextIndex].text}
              </p>
              <p className="hero-sub-right2">
                <span>I handle the development, deployment</span>
                <br />
                <span>and maintenance of your Website, Apps and Games UI, start to finish.</span>
              </p>
            </span>
          </div>

          <img
            src="/assets/coder.png"
            alt="coder"
            className="hero-image"
            onError={(e) => {
              console.error("Hero image failed to load:", e.target.src);
              e.target.style.display = "none";
            }}
          />
        </div>
      </div>
    </section>
  );
}