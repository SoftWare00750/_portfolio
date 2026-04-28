import React, { useState } from "react";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import Fade from "react-reveal/Fade";

// ── React Icons ────────────────────────────────────────────────────────────────
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
import {
  SiKotlin,
  SiRedux,
  SiSpring,
  SiNeo4J,
  SiAdobexd,
} from "react-icons/si";

// ── BarChart component + styles ────────────────────────────────────────────────
import BarChart from "../Components/BarChart";        // adjust path as needed
import "../css/Components/BarChart.css";              // adjust path as needed

// ── Skills data + page styles ─────────────────────────────────────────────────
import { languages, frameworks, tools } from "../data/skills";
import "../css/Containers/Skills.css";

// ── Icon instances ─────────────────────────────────────────────────────────────
const js      = <IoLogoJavascript />;
const python  = <IoLogoPython />;
const java    = <FaJava />;
const c       = <FaCodiepie />;
const php     = <DiPhp />;
const html    = <IoLogoHtml5 />;
const kotlin  = <SiKotlin />;

const react   = <FaReact />;
const sql     = <AiOutlineConsoleSql />;
const redux   = <SiRedux />;
const jquery  = <DiJqueryLogo />;
const spring  = <SiSpring />;
const mongo   = <DiMongodb />;
const neo4j   = <SiNeo4J />;

const git     = <DiGit />;
const jenkins = <FaJenkins />;
const docker  = <FaDocker />;
const figma   = <FaFigma />;
const xd      = <SiAdobexd />;
const vscode  = <DiVisualstudio />;
const eclipse = <DiEclipse />;

// ─────────────────────────────────────────────────────────────────────────────

export function Skills() {
  const [activeChart, setActiveChart] = useState(1);

  const navButtons = [
    { id: 1, icon: <AiOutlineCode />, label: "Languages" },
    { id: 2, icon: <GrStackOverflow />, label: "Technologies" },
    { id: 3, icon: <AiFillTool />, label: "Tools" },
  ];

  return (
    <div id="skills" name="skills" className="skills">
      <Fade>
        <div>
          {/* ── Heading ── */}
          <Row className="d-flex justify-content-center">
            <h1 style={{ paddingTop: "1vw" }}>Skills</h1>
          </Row>

          {/* ── Textual summary ── */}
          <Row className="d-flex justify-content-center">
            <div className="p-5 skills-desc">
              <p>
                <strong>Languages:</strong> JavaScript, Python, Java, C, PHP,
                HTML/CSS, Kotlin
              </p>
              <p>
                <strong>Technologies:</strong> React, SQL, Redux, jQuery,
                Spring, MongoDB, Neo4j
              </p>
              <p>
                <strong>Tools:</strong> Git, Jenkins, Docker, Figma, Adobe XD,
                VS Code, Eclipse
              </p>
            </div>
          </Row>

          {/* ── Chart section ── */}
          <Row>
            {/* Left: category selector buttons */}
            <Col lg={6}>
              <div className="skills">
                <ButtonGroup vertical className="w-25 skills-buttons">
                  {navButtons.map(({ id, icon, label }) => (
                    <Button
                      key={id}
                      block
                      variant="skill"
                      className={
                        activeChart === id
                          ? "text-decoration-none active-button"
                          : "text-decoration-none btn-skill"
                      }
                      onClick={() => setActiveChart(id)}
                    >
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <h3 className="mb-0">{icon}</h3>
                        <p className="button-text mb-0">{label}</p>
                      </div>
                    </Button>
                  ))}
                </ButtonGroup>

                <p style={{ fontSize: "12px", marginTop: "0.75rem" }}>
                  Click one of the above to see my proficiency stats
                </p>
              </div>
            </Col>

            {/* Right: animated bar charts */}
            <Col lg={6}>
              <div className="barchart-group">
                <Row className="d-flex justify-content-center">

                  {/* Languages */}
                  <BarChart
                    x={languages.x}
                    height={languages.height}
                    width={languages.width}
                    logos={[js, python, java, c, php, html, kotlin]}
                    data={languages.stats}
                    visible={activeChart === 1}
                  />

                  {/* Frameworks / Technologies */}
                  <BarChart
                    x={frameworks.x}
                    height={frameworks.height}
                    width={frameworks.width}
                    logos={[react, sql, redux, jquery, spring, mongo, neo4j]}
                    data={frameworks.stats}
                    visible={activeChart === 2}
                  />

                  {/* Tools */}
                  <BarChart
                    x={tools.x}
                    height={tools.height}
                    width={tools.width}
                    logos={[git, jenkins, docker, figma, xd, vscode, eclipse]}
                    data={tools.stats}
                    visible={activeChart === 3}
                  />

                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Fade>
    </div>
  );
}

export default Skills;