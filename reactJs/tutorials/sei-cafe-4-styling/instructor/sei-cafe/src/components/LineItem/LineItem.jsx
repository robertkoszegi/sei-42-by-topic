import "./LineItem.css";
import React, { Component } from "react";

class LineItem extends Component {
  state = {
    cool: false,
  };

  handleBgColorChange = (i) => {
    // i === "+" ? this.setState({ cool: false }) : this.setState({ cool: true });

    this.setState(i === "+" ? { cool: false } : { cool: true });
  };

  render() {
    return (
      <div
        className="LineItem"
        style={{ background: this.state.cool ? "blue" : "red" }}
      >
        <div className="flex-ctr-ctr">🥗</div>
        <div className="flex-ctr-ctr flex-col">
          <span className="align-ctr">Green Salad</span>
          <span>$3.95</span>
        </div>
        <div className="qty" style={{ justifyContent: "center" }}>
          <button
            className="btn-xs"
            onClick={() => {
              this.handleBgColorChange("-");
            }}
          >
            −
          </button>
          <span>70</span>
          <button
            className="btn-xs"
            onClick={() => {
              this.handleBgColorChange("+");
            }}
          >
            +
          </button>
        </div>
        <div class="ext-price">$3.95</div>
      </div>
    );
  }
}

export default LineItem;
