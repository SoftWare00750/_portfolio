import React from "react";
import projects from "../data/projects";

export default function Projects() {
  return (
      <section id="projects" className="section">
            <div className="container">
                    <h2 className="section-title">Selected Projects</h2>
                            <div className="projects-grid">
                                      {projects.map((p) => (
                                                  <article key={p.id} className="project-card">
                                                                <div className="project-media">
                                                                                <img src={p.image} alt={p.title} />
                                                                                              </div>
                                                                                                            <div className="project-body">
                                                                                                                            <h3>{p.title}</h3>
                                                                                                                                            <p>{p.desc}</p>
                                                                                                                                                            <div className="tech-list">
                                                                                                                                                                              {p.tech.map(t => <span key={t} className="tech">{t}</span>)}
                                                                                                                                                                                              </div>
                                                                                                                                                                                                              <a className="link" href={p.link}>View details</a>
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                        </article>
                                                                                                                                                                                                                                                  ))}
                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                    </section>
                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                      