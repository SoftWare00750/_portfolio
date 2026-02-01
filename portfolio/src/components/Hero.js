import React, { useState, useEffect, useRef } from "react";

const LOADING_TEXTS = [
  { text: "Web Developer", className: "loading-text-web" },
  { text: "Frontend Developer", className: "loading-text-frontend" },
  { text: "Mobile Developer", className: "loading-text-mobile" },
  { text: "Game Developer", className: "loading-text-game" }
];

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % LOADING_TEXTS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Lock in the animated state once useScrollAnimation adds .animate
  useEffect(() => {
    const check = setInterval(() => {
      if (textRef.current && textRef.current.classList.contains("animate")) {
        setHasAnimated(true);
        clearInterval(check);
      }
    }, 50);

    return () => clearInterval(check);
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
              console.error('Hero image failed to load:', e.target.src);
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
    </section>
  );
}