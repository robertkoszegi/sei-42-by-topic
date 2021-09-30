import React, { Component } from "react";
import "./App.css";
import { fetchStarships } from "././services/sw-api";
import { fetchStarshipsId } from "././services/sw-api";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/Homepage/HomePage";
import StarshipDetail from "./components/StarshipDetail/StarshipDetail";
import NavBar from "./components/NavBar";
import { Container } from "semantic-ui-react";

class App extends Component {
  state = {
    results: [],
  };

  getIndex = (idx) => {
    return this.state.results[idx];
  };

  async componentDidMount() {
    try {
      const starshipsData = await fetchStarships();
      const results = starshipsData.results;
      console.log(results);

      this.setState({
        results: results,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <>
        <Router>
          <NavBar />
          <Container>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <HomePage {...props} results={this.state.results} />
                )}
              />
              <Route
                path="/starships/:idx"
                render={(props) => (
                  <StarshipDetail {...props} getIndex={this.getIndex} />
                )}
              />
            </Switch>
          </Container>
        </Router>
      </>
    );
  }
}

export default App;
