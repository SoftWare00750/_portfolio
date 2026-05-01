import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";

// ── Category nav icons ────────────────────────────────────
import { AiOutlineCode, AiFillTool, AiOutlineConsoleSql } from "react-icons/ai";
import { GrStackOverflow } from "react-icons/gr";

// ── Language icons ────────────────────────────────────────
import { IoLogoJavascript, IoLogoPython, IoLogoHtml5 } from "react-icons/io";
import { FaJava, FaCodiepie } from "react-icons/fa";
import { DiPhp } from "react-icons/di";
import { SiFlutter } from "react-icons/si";

// ── Technology icons ──────────────────────────────────────
import { FaReact, FaDatabase } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { SiAngular, SiVuedotjs, SiTailwindcss } from "react-icons/si";

// ── Tool icons ────────────────────────────────────────────
import { FaDocker, FaFigma, FaAws } from "react-icons/fa";
import { DiGit, DiVisualstudio } from "react-icons/di";
import { SiVercel, SiUnity } from "react-icons/si";
import { MdCloud } from "react-icons/md";

// ── BarChart + CSS ────────────────────────────────────────
import BarChart from "./BarChart";
import "./css/components/BarChart.css";

// ── Skills data ───────────────────────────────────────────
import { languages, frameworks, tools } from "../data/skills";

// ── Constants ─────────────────────────────────────────────
const SKILLS_PER_ROW = 5;

// ── Skill icons/pills list ────────────────────────────────
const skills = [
  { name: "HTML",         img: "/assets/html.png" },
  { name: "CSS",          img: "/assets/css.png" },
  { name: "Tailwind CSS", img: "/assets/tailwind.png" },
  { name: "Javascript",   img: "/assets/javascript.png" },
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

// ── Bar-chart icon sets ───────────────────────────────────

// languages.stats: JavaScript, Python, Java, C, PHP, HTML/CSS, Flutter
const langLogos = [
  <IoLogoJavascript />,
  <IoLogoPython />,
  <FaJava />,
  <FaCodiepie />,
  <DiPhp />,
  <IoLogoHtml5 />,
  <SiFlutter />,
];

// frameworks.stats: React, React-native, Angular, Vue, Tailwind CSS, SQL, MongoDB
// FIX: Added FaDatabase for SQL (was missing before)
const techLogos = [
  <FaReact />,
  <FaReact style={{ opacity: 0.65 }} />,
  <SiAngular />,
  <SiVuedotjs />,
  <SiTailwindcss />,
  <FaDatabase />,       // ← SQL icon (was AiOutlineConsoleSql which wasn't rendering)
  <DiMongodb />,
];

// tools.stats: Git, Docker, Figma, Vscode, Vercel, Unity, Render, AWS cloud
const toolLogos = [
  <DiGit />,
  <FaDocker />,
  <FaFigma />,
  <DiVisualstudio />,
  <SiVercel />,
  <SiUnity />,
  <MdCloud />,
  <FaAws />,
];

// ── Chart category config ─────────────────────────────────
const CHART_CATEGORIES = [
  {
    id: 1,
    icon: <AiOutlineCode />,
    label: "Languages",
    data: languages.stats,
    logos: langLogos,
  },
  {
    id: 2,
    icon: <GrStackOverflow />,
    label: "Technologies",
    data: frameworks.stats,
    logos: techLogos,
  },
  {
    id: 3,
    icon: <AiFillTool />,
    label: "Tools",
    data: tools.stats,
    logos: toolLogos,
  },
];

// ── Show More button ──────────────────────────────────────
function ShowMoreButton({ onClick }) {
  return (
    <div className="show-more-wrap" onClick={onClick} style={{ marginTop: "24px" }}>
      <span className="show-more-arrow">↓</span>
      <span className="show-more-text">Show more</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────
export function Skills() {
  const [activeChart, setActiveChart]     = useState(1);
  // FIX: Start with SKILLS_PER_ROW (5) so "Show more" reveals next 5
  const [visibleSkills, setVisibleSkills] = useState(SKILLS_PER_ROW);
  const [chartVisible, setChartVisible]   = useState(false);
  const chartRef = useRef(null);

  // Scroll-into-view animation
  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setChartVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeCategory = CHART_CATEGORIES.find((c) => c.id === activeChart);

  // FIX: Show MORE button correctly increments by SKILLS_PER_ROW
  const handleShowMore = () => {
    setVisibleSkills((v) => {
      const next = v + SKILLS_PER_ROW;
      return next > skills.length ? skills.length : next;
    });
  };

  const hasMore = visibleSkills < skills.length;

  return (
    <section id="skills" className="section alt">
      <div className="container">
        {/* FIX: Added extra bottom margin to increase spacing below title */}
        <h2 className="section-title" style={{ marginBottom: "48px" }}>Skills</h2>

        {/* ════════════════════════════════════════
            BAR CHART — scroll-triggered animation
            ════════════════════════════════════════ */}
        <div
          ref={chartRef}
          className={`skills-chart-section${chartVisible ? " chart-visible" : ""}`}
        >
          {/* FIX: Added column gap to increase spacing between buttons and chart */}
          <Row className="align-items-start g-4">
            {/* Left: category buttons */}
            <Col lg={4} md={5} sm={12} className="mb-3 mb-md-0">
              <div className="skills">
                <ButtonGroup vertical className="skills-buttons w-100">
                  {CHART_CATEGORIES.map(({ id, icon, label }) => (
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
                        <span style={{ fontSize: "1.15rem", lineHeight: 1 }}>{icon}</span>
                        <span className="button-text">{label}</span>
                      </div>
                    </Button>
                  ))}
                </ButtonGroup>

                <p style={{ fontSize: "12px", marginTop: "0.75rem", color: "#94a3b8" }}>
                  Click on one of the above to see my proficiency stats
                </p>
              </div>
            </Col>

            {/* Right: bar chart */}
            {/* FIX: Added paddingLeft for extra spacing from buttons column */}
            <Col lg={8} md={7} sm={12} style={{ paddingLeft: "24px" }}>
              <div className="barchart-fixed-wrap">
                <BarChart
                  key={activeChart}
                  data={activeCategory.data}
                  logos={activeCategory.logos}
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* ════════════════════════════════════════
            SKILL ICONS — row-by-row show more
            ════════════════════════════════════════ */}
        <div className="skills-icons-section">
          <div className="skills-grid skills-icons-grid">
            {skills.slice(0, visibleSkills).map((s) => (
              <div className="skill-item" key={s.name}>
                <img src={s.img} alt={s.name} className="skill-icon" />
                <div className="skill-pill">{s.name}</div>
              </div>
            ))}
          </div>

          {/* FIX: Show the button only when there are more items to reveal */}
          {hasMore && (
            <ShowMoreButton onClick={handleShowMore} />
          )}
        </div>
      </div>
    </section>
  );
}

export default Skills;