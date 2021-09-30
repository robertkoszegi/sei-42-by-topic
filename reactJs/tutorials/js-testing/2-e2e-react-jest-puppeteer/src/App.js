import React, { Component } from 'react';
import logo from './logo.gif';
import './App.css';
import Die from './dice/Die.js';
import Trick from './Trick.js';

import { isSnakeEyes } from './dice/diceHelper';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      dice: [0, 0],
      snakeEyes: false,
    };
    this.rollDice = this.rollDice.bind(this);
  }

  rollDice() {
    this.setState({
      snakeEyes: false,
      trick: {},
    });
    let die1 = Math.floor(Math.random() * 6) + 1;
    let die2 = Math.floor(Math.random() * 6) + 1;
    this.setState({
      dice: [die1, die2],
    });
    this.checkSnakeEyes(die1, die2);
    this.getTrick(die1 + die2 + 10);
  }

  checkSnakeEyes(die1, die2) {
    if (isSnakeEyes(die1, die2)) {
      this.setState({
        snakeEyes: true,
      });
    }
  }

  getTrick(id) {
    axios.get('https://kickflip-api.herokuapp.com/tricks/' + id).then((response) => {
      console.log(response.data);
      this.setState({ trick: response.data });
    });
  }

  render() {
    let snakeEyesMessage;
    let trick;
    if (this.state.snakeEyes === true) {
      snakeEyesMessage = <h2>SNAKE EYES!!!!</h2>;
    }

    if (this.state.trick && this.state.trick.name) {
      trick = <Trick trick={this.state.trick} />;
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Skate Dice!</h1>
        </header>
        <Die value={this.state.dice[0]} />
        <Die value={this.state.dice[1]} />
        <button onClick={this.rollDice}>Roll</button>
        {snakeEyesMessage}
        {trick}
      </div>
    );
  }
}

export default App;
