import React from "react";
import projects from "../data/projects";

export default function Projects() {
  console.log("=== PROJECT DEBUG START ===");
  console.log("Total projects:", projects.length);
  
  // Check each project
  projects.forEach((p, i) => {
    console.log(`\nProject ${i + 1}:`, {
      id: p.id,
      title: p.title,
      type: p.type,
      image: p.image
    });
  });

  // Count by type
  const webCount = projects.filter(p => p.type === 'web').length;
  const mobileCount = projects.filter(p => p.type === 'mobile').length;
  console.log("\nWeb projects:", webCount);
  console.log("Mobile projects:", mobileCount);
  
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 id="project-title" className="section-title">Featured Projects</h2>
        
        {/* Debug info visible on page */}
        <div style={{
          background: 'rgba(255,0,0,0.2)', 
          padding: '20px', 
          marginBottom: '20px',
          color: 'white',
          borderRadius: '10px'
        }}>
          <h3>DEBUG INFO:</h3>
          <p>Total Projects: {projects.length}</p>
          <p>Web Projects: {projects.filter(p => p.type === 'web').length}</p>
          <p>Mobile Projects: {projects.filter(p => p.type === 'mobile').length}</p>
          <div style={{marginTop: '10px'}}>
            {projects.map(p => (
              <div key={p.id} style={{marginBottom: '5px'}}>
                ✓ {p.title} ({p.type}) - {p.image}
              </div>
            ))}
          </div>
        </div>

        <div className="projects-grid" style={{
          border: '3px solid yellow',
          padding: '20px'
        }}>
          {projects.map((p, index) => {
            const cardStyle = {
              border: p.type === 'mobile' ? '5px solid red' : '5px solid green',
              backgroundColor: p.type === 'mobile' ? 'rgba(255,0,0,0.2)' : 'rgba(0,255,0,0.2)',
              minHeight: '300px',
              display: 'block',
              visibility: 'visible',
              opacity: '1'
            };

            console.log(`Rendering card ${index + 1}: ${p.title} (${p.type})`);

            return (
              <div 
                key={p.id} 
                className={`project-card ${p.type || 'web'}`}
                style={cardStyle}
                data-type={p.type}
                data-title={p.title}
              > 
                {/* Card type label */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: p.type === 'mobile' ? 'red' : 'green',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  zIndex: 10,
                  fontWeight: 'bold'
                }}>
                  {p.type.toUpperCase()} - {index + 1}
                </div>

                <div className="project-media" style={{
                  border: '2px solid blue',
                  width: '100%',
                  height: '100%'
                }}>
                  <img 
                    src={p.image} 
                    alt={p.title}
                    onLoad={(e) => {
                      console.log(`✅ Image LOADED: ${p.title}`);
                      console.log(`   Dimensions: ${e.target.naturalWidth}x${e.target.naturalHeight}`);
                    }}
                    onError={(e) => {
                      console.error(`❌ Image FAILED: ${p.title}`);
                      console.error(`   Path: ${p.image}`);
                      // Show error visually
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          height: 100%;
                          background: rgba(255,0,0,0.3);
                          color: white;
                          padding: 20px;
                          text-align: center;
                        ">
                          <div>
                            <h3>IMAGE NOT FOUND</h3>
                            <p>${p.image}</p>
                          </div>
                        </div>
                      `;
                    }}
                    style={{
                      border: '2px solid orange',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
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
                      {p.type === 'mobile' ? 'View Code' : 'View Site'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional debug info */}
        <div style={{
          marginTop: '30px',
          background: 'rgba(0,0,255,0.2)',
          padding: '20px',
          color: 'white',
          borderRadius: '10px'
        }}>
          <h3>WHAT YOU SHOULD SEE:</h3>
          <ul>
            <li>GREEN borders = Web projects (landscape cards)</li>
            <li>RED borders = Mobile projects (portrait cards)</li>
            <li>BLUE borders = Image containers</li>
            <li>ORANGE borders = Actual images</li>
            <li>Each card has a label showing its type and number</li>
          </ul>
        </div>
      </div>
    </section>
  );
}