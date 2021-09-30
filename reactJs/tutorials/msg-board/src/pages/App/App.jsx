import "./App.css";
import { Component } from "react";
import Form from "../../components/Form/Form";
import Post from "../../components/Post/Post";

export default class App extends Component {
  state = {
    posts: [],
  };

  getPosts = async () => {
    const res = await fetch("/api");
    const data = await res.json();
    console.log("Data from getPosts: ", data);
    this.setState({ posts: data });
  };

  componentDidMount = () => {
    this.getPosts();
  };

  render() {
    return (
      <main className="App">
        {this.state.posts.length ? (
          this.state.posts.map((post) => (
            <Post post={post} getPosts={this.getPosts} />
          ))
        ) : (
          <h1>No Posts</h1>
        )}
        <Form getPosts={this.getPosts} />
      </main>
    );
  }
}
