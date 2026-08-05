import React, { Component } from "react";
import NodeGroup from "react-move/NodeGroup";
import "./css/components/BarChart.css";

const BAR_HEIGHT   = 42;
const BAR_PADDING  = 8;
const MAX_ITEMS    = 8; // tallest category (tools) — prevents layout shift

// Responsive bar widths
const getBarConfig = () => {
  const w = window.innerWidth;
  if (w <= 480)  return { maxBarWidth: 140, leftOffset: 100 };
  if (w <= 768)  return { maxBarWidth: 170, leftOffset: 108 };
  if (w <= 992)  return { maxBarWidth: 200, leftOffset: 112 };
  return            { maxBarWidth: 300, leftOffset: 118 };
};

function BarGroup({ data, state, maxBarWidth }) {
  const barH    = BAR_HEIGHT - BAR_PADDING;
  const yMid    = BAR_HEIGHT * 0.5;
  const barWidth = Math.max(0, (state.value / 100) * maxBarWidth * state.opacity);

  return (
    <g className="bar-group" transform={`translate(0, ${state.y})`}>
      <text
        className="name-label"
        x="-10"
        y={yMid}
        alignmentBaseline="middle"
        style={{ opacity: state.opacity }}
      >
        {data.name}
      </text>
      <rect
        y={BAR_PADDING * 0.5}
        width={barWidth}
        height={barH}
        rx={5}
        ry={5}
        style={{ fill: "var(--bar-color)", opacity: state.opacity }}
      />
    </g>
  );
}

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = { config: getBarConfig() };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.setState({ config: getBarConfig() });
  }

  startTransition(d, i) {
    return { value: 0, y: i * BAR_HEIGHT, opacity: 0 };
  }

  enterTransition(d, i) {
    return {
      value:   [d.value],
      opacity: [1],
      timing:  { duration: 550, delay: i * 100 },
    };
  }

  updateTransition(d, i) {
    return {
      value:   [d.value],
      y:       [i * BAR_HEIGHT],
      opacity: [1],
      timing:  { duration: 400, delay: i * 60 },
    };
  }

  leaveTransition() {
    return { opacity: [0], timing: { duration: 180 } };
  }

  render() {
    const { data, logos } = this.props;
    const { maxBarWidth, leftOffset } = this.state.config;

    const svgWidth  = leftOffset + maxBarWidth + 16;
    const svgHeight = MAX_ITEMS * BAR_HEIGHT + 20;

    return (
      <div className="barchart-wrapper">
        <div className="barchart-container">

          {/* Icon column */}
          <div className="barchart-icons" style={{ height: svgHeight }}>
            {logos && logos.map((logo, i) => (
              <div key={i} className="barchart-icon-item">
                {logo}
              </div>
            ))}
          </div>

          {/* SVG: labels + animated bars */}
          <svg
            className="barchart-svg"
            width={svgWidth}
            height={svgHeight}
            style={{ overflow: "visible" }}
          >
            {/* Subtle background behind bar area */}
            <rect
              x={leftOffset}
              y={4}
              width={maxBarWidth}
              height={svgHeight - 12}
              rx={7}
              ry={7}
              style={{ fill: "rgba(255,255,255,0.04)" }}
            />

            <g transform={`translate(${leftOffset}, 10)`}>
              <NodeGroup
                data={data}
                keyAccessor={(d) => d.name}
                start={this.startTransition}
                enter={this.enterTransition}
                update={this.updateTransition}
                leave={this.leaveTransition}
              >
                {(nodes) => (
                  <g>
                    {nodes.map(({ key, data: d, state }) => (
                      <BarGroup
                        key={key}
                        data={d}
                        state={state}
                        maxBarWidth={maxBarWidth}
                      />
                    ))}
                  </g>
                )}
              </NodeGroup>
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

export default BarChart;