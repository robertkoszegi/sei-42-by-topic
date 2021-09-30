import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import StarshipPage from "../../components/StarshipPage/StarshipPage";
import { getAllStarships } from "../../services/sw-api";

class App extends Component {
  state = {
    starships: [],
    loading: true,
    errorMessage: "",
  };

  async componentDidMount() {
    try {
      const starshipData = await getAllStarships();
      this.setState({
        starships: starshipData.results,
        loading: false,
      });
    } catch (err) {
      this.setState({ errorMessage: "Uh oh error!", loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }
    if (this.state.errorMessage) {
      return <h1>{this.state.errorMessage}</h1>;
    }
    return (
      <div className="App">
        <header className="App-header">STAR WARS STARSHIPS</header>
        <Switch>
          <Route exact path="/">
            {this.state.starships.map((starship, id) => (
              <Link to={`/starship/${id}`}>
                <button>{starship.name}</button>
              </Link>
            ))}
          </Route>

          <Route
            path="/starship/:id"
            render={(props) => (
              <StarshipPage {...props} ships={this.state.starships} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
