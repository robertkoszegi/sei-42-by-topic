import React, { Component } from 'react';
import './Dice.css';
import die1 from './1.jpeg';
import die2 from './2.png';
import die3 from './3.png';
import die4 from './4.jpg';
import die5 from './5.png';
import die6 from './6.png';



class Die extends Component {
  constructor() {
    super();
    this.state = {
      dice: [die1, die2, die3, die4, die5, die6]
    }
  }

  render() {
    return (
      <div className="App">
        <img className="die" alt={this.props.value} src={this.state.dice[this.props.value -1] || "https://via.placeholder.com/40x40"}/>
      </div>
    );
  }
}

export default Die;
