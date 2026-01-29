import React from "react";
import projects from "../data/projects";

export default function Projects() {
  // Separate projects into web and mobile
  const webProjects = projects.filter(p => p.type === 'web' || !p.type);
  const gameProjects = projects.filter(p => p.type === 'game' || !p.type);
  const mobileProjects = projects.filter(p => p.type === 'mobile');

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 id="project-title" className="section-title">Featured Projects</h2>
        
        {/* WEB SECTION */}
        <div className="project-category">
          <h3 id="web-heading" className="category-heading">Web Projects</h3>
          <div className="projects-grid">
            {webProjects.map((p) => (
              <div 
                key={p.id} 
                className={`project-card ${p.type || 'web'}`}
              > 
                <div className="project-media">
                  <img 
                    src={p.image} 
                    alt={p.title}
                    onLoad={() => console.log(`✅ LOADED: ${p.title} - ${p.image}`)}
                    onError={(e) => {
                      console.error(`❌ FAILED: ${p.title} - ${p.image}`);
                      console.error('Full error:', e);
                    }}
                  />
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
   
   {/* GAME SECTION */}
     <div className="project-category">
          <h3 id="web-heading" className="category-heading">Game Projects</h3>
          <div className="projects-grid">
            {gameProjects.map((p) => (
              <div 
                key={p.id} 
                className={`project-card ${p.type || 'web'}`}
              > 
                <div className="project-media">
                  <img 
                    src={p.image} 
                    alt={p.title}
                    onLoad={() => console.log(`✅ LOADED: ${p.title} - ${p.image}`)}
                    onError={(e) => {
                      console.error(`❌ FAILED: ${p.title} - ${p.image}`);
                      console.error('Full error:', e);
                    }}
                  />
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
                      View Game
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE SECTION */}
        <div className="project-category">
          <h3 className="category-heading">Mobile Apps</h3>
          <div className="projects-grid mobile-grid">
            {mobileProjects.map((p) => (
              <div 
                key={p.id} 
                className="project-card mobile"
              > 
                <div className="project-media">
                  <img 
                    src={p.image} 
                    alt={p.title}
                    onLoad={() => console.log(`✅ LOADED: ${p.title} - ${p.image}`)}
                    onError={(e) => {
                      console.error(`❌ FAILED: ${p.title} - ${p.image}`);
                      console.error('Full error:', e);
                    }}
                  />
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
      </div>
    </section>
  );
}