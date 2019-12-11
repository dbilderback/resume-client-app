import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './App.css';
import Routes from './routes';

function App(props) {
  return (
    <div className="App container">
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand href="/">Daryl Bilderback</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        <Nav pullRight>
          <LinkContainer to="/signup">
            <NavItem>Sign Up</NavItem>
          </LinkContainer>
          <LinkContainer to="/login">
            <NavItem>Login</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
