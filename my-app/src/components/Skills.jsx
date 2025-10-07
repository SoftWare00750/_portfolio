import React from "react";

const skills = [
  "Windows Server",
    "Linux (Ubuntu, CentOS)",
      "VMware & Hyper-V",
        "AWS & Oracle Cloud",
          "Networking (VLAN/VPN/Firewalls)",
            "CI/CD, Docker, Git",
            ];

            export default function Skills() {
              return (
                  <section id="skills" className="section alt">
                        <div className="container">
                                <h2 className="section-title">Skills</h2>
                                        <div className="skills-list">
                                                  {skills.map((s) => (
                                                              <div className="skill-pill" key={s}>{s}</div>
                                                                        ))}
                                                                                </div>
                                                                                      </div>
                                                                                          </section>
                                                                                            );
                                                                                            }
                                                                                            