import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Auth } from 'aws-amplify';

import './App.css';
import Routes from './routes';

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const userSession = await Auth.currentSession();
      console.log(userSession);
      setIsAuthenticated(true);
      props.history.push('/');
    } catch (error) {
      if (error !== 'No current user') {
        console.log(error);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    setIsAuthenticated(false);
    props.history.push('/login');
  }

  return (
    !isAuthenticating && (
      <div className="App container">
        <Navbar bg="light" expand="lg" fixed="top">
          <Navbar.Brand href="/">Daryl Bilderback</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Nav>
            {isAuthenticated ? (
              <NavItem onClick={handleLogout}>Logout</NavItem>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <NavItem>Sign Up</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar>
        <Routes addProps={{ isAuthenticated, setIsAuthenticated }} />
      </div>
    )
  );
}

export default withRouter(App);
