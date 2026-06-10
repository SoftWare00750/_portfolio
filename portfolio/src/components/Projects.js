import React, { useState } from "react";
import projects from "../data/projects";

const WEB_INITIAL = 4;
const WEB_PER_PAGE = 2;   // keep as-is; change to 3 if your grid is 3-col
const GAME_PER_PAGE = 2;
const MOBILE_PER_PAGE = 2;

function ShowMoreButton({ onClick }) {
  return (
    <div className="show-more-wrap" onClick={onClick}>
      <span className="show-more-arrow">↓</span>
      <span className="show-more-text">Show more</span>
    </div>
  );
}

export default function Projects() {
  const webProjects    = projects.filter(p => p.type === 'web' || !p.type);
  const mobileProjects = projects.filter(p => p.type === 'mobile');
  const gameProjects   = projects.filter(p => p.type === 'game');

  const [webVisible,    setWebVisible]    = useState(WEB_INITIAL);
  const [gameVisible,   setGameVisible]   = useState(2);
  const [mobileVisible, setMobileVisible] = useState(2);

  const showMoreWeb    = () => setWebVisible(v => Math.min(v + WEB_PER_PAGE, webProjects.length));
  const showMoreGame   = () => setGameVisible(v => Math.min(v + GAME_PER_PAGE, gameProjects.length));
  const showMoreMobile = () => setMobileVisible(v => Math.min(v + MOBILE_PER_PAGE, mobileProjects.length));

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 id="project-title" className="section-title">Featured Projects</h2>

        {/* ── WEB PROJECTS ── */}
        <div className="project-category">
          <h3 id="web-heading" className="category-heading">Web Projects</h3>
          <div className="projects-grid">
            {webProjects.slice(0, webVisible).map((p) => (
              <div key={p.id} id={p.id} className="project-card web">
                <div className="project-media">
                  <img src={p.image} alt={p.title} />
                </div>
                <div className="project-box">
                  <div className="project-body">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="tech-list">
                      {p.tech.map(t => <span key={t} className="tech">{t}</span>)}
                    </div>
                    <button className="link-button" onClick={() => window.open(p.link, "_blank")}>
                      View Site
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {webVisible < webProjects.length && (
            <ShowMoreButton onClick={showMoreWeb} />
          )}
        </div>

        {/* ── GAME PROJECTS ── */}
        {gameProjects.length > 0 && (
          <div className="project-category">
            <h3 className="category-heading">Game Projects</h3>
            <div className="projects-grid game-grid">
              {gameProjects.slice(0, gameVisible).map((p) => (
                <div key={p.id} id={p.id} className="project-card game">
                  <div className="project-media game-media">
                    <img src={p.image} alt={p.title} />
                  </div>
                  <div className="project-box">
                    <div className="project-body">
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                      <div className="tech-list">
                        {p.tech.map(t => <span key={t} className="tech">{t}</span>)}
                      </div>
                      <button className="link-button" onClick={() => window.open(p.link, "_blank")}>
                        Play Game
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {gameVisible < gameProjects.length && (
              <ShowMoreButton onClick={showMoreGame} />
            )}
          </div>
        )}

        {/* ── MOBILE PROJECTS ── */}
        <div className="project-category">
          <h3 className="category-heading">Mobile Apps</h3>
          <div className="projects-grid mobile-grid">
            {mobileProjects.slice(0, mobileVisible).map((p) => (
              <div key={p.id} id={p.id} className="project-card mobile">
                <div className="project-media">
                  <img src={p.image} alt={p.title} />
                </div>
                <div className="project-box">
                  <div className="project-body">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="tech-list">
                      {p.tech.map(t => <span key={t} className="tech">{t}</span>)}
                    </div>
                    <button className="link-button" onClick={() => window.open(p.link, "_blank")}>
                      View App
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {mobileVisible < mobileProjects.length && (
            <ShowMoreButton onClick={showMoreMobile} />
          )}
        </div>
      </div>
    </section>
  );
}