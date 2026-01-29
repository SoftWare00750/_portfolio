import React from "react";

const LOADING_TEXTS = [
  "Web Developer",
  "Frontend Developer",
  "Mobile Developer",
  "Game Developer",
  "React.js",
  "Angular.js",
  "Vue.js",
  "React-native",
  "Flutter",
  "Godot",
  "Unity"
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
    }, 300);

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
            <p className="hero-sub-right-fixed" style={textStyle}>
          {LOADING_TEXTS[currentTextIndex]}
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