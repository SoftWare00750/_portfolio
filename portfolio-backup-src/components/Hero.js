import React from "react";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-text">
         <div className="hero-text1">
          <h1 className="hero-name">
            <span className="first-name">Oluwadamilola</span>
            <br />
            <span className="last-name">Otunla</span>
          </h1>
          <span className="hero-sub">
            <p className="hero-sub-right-fixed">
              Frontend Developer 
            </p>
            <p className="hero-sub-right2">
              <span>I handle the development, deployment</span>
              <br />
              <span>and maintenance of your Website and App's UI, start to finish.</span>
            </p>
          </span>
          </div>
          {/* FIXED: Correct path with error handling */}
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