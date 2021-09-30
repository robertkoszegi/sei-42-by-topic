import React from "react";
import { Link } from "react-router-dom";
import PilotList from "../PilotList/PilotList";

// { location }
function StarshipPage(props) {
  const id = props.match.params.id;
  console.log(props);
  console.log(props.ships[id]);
  const pilots = props.ships[id].pilots;
  return (
    <div>
      <p>NAME: {props.ships[id].name}</p>
      <p>MODEL: {props.ships[id].model}</p>
      {/* <p>PILOTS: {props.ship[id].pilots}</p> */}
      {pilots.length ? <PilotList pilots={pilots}/> :<p>"There's no piliots."</p>}
   
      
  

      <Link to="/">RETURN</Link>
    </div>
  );
}

export default StarshipPage;
