import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import NodeGroup from "react-move/NodeGroup";
import "./css/components/BarChart.css";

const BAR_HEIGHT = 28;
const BAR_PADDING = 3;
const BAR_COLOR = "var(--bar-color)";

// Scale value (0–100) to a pixel width — max 260px matches image 3
const widthScale = (d) => (d / 100) * 260;

function BarGroup({ data, state }) {
  const width = widthScale(state.value);
  const yMid = BAR_HEIGHT * 0.5;

  return (
    <g className="bar-group" transform={`translate(0, ${state.y})`}>
      <rect
        y={BAR_PADDING * 0.5}
        width={width}
        height={BAR_HEIGHT - BAR_PADDING}
        fill={BAR_COLOR}
        opacity={state.opacity}
        rx={5}
        ry={5}
      />
      <text
        className="name-label"
        x="-10"
        y={yMid}
        alignmentBaseline="middle"
        style={{ opacity: state.opacity, fontSize: "13px" }}
      >
        {data.name}
      </text>
    </g>
  );
}

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
  }

  startTransition(d, i) {
    return { value: 0, y: i * BAR_HEIGHT, opacity: 0 };
  }

  enterTransition(d) {
    return { value: [d.value], opacity: [1], timing: { duration: 600 } };
  }

  updateTransition(d, i) {
    return { value: [d.value], y: [i * BAR_HEIGHT], timing: { duration: 350 } };
  }

  leaveTransition() {
    return { y: [-BAR_HEIGHT], opacity: [0], timing: { duration: 250 } };
  }

  renderLogos() {
    if (!this.props.logos) return null;
    return (
      <div
        className="list-group list-group-tech"
        style={{ paddingTop: "4px" }}
      >
        {this.props.logos.map((logo, i) => (
          <div
            key={i}
            className="list-group-item list-group-tech"
            style={{
              height: `${BAR_HEIGHT}px`,
              display: "flex",
              alignItems: "center",
              fontSize: "1.2rem",
              padding: "0 6px",
            }}
          >
            {logo}
          </div>
        ))}
      </div>
    );
  }

  render() {
    if (!this.props.visible) return null;

    const chartHeight = this.props.data.length * BAR_HEIGHT + 20;

    return (
      <Row className="d-flex justify-content-center align-items-start w-100">
        {/* Logo column */}
        <Col xs="auto" style={{ paddingRight: 0 }}>
          {this.renderLogos()}
        </Col>

        {/* Bar chart column */}
        <Col>
          {/* viewBox makes the SVG fully responsive — no overflow */}
          <svg
            width="100%"
            viewBox={`0 0 380 ${chartHeight}`}
            preserveAspectRatio="xMinYMin meet"
            style={{ overflow: "visible", maxWidth: "420px" }}
          >
            <g className="chart" transform="translate(110, 10)">
              <NodeGroup
                data={this.state.data}
                keyAccessor={(d) => d.name}
                start={this.startTransition}
                enter={this.enterTransition}
                update={this.updateTransition}
                leave={this.leaveTransition}
              >
                {(nodes) => (
                  <g>
                    {/* Background rect */}
                    <rect
                      x={-110}
                      y={-5}
                      width={380}
                      height={chartHeight}
                      fill="var(--bar-bg)"
                      opacity={0.9}
                      rx={8}
                      ry={8}
                    />
                    {nodes.map(({ key, data, state }) => (
                      <BarGroup key={key} data={data} state={state} />
                    ))}
                  </g>
                )}
              </NodeGroup>
            </g>
          </svg>
        </Col>
      </Row>
    );
  }
}

export default BarChart;