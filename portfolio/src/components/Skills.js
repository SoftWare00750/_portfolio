import React from "react";

const skills = [
  { name: "HTML", img: "/assets/html.png" },
  { name: "CSS", img: "/assets/css.png" },
  { name: "Tailwind CSS", img: "/assets/tailwind.png" },
  { name: "Javascript", img: "/assets/javascript.png" },
  
  { name: "React", img: "/assets/react.png" },
  { name: "Angular", img: "/assets/angular.png" },
  { name: "Vue", img: "/assets/vue1.png" },
  { name: "Vercel", img: "/assets/vercel.png" },
  { name: "Networking ", img: "/assets/networking.png" },
  { name: "CI/CD", img: "/assets/cicd.png" },
   { name: "Docker", img: "/assets/docker.png" },
    { name: "Git", img: "/assets/git.png" },
     { name: "Github", img: "/assets/github.png" },
     {name: "AWS", img: "/assets/aws.png" },
     {name: "Oracle Cloud", img: "/assets/oracle.png"}
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
