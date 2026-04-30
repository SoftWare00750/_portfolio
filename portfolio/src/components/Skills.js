import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";

// ── React Icons ─────────────────────────────────────────────────────────────
import { AiOutlineCode, AiFillTool, AiOutlineConsoleSql } from "react-icons/ai";
import { GrStackOverflow } from "react-icons/gr";
import { IoLogoJavascript, IoLogoPython, IoLogoHtml5 } from "react-icons/io";
import {
  FaJava,
  FaCodiepie,
  FaReact,
  FaJenkins,
  FaDocker,
  FaFigma,
} from "react-icons/fa";
import {
  DiPhp,
  DiJqueryLogo,
  DiMongodb,
  DiGit,
  DiVisualstudio,
  DiEclipse,
} from "react-icons/di";
import { SiKotlin, SiRedux, SiSpring, SiNeo4J, SiSketch } from "react-icons/si";

// ── BarChart component + its CSS ─────────────────────────────────────────────
import BarChart from "./BarChart";
import "./css/components/BarChart.css";

// ── Skills data ───────────────────────────────────────────────────────────────
import { languages, frameworks, tools } from "../data/skills";

const skills = [
  { name: "HTML", img: "/assets/html.png" },
  { name: "CSS", img: "/assets/css.png" },
  { name: "Tailwind CSS", img: "/assets/tailwind.png" },
  { name: "Javascript", img: "/assets/javascript.png" },
  { name: "React", img: "/assets/react.png" },
  { name: "Angular", img: "/assets/angular.png" },
  { name: "Vue", img: "/assets/vue1.png" },
  { name: "React-native", img: "/assets/react-native.png" },
  { name: "Expo", img: "/assets/expo.png" },
  { name: "Vercel", img: "/assets/vercel.png" },
  { name: "Networking ", img: "/assets/networking.png" },
  { name: "CI/CD", img: "/assets/cicd.png" },
  { name: "Docker", img: "/assets/docker.png" },
  { name: "Git", img: "/assets/git.png" },
  { name: "Github", img: "/assets/github.png" },
  { name: "AWS", img: "/assets/aws.png" },
  { name: "Wordpress", img: "/assets/wordpress.png" },
  { name: "Webflow", img: "/assets/webflow.png" },
  { name: "Shopify", img: "/assets/shopify.png" },
];

function useFadeIn(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ── Icon instances ────────────────────────────────────────────────────────────
const xd = <SiSketch />;

// Languages icons (matches skills.js order: JS, Python, Java, C, PHP, HTML/CSS, Kotlin)
const langLogos = [
  <IoLogoJavascript />,
  <IoLogoPython />,
  <FaJava />,
  <FaCodiepie />,
  <DiPhp />,
  <IoLogoHtml5 />,
  <SiKotlin />,
];

// Technologies icons (React, SQL, Redux, jQuery, Spring, MongoDB, Neo4j)
const techLogos = [
  <FaReact />,
  <AiOutlineConsoleSql />,
  <SiRedux />,
  <DiJqueryLogo />,
  <SiSpring />,
  <DiMongodb />,
  <SiNeo4J />,
];

// Tools icons (Git, Docker, Figma, Sketch, Jenkins, VSCode, Eclipse)
const toolLogos = [
  <DiGit />,
  <FaDocker />,
  <FaFigma />,
  xd,
  <FaJenkins />,
  <DiVisualstudio />,
  <DiEclipse />,
];

export function Skills() {
  const [activeChart, setActiveChart] = useState(1);
  const { ref: fadeRef, visible } = useFadeIn();

  const navButtons = [
    { id: 1, icon: <AiOutlineCode />, label: "Languages" },
    { id: 2, icon: <GrStackOverflow />, label: "Technologies" },
    { id: 3, icon: <AiFillTool />, label: "Tools" },
  ];

  return (
    <div ref={fadeRef} className={visible ? "fade-in visible" : "fade-in"}>
      {/* ── Icons Grid Section ── */}
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

      {/* ── Chart section ── */}
      <div className="container mt-5">
        <Row>
          {/* Left: category selector */}
          <Col lg={4} md={5} sm={12}>
            <div className="skills">
              <ButtonGroup vertical className="skills-buttons w-100">
                {navButtons.map(({ id, icon, label }) => (
                  <Button
                    key={id}
                    variant="skill"
                    className={
                      activeChart === id
                        ? "text-decoration-none active-button"
                        : "text-decoration-none btn-skill"
                    }
                    onClick={() => setActiveChart(id)}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <h3 className="mb-0" style={{ fontSize: "1.1rem" }}>{icon}</h3>
                      <p className="button-text mb-0">{label}</p>
                    </div>
                  </Button>
                ))}
              </ButtonGroup>

              <p style={{ fontSize: "12px", marginTop: "0.75rem", color: "#94a3b8" }}>
                Click one of the above to see my proficiency stats
              </p>
            </div>
          </Col>

          {/* Right: animated bar charts */}
          <Col lg={8} md={7} sm={12}>
            <div className="barchart-group">
              <BarChart
                data={languages.stats}
                logos={langLogos}
                visible={activeChart === 1}
              />
              <BarChart
                data={frameworks.stats}
                logos={techLogos}
                visible={activeChart === 2}
              />
              <BarChart
                data={tools.stats}
                logos={toolLogos}
                visible={activeChart === 3}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Skills;