import React from "react";
import "./StarshipDetail.css";
import { Card, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

function StarshipDetail(props) {
  const starship = props.getIndex(props.match.params.idx);
  if (starship) {
    return (
      <div>
        <Card>
          <Card.Content>
            <Card.Header>Name: {starship.name}</Card.Header>
            <Card.Header>Model :{starship.model}</Card.Header>
          </Card.Content>
        </Card>
        <div>
          <Card>
            <Link to="/">RETURN</Link>
          </Card>
        </div>
      </div>
    );
  }
  return <h1>Loading....</h1>;
}

export default StarshipDetail;
