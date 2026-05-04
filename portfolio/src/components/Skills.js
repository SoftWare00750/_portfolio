import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

// ── Category nav icons ────────────────────────────────────
import { AiOutlineCode, AiFillTool } from "react-icons/ai";
// Technologies icon — using SiStackoverflow-style layered stack
import { MdLayers } from "react-icons/md";

// ── Language icons ──
import { IoLogoJavascript, IoLogoPython, IoLogoHtml5 } from "react-icons/io";
import { FaJava, FaCodiepie } from "react-icons/fa";
import { DiPhp } from "react-icons/di";
import { SiFlutter } from "react-icons/si";


// ── Technology icons ──
import { FaReact } from "react-icons/fa";
import { AiOutlineConsoleSql as SqlIcon } from "react-icons/ai";
import { DiMongodb } from "react-icons/di";
import { SiAngular, SiVuedotjs, SiTailwindcss, SiExpo } from "react-icons/si";

// ── Tool icons ──
import { FaDocker, FaFigma, FaAws } from "react-icons/fa";
import { DiGit, DiVisualstudio } from "react-icons/di";
import { SiVercel, SiUnity } from "react-icons/si";
import { MdCloud } from "react-icons/md";

// ── BarChart + CSS ────────────────────────────────────────
import BarChart from "./BarChart";
import "./css/components/BarChart.css";

// ── Skills data ───────────────────────────────────────────
import { languages, frameworks, tools } from "../data/skills";

// ── Constants ────────────────────────────────────────────
const SKILLS_PER_ROW = 5;

// ── All 19 skill icons/pills ──────────────────────────────
const ALL_SKILLS = [
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
const langLogos = [
  <IoLogoJavascript key="js" />,
  <IoLogoPython     key="py" />,
  <FaJava           key="java" />,
  <FaCodiepie       key="c" />,
  <DiPhp            key="php" />,
  <IoLogoHtml5      key="html" />,
  <SiFlutter        key="flutter" />,
];

const techLogos = [
  <FaReact    key="react" />,
  <SiExpo     key="rn" />,
  <SiAngular  key="angular" />,
  <SiVuedotjs key="vue" />,
  <SiTailwindcss key="tailwind" />,
  <SqlIcon    key="sql" />,
  <DiMongodb  key="mongo" />,
];

const toolLogos = [
  <DiGit          key="git" />,
  <FaDocker       key="docker" />,
  <FaFigma        key="figma" />,
  <DiVisualstudio key="vscode" />,
  <SiVercel       key="vercel" />,
  <SiUnity        key="unity" />,
  <MdCloud        key="render" />,
  <FaAws          key="aws" />,
];

// ── Chart category config ─────────────────────────────────
// Technologies now uses MdLayers icon (a proper layered-stack icon)
const CHART_CATEGORIES = [
  { id: 1, icon: <AiOutlineCode />, label: "Languages",    data: languages.stats,  logos: langLogos },
  { id: 2, icon: <MdLayers />,      label: "Technologies", data: frameworks.stats, logos: techLogos },
  { id: 3, icon: <AiFillTool />,    label: "Tools",        data: tools.stats,      logos: toolLogos },
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
  const [activeChart, setActiveChart]   = useState(1);
  const [visibleCount, setVisibleCount] = useState(SKILLS_PER_ROW);
  const [chartVisible, setChartVisible] = useState(false);
  const chartRef = useRef(null);

  // ── Animate new skill items into view ────────────────────
  const animateVisibleItems = useCallback(() => {
    const items = document.querySelectorAll(
      ".skills-icons-grid .skill-item, .skills-icons-section .skill-item"
    );
    requestAnimationFrame(() => {
      items.forEach((item, idx) => {
        if (!item.classList.contains("animate")) {
          const delay = (idx % SKILLS_PER_ROW) * 80;
          setTimeout(() => item.classList.add("animate"), delay);
        }
      });
    });
  }, []);

  useEffect(() => {
    animateVisibleItems();
  }, [visibleCount, animateVisibleItems]);

  // Chart scroll-in observer
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeCategory = CHART_CATEGORIES.find((c) => c.id === activeChart);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + SKILLS_PER_ROW, ALL_SKILLS.length));
  };

  const hasMore = visibleCount < ALL_SKILLS.length;

  return (
    <section id="skills" className="section alt">
      <div className="container">
        <h2 className="section-title">Skills</h2>

        {/* ── BAR CHART — animates in on scroll ── */}
        <div
          ref={chartRef}
          className={`skills-chart-section${chartVisible ? " chart-visible" : ""}`}
        >
          {/*
            Use a plain flex row instead of Bootstrap's Row/Col so we can
            guarantee side-by-side layout on desktop without Bootstrap
            overriding column widths at certain breakpoints.
          */}
          <div className="skills-chart-row">
            {/* Left: category buttons */}
            <div className="skills-chart-left">
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
            </div>

            {/* Right: animated bar chart */}
            <div className="skills-chart-right">
              <div className="barchart-fixed-wrap">
                <BarChart
                  key={activeChart}
                  data={activeCategory.data}
                  logos={activeCategory.logos}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── SKILL ICONS — show more row by row ── */}
        <div className="skills-icons-section">
          <div className="skills-grid skills-icons-grid">
            {ALL_SKILLS.slice(0, visibleCount).map((s) => (
              <div className="skill-item" key={s.name}>
                <img src={s.img} alt={s.name} className="skill-icon" />
                <div className="skill-pill">{s.name}</div>
              </div>
            ))}
          </div>

          {hasMore && <ShowMoreButton onClick={handleShowMore} />}
        </div>
      </div>
    </section>
  );
}

export default Skills;