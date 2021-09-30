import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import StarshipDetail from "../StarshipDetail/StarshipDetail";
import { Card, Grid } from "semantic-ui-react";

const HomePage = (props) => (
  <div>
    <h1>Starships</h1>
    <Grid columns={3}>
      {props.results.map((starship, i) => {
        return (
          <Grid.Column>
            <Link to={`/starships/${i}`} key={starship.name}>
              <Card>
                <Card.Content>
                  <Card.Header>{starship.name}</Card.Header>
                </Card.Content>
              </Card>
            </Link>
          </Grid.Column>
        );
      })}
    </Grid>
  </div>
);

export default HomePage;
