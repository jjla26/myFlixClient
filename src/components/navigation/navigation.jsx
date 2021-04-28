import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './navigation.scss'

function Navigation(props) {
  const { user, onLoggedOut } = props
  return (
    <Navbar className="navigation" collapseOnSelect expand="lg" bg="secondary" variant="primary" sticky="top">
      <Navbar.Brand as={Link} to='/'>MYFLIX APP</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to='/'>Home</Nav.Link>
          <Nav.Link as={Link} to='/myfavorites'>Favorites</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title={`${user}'s Profile`} id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to={`/profile/${user}`}>My Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={onLoggedOut}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
