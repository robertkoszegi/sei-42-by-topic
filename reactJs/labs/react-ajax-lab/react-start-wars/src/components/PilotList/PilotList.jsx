import React, { Component } from "react";
import { getPilots } from "../../services/sw-api";
// { location }
class PilotList extends Component{
  state={
    pilots:[]
  }

  async componentDidMount(){
    let pilots = await getPilots(this.props.pilots);
    this.setState({pilots:pilots});

  }

  render(){
    
    return(
      <ul>
        {this.state.pilots.map((pilot, index)=>{
          return <li>{pilot.name}</li>
        })}
      </ul>
    );
  }
}

export default PilotList;
