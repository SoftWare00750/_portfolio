import React, { useState, useEffect, useRef } from "react";
import projects from "../data/projects";

const WEB_INITIAL = 4;
const WEB_PER_PAGE = 2;
const GAME_PER_PAGE = 2;
const MOBILE_PER_PAGE = 2;

function ShowMoreButton({ onClick }) {
  return (
    <button className="show-more-wrap" onClick={onClick} type="button">
      <span className="show-more-arrow">↓</span>
      <span className="show-more-text">Show More</span>
    </button>
  );
}

// Animate any project cards that don't yet have .animate, using IntersectionObserver
function animateNewCards(containerRef) {
  if (!containerRef.current) return;
  const cards = containerRef.current.querySelectorAll(".project-card:not(.animate)");
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px 0px 0px" }
  );

  cards.forEach((card) => {
    // If the card is already in the viewport (e.g. user hasn't scrolled), animate immediately
    const rect = card.getBoundingClientRect();
    const inView =
      rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      card.classList.add("animate");
    } else {
      observer.observe(card);
    }
  });
}

export default function Projects() {
  const webProjects    = projects.filter((p) => p.type === "web" || !p.type);
  const mobileProjects = projects.filter((p) => p.type === "mobile");
  const gameProjects   = projects.filter((p) => p.type === "game");

  const [webVisible,    setWebVisible]    = useState(WEB_INITIAL);
  const [gameVisible,   setGameVisible]   = useState(GAME_PER_PAGE);
  const [mobileVisible, setMobileVisible] = useState(MOBILE_PER_PAGE);

  const webRef    = useRef(null);
  const gameRef   = useRef(null);
  const mobileRef = useRef(null);

  // Re-animate whenever visible counts change
  useEffect(() => { animateNewCards(webRef);    }, [webVisible]);
  useEffect(() => { animateNewCards(gameRef);   }, [gameVisible]);
  useEffect(() => { animateNewCards(mobileRef); }, [mobileVisible]);

  const showMoreWeb    = () => setWebVisible((p) => Math.min(p + WEB_PER_PAGE,    webProjects.length));
  const showMoreGame   = () => setGameVisible((p) => Math.min(p + GAME_PER_PAGE,   gameProjects.length));
  const showMoreMobile = () => setMobileVisible((p) => Math.min(p + MOBILE_PER_PAGE, mobileProjects.length));

  const visibleWeb    = webProjects.slice(0, webVisible);
  const visibleGame   = gameProjects.slice(0, gameVisible);
  const visibleMobile = mobileProjects.slice(0, mobileVisible);

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 id="project-title" className="section-title">Featured Projects</h2>

        {/* ── WEB PROJECTS ── */}
        <div className="project-category" ref={webRef}>
          <h3 id="web-heading" className="category-heading">Web Projects</h3>
          <div className="projects-grid">
            {visibleWeb.map((p) => (
              <div key={p.id} id={p.id} className="project-card web">
                <div className="project-media">
                  <img src={p.image} alt={p.title} />
                </div>
                <div className="project-box">
                  <div className="project-body">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="tech-list">
                      {p.tech.map((t) => <span key={t} className="tech">{t}</span>)}
                    </div>
                    <button className="link-button" onClick={() => window.open(p.link, "_blank", "noopener,noreferrer")}>
                      View Site
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {webVisible < webProjects.length && <ShowMoreButton onClick={showMoreWeb} />}
        </div>

        {/* ── GAME PROJECTS ── */}
        {gameProjects.length > 0 && (
          <div className="project-category" ref={gameRef}>
            <h3 className="category-heading">Game Projects</h3>
            <div className="projects-grid game-grid">
              {visibleGame.map((p) => (
                <div key={p.id} className="project-card game">
                  <div className="project-media game-media">
                    <img src={p.image} alt={p.title} />
                  </div>
                  <div className="project-box">
                    <div className="project-body">
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                      <div className="tech-list">
                        {p.tech.map((t) => <span key={t} className="tech">{t}</span>)}
                      </div>
                      <button className="link-button" onClick={() => window.open(p.link, "_blank", "noopener,noreferrer")}>
                        Play Game
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {gameVisible < gameProjects.length && <ShowMoreButton onClick={showMoreGame} />}
          </div>
        )}

        {/* ── MOBILE PROJECTS ── */}
        <div className="project-category" ref={mobileRef}>
          <h3 className="category-heading">Mobile Apps</h3>
          <div className="projects-grid mobile-grid">
            {visibleMobile.map((p) => (
              <div key={p.id} className="project-card mobile">
                <div className="project-media">
                  <img src={p.image} alt={p.title} />
                </div>
                <div className="project-box">
                  <div className="project-body">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="tech-list">
                      {p.tech.map((t) => <span key={t} className="tech">{t}</span>)}
                    </div>
                    <button className="link-button" onClick={() => window.open(p.link, "_blank", "noopener,noreferrer")}>
                      View App
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {mobileVisible < mobileProjects.length && <ShowMoreButton onClick={showMoreMobile} />}
        </div>
      </div>
    </section>
  );
}