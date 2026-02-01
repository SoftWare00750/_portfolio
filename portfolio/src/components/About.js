import React from "react";
import React, { useState, useEffect, useRef } from "react";

const LOADING_TEXTS = [
  { text: "Web Developer", className: "loading-text-web" },
  { text: "Frontend Developer", className: "loading-text-frontend" },
  { text: "Mobile Developer", className: "loading-text-mobile" },
  { text: "Game Developer", className: "loading-text-game" }
];

export default function About() {

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
       }, 3000);
   
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
    <section id="about" className="section">
      <div className="container">
        <div className="about">
          <h2 className="section-title">About</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>I'm a <span ref={textRef}
              className={`devtitle ${LOADING_TEXTS[currentTextIndex].className}${hasAnimated ? " animate" : ""}`}>{LOADING_TEXTS[currentTextIndex].text}</span> experienced in building responsive websites, apps and games.</p>
              <p className="about2">I create modern web, mobile and game interfaces, I'm passionate about clean code, performance, and delivering reliable, user-focused solutions.</p>
              <p>Web Interfaces with <span className="skills1">Html</span>, <span className="skills1">CSS</span>, <span className="skills1">Tailwind CSS</span>, <span className="skills1">Javascript</span>, <span className="skills1">React</span>, <span className="skills1">Angular</span> and <span className="skills1">Vue</span> frameworks.</p>
              <p>Mobile Interfaces with <span className="skills1">React-native</span> for Cross platforms</p>
              <p>Game Interfaces with <span className="skills1">Unity</span>, <span className="skills1">Godot</span>, <span className="skills1">React.js</span>, <span className="skills1">C#</span> and <span className="skills1">C++</span></p>
            </div>
            <img src="/assets/about1.png" alt="about" className="about-image" />
          </div>
        </div>
      </div>
    </section>
  );
}