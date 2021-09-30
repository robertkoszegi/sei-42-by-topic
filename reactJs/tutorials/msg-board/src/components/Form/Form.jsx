import { Component } from "react";

export default class Form extends Component {
  state = {
    content: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async () => {
    let body = { content: this.state.content };
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    let res = await fetch("/api", options);
    let data = await res.json();
    console.log(data);

    this.props.getPosts();
    this.setState({ content: "" });
  };

  render() {
    return (
      <div>
        <textarea
          name="content"
          onChange={this.handleChange}
          value={this.state.content}
        ></textarea>
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
