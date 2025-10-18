import React from "react";

const skills = [
  { name: "Windows Server", img: "/images/windows-server.png" },
  { name: "Linux (Ubuntu, CentOS)", img: "/images/linux.png" },
  { name: "VMware & Hyper-V", img: "/images/vmware.png" },
  { name: "AWS & Oracle Cloud", img: "/images/aws.png" },
  { name: "Networking (VLAN/VPN/Firewalls)", img: "/images/networking.png" },
  { name: "CI/CD, Docker, Git", img: "/images/devops.png" },
  { name: "HTML", img: "/images/html.png" },
  { name: "CSS", img: "/images/css.png" },
  { name: "Javascript", img: "/images/javascript.png" },
];

export default function Skills() {
  return (
    <section id="skills" className="section alt">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {skills.map((s) => (
            <div className="skill-item" key={s.name}>
              <img src={s.img} alt={s.name} className="skill-icon" />
              <div className="skill-pill">{s.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
