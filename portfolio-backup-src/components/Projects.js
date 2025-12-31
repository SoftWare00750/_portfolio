import React from "react";
import projects from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 id="project-title" className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((p) => (
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
                    {p.type === 'mobile' ? 'View App' : 'View Site'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}