import React from "react";
import { Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Menu inverted>
      <Container>
        <Link to="/">
          <Menu.Item name="STARWARS"></Menu.Item>
        </Link>
      </Container>
    </Menu>
  );
}
