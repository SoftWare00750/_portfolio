import React, { useState } from "react";

const skills = [
  { name: "HTML",         img: "/assets/html.png" },
  { name: "CSS",          img: "/assets/css.png" },
  { name: "Tailwind CSS", img: "/assets/tailwind.png" },
  { name: "Javascript",  img: "/assets/javascript.png" },
  { name: "React",        img: "/assets/react.png" },
  { name: "Angular",      img: "/assets/angular.png" },
  { name: "Vue",          img: "/assets/vue1.png" },
  { name: "React-native", img: "/assets/react-native.png" },
  { name: "Expo",         img: "/assets/expo.png" },
  { name: "Vercel",       img: "/assets/vercel.png" },
  { name: "Networking",   img: "/assets/networking.png" },
  { name: "CI/CD",        img: "/assets/cicd.png" },
  { name: "Docker",       img: "/assets/docker.png" },
  { name: "Git",          img: "/assets/git.png" },
  { name: "Github",       img: "/assets/github.png" },
  { name: "AWS",          img: "/assets/aws.png" },
  { name: "Wordpress",    img: "/assets/wordpress.png" },
  { name: "Webflow",      img: "/assets/webflow.png" },
  { name: "Shopify",      img: "/assets/shopify.png" },
];

// Desktop: 4 columns → row = 4 items  |  Mobile: 2 columns → row = 2 items
const DESKTOP_ROW = 4;
const MOBILE_ROW  = 2;

export default function Skills() {
  // We track visible count. Start at one row.
  // We use CSS to detect which row size applies, but we default to desktop row.
  // The button reveals one more "row" at a time using the larger step so it
  // works on both breakpoints (extra items just wrap into additional rows on mobile).
  const [visibleCount, setVisibleCount] = useState(DESKTOP_ROW);

  const hasMore = visibleCount < skills.length;

  const showMore = () => {
    setVisibleCount(v => Math.min(v + DESKTOP_ROW, skills.length));
  };

  return (
    <section id="skills" className="section alt">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {skills.slice(0, visibleCount).map((s) => (
            <div className="skill-item" key={s.name}>
              <img src={s.img} alt={s.name} className="skill-icon" />
              <div className="skill-pill">{s.name}</div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="show-more-wrap" onClick={showMore}>
            <span className="show-more-arrow">↓</span>
            <span className="show-more-text">Show more</span>
          </div>
        )}
      </div>
    </section>
  );
}