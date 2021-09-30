import { Component } from "react";
import MenuList from "./components/MenuList/MenuList";
import OrderDefault from "./components/OrderDetail/OrderDetail";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">SEI-Cafe</header>
        <MenuList />
        <OrderDefault />
      </div>
    );
  }
}

export default App;
