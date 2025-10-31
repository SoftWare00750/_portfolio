import React from "react";
import projects from "../data/projects";



export default function Projects() {
  return (
      <section id="projects" className="section">
            <div className="container">
                    <h2 id="project-title" className="section-title">Featured Projects</h2>
                            <div className="projects-grid">
                                      {projects.map((p) => (
                                       

                                            

                                       
                                                                                 
                                                                               
                                                                                                            <div className="project-card"> 

                                                                                                                <div className="project-media">
                                                   <img src= {p.image}  alt={p.title}/>
                                                   
                                                                                
                                                                                              </div>
                                                                                               <div className="project-box">
                                                                                                            <div className="project-body">
                                                                                                                            <h3>{p.title}</h3>
                                                                                                                                            <p>{p.desc}</p>
                                                                                                                                                            <div className="tech-list">
                                                                                                                                                                              {p.tech.map(t => <span key={t} className="tech">{t}</span>)}
                                                                                                                                                                                              </div>
                                                                                                                                                                                               <button className="link-button" onClick={() => window.open(p.link, "_self")} > View Site </button>
                                                                                                                                                                                                             
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                  ))}
                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                              </section>
                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                      