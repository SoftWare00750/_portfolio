import React, { useState, useEffect, useRef } from "react";

const LOADING_TEXTS = [
  { text: "Web Developer", className: "loading-text-web" },
  { text: "Frontend Developer", className: "loading-text-frontend" },
  { text: "Mobile Developer", className: "loading-text-mobile" },
  { text: "Game Developer", className: "loading-text-game" }
];

export default function About() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % LOADING_TEXTS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
    <section id="about" className="section">
      <div className="container">
        <div className="about">
          <h2 className="section-title">About</h2>
          <div className="about-grid">

            {/* Text column */}
            <div className="about-text" style={{ lineHeight: "1.45" }}>
              <p style={{ marginBottom: "10px" }}>
                I'm a{" "}
                <span
                  ref={textRef}
                  className={`devtitle ${LOADING_TEXTS[currentTextIndex].className}${hasAnimated ? " animate" : ""}`}
                >
                  {LOADING_TEXTS[currentTextIndex].text}
                </span>{" "}
                experienced in building responsive websites, apps and games.
              </p>
              <p style={{ marginBottom: "10px" }}>
                I create modern web, mobile and game interfaces, I'm passionate
                about clean code, performance, and delivering reliable, user-focused solutions.
              </p>
              <p style={{ marginBottom: "8px" }}>
                Web Interfaces with <span className="skills1">Html</span>,{" "}
                <span className="skills1">CSS</span>,{" "}
                <span className="skills1">Tailwind CSS</span>,{" "}
                <span className="skills1">Javascript</span>,{" "}
                <span className="skills1">React</span>,{" "}
                <span className="skills1">Angular</span> and{" "}
                <span className="skills1">Vue</span> frameworks.
              </p>
              <p style={{ marginBottom: "8px" }}>
                Game Interfaces with <span className="skills1">Unity</span>,{" "}
                <span className="skills1">Godot</span>,{" "}
                <span className="skills1">React.js</span>,{" "}
                <span className="skills1">C#</span> and{" "}
                <span className="skills1">C++</span>
              </p>
              <p style={{ marginBottom: "0" }}>
                Mobile Interfaces with <span className="skills1">React-native</span> for Cross platforms
              </p>
            </div>

            {/* Image column — horizontal, natural aspect ratio */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src="/assets/about1.png"
                alt="about"
                className="about-image"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "420px",
                  objectFit: "contain",
                  display: "block",
                  margin: "0",
                }}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}