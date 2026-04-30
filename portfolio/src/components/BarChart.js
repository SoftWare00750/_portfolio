import React, { Component } from "react";
import NodeGroup from "react-move/NodeGroup";
import "./css/components/BarChart.css";

const BAR_HEIGHT = 36;
const BAR_PADDING = 6;
const MAX_BAR_WIDTH = 260;

function BarGroup(props) {
  const barH = BAR_HEIGHT - BAR_PADDING;
  const yMid = BAR_HEIGHT * 0.5;

  // Scale bar width based on value (0-100)
  const barWidth = (props.state.value / 100) * MAX_BAR_WIDTH;

  return (
    <g className="bar-group" transform={`translate(0, ${props.state.y})`}>
      {/* Icon slot — rendered by parent via foreignObject or just the label */}
      <text
        className="name-label"
        x="-12"
        y={yMid}
        alignmentBaseline="middle"
        style={{ opacity: props.state.opacity }}
      >
        {props.data.name}
      </text>
      <rect
        y={BAR_PADDING * 0.5}
        width={Math.max(0, barWidth * props.state.opacity)}
        height={barH}
        rx={5}
        ry={5}
        style={{
          fill: "var(--bar-color)",
          opacity: props.state.opacity,
        }}
      />
    </g>
  );
}

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
    this.renderBarChart = this.renderBarChart.bind(this);
  }

  startTransition(d, i) {
    return { value: 0, y: i * BAR_HEIGHT, opacity: 0 };
  }

  enterTransition(d) {
    return { value: [d.value], opacity: [1], timing: { duration: 600, delay: 100 } };
  }

  updateTransition(d, i) {
    return {
      value: [d.value],
      y: [i * BAR_HEIGHT],
      timing: { duration: 350 },
    };
  }

  leaveTransition() {
    return { y: [-BAR_HEIGHT], opacity: [0], timing: { duration: 250 } };
  }

  renderBarChart() {
    if (!this.props.visible) return null;

    const chartHeight = this.props.data.length * BAR_HEIGHT + 20;
    // Left offset: enough room for labels (name-label is text-anchor end at x=-12)
    const leftOffset = 110;

    return (
      <div className="barchart-container">
        {/* Icon column */}
        <div className="barchart-icons">
          {this.props.logos &&
            this.props.logos.map((logo, i) => (
              <div key={i} className="barchart-icon-item">
                {logo}
              </div>
            ))}
        </div>

        {/* SVG chart */}
        <svg
          className="barchart-svg"
          width={leftOffset + MAX_BAR_WIDTH + 20}
          height={chartHeight}
        >
          {/* Background rect */}
          <rect
            x={leftOffset}
            y={0}
            width={MAX_BAR_WIDTH}
            height={chartHeight - 10}
            rx={8}
            ry={8}
            style={{ fill: "var(--bar-bg)", opacity: 0.85 }}
          />

          <g transform={`translate(${leftOffset}, 10)`}>
            <NodeGroup
              data={this.props.data}
              keyAccessor={(d) => d.name}
              start={this.startTransition}
              enter={this.enterTransition}
              update={this.updateTransition}
              leave={this.leaveTransition}
            >
              {(nodes) => (
                <g>
                  {nodes.map(({ key, data, state }) => (
                    <BarGroup key={key} data={data} state={state} />
                  ))}
                </g>
              )}
            </NodeGroup>
          </g>
        </svg>
      </div>
    );
  }

  render() {
    return <div className="barchart-wrapper">{this.renderBarChart()}</div>;
  }
}

export default BarChart;