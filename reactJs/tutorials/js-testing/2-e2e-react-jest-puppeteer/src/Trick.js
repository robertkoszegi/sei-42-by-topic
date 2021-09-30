import React, { Component } from 'react';

class Trick extends Component {
  render() {
    return (
      <div>
        <h2>Do a {this.props.trick.name}! </h2>
      </div>
    );
  }
}

export default Trick;
