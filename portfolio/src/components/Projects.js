import React from "react";
import projects from "../data/projects";

export default function Projects() {
  // Separate projects into web, mobile, and game
  const webProjects = projects.filter(p => p.type === 'web' || !p.type);
  const mobileProjects = projects.filter(p => p.type === 'mobile');
  const gameProjects = projects.filter(p => p.type === 'game');

  console.log('All projects:', projects.length);
  console.log('Web projects:', webProjects.length);
  console.log('Mobile projects:', mobileProjects.length);
  console.log('Game projects:', gameProjects.length);

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 id="project-title" className="section-title">Featured Projects</h2>
        
        {/* WEB SECTION */}
        {webProjects.length > 0 && (
          <div className="project-category">
            <h3 id="web-heading" className="category-heading">Web Projects</h3>
            <div className="projects-grid">
              {webProjects.map((p) => (
                <div 
                  key={p.id} 
                  id={p.id}
                  className="project-card web"
                > 
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
                      <button 
                        className="link-button" 
                        onClick={() => window.open(p.link, "_blank")}
                      > 
                        View Site
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GAME SECTION */}
        {gameProjects.length > 0 && (
          <div className="project-category">
            <h3 className="category-heading">Game Projects</h3>
            <div className="projects-grid game-grid">
              {gameProjects.map((p) => (
                <div 
                  key={p.id} 
                  id={p.id}
                  className="project-card game"
                > 
                  <div className="game-media">
                    <img src={p.image} alt={p.title} />
                  </div>
                  <div className="project-box">
                    <div className="project-body">
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                      <div className="tech-list">
                        {p.tech.map(t => <span key={t} className="tech">{t}</span>)}
                      </div>
                      <button 
                        className="link-button" 
                        onClick={() => window.open(p.link, "_blank")}
                      > 
                        Play Game
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MOBILE SECTION */}
        {mobileProjects.length > 0 && (
          <div className="project-category">
            <h3 className="category-heading">Mobile Apps</h3>
            <div className="projects-grid mobile-grid">
              {mobileProjects.map((p) => (
                <div 
                  key={p.id} 
                  id={p.id}
                  className="project-card mobile"
                > 
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
                      <button 
                        className="link-button" 
                        onClick={() => window.open(p.link, "_blank")}
                      > 
                        View App
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}