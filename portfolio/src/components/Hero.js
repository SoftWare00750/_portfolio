import React, { useState, useEffect } from "react";

const LOADING_TEXTS = [
  { text: "Web Developer", marginLeft: "-155px" },
  { text: "Frontend Developer", marginLeft: "0px" }, // Default alignment
  { text: "Mobile Developer", marginLeft: "-38px" },
  { text: "Game Developer", marginLeft: "-107px" }
];

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % LOADING_TEXTS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-text1">
            <div className="name-section">
              <h1 className="hero-name">
                <span className="first-name">Oluwadamilola</span>
                <br />
                <span className="last-name">Otunla</span>
              </h1>
              <button
                className="mywork"
                onClick={() => scrollToSection("projects")}
              >
                My Work
              </button>
            </div>
            <span className="hero-sub">
              {/* INLINE STYLE APPLIED HERE */}
              <p 
                className="hero-sub-right-fixed"
                style={{ 
                  marginLeft: LOADING_TEXTS[currentTextIndex].marginLeft,
                  transition: "margin-left 0.5s ease" // Added a smooth transition
                }}
              >
                {LOADING_TEXTS[currentTextIndex].text}
              </p>
              <p className="hero-sub-right2">
                <span>I handle the development, deployment</span>
                <br />
                <span>and maintenance of your Website and App's UI, start to finish.</span>
              </p>
            </span>
          </div>
          <img
            src="/assets/coder.png"
            alt="coder"
            className="hero-image"
            onError={(e) => {
              console.error('Hero image failed to load:', e.target.src);
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
    </section>
  );
}