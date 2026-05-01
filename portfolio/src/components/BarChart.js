import React, { Component } from "react";
import NodeGroup from "react-move/NodeGroup";
import "./css/components/BarChart.css";

const BAR_HEIGHT = 40;
const BAR_PADDING = 7;
const MAX_BAR_WIDTH = 280;
const MAX_ITEMS = 8; // Fixed to tallest category (tools has 8) — prevents layout shift

function BarGroup({ data, state }) {
  const barH = BAR_HEIGHT - BAR_PADDING;
  const yMid = BAR_HEIGHT * 0.5;
  const barWidth = Math.max(0, (state.value / 100) * MAX_BAR_WIDTH * state.opacity);

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
  startTransition(d, i) {
    return { value: 0, y: i * BAR_HEIGHT, opacity: 0 };
  }

  enterTransition(d, i) {
    return {
      value: [d.value],
      opacity: [1],
      timing: { duration: 550, delay: i * 100 },
    };
  }

  updateTransition(d, i) {
    return {
      value: [d.value],
      y: [i * BAR_HEIGHT],
      opacity: [1],
      timing: { duration: 400, delay: i * 60 },
    };
  }

  leaveTransition() {
    return { opacity: [0], timing: { duration: 180 } };
  }

  render() {
    const { data, logos } = this.props;

    // Fixed dimensions based on MAX_ITEMS — chart never changes height
    const leftOffset = 118;
    const svgWidth = leftOffset + MAX_BAR_WIDTH + 14;
    const svgHeight = MAX_ITEMS * BAR_HEIGHT + 20;

    return (
      <div className="barchart-wrapper">
        <div className="barchart-container">
          {/* Icon column — one icon per bar, vertically aligned */}
          <div className="barchart-icons" style={{ height: svgHeight }}>
            {logos &&
              logos.map((logo, i) => (
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
              width={MAX_BAR_WIDTH}
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
                      <BarGroup key={key} data={d} state={state} />
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